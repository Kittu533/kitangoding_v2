"use server";

import { isUnauthorizedAdminRequest, requireAdminSession } from "@/lib/admin-session";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const serviceSchema = z.object({
  title: z.string().min(1, "Nama layanan wajib diisi"),
  description: z.string().optional(),
  price: z.string().optional(),
  icon: z.string().optional(),
});

export async function createService(data: z.infer<typeof serviceSchema>) {
  try {
    await requireAdminSession();
    const validatedData = serviceSchema.parse(data);
    await db.insert(services).values(validatedData);
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to create service:", error);
    return { success: false, error: "Gagal menyimpan data" };
  }
}

export async function updateService(id: string, data: z.infer<typeof serviceSchema>) {
  try {
    await requireAdminSession();
    const validatedData = serviceSchema.parse(data);
    await db.update(services).set(validatedData).where(eq(services.id, id));
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to update service:", error);
    return { success: false, error: "Gagal mengupdate data" };
  }
}

export async function deleteService(id: string) {
  try {
    await requireAdminSession();
    await db.delete(services).where(eq(services.id, id));
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to delete service:", error);
    return { success: false, error: "Gagal menghapus data" };
  }
}
