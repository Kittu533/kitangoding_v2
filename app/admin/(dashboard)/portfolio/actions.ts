"use server";

import { isUnauthorizedAdminRequest, requireAdminSession } from "@/lib/admin-session";
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
  role: z.string().trim().max(255, "Role maksimal 255 karakter").optional(),
  features: z.string().optional(),
  gallery: z.array(z.string()).max(2, "Maksimal 2 screenshot tambahan").optional(),
});

function parseFeatures(features?: string) {
  return (features || "")
    .split("\n")
    .map((feature) => feature.trim())
    .filter(Boolean);
}

function toPortfolioValues(data: z.infer<typeof portfolioSchema>) {
  const { features, gallery = [], role, ...portfolio } = data;

  return {
    ...portfolio,
    role: role || null,
    features: parseFeatures(features),
    gallery,
  };
}

export async function createPortfolio(data: z.infer<typeof portfolioSchema>) {
  try {
    await requireAdminSession();
    const validatedData = portfolioSchema.parse(data);
    await db.insert(portfolios).values(toPortfolioValues(validatedData));
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/portfolio");
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to create portfolio:", error);
    return { success: false, error: "Gagal menyimpan data" };
  }
}

export async function updatePortfolio(id: string, data: z.infer<typeof portfolioSchema>) {
  try {
    await requireAdminSession();
    const validatedData = portfolioSchema.parse(data);
    await db.update(portfolios).set(toPortfolioValues(validatedData)).where(eq(portfolios.id, id));
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${id}`);
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to update portfolio:", error);
    return { success: false, error: "Gagal mengupdate data" };
  }
}

export async function deletePortfolio(id: string) {
  try {
    await requireAdminSession();
    await db.delete(portfolios).where(eq(portfolios.id, id));
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${id}`);
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to delete portfolio:", error);
    return { success: false, error: "Gagal menghapus data" };
  }
}
