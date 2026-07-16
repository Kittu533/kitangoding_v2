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
assert.match(
  homePage,
  /title:\s*\{\s*absolute:\s*`\$\{siteConfig\.name\} \| Jasa Pembuatan Website UMKM`/s,
  "homepage title must lead with kitangoding.id",
);
assert.match(homePage, /canonical:/, "app/page.tsx must define canonical metadata");
assert.match(homePage, /openGraph:/, "app/page.tsx must define openGraph metadata");
assert.match(homePage, /twitter:/, "app/page.tsx must define twitter metadata");

for (const [file, targetKeyword] of [
  ["app/layanan/page.tsx", "jasa pembuatan website"],
  ["app/pricing/page.tsx", "harga jasa pembuatan website"],
  ["app/contact/page.tsx", "konsultasi website"],
  ["app/portfolio/page.tsx", "portfolio website bisnis"],
  ["app/referensi/page.tsx", "referensi desain website"],
  ["app/shop/page.tsx", "template website bisnis"],
  ["app/project-inquiry/page.tsx", "konsultasi project website"],
  ["app/blog/page.tsx", "blog website UMKM"],
]) {
  const source = read(file);
  assert.match(
    source,
    /keywords:\s*\[\s*siteConfig\.name,/s,
    `${file} must lead its keyword map with kitangoding.id`,
  );
  assert.ok(source.includes(`"${targetKeyword}"`), `${file} must target ${targetKeyword}`);
}

const processShowcase = read("components/organisms/ProcessShowcase.tsx");
assert.doesNotMatch(
  processShowcase,
  /<Image[\s\S]*?alt=""/,
  "ProcessShowcase informative images must not have empty alt text",
);

for (const file of [
  "components/molecules/HeroPreviewCarousel.tsx",
  "components/molecules/PortfolioCard.tsx",
]) {
  assert.doesNotMatch(
    read(file),
    /quality=\{\d+\}/,
    `${file} must use the configured Next Image quality`,
  );
}

const layout = read("app/layout.tsx");
assert.ok(
  existsSync("public/favicon.ico") || !layout.includes("/favicon.ico"),
  "layout must not reference a missing favicon.ico",
);

const publicContent = read("lib/public-content.ts");
const articlePage = read("app/blog/[slug]/page.tsx");
assert.match(articlePage, /\^##\\s\+/, "article renderer must support ## headings");
assert.match(articlePage, /datePublished/, "Article JSON-LD must expose a valid publication date");
assert.match(publicContent, /"id-ID"/, "visible blog dates must use Indonesian locale");

for (const slug of [
  "biaya-pembuatan-website-umkm",
  "perbedaan-website-company-profile-dan-landing-page",
  "jasa-landing-page-untuk-iklan",
  "jasa-toko-online-untuk-umkm",
  "cara-membuat-website-bisnis-lebih-meyakinkan",
]) {
  const start = publicContent.indexOf(`slug: "${slug}"`);
  const next = publicContent.indexOf("slug: ", start + 8);
  const block = publicContent.slice(start, next < 0 ? undefined : next);
  assert.match(block, /## /, `${slug} must contain section headings`);
  assert.match(block, /kitangoding\.id/, `${slug} must identify the authoring brand`);
  assert.ok(block.split(/\s+/).length >= 250, `${slug} must contain substantive guidance`);
}

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

const brand = "kitangoding.id";
const canonicalBrandSource = read("lib/site.ts");

assert.match(
  canonicalBrandSource,
  /name:\s*"kitangoding\.id"/,
  "siteConfig must use kitangoding.id as the canonical brand",
);

for (const file of [
  "app/layout.tsx",
  "app/page.tsx",
  "app/layanan/page.tsx",
  "app/pricing/page.tsx",
  "app/contact/page.tsx",
  "app/portfolio/page.tsx",
  "app/referensi/page.tsx",
  "app/shop/page.tsx",
  "app/project-inquiry/page.tsx",
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
  "lib/service-landing-pages.ts",
]) {
  assert.match(read(file), /kitangoding\.id|siteConfig\.name/, `${file} must use ${brand}`);
}

assert.match(read("app/manifest.ts"), /siteConfig\.name/, "manifest must use canonical brand");
assert.match(
  read("app/og-image.png/route.tsx"),
  /siteConfig\.name/,
  "OG image must use canonical brand",
);

const robots = read("app/robots.ts");
assert.doesNotMatch(robots, /["']\/_next["']/, "robots must allow Next.js rendering assets");
assert.doesNotMatch(
  sitemap,
  /const lastModified = new Date\(\)/,
  "static sitemap entries must not claim request-time freshness",
);
assert.doesNotMatch(sitemap, /changeFrequency:|priority:/, "sitemap must omit ignored hints");

assert.ok(existsSync("app/tentang/page.tsx"), "/tentang brand entity page must exist");
assert.match(sitemap, /\/tentang/, "sitemap must include /tentang");
assert.match(read("app/page.tsx"), /alternateName:\s*siteConfig\.alternateName/);
assert.match(read("app/blog/[slug]/page.tsx"), /\/tentang/);

const marketplaceHome = read("components/templates/MarketplaceHome.tsx");
assert.doesNotMatch(marketplaceHome, /services\[index\]/, "services must not be paired by array order");

for (const file of [
  "components/organisms/PortfolioSection.tsx",
  "components/organisms/PortfolioGallery.tsx",
]) {
  assert.doesNotMatch(
    read(file),
    /sudah live|bisa kamu cek/i,
    `${file} must not claim unverified live URLs`,
  );
}
