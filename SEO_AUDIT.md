# Audit SEO Kitangoding

Audit terakhir: 2026-11-12. Berdasarkan crawl 50 URL sitemap produksi (`https://www.kitangoding.my.id`) dan
kode saat ini. Bukan data Lighthouse atau Google Search Console, jadi performa dan status indeks perlu
dicek terpisah (lihat bagian "Belum terukur").

## Status

| Area | Kondisi |
| --- | --- |
| Metadata | Semua halaman punya title, description, canonical, Open Graph, Twitter, `lang="id"` |
| Redirect | http ke https, non-www ke www, trailing slash, dan `/project-inqury` semuanya 308 |
| Robots dan sitemap | `app/robots.ts` dan `app/sitemap.ts` dinamis, hanya memuat halaman yang ada |
| Structured data | Organization, WebSite, LocalBusiness, Service, OfferCatalog, CollectionPage, Article, BreadcrumbList, CreativeWork |
| OG image | `app/og-image.png/route.tsx`, dijaga tes `tests/og-image.test.ts` yang merender PNG sungguhan |
| Gambar blog dan portfolio | Disajikan lewat `/api/blog-images/...` dan `/api/portfolio-images/...`, tidak ada base64 di HTML |
| Blog | Hanya artikel yang dipublikasikan dari dashboard admin; tidak ada artikel bawaan kode |
| Halaman tidak ada | Portfolio dan blog mengembalikan 404 sungguhan (tidak lagi 200) |

## Yang sudah diperbaiki

1. `/og-image.png` mengembalikan 200 dengan body kosong. Penyebab: `<div>` dengan dua anak tanpa `display: flex`
   membuat Satori melempar error yang tertelan runtime edge.
2. HTML membengkak karena gambar base64 dari database ikut tertanam (`/shop` 4 MB, `/referensi` 2,7 MB,
   artikel 1,6 MB), termasuk di `og:image` dan JSON-LD `Article.image`. Googlebot hanya mengambil sekitar 2 MB
   pertama per URL.
3. Meta description portfolio berisi "Portfolio project" atau terlalu pendek atau panjang (hingga 724 karakter).
   Sekarang dibuat dari isi halaman, 70 sampai 155 karakter.
4. `/portfolio/<slug-tidak-ada>` mengembalikan 200 karena `notFound()` dipanggil di dalam `Suspense`.
5. 15 dari 19 artikel blog dan halaman `/shop` tidak punya link masuk. Artikel bawaan kode dihapus,
   blog sekarang hanya dari admin.
6. `/shop` dan `/referensi` dihapus (isi saling tumpang tindih dan HTML sangat berat).
7. Title halaman portfolio dan blog yang lebih dari 60 karakter kini memakai versi yang muat.
8. `LocalBusiness`: tautan `wa.me` dikeluarkan dari `sameAs`, `logo` dan `email` ditambahkan.

## Masih terbuka

| Prioritas | Hal | Catatan |
| --- | --- | --- |
| Sedang | `lastmod` portfolio di sitemap | Tabel `portfolios` belum punya kolom `updated_at`. Mengisi dengan `created_at` akan salah setelah project diedit |
| Sedang | `Service` belum punya `offers` | Belum ada pemetaan paket harga ke halaman layanan |
| Rendah | `LocalBusiness` belum punya `streetAddress`, `postalCode`, `geo`, `openingHours` | Isi hanya bila alamat memang ingin dipublikasikan dan sama dengan Google Business Profile |
| Rendah | `FAQPage` | Valid, tapi Google tidak lagi menampilkan FAQ di hasil pencarian untuk situs seperti ini |
| Rendah | `/portfolio` dan `/project-inquiry` tanpa H2 | |
| Rendah | `alt=""` pada preview kartu layanan di beranda | Kemungkinan informatif, bukan dekoratif |

## Belum terukur

- Skor Lighthouse dan Core Web Vitals (PageSpeed Insights menolak request tanpa API key).
- Status indeks per halaman. Buka Google Search Console, Pengindeksan Halaman, lalu lihat tabel
  "Mengapa halaman tidak diindeks" untuk alasan tiap kelompok URL.
- Setelah deploy: uji `https://www.kitangoding.my.id/og-image.png` dan satu link di WhatsApp atau
  Facebook Sharing Debugger.

## Aturan agar tidak kambuh

- Gambar dari database selalu lewat rute `/api/...-images`, jangan tanam data URL di halaman.
- Jangan panggil `notFound()` di dalam `Suspense`; cek keberadaan data sebelum merender.
- Setiap halaman baru yang ingin diindeks harus ada di sitemap dan punya minimal satu link masuk.
- `/shop` dan `/referensi` sengaja dihapus; tes `test:seo` menjaga agar tidak kembali.
