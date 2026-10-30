import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { portfolioCategories, portfolios } from "@/lib/db/schema";
import { portfolioItems } from "@/lib/landing-data";
import { slugify } from "@/lib/slug";
import { isMissingTableError } from "@/lib/db/is-missing-table";
import type { PortfolioCard, PortfolioDetail } from "./types";

export async function getPortfolioProjects(limit?: number): Promise<PortfolioCard[]> {
  try {
    const query = db
      .select({
        id: portfolios.id,
        slug: portfolios.slug,
        name: portfolios.name,
        result: portfolios.result,
        linkPreview: portfolios.linkPreview,
        thumbnailHash: sql<string | null>`md5(nullif(${portfolios.thumbnail}, ''))`,
        categoryName: portfolioCategories.name,
      })
      .from(portfolios)
      .leftJoin(portfolioCategories, eq(portfolios.categoryId, portfolioCategories.id))
      .orderBy(desc(portfolios.createdAt));
    const rows = typeof limit === "number" ? await query.limit(limit) : await query;

    if (rows.length > 0) {
      const items: PortfolioCard[] = rows.map((item) => ({
        id: item.id,
        slug: item.slug,
        category: item.categoryName || "Tanpa Kategori",
        name: item.name,
        result: item.result || "Portfolio project",
        linkPreview: item.linkPreview,
        thumbnail: item.thumbnailHash
          ? `/api/portfolio-images/${encodeURIComponent(item.id)}/thumbnail/${item.thumbnailHash}`
          : null,
      }));
      return items;
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load portfolio projects.", error);
    }
  }

  const fallback: PortfolioCard[] = portfolioItems.map((item, index) => ({
    id: `fallback-${index}`,
    slug: slugify(item.name),
    category: item.category,
    name: item.name,
    result: item.result,
    thumbnail: null,
  }));
  return typeof limit === "number" ? fallback.slice(0, limit) : fallback;
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioDetail | null> {
  try {
    const [item] = await db
      .select({
        id: portfolios.id,
        slug: portfolios.slug,
        name: portfolios.name,
        result: portfolios.result,
        linkPreview: portfolios.linkPreview,
        role: portfolios.role,
        features: portfolios.features,
        thumbnailHash: sql<string | null>`md5(nullif(${portfolios.thumbnail}, ''))`,
        galleryHash0: sql<string | null>`md5(nullif((${portfolios.gallery})[1], ''))`,
        galleryHash1: sql<string | null>`md5(nullif((${portfolios.gallery})[2], ''))`,
        categoryName: portfolioCategories.name,
      })
      .from(portfolios)
      .leftJoin(portfolioCategories, eq(portfolios.categoryId, portfolioCategories.id))
      .where(eq(portfolios.slug, slug))
      .limit(1);

    if (item) {
      return {
        id: item.id,
        slug: item.slug,
        category: item.categoryName || "Tanpa Kategori",
        name: item.name,
        result: item.result || "Portfolio project",
        linkPreview: item.linkPreview,
        role: item.role,
        features: item.features,
        gallery: [item.galleryHash0, item.galleryHash1].flatMap((hash, index) =>
          hash ? [`/api/portfolio-images/${encodeURIComponent(item.id)}/gallery-${index}/${hash}`] : [],
        ),
        thumbnail: item.thumbnailHash
          ? `/api/portfolio-images/${encodeURIComponent(item.id)}/thumbnail/${item.thumbnailHash}`
          : null,
      };
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public portfolio detail.", error);
    }
  }

  const index = portfolioItems.findIndex((item) => slugify(item.name) === slug);
  const item = portfolioItems[index];

  return item
    ? {
        id: `fallback-${index}`,
        slug,
        category: item.category,
        name: item.name,
        result: item.result,
        role: null,
        features: [],
        gallery: [],
        thumbnail: null,
      }
    : null;
}
