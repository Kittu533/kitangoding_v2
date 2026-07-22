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
import { slugify } from "../slug";

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
          slug: slugify(item.name),
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
        title: "Cara Memilih Template Website yang Cocok untuk UMKM",
        slug: "cara-memilih-template-website-yang-cocok-untuk-umkm",
        excerpt: "Panduan sederhana untuk memilih tampilan yang sesuai dengan jenis bisnis, tujuan, dan calon pelanggan kamu.",
        content: "Mulailah dari tujuan utama websitemu. Kalau fokusnya mengenalkan bisnis, kamu butuh struktur company profile yang rapi. Kalau fokusnya promosi, landing page dengan CTA yang jelas biasanya lebih efektif.\n\nSetelah itu, cek apakah template punya ruang yang cukup untuk menjelaskan layanan, hasil kerja, dan cara menghubungi kamu. Template yang bagus bukan cuma terlihat menarik, tapi juga membantu calon pelanggan cepat paham.\n\nPastikan juga tampilannya nyaman di mobile. Mayoritas pengunjung pertama datang dari handphone, jadi layout, ukuran teks, dan tombol WhatsApp perlu tetap enak dipakai di layar kecil.",
        category: "Tips Bisnis",
        status: "published" as const,
        thumbnail: "/images/article-template-umkm.svg"
      },
      {
        title: "Kenapa Website Custom Bisa Jadi Investasi yang Masuk Akal",
        slug: "kenapa-website-custom-bisa-jadi-investasi-yang-masuk-akal",
        excerpt: "Kapan bisnis cukup pakai template, dan kapan perlu tampilan custom yang dibuat lebih spesifik.",
        content: "Template siap pakai cocok untuk bisnis yang ingin segera launch dengan struktur yang sudah jelas. Tapi saat kebutuhan mulai lebih spesifik, website custom sering jadi pilihan yang lebih masuk akal.\n\nCustom berarti isi, alur, dan tampilan bisa lebih dekat dengan cara bisnismu bekerja. Ini penting kalau kamu punya layanan yang perlu dijelaskan bertahap, katalog yang butuh filter tertentu, atau CTA yang harus disusun lebih strategis.\n\nInvestasi custom biasanya lebih terasa nilainya ketika website dipakai sebagai alat jualan, bukan sekadar pelengkap identitas bisnis.",
        category: "Studi Kasus",
        status: "published" as const,
        thumbnail: "/images/article-custom-website.svg"
      },
      {
        title: "Strategi Sederhana agar Website Lebih Banyak Menghasilkan Lead",
        slug: "strategi-sederhana-agar-website-lebih-banyak-menghasilkan-lead",
        excerpt: "Mulai dari pesan utama, struktur halaman, sampai tombol WhatsApp yang lebih jelas untuk calon pelanggan.",
        content: "Kalau pengunjung datang tapi tidak menghubungi, biasanya ada yang kurang jelas di halaman utama. Bisa jadi headline terlalu umum, manfaat belum terasa, atau CTA kurang terlihat.\n\nCoba mulai dari tiga hal: headline yang spesifik, section layanan yang ringkas, dan tombol aksi yang konsisten. Jangan biarkan pengunjung menebak apa langkah berikutnya.\n\nTambahkan juga bukti pendukung seperti portfolio, testimoni, atau studi kasus singkat. Elemen-elemen ini membantu rasa percaya muncul lebih cepat sebelum orang memutuskan chat.",
        category: "Digital Marketing",
        status: "published" as const,
        thumbnail: "/images/article-lead-strategy.svg"
      },
      {
        title: "Jasa Website Company Profile UMKM: Apa Saja yang Perlu Ada?",
        slug: "jasa-website-company-profile-umkm",
        excerpt: "Panduan isi website company profile UMKM agar bisnis terlihat jelas, dipercaya, dan mudah dihubungi calon pelanggan.",
        content: "Website company profile untuk UMKM tidak perlu rumit. Yang penting, pengunjung bisa cepat paham siapa bisnisnya, apa layanannya, area kerja atau target pasarnya, dan bagaimana cara menghubungi tim penjualan.\n\nStruktur minimal yang efektif biasanya berisi hero yang spesifik, ringkasan layanan, keunggulan yang bisa dibuktikan, portfolio atau contoh kerja, testimoni, FAQ, dan tombol WhatsApp yang mudah ditemukan. Setiap bagian sebaiknya menjawab pertanyaan calon pelanggan, bukan hanya terlihat ramai.\n\nKalau tujuan utamanya mendapatkan lead, jangan sembunyikan CTA di bagian bawah saja. Ulangi ajakan konsultasi di beberapa titik penting supaya pengunjung yang sudah yakin bisa langsung bertindak.",
        category: "Tips Bisnis",
        status: "published" as const,
        thumbnail: "/images/article-company-profile.svg"
      },
      {
        title: "Jasa Landing Page untuk Iklan: Kenapa Tidak Cukup Pakai Homepage?",
        slug: "jasa-landing-page-untuk-iklan",
        excerpt: "Landing page membantu traffic iklan membaca satu penawaran dengan alur yang lebih fokus dan CTA yang lebih jelas.",
        content: "Homepage biasanya berisi banyak informasi: profil, layanan, portfolio, artikel, dan kontak. Untuk traffic iklan, informasi yang terlalu luas bisa membuat pengunjung bingung. Landing page dibuat lebih fokus: satu campaign, satu pesan utama, satu CTA.\n\nLanding page yang baik menyambungkan janji di iklan dengan isi halaman. Jika iklan menawarkan paket website UMKM, halaman harus langsung menjelaskan masalah UMKM, hasil yang didapat, harga atau rentang investasi, proses kerja, bukti, dan cara konsultasi.\n\nDengan alur yang lebih pendek, tim marketing juga lebih mudah mengukur performa. Headline, CTA, testimoni, dan form bisa dievaluasi satu per satu tanpa terganggu navigasi yang terlalu banyak.",
        category: "Digital Marketing",
        status: "published" as const,
        thumbnail: "/images/article-landing-page-ads.svg"
      },
      {
        title: "Biaya Pembuatan Website UMKM: Faktor yang Mempengaruhi Harga",
        slug: "biaya-pembuatan-website-umkm",
        excerpt: "Harga website UMKM dipengaruhi jumlah halaman, kebutuhan desain, fitur, konten, integrasi, dan dukungan setelah launch.",
        content: "Biaya pembuatan website UMKM tidak bisa dilihat dari jumlah halaman saja. Website sederhana dengan copywriting rapi, desain responsif, dan CTA jelas sering lebih bernilai daripada website banyak halaman tapi informasinya berantakan.\n\nFaktor yang paling sering mempengaruhi harga adalah jenis website, jumlah section, kebutuhan desain custom, penulisan konten, fitur katalog atau form, integrasi WhatsApp, optimasi dasar SEO, dan dukungan setelah website online. Semakin spesifik kebutuhan bisnis, semakin besar waktu yang diperlukan untuk merancang alurnya.\n\nCara paling aman adalah mulai dari tujuan. Jika targetnya kredibilitas, company profile bisa cukup. Jika targetnya campaign iklan, landing page lebih tepat. Jika ingin menjual produk langsung, toko online atau katalog WhatsApp bisa jadi pilihan.",
        category: "Tips Bisnis",
        status: "published" as const,
        thumbnail: "/images/article-biaya-website.svg"
      },
      {
        title: "Jasa Toko Online untuk UMKM: Mulai dari Katalog atau Checkout?",
        slug: "jasa-toko-online-untuk-umkm",
        excerpt: "Tidak semua UMKM perlu checkout penuh sejak awal. Kadang katalog produk dengan alur WhatsApp lebih cepat menghasilkan order.",
        content: "Toko online untuk UMKM sebaiknya mengikuti cara bisnis melayani pelanggan. Jika produk perlu konsultasi, variasi stok sering berubah, atau order masih banyak lewat chat, katalog produk dengan tombol WhatsApp bisa lebih praktis daripada checkout penuh.\n\nCheckout lengkap cocok ketika harga, stok, ongkir, dan pembayaran sudah siap dibuat otomatis. Tapi kalau operasional belum stabil, fitur yang terlalu banyak justru menambah pekerjaan admin. Mulai dari katalog yang rapi sering lebih aman: foto produk, deskripsi, kategori, harga, dan CTA order.\n\nSetelah order mulai konsisten, fitur bisa ditambah bertahap. Misalnya filter produk, halaman detail, form order, integrasi pembayaran, atau dashboard sederhana untuk mengelola katalog.",
        category: "Web Development",
        status: "published" as const,
        thumbnail: "/images/article-toko-online-umkm.svg"
      },
      {
        title: "Agar Website Bisnis Mudah Ditemukan Google, Mulai dari Hal Ini",
        slug: "website-bisnis-agar-mudah-ditemukan-google",
        excerpt: "SEO teknis penting, tapi Google juga butuh halaman yang jelas membahas layanan, lokasi, masalah pelanggan, dan bukti bisnis.",
        content: "Agar website bisnis mudah ditemukan Google, fondasi teknis seperti title, description, sitemap, robots, canonical, dan structured data memang perlu benar. Tapi setelah itu, yang menentukan adalah kualitas halaman dan relevansi konten.\n\nSetiap layanan penting sebaiknya punya halaman atau section yang menjelaskan masalah pelanggan, solusi yang ditawarkan, proses kerja, estimasi hasil, FAQ, dan cara menghubungi. Google lebih mudah memahami bisnis jika topiknya konsisten dan tidak terlalu umum.\n\nUntuk UMKM, konten lokal juga bisa membantu. Sebutkan area layanan, jenis bisnis yang dilayani, contoh kebutuhan, dan studi kasus sederhana. Artikel blog dapat dipakai untuk menjawab pertanyaan yang sering ditanyakan calon pelanggan sebelum membeli.",
        category: "Digital Marketing",
        status: "published" as const,
        thumbnail: "/images/article-google-discovery.svg"
      },
      {
        title: "Cara Membuat Website Bisnis Lebih Meyakinkan untuk Calon Pelanggan",
        slug: "cara-membuat-website-bisnis-lebih-meyakinkan",
        excerpt: "Kepercayaan muncul dari pesan yang jelas, bukti kerja, tampilan rapi, kecepatan halaman, dan jalur kontak yang tidak membingungkan.",
        content: "Website bisnis yang meyakinkan tidak harus penuh animasi. Pengunjung biasanya mencari jawaban sederhana: bisnis ini bisa membantu saya atau tidak, sudah pernah mengerjakan hal serupa atau belum, dan mudah dihubungi atau tidak.\n\nMulai dari headline yang langsung menyebut layanan dan target pelanggan. Setelah itu tampilkan manfaat, contoh hasil kerja, testimoni, proses kerja, dan FAQ. Hindari kalimat yang terlalu umum seperti solusi terbaik tanpa bukti pendukung.\n\nDetail kecil juga berpengaruh: nomor kontak aktif, tombol WhatsApp yang jelas, halaman cepat dibuka, gambar tidak pecah, dan tampilan mobile rapi. Semakin sedikit keraguan yang muncul, semakin besar peluang pengunjung menghubungi.",
        category: "Strategi Branding",
        status: "published" as const,
        thumbnail: "/images/article-website-trust.svg"
      },
      {
        title: "Perbedaan Website Company Profile dan Landing Page untuk Bisnis",
        slug: "perbedaan-website-company-profile-dan-landing-page",
        excerpt: "Dua jenis halaman ini sering dianggap sama, padahal tujuan, struktur, dan cara pakainya berbeda.",
        content: "Website company profile dipakai untuk menjelaskan bisnis secara menyeluruh. Biasanya ada profil, layanan, portfolio, testimoni, FAQ, dan kontak. Tujuannya membangun kepercayaan dan memberi gambaran lengkap tentang siapa kamu.\n\nLanding page jauh lebih fokus. Biasanya satu halaman untuk satu penawaran, satu campaign, atau satu CTA utama. Struktur isinya lebih singkat dan diarahkan agar pengunjung cepat mengambil tindakan seperti chat, isi form, atau order.\n\nKalau bisnis kamu butuh aset jangka panjang untuk kredibilitas, company profile sering jadi fondasi. Kalau fokusnya promosi tertentu atau traffic iklan, landing page biasanya lebih efektif.",
        category: "Tips Bisnis",
        status: "published" as const,
        thumbnail: "/images/article-company-vs-landing.svg"
      },
      {
        title: "Berapa Lama Pembuatan Website Bisnis Biasanya Selesai?",
        slug: "berapa-lama-pembuatan-website-bisnis",
        excerpt: "Durasi pembuatan website dipengaruhi kejelasan brief, jumlah revisi, isi konten, dan fitur yang diminta.",
        content: "Website bisnis yang sederhana bisa selesai lebih cepat kalau arah desain, isi halaman, dan CTA sudah jelas sejak awal. Yang sering memperlambat justru bukan coding, tetapi revisi tanpa brief yang rapi, konten yang belum siap, atau perubahan scope di tengah jalan.\n\nProject company profile ringan biasanya lebih cepat daripada website custom dengan banyak alur, form, katalog, atau integrasi tambahan. Landing page campaign juga bisa relatif cepat kalau penawaran dan copy utamanya sudah matang.\n\nCara paling realistis untuk mempercepat proses adalah menyiapkan bahan dari awal: profil bisnis, layanan utama, foto, contoh referensi, dan tujuan halaman. Semakin jelas inputnya, semakin kecil risiko bolak-balik revisi.",
        category: "Web Development",
        status: "published" as const,
        thumbnail: "/images/article-project-timeline.svg"
      },
      {
        title: "Konten Wajib yang Sebaiknya Disiapkan Sebelum Bikin Website UMKM",
        slug: "konten-wajib-sebelum-bikin-website-umkm",
        excerpt: "Website lebih cepat jadi kalau pemilik bisnis sudah menyiapkan isi inti sebelum masuk tahap desain.",
        content: "Banyak project website tertahan karena desain mulai duluan, tapi isi utamanya belum siap. Padahal pengunjung datang untuk membaca informasi penting: bisnis ini jual apa, untuk siapa, apa keunggulannya, dan bagaimana cara menghubungi.\n\nKonten minimum yang sebaiknya disiapkan adalah ringkasan bisnis, daftar layanan atau produk, area layanan, testimoni atau bukti kerja, FAQ yang paling sering ditanya, dan CTA yang ingin dituju. Bahkan poin-poin sederhana sudah cukup untuk membantu struktur halaman.\n\nKalau konten dasarnya siap lebih awal, proses desain jadi lebih akurat. Tim tidak menebak-nebak isi halaman, dan revisi biasanya jauh lebih sedikit.",
        category: "Tips Bisnis",
        status: "published" as const,
        thumbnail: "/images/article-konten-website.svg"
      },
      {
        title: "Website UMKM untuk Order WhatsApp: Kapan Ini Sudah Cukup?",
        slug: "website-umkm-untuk-order-whatsapp",
        excerpt: "Tidak semua bisnis perlu checkout penuh. Untuk banyak UMKM, alur order lewat WhatsApp masih jadi langkah paling masuk akal.",
        content: "Website dengan tombol order WhatsApp sering dianggap terlalu sederhana, padahal untuk banyak UMKM justru itu yang paling efektif. Pengunjung tetap bisa melihat produk, manfaat, harga, dan testimoni di website, lalu proses closing lanjut lewat chat.\n\nModel ini cocok ketika produk masih sering berubah, butuh konsultasi sebelum order, atau admin ingin tetap mengatur transaksi secara manual. Dibanding memaksa checkout penuh terlalu cepat, alur WhatsApp sering lebih ringan dan lebih cepat jalan.\n\nYang penting, struktur websitenya tetap rapi. Pengunjung harus paham produk apa yang dijual, kisaran harga, cara order, dan berapa lama responnya. Kalau ini jelas, WhatsApp bisa jadi CTA yang sangat kuat.",
        category: "Digital Marketing",
        status: "published" as const,
        thumbnail: "/images/article-whatsapp-order.svg"
      },
      {
        title: "Partner Website Bisnis untuk Area Jawa: Hal yang Perlu Dicek",
        slug: "partner-website-bisnis-area-jawa",
        excerpt: "Kalau bisnis kamu melayani Jogja, Solo, Wonogiri, dan area Jawa lain, pilih partner website yang paham kebutuhan bisnis lokal.",
        content: "Kalau bisnis kamu menjangkau Jogja, Solo, Wonogiri, atau area Jawa lain, partner website yang dipilih sebaiknya tidak cuma menjual visual. Yang lebih penting adalah apakah mereka paham kebutuhan bisnis lokal, bisa menunjukkan contoh hasil kerja, dan punya proses yang jelas dari brief sampai launch.\n\nPerhatikan cara mereka bertanya saat awal diskusi. Tim yang baik biasanya tidak langsung bicara desain saja, tapi juga menanyakan target pelanggan, tujuan website, CTA utama, dan alur komunikasi setelah website online.\n\nKalau targetnya website yang dipakai untuk promosi serius, pilih partner yang bisa membantu struktur halaman, bukan hanya memasang template. Hasil akhir website sangat dipengaruhi kualitas diskusi di awal.",
        category: "Studi Kasus",
        status: "published" as const,
        thumbnail: "/images/article-website-jawa.svg"
      },
      {
        title: "SEO Lokal untuk Website UMKM: Langkah Dasar yang Paling Efektif",
        slug: "seo-lokal-website-umkm",
        excerpt: "SEO lokal membantu website UMKM lebih relevan untuk calon pelanggan di area layanan tertentu.",
        content: "SEO lokal penting kalau bisnis kamu melayani area tertentu seperti kota, kabupaten, atau wilayah layanan spesifik. Google perlu sinyal yang jelas tentang lokasi, jenis layanan, dan siapa target pelanggan di area itu.\n\nLangkah dasarnya adalah menulis halaman layanan yang menyebut konteks lokal secara alami, menampilkan alamat atau area layanan, menyamakan data kontak di website, dan menyiapkan konten yang menjawab kebutuhan pelanggan lokal. Kombinasi ini membantu Google memahami relevansi bisnis.\n\nKalau ada Google Business Profile, website dan profil bisnis sebaiknya saling mendukung. Halaman layanan, kontak, dan CTA lokal harus konsisten supaya sinyal brand dan lokasi lebih kuat.",
        category: "Digital Marketing",
        status: "published" as const,
        thumbnail: "/images/article-seo-lokal.svg"
      },
      {
        title: "Biaya Website UMKM Jogja: Kisaran Budget dan Prioritas Fitur Awal",
        slug: "biaya-website-umkm-jogja",
        excerpt: "Kalau kamu sedang hitung budget website UMKM di Jogja, fokus dulu ke tujuan bisnis dan fitur minimum yang benar-benar dipakai.",
        content: "**Kenapa budget website UMKM bisa beda jauh**\n\nHarga website UMKM di Jogja biasanya tidak beda karena jumlah halaman saja. Perbedaan paling besar justru datang dari kejelasan tujuan bisnis, kualitas copy, kebutuhan desain, dan fitur yang diminta sejak awal.\n\nKalau tujuanmu hanya membuat bisnis terlihat lebih kredibel di Google dan WhatsApp, paket yang dibutuhkan jelas berbeda dibanding website yang harus punya katalog produk, form lead, blog, atau dashboard admin.\n\n**Prioritas fitur yang paling masuk akal untuk tahap awal**\n\n- Hero yang langsung menjelaskan layanan dan area kerja\n- Section layanan atau produk utama\n- CTA WhatsApp atau form inquiry yang jelas\n- Bukti kepercayaan seperti testimoni, portfolio, atau FAQ\n- Metadata, sitemap, canonical, dan struktur dasar SEO yang rapi\n\nUntuk banyak UMKM, kombinasi ini sudah cukup untuk mulai terlihat profesional dan menangkap lead tanpa harus langsung masuk fitur berat.\n\n**Kapan biaya mulai naik**\n\nBiaya biasanya naik saat project butuh desain lebih custom, penulisan konten lebih dalam, integrasi pihak ketiga, banyak halaman layanan, atau alur admin yang tidak standar. Jadi cara paling aman menghitung budget bukan mulai dari tampilan, tapi dari alur bisnis yang memang ingin dibantu website.\n\nKalau targetmu masih tahap validasi, lebih baik mulai dari scope ramping yang bisa launch cepat. Setelah traffic dan kebutuhan kebaca, baru tambahkan fitur berikutnya.",
        category: "SEO Lokal",
        status: "published" as const,
        thumbnail: "/images/article-biaya-website.svg"
      },
      {
        title: "Jasa Pembuatan Website Sleman: Checklist Sebelum Pilih Vendor",
        slug: "jasa-pembuatan-website-sleman",
        excerpt: "Sebelum pilih jasa pembuatan website di Sleman, cek dulu cara vendor memahami brief, struktur halaman, dan target bisnis kamu.",
        content: "**Jangan pilih vendor dari visual saja**\n\nBanyak bisnis di Sleman, Jogja, dan sekitarnya memilih vendor website dari tampilan mockup pertama. Padahal hasil akhir website lebih banyak ditentukan oleh kualitas diskusi awal: siapa target pelanggan, layanan utama apa, dan CTA apa yang paling realistis untuk bisnis itu.\n\nVendor yang baik biasanya tidak langsung bicara warna dan animasi. Mereka akan mulai dari brief, struktur informasi, alur pengunjung, dan bukti apa yang perlu ditampilkan supaya calon pelanggan cepat percaya.\n\n**Checklist yang layak dicek sebelum deal**\n\n- Apakah vendor bertanya soal target pelanggan dan tujuan website\n- Apakah mereka bisa menjelaskan struktur halaman, bukan cuma desain\n- Apakah ada contoh project yang mirip dengan kebutuhanmu\n- Apakah revisi, timeline, dan deliverables dijelaskan sejak awal\n- Apakah mereka paham SEO dasar, mobile layout, dan CTA yang bisa dipakai jualan\n\nChecklist ini sederhana, tapi cukup untuk memisahkan vendor yang hanya pasang template dari partner yang benar-benar membantu bisnis.\n\n**Kalau bisnismu melayani area lokal**\n\nUntuk bisnis jasa di Sleman, website sebaiknya juga menyebut area kerja, jenis layanan, dan contoh kebutuhan lokal secara alami. Ini membantu dua hal sekaligus: pengunjung lebih merasa relevan, dan Google lebih gampang memahami konteks bisnis kamu.\n\nSemakin jelas konteks lokalnya, semakin mudah website dipakai untuk pencarian seperti jasa website Sleman, jasa website Jogja, atau website company profile untuk bisnis jasa lokal.",
        category: "SEO Lokal",
        status: "published" as const,
        thumbnail: "/images/article-website-jawa.svg"
      },
      {
        title: "Landing Page Iklan untuk UMKM Jogja: Kapan Perlu Halaman Khusus?",
        slug: "landing-page-iklan-umkm-jogja",
        excerpt: "Kalau UMKM Jogja mulai jalan iklan Meta Ads atau Google Ads, landing page khusus biasanya lebih efektif daripada mengirim traffic ke homepage.",
        content: "**Kenapa homepage sering kurang cocok untuk traffic iklan**\n\nHomepage biasanya memuat terlalu banyak jalur: profil bisnis, layanan, portfolio, artikel, dan kontak. Untuk traffic iklan, ini sering terlalu lebar. Pengunjung datang dari satu janji iklan, tapi masuk ke halaman yang membahas terlalu banyak hal sekaligus.\n\nLanding page membantu menyempitkan fokus. Satu halaman cukup bicara satu penawaran, satu target pelanggan, dan satu CTA utama.\n\n**Tanda kamu sudah perlu landing page khusus**\n\n- Sudah mulai menjalankan Meta Ads atau Google Ads\n- Punya satu layanan yang ingin didorong lebih agresif\n- Ingin mengukur performa CTA, form, atau klik WhatsApp lebih jelas\n- Merasa homepage terlalu umum untuk campaign tertentu\n\nKalau salah satu dari empat poin ini sudah kejadian, landing page biasanya lebih masuk akal daripada terus memaksa homepage kerja sendirian.\n\n**Struktur minimum yang efektif untuk UMKM Jogja**\n\nLanding page iklan tidak harus panjang. Yang penting ada headline yang nyambung dengan isi iklan, penjelasan masalah pelanggan, manfaat utama, bukti sederhana, FAQ singkat, dan CTA yang jelas.\n\nUntuk bisnis lokal Jogja, kamu juga bisa menyebut konteks area layanan, jenis usaha yang dilayani, dan alur konsultasi singkat. Ini membantu pengunjung merasa halaman tersebut memang dibuat untuk kebutuhan mereka, bukan halaman generik yang dipakai ke semua campaign.",
        category: "SEO Lokal",
        status: "published" as const,
        thumbnail: "/images/article-landing-page-ads.svg"
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
