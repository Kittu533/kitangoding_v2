"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { createWhatsAppHref } from "@/lib/site";
import { consumeRateLimit } from "@/lib/rate-limit";
import { getRequestIpAddress } from "@/lib/request";

const leadSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(255),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional(),
  business: z.string().trim().max(255).optional(),
  service: z.string().trim().max(255).optional(),
  budget: z.string().trim().max(255).optional(),
  message: z.string().trim().min(10).max(2000),
  honeypot: z.string().optional(),
});

type LeadSubmissionInput = z.infer<typeof leadSubmissionSchema>;

export type SaveLeadSubmissionResult =
  | { success: true; whatsappHref: string }
  | {
      reason: "database_error" | "rate_limited" | "spam_detected" | "validation_error";
      success: false;
    };

function buildLeadMessage(data: LeadSubmissionInput) {
  const details = [
    `Nama: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `No. HP: ${data.phone}` : null,
    data.business ? `Bisnis: ${data.business}` : null,
    data.service ? `Kebutuhan: ${data.service}` : null,
    data.budget ? `Budget: ${data.budget}` : null,
    `Catatan: ${data.message}`,
  ].filter(Boolean) as string[];

  return ["Halo Kita Ngoding, saya ingin konsultasi website.", ...details].join("\n");
}

export async function saveLeadSubmission(input: unknown): Promise<SaveLeadSubmissionResult> {
  const parsed = leadSubmissionSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, reason: "validation_error" };
  }

  const data = parsed.data;

  if (data.honeypot?.trim()) {
    return { success: false, reason: "spam_detected" };
  }

  const requestHeaders = await headers();
  const ipAddress = getRequestIpAddress(requestHeaders);
  const rateLimitKey = ipAddress ? `ip:${ipAddress}` : `email:${data.email.toLowerCase()}`;
  const rateLimit = consumeRateLimit(rateLimitKey, { limit: 5, windowMs: 15 * 60_000 });

  if (!rateLimit.allowed) {
    return { success: false, reason: "rate_limited" };
  }

  const message = buildLeadMessage(data);

  try {
    await db.insert(leads).values({
      name: data.name,
      email: data.email,
      phone: data.phone?.trim() || null,
      service: data.service?.trim() || null,
      budget: data.budget?.trim() || null,
      message,
    });

    revalidatePath("/admin");
    revalidatePath("/admin/leads");

    return {
      success: true,
      whatsappHref: createWhatsAppHref(message),
    };
  } catch (error) {
    console.error("Failed to store lead submission:", error);
    return { success: false, reason: "database_error" };
  }
}
