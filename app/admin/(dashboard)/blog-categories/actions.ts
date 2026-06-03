"use server";

import { db } from "@/lib/db";
import { blogCategories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori blog wajib diisi"),
});

function getErrorCode(error: unknown) {
  if (typeof error === "object" && error && "code" in error) {
    const { code } = error as { code?: unknown };
    return typeof code === "string" ? code : "";
  }

  return "";
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createBlogCategory(data: z.infer<typeof categorySchema>) {
  try {
    const validatedData = categorySchema.parse(data);
    const slug = generateSlug(validatedData.name);

    await db.insert(blogCategories).values({
      name: validatedData.name,
      slug,
    });

    revalidatePath("/admin/blog-categories");
    revalidatePath("/admin/blog");
    revalidatePath("/");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to create blog category:", error);
    const message = error instanceof Error ? error.message : "";
    if (message.includes("unique constraint") || getErrorCode(error) === "23505") {
      return { success: false, error: "Kategori blog dengan nama ini sudah ada." };
    }
    return { success: false, error: "Gagal menyimpan kategori blog" };
  }
}

export async function updateBlogCategory(id: string, data: z.infer<typeof categorySchema>) {
  try {
    const validatedData = categorySchema.parse(data);
    const slug = generateSlug(validatedData.name);

    await db.update(blogCategories).set({
      name: validatedData.name,
      slug,
    }).where(eq(blogCategories.id, id));

    revalidatePath("/admin/blog-categories");
    revalidatePath("/admin/blog");
    revalidatePath("/");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to update blog category:", error);
    const message = error instanceof Error ? error.message : "";
    if (message.includes("unique constraint") || getErrorCode(error) === "23505") {
      return { success: false, error: "Kategori blog dengan nama ini sudah ada." };
    }
    return { success: false, error: "Gagal mengupdate kategori blog" };
  }
}

export async function deleteBlogCategory(id: string) {
  try {
    await db.delete(blogCategories).where(eq(blogCategories.id, id));
    revalidatePath("/admin/blog-categories");
    revalidatePath("/admin/blog");
    revalidatePath("/");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete blog category:", error);
    return { success: false, error: "Gagal menghapus kategori blog" };
  }
}
