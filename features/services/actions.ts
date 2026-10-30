"use server";

import { isUnauthorizedAdminRequest, requireAdminSession } from "@/lib/admin-session";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { serviceSchema, type ServiceInput } from "@/features/services/schema";

export async function createService(data: ServiceInput) {
  try {
    await requireAdminSession();
    const validatedData = serviceSchema.parse(data);
    await db.insert(services).values(validatedData);
    revalidatePath("/admin/services");
    revalidatePath("/layanan");
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to create service:", error);
    return { success: false, error: "Gagal menyimpan data" };
  }
}

export async function updateService(id: string, data: ServiceInput) {
  try {
    await requireAdminSession();
    const validatedData = serviceSchema.parse(data);
    await db.update(services).set(validatedData).where(eq(services.id, id));
    revalidatePath("/admin/services");
    revalidatePath("/layanan");
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
    revalidatePath("/layanan");
    return { success: true };
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      return { success: false, error: "Sesi admin tidak valid" };
    }
    console.error("Failed to delete service:", error);
    return { success: false, error: "Gagal menghapus data" };
  }
}
