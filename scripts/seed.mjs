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
