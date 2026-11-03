import { asc, count, desc, eq } from "drizzle-orm";
import { sanitizeRichTextHtml } from "@/features/blog/content-utils";
import { db } from "@/lib/db";
import { blogCategories as blogCategoriesTable, blogPosts as blogPostsTable } from "@/lib/db/schema";
import { isMissingTableError } from "@/lib/db/is-missing-table";
import { fallbackBlogDetails } from "./content";
import { getBlogAuthorName } from "./authors";
import type { PublicBlogCard, PublicBlogCategory, PublicBlogDetail } from "./types";

export async function getAdminBlogPostsPage(page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;

  try {
    const [countResult, data] = await Promise.all([
      db.select({ value: count() }).from(blogPostsTable),
      db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.createdAt)).limit(pageSize).offset(offset),
    ]);
    const totalItems = countResult[0].value;

    return { data, totalPages: Math.ceil(totalItems / pageSize) || 1 };
  } catch (error) {
    console.warn("Database not ready", error);
    return { data: [], totalPages: 1 };
  }
}

export async function getAdminBlogCategoriesPage(page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;

  try {
    const [countResult, data] = await Promise.all([
      db.select({ value: count() }).from(blogCategoriesTable),
      db.select().from(blogCategoriesTable).orderBy(desc(blogCategoriesTable.createdAt)).limit(pageSize).offset(offset),
    ]);
    const totalItems = countResult[0].value;

    return { data, totalPages: Math.ceil(totalItems / pageSize) || 1 };
  } catch (error) {
    console.warn("Blog categories table is not ready yet.", error);
    return { data: [], totalPages: 1 };
  }
}

export async function getBlogCategoryNames() {
  return db.select({ name: blogCategoriesTable.name }).from(blogCategoriesTable).orderBy(asc(blogCategoriesTable.name));
}

export async function getAdminBlogPostForEdit(id: string) {
  const [posts, categories] = await Promise.all([
    db.select().from(blogPostsTable).where(eq(blogPostsTable.id, id)).limit(1),
    getBlogCategoryNames(),
  ]);

  return { post: posts[0], categories };
}

function formatDate(date: Date | null) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function getPublicBlogPosts(limit?: number): Promise<PublicBlogCard[]> {
  const fallbackItems = fallbackBlogDetails.map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    image: item.image,
    category: item.category,
    date: item.date,
    author: getBlogAuthorName(item.author),
  }));

  try {
    const rows = await db
      .select()
      .from(blogPostsTable)
      .orderBy(desc(blogPostsTable.publishedAt), desc(blogPostsTable.createdAt));

    if (rows.length > 0) {
      const databaseItems = rows.filter(item => item.status === "published").map((item) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt || "Insight praktis untuk membantu website bisnis tampil lebih meyakinkan.",
        image: item.thumbnail || "/images/article-custom-website.svg",
        category: item.category,
        date: formatDate(item.publishedAt || item.createdAt),
        publishedAt: (item.publishedAt || item.createdAt)?.toISOString(),
        author: getBlogAuthorName(item.author),
      }));

      return typeof limit === "number" ? databaseItems.slice(0, limit) : databaseItems;
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public blog posts.", error);
    }
  }

  return typeof limit === "number" ? fallbackItems.slice(0, limit) : fallbackItems;
}

export async function getPublicBlogCategories(): Promise<PublicBlogCategory[]> {
  try {
    const [rows, publishedPosts] = await Promise.all([
      db.select().from(blogCategoriesTable).orderBy(blogCategoriesTable.name),
      db
        .select({ category: blogPostsTable.category })
        .from(blogPostsTable)
        .where(eq(blogPostsTable.status, "published")),
    ]);
    const labels = [...rows.map((item) => item.name), ...publishedPosts.map((item) => item.category)]
      .filter((item, index, array) => array.indexOf(item) === index);

    if (labels.length > 0) {
      return [
        { label: "Semua Artikel", active: true },
        ...labels.map((label) => ({
          label,
        })),
      ];
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public blog categories.", error);
    }
  }

  return [
    { label: "Semua Artikel", active: true },
    ...fallbackBlogDetails.map((item) => ({ label: item.category })),
  ].filter((item, index, array) => array.findIndex((entry) => entry.label === item.label) === index);
}

export async function getPublicBlogPostBySlug(slug: string): Promise<PublicBlogDetail | null> {
  try {
    const [post] = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, slug))
      .limit(1);

    if (post && post.status === "published") {
      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || "Insight praktis untuk membantu website bisnis tampil lebih meyakinkan.",
        image: post.thumbnail || "/images/article-custom-website.svg",
        category: post.category,
        date: formatDate(post.publishedAt || post.createdAt),
        content: sanitizeRichTextHtml(post.content || post.excerpt || "Konten artikel akan segera hadir."),
        contentFormat: "html",
        publishedAt: (post.publishedAt || post.createdAt)?.toISOString(),
        modifiedAt: post.updatedAt?.toISOString(),
        author: getBlogAuthorName(post.author),
        tags: post.tags,
      };
    }
    if (post) return null;
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public blog detail.", error);
    }
  }

  return fallbackBlogDetails.find((item) => item.slug === slug) ?? null;
}
