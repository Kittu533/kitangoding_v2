import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { portfolioCategories, portfolios } from "@/lib/db/schema";
import { categories as marketplaceCategories, shopCreatives } from "@/lib/marketplace-data";
import { isMissingTableError } from "@/lib/db/is-missing-table";
import type { PublicCategoryCard, PublicCreativeCard } from "./types";

export async function getPublicCategories(limit = 4): Promise<PublicCategoryCard[]> {
  const fallbackItems = marketplaceCategories.map((item) => ({
    title: item.title,
    description: item.description,
  }));

  try {
    const [categoryRows, portfolioRows] = await Promise.all([
      db.select().from(portfolioCategories).orderBy(portfolioCategories.name),
      db.select({ categoryId: portfolios.categoryId }).from(portfolios),
    ]);

    if (categoryRows.length > 0) {
      const counts = portfolioRows.reduce<Record<string, number>>((accumulator, item) => {
        if (item.categoryId) {
          accumulator[item.categoryId] = (accumulator[item.categoryId] || 0) + 1;
        }
        return accumulator;
      }, {});

      const databaseItems = categoryRows.map((item) => {
        const count = counts[item.id] || 0;
        return {
          title: item.name,
          description:
            count > 0
              ? `${count} project siap dijadikan referensi untuk kategori ${item.name.toLowerCase()}.`
              : `Kategori ${item.name} siap dipakai untuk mengelompokkan project dan inspirasi bisnis.`,
          countLabel: `${count} project`,
        };
      });

      const mergedItems: PublicCategoryCard[] = [...databaseItems];

      for (const fallbackItem of fallbackItems) {
        if (mergedItems.length >= limit) {
          break;
        }

        if (!mergedItems.some((item) => item.title === fallbackItem.title)) {
          mergedItems.push(fallbackItem);
        }
      }

      return mergedItems.slice(0, limit);
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public categories.", error);
    }
  }

  return fallbackItems.slice(0, limit);
}

export async function getPublicCreatives(limit?: number): Promise<PublicCreativeCard[]> {
  try {
    const portfolioRows = await db
      .select({
        name: portfolios.name,
        thumbnail: portfolios.thumbnail,
        result: portfolios.result,
        categoryName: portfolioCategories.name,
      })
      .from(portfolios)
      .leftJoin(portfolioCategories, eq(portfolios.categoryId, portfolioCategories.id))
      .orderBy(desc(portfolios.createdAt));

    if (portfolioRows.length > 0) {
      const items = portfolioRows.map((item) => ({
        name: item.name,
        category: item.categoryName || "Website Project",
        description: item.result || "Project website yang siap disesuaikan dengan kebutuhan bisnismu.",
        price: "By Brief",
        image: item.thumbnail || "/images/studio/design-process.webp",
      }));

      return typeof limit === "number" ? items.slice(0, limit) : items;
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public creatives.", error);
    }
  }

  const fallback = typeof limit === "number" ? shopCreatives.slice(0, limit) : shopCreatives;
  return fallback.map((item) => ({
    name: item.name,
    category: item.category,
    description: item.description,
    price: item.price,
    image: item.image,
  }));
}
