"use server";

import { db } from "@/lib/db";
import { pricings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const pricingSchema = z.object({
  name: z.string().min(1, "Nama paket wajib diisi"),
  price: z.string().min(1, "Harga wajib diisi"),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
});

export async function createPricing(data: z.infer<typeof pricingSchema>) {
  try {
    const validatedData = pricingSchema.parse(data);
    await db.insert(pricings).values(validatedData);
    revalidatePath("/admin/pricing");
    revalidatePath("/");
    revalidatePath("/pricing");
    return { success: true };
  } catch (error) {
    console.error("Failed to create pricing:", error);
    return { success: false, error: "Gagal menyimpan data" };
  }
}

export async function updatePricing(id: string, data: z.infer<typeof pricingSchema>) {
  try {
    const validatedData = pricingSchema.parse(data);
    await db.update(pricings).set(validatedData).where(eq(pricings.id, id));
    revalidatePath("/admin/pricing");
    revalidatePath("/");
    revalidatePath("/pricing");
    return { success: true };
  } catch (error) {
    console.error("Failed to update pricing:", error);
    return { success: false, error: "Gagal mengupdate data" };
  }
}

export async function deletePricing(id: string) {
  try {
    await db.delete(pricings).where(eq(pricings.id, id));
    revalidatePath("/admin/pricing");
    revalidatePath("/");
    revalidatePath("/pricing");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete pricing:", error);
    return { success: false, error: "Gagal menghapus data" };
  }
}
