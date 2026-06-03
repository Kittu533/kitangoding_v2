"use server";

import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(1, "Nama klien wajib diisi"),
  role: z.string().optional(),
  quote: z.string().min(1, "Isi testimoni wajib diisi"),
  avatar: z.string().optional(),
});

export async function createTestimonial(data: z.infer<typeof testimonialSchema>) {
  try {
    const validatedData = testimonialSchema.parse(data);
    await db.insert(testimonials).values(validatedData);
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return { success: false, error: "Gagal menyimpan data" };
  }
}

export async function updateTestimonial(id: string, data: z.infer<typeof testimonialSchema>) {
  try {
    const validatedData = testimonialSchema.parse(data);
    await db.update(testimonials).set(validatedData).where(eq(testimonials.id, id));
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    return { success: false, error: "Gagal mengupdate data" };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await db.delete(testimonials).where(eq(testimonials.id, id));
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete testimonial:", error);
    return { success: false, error: "Gagal menghapus data" };
  }
}
