# kitangoding.id Brand SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `kitangoding.id` the exact public brand on every indexable surface, fix confirmed crawler/content defects, and strengthen five commercial-intent articles.

**Architecture:** Keep `lib/site.ts` as the identity source, use the root title template for final document titles, and update distributed page descriptions/OG metadata because Next.js 16.2.6 merges nested metadata shallowly. Reuse existing public components and content storage; add only `/tentang` and no dependencies or database changes.

**Tech Stack:** Next.js 16.2.6 App Router, React 19, TypeScript, Node test runner, existing SEO smoke script.

## Global Constraints

- The exact canonical brand is lowercase `kitangoding.id`.
- `Kita Ngoding` may appear only as structured-data `alternateName` after migration.
- Every indexable page must emit a title, description, and keywords metadata value containing `kitangoding.id`.
- Do not invent portfolio URLs, client metrics, testimonials, biographies, guarantees, or renewal prices.
- Do not add dependencies, migrations, or speculative abstractions.
- Keep admin/login routes noindex.
- Apply all file changes with `apply_patch`; prefix verification shell commands with `rtk`.

---

### Task 1: Canonical Brand and Metadata Regression Guard

**Files:**
- Modify: `scripts/seo-smoke-test.mjs`
- Modify: `lib/site.ts`
- Modify: `app/layout.tsx`
- Modify: `app/manifest.ts`
- Modify: `app/og-image.png/route.tsx`
- Modify: `app/page.tsx`
- Modify: `app/layanan/page.tsx`
- Modify: `app/pricing/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/portfolio/page.tsx`
- Modify: `app/referensi/page.tsx`
- Modify: `app/shop/page.tsx`
- Modify: `app/project-inquiry/page.tsx`
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `lib/service-landing-pages.ts`
- Modify: public brand copy under `components/` and `lib/`

**Interfaces:**
- Consumes: existing `siteConfig`, Next.js `Metadata`, service/blog metadata generators.
- Produces: `siteConfig.name === "kitangoding.id"`, branded metadata and public copy.

- [ ] **Step 1: Add failing brand assertions**

Append this test block to `scripts/seo-smoke-test.mjs`:

```js
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
assert.match(read("app/og-image.png/route.tsx"), /siteConfig\.name/, "OG image must use canonical brand");
```

- [ ] **Step 2: Run the check and confirm RED**

Run: `rtk npm run test:seo`

Expected: FAIL at `siteConfig must use kitangoding.id as the canonical brand`.

- [ ] **Step 3: Make `siteConfig` authoritative**

Replace the identity fields in `lib/site.ts` with:

```ts
export const siteConfig = {
  name: "kitangoding.id",
  shortName: "kitangoding.id",
  alternateName: "Kita Ngoding",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "kitangoding.id adalah jasa pembuatan website untuk UMKM, brand lokal, dan bisnis jasa di Jogja, Solo, Wonogiri, dan area Jawa.",
  domain: process.env.NEXT_PUBLIC_APP_URL || "https://www.kitangoding.my.id",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-RY3471CB04",
  email: process.env.NEXT_PUBLIC_SITE_EMAIL || "halo@kitangoding.com",
  phoneDisplay: process.env.NEXT_PUBLIC_SITE_PHONE_DISPLAY || "+62 812-3456-7890",
  phoneHref: normalizePhoneHref(process.env.NEXT_PUBLIC_SITE_PHONE_HREF || "6281234567890"),
  addressLocality: process.env.NEXT_PUBLIC_SITE_ADDRESS_LOCALITY || "Sendangadi, Mlati",
  addressRegion: process.env.NEXT_PUBLIC_SITE_ADDRESS_REGION || "Sleman, DI Yogyakarta",
  addressCountry: process.env.NEXT_PUBLIC_SITE_ADDRESS_COUNTRY || "ID",
  instagram: process.env.NEXT_PUBLIC_SITE_INSTAGRAM || "https://instagram.com/kitangoding.id",
  tiktok: process.env.NEXT_PUBLIC_SITE_TIKTOK || "https://tiktok.com/@ryobisuryaatmaja",
  tagline: "Jasa pembuatan website untuk UMKM, brand lokal, dan bisnis jasa yang ingin lebih mudah dipahami dan dihubungi.",
} as const;
```

Change the default WhatsApp greeting to:

```ts
"Halo kitangoding.id, saya ingin konsultasi website untuk bisnis saya."
```

- [ ] **Step 4: Brand the root metadata once**

In `app/layout.tsx`, use:

```ts
title: {
  default: `Jasa Pembuatan Website UMKM | ${siteConfig.name}`,
  template: `%s | ${siteConfig.name}`,
},
description: siteConfig.description,
keywords: [
  "kitangoding.id",
  "kitangoding id",
  "Kita Ngoding",
  "jasa pembuatan website",
  "website UMKM",
  "website company profile",
  "landing page UMKM",
  "jasa website Jogja",
  "jasa website Solo",
  "jasa website Wonogiri",
],
```

Keep page `title` values topic-only so the root template appends the brand once. Update all explicit Open Graph/Twitter titles and descriptions to contain `kitangoding.id` or `${siteConfig.name}`.

- [ ] **Step 5: Update indexable descriptions and keywords**

Apply the exact substitution `Kita Ngoding` → `kitangoding.id` inside metadata descriptions, Open Graph fields, Twitter fields, and JSON-LD names in these files: `app/page.tsx`, `app/layanan/page.tsx`, `app/pricing/page.tsx`, `app/contact/page.tsx`, `app/portfolio/page.tsx`, `app/referensi/page.tsx`, `app/shop/page.tsx`, `app/project-inquiry/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, and `lib/service-landing-pages.ts`. Keep root keywords inherited where no page-specific array exists. Add `"kitangoding.id"` as the first entry in the homepage and service-landing keyword arrays because those routes override the root array.

For `app/blog/[slug]/page.tsx`, return:

```ts
title: `${post.title} | ${siteConfig.name}`,
description: `${post.excerpt} Baca panduan lengkapnya di ${siteConfig.name}.`,
keywords: [siteConfig.name, "kitangoding id", post.category, post.title],
```

For `createServiceLandingMetadata`, define one description and reuse it:

```ts
const description = `${page.description} Konsultasikan kebutuhanmu dengan ${siteConfig.name}.`;
```

- [ ] **Step 6: Replace public-facing legacy brand references**

Replace public copy `Kita Ngoding` with `kitangoding.id` in `app/`, `components/`, and `lib/`, except the single `alternateName: "Kita Ngoding"` value. Update manifest and generated OG image through `siteConfig.name`; do not duplicate literal brand strings there.

- [ ] **Step 7: Verify GREEN and commit**

Run: `rtk npm run test:seo`

Expected: PASS.

Commit:

```bash
rtk git add scripts/seo-smoke-test.mjs lib/site.ts app components lib/service-landing-pages.ts
rtk git commit -m "feat: make kitangoding.id canonical brand"
```

---

### Task 2: Crawler and Sitemap Corrections

**Files:**
- Modify: `scripts/seo-smoke-test.mjs`
- Modify: `app/robots.ts`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: Next.js `MetadataRoute.Robots` and `MetadataRoute.Sitemap`.
- Produces: crawlable Next assets and honest sitemap freshness.

- [ ] **Step 1: Add failing crawler checks**

Add:

```js
const robots = read("app/robots.ts");
assert.doesNotMatch(robots, /["']\/_next["']/, "robots must allow Next.js rendering assets");
assert.doesNotMatch(
  sitemap,
  /const lastModified = new Date\(\)/,
  "static sitemap entries must not claim request-time freshness",
);
assert.doesNotMatch(sitemap, /changeFrequency:|priority:/, "sitemap must omit ignored hints");
```

- [ ] **Step 2: Confirm RED**

Run: `rtk npm run test:seo`

Expected: FAIL for blocked `/_next`.

- [ ] **Step 3: Fix robots**

Use:

```ts
disallow: ["/admin", "/api", "/login"],
```

- [ ] **Step 4: Make sitemap dates honest**

Delete `const lastModified = new Date()`. Static and fallback entries should contain only `url`. Database blog entries may keep:

```ts
lastModified: post.updatedAt ?? post.publishedAt ?? post.createdAt ?? undefined,
```

Remove every `changeFrequency` and `priority` property. Preserve URL deduplication and database fallback behavior.

- [ ] **Step 5: Verify and commit**

Run: `rtk npm run test:seo`

Expected: PASS.

Commit:

```bash
rtk git add scripts/seo-smoke-test.mjs app/robots.ts app/sitemap.ts
rtk git commit -m "fix: allow crawlers to render public pages"
```

---

### Task 3: Brand Entity and About Page

**Files:**
- Create: `app/tentang/page.tsx`
- Modify: `lib/marketplace-data.ts`
- Modify: `app/sitemap.ts`
- Modify: `app/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `scripts/seo-smoke-test.mjs`

**Interfaces:**
- Consumes: `siteConfig`, `serviceAreas`, `whatsappHref`, `FloatingNav`, `MarketplaceFooter`, `ButtonLink`, `Reveal`.
- Produces: `/tentang`, AboutPage JSON-LD, Organization author URL, internal navigation.

- [ ] **Step 1: Add failing entity checks**

Add:

```js
assert.ok(existsSync("app/tentang/page.tsx"), "/tentang brand entity page must exist");
assert.match(sitemap, /\/tentang/, "sitemap must include /tentang");
assert.match(read("app/page.tsx"), /alternateName:\s*siteConfig\.alternateName/);
assert.match(read("app/blog/[slug]/page.tsx"), /\/tentang/);
```

- [ ] **Step 2: Confirm RED**

Run: `rtk npm run test:seo`

Expected: FAIL because `/tentang` does not exist.

- [ ] **Step 3: Create the About page**

Create `app/tentang/page.tsx` with existing components and this content contract:

```tsx
import type { Metadata } from "next";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { serviceAreas, siteConfig, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Jasa Website untuk UMKM",
  description:
    "Kenal lebih dekat dengan kitangoding.id, partner pembuatan website untuk UMKM, brand lokal, dan bisnis jasa di Jogja, Solo, Wonogiri, dan area Jawa.",
  keywords: ["kitangoding.id", "tentang kitangoding id", "jasa website UMKM"],
  alternates: { canonical: `${siteConfig.domain}/tentang` },
  openGraph: {
    title: `Tentang ${siteConfig.name}`,
    description: `Kenali layanan, proses kerja, dan area layanan ${siteConfig.name}.`,
    url: `${siteConfig.domain}/tentang`,
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `Tentang ${siteConfig.name}`,
    description: `Kenali layanan, proses kerja, dan area layanan ${siteConfig.name}.`,
    images: ["/og-image.png"],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Tentang ${siteConfig.name}`,
    url: `${siteConfig.domain}/tentang`,
    mainEntity: { "@id": `${siteConfig.domain}#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.domain}#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    url: siteConfig.domain,
    email: siteConfig.email,
    areaServed: serviceAreas,
    sameAs: [siteConfig.instagram, siteConfig.tiktok],
  },
];

export default function Page() {
  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <FloatingNav />
      <main id="konten">
        <section className="marketplace-grid pt-28 pb-20">
          <div className="container-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <Reveal>
              <p className="marketplace-eyebrow text-success">Tentang kitangoding.id</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-tight md:text-6xl">
                Partner website untuk bisnis yang ingin lebih mudah dipahami dan dihubungi.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-body">
                kitangoding.id membantu UMKM, brand lokal, dan bisnis jasa menyusun website company profile,
                landing page, toko online, serta aplikasi web sesuai kebutuhan operasional.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={whatsappHref}>Konsultasi via WhatsApp</ButtonLink>
                <ButtonLink href="/portfolio" variant="outline">Lihat contoh proyek</ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
                <h2 className="text-2xl font-extrabold">Yang kamu dapatkan</h2>
                <ul className="mt-6 space-y-4 leading-7 text-body">
                  <li>Struktur halaman dan copy dasar yang sesuai tujuan bisnis.</li>
                  <li>Website responsif dengan akses dan source code milikmu.</li>
                  <li>Scope, estimasi, dan tahapan kerja yang dibahas sebelum mulai.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <MarketplaceFooter />
    </div>
  );
}
```

- [ ] **Step 4: Connect the entity**

Add `{ href: "/tentang", label: "Tentang" }` to public navigation/footer data and `${siteConfig.domain}/tentang` to sitemap entries. Add `alternateName: siteConfig.alternateName` to the homepage Organization data. Set blog Article author to:

```ts
author: {
  "@type": "Organization",
  name: siteConfig.name,
  url: `${siteConfig.domain}/tentang`,
},
```

- [ ] **Step 5: Verify and commit**

Run: `rtk npm run test:seo`

Expected: PASS.

Commit:

```bash
rtk git add app/tentang app/sitemap.ts app/page.tsx app/blog/[slug]/page.tsx lib/marketplace-data.ts scripts/seo-smoke-test.mjs
rtk git commit -m "feat: add kitangoding.id brand entity page"
```

---

### Task 4: Service, Portfolio, Pricing, and FAQ Copy

**Files:**
- Modify: `components/templates/MarketplaceHome.tsx`
- Modify: `components/organisms/PortfolioSection.tsx`
- Modify: `components/molecules/PortfolioCard.tsx`
- Modify: `components/organisms/PortfolioGallery.tsx`
- Modify: `lib/landing-data.ts`
- Modify: `scripts/seo-smoke-test.mjs`

**Interfaces:**
- Consumes: `PublicServiceCard[]`, existing static `serviceSolutions`, pricing/testimonial/FAQ content.
- Produces: stable service copy pairing and accurate trust language.

- [ ] **Step 1: Add failing copy correctness checks**

Add:

```js
const marketplaceHome = read("components/templates/MarketplaceHome.tsx");
assert.doesNotMatch(marketplaceHome, /services\[index\]/, "services must not be paired by array order");

for (const file of [
  "components/organisms/PortfolioSection.tsx",
  "components/organisms/PortfolioGallery.tsx",
]) {
  assert.doesNotMatch(read(file), /sudah live|bisa kamu cek/i, `${file} must not claim unverified live URLs`);
}
```

- [ ] **Step 2: Confirm RED**

Run: `rtk npm run test:seo`

Expected: FAIL for `services[index]` and live-project claims.

- [ ] **Step 3: Match services by identity**

Add a `match` value to each static service:

```ts
match: "company profile"
match: "landing page"
match: "toko online"
match: "aplikasi web"
```

Replace index lookup with:

```ts
const publicService = services.find((item) =>
  item.title.toLowerCase().includes(service.match),
);
```

Keep `publicService?.description || service.description` so missing records use reviewed static copy.

- [ ] **Step 4: Make portfolio language accurate**

Use:

```tsx
title="Contoh proyek untuk memahami cara kerja kitangoding.id."
description="Pelajari jenis website dan aplikasi yang pernah kami kerjakan. URL publik dan studi kasus lengkap akan ditambahkan setelah mendapat izin publikasi."
```

Change card action text to `Pelajari jenis proyek ini`. Keep its inquiry destination until public URLs are supplied.

- [ ] **Step 5: Simplify package names and descriptions**

In `lib/landing-data.ts`, rename:

```text
Landing Page UMKM Executive -> Landing Page Iklan
Corporate Identity Basic -> Website Company Profile
Enterprise Business Site -> Website Bisnis Custom
E-Commerce Retail Starter -> Toko Online
```

Delete every `(Serupa: Gaya ...)` phrase. Replace mixed-language feature phrases with plain Indonesian while preserving concrete features, prices, and existing inclusions.

Add these FAQ entries without inventing fixed commercial terms:

```ts
{
  question: "Berapa kali revisi yang didapat?",
  answer: "Jumlah revisi mengikuti scope dan dicantumkan di proposal sebelum project dimulai supaya kedua pihak punya acuan yang sama.",
},
{
  question: "Apakah ada biaya perpanjangan domain dan hosting?",
  answer: "Ada biaya tahunan setelah periode awal berakhir. Nominalnya mengikuti jenis domain dan hosting, lalu dijelaskan sebelum project disepakati.",
},
{
  question: "Apakah ada bantuan setelah website diluncurkan?",
  answer: "Ada masa pendampingan launch sesuai scope proposal. Kebutuhan maintenance berikutnya bisa dibahas terpisah agar biayanya transparan.",
},
```

- [ ] **Step 6: Verify and commit**

Run: `rtk npm run test:seo`

Expected: PASS.

Commit:

```bash
rtk git add components/templates/MarketplaceHome.tsx components/organisms/PortfolioSection.tsx components/molecules/PortfolioCard.tsx components/organisms/PortfolioGallery.tsx lib/landing-data.ts scripts/seo-smoke-test.mjs
rtk git commit -m "fix: make service and proof copy trustworthy"
```

---

### Task 5: Article Structure, Dates, and Five Priority Articles

**Files:**
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `lib/public-content.ts`
- Modify: `scripts/seo-smoke-test.mjs`

**Interfaces:**
- Consumes: `PublicBlogDetail.content` plain text and existing related-service links.
- Produces: `##` heading rendering, Indonesian dates, valid Article dates, deeper content.

- [ ] **Step 1: Add failing article checks**

Add:

```js
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
```

- [ ] **Step 2: Confirm RED**

Run: `rtk npm run test:seo`

Expected: FAIL for missing `##` rendering and thin content.

- [ ] **Step 3: Extend the existing renderer minimally**

Before the existing bold-heading condition, add:

```tsx
if (lines.length === 1 && /^##\s+/.test(lines[0])) {
  return (
    <h2 key={`${index}-${lines[0]}`} className="text-2xl font-extrabold text-black">
      {stripInlineMarkdown(lines[0].replace(/^##\s+/, ""))}
    </h2>
  );
}
```

- [ ] **Step 4: Emit safe Article dates**

Add:

```ts
function toIsoDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
```

Then include only valid values:

```ts
const publishedAt = toIsoDate(post.date);

{
  "@type": "Article",
  // existing fields
  ...(publishedAt ? { datePublished: publishedAt, dateModified: publishedAt } : {}),
}
```

Change `Intl.DateTimeFormat("en-US", ...)` to `Intl.DateTimeFormat("id-ID", ...)` in `lib/public-content.ts`.

- [ ] **Step 5: Replace five thin article bodies**

Use these exact bodies in the matching `fallbackBlogDetails` records:

```ts
// biaya-pembuatan-website-umkm
content: `## Mulai dari tujuan bisnis

Biaya website mengikuti pekerjaan yang harus diselesaikan. Website company profile membantu calon pelanggan memahami profil, layanan, lokasi, dan cara menghubungi bisnis. Landing page iklan membawa pengunjung menuju satu tindakan, seperti mengisi form atau membuka WhatsApp. Katalog online menampilkan produk dan membantu admin menerima order. Aplikasi web custom menangani alur kerja yang tidak dapat diselesaikan oleh halaman informasi biasa.

Tentukan hasil yang ingin dicapai sebelum menghitung halaman. Lima halaman dengan materi siap pakai dapat membutuhkan pekerjaan lebih sedikit daripada satu landing page yang memerlukan riset penawaran, penulisan copy, integrasi tracking, dan beberapa variasi CTA.

## Komponen yang membentuk biaya

Desain dan development hanya dua bagian dari pekerjaan. Vendor juga perlu menyusun struktur informasi, menyesuaikan copy, mengolah gambar, memasang form, menghubungkan WhatsApp, menyiapkan analytics, dan menguji tampilan di ponsel. Integrasi pembayaran, ongkir, akun pengguna, dashboard, atau API menambah waktu pengerjaan karena setiap alur perlu diuji.

Kesiapan konten ikut memengaruhi estimasi. Profil bisnis, daftar layanan, foto, logo, harga, dan bukti kerja yang sudah tersedia mengurangi putaran revisi. Proposal perlu menjelaskan jumlah revisi, domain, hosting, biaya perpanjangan, dukungan saat peluncuran, serta fitur yang tidak termasuk.

## Contoh pilihan berdasarkan kebutuhan

Harga yang tampil di kitangoding.id saat artikel ini diterbitkan dimulai dari Rp1.800.000 untuk landing page iklan dan Rp3.500.000 untuk website company profile. Website bisnis custom dan toko online memiliki biaya lebih tinggi karena halaman, pengelolaan data, serta integrasinya bertambah. Angka di halaman harga berfungsi sebagai titik awal. Tim tetap menulis scope dan estimasi final di proposal setelah brief dibahas.

Bisnis yang baru membangun kehadiran digital dapat memulai dari company profile dan tombol WhatsApp. Campaign berbayar membutuhkan landing page terpisah agar pesan iklan tetap konsisten. Toko dengan produk yang sering berubah perlu mempertimbangkan siapa yang memperbarui katalog setelah website diluncurkan.

## Checklist sebelum meminta estimasi

- Tujuan utama website dan tindakan yang diharapkan dari pengunjung.
- Jenis pelanggan yang ingin dijangkau.
- Daftar halaman, produk, atau fitur yang dibutuhkan.
- Materi yang sudah tersedia: logo, foto, profil, dan harga.
- Target waktu peluncuran dan kisaran anggaran.

Kirim lima informasi tersebut saat menghubungi kitangoding.id. Brief yang jelas membantu tim memberi pilihan scope yang masuk akal tanpa menambahkan fitur yang belum dibutuhkan.`,

// perbedaan-website-company-profile-dan-landing-page
content: `## Company profile menjawab siapa bisnismu

Website company profile menjadi rujukan utama untuk orang yang mencari nama bisnis, menerima proposal, atau memperoleh rekomendasi dari pelanggan lain. Halamannya biasanya mencakup profil, layanan, proses kerja, portfolio, dan kontak. Pengunjung boleh berpindah halaman karena mereka sedang menilai kredibilitas dan kecocokan bisnis.

Konten company profile bersifat tahan lama. Tim dapat memperbarui layanan, anggota, atau proyek tanpa mengubah tujuan utamanya. Struktur ini cocok untuk UMKM, firma, agensi, produsen, dan bisnis jasa yang perlu terlihat jelas saat dicari di Google atau dibagikan melalui WhatsApp.

## Landing page mengarahkan satu tindakan

Landing page dibuat untuk satu penawaran dan satu sumber traffic. Pengunjung yang mengklik iklan paket tertentu harus menemukan headline, manfaat, bukti, harga atau cara mendapatkan estimasi, serta CTA yang sesuai dengan iklan tersebut. Navigasi dibuat lebih singkat agar perhatian tidak tersebar ke banyak layanan.

Halaman ini juga memerlukan tracking yang terukur. Tim dapat mencatat klik CTA, form yang terkirim, atau percakapan WhatsApp yang dimulai. Data tersebut membantu pemilik campaign membandingkan pesan dan penawaran. Tracking tidak menjamin penjualan, tetapi memberi dasar untuk menilai bagian yang perlu diperbaiki.

## Pilih berdasarkan sumber pengunjung

Pilih company profile jika pengunjung datang dari pencarian nama brand, referral, proposal, kartu nama, atau media sosial dan masih membutuhkan gambaran lengkap. Pilih landing page jika pengunjung datang dari Meta Ads, Google Ads, peluncuran produk, webinar, atau promo dengan tenggat waktu.

Contohnya, studio interior dapat memakai company profile untuk menjelaskan layanan dan portfolio. Saat menawarkan paket renovasi dapur melalui iklan, studio tersebut dapat membuat landing page khusus yang membahas paket, area layanan, contoh hasil, dan tombol konsultasi.

## Kapan keduanya dibutuhkan

Banyak bisnis memakai keduanya. Company profile membangun identitas utama, sedangkan landing page menangani campaign tertentu. Setiap landing page tetap dapat menautkan identitas brand dan kebijakan yang relevan agar pengunjung tahu siapa penyedia layanannya.

kitangoding.id menyediakan halaman layanan terpisah untuk website company profile dan landing page bisnis. Bandingkan tujuan, sumber pengunjung, dan tindakan yang ingin diukur sebelum memilih scope.`,

// jasa-landing-page-untuk-iklan
content: `## Klik iklan membutuhkan kelanjutan pesan

Iklan membentuk harapan sebelum pengunjung membuka halaman. Jika iklan menawarkan landing page untuk UMKM, halaman tujuan harus melanjutkan penawaran tersebut. Homepage yang menampilkan banyak layanan memaksa pengunjung mencari hubungan antara iklan dan kebutuhannya. Sebagian pengunjung akan menutup halaman sebelum menemukan jawabannya.

Gunakan headline yang menyebut penawaran, target pengguna, dan hasil yang dapat dipahami. Hindari klaim besar yang tidak memiliki bukti. Tampilkan informasi yang membantu pengunjung memutuskan apakah penawaran cocok sebelum meminta mereka menghubungi tim penjualan.

## Bagian yang wajib ada

Landing page perlu menjelaskan masalah pelanggan, cara penawaran menyelesaikannya, isi paket, bukti yang dapat diperiksa, proses, serta pertanyaan umum. CTA harus menyebut tindakan yang terjadi, misalnya “Minta estimasi via WhatsApp” atau “Kirim brief campaign”. Kata “klik di sini” tidak memberi konteks.

Bukti dapat berupa screenshot proyek, penjelasan scope, testimoni dengan izin, demo, atau informasi kepemilikan source code. Jika bisnis belum memiliki studi kasus publik, gunakan penjelasan proses dan contoh deliverable. Jangan membuat angka penjualan atau nama klien untuk mengisi ruang kosong.

## Data yang perlu dipantau

Pasang analytics sebelum campaign dimulai. Catat kunjungan halaman, klik CTA, form terkirim, dan percakapan WhatsApp yang dimulai. Conversion rate dihitung dari jumlah tindakan utama dibandingkan jumlah kunjungan. Angka ini perlu dibaca bersama kualitas lead dan biaya iklan.

Periksa juga kesesuaian perangkat. Campaign media sosial sering mendapat traffic ponsel, sehingga headline, form, dan CTA harus mudah digunakan pada layar kecil. Kecepatan halaman dan resource yang dapat dimuat crawler ikut memengaruhi pengalaman pengguna.

## Brief sebelum desain

- Penawaran dan harga atau cara mendapatkan estimasi.
- Sumber traffic yang akan digunakan.
- Target pelanggan dan area layanan.
- Bukti, foto, atau testimoni yang boleh dipublikasikan.
- Target tindakan dan cara tim menindaklanjuti lead.

kitangoding.id memakai brief tersebut untuk menyusun scope landing page, copy, CTA, dan kebutuhan tracking.`,

// jasa-toko-online-untuk-umkm
content: `## Katalog dan checkout menyelesaikan masalah berbeda

Katalog online membantu pelanggan melihat produk, variasi, harga, dan cara memesan. Order dapat diteruskan ke WhatsApp sehingga admin masih mengonfirmasi stok, ongkir, dan pembayaran. Model ini cocok untuk UMKM dengan jumlah produk terbatas atau proses order yang membutuhkan percakapan.

Checkout otomatis menangani keranjang, alamat, pembayaran, ongkir, status pesanan, dan notifikasi. Sistem ini mengurangi pekerjaan manual ketika volume order naik, tetapi membutuhkan pengaturan produk dan operasional yang lebih disiplin. Pemilik bisnis perlu menentukan siapa yang memperbarui stok, memproses pesanan, dan menangani kegagalan pembayaran.

## Mulai dari alur order yang terjadi sekarang

Catat perjalanan pelanggan dari menemukan produk sampai menerima pesanan. Periksa dari mana pelanggan datang, informasi apa yang mereka tanyakan, cara admin mengecek stok, metode pembayaran, pilihan pengiriman, dan layanan setelah pembelian. Website perlu mengikuti alur yang dapat dijalankan tim, bukan menyalin fitur marketplace tanpa kebutuhan.

Jika mayoritas pelanggan masih bertanya tentang ukuran atau custom order, katalog dengan WhatsApp dapat menjadi tahap awal. Jika produk memiliki harga dan stok yang pasti serta order datang setiap hari, checkout otomatis dapat mengurangi langkah admin.

## Hitung biaya operasional setelah peluncuran

Biaya toko online mencakup lebih dari pembuatan halaman. Payment gateway dapat mengenakan biaya transaksi. Integrasi kurir memerlukan konfigurasi asal pengiriman. Hosting perlu menangani traffic dan proses checkout. Tim juga harus memperbarui foto, harga, stok, voucher, dan laporan order.

Proposal perlu menyebut fitur, biaya tahunan, tanggung jawab pengelolaan, serta dukungan saat launch. Informasi ini membantu pemilik bisnis membandingkan biaya website dengan waktu admin yang dapat dihemat.

## Pilihan tahap awal

Tahap pertama dapat berupa katalog dan CTA WhatsApp. Tahap kedua menambahkan kategori, pencarian, serta pengelolaan produk. Checkout, pembayaran, ongkir, akun pelanggan, dan laporan dapat ditambahkan ketika volume transaksi membutuhkannya.

Diskusikan jumlah produk, variasi, alur stok, pembayaran, dan pengiriman dengan kitangoding.id. Tim dapat menyusun scope awal tanpa memaksa bisnis membeli sistem yang belum akan dipakai.`,

// cara-membuat-website-bisnis-lebih-meyakinkan
content: `## Jelaskan bisnis dalam satu layar

Bagian pertama website harus membantu pengunjung menjawab empat pertanyaan: bisnis ini melayani siapa, menawarkan apa, beroperasi di mana, dan tindakan apa yang perlu dilakukan. Nama brand tanpa penjelasan layanan membuat pengunjung menebak. Headline perlu menyebut manfaat atau fungsi layanan dengan bahasa pelanggan.

Gunakan satu CTA utama. Bisnis jasa dapat memakai konsultasi WhatsApp atau form brief. Toko dapat memakai lihat katalog atau mulai order. Tampilkan CTA kedua hanya jika membantu orang yang belum siap menghubungi, seperti melihat portfolio atau daftar layanan.

## Tunjukkan bukti yang dapat diperiksa

Foto dan screenshot proyek membantu pengunjung menilai kualitas kerja. Sertakan jenis proyek, scope, peran tim, dan izin publikasi. Jika URL tidak dapat dibagikan, jelaskan batasannya. Testimoni perlu memakai nama dan konteks yang telah disetujui klien. Hindari angka peningkatan, logo, atau nama perusahaan yang tidak dapat diverifikasi.

Bukti proses juga berguna. Tampilkan tahapan brief, penyusunan konten, desain, development, revisi, dan launch. Calon klien dapat menilai cara kerja meski bisnis belum memiliki banyak studi kasus publik.

## Kurangi hambatan sebelum menghubungi

Pengunjung sering menunda karena tidak tahu kisaran biaya, waktu pengerjaan, jumlah revisi, atau kepemilikan hasil. Tampilkan harga awal atau cara menghitung estimasi. Jelaskan bahwa scope dan revisi ditulis di proposal. Sebutkan biaya perpanjangan domain dan hosting serta bantuan setelah peluncuran.

Gunakan kanal kontak yang aktif. Form perlu memberi tahu data yang dibutuhkan dan apa yang terjadi setelah dikirim. Tombol WhatsApp perlu membawa pesan awal yang relevan agar calon pelanggan tidak memulai dari halaman kosong.

## Jaga konsistensi identitas

Gunakan nama `kitangoding.id` secara konsisten pada title, description, structured data, website, profil sosial, dan komunikasi pelanggan. Samakan nomor telepon, email, area layanan, serta alamat publik yang memang boleh ditampilkan. Konsistensi membantu orang mengenali brand saat berpindah dari Google ke media sosial atau WhatsApp.

Perbarui Google Business Profile jika bisnis melayani pencarian lokal. Gunakan kategori, jam layanan, foto, dan tautan website yang sama dengan informasi di situs. kitangoding.id menerapkan prinsip ini pada halaman brand dan metadata agar pengunjung tidak menemukan identitas yang berbeda.`,
```

Existing related-service cards provide internal links, so do not introduce a Markdown dependency.

- [ ] **Step 6: Verify and commit**

Run: `rtk npm run test:seo`

Expected: PASS.

Commit:

```bash
rtk git add app/blog/[slug]/page.tsx lib/public-content.ts scripts/seo-smoke-test.mjs
rtk git commit -m "feat: deepen kitangoding.id SEO articles"
```

---

### Task 6: Full Verification and Rendered SEO Check

**Files:**
- Modify only if a verification failure identifies a scoped defect.

**Interfaces:**
- Consumes: completed tasks.
- Produces: evidence that the requested SEO/copy work passes project checks.

- [ ] **Step 1: Run SEO and unit checks**

Run:

```bash
rtk npm run test:seo
rtk node --test tests/*.test.ts
```

Expected: all commands exit 0.

- [ ] **Step 2: Run lint**

Run: `rtk npm run lint`

Expected: exit 0 with no new warnings from changed files.

- [ ] **Step 3: Run production build**

Run: `rtk npm run build`

Expected: Next.js 16.2.6 build exits 0 and lists `/tentang`, `/robots.txt`, and `/sitemap.xml`.

- [ ] **Step 4: Inspect generated public output**

Start the built app and fetch `/`, `/tentang`, `/jasa-website-company-profile`, one updated blog article, `/robots.txt`, and `/sitemap.xml`. Verify:

```text
title contains kitangoding.id exactly once
description contains kitangoding.id
keywords contain kitangoding.id
Organization/WebSite/Article data use kitangoding.id
robots does not disallow /_next
sitemap contains /tentang and no synthetic current timestamps for static URLs
```

- [ ] **Step 5: Check the final diff**

Run:

```bash
rtk git diff --check
rtk git status --short
```

Expected: no whitespace errors; only intended files are changed or committed.
