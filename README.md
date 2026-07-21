# Kita Ngoding

Website pemasaran dan dashboard pengelolaan konten untuk [kitangoding.id](https://www.kitangoding.my.id). Repository ini berisi situs publik, portofolio, blog, formulir prospek, serta dashboard admin untuk mengelola konten.

## Fitur utama

- Halaman layanan, harga, portofolio, blog, kontak, dan landing page.
- Detail portofolio dengan galeri gambar.
- Blog dengan kategori, tag, author, cover, dan rich-text editor yang disanitasi sebelum disimpan.
- Dashboard admin untuk layanan, harga, portofolio, testimoni, leads, artikel, serta kategori.
- Autentikasi admin menggunakan Better Auth.
- PostgreSQL/Supabase melalui Drizzle ORM.

## Tech stack

- Next.js 16 dan React 19
- TypeScript dan Tailwind CSS 4
- PostgreSQL, Supabase, Drizzle ORM, dan Drizzle Kit
- Better Auth
- Tiptap dan sanitize-html

## Persyaratan

- Node.js >= 20.9.0
- npm
- Database PostgreSQL atau project Supabase

## Mulai lokal

1. Instal dependensi.

   ~~~bash
   npm ci
   ~~~

2. Buat konfigurasi environment lokal.

   ~~~bash
   cp .env.example .env.local
   ~~~

3. Isi <code>DATABASE_URL</code>, <code>DIRECT_URL</code>, <code>BETTER_AUTH_SECRET</code>, dan kredensial admin di <code>.env.local</code>.

   Buat secret autentikasi dengan:

   ~~~bash
   openssl rand -base64 48
   ~~~

4. Terapkan schema database.

   ~~~bash
   npm run db:push
   ~~~

5. Isi data awal dan akun admin.

   ~~~bash
   npm run seed
   ~~~

6. Jalankan aplikasi.

   ~~~bash
   npm run dev
   ~~~

   Buka [http://localhost:3000](http://localhost:3000) untuk situs publik dan [http://localhost:3000/admin/login](http://localhost:3000/admin/login) untuk dashboard.

## Environment

Salin <code>.env.example</code> ke <code>.env.local</code>. File <code>.env*</code> diabaikan Git, jadi jangan menyimpan secret di repository.

| Variabel | Kegunaan |
| --- | --- |
| <code>DATABASE_URL</code> | Koneksi PostgreSQL runtime, biasanya URL pooler Supabase. |
| <code>DIRECT_URL</code> | Koneksi PostgreSQL langsung untuk Drizzle Kit dan seeding. |
| <code>BETTER_AUTH_SECRET</code> | Secret untuk sesi Better Auth. |
| <code>NEXT_PUBLIC_APP_URL</code> | URL aplikasi, misalnya <code>http://localhost:3000</code>. |
| <code>ADMIN_EMAIL</code> | Email akun admin awal. |
| <code>ADMIN_PASSWORD</code> | Password akun admin awal. |
| <code>ADMIN_NAME</code> | Nama akun admin awal. |

Variabel <code>NEXT_PUBLIC_SITE_*</code> mengatur identitas situs, kontak, alamat, dan WhatsApp. Nilai dengan awalan <code>NEXT_PUBLIC_</code> dikirim ke browser, jadi jangan gunakan untuk secret.

## Database dan seed

Schema Drizzle berada di <code>lib/db/schema.ts</code>, sedangkan migration SQL berada di <code>supabase/migrations/</code>.

| Perintah | Kegunaan |
| --- | --- |
| <code>npm run db:generate</code> | Membuat migration Drizzle dari perubahan schema. |
| <code>npm run db:push</code> | Menerapkan schema ke database yang dikonfigurasi. |
| <code>npm run seed</code> | Mengisi data awal dan menyiapkan akun admin dari <code>.env.local</code> atau <code>.env</code>. |
| <code>npm run db:seed</code> | Menjalankan seed data dari <code>lib/db/seed.ts</code>; pastikan <code>DATABASE_URL</code> tersedia di shell. |
| <code>npm run seed:blog-categories</code> | Menambahkan kategori blog awal; pastikan URL database tersedia di shell. |

Gunakan database development saat menjalankan seed. Beberapa seed menulis atau memperbarui data contoh.

## Perintah

| Perintah | Kegunaan |
| --- | --- |
| <code>npm run dev</code> | Menjalankan server development. |
| <code>npm run build</code> | Membuat build production. |
| <code>npm run start</code> | Menjalankan hasil build production. |
| <code>npm run lint</code> | Memeriksa ESLint. |
| <code>npm run test:seo</code> | Menjalankan smoke test SEO. |
| <code>npx tsx --test tests/production-readiness.test.ts</code> | Menjalankan test kesiapan produksi. |

Sebelum mengirim perubahan, jalankan:

~~~bash
npm run lint
npm run build
~~~

## Struktur repository

~~~text
app/                    Route publik, API, autentikasi, dan dashboard admin
components/             Komponen UI, template halaman, dan form admin
lib/                    Konfigurasi situs, autentikasi, database, dan data publik
supabase/migrations/    Migration PostgreSQL
scripts/                Seeder dan smoke test
tests/                  Test runtime
public/                 Asset statis
~~~

## Pengelolaan konten

Masuk ke <code>/admin/login</code> menggunakan kredensial admin dari environment.

- <code>/admin/services</code> mengelola layanan.
- <code>/admin/pricing</code> mengelola paket harga.
- <code>/admin/portfolio</code> dan <code>/admin/categories</code> mengelola portofolio.
- <code>/admin/blog</code> dan <code>/admin/blog-categories</code> mengelola artikel dan kategorinya.
- <code>/admin/testimonials</code> dan <code>/admin/leads</code> mengelola social proof serta prospek.

Artikel berstatus <code>published</code> tampil di <code>/blog</code>. Draft tetap hanya tersedia di dashboard.

## Deploy

1. Atur semua environment variable yang ada di <code>.env.example</code> pada platform hosting.
2. Gunakan build command:

   ~~~bash
   npm run build
   ~~~

3. Gunakan start command:

   ~~~bash
   npm run start
   ~~~

Pastikan <code>NEXT_PUBLIC_APP_URL</code> memakai domain production dan database production sudah menerima migration yang diperlukan.
