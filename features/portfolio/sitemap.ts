import type { MetadataRoute } from "next";

export type PortfolioSitemapRow = {
  slug: string;
  updatedAt: Date | null;
};

// `lastModified` is only published when the project has a real edit time, so crawlers never
// get a made-up date (Google ignores <lastmod> from sites whose dates are unreliable).
export function createPortfolioSitemapEntries(domain: string, rows: PortfolioSitemapRow[]): MetadataRoute.Sitemap {
  return rows.map(row => ({
    url: `${domain}/portfolio/${row.slug}`,
    ...(row.updatedAt ? { lastModified: row.updatedAt } : {}),
  }));
}
