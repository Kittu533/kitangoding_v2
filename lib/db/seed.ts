import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import {
  services as seedServices,
  portfolioItems as seedPortfolios,
  pricingPlans as seedPricings,
  testimonials as seedTestimonials,
} from "../landing-data";

// Setup connection specifically for the seeder
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ ERROR: DATABASE_URL tidak ditemukan. Pastikan file .env sudah dikonfigurasi.");
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function main() {
  console.log("🌱 Memulai proses seeding database...");

  try {
    // 1. Seed Layanan & Produk (Services)
    console.log("⏳ Seeding Services...");
    for (const item of seedServices) {
      await db.insert(schema.services).values({
        title: item.title,
        description: item.description,
        price: "Mulai 1,5jt", // Default dummy price
      }).onConflictDoNothing();
    }

    // 2. Seed Portfolio (Kategori & Portfolios)
    console.log("⏳ Seeding Kategori Portfolio & Portfolios...");
    const categoryNames = [...new Set(seedPortfolios.map((p) => p.category))];
    const categoryMap = new Map<string, string>(); // name -> id

    for (const catName of categoryNames) {
      const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const inserted = await db.insert(schema.portfolioCategories).values({
        name: catName,
        slug: slug,
      }).returning({ id: schema.portfolioCategories.id }).onConflictDoNothing();

      if (inserted.length > 0) {
        categoryMap.set(catName, inserted[0].id);
      } else {
        const existing = await db.select().from(schema.portfolioCategories).where(eq(schema.portfolioCategories.name, catName));
        if (existing.length > 0) {
          categoryMap.set(catName, existing[0].id);
        }
      }
    }

    for (const item of seedPortfolios) {
      const catId = categoryMap.get(item.category);
      if (catId) {
        await db.insert(schema.portfolios).values({
          name: item.name,
          categoryId: catId,
          result: item.result,
          thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", // Dummy image
        }).onConflictDoNothing();
      }
    }

    // 3. Seed Testimonials
    console.log("⏳ Seeding Testimonials...");
    for (const item of seedTestimonials) {
      await db.insert(schema.testimonials).values({
        name: item.name,
        role: item.role,
        quote: item.quote,
        avatar: "",
      }).onConflictDoNothing();
    }

    // 4. Seed Pricings
    console.log("⏳ Seeding Pricings...");
    await db.delete(schema.pricings);

    for (const item of seedPricings) {
      await db.insert(schema.pricings).values({
        name: item.name,
        price: item.price,
        description: item.description,
        features: [...item.features],
        isFeatured: item.featured,
      }).onConflictDoNothing();
    }

    // 5. Seed Blogs
    console.log("⏳ Seeding Blogs...");
    const blogs = [
      {
        title: "Pentingnya Website untuk Pertumbuhan UMKM",
        slug: "pentingnya-website-untuk-pertumbuhan-umkm",
        excerpt: "Di era digital, website bukan lagi barang mewah, melainkan kebutuhan dasar untuk membangun kepercayaan.",
        content: "Banyak pemilik UMKM merasa belum butuh website karena sudah berjualan di media sosial. Padahal, website memberikan kontrol penuh atas *branding* dan tidak bergantung pada algoritma...\n\n**1. Kredibilitas Meningkat**\nCalon pelanggan lebih percaya dengan bisnis yang memiliki domain sendiri (misal: .com atau .id).\n\n**2. Buka 24 Jam**\nWebsite adalah etalase digital yang melayani pelanggan tanpa henti.",
        category: "Digital Marketing",
        status: "published" as const,
        thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80"
      },
      {
        title: "5 Tips Mengoptimalkan Landing Page",
        slug: "5-tips-mengoptimalkan-landing-page",
        excerpt: "Landing page yang baik harus bisa mengkonversi pengunjung menjadi pelanggan.",
        content: "Landing page adalah kunci sukses *campaign* pemasaran Anda. Berikut adalah 5 elemen penting yang harus ada:\n\n1. Headline yang memikat\n2. Call to Action (CTA) yang jelas\n3. Kecepatan *loading* halaman\n4. *Social Proof* atau Testimoni\n5. Desain *Mobile Friendly*",
        category: "Tips Bisnis",
        status: "published" as const,
        thumbnail: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&q=80"
      }
      ,
      {
        title: "Jasa Website Company Profile UMKM: Apa Saja yang Perlu Ada?",
        slug: "jasa-website-company-profile-umkm",
        excerpt: "Panduan isi website company profile UMKM agar bisnis terlihat jelas, dipercaya, dan mudah dihubungi calon pelanggan.",
        content: "Website company profile untuk UMKM tidak perlu rumit. Yang penting, pengunjung bisa cepat paham siapa bisnisnya, apa layanannya, area kerja atau target pasarnya, dan bagaimana cara menghubungi tim penjualan.\n\nStruktur minimal yang efektif biasanya berisi hero yang spesifik, ringkasan layanan, keunggulan yang bisa dibuktikan, portfolio atau contoh kerja, testimoni, FAQ, dan tombol WhatsApp yang mudah ditemukan. Setiap bagian sebaiknya menjawab pertanyaan calon pelanggan, bukan hanya terlihat ramai.\n\nKalau tujuan utamanya mendapatkan lead, jangan sembunyikan CTA di bagian bawah saja. Ulangi ajakan konsultasi di beberapa titik penting supaya pengunjung yang sudah yakin bisa langsung bertindak.",
        category: "Tips Bisnis",
        status: "published" as const,
        thumbnail: "/images/project-4.webp"
      },
      {
        title: "Jasa Landing Page untuk Iklan: Kenapa Tidak Cukup Pakai Homepage?",
        slug: "jasa-landing-page-untuk-iklan",
        excerpt: "Landing page membantu traffic iklan membaca satu penawaran dengan alur yang lebih fokus dan CTA yang lebih jelas.",
        content: "Homepage biasanya berisi banyak informasi: profil, layanan, portfolio, artikel, dan kontak. Untuk traffic iklan, informasi yang terlalu luas bisa membuat pengunjung bingung. Landing page dibuat lebih fokus: satu campaign, satu pesan utama, satu CTA.\n\nLanding page yang baik menyambungkan janji di iklan dengan isi halaman. Jika iklan menawarkan paket website UMKM, halaman harus langsung menjelaskan masalah UMKM, hasil yang didapat, harga atau rentang investasi, proses kerja, bukti, dan cara konsultasi.\n\nDengan alur yang lebih pendek, tim marketing juga lebih mudah mengukur performa. Headline, CTA, testimoni, dan form bisa dievaluasi satu per satu tanpa terganggu navigasi yang terlalu banyak.",
        category: "Digital Marketing",
        status: "published" as const,
        thumbnail: "/images/project-5.webp"
      },
      {
        title: "Biaya Pembuatan Website UMKM: Faktor yang Mempengaruhi Harga",
        slug: "biaya-pembuatan-website-umkm",
        excerpt: "Harga website UMKM dipengaruhi jumlah halaman, kebutuhan desain, fitur, konten, integrasi, dan dukungan setelah launch.",
        content: "Biaya pembuatan website UMKM tidak bisa dilihat dari jumlah halaman saja. Website sederhana dengan copywriting rapi, desain responsif, dan CTA jelas sering lebih bernilai daripada website banyak halaman tapi informasinya berantakan.\n\nFaktor yang paling sering mempengaruhi harga adalah jenis website, jumlah section, kebutuhan desain custom, penulisan konten, fitur katalog atau form, integrasi WhatsApp, optimasi dasar SEO, dan dukungan setelah website online. Semakin spesifik kebutuhan bisnis, semakin besar waktu yang diperlukan untuk merancang alurnya.\n\nCara paling aman adalah mulai dari tujuan. Jika targetnya kredibilitas, company profile bisa cukup. Jika targetnya campaign iklan, landing page lebih tepat. Jika ingin menjual produk langsung, toko online atau katalog WhatsApp bisa jadi pilihan.",
        category: "Tips Bisnis",
        status: "published" as const,
        thumbnail: "/images/project-6.webp"
      },
      {
        title: "Jasa Toko Online untuk UMKM: Mulai dari Katalog atau Checkout?",
        slug: "jasa-toko-online-untuk-umkm",
        excerpt: "Tidak semua UMKM perlu checkout penuh sejak awal. Kadang katalog produk dengan alur WhatsApp lebih cepat menghasilkan order.",
        content: "Toko online untuk UMKM sebaiknya mengikuti cara bisnis melayani pelanggan. Jika produk perlu konsultasi, variasi stok sering berubah, atau order masih banyak lewat chat, katalog produk dengan tombol WhatsApp bisa lebih praktis daripada checkout penuh.\n\nCheckout lengkap cocok ketika harga, stok, ongkir, dan pembayaran sudah siap dibuat otomatis. Tapi kalau operasional belum stabil, fitur yang terlalu banyak justru menambah pekerjaan admin. Mulai dari katalog yang rapi sering lebih aman: foto produk, deskripsi, kategori, harga, dan CTA order.\n\nSetelah order mulai konsisten, fitur bisa ditambah bertahap. Misalnya filter produk, halaman detail, form order, integrasi pembayaran, atau dashboard sederhana untuk mengelola katalog.",
        category: "Web Development",
        status: "published" as const,
        thumbnail: "/images/project-7.png"
      },
      {
        title: "Agar Website Bisnis Mudah Ditemukan Google, Mulai dari Hal Ini",
        slug: "website-bisnis-agar-mudah-ditemukan-google",
        excerpt: "SEO teknis penting, tapi Google juga butuh halaman yang jelas membahas layanan, lokasi, masalah pelanggan, dan bukti bisnis.",
        content: "Agar website bisnis mudah ditemukan Google, fondasi teknis seperti title, description, sitemap, robots, canonical, dan structured data memang perlu benar. Tapi setelah itu, yang menentukan adalah kualitas halaman dan relevansi konten.\n\nSetiap layanan penting sebaiknya punya halaman atau section yang menjelaskan masalah pelanggan, solusi yang ditawarkan, proses kerja, estimasi hasil, FAQ, dan cara menghubungi. Google lebih mudah memahami bisnis jika topiknya konsisten dan tidak terlalu umum.\n\nUntuk UMKM, konten lokal juga bisa membantu. Sebutkan area layanan, jenis bisnis yang dilayani, contoh kebutuhan, dan studi kasus sederhana. Artikel blog dapat dipakai untuk menjawab pertanyaan yang sering ditanyakan calon pelanggan sebelum membeli.",
        category: "Digital Marketing",
        status: "published" as const,
        thumbnail: "/images/project-8.png"
      },
      {
        title: "Cara Membuat Website Bisnis Lebih Meyakinkan untuk Calon Pelanggan",
        slug: "cara-membuat-website-bisnis-lebih-meyakinkan",
        excerpt: "Kepercayaan muncul dari pesan yang jelas, bukti kerja, tampilan rapi, kecepatan halaman, dan jalur kontak yang tidak membingungkan.",
        content: "Website bisnis yang meyakinkan tidak harus penuh animasi. Pengunjung biasanya mencari jawaban sederhana: bisnis ini bisa membantu saya atau tidak, sudah pernah mengerjakan hal serupa atau belum, dan mudah dihubungi atau tidak.\n\nMulai dari headline yang langsung menyebut layanan dan target pelanggan. Setelah itu tampilkan manfaat, contoh hasil kerja, testimoni, proses kerja, dan FAQ. Hindari kalimat yang terlalu umum seperti solusi terbaik tanpa bukti pendukung.\n\nDetail kecil juga berpengaruh: nomor kontak aktif, tombol WhatsApp yang jelas, halaman cepat dibuka, gambar tidak pecah, dan tampilan mobile rapi. Semakin sedikit keraguan yang muncul, semakin besar peluang pengunjung menghubungi.",
        category: "Strategi Branding",
        status: "published" as const,
        thumbnail: "/images/project-1.png"
      }
    ];
    
    for (const blog of blogs) {
      await db.insert(schema.blogPosts).values(blog).onConflictDoNothing();
    }

    console.log("✅ Seeding selesai! Seluruh dummy data kategori telah berhasil dimasukkan.");
  } catch (error) {
    console.error("❌ Terjadi kesalahan saat seeding:", error);
  }
  
  process.exit(0);
}

main();
