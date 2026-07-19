"use server";

import { isUnauthorizedAdminRequest, requireAdminSession } from "@/lib/admin-session";
import { richTextToPlainText, sanitizeRichTextHtml } from "@/lib/blog-content";
import { db } from "@/lib/db";
import { blogCategories, blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().trim().min(12, "Judul minimal 12 karakter").max(120, "Judul maksimal 120 karakter"),
  author: z.string().trim().min(2, "Nama penulis wajib diisi").max(120, "Nama penulis maksimal 120 karakter"),
  category: z.string().trim().min(1, "Kategori wajib dipilih"),
  tags: z.array(z.string().trim().min(2, "Tag minimal 2 karakter").max(30, "Tag maksimal 30 karakter")).min(1, "Tambahkan minimal satu tag").max(8, "Maksimal 8 tag"),
  excerpt: z.string().trim().min(70, "Ringkasan minimal 70 karakter").max(220, "Ringkasan maksimal 220 karakter"),
  content: z.string().min(1, "Isi artikel wajib diisi"),
  status: z.enum(["draft", "published"]).default("draft"),
  thumbnail: z.string().optional(),
});

type BlogInput = z.infer<typeof blogSchema>;

function generateBaseSlug(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function generateUniqueSlug(title: string, excludedId?: string) {
  const baseSlug = generateBaseSlug(title);
  if (!baseSlug) {
    throw new Error("Judul artikel belum bisa dijadikan URL");
  }

  for (let suffix = 1; suffix < 1000; suffix += 1) {
    const slug = suffix === 1 ? baseSlug : `${baseSlug}-${suffix}`;
    const [existing] = await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);

    if (!existing || existing.id === excludedId) {
      return slug;
    }
  }

  throw new Error("Tidak bisa membuat URL artikel yang unik");
}

async function parseBlogInput(data: BlogInput) {
  const validatedData = blogSchema.parse(data);
  const content = sanitizeRichTextHtml(validatedData.content);

  if (richTextToPlainText(content).length < 280) {
    throw new Error("Isi artikel minimal 280 karakter");
  }

  const [category] = await db
    .select({ id: blogCategories.id })
    .from(blogCategories)
    .where(eq(blogCategories.name, validatedData.category))
    .limit(1);

  if (!category) {
    throw new Error("Pilih kategori yang tersedia");
  }

  return {
    ...validatedData,
    content,
    tags: [...new Set(validatedData.tags)],
  };
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message || fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

function getErrorCode(error: unknown) {
  if (typeof error === "object" && error && "code" in error) {
    const { code } = error as { code?: unknown };
    return typeof code === "string" ? code : "";
  }

  return "";
}

function revalidateBlogPaths(...slugs: string[]) {
  revalidatePath("/admin/blog");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  slugs.filter(Boolean).forEach((slug) => revalidatePath(`/blog/${slug}`));
}

export async function createBlogPost(data: BlogInput) {
  try {
    await requireAdminSession();
    const validatedData = await parseBlogInput(data);
    const slug = await generateUniqueSlug(validatedData.title);

    await db.insert(blogPosts).values({
      ...validatedData,
      slug,
      publishedAt: validatedData.status === "published" ? new Date() : null,
    });

    revalidateBlogPaths(slug);
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to create blog post:", error);
    if (getErrorCode(error) === "23505") {
      return { success: false, error: "Judul artikel sudah digunakan" };
    }
    return { success: false, error: getErrorMessage(error, "Gagal menyimpan artikel") };
  }
}

export async function updateBlogPost(id: string, data: BlogInput) {
  try {
    await requireAdminSession();
    const [currentPost] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);

    if (!currentPost) {
      return { success: false, error: "Artikel tidak ditemukan" };
    }

    const validatedData = await parseBlogInput(data);
    const slug = await generateUniqueSlug(validatedData.title, id);

    await db.update(blogPosts).set({
      ...validatedData,
      slug,
      publishedAt: validatedData.status === "published" ? currentPost.publishedAt || new Date() : null,
      updatedAt: new Date(),
    }).where(eq(blogPosts.id, id));

    revalidateBlogPaths(currentPost.slug, slug);
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to update blog post:", error);
    if (getErrorCode(error) === "23505") {
      return { success: false, error: "Judul artikel sudah digunakan" };
    }
    return { success: false, error: getErrorMessage(error, "Gagal memperbarui artikel") };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await requireAdminSession();
    const [currentPost] = await db.select({ slug: blogPosts.slug }).from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    revalidateBlogPaths(currentPost?.slug || "");
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to delete blog post:", error);
    return { success: false, error: "Gagal menghapus artikel" };
  }
}
