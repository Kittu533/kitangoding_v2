# SEO Kitangoding

## Perubahan

- Robots mengizinkan gambar portfolio publik di bawah `/api/portfolio-images/`. API lain dan admin tetap dibatasi.
- Sitemap memuat detail portfolio dan halaman layanan. Artikel dari dashboard mengalahkan fallback dengan slug yang sama; draft tidak masuk sitemap. Tanggal pembaruan memakai data konten, bukan waktu request.
- Canonical memakai origin yang konsisten tanpa path, query, atau slash ganda dari konfigurasi.
- H1 layanan menjelaskan jasa yang ditawarkan. Homepage menyebut layanan website UMKM dan lokasi Jogja dalam teks yang terlihat.
- Artikel mempertahankan URL ketika judul diedit. Metadata artikel memuat tanggal publikasi, tanggal pembaruan, penulis, kategori, dan tag yang tersedia.
- Detail portfolio memakai gambar project untuk preview sosial dan menambahkan breadcrumb serta CreativeWork.
- JSON-LD di seluruh halaman di-escape agar teks dari dashboard tidak dapat memutus tag script.

## Sebelum tayang

Konfigurasi lokal saat audit memakai `NEXT_PUBLIC_APP_URL=http://localhost:3000`. Di hosting production, set variabel tersebut ke domain publik aktif yang dipilih, misalnya `https://www.kitangoding.my.id`, sebelum build. Jangan memakai localhost atau domain preview sebagai canonical production. Domain dan kontak tidak diganti oleh perubahan ini.

Periksa redirect HTTP ke HTTPS serta www/non-www di hosting: pilih satu host canonical dan redirect host lainnya secara permanen. Jangan mengubah DNS sebelum host tujuan terbukti berfungsi.

## Verifikasi setelah deploy

1. Buka robots.txt dan sitemap.xml di domain production; pastikan semua URL memakai domain yang sama dan halaman detail mengembalikan konten yang benar.
2. Submit sitemap di properti Google Search Console yang sesuai. Periksa homepage, empat halaman layanan, satu artikel, dan satu project melalui URL Inspection.
3. Jalankan Rich Results Test dan Schema Markup Validator. Structured data tidak menjamin rich result, dan FAQ bisnis umum tidak otomatis mendapat tampilan FAQ di Google.
4. Catat baseline 28 hari: klik organik, impression, CTR, posisi rata-rata per query/halaman, serta klik WhatsApp dan inquiry. Bandingkan periode sebanding setelah Google melakukan crawl ulang; pisahkan brand “Kitangoding” dari pencarian layanan.
5. Perbarui artikel berdasarkan pertanyaan calon pelanggan dan data query yang nyata. Utamakan penjelasan scope, proses, studi kasus, dan biaya yang bisa dibuktikan; hindari halaman kota duplikat atau penambahan keyword berulang.

## Batas audit

Validasi lokal: build production, TypeScript, ESLint, 21 unit test, smoke test SEO/editor, serta tes HTTP terhadap HTML hasil production lolos. Tes HTTP mencakup canonical, satu H1, deskripsi, JSON-LD, metadata artikel/project, dan keberadaan project dalam sitemap. Tes ini membaca respons server langsung; bukan audit visual browser atau penilaian Core Web Vitals.

Tidak ada akses laporan Search Console/GA4 pada sesi ini, sehingga belum ada baseline traffic atau klaim peningkatan ranking. Pengambilan situs production melalui alat web timeout; status hosting, DNS, dan indeks Google belum terverifikasi. Database konten tidak dimigrasi atau diisi ulang.

Rujukan: [panduan sitemap Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [SEO gambar](https://developers.google.com/search/docs/appearance/google-images), [konten yang membantu pembaca](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
