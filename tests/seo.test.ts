import assert from "node:assert/strict";
import test from "node:test";
import robots from "../app/robots";
import { normalizeSiteUrl } from "../lib/site";
import { buildPageTitle, serializeJsonLd } from "../lib/seo";
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

test("sitemap lists only published CMS posts with their modified dates", () => {
  const createdAt = new Date("2026-01-01T00:00:00Z");
  const updatedAt = new Date("2026-10-30T00:00:00Z");
  const entries = createBlogSitemapEntries("https://example.com", [
    { slug: "published", status: "published", createdAt, updatedAt, publishedAt: createdAt },
    { slug: "draft", status: "draft", createdAt, updatedAt, publishedAt: null },
  ]);
  assert.deepEqual(entries, [
    { url: "https://example.com/blog/published", lastModified: updatedAt },
  ]);
  assert.deepEqual(createBlogSitemapEntries("https://example.com", []), []);
});

test("robots permits public portfolio and blog images without opening other APIs", () => {
  const rules = robots().rules;
  assert.ok(!Array.isArray(rules));
  assert.deepEqual(rules.allow, ["/", "/api/portfolio-images/", "/api/blog-images/"]);
  assert.ok(rules.disallow?.includes("/api"));
  assert.ok(rules.disallow?.includes("/admin"));
});

test("page titles use the most complete candidate that fits 60 characters", () => {
  const candidates = (name: string): string[][] => [[name, "Portfolio", "Kitangoding"], [name, "Kitangoding"], [name]];
  assert.equal(buildPageTitle(...candidates("Laundry App")), "Laundry App | Portfolio | Kitangoding");
  assert.equal(
    buildPageTitle(...candidates("HRIS - Human Resource Information System")),
    "HRIS - Human Resource Information System | Kitangoding",
  );
  const long = "Website Company Profile atau Landing Page: Mana yang Cocok untuk Bisnismu";
  assert.equal(buildPageTitle(...candidates(long)), long, "the page's own title is never truncated");
  assert.equal(buildPageTitle(["  ", "A", ""]), "A");
});
