import type { MetadataRoute } from "next";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { fallbackBlogDetails } from "@/features/blog/content";
import { createBlogSitemapEntries } from "@/features/blog/sitemap";
import { getPortfolioProjects } from "@/features/portfolio/queries";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogEntries: MetadataRoute.Sitemap = [];
  blogEntries = createBlogSitemapEntries(siteConfig.domain, [], fallbackBlogDetails);
  const portfolioEntries: MetadataRoute.Sitemap = (await getPortfolioProjects()).map(project => ({
    url: `${siteConfig.domain}/portfolio/${project.slug}`,
  }));

  try {
    const managedPosts = await db
      .select({
        slug: blogPosts.slug,
        status: blogPosts.status,
        publishedAt: blogPosts.publishedAt,
        updatedAt: blogPosts.updatedAt,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt));

    blogEntries = createBlogSitemapEntries(siteConfig.domain, managedPosts, fallbackBlogDetails);
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
    {
      url: `${siteConfig.domain}/jasa-redesign-website`,
    },
    ...portfolioEntries,
    ...blogEntries,
  ];

  return entries.filter(
    (entry, index, array) => array.findIndex((item) => item.url === entry.url) === index,
  );
}
