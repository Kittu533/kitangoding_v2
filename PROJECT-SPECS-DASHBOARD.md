# Project Specifications: Admin Dashboard KitaNgoding

Dokumen ini berisi spesifikasi teknis dan fungsional untuk pengembangan Admin Dashboard yang akan mendukung project website portofolio/agensi **KitaNgoding**. Dashboard ini akan dibangun menggunakan **Tailwind UI (tailwindio)** untuk mempercepat proses development dan memastikan konsistensi desain UI yang modern.

---

## 1. Tujuan Proyek
Menyediakan sistem manajemen konten (CMS) internal yang memudahkan admin KitaNgoding dalam mengelola data website utama, meliputi portofolio proyek, layanan, artikel blog, produk, serta memantau prospek/inquiry dari klien.

## 2. Tech Stack & Tools
- **Framework:** Next.js (App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS
- **UI Kit:** Tailwind UI (Application UI Components)
- **State Management:** React Hooks / Zustand (jika diperlukan state global di dashboard)
- **Data Fetching / Mutation:** Server Actions Next.js / SWR / React Query
- **Database:** Supabase (PostgreSQL)
- **ORM:** Drizzle ORM
- **Authentication:** Better Auth

## 3. Struktur Layout (Tailwind UI)
Dashboard akan menggunakan komponen bawaan Tailwind UI (Application UI):
1. **Application Shells:** Menggunakan Sidebar layout (Sidebar on desktop, off-canvas menu on mobile).
2. **Page Headings:** Dilengkapi dengan breadcrumbs dan primary action button (misal: "Tambah Data").
3. **Data Displays:** Menggunakan layout **Tables** dari Tailwind UI untuk list data, dengan fitur pagination sederhana.
4. **Forms:** Slide-overs atau Modal dialogs untuk Create/Update data agar user tidak perlu berpindah halaman.
5. **Stats/Metrics:** Tampilan Grid Stats di halaman utama dashboard.

## 4. Modul & Fitur Utama

### A. Dashboard Home (Overview)
- Menampilkan metrik utama:
  - Total Leads / Inquiries bulan ini.
  - Total Portfolio aktif.
  - Artikel blog yang dipublish.
- Menampilkan tabel ringkasan 5 inquiry terbaru.

### B. Manajemen Inbox / Leads
Mengelola data yang masuk dari `ContactLeadForm` dan `ProjectInquiryForm`.
- **Fitur:** List, View Detail, Update Status (Unread, Followed Up, Closed), Delete.
- **Data Detail:** Nama, Email, No. WA, Pilihan Layanan, Budget (jika ada), dan Pesan.

### C. Manajemen Portfolio
Mengelola daftar proyek yang ditampilkan pada website utama.
- **Fitur:** Create, Read, Update, Delete (CRUD).
- **Atribut Data:** Nama Proyek, Kategori (Company Profile, Landing Page, E-Commerce, dll), Gambar Thumbnail, Deskripsi/Result.

### D. Manajemen Layanan & Produk (Shop/Services)
Mengelola layanan dan item shop.
- **Fitur:** CRUD Layanan.
- **Atribut Data:** Nama Layanan/Produk, Deskripsi, Harga (opsional), Icon.

### E. Manajemen Testimonial
Mengelola daftar review klien.
- **Fitur:** CRUD Testimonial.
- **Atribut Data:** Nama Klien, Role/Perusahaan, Isi Testimonial, Foto Klien.

### F. Manajemen Blog (Artikel)
Mengelola konten untuk `app/blog`.
- **Fitur:** CRUD Artikel, integrasi dengan WYSIWYG editor sederhana atau Markdown.
- **Atribut Data:** Judul, Slug, Thumbnail, Isi Konten, Kategori, Status (Draft/Published), Tanggal Publish.

### G. Manajemen Pricing
Mengelola struktur harga untuk `app/pricing`.
- **Fitur:** Update harga dan daftar fitur untuk masing-masing tier (Starter, Growth, Commerce, Custom).
- **Atribut Data:** Nama Paket, Harga, Deskripsi, Daftar Fitur, Status *Featured* (Yes/No).

## 5. Arsitektur Folder Dashboard (Rekomendasi)
Penyatuan ke dalam folder project Next.js saat ini:
```text
app/
 └── admin/
      ├── layout.tsx         # Tailwind UI Sidebar Layout
      ├── page.tsx           # Dashboard Overview
      ├── leads/             # Halaman Inbox / Leads
      ├── portfolio/         # Halaman Manajemen Portfolio
      ├── services/          # Halaman Manajemen Layanan
      ├── blog/              # Halaman Manajemen Blog
      └── settings/          # Pengaturan Umum
```

## 6. Tahapan Pengembangan (Roadmap)
1. **Fase 1: Setup & Layouting**
   - Instalasi dan integrasi Tailwind UI Application Shell.
   - Setup routing `/admin` dan proteksi halaman (Authentication setup menggunakan **Better Auth**).
2. **Fase 2: Integrasi Database & Inbox**
   - Setup skema database (Supabase + Drizzle ORM).
   - Pembuatan modul Inbox/Leads (karena interaksi calon klien adalah yang paling krusial).
3. **Fase 3: Manajemen Konten (CMS)**
   - Modul Portfolio, Services, dan Testimonial.
   - Integrasi data dinamis ini ke public-facing website (`app/(public)`) untuk menggantikan mock data di `lib/landing-data.ts`.
4. **Fase 4: Blog & Finishing**
   - Pembuatan modul Blog dengan text editor.
   - Testing, optimasi mobile view untuk dashboard admin, dan deployment.
