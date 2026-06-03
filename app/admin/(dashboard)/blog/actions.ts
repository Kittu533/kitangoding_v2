"use server";

import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1, "Judul artikel wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  thumbnail: z.string().optional(),
});

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createBlogPost(data: z.infer<typeof blogSchema>) {
  try {
    const validatedData = blogSchema.parse(data);
    const slug = generateSlug(validatedData.title);
    
    await db.insert(blogPosts).values({
      ...validatedData,
      slug,
      publishedAt: validatedData.status === "published" ? new Date() : null,
    });
    
    revalidatePath("/admin/blog");
    revalidatePath("/");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return { success: false, error: "Gagal menyimpan artikel" };
  }
}

export async function updateBlogPost(id: string, data: z.infer<typeof blogSchema>) {
  try {
    const validatedData = blogSchema.parse(data);
    const slug = generateSlug(validatedData.title);
    
    // We only update publishedAt if it wasn't published before, or we could just leave it.
    // For simplicity, we just update the standard fields.
    const updatePayload: Record<string, string | Date | null> = {
      ...validatedData,
      slug,
      updatedAt: new Date(),
    };

    if (validatedData.status === "published") {
        updatePayload.publishedAt = new Date();
    }

    await db.update(blogPosts).set(updatePayload).where(eq(blogPosts.id, id));
    
    revalidatePath("/admin/blog");
    revalidatePath("/");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to update blog post:", error);
    return { success: false, error: "Gagal mengupdate artikel" };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    revalidatePath("/admin/blog");
    revalidatePath("/");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete blog post:", error);
    return { success: false, error: "Gagal menghapus artikel" };
  }
}
