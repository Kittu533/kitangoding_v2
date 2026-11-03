import assert from "node:assert/strict";
import test from "node:test";
import robots from "../app/robots";
import { normalizeSiteUrl } from "../lib/site";
import { serializeJsonLd } from "../lib/seo";
import { createBlogSitemapEntries } from "../features/blog/sitemap";

test("canonical origin excludes trailing paths, queries and fragments", () => {
  assert.equal(normalizeSiteUrl("https://www.kitangoding.my.id/?utm_source=test#home"), "https://www.kitangoding.my.id");
  assert.equal(normalizeSiteUrl("http://localhost:3007/"), "http://localhost:3007");
  assert.throws(() => normalizeSiteUrl("javascript:alert(1)"));
  assert.throws(() => normalizeSiteUrl("not-a-url"));
});

test("JSON-LD cannot break out of its script and still preserves text", () => {
  const data = { name: '</script><script>alert("x")</script>', description: "Desain < website & bisnis" };
  const serialized = serializeJsonLd(data);
  assert.ok(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), data);
});

test("sitemap uses CMS dates, suppresses drafts and keeps public fallback pages", () => {
  const createdAt = new Date("2026-01-01T00:00:00Z");
  const updatedAt = new Date("2026-10-30T00:00:00Z");
  const entries = createBlogSitemapEntries("https://example.com", [
    { slug: "published", status: "published", createdAt, updatedAt, publishedAt: createdAt },
    { slug: "draft", status: "draft", createdAt, updatedAt, publishedAt: null },
  ], [{ slug: "published" }, { slug: "draft" }, { slug: "fallback" }]);
  assert.deepEqual(entries, [
    { url: "https://example.com/blog/fallback" },
    { url: "https://example.com/blog/published", lastModified: updatedAt },
  ]);
});

test("robots permits public portfolio images without opening other APIs", () => {
  const rules = robots().rules;
  assert.ok(!Array.isArray(rules));
  assert.deepEqual(rules.allow, ["/", "/api/portfolio-images/"]);
  assert.ok(rules.disallow?.includes("/api"));
  assert.ok(rules.disallow?.includes("/admin"));
});
