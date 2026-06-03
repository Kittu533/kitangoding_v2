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
