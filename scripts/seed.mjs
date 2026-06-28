import { randomUUID } from "node:crypto";
import dotenv from "dotenv";
import postgres from "postgres";
import { hashPassword } from "better-auth/crypto";

dotenv.config({ path: ".env.local", override: true });
dotenv.config({ path: ".env", override: false });

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL or DIRECT_URL is required before running the seeder.");
  process.exit(1);
}

const adminEmail = process.env.ADMIN_EMAIL || "admin@kitangoding.local";
const adminPassword = process.env.ADMIN_PASSWORD || "Admin12345!";
const adminName = process.env.ADMIN_NAME || "KitaNgoding Admin";

const sql = postgres(connectionString, {
  prepare: false,
  max: 1,
});

const portfolioSeeds = [
  {
    name: "Website Company Profile Kedai Kopi",
    category: "Company Profile",
    thumbnail: "/images/project-4.webp",
    result: "Landing page bisnis lokal dengan CTA WhatsApp dan tampilan menu yang lebih rapi.",
  },
  {
    name: "Landing Page Kelas Online",
    category: "Landing Page",
    thumbnail: "/images/project-5.webp",
    result: "Halaman campaign untuk program mentoring dengan section benefit, testimonial, dan checkout CTA.",
  },
  {
    name: "Katalog Produk Brand Lokal",
    category: "Catalog",
    thumbnail: "/images/project-6.webp",
    result: "Katalog produk ringan yang memudahkan pengunjung melihat produk dan order lebih cepat.",
  },
];

const blogSeeds = [
  {
    title: "Cara Memilih Template Website yang Cocok untuk UMKM",
    slug: "cara-memilih-template-website-yang-cocok-untuk-umkm",
    excerpt: "Panduan sederhana untuk memilih tampilan yang sesuai dengan jenis bisnis, tujuan, dan calon pelanggan kamu.",
    content:
      "Mulailah dari tujuan utama websitemu. Kalau fokusnya mengenalkan bisnis, kamu butuh struktur company profile yang rapi. Kalau fokusnya promosi, landing page dengan CTA yang jelas biasanya lebih efektif.\n\nSetelah itu, cek apakah template punya ruang yang cukup untuk menjelaskan layanan, hasil kerja, dan cara menghubungi kamu. Template yang bagus bukan cuma terlihat menarik, tapi juga membantu calon pelanggan cepat paham.\n\nPastikan juga tampilannya nyaman di mobile. Mayoritas pengunjung pertama datang dari handphone, jadi layout, ukuran teks, dan tombol WhatsApp perlu tetap enak dipakai di layar kecil.",
    category: "Tips Bisnis",
    status: "published",
    thumbnail: "/images/article-template-umkm.svg",
  },
  {
    title: "Kenapa Website Custom Bisa Jadi Investasi yang Masuk Akal",
    slug: "kenapa-website-custom-bisa-jadi-investasi-yang-masuk-akal",
    excerpt: "Kapan bisnis cukup pakai template, dan kapan perlu tampilan custom yang dibuat lebih spesifik.",
    content:
      "Template siap pakai cocok untuk bisnis yang ingin segera launch dengan struktur yang sudah jelas. Tapi saat kebutuhan mulai lebih spesifik, website custom sering jadi pilihan yang lebih masuk akal.\n\nCustom berarti isi, alur, dan tampilan bisa lebih dekat dengan cara bisnismu bekerja. Ini penting kalau kamu punya layanan yang perlu dijelaskan bertahap, katalog yang butuh filter tertentu, atau CTA yang harus disusun lebih strategis.\n\nInvestasi custom biasanya lebih terasa nilainya ketika website dipakai sebagai alat jualan, bukan sekadar pelengkap identitas bisnis.",
    category: "Studi Kasus",
    status: "published",
    thumbnail: "/images/article-custom-website.svg",
  },
  {
    title: "Strategi Sederhana agar Website Lebih Banyak Menghasilkan Lead",
    slug: "strategi-sederhana-agar-website-lebih-banyak-menghasilkan-lead",
    excerpt: "Mulai dari pesan utama, struktur halaman, sampai tombol WhatsApp yang lebih jelas untuk calon pelanggan.",
    content:
      "Kalau pengunjung datang tapi tidak menghubungi, biasanya ada yang kurang jelas di halaman utama. Bisa jadi headline terlalu umum, manfaat belum terasa, atau CTA kurang terlihat.\n\nCoba mulai dari tiga hal: headline yang spesifik, section layanan yang ringkas, dan tombol aksi yang konsisten. Jangan biarkan pengunjung menebak apa langkah berikutnya.\n\nTambahkan juga bukti pendukung seperti portfolio, testimoni, atau studi kasus singkat. Elemen-elemen ini membantu rasa percaya muncul lebih cepat sebelum orang memutuskan chat.",
    category: "Digital Marketing",
    status: "published",
    thumbnail: "/images/article-lead-strategy.svg",
  },
  {
    title: "Jasa Website Company Profile UMKM: Apa Saja yang Perlu Ada?",
    slug: "jasa-website-company-profile-umkm",
    excerpt: "Panduan isi website company profile UMKM agar bisnis terlihat jelas, dipercaya, dan mudah dihubungi calon pelanggan.",
    content:
      "Website company profile untuk UMKM tidak perlu rumit. Yang penting, pengunjung bisa cepat paham siapa bisnisnya, apa layanannya, area kerja atau target pasarnya, dan bagaimana cara menghubungi tim penjualan.\n\nStruktur minimal yang efektif biasanya berisi hero yang spesifik, ringkasan layanan, keunggulan yang bisa dibuktikan, portfolio atau contoh kerja, testimoni, FAQ, dan tombol WhatsApp yang mudah ditemukan. Setiap bagian sebaiknya menjawab pertanyaan calon pelanggan, bukan hanya terlihat ramai.\n\nKalau tujuan utamanya mendapatkan lead, jangan sembunyikan CTA di bagian bawah saja. Ulangi ajakan konsultasi di beberapa titik penting supaya pengunjung yang sudah yakin bisa langsung bertindak.",
    category: "Tips Bisnis",
    status: "published",
    thumbnail: "/images/article-company-profile.svg",
  },
  {
    title: "Jasa Landing Page untuk Iklan: Kenapa Tidak Cukup Pakai Homepage?",
    slug: "jasa-landing-page-untuk-iklan",
    excerpt: "Landing page membantu traffic iklan membaca satu penawaran dengan alur yang lebih fokus dan CTA yang lebih jelas.",
    content:
      "Homepage biasanya berisi banyak informasi: profil, layanan, portfolio, artikel, dan kontak. Untuk traffic iklan, informasi yang terlalu luas bisa membuat pengunjung bingung. Landing page dibuat lebih fokus: satu campaign, satu pesan utama, satu CTA.\n\nLanding page yang baik menyambungkan janji di iklan dengan isi halaman. Jika iklan menawarkan paket website UMKM, halaman harus langsung menjelaskan masalah UMKM, hasil yang didapat, harga atau rentang investasi, proses kerja, bukti, dan cara konsultasi.\n\nDengan alur yang lebih pendek, tim marketing juga lebih mudah mengukur performa. Headline, CTA, testimoni, dan form bisa dievaluasi satu per satu tanpa terganggu navigasi yang terlalu banyak.",
    category: "Digital Marketing",
    status: "published",
    thumbnail: "/images/article-landing-page-ads.svg",
  },
  {
    title: "Biaya Pembuatan Website UMKM: Faktor yang Mempengaruhi Harga",
    slug: "biaya-pembuatan-website-umkm",
    excerpt: "Harga website UMKM dipengaruhi jumlah halaman, kebutuhan desain, fitur, konten, integrasi, dan dukungan setelah launch.",
    content:
      "Biaya pembuatan website UMKM tidak bisa dilihat dari jumlah halaman saja. Website sederhana dengan copywriting rapi, desain responsif, dan CTA jelas sering lebih bernilai daripada website banyak halaman tapi informasinya berantakan.\n\nFaktor yang paling sering mempengaruhi harga adalah jenis website, jumlah section, kebutuhan desain custom, penulisan konten, fitur katalog atau form, integrasi WhatsApp, optimasi dasar SEO, dan dukungan setelah website online. Semakin spesifik kebutuhan bisnis, semakin besar waktu yang diperlukan untuk merancang alurnya.\n\nCara paling aman adalah mulai dari tujuan. Jika targetnya kredibilitas, company profile bisa cukup. Jika targetnya campaign iklan, landing page lebih tepat. Jika ingin menjual produk langsung, toko online atau katalog WhatsApp bisa jadi pilihan.",
    category: "Tips Bisnis",
    status: "published",
    thumbnail: "/images/article-biaya-website.svg",
  },
  {
    title: "Jasa Toko Online untuk UMKM: Mulai dari Katalog atau Checkout?",
    slug: "jasa-toko-online-untuk-umkm",
    excerpt: "Tidak semua UMKM perlu checkout penuh sejak awal. Kadang katalog produk dengan alur WhatsApp lebih cepat menghasilkan order.",
    content:
      "Toko online untuk UMKM sebaiknya mengikuti cara bisnis melayani pelanggan. Jika produk perlu konsultasi, variasi stok sering berubah, atau order masih banyak lewat chat, katalog produk dengan tombol WhatsApp bisa lebih praktis daripada checkout penuh.\n\nCheckout lengkap cocok ketika harga, stok, ongkir, dan pembayaran sudah siap dibuat otomatis. Tapi kalau operasional belum stabil, fitur yang terlalu banyak justru menambah pekerjaan admin. Mulai dari katalog yang rapi sering lebih aman: foto produk, deskripsi, kategori, harga, dan CTA order.\n\nSetelah order mulai konsisten, fitur bisa ditambah bertahap. Misalnya filter produk, halaman detail, form order, integrasi pembayaran, atau dashboard sederhana untuk mengelola katalog.",
    category: "Web Development",
    status: "published",
    thumbnail: "/images/article-toko-online-umkm.svg",
  },
  {
    title: "Agar Website Bisnis Mudah Ditemukan Google, Mulai dari Hal Ini",
    slug: "website-bisnis-agar-mudah-ditemukan-google",
    excerpt: "SEO teknis penting, tapi Google juga butuh halaman yang jelas membahas layanan, lokasi, masalah pelanggan, dan bukti bisnis.",
    content:
      "Agar website bisnis mudah ditemukan Google, fondasi teknis seperti title, description, sitemap, robots, canonical, dan structured data memang perlu benar. Tapi setelah itu, yang menentukan adalah kualitas halaman dan relevansi konten.\n\nSetiap layanan penting sebaiknya punya halaman atau section yang menjelaskan masalah pelanggan, solusi yang ditawarkan, proses kerja, estimasi hasil, FAQ, dan cara menghubungi. Google lebih mudah memahami bisnis jika topiknya konsisten dan tidak terlalu umum.\n\nUntuk UMKM, konten lokal juga bisa membantu. Sebutkan area layanan, jenis bisnis yang dilayani, contoh kebutuhan, dan studi kasus sederhana. Artikel blog dapat dipakai untuk menjawab pertanyaan yang sering ditanyakan calon pelanggan sebelum membeli.",
    category: "Digital Marketing",
    status: "published",
    thumbnail: "/images/article-google-discovery.svg",
  },
  {
    title: "Cara Membuat Website Bisnis Lebih Meyakinkan untuk Calon Pelanggan",
    slug: "cara-membuat-website-bisnis-lebih-meyakinkan",
    excerpt: "Kepercayaan muncul dari pesan yang jelas, bukti kerja, tampilan rapi, kecepatan halaman, dan jalur kontak yang tidak membingungkan.",
    content:
      "Website bisnis yang meyakinkan tidak harus penuh animasi. Pengunjung biasanya mencari jawaban sederhana: bisnis ini bisa membantu saya atau tidak, sudah pernah mengerjakan hal serupa atau belum, dan mudah dihubungi atau tidak.\n\nMulai dari headline yang langsung menyebut layanan dan target pelanggan. Setelah itu tampilkan manfaat, contoh hasil kerja, testimoni, proses kerja, dan FAQ. Hindari kalimat yang terlalu umum seperti solusi terbaik tanpa bukti pendukung.\n\nDetail kecil juga berpengaruh: nomor kontak aktif, tombol WhatsApp yang jelas, halaman cepat dibuka, gambar tidak pecah, dan tampilan mobile rapi. Semakin sedikit keraguan yang muncul, semakin besar peluang pengunjung menghubungi.",
    category: "Strategi Branding",
    status: "published",
    thumbnail: "/images/article-website-trust.svg",
  },
  {
    title: "Perbedaan Website Company Profile dan Landing Page untuk Bisnis",
    slug: "perbedaan-website-company-profile-dan-landing-page",
    excerpt: "Dua jenis halaman ini sering dianggap sama, padahal tujuan, struktur, dan cara pakainya berbeda.",
    content:
      "Website company profile dipakai untuk menjelaskan bisnis secara menyeluruh. Biasanya ada profil, layanan, portfolio, testimoni, FAQ, dan kontak. Tujuannya membangun kepercayaan dan memberi gambaran lengkap tentang siapa kamu.\n\nLanding page jauh lebih fokus. Biasanya satu halaman untuk satu penawaran, satu campaign, atau satu CTA utama. Struktur isinya lebih singkat dan diarahkan agar pengunjung cepat mengambil tindakan seperti chat, isi form, atau order.\n\nKalau bisnis kamu butuh aset jangka panjang untuk kredibilitas, company profile sering jadi fondasi. Kalau fokusnya promosi tertentu atau traffic iklan, landing page biasanya lebih efektif.",
    category: "Tips Bisnis",
    status: "published",
    thumbnail: "/images/article-company-vs-landing.svg",
  },
  {
    title: "Berapa Lama Pembuatan Website Bisnis Biasanya Selesai?",
    slug: "berapa-lama-pembuatan-website-bisnis",
    excerpt: "Durasi pembuatan website dipengaruhi kejelasan brief, jumlah revisi, isi konten, dan fitur yang diminta.",
    content:
      "Website bisnis yang sederhana bisa selesai lebih cepat kalau arah desain, isi halaman, dan CTA sudah jelas sejak awal. Yang sering memperlambat justru bukan coding, tetapi revisi tanpa brief yang rapi, konten yang belum siap, atau perubahan scope di tengah jalan.\n\nProject company profile ringan biasanya lebih cepat daripada website custom dengan banyak alur, form, katalog, atau integrasi tambahan. Landing page campaign juga bisa relatif cepat kalau penawaran dan copy utamanya sudah matang.\n\nCara paling realistis untuk mempercepat proses adalah menyiapkan bahan dari awal: profil bisnis, layanan utama, foto, contoh referensi, dan tujuan halaman. Semakin jelas inputnya, semakin kecil risiko bolak-balik revisi.",
    category: "Web Development",
    status: "published",
    thumbnail: "/images/article-project-timeline.svg",
  },
  {
    title: "Konten Wajib yang Sebaiknya Disiapkan Sebelum Bikin Website UMKM",
    slug: "konten-wajib-sebelum-bikin-website-umkm",
    excerpt: "Website lebih cepat jadi kalau pemilik bisnis sudah menyiapkan isi inti sebelum masuk tahap desain.",
    content:
      "Banyak project website tertahan karena desain mulai duluan, tapi isi utamanya belum siap. Padahal pengunjung datang untuk membaca informasi penting: bisnis ini jual apa, untuk siapa, apa keunggulannya, dan bagaimana cara menghubungi.\n\nKonten minimum yang sebaiknya disiapkan adalah ringkasan bisnis, daftar layanan atau produk, area layanan, testimoni atau bukti kerja, FAQ yang paling sering ditanya, dan CTA yang ingin dituju. Bahkan poin-poin sederhana sudah cukup untuk membantu struktur halaman.\n\nKalau konten dasarnya siap lebih awal, proses desain jadi lebih akurat. Tim tidak menebak-nebak isi halaman, dan revisi biasanya jauh lebih sedikit.",
    category: "Tips Bisnis",
    status: "published",
    thumbnail: "/images/article-konten-website.svg",
  },
  {
    title: "Website UMKM untuk Order WhatsApp: Kapan Ini Sudah Cukup?",
    slug: "website-umkm-untuk-order-whatsapp",
    excerpt: "Tidak semua bisnis perlu checkout penuh. Untuk banyak UMKM, alur order lewat WhatsApp masih jadi langkah paling masuk akal.",
    content:
      "Website dengan tombol order WhatsApp sering dianggap terlalu sederhana, padahal untuk banyak UMKM justru itu yang paling efektif. Pengunjung tetap bisa melihat produk, manfaat, harga, dan testimoni di website, lalu proses closing lanjut lewat chat.\n\nModel ini cocok ketika produk masih sering berubah, butuh konsultasi sebelum order, atau admin ingin tetap mengatur transaksi secara manual. Dibanding memaksa checkout penuh terlalu cepat, alur WhatsApp sering lebih ringan dan lebih cepat jalan.\n\nYang penting, struktur websitenya tetap rapi. Pengunjung harus paham produk apa yang dijual, kisaran harga, cara order, dan berapa lama responnya. Kalau ini jelas, WhatsApp bisa jadi CTA yang sangat kuat.",
    category: "Digital Marketing",
    status: "published",
    thumbnail: "/images/article-whatsapp-order.svg",
  },
  {
    title: "Partner Website Bisnis untuk Area Jawa: Hal yang Perlu Dicek",
    slug: "partner-website-bisnis-area-jawa",
    excerpt: "Kalau bisnis kamu melayani Jogja, Solo, Wonogiri, dan area Jawa lain, pilih partner website yang paham kebutuhan bisnis lokal.",
    content:
      "Kalau bisnis kamu menjangkau Jogja, Solo, Wonogiri, atau area Jawa lain, partner website yang dipilih sebaiknya tidak cuma menjual visual. Yang lebih penting adalah apakah mereka paham kebutuhan bisnis lokal, bisa menunjukkan contoh hasil kerja, dan punya proses yang jelas dari brief sampai launch.\n\nPerhatikan cara mereka bertanya saat awal diskusi. Tim yang baik biasanya tidak langsung bicara desain saja, tapi juga menanyakan target pelanggan, tujuan website, CTA utama, dan alur komunikasi setelah website online.\n\nKalau targetnya website yang dipakai untuk promosi serius, pilih partner yang bisa membantu struktur halaman, bukan hanya memasang template. Hasil akhir website sangat dipengaruhi kualitas diskusi di awal.",
    category: "Studi Kasus",
    status: "published",
    thumbnail: "/images/article-website-jawa.svg",
  },
  {
    title: "SEO Lokal untuk Website UMKM: Langkah Dasar yang Paling Efektif",
    slug: "seo-lokal-website-umkm",
    excerpt: "SEO lokal membantu website UMKM lebih relevan untuk calon pelanggan di area layanan tertentu.",
    content:
      "SEO lokal penting kalau bisnis kamu melayani area tertentu seperti kota, kabupaten, atau wilayah layanan spesifik. Google perlu sinyal yang jelas tentang lokasi, jenis layanan, dan siapa target pelanggan di area itu.\n\nLangkah dasarnya adalah menulis halaman layanan yang menyebut konteks lokal secara alami, menampilkan alamat atau area layanan, menyamakan data kontak di website, dan menyiapkan konten yang menjawab kebutuhan pelanggan lokal. Kombinasi ini membantu Google memahami relevansi bisnis.\n\nKalau ada Google Business Profile, website dan profil bisnis sebaiknya saling mendukung. Halaman layanan, kontak, dan CTA lokal harus konsisten supaya sinyal brand dan lokasi lebih kuat.",
    category: "Digital Marketing",
    status: "published",
    thumbnail: "/images/article-seo-lokal.svg",
  },
];

const blogCategorySeeds = ["Tips Bisnis", "Digital Marketing", "Web Development", "Studi Kasus", "UI/UX", "Strategi Branding"];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function createTables() {
  await sql`
    create table if not exists leads (
      id text primary key,
      name varchar(255) not null,
      email varchar(255) not null,
      phone varchar(50),
      service varchar(255),
      budget varchar(255),
      message text,
      status varchar(50) not null default 'Unread',
      created_at timestamp not null default now()
    )
  `;

  await sql`
    create table if not exists portfolios (
      id text primary key,
      name varchar(255) not null,
      category varchar(255) not null,
      thumbnail text,
      result text,
      created_at timestamp not null default now()
    )
  `;

  await sql`
    alter table portfolios
    add column if not exists category varchar(255)
  `;

  await sql`
    do $$
    begin
      if exists (
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'portfolios'
          and column_name = 'category_id'
      ) and exists (
        select 1
        from information_schema.tables
        where table_schema = 'public'
          and table_name = 'portfolio_categories'
      ) then
        update portfolios p
        set category = coalesce(pc.name, p.category, 'Uncategorized')
        from portfolio_categories pc
        where p.category is null
          and p.category_id = pc.id;
      end if;
    end
    $$;
  `;

  await sql`
    update portfolios
    set category = 'Uncategorized'
    where category is null
  `;

  await sql`
    create table if not exists blog_posts (
      id text primary key,
      title varchar(255) not null,
      slug varchar(255) not null unique,
      excerpt text,
      content text,
      category varchar(120) not null,
      status varchar(50) not null default 'draft',
      thumbnail text,
      published_at timestamp,
      created_at timestamp not null default now(),
      updated_at timestamp not null default now()
    )
  `;

  await sql`
    create table if not exists blog_categories (
      id text primary key,
      name varchar(120) not null unique,
      slug varchar(160) not null unique,
      created_at timestamp not null default now()
    )
  `;

  await sql`
    create table if not exists website_analytics_events (
      id text primary key,
      event_type varchar(50) not null,
      path varchar(255) not null,
      source varchar(255),
      href text,
      visitor_id text not null,
      session_id text,
      referrer text,
      user_agent text,
      ip_address text,
      created_at timestamp not null default now()
    )
  `;

  await sql`
    create table if not exists users (
      id text primary key,
      name text not null,
      email text not null unique,
      "emailVerified" boolean not null,
      image text,
      "createdAt" timestamp not null,
      "updatedAt" timestamp not null
    )
  `;

  await sql`
    create table if not exists sessions (
      id text primary key,
      "expiresAt" timestamp not null,
      token text not null unique,
      "createdAt" timestamp not null,
      "updatedAt" timestamp not null,
      "ipAddress" text,
      "userAgent" text,
      "userId" text not null references users(id) on delete cascade
    )
  `;

  await sql`
    create table if not exists accounts (
      id text primary key,
      "accountId" text not null,
      "providerId" text not null,
      "userId" text not null references users(id) on delete cascade,
      "accessToken" text,
      "refreshToken" text,
      "idToken" text,
      "accessTokenExpiresAt" timestamp,
      "refreshTokenExpiresAt" timestamp,
      scope text,
      password text,
      "createdAt" timestamp not null,
      "updatedAt" timestamp not null
    )
  `;

  await sql`
    create table if not exists verifications (
      id text primary key,
      identifier text not null,
      value text not null,
      "expiresAt" timestamp not null,
      "createdAt" timestamp,
      "updatedAt" timestamp
    )
  `;
}

async function seedAdmin() {
  const now = new Date();
  const passwordHash = await hashPassword(adminPassword);
  const existingUser = await sql`
    select id from users where email = ${adminEmail} limit 1
  `;

  const userId = existingUser[0]?.id || randomUUID();

  if (!existingUser.length) {
    await sql`
      insert into users (id, name, email, "emailVerified", image, "createdAt", "updatedAt")
      values (${userId}, ${adminName}, ${adminEmail}, ${true}, ${null}, ${now}, ${now})
    `;
  } else {
    await sql`
      update users
      set name = ${adminName},
          "updatedAt" = ${now}
      where id = ${userId}
    `;
  }

  const existingCredential = await sql`
    select id from accounts
    where "userId" = ${userId} and "providerId" = 'credential'
    limit 1
  `;

  if (!existingCredential.length) {
    await sql`
      insert into accounts (
        id,
        "accountId",
        "providerId",
        "userId",
        password,
        "createdAt",
        "updatedAt"
      )
      values (
        ${randomUUID()},
        ${userId},
        'credential',
        ${userId},
        ${passwordHash},
        ${now},
        ${now}
      )
    `;
  } else {
    await sql`
      update accounts
      set password = ${passwordHash},
          "updatedAt" = ${now}
      where id = ${existingCredential[0].id}
    `;
  }
}

async function seedPortfolio() {
  for (const item of portfolioSeeds) {
    const exists = await sql`
      select id from portfolios where name = ${item.name} limit 1
    `;

    if (!exists.length) {
      await sql`
        insert into portfolios (id, name, category, thumbnail, result, created_at)
        values (
          ${randomUUID()},
          ${item.name},
          ${item.category},
          ${item.thumbnail},
          ${item.result},
          ${new Date()}
        )
      `;
    }
  }
}

async function seedBlog() {
  for (const category of blogCategorySeeds) {
    const exists = await sql`
      select id from blog_categories where slug = ${slugify(category)} limit 1
    `;

    if (!exists.length) {
      await sql`
        insert into blog_categories (id, name, slug, created_at)
        values (${randomUUID()}, ${category}, ${slugify(category)}, ${new Date()})
      `;
    }
  }

  for (const post of blogSeeds) {
    const exists = await sql`
      select id from blog_posts where slug = ${post.slug} limit 1
    `;

    const publishedAt = post.status === "published" ? new Date() : null;

    if (!exists.length) {
      await sql`
        insert into blog_posts (
          id,
          title,
          slug,
          excerpt,
          content,
          category,
          status,
          thumbnail,
          published_at,
          created_at,
          updated_at
        )
        values (
          ${randomUUID()},
          ${post.title},
          ${post.slug},
          ${post.excerpt},
          ${post.content},
          ${post.category},
          ${post.status},
          ${post.thumbnail},
          ${publishedAt},
          ${new Date()},
          ${new Date()}
        )
      `;
    }
  }
}

try {
  await createTables();
  await seedAdmin();
  await seedPortfolio();
  await seedBlog();

  console.log("Database bootstrap complete.");
  console.log(`Admin email: ${adminEmail}`);
  console.log(`Admin password: ${adminPassword}`);
} catch (error) {
  console.error("Failed to seed database.");
  console.error(error);
  process.exitCode = 1;
} finally {
  await sql.end();
}
