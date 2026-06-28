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
    title: "Cara Memilih Website yang Cocok untuk Bisnis Kecil",
    slug: "cara-memilih-website-untuk-bisnis-kecil",
    excerpt: "Panduan ringkas memilih struktur website yang paling sesuai untuk kebutuhan bisnis kecil dan UMKM.",
    content:
      "Mulailah dari tujuan utamamu: ingin memperkenalkan bisnis, mengumpulkan lead, atau menampilkan katalog. Setelah itu, susun halaman inti seperti hero, layanan, testimoni, dan CTA yang jelas agar pengunjung lebih cepat paham.",
    category: "Tips Bisnis",
    status: "published",
    thumbnail: "/images/project-7.png",
  },
  {
    title: "Kenapa Landing Page yang Rapi Bikin Orang Lebih Percaya",
    slug: "kenapa-landing-page-yang-rapi-bikin-orang-lebih-percaya",
    excerpt: "Desain yang terstruktur membantu calon pelanggan memahami value bisnis tanpa bingung.",
    content:
      "Landing page yang rapi bukan cuma soal estetik. Ia membantu menyusun alur baca yang jelas, mengurangi distraksi, dan menguatkan CTA sehingga pengunjung lebih yakin untuk lanjut menghubungi bisnis kamu.",
    category: "UI/UX",
    status: "published",
    thumbnail: "/images/project-8.png",
  },
  {
    title: "Checklist Sebelum Launch Website Bisnis",
    slug: "checklist-sebelum-launch-website-bisnis",
    excerpt: "Daftar hal penting yang sebaiknya dipastikan sebelum website bisnis kamu tayang ke publik.",
    content:
      "Cek ulang headline, kontak, CTA, testimonial, mobile responsiveness, dan kecepatan halaman. Elemen-elemen dasar itu sering terlihat sederhana, tapi punya dampak besar pada kesan pertama calon pelanggan.",
    category: "Digital Marketing",
    status: "draft",
    thumbnail: "/images/project-5.webp",
  },
  {
    title: "Jasa Website Company Profile UMKM: Apa Saja yang Perlu Ada?",
    slug: "jasa-website-company-profile-umkm",
    excerpt: "Panduan isi website company profile UMKM agar bisnis terlihat jelas, dipercaya, dan mudah dihubungi calon pelanggan.",
    content:
      "Website company profile untuk UMKM tidak perlu rumit. Yang penting, pengunjung bisa cepat paham siapa bisnisnya, apa layanannya, area kerja atau target pasarnya, dan bagaimana cara menghubungi tim penjualan.\n\nStruktur minimal yang efektif biasanya berisi hero yang spesifik, ringkasan layanan, keunggulan yang bisa dibuktikan, portfolio atau contoh kerja, testimoni, FAQ, dan tombol WhatsApp yang mudah ditemukan. Setiap bagian sebaiknya menjawab pertanyaan calon pelanggan, bukan hanya terlihat ramai.\n\nKalau tujuan utamanya mendapatkan lead, jangan sembunyikan CTA di bagian bawah saja. Ulangi ajakan konsultasi di beberapa titik penting supaya pengunjung yang sudah yakin bisa langsung bertindak.",
    category: "Tips Bisnis",
    status: "published",
    thumbnail: "/images/project-4.webp",
  },
  {
    title: "Jasa Landing Page untuk Iklan: Kenapa Tidak Cukup Pakai Homepage?",
    slug: "jasa-landing-page-untuk-iklan",
    excerpt: "Landing page membantu traffic iklan membaca satu penawaran dengan alur yang lebih fokus dan CTA yang lebih jelas.",
    content:
      "Homepage biasanya berisi banyak informasi: profil, layanan, portfolio, artikel, dan kontak. Untuk traffic iklan, informasi yang terlalu luas bisa membuat pengunjung bingung. Landing page dibuat lebih fokus: satu campaign, satu pesan utama, satu CTA.\n\nLanding page yang baik menyambungkan janji di iklan dengan isi halaman. Jika iklan menawarkan paket website UMKM, halaman harus langsung menjelaskan masalah UMKM, hasil yang didapat, harga atau rentang investasi, proses kerja, bukti, dan cara konsultasi.\n\nDengan alur yang lebih pendek, tim marketing juga lebih mudah mengukur performa. Headline, CTA, testimoni, dan form bisa dievaluasi satu per satu tanpa terganggu navigasi yang terlalu banyak.",
    category: "Digital Marketing",
    status: "published",
    thumbnail: "/images/project-5.webp",
  },
  {
    title: "Biaya Pembuatan Website UMKM: Faktor yang Mempengaruhi Harga",
    slug: "biaya-pembuatan-website-umkm",
    excerpt: "Harga website UMKM dipengaruhi jumlah halaman, kebutuhan desain, fitur, konten, integrasi, dan dukungan setelah launch.",
    content:
      "Biaya pembuatan website UMKM tidak bisa dilihat dari jumlah halaman saja. Website sederhana dengan copywriting rapi, desain responsif, dan CTA jelas sering lebih bernilai daripada website banyak halaman tapi informasinya berantakan.\n\nFaktor yang paling sering mempengaruhi harga adalah jenis website, jumlah section, kebutuhan desain custom, penulisan konten, fitur katalog atau form, integrasi WhatsApp, optimasi dasar SEO, dan dukungan setelah website online. Semakin spesifik kebutuhan bisnis, semakin besar waktu yang diperlukan untuk merancang alurnya.\n\nCara paling aman adalah mulai dari tujuan. Jika targetnya kredibilitas, company profile bisa cukup. Jika targetnya campaign iklan, landing page lebih tepat. Jika ingin menjual produk langsung, toko online atau katalog WhatsApp bisa jadi pilihan.",
    category: "Tips Bisnis",
    status: "published",
    thumbnail: "/images/project-6.webp",
  },
  {
    title: "Jasa Toko Online untuk UMKM: Mulai dari Katalog atau Checkout?",
    slug: "jasa-toko-online-untuk-umkm",
    excerpt: "Tidak semua UMKM perlu checkout penuh sejak awal. Kadang katalog produk dengan alur WhatsApp lebih cepat menghasilkan order.",
    content:
      "Toko online untuk UMKM sebaiknya mengikuti cara bisnis melayani pelanggan. Jika produk perlu konsultasi, variasi stok sering berubah, atau order masih banyak lewat chat, katalog produk dengan tombol WhatsApp bisa lebih praktis daripada checkout penuh.\n\nCheckout lengkap cocok ketika harga, stok, ongkir, dan pembayaran sudah siap dibuat otomatis. Tapi kalau operasional belum stabil, fitur yang terlalu banyak justru menambah pekerjaan admin. Mulai dari katalog yang rapi sering lebih aman: foto produk, deskripsi, kategori, harga, dan CTA order.\n\nSetelah order mulai konsisten, fitur bisa ditambah bertahap. Misalnya filter produk, halaman detail, form order, integrasi pembayaran, atau dashboard sederhana untuk mengelola katalog.",
    category: "Web Development",
    status: "published",
    thumbnail: "/images/project-7.png",
  },
  {
    title: "Agar Website Bisnis Mudah Ditemukan Google, Mulai dari Hal Ini",
    slug: "website-bisnis-agar-mudah-ditemukan-google",
    excerpt: "SEO teknis penting, tapi Google juga butuh halaman yang jelas membahas layanan, lokasi, masalah pelanggan, dan bukti bisnis.",
    content:
      "Agar website bisnis mudah ditemukan Google, fondasi teknis seperti title, description, sitemap, robots, canonical, dan structured data memang perlu benar. Tapi setelah itu, yang menentukan adalah kualitas halaman dan relevansi konten.\n\nSetiap layanan penting sebaiknya punya halaman atau section yang menjelaskan masalah pelanggan, solusi yang ditawarkan, proses kerja, estimasi hasil, FAQ, dan cara menghubungi. Google lebih mudah memahami bisnis jika topiknya konsisten dan tidak terlalu umum.\n\nUntuk UMKM, konten lokal juga bisa membantu. Sebutkan area layanan, jenis bisnis yang dilayani, contoh kebutuhan, dan studi kasus sederhana. Artikel blog dapat dipakai untuk menjawab pertanyaan yang sering ditanyakan calon pelanggan sebelum membeli.",
    category: "Digital Marketing",
    status: "published",
    thumbnail: "/images/project-8.png",
  },
  {
    title: "Cara Membuat Website Bisnis Lebih Meyakinkan untuk Calon Pelanggan",
    slug: "cara-membuat-website-bisnis-lebih-meyakinkan",
    excerpt: "Kepercayaan muncul dari pesan yang jelas, bukti kerja, tampilan rapi, kecepatan halaman, dan jalur kontak yang tidak membingungkan.",
    content:
      "Website bisnis yang meyakinkan tidak harus penuh animasi. Pengunjung biasanya mencari jawaban sederhana: bisnis ini bisa membantu saya atau tidak, sudah pernah mengerjakan hal serupa atau belum, dan mudah dihubungi atau tidak.\n\nMulai dari headline yang langsung menyebut layanan dan target pelanggan. Setelah itu tampilkan manfaat, contoh hasil kerja, testimoni, proses kerja, dan FAQ. Hindari kalimat yang terlalu umum seperti solusi terbaik tanpa bukti pendukung.\n\nDetail kecil juga berpengaruh: nomor kontak aktif, tombol WhatsApp yang jelas, halaman cepat dibuka, gambar tidak pecah, dan tampilan mobile rapi. Semakin sedikit keraguan yang muncul, semakin besar peluang pengunjung menghubungi.",
    category: "Strategi Branding",
    status: "published",
    thumbnail: "/images/project-1.png",
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
