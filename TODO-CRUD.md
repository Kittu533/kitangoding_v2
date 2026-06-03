# 📝 TODO: Implementasi CRUD Admin Dashboard KitaNgoding

Dokumen ini berisi daftar tugas terstruktur untuk menyelesaikan fitur CRUD (Create, Read, Update, Delete) secara penuh pada dashboard admin, mencakup seluruh entitas yang dibutuhkan oleh website.

---

## 🏗 Fase 1: Persiapan Skema Database & Server Actions
*Langkah pertama adalah memastikan tabel di database (Supabase + Drizzle) sudah lengkap.*

- [x] **Update `lib/db/schema.ts`**: Tambahkan tabel-tabel berikut:
  - [x] `portfolios` (Sudah ada)
  - [x] `services` (Layanan & Produk: `id`, `title`, `description`, `price`, `icon`, `createdAt`)
  - [x] `testimonials` (Testimonial: `id`, `name`, `role`, `quote`, `avatar`, `createdAt`)
  - [x] `blogs` (Artikel Blog: `id`, `title`, `slug`, `content`, `thumbnail`, `status`, `createdAt`)
  - [x] `pricings` (Paket Harga: `id`, `name`, `price`, `description`, `features` (JSON/Array), `isFeatured`, `createdAt`)
- [ ] **Jalankan Migrasi**: Lakukan sinkronisasi skema ke Supabase (`npx drizzle-kit push`). *(Menunggu push lokal oleh Anda)*
- [x] **Setup Shadcn UI untuk Form**: Install komponen tambahan seperti `dialog`, `sheet`, `textarea`, `toast` / `sonner` (untuk notifikasi sukses/error).
- [x] **Buat File Server Actions**: Buat folder `app/actions/` atau letakkan langsung di dalam masing-masing direktori modul (misal: `app/admin/(dashboard)/portfolio/actions.ts`).

---

## 🎨 Fase 2: Implementasi CRUD per Modul

### 1. Modul Portfolio (`/admin/portfolio`)
- [x] **Read**: Menampilkan data ke dalam tabel + Pagination.
- [x] **Create**: Buat komponen `PortfolioForm` di dalam `<Sheet>` atau `<Dialog>` (Shadcn UI). Sambungkan tombol "Tambah Proyek" ke form ini.
- [x] **Action (Create)**: Buat Server Action untuk insert data ke DB dan `revalidatePath('/admin/portfolio')`.
- [x] **Update**: Buat tombol "Edit" memunculkan form dengan data yang sudah terisi (*pre-filled*).
- [x] **Delete**: Buat dialog konfirmasi (Alert Dialog) saat tombol "Hapus" ditekan, lalu hapus dari DB.

### 2. Modul Layanan & Produk (`/admin/services`)
- [x] **Read**: Buat UI Halaman `app/admin/(dashboard)/services/page.tsx` dengan Shadcn `<Table>`.
- [x] **Create**: Form tambah layanan (Input: Nama Layanan, Deskripsi, Harga Opsional).
- [x] **Update & Delete**: Lengkapi aksi tabel dengan dropdown/button edit dan hapus.

### 3. Modul Testimonial (`/admin/testimonials`)
- [x] **Read**: Buat UI Halaman `app/admin/(dashboard)/testimonials/page.tsx` dengan Shadcn `<Table>`. Menampilkan kutipan (quote) dan nama klien.
- [x] **Create**: Form tambah testimonial (Input: Nama, Role/Perusahaan, Isi Quote).
- [x] **Update & Delete**: Sama seperti di atas.

### 4. Modul Blog / Artikel (`/admin/blog`)
*Modul ini sedikit lebih kompleks karena butuh Text Editor.*
- [x] **Read**: Buat UI Halaman `app/admin/(dashboard)/blog/page.tsx`. Tampilkan list artikel beserta statusnya (Draft/Published).
- [x] **Create (Editor)**: Integrasikan form editor menggunakan komponen Shadcn `<Textarea>` dan layout `<Sheet>`.
- [x] **Create (Action)**: Generate `slug` otomatis dari `title`.
- [x] **Update**: Form edit untuk merevisi tulisan.
- [x] **Delete**: Hapus artikel.

### 5. Modul Pricing (`/admin/pricing`)
- [x] **Read**: Buat UI Halaman `app/admin/(dashboard)/pricing/page.tsx`.
- [x] **Create/Update**: Form yang bisa menangani array input (untuk memasukkan daftar fitur ke dalam satu paket harga). Gunakan react-hook-form + zod untuk validasi form dinamis ini.
- [x] **Toggle Featured**: Tambahkan switch/toggle untuk menentukan paket mana yang di-highlight ("Most Popular").

---

## 🔌 Fase 3: Image / File Upload (Opsional Tapi Penting)
- [ ] **Integrasi Storage**: Setup Supabase Storage (atau layanan seperti Uploadthing / Cloudinary).
- [ ] **Implementasi Upload**: Ganti input URL gambar biasa di form Portfolio, Testimonial, dan Blog dengan komponen uploader gambar, lalu simpan URL *public*-nya ke database.

---

## 🚀 Fase 4: Integrasi Publik (Frontend)
- [ ] **Ganti Mock Data**: Modifikasi file-file di `app/(public)` atau `app/page.tsx` yang saat ini menggunakan data statis dari `lib/landing-data.ts`.
- [ ] **Fetch dari DB**: Ubah komponen untuk melakukan *fetch* langsung ke database menggunakan Drizzle (misal: `await db.select().from(portfolios).limit(3)`).

---

## 🛠 Panduan Eksekusi (Tips)
1. **Server Actions vs API Routes**: Sangat disarankan menggunakan *Next.js Server Actions* (file dengan `'use server'`) karena lebih mudah dan aman untuk mengubah data langsung dari UI.
2. **Notifikasi**: Gunakan `useToast` dari shadcn/ui setelah Server Action berhasil (`toast({ title: "Berhasil!", description: "Data portofolio telah disimpan." })`).
3. **Zod Validasi**: Buat skema validasi `zod` untuk memastikan data yang diinput admin sesuai dengan tipe data di skema database.
