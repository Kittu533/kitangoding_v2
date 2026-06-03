"use server";

import { db } from "@/lib/db";
import { portfolioCategories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi"),
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

export async function createCategory(data: z.infer<typeof categorySchema>) {
  try {
    const validatedData = categorySchema.parse(data);
    const slug = generateSlug(validatedData.name);
    
    await db.insert(portfolioCategories).values({
      name: validatedData.name,
      slug,
    });
    
    revalidatePath("/admin/categories");
    revalidatePath("/admin/portfolio"); // Form portofolio menggunakan data ini
    return { success: true };
  } catch (error) {
    console.error("Failed to create category:", error);
    const message = error instanceof Error ? error.message : "";
    if (message.includes("unique constraint") || getErrorCode(error) === "23505") {
      return { success: false, error: "Kategori dengan nama ini sudah ada." };
    }
    return { success: false, error: "Gagal menyimpan kategori" };
  }
}

export async function updateCategory(id: string, data: z.infer<typeof categorySchema>) {
  try {
    const validatedData = categorySchema.parse(data);
    const slug = generateSlug(validatedData.name);

    await db.update(portfolioCategories).set({
      name: validatedData.name,
      slug,
    }).where(eq(portfolioCategories.id, id));
    
    revalidatePath("/admin/categories");
    revalidatePath("/admin/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Failed to update category:", error);
    const message = error instanceof Error ? error.message : "";
    if (message.includes("unique constraint") || getErrorCode(error) === "23505") {
      return { success: false, error: "Kategori dengan nama ini sudah ada." };
    }
    return { success: false, error: "Gagal mengupdate kategori" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await db.delete(portfolioCategories).where(eq(portfolioCategories.id, id));
    revalidatePath("/admin/categories");
    revalidatePath("/admin/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    // Handle foreign key constraint error when category is used by portfolio
    const message = error instanceof Error ? error.message : "";
    if (message.includes("foreign key constraint") || getErrorCode(error) === "23503") {
      return { success: false, error: "Tidak dapat menghapus! Kategori ini sedang digunakan oleh satu atau lebih portofolio." };
    }
    return { success: false, error: "Gagal menghapus kategori" };
  }
}
