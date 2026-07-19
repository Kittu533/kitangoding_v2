import { randomUUID } from "node:crypto";
import dotenv from "dotenv";
import postgres from "postgres";

dotenv.config({ path: ".env.local", override: true, quiet: true });
dotenv.config({ path: ".env", override: false, quiet: true });

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL atau DIRECT_URL wajib diatur sebelum menjalankan seed kategori blog.");
}

const categories = [
  ["Tips Bisnis", "tips-bisnis"],
  ["Digital Marketing", "digital-marketing"],
  ["Web Development", "web-development"],
  ["Studi Kasus", "studi-kasus"],
  ["UI/UX", "ui-ux"],
  ["Strategi Branding", "strategi-branding"],
];

const sql = postgres(connectionString, { max: 1, prepare: false });

try {
  await sql`
    create table if not exists blog_categories (
      id text primary key,
      name varchar(120) not null unique,
      slug varchar(160) not null unique,
      created_at timestamp not null default now()
    )
  `;

  for (const [name, slug] of categories) {
    await sql`
      insert into blog_categories (id, name, slug)
      values (${randomUUID()}, ${name}, ${slug})
      on conflict (slug) do nothing
    `;
  }

  console.log(`Blog categories ready: ${categories.length} kategori diperiksa.`);
} finally {
  await sql.end();
}
