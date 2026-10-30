import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { pricings } from "@/lib/db/schema";
import { marketplacePricing } from "@/lib/marketplace-data";
import { pricingPlans } from "@/lib/landing-data";
import { isMissingTableError } from "@/lib/db/is-missing-table";
import type { PublicPricingPlan } from "./types";

function getPriceOrderValue(price: string) {
  const normalized = price.toLowerCase().replace(/\s+/g, "");
  const numericPart = normalized.match(/(\d+(?:[.,]\d+)?)/)?.[1];

  if (!numericPart) {
    return Number.POSITIVE_INFINITY;
  }

  const amount = Number.parseFloat(numericPart.replace(",", "."));

  if (Number.isNaN(amount)) {
    return Number.POSITIVE_INFINITY;
  }

  if (normalized.includes("jt")) {
    return amount * 1_000_000;
  }

  if (normalized.includes("rb")) {
    return amount * 1_000;
  }

  return amount;
}

export function normalizePublicPricingPlans<T extends PublicPricingPlan>(plans: T[]) {
  const sortedPlans = [...plans].sort((left, right) => {
    const leftPrice = getPriceOrderValue(left.price);
    const rightPrice = getPriceOrderValue(right.price);

    if (leftPrice !== rightPrice) {
      return leftPrice - rightPrice;
    }

    return left.name.localeCompare(right.name);
  });

  let hasFeaturedPlan = false;

  return sortedPlans.map((plan) => {
    const featured = plan.featured && !hasFeaturedPlan;
    hasFeaturedPlan ||= featured;

    return featured === plan.featured ? plan : { ...plan, featured };
  });
}

export async function getPublicPricing(): Promise<PublicPricingPlan[]> {
  try {
    const pricingRows = await db.select().from(pricings).orderBy(desc(pricings.isFeatured), desc(pricings.createdAt));

    if (pricingRows.length > 0) {
      return normalizePublicPricingPlans(pricingRows.map((item) => ({
        name: item.name,
        price: item.price,
        description: item.description || "Paket website yang bisa disesuaikan dengan kebutuhan bisnis kamu.",
        features: Array.isArray(item.features) ? item.features : [],
        featured: item.isFeatured,
      })));
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public pricing.", error);
    }
  }

  return normalizePublicPricingPlans(pricingPlans.map((item) => ({
    name: item.name,
    price: item.price,
    description: item.description,
    features: [...item.features],
    featured: item.featured,
  })));
}

export async function getHomepagePricing(): Promise<PublicPricingPlan[]> {
  const pricing = await getPublicPricing();

  if (pricing.length >= 2) {
    return pricing.slice(0, 2);
  }

  return marketplacePricing.map((item) => ({
    name: item.name,
    price: item.price,
    description: item.description,
    features: [...item.features],
    featured: item.note.length > 0,
  }));
}

