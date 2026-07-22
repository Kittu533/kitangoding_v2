import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { portfolios } from "@/lib/db/schema";

type RouteContext = {
  params: Promise<{ id: string; slot: string; version: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const { slot, version } = await params;
  const galleryMatch = /^gallery-([01])$/.exec(slot);

  if (!/^[a-f\d]{32}$/.test(version) || (slot !== "thumbnail" && !galleryMatch)) {
    return new Response(null, { status: 400 });
  }

  let source: string | null | undefined;

  if (slot === "thumbnail") {
    const [item] = await db
      .select({ source: portfolios.thumbnail })
      .from(portfolios)
      .where(sql`md5(nullif(${portfolios.thumbnail}, '')) = ${version}`)
      .limit(1);
    source = item?.source;
  } else {
    const galleryIndex = Number(galleryMatch?.[1]) + 1;
    const [item] = await db
      .select({ source: sql<string | null>`(${portfolios.gallery})[${galleryIndex}]` })
      .from(portfolios)
      .where(sql`md5(nullif((${portfolios.gallery})[${galleryIndex}], '')) = ${version}`)
      .limit(1);
    source = item?.source;
  }

  if (!source) {
    return new Response(null, { status: 404 });
  }

  if (!source.startsWith("data:image/")) {
    const imageUrl = new URL(source, request.url);
    return ["http:", "https:"].includes(imageUrl.protocol)
      ? Response.redirect(imageUrl)
      : new Response(null, { status: 400 });
  }

  const image = await fetch(source);

  return new Response(image.body, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": image.headers.get("content-type") || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
