import type { MetadataRoute } from "next";

type SitemapPost = {
  slug: string;
  status: string;
  updatedAt: Date | null;
  publishedAt: Date | null;
  createdAt: Date | null;
};

// Only posts published from the admin dashboard are listed; drafts stay out of the sitemap.
export function createBlogSitemapEntries(domain: string, posts: SitemapPost[]): MetadataRoute.Sitemap {
  return posts
    .filter(post => post.status === "published")
    .map(post => ({
      url: `${domain}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt ?? post.createdAt ?? undefined,
    }));
}
