"use server";

import { isUnauthorizedAdminRequest, requireAdminSession } from "@/lib/admin-session";
import { db } from "@/lib/db";
import { blogCategories, blogPosts } from "@/lib/db/schema";
import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().trim().min(2, "Nama kategori minimal 2 karakter").max(120, "Nama kategori maksimal 120 karakter"),
});

function generateSlug(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getErrorCode(error: unknown) {
  if (typeof error === "object" && error && "code" in error) {
    const { code } = error as { code?: unknown };
    return typeof code === "string" ? code : "";
  }

  return "";
}

function revalidateCategoryPaths() {
  revalidatePath("/admin/blog-categories");
  revalidatePath("/admin/blog");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
}

function categoryError(error: unknown, fallback: string) {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message || fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

export async function createBlogCategory(data: z.infer<typeof categorySchema>) {
  try {
    await requireAdminSession();
    const validatedData = categorySchema.parse(data);
    const slug = generateSlug(validatedData.name);

    if (!slug) {
      return { success: false, error: "Nama kategori belum bisa dijadikan URL" };
    }

    await db.insert(blogCategories).values({ name: validatedData.name, slug });
    revalidateCategoryPaths();
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to create blog category:", error);
    if (getErrorCode(error) === "23505") {
      return { success: false, error: "Kategori blog dengan nama ini sudah ada" };
    }
    return { success: false, error: categoryError(error, "Gagal menyimpan kategori blog") };
  }
}

export async function updateBlogCategory(id: string, data: z.infer<typeof categorySchema>) {
  try {
    await requireAdminSession();
    const validatedData = categorySchema.parse(data);
    const slug = generateSlug(validatedData.name);
    const [currentCategory] = await db.select().from(blogCategories).where(eq(blogCategories.id, id)).limit(1);

    if (!currentCategory) {
      return { success: false, error: "Kategori tidak ditemukan" };
    }

    if (!slug) {
      return { success: false, error: "Nama kategori belum bisa dijadikan URL" };
    }

    await db.transaction(async (transaction) => {
      await transaction.update(blogCategories).set({ name: validatedData.name, slug }).where(eq(blogCategories.id, id));
      await transaction.update(blogPosts).set({ category: validatedData.name }).where(eq(blogPosts.category, currentCategory.name));
    });

    revalidateCategoryPaths();
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to update blog category:", error);
    if (getErrorCode(error) === "23505") {
      return { success: false, error: "Kategori blog dengan nama ini sudah ada" };
    }
    return { success: false, error: categoryError(error, "Gagal memperbarui kategori blog") };
  }
}

export async function deleteBlogCategory(id: string) {
  try {
    await requireAdminSession();
    const [currentCategory] = await db.select().from(blogCategories).where(eq(blogCategories.id, id)).limit(1);

    if (!currentCategory) {
      return { success: false, error: "Kategori tidak ditemukan" };
    }

    const [usage] = await db.select({ value: count() }).from(blogPosts).where(eq(blogPosts.category, currentCategory.name));
    if (Number(usage?.value || 0) > 0) {
      return { success: false, error: "Kategori masih dipakai artikel dan tidak bisa dihapus" };
    }

    await db.delete(blogCategories).where(eq(blogCategories.id, id));
    revalidateCategoryPaths();
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to delete blog category:", error);
    return { success: false, error: "Gagal menghapus kategori blog" };
  }
}
