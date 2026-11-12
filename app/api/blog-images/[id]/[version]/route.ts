import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";

type RouteContext = {
  params: Promise<{ id: string; version: string }>;
};

// Raster formats only. SVG is excluded on purpose: opened directly from our origin it could run scripts.
const RASTER_DATA_URL = /^data:(image\/(?:png|jpeg|webp|gif|avif));base64,([A-Za-z0-9+/=\s]+)$/;

// Serves a published blog cover stored as a data URL in the database, so pages and social
// previews reference a small cacheable URL instead of inlining the whole base64 string.
export async function GET(_request: Request, { params }: RouteContext) {
  const { id, version } = await params;

  if (!id || !/^[a-f\d]{32}$/.test(version)) {
    return new Response(null, { status: 400 });
  }

  const [item] = await db
    .select({ source: blogPosts.thumbnail })
    .from(blogPosts)
    .where(
      and(
        eq(blogPosts.id, id),
        eq(blogPosts.status, "published"),
        sql`md5(nullif(${blogPosts.thumbnail}, '')) = ${version}`,
      ),
    )
    .limit(1);

  const match = item?.source ? RASTER_DATA_URL.exec(item.source) : null;
  if (!match) {
    return new Response(null, { status: 404 });
  }

  const body = Buffer.from(match[2].replace(/\s/g, ""), "base64");

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(body.length),
      "Content-Type": match[1],
      "X-Content-Type-Options": "nosniff",
    },
  });
}
