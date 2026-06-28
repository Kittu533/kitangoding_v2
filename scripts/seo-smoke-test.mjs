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
  "app/blog/page.tsx",
  "app/portfolio/page.tsx",
  "app/referensi/page.tsx",
  "app/project-inquiry/page.tsx",
]) {
  assert.match(
    read(file),
    /application\/ld\+json/,
    `${file} must include JSON-LD structured data`,
  );
}

const homePage = read("app/page.tsx");
assert.match(homePage, /export const metadata/, "app/page.tsx must define page-specific metadata");
assert.match(homePage, /canonical:/, "app/page.tsx must define canonical metadata");
assert.match(homePage, /openGraph:/, "app/page.tsx must define openGraph metadata");
assert.match(homePage, /twitter:/, "app/page.tsx must define twitter metadata");

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
assert.ok(fallbackBlogCount >= 15, "fallback blog content must include at least 15 SEO articles");
for (const slug of [
  "jasa-website-company-profile-umkm",
  "jasa-landing-page-untuk-iklan",
  "biaya-pembuatan-website-umkm",
  "jasa-toko-online-untuk-umkm",
  "website-bisnis-agar-mudah-ditemukan-google",
  "cara-membuat-website-bisnis-lebih-meyakinkan",
  "perbedaan-website-company-profile-dan-landing-page",
  "berapa-lama-pembuatan-website-bisnis",
  "konten-wajib-sebelum-bikin-website-umkm",
  "website-umkm-untuk-order-whatsapp",
  "partner-website-bisnis-area-jawa",
  "seo-lokal-website-umkm",
]) {
  assert.match(publicContent, new RegExp(slug), `missing SEO article: ${slug}`);
  assert.ok(
    sitemap.includes("fallbackBlogDetails") || new RegExp(slug).test(sitemap),
    `sitemap must include SEO article: ${slug}`,
  );
}

for (const path of [
  "public/images/article-template-umkm.svg",
  "public/images/article-custom-website.svg",
  "public/images/article-lead-strategy.svg",
  "public/images/article-company-profile.svg",
  "public/images/article-landing-page-ads.svg",
  "public/images/article-biaya-website.svg",
  "public/images/article-toko-online-umkm.svg",
  "public/images/article-google-discovery.svg",
  "public/images/article-website-trust.svg",
  "public/images/article-company-vs-landing.svg",
  "public/images/article-project-timeline.svg",
  "public/images/article-konten-website.svg",
  "public/images/article-whatsapp-order.svg",
  "public/images/article-website-jawa.svg",
  "public/images/article-seo-lokal.svg",
]) {
  assert.ok(existsSync(path), `missing blog/marketplace image asset: ${path}`);
}
