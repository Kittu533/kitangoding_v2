# Audit SEO Kita Ngoding

Tanggal audit: 2026-06-28  
Scope: audit statis dari codebase Next.js, bukan live crawl, Lighthouse, atau data Google Search Console.

## Ringkasan

Website sudah punya fondasi SEO yang cukup baik: metadata global, canonical, Open Graph, Twitter card, robots, sitemap, LocalBusiness JSON-LD, FAQ JSON-LD, dan Article JSON-LD untuk blog.

Yang paling perlu dibenahi adalah hal kecil yang berdampak langsung:

| Prioritas | Masalah | Dampak | File terkait |
| --- | --- | --- | --- |
| Tinggi | `/og-image.png` dipakai di metadata, tapi file tidak ada | Preview share sosial dan image card bisa rusak | `app/layout.tsx`, banyak page metadata, `lib/service-landing-pages.ts`, `public/` |
| Tinggi | `/referensi` punya metadata, tapi tidak masuk sitemap | Halaman publik lebih lambat ditemukan crawler | `app/referensi/page.tsx`, `app/sitemap.ts` |
| Sedang | Belum ada web manifest | Sinyal PWA/installability dan identitas aplikasi belum lengkap | `app/manifest.ts` belum ada |
| Sedang | Route typo `/project-inqury` masih ada sebagai redirect | Tidak fatal, tapi menambah route legacy yang sebaiknya jelas statusnya | `app/project-inqury/page.tsx` |
| Sedang | Structured data belum merata untuk halaman komersial | Search engine kurang konteks untuk layanan, produk, dan halaman kontak | `app/layanan`, `app/shop`, service landing pages |
| Rendah | Ada `alt=""` di image non-dekoratif potensial | Aksesibilitas dan pemahaman gambar oleh crawler bisa turun | `components/organisms/ProcessShowcase.tsx` |

## Yang Sudah Bagus

| Area | Status |
| --- | --- |
| Metadata global | Ada di `app/layout.tsx`: title template, description, keywords, canonical, Open Graph, Twitter, robots |
| Robots | Ada `app/robots.ts` dan menunjuk ke sitemap |
| Sitemap | Ada `app/sitemap.ts`, termasuk homepage, blog, contact, pricing, portfolio, shop, layanan, project inquiry, dan service landing pages |
| Blog dynamic SEO | `app/blog/[slug]/page.tsx` punya `generateMetadata`, canonical, OG, Twitter, robots untuk artikel tidak ditemukan, BreadcrumbList JSON-LD, dan Article JSON-LD |
| Homepage schema | `app/page.tsx` punya LocalBusiness JSON-LD |
| Pricing schema | `app/pricing/page.tsx` punya FAQPage JSON-LD |
| Admin/login indexing | Area admin dan login sudah diarahkan noindex lewat metadata layout/page terkait |

## Temuan Detail

### 1. `og-image.png` direferensikan tapi tidak ada

Bukti:

- `app/layout.tsx` memakai `/og-image.png` untuk Open Graph dan Twitter image.
- Banyak page metadata juga memakai `/og-image.png`.
- Pemeriksaan aset menunjukkan `public/og-image.png` tidak ada.
- `app/opengraph-image.png` dan `app/twitter-image.png` juga tidak ada.

Dampak:

- Link yang dibagikan ke WhatsApp, X/Twitter, Facebook, LinkedIn, dan crawler social preview bisa kehilangan thumbnail.
- Metadata terlihat lengkap di kode, tapi hasil nyata tetap rusak karena asetnya 404.

Rekomendasi minimal:

- Tambahkan `public/og-image.png` ukuran 1200x630.
- Pakai desain brand Kita Ngoding, headline jasa website UMKM, logo, dan kontras yang jelas.
- Kalau mau pakai convention Next.js, tambahkan `app/opengraph-image.png` dan `app/twitter-image.png`, lalu sederhanakan metadata image.

### 2. `/referensi` belum masuk sitemap

Bukti:

- `app/referensi/page.tsx` punya metadata, canonical, Open Graph, dan Twitter.
- `app/sitemap.ts` belum mencantumkan `${siteConfig.domain}/referensi`.

Dampak:

- Halaman tetap bisa ditemukan lewat internal link, tetapi sitemap tidak membantu discovery.
- Ini sayang karena halaman `referensi` tampak sebagai halaman publik yang memang ditargetkan untuk SEO.

Rekomendasi minimal:

- Tambahkan entry `/referensi` ke `app/sitemap.ts`.

### 3. Web manifest belum ada

Bukti:

- `app/manifest.ts` tidak ada.
- `public/manifest.webmanifest` tidak ada.
- `app/icon.png` dan `app/apple-icon.png` sudah ada.

Dampak:

- Tidak langsung menentukan ranking, tapi identitas website di browser/mobile belum lengkap.
- Installability/PWA signal belum ada.

Rekomendasi minimal:

- Tambahkan `app/manifest.ts` dengan `name`, `short_name`, `description`, `start_url`, `display`, `theme_color`, `background_color`, dan icons yang memakai aset yang sudah ada.

### 4. Route typo `/project-inqury`

Bukti:

- Ada `app/project-inqury/page.tsx`.
- File tersebut melakukan `permanentRedirect("/project-inquiry")`.
- Route ini tidak masuk sitemap, dan itu sudah benar.

Dampak:

- Tidak fatal karena redirect permanen.
- Tapi route typo tetap menjadi utang kecil: jika pernah terindeks, sebaiknya redirect 308 tetap dipertahankan sampai traffic hilang.

Rekomendasi minimal:

- Pertahankan redirect jika URL typo pernah dipakai publik.
- Jika belum pernah dipakai, hapus route typo agar routing lebih bersih.

### 5. Structured data halaman komersial masih bisa ditambah

Yang sudah ada:

- Homepage: LocalBusiness.
- Blog detail: BreadcrumbList dan Article.
- Pricing: FAQPage.
- Service landing pages: JSON-LD sudah ada lewat template, tetapi perlu validasi output final.

Yang masih kurang:

- `app/layanan/page.tsx`: belum terlihat JSON-LD Service/OfferCatalog.
- `app/shop/page.tsx`: belum terlihat Product/ItemList schema untuk template/aset.
- `app/contact/page.tsx`: belum terlihat ContactPage atau LocalBusiness reference khusus kontak.
- `app/portfolio/page.tsx`: bisa pakai CollectionPage atau CreativeWork/ItemList jika portfolio ingin jadi SEO asset.

Rekomendasi minimal:

- Tambahkan schema hanya untuk halaman yang memang punya intent SEO.
- Prioritas: `layanan` pakai Service/OfferCatalog, `shop` pakai ItemList/Product, `contact` pakai ContactPage.

### 6. Image alt kosong

Bukti hasil audit JSX lintas baris:

- `app/admin/(dashboard)/portfolio/page.tsx:128` punya `<Image>` dengan `alt=""`.
- `components/organisms/ProcessShowcase.tsx:107` punya `<Image>` dengan `alt=""`.

Dampak:

- Untuk gambar dekoratif, `alt=""` benar.
- Untuk gambar informatif, ini mengurangi aksesibilitas dan konteks gambar.

Rekomendasi minimal:

- Biarkan `alt=""` hanya kalau gambar benar-benar dekoratif.
- Jika gambar menjelaskan proses/portfolio, isi alt singkat dan deskriptif.

## Checklist Perbaikan

| Urutan | Aksi | Estimasi |
| --- | --- | --- |
| 1 | Tambahkan `public/og-image.png` | Cepat |
| 2 | Tambahkan `/referensi` ke `app/sitemap.ts` | Cepat |
| 3 | Tambahkan `app/manifest.ts` | Cepat |
| 4 | Putuskan nasib `/project-inqury`: pertahankan redirect atau hapus | Cepat |
| 5 | Tambahkan schema Service/OfferCatalog untuk `/layanan` | Sedang |
| 6 | Tambahkan schema ItemList/Product untuk `/shop` | Sedang |
| 7 | Validasi `alt=""` di image yang terdeteksi | Cepat |
| 8 | Jalankan validasi setelah deploy: Rich Results Test, URL Inspection, dan social preview debugger | Manual |

## Prioritas Minimal

Kalau hanya mau mengerjakan yang paling berdampak dulu:

1. Buat `public/og-image.png`.
2. Masukkan `/referensi` ke sitemap.
3. Tambahkan `app/manifest.ts`.

Tiga perubahan itu kecil, tidak butuh dependency baru, dan menutup celah SEO paling jelas dari audit ini.
