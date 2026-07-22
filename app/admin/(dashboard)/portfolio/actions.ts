"use server";

import { isUnauthorizedAdminRequest, requireAdminSession } from "@/lib/admin-session";
import { db } from "@/lib/db";
import { portfolios } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { slugify } from "@/lib/slug";

const portfolioSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama proyek wajib diisi")
    .refine((name) => Boolean(slugify(name)), "Nama proyek belum bisa dijadikan URL"),
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
    slug: slugify(portfolio.name),
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
    const [updated] = await db
      .update(portfolios)
      .set(toPortfolioValues(validatedData))
      .where(eq(portfolios.id, id))
      .returning({ slug: portfolios.slug });
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/portfolio");
    if (updated) revalidatePath(`/portfolio/${updated.slug}`);
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
    const [deleted] = await db.delete(portfolios).where(eq(portfolios.id, id)).returning({ slug: portfolios.slug });
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/portfolio");
    if (deleted) revalidatePath(`/portfolio/${deleted.slug}`);
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to delete portfolio:", error);
    return { success: false, error: "Gagal menghapus data" };
  }
}
