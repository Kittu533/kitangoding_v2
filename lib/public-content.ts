import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  blogCategories as blogCategoriesTable,
  blogPosts as blogPostsTable,
  portfolioCategories,
  portfolios,
  pricings,
} from "@/lib/db/schema";
import {
  blogPagePosts,
  categories as marketplaceCategories,
  marketplacePricing,
  shopCreatives,
} from "@/lib/marketplace-data";
import { pricingPlans } from "@/lib/landing-data";

const fallbackImages = [
  "/images/project-1.png",
  "/images/project-2.png",
  "/images/project-3.png",
  "/images/project-4.webp",
  "/images/project-5.webp",
  "/images/project-6.webp",
  "/images/project-7.png",
  "/images/project-8.png",
] as const;

export type PublicCategoryCard = {
  title: string;
  description: string;
  countLabel?: string;
};

export type PublicCreativeCard = {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
};

export type PublicPricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured: boolean;
};

export type PublicBlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
};

export type PublicBlogCategory = {
  label: string;
  active?: boolean;
};

export type PublicBlogDetail = PublicBlogCard & {
  content: string;
};

function isMissingTableError(error: unknown) {
  if (typeof error !== "object" || !error || !("cause" in error)) {
    return false;
  }

  const cause = (error as { cause?: unknown }).cause;
  return typeof cause === "object" && cause !== null && "code" in cause && (cause as { code?: string }).code === "42P01";
}

function formatDate(date: Date | null) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getFallbackImage(index: number) {
  return fallbackImages[index % fallbackImages.length];
}

const fallbackBlogDetails: PublicBlogDetail[] = [
  {
    slug: "cara-memilih-template-website-yang-cocok-untuk-umkm",
    title: "Cara Memilih Template Website yang Cocok untuk UMKM",
    excerpt: "Panduan sederhana untuk memilih tampilan yang sesuai dengan jenis bisnis, tujuan, dan calon pelanggan kamu.",
    image: "/images/project-7.png",
    category: "Tips Bisnis",
    date: "June 2, 2026",
    content:
      "Mulailah dari tujuan utama websitemu. Kalau fokusnya mengenalkan bisnis, kamu butuh struktur company profile yang rapi. Kalau fokusnya promosi, landing page dengan CTA yang jelas biasanya lebih efektif.\n\nSetelah itu, cek apakah template punya ruang yang cukup untuk menjelaskan layanan, hasil kerja, dan cara menghubungi kamu. Template yang bagus bukan cuma terlihat menarik, tapi juga membantu calon pelanggan cepat paham.\n\nPastikan juga tampilannya nyaman di mobile. Mayoritas pengunjung pertama datang dari handphone, jadi layout, ukuran teks, dan tombol WhatsApp perlu tetap enak dipakai di layar kecil.",
  },
  {
    slug: "kenapa-website-custom-bisa-jadi-investasi-yang-masuk-akal",
    title: "Kenapa Website Custom Bisa Jadi Investasi yang Masuk Akal",
    excerpt: "Kapan bisnis cukup pakai template, dan kapan perlu tampilan custom yang dibuat lebih spesifik.",
    image: "/images/project-8.png",
    category: "Studi Kasus",
    date: "May 28, 2026",
    content:
      "Template siap pakai cocok untuk bisnis yang ingin segera launch dengan struktur yang sudah jelas. Tapi saat kebutuhan mulai lebih spesifik, website custom sering jadi pilihan yang lebih masuk akal.\n\nCustom berarti isi, alur, dan tampilan bisa lebih dekat dengan cara bisnismu bekerja. Ini penting kalau kamu punya layanan yang perlu dijelaskan bertahap, katalog yang butuh filter tertentu, atau CTA yang harus disusun lebih strategis.\n\nInvestasi custom biasanya lebih terasa nilainya ketika website dipakai sebagai alat jualan, bukan sekadar pelengkap identitas bisnis.",
  },
  {
    slug: "strategi-sederhana-agar-website-lebih-banyak-menghasilkan-lead",
    title: "Strategi Sederhana agar Website Lebih Banyak Menghasilkan Lead",
    excerpt: "Mulai dari pesan utama, struktur halaman, sampai tombol WhatsApp yang lebih jelas untuk calon pelanggan.",
    image: "/images/project-5.webp",
    category: "Digital Marketing",
    date: "May 24, 2026",
    content:
      "Kalau pengunjung datang tapi tidak menghubungi, biasanya ada yang kurang jelas di halaman utama. Bisa jadi headline terlalu umum, manfaat belum terasa, atau CTA kurang terlihat.\n\nCoba mulai dari tiga hal: headline yang spesifik, section layanan yang ringkas, dan tombol aksi yang konsisten. Jangan biarkan pengunjung menebak apa langkah berikutnya.\n\nTambahkan juga bukti pendukung seperti portfolio, testimoni, atau studi kasus singkat. Elemen-elemen ini membantu rasa percaya muncul lebih cepat sebelum orang memutuskan chat.",
  },
];

function getPriceOrderValue(price: string) {
  const normalized = price.toLowerCase().replace(/\s+/g, "");
  const numericPart = normalized.match(/(\d+(?:[.,]\d+)?)/)?.[1];

  if (!numericPart) {
    return Number.POSITIVE_INFINITY;
  }

  const amount = Number.parseFloat(numericPart.replace(",", "."));

  if (Number.isNaN(amount)) {
    return Number.POSITIVE_INFINITY;
  }

  if (normalized.includes("jt")) {
    return amount * 1_000_000;
  }

  if (normalized.includes("rb")) {
    return amount * 1_000;
  }

  return amount;
}

function sortPricingPlans<T extends PublicPricingPlan>(plans: T[]) {
  return [...plans].sort((left, right) => {
    const leftPrice = getPriceOrderValue(left.price);
    const rightPrice = getPriceOrderValue(right.price);

    if (leftPrice !== rightPrice) {
      return leftPrice - rightPrice;
    }

    return left.name.localeCompare(right.name);
  });
}

export async function getPublicCategories(limit = 4): Promise<PublicCategoryCard[]> {
  const fallbackItems = marketplaceCategories.map((item) => ({
    title: item.title,
    description: item.description,
  }));

  try {
    const [categoryRows, portfolioRows] = await Promise.all([
      db.select().from(portfolioCategories).orderBy(portfolioCategories.name),
      db.select({ categoryId: portfolios.categoryId }).from(portfolios),
    ]);

    if (categoryRows.length > 0) {
      const counts = portfolioRows.reduce<Record<string, number>>((accumulator, item) => {
        if (item.categoryId) {
          accumulator[item.categoryId] = (accumulator[item.categoryId] || 0) + 1;
        }
        return accumulator;
      }, {});

      const databaseItems = categoryRows.map((item) => {
        const count = counts[item.id] || 0;
        return {
          title: item.name,
          description:
            count > 0
              ? `${count} project siap dijadikan referensi untuk kategori ${item.name.toLowerCase()}.`
              : `Kategori ${item.name} siap dipakai untuk mengelompokkan project dan inspirasi bisnis.`,
          countLabel: `${count} project`,
        };
      });

      const mergedItems: PublicCategoryCard[] = [...databaseItems];

      for (const fallbackItem of fallbackItems) {
        if (mergedItems.length >= limit) {
          break;
        }

        if (!mergedItems.some((item) => item.title === fallbackItem.title)) {
          mergedItems.push(fallbackItem);
        }
      }

      return mergedItems.slice(0, limit);
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public categories.", error);
    }
  }

  return fallbackItems.slice(0, limit);
}

export async function getPublicCreatives(limit?: number): Promise<PublicCreativeCard[]> {
  try {
    const portfolioRows = await db
      .select({
        name: portfolios.name,
        thumbnail: portfolios.thumbnail,
        result: portfolios.result,
        categoryName: portfolioCategories.name,
      })
      .from(portfolios)
      .leftJoin(portfolioCategories, eq(portfolios.categoryId, portfolioCategories.id))
      .orderBy(desc(portfolios.createdAt));

    if (portfolioRows.length > 0) {
      const items = portfolioRows.map((item, index) => ({
        name: item.name,
        category: item.categoryName || "Website Project",
        description: item.result || "Project website yang siap disesuaikan dengan kebutuhan bisnismu.",
        price: "By Brief",
        image: item.thumbnail || getFallbackImage(index),
      }));

      return typeof limit === "number" ? items.slice(0, limit) : items;
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public creatives.", error);
    }
  }

  const fallback = typeof limit === "number" ? shopCreatives.slice(0, limit) : shopCreatives;
  return fallback.map((item) => ({
    name: item.name,
    category: item.category,
    description: item.description,
    price: item.price,
    image: item.image,
  }));
}

export async function getPublicPricing(): Promise<PublicPricingPlan[]> {
  try {
    const pricingRows = await db.select().from(pricings).orderBy(desc(pricings.isFeatured), desc(pricings.createdAt));

    if (pricingRows.length > 0) {
      return sortPricingPlans(pricingRows.map((item) => ({
        name: item.name,
        price: item.price,
        description: item.description || "Paket website yang bisa disesuaikan dengan kebutuhan bisnis kamu.",
        features: Array.isArray(item.features) ? item.features : [],
        featured: item.isFeatured,
      })));
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public pricing.", error);
    }
  }

  return sortPricingPlans(pricingPlans.map((item) => ({
    name: item.name,
    price: item.price,
    description: item.description,
    features: [...item.features],
    featured: item.featured,
  })));
}

export async function getHomepagePricing(): Promise<PublicPricingPlan[]> {
  const pricing = await getPublicPricing();

  if (pricing.length >= 2) {
    return pricing.slice(0, 2);
  }

  return marketplacePricing.map((item) => ({
    name: item.name,
    price: item.price,
    description: item.description,
    features: [...item.features],
    featured: item.note.length > 0,
  }));
}

export async function getPublicBlogPosts(limit?: number): Promise<PublicBlogCard[]> {
  try {
    const rows = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.status, "published"))
      .orderBy(desc(blogPostsTable.publishedAt), desc(blogPostsTable.createdAt));

    if (rows.length > 0) {
      const items = rows.map((item, index) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt || "Insight praktis untuk membantu website bisnis tampil lebih meyakinkan.",
        image: item.thumbnail || getFallbackImage(index + 2),
        category: item.category,
        date: formatDate(item.publishedAt || item.createdAt),
      }));

      return typeof limit === "number" ? items.slice(0, limit) : items;
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public blog posts.", error);
    }
  }

  const homepageFallback = fallbackBlogDetails.map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    image: item.image,
    category: item.category,
    date: item.date,
  }));

  return typeof limit === "number" ? homepageFallback.slice(0, limit) : homepageFallback;
}

export async function getPublicBlogCategories(): Promise<PublicBlogCategory[]> {
  try {
    const rows = await db.select().from(blogCategoriesTable).orderBy(blogCategoriesTable.name);

    if (rows.length > 0) {
      return [
        { label: "Semua Artikel", active: true },
        ...rows.map((item) => ({
          label: item.name,
        })),
      ];
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public blog categories.", error);
    }
  }

  return [
    { label: "Semua Artikel", active: true },
    ...blogPagePosts.map((item) => ({ label: item.category })),
  ].filter((item, index, array) => array.findIndex((entry) => entry.label === item.label) === index);
}

export async function getPublicBlogPostBySlug(slug: string): Promise<PublicBlogDetail | null> {
  try {
    const [post] = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, slug))
      .limit(1);

    if (post && post.status === "published") {
      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || "Insight praktis untuk membantu website bisnis tampil lebih meyakinkan.",
        image: post.thumbnail || getFallbackImage(0),
        category: post.category,
        date: formatDate(post.publishedAt || post.createdAt),
        content: post.content || post.excerpt || "Konten artikel akan segera hadir.",
      };
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public blog detail.", error);
    }
  }

  return fallbackBlogDetails.find((item) => item.slug === slug) ?? null;
}
