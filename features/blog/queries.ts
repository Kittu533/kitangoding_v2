import { asc, count, desc, eq, sql } from "drizzle-orm";
import { sanitizeRichTextHtml } from "@/features/blog/content-utils";
import { db } from "@/lib/db";
import { blogCategories as blogCategoriesTable, blogPosts as blogPostsTable } from "@/lib/db/schema";
import { isMissingTableError } from "@/lib/db/is-missing-table";
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

const DEFAULT_BLOG_IMAGE = "/images/article-custom-website.svg";

// Covers uploaded from the dashboard are stored as data URLs. Never ship them inside pages:
// select a hash instead and let /api/blog-images serve the bytes as a cacheable image.
const publicImageColumns = {
  thumbnail: sql<string | null>`case when ${blogPostsTable.thumbnail} like 'data:%' then null else ${blogPostsTable.thumbnail} end`,
  thumbnailHash: sql<string | null>`case when ${blogPostsTable.thumbnail} like 'data:%' then md5(${blogPostsTable.thumbnail}) end`,
};

function resolveBlogImage(post: { id: string; thumbnail: string | null; thumbnailHash: string | null }) {
  if (post.thumbnailHash) {
    return `/api/blog-images/${encodeURIComponent(post.id)}/${post.thumbnailHash}`;
  }

  return post.thumbnail || DEFAULT_BLOG_IMAGE;
}

// Public blog content comes only from posts published in the admin dashboard.
export async function getPublicBlogPosts(limit?: number): Promise<PublicBlogCard[]> {
  try {
    const rows = await db
      .select({
        id: blogPostsTable.id,
        slug: blogPostsTable.slug,
        title: blogPostsTable.title,
        excerpt: blogPostsTable.excerpt,
        category: blogPostsTable.category,
        author: blogPostsTable.author,
        publishedAt: blogPostsTable.publishedAt,
        createdAt: blogPostsTable.createdAt,
        ...publicImageColumns,
      })
      .from(blogPostsTable)
      .where(eq(blogPostsTable.status, "published"))
      .orderBy(desc(blogPostsTable.publishedAt), desc(blogPostsTable.createdAt));

    const databaseItems = rows.map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt || "Insight praktis untuk membantu website bisnis tampil lebih meyakinkan.",
      image: resolveBlogImage(item),
      category: item.category,
      date: formatDate(item.publishedAt || item.createdAt),
      publishedAt: (item.publishedAt || item.createdAt)?.toISOString(),
      author: getBlogAuthorName(item.author),
    }));

    return typeof limit === "number" ? databaseItems.slice(0, limit) : databaseItems;
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public blog posts.", error);
    }
  }

  return [];
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

  return [{ label: "Semua Artikel", active: true }];
}

export async function getPublicBlogPostBySlug(slug: string): Promise<PublicBlogDetail | null> {
  try {
    const [post] = await db
      .select({
        id: blogPostsTable.id,
        slug: blogPostsTable.slug,
        title: blogPostsTable.title,
        excerpt: blogPostsTable.excerpt,
        content: blogPostsTable.content,
        category: blogPostsTable.category,
        author: blogPostsTable.author,
        tags: blogPostsTable.tags,
        status: blogPostsTable.status,
        publishedAt: blogPostsTable.publishedAt,
        createdAt: blogPostsTable.createdAt,
        updatedAt: blogPostsTable.updatedAt,
        ...publicImageColumns,
      })
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, slug))
      .limit(1);

    if (post && post.status === "published") {
      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || "Insight praktis untuk membantu website bisnis tampil lebih meyakinkan.",
        image: resolveBlogImage(post),
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

  return null;
}
