import { asc, count, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { services as fallbackServices } from "@/lib/landing-data";
import { isMissingTableError } from "@/lib/db/is-missing-table";
import type { PublicServiceCard } from "./types";

const fallbackServiceDescriptions = new Map<string, string>(
  fallbackServices.map((service) => [service.title, service.description] as const)
);

export function mapPublicServices(
  rows: Array<{
    title: string;
    description: string | null;
    price: string | null;
    icon: string | null;
  }>
): PublicServiceCard[] {
  return rows.map((item) => ({
    title: item.title,
    description:
      item.description?.trim() ||
      fallbackServiceDescriptions.get(item.title) ||
      "Website service yang bisa disesuaikan dengan kebutuhan bisnis kamu.",
    price: item.price,
    icon: item.icon,
  }));
}

export async function getPublicServices(limit?: number): Promise<PublicServiceCard[]> {
  try {
    const rows = await db
      .select({
        title: services.title,
        description: services.description,
        price: services.price,
        icon: services.icon,
      })
      .from(services)
      .orderBy(asc(services.createdAt));

    if (rows.length > 0) {
      const items = mapPublicServices(rows);
      return typeof limit === "number" ? items.slice(0, limit) : items;
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public services.", error);
    }
  }

  const fallback = fallbackServices.map((item) => ({
    title: item.title,
    description: item.description,
    price: null,
    icon: null,
  }));

  return typeof limit === "number" ? fallback.slice(0, limit) : fallback;
}

export async function getAdminServicesPage(page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;

  try {
    const [countResult, data] = await Promise.all([
      db.select({ value: count() }).from(services),
      db.select().from(services).orderBy(desc(services.createdAt)).limit(pageSize).offset(offset),
    ]);
    const totalItems = countResult[0].value;

    return { data, totalPages: Math.ceil(totalItems / pageSize) || 1 };
  } catch (error) {
    console.warn("Database not ready", error);
    return { data: [], totalPages: 1 };
  }
}
