import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");

const sitemap = read("app/sitemap.ts");
const manifestExists = existsSync("app/manifest.ts");
const openGraphImageExists =
  existsSync("app/og-image.png/route.tsx") || existsSync("public/og-image.png");

assert.match(sitemap, /\/referensi/, "sitemap must include /referensi");
assert.ok(manifestExists, "app/manifest.ts must exist");
assert.ok(openGraphImageExists, "/og-image.png route or asset must exist");

for (const file of [
  "app/layanan/page.tsx",
  "app/shop/page.tsx",
  "app/contact/page.tsx",
]) {
  assert.match(
    read(file),
    /application\/ld\+json/,
    `${file} must include JSON-LD structured data`,
  );
}

const processShowcase = read("components/organisms/ProcessShowcase.tsx");
assert.doesNotMatch(
  processShowcase,
  /<Image[\s\S]*?alt=""/,
  "ProcessShowcase informative images must not have empty alt text",
);

const layout = read("app/layout.tsx");
assert.ok(
  existsSync("public/favicon.ico") || !layout.includes("/favicon.ico"),
  "layout must not reference a missing favicon.ico",
);

const publicContent = read("lib/public-content.ts");
const fallbackBlogCount = publicContent.match(/slug: "/g)?.length ?? 0;
assert.ok(fallbackBlogCount >= 9, "fallback blog content must include at least 9 SEO articles");
for (const slug of [
  "jasa-website-company-profile-umkm",
  "jasa-landing-page-untuk-iklan",
  "biaya-pembuatan-website-umkm",
  "jasa-toko-online-untuk-umkm",
  "website-bisnis-agar-mudah-ditemukan-google",
  "cara-membuat-website-bisnis-lebih-meyakinkan",
]) {
  assert.match(publicContent, new RegExp(slug), `missing SEO article: ${slug}`);
  assert.ok(
    sitemap.includes("fallbackBlogDetails") || new RegExp(slug).test(sitemap),
    `sitemap must include SEO article: ${slug}`,
  );
}
