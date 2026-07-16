import type { MetadataRoute } from "next";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { fallbackBlogDetails } from "@/lib/public-content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogEntries: MetadataRoute.Sitemap = [];
  const fallbackBlogEntries: MetadataRoute.Sitemap = fallbackBlogDetails.map((post) => ({
    url: `${siteConfig.domain}/blog/${post.slug}`,
  }));

  try {
    const publishedPosts = await db
      .select({
        slug: blogPosts.slug,
        publishedAt: blogPosts.publishedAt,
        updatedAt: blogPosts.updatedAt,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt));

    blogEntries = publishedPosts.map((post) => ({
      url: `${siteConfig.domain}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt ?? post.createdAt ?? undefined,
    }));
  } catch (error) {
    console.warn("Failed to load blog entries for sitemap.", error);
  }

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteConfig.domain,
    },
    {
      url: `${siteConfig.domain}/shop`,
    },
    {
      url: `${siteConfig.domain}/layanan`,
    },
    {
      url: `${siteConfig.domain}/portfolio`,
    },
    {
      url: `${siteConfig.domain}/referensi`,
    },
    {
      url: `${siteConfig.domain}/pricing`,
    },
    {
      url: `${siteConfig.domain}/blog`,
    },
    {
      url: `${siteConfig.domain}/contact`,
    },
    {
      url: `${siteConfig.domain}/tentang`,
    },
    {
      url: `${siteConfig.domain}/project-inquiry`,
    },
    {
      url: `${siteConfig.domain}/jasa-website-company-profile`,
    },
    {
      url: `${siteConfig.domain}/jasa-landing-page-bisnis`,
    },
    {
      url: `${siteConfig.domain}/jasa-toko-online-umkm`,
    },
    ...fallbackBlogEntries,
    ...blogEntries,
  ];

  return entries.filter(
    (entry, index, array) => array.findIndex((item) => item.url === entry.url) === index,
  );
}
