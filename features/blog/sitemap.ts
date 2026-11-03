import type { MetadataRoute } from "next";

type SitemapPost = {
  slug: string;
  status: string;
  updatedAt: Date | null;
  publishedAt: Date | null;
  createdAt: Date | null;
};

export function createBlogSitemapEntries(
  domain: string,
  posts: SitemapPost[],
  fallbackPosts: ReadonlyArray<{ slug: string }>,
): MetadataRoute.Sitemap {
  const managedSlugs = new Set(posts.map(post => post.slug));
  return [
    ...fallbackPosts.filter(post => !managedSlugs.has(post.slug)).map(post => ({
      url: `${domain}/blog/${post.slug}`,
    })),
    ...posts.filter(post => post.status === "published").map(post => ({
      url: `${domain}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt ?? post.createdAt ?? undefined,
    })),
  ];
}
