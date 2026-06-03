"use server";

import { db } from "@/lib/db";
import { portfolios } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const portfolioSchema = z.object({
  name: z.string().min(1, "Nama proyek wajib diisi"),
  categoryId: z.string().min(1, "Kategori wajib diisi"),
  thumbnail: z.string().optional(),
  result: z.string().optional(),
});

export async function createPortfolio(data: z.infer<typeof portfolioSchema>) {
  try {
    const validatedData = portfolioSchema.parse(data);
    await db.insert(portfolios).values(validatedData);
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Failed to create portfolio:", error);
    return { success: false, error: "Gagal menyimpan data" };
  }
}

export async function updatePortfolio(id: string, data: z.infer<typeof portfolioSchema>) {
  try {
    const validatedData = portfolioSchema.parse(data);
    await db.update(portfolios).set(validatedData).where(eq(portfolios.id, id));
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Failed to update portfolio:", error);
    return { success: false, error: "Gagal mengupdate data" };
  }
}

export async function deletePortfolio(id: string) {
  try {
    await db.delete(portfolios).where(eq(portfolios.id, id));
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete portfolio:", error);
    return { success: false, error: "Gagal menghapus data" };
  }
}
