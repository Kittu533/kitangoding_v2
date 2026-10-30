# Review struktur direktori

Fondasi awal project sudah mengikuti App Router, tetapi domain blog, layanan, pricing, portfolio, dan komponen publik tersebar di banyak folder. Refactor ini mengelompokkan kode berdasarkan fitur dan peran agar perubahan lebih mudah dilacak.

**Yang sudah dirapikan**

- features/services kini memiliki schema Zod bersama untuk form dan Server Action, query publik serta dashboard, action, dan form layanan. Validasi server dan pemeriksaan sesi tetap berjalan.
- features/blog memiliki query publik dan admin, konten fallback, utilitas sanitasi, form, serta Server Action blog dan kategori. Query admin tidak lagi berada di file route.
- Query dan tipe portfolio, pricing, serta marketplace dipisah ke fitur masing-masing. lib/public-content.ts sudah dihapus; penanganan tabel yang belum tersedia ada di lib/db/is-missing-table.ts.
- Komponen publik sekarang dikelompokkan di components/marketing/ (components, pages, sections, ui). Komponen dasar tetap di components/ui/; komponen dashboard generik tersisa di components/admin/.
- Unit test dikumpulkan di tests/, smoke test di scripts/smoke/. package.json menyediakan test:unit, test:smoke, dan test:seo.
- Nama file Button.tsx diganti menjadi ButtonLink.tsx agar sesuai dengan komponen yang diekspor.
- Tampilan publik memakai components/marketing/Studio.module.css dan sections/StudioChrome.tsx bersama. ServicesOverviewSection dan VisualReferenceSection tidak lagi bergantung pada homepage lama; PricingPlanGrid dipakai homepage dan halaman harga.
- Komponen marketing lama yang tidak terjangkau dari route, import dinamis, atau test sudah dihapus, termasuk MarketplaceHome, MarketplaceShell, serta section landing page generasi sebelumnya. Aset publik yang masih direferensikan tetap dipertahankan.

Bentuk struktur utama saat ini: app/ untuk route dan metadata; components/ untuk admin, analytics, marketing, dan UI bersama; features/ untuk blog, marketplace, portfolio, pricing, dan services; lib/ untuk infrastruktur; tests/, scripts/smoke/, serta e2e/ untuk pemeriksaan.

Batas dependensinya: route menyusun halaman dengan fitur; fitur menggunakan primitive bersama dan infrastruktur; komponen dasar tidak mengimpor route atau fitur. File dalam features/blog/ dan features/services/ juga tidak bergantung pada letak route admin, dan nama URL tidak berubah karena pemindahan ini. Redirect lama /project-inqury tetap dipertahankan.

Refactor berikutnya bisa memindahkan form dan query dashboard pricing, portfolio, kategori, testimoni, dan leads dari components/admin/ atau route ke fitur terkait saat area itu dikerjakan. Tidak perlu membuat lapisan fitur baru untuk halaman yang sederhana.

Validasi dijalankan lewat build Next.js, TypeScript, ESLint, unit test, smoke test, dan cek browser pada halaman publik terkait. Struktur folder membantu kepemilikan kode dan kerja tim; kapasitas trafik tetap ditentukan query, cache, pagination, dan hasil pengukuran beban.
