import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  blogCategories as blogCategoriesTable,
  blogPosts as blogPostsTable,
  portfolioCategories,
  portfolios,
  pricings,
  services as servicesTable,
} from "@/lib/db/schema";
import {
  blogPagePosts,
  categories as marketplaceCategories,
  marketplacePricing,
  shopCreatives,
} from "@/lib/marketplace-data";
import { pricingPlans, portfolioItems, services as fallbackServices } from "@/lib/landing-data";

const fallbackImages = [
  "/images/project-1.webp",
  "/images/project-2.webp",
  "/images/project-3.webp",
  "/images/project-4.webp",
  "/images/project-5.webp",
  "/images/project-6.webp",
  "/images/project-7.webp",
  "/images/project-8.webp",
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

export type PortfolioCard = {
  category: string;
  name: string;
  result: string;
  thumbnail?: string | null;
};

export type PublicPricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured: boolean;
};

export type PublicServiceCard = {
  title: string;
  description: string;
  price: string | null;
  icon: string | null;
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

export const fallbackBlogDetails: PublicBlogDetail[] = [
  {
    slug: "cara-memilih-template-website-yang-cocok-untuk-umkm",
    title: "Cara Memilih Template Website yang Cocok untuk UMKM",
    excerpt: "Panduan sederhana untuk memilih tampilan yang sesuai dengan jenis bisnis, tujuan, dan calon pelanggan kamu.",
    image: "/images/article-template-umkm.svg",
    category: "Tips Bisnis",
    date: "June 2, 2026",
    content:
      "Mulailah dari tujuan utama websitemu. Kalau fokusnya mengenalkan bisnis, kamu butuh struktur company profile yang rapi. Kalau fokusnya promosi, landing page dengan CTA yang jelas biasanya lebih efektif.\n\nSetelah itu, cek apakah template punya ruang yang cukup untuk menjelaskan layanan, hasil kerja, dan cara menghubungi kamu. Template yang bagus bukan cuma terlihat menarik, tapi juga membantu calon pelanggan cepat paham.\n\nPastikan juga tampilannya nyaman di mobile. Mayoritas pengunjung pertama datang dari handphone, jadi layout, ukuran teks, dan tombol WhatsApp perlu tetap enak dipakai di layar kecil.",
  },
  {
    slug: "kenapa-website-custom-bisa-jadi-investasi-yang-masuk-akal",
    title: "Kenapa Website Custom Bisa Jadi Investasi yang Masuk Akal",
    excerpt: "Kapan bisnis cukup pakai template, dan kapan perlu tampilan custom yang dibuat lebih spesifik.",
    image: "/images/article-custom-website.svg",
    category: "Studi Kasus",
    date: "May 28, 2026",
    content:
      "Template siap pakai cocok untuk bisnis yang ingin segera launch dengan struktur yang sudah jelas. Tapi saat kebutuhan mulai lebih spesifik, website custom sering jadi pilihan yang lebih masuk akal.\n\nCustom berarti isi, alur, dan tampilan bisa lebih dekat dengan cara bisnismu bekerja. Ini penting kalau kamu punya layanan yang perlu dijelaskan bertahap, katalog yang butuh filter tertentu, atau CTA yang harus disusun lebih strategis.\n\nInvestasi custom biasanya lebih terasa nilainya ketika website dipakai sebagai alat jualan, bukan sekadar pelengkap identitas bisnis.",
  },
  {
    slug: "strategi-sederhana-agar-website-lebih-banyak-menghasilkan-lead",
    title: "Strategi Sederhana agar Website Lebih Banyak Menghasilkan Lead",
    excerpt: "Mulai dari pesan utama, struktur halaman, sampai tombol WhatsApp yang lebih jelas untuk calon pelanggan.",
    image: "/images/article-lead-strategy.svg",
    category: "Digital Marketing",
    date: "May 24, 2026",
    content:
      "Kalau pengunjung datang tapi tidak menghubungi, biasanya ada yang kurang jelas di halaman utama. Bisa jadi headline terlalu umum, manfaat belum terasa, atau CTA kurang terlihat.\n\nCoba mulai dari tiga hal: headline yang spesifik, section layanan yang ringkas, dan tombol aksi yang konsisten. Jangan biarkan pengunjung menebak apa langkah berikutnya.\n\nTambahkan juga bukti pendukung seperti portfolio, testimoni, atau studi kasus singkat. Elemen-elemen ini membantu rasa percaya muncul lebih cepat sebelum orang memutuskan chat.",
  },
  {
    slug: "jasa-website-company-profile-umkm",
    title: "Jasa Website Company Profile UMKM: Apa Saja yang Perlu Ada?",
    excerpt: "Panduan isi website company profile UMKM agar bisnis terlihat jelas, dipercaya, dan mudah dihubungi calon pelanggan.",
    image: "/images/article-company-profile.svg",
    category: "Tips Bisnis",
    date: "June 12, 2026",
    content:
      "Website company profile untuk UMKM tidak perlu rumit. Yang penting, pengunjung bisa cepat paham siapa bisnisnya, apa layanannya, area kerja atau target pasarnya, dan bagaimana cara menghubungi tim penjualan.\n\nStruktur minimal yang efektif biasanya berisi hero yang spesifik, ringkasan layanan, keunggulan yang bisa dibuktikan, portfolio atau contoh kerja, testimoni, FAQ, dan tombol WhatsApp yang mudah ditemukan. Setiap bagian sebaiknya menjawab pertanyaan calon pelanggan, bukan hanya terlihat ramai.\n\nKalau tujuan utamanya mendapatkan lead, jangan sembunyikan CTA di bagian bawah saja. Ulangi ajakan konsultasi di beberapa titik penting supaya pengunjung yang sudah yakin bisa langsung bertindak.",
  },
  {
    slug: "jasa-landing-page-untuk-iklan",
    title: "Jasa Landing Page untuk Iklan: Kenapa Tidak Cukup Pakai Homepage?",
    excerpt: "Landing page membantu traffic iklan membaca satu penawaran dengan alur yang lebih fokus dan CTA yang lebih jelas.",
    image: "/images/article-landing-page-ads.svg",
    category: "Digital Marketing",
    date: "June 10, 2026",
    content:
      "Homepage biasanya berisi banyak informasi: profil, layanan, portfolio, artikel, dan kontak. Untuk traffic iklan, informasi yang terlalu luas bisa membuat pengunjung bingung. Landing page dibuat lebih fokus: satu campaign, satu pesan utama, satu CTA.\n\nLanding page yang baik menyambungkan janji di iklan dengan isi halaman. Jika iklan menawarkan paket website UMKM, halaman harus langsung menjelaskan masalah UMKM, hasil yang didapat, harga atau rentang investasi, proses kerja, bukti, dan cara konsultasi.\n\nDengan alur yang lebih pendek, tim marketing juga lebih mudah mengukur performa. Headline, CTA, testimoni, dan form bisa dievaluasi satu per satu tanpa terganggu navigasi yang terlalu banyak.",
  },
  {
    slug: "biaya-pembuatan-website-umkm",
    title: "Biaya Pembuatan Website UMKM: Faktor yang Mempengaruhi Harga",
    excerpt: "Harga website UMKM dipengaruhi jumlah halaman, kebutuhan desain, fitur, konten, integrasi, dan dukungan setelah launch.",
    image: "/images/article-biaya-website.svg",
    category: "Tips Bisnis",
    date: "June 8, 2026",
    content:
      "Biaya pembuatan website UMKM tidak bisa dilihat dari jumlah halaman saja. Website sederhana dengan copywriting rapi, desain responsif, dan CTA jelas sering lebih bernilai daripada website banyak halaman tapi informasinya berantakan.\n\nFaktor yang paling sering mempengaruhi harga adalah jenis website, jumlah section, kebutuhan desain custom, penulisan konten, fitur katalog atau form, integrasi WhatsApp, optimasi dasar SEO, dan dukungan setelah website online. Semakin spesifik kebutuhan bisnis, semakin besar waktu yang diperlukan untuk merancang alurnya.\n\nCara paling aman adalah mulai dari tujuan. Jika targetnya kredibilitas, company profile bisa cukup. Jika targetnya campaign iklan, landing page lebih tepat. Jika ingin menjual produk langsung, toko online atau katalog WhatsApp bisa jadi pilihan.",
  },
  {
    slug: "jasa-toko-online-untuk-umkm",
    title: "Jasa Toko Online untuk UMKM: Mulai dari Katalog atau Checkout?",
    excerpt: "Tidak semua UMKM perlu checkout penuh sejak awal. Kadang katalog produk dengan alur WhatsApp lebih cepat menghasilkan order.",
    image: "/images/article-toko-online-umkm.svg",
    category: "Web Development",
    date: "June 6, 2026",
    content:
      "Toko online untuk UMKM sebaiknya mengikuti cara bisnis melayani pelanggan. Jika produk perlu konsultasi, variasi stok sering berubah, atau order masih banyak lewat chat, katalog produk dengan tombol WhatsApp bisa lebih praktis daripada checkout penuh.\n\nCheckout lengkap cocok ketika harga, stok, ongkir, dan pembayaran sudah siap dibuat otomatis. Tapi kalau operasional belum stabil, fitur yang terlalu banyak justru menambah pekerjaan admin. Mulai dari katalog yang rapi sering lebih aman: foto produk, deskripsi, kategori, harga, dan CTA order.\n\nSetelah order mulai konsisten, fitur bisa ditambah bertahap. Misalnya filter produk, halaman detail, form order, integrasi pembayaran, atau dashboard sederhana untuk mengelola katalog.",
  },
  {
    slug: "website-bisnis-agar-mudah-ditemukan-google",
    title: "Agar Website Bisnis Mudah Ditemukan Google, Mulai dari Hal Ini",
    excerpt: "SEO teknis penting, tapi Google juga butuh halaman yang jelas membahas layanan, lokasi, masalah pelanggan, dan bukti bisnis.",
    image: "/images/article-google-discovery.svg",
    category: "Digital Marketing",
    date: "June 4, 2026",
    content:
      "Agar website bisnis mudah ditemukan Google, fondasi teknis seperti title, description, sitemap, robots, canonical, dan structured data memang perlu benar. Tapi setelah itu, yang menentukan adalah kualitas halaman dan relevansi konten.\n\nSetiap layanan penting sebaiknya punya halaman atau section yang menjelaskan masalah pelanggan, solusi yang ditawarkan, proses kerja, estimasi hasil, FAQ, dan cara menghubungi. Google lebih mudah memahami bisnis jika topiknya konsisten dan tidak terlalu umum.\n\nUntuk UMKM, konten lokal juga bisa membantu. Sebutkan area layanan, jenis bisnis yang dilayani, contoh kebutuhan, dan studi kasus sederhana. Artikel blog dapat dipakai untuk menjawab pertanyaan yang sering ditanyakan calon pelanggan sebelum membeli.",
  },
  {
    slug: "cara-membuat-website-bisnis-lebih-meyakinkan",
    title: "Cara Membuat Website Bisnis Lebih Meyakinkan untuk Calon Pelanggan",
    excerpt: "Kepercayaan muncul dari pesan yang jelas, bukti kerja, tampilan rapi, kecepatan halaman, dan jalur kontak yang tidak membingungkan.",
    image: "/images/article-website-trust.svg",
    category: "Strategi Branding",
    date: "June 1, 2026",
    content:
      "Website bisnis yang meyakinkan tidak harus penuh animasi. Pengunjung biasanya mencari jawaban sederhana: bisnis ini bisa membantu saya atau tidak, sudah pernah mengerjakan hal serupa atau belum, dan mudah dihubungi atau tidak.\n\nMulai dari headline yang langsung menyebut layanan dan target pelanggan. Setelah itu tampilkan manfaat, contoh hasil kerja, testimoni, proses kerja, dan FAQ. Hindari kalimat yang terlalu umum seperti solusi terbaik tanpa bukti pendukung.\n\nDetail kecil juga berpengaruh: nomor kontak aktif, tombol WhatsApp yang jelas, halaman cepat dibuka, gambar tidak pecah, dan tampilan mobile rapi. Semakin sedikit keraguan yang muncul, semakin besar peluang pengunjung menghubungi.",
  },
  {
    slug: "perbedaan-website-company-profile-dan-landing-page",
    title: "Perbedaan Website Company Profile dan Landing Page untuk Bisnis",
    excerpt: "Dua jenis halaman ini sering dianggap sama, padahal tujuan, struktur, dan cara pakainya berbeda.",
    image: "/images/article-company-vs-landing.svg",
    category: "Tips Bisnis",
    date: "May 30, 2026",
    content:
      "Website company profile dipakai untuk menjelaskan bisnis secara menyeluruh. Biasanya ada profil, layanan, portfolio, testimoni, FAQ, dan kontak. Tujuannya membangun kepercayaan dan memberi gambaran lengkap tentang siapa kamu.\n\nLanding page jauh lebih fokus. Biasanya satu halaman untuk satu penawaran, satu campaign, atau satu CTA utama. Struktur isinya lebih singkat dan diarahkan agar pengunjung cepat mengambil tindakan seperti chat, isi form, atau order.\n\nKalau bisnis kamu butuh aset jangka panjang untuk kredibilitas, company profile sering jadi fondasi. Kalau fokusnya promosi tertentu atau traffic iklan, landing page biasanya lebih efektif.",
  },
  {
    slug: "berapa-lama-pembuatan-website-bisnis",
    title: "Berapa Lama Pembuatan Website Bisnis Biasanya Selesai?",
    excerpt: "Durasi pembuatan website dipengaruhi kejelasan brief, jumlah revisi, isi konten, dan fitur yang diminta.",
    image: "/images/article-project-timeline.svg",
    category: "Web Development",
    date: "May 27, 2026",
    content:
      "Website bisnis yang sederhana bisa selesai lebih cepat kalau arah desain, isi halaman, dan CTA sudah jelas sejak awal. Yang sering memperlambat justru bukan coding, tetapi revisi tanpa brief yang rapi, konten yang belum siap, atau perubahan scope di tengah jalan.\n\nProject company profile ringan biasanya lebih cepat daripada website custom dengan banyak alur, form, katalog, atau integrasi tambahan. Landing page campaign juga bisa relatif cepat kalau penawaran dan copy utamanya sudah matang.\n\nCara paling realistis untuk mempercepat proses adalah menyiapkan bahan dari awal: profil bisnis, layanan utama, foto, contoh referensi, dan tujuan halaman. Semakin jelas inputnya, semakin kecil risiko bolak-balik revisi.",
  },
  {
    slug: "konten-wajib-sebelum-bikin-website-umkm",
    title: "Konten Wajib yang Sebaiknya Disiapkan Sebelum Bikin Website UMKM",
    excerpt: "Website lebih cepat jadi kalau pemilik bisnis sudah menyiapkan isi inti sebelum masuk tahap desain.",
    image: "/images/article-konten-website.svg",
    category: "Tips Bisnis",
    date: "May 25, 2026",
    content:
      "Banyak project website tertahan karena desain mulai duluan, tapi isi utamanya belum siap. Padahal pengunjung datang untuk membaca informasi penting: bisnis ini jual apa, untuk siapa, apa keunggulannya, dan bagaimana cara menghubungi.\n\nKonten minimum yang sebaiknya disiapkan adalah ringkasan bisnis, daftar layanan atau produk, area layanan, testimoni atau bukti kerja, FAQ yang paling sering ditanya, dan CTA yang ingin dituju. Bahkan poin-poin sederhana sudah cukup untuk membantu struktur halaman.\n\nKalau konten dasarnya siap lebih awal, proses desain jadi lebih akurat. Tim tidak menebak-nebak isi halaman, dan revisi biasanya jauh lebih sedikit.",
  },
  {
    slug: "website-umkm-untuk-order-whatsapp",
    title: "Website UMKM untuk Order WhatsApp: Kapan Ini Sudah Cukup?",
    excerpt: "Tidak semua bisnis perlu checkout penuh. Untuk banyak UMKM, alur order lewat WhatsApp masih jadi langkah paling masuk akal.",
    image: "/images/article-whatsapp-order.svg",
    category: "Digital Marketing",
    date: "May 22, 2026",
    content:
      "Website dengan tombol order WhatsApp sering dianggap terlalu sederhana, padahal untuk banyak UMKM justru itu yang paling efektif. Pengunjung tetap bisa melihat produk, manfaat, harga, dan testimoni di website, lalu proses closing lanjut lewat chat.\n\nModel ini cocok ketika produk masih sering berubah, butuh konsultasi sebelum order, atau admin ingin tetap mengatur transaksi secara manual. Dibanding memaksa checkout penuh terlalu cepat, alur WhatsApp sering lebih ringan dan lebih cepat jalan.\n\nYang penting, struktur websitenya tetap rapi. Pengunjung harus paham produk apa yang dijual, kisaran harga, cara order, dan berapa lama responnya. Kalau ini jelas, WhatsApp bisa jadi CTA yang sangat kuat.",
  },
  {
    slug: "partner-website-bisnis-area-jawa",
    title: "Partner Website Bisnis untuk Area Jawa: Hal yang Perlu Dicek",
    excerpt: "Kalau bisnis kamu melayani Jogja, Solo, Wonogiri, dan area Jawa lain, pilih partner website yang paham kebutuhan bisnis lokal.",
    image: "/images/article-website-jawa.svg",
    category: "Studi Kasus",
    date: "May 19, 2026",
    content:
      "Kalau bisnis kamu menjangkau Jogja, Solo, Wonogiri, atau area Jawa lain, partner website yang dipilih sebaiknya tidak cuma menjual visual. Yang lebih penting adalah apakah mereka paham kebutuhan bisnis lokal, bisa menunjukkan contoh hasil kerja, dan punya proses yang jelas dari brief sampai launch.\n\nPerhatikan cara mereka bertanya saat awal diskusi. Tim yang baik biasanya tidak langsung bicara desain saja, tapi juga menanyakan target pelanggan, tujuan website, CTA utama, dan alur komunikasi setelah website online.\n\nKalau targetnya website yang dipakai untuk promosi serius, pilih partner yang bisa membantu struktur halaman, bukan hanya memasang template. Hasil akhir website sangat dipengaruhi kualitas diskusi di awal.",
  },
  {
    slug: "seo-lokal-website-umkm",
    title: "SEO Lokal untuk Website UMKM: Langkah Dasar yang Paling Efektif",
    excerpt: "SEO lokal membantu website UMKM lebih relevan untuk calon pelanggan di area layanan tertentu.",
    image: "/images/article-seo-lokal.svg",
    category: "Digital Marketing",
    date: "May 16, 2026",
    content:
      "SEO lokal penting kalau bisnis kamu melayani area tertentu seperti kota, kabupaten, atau wilayah layanan spesifik. Google perlu sinyal yang jelas tentang lokasi, jenis layanan, dan siapa target pelanggan di area itu.\n\nLangkah dasarnya adalah menulis halaman layanan yang menyebut konteks lokal secara alami, menampilkan alamat atau area layanan, menyamakan data kontak di website, dan menyiapkan konten yang menjawab kebutuhan pelanggan lokal. Kombinasi ini membantu Google memahami relevansi bisnis.\n\nKalau ada Google Business Profile, website dan profil bisnis sebaiknya saling mendukung. Halaman layanan, kontak, dan CTA lokal harus konsisten supaya sinyal brand dan lokasi lebih kuat.",
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

export function normalizePublicPricingPlans<T extends PublicPricingPlan>(plans: T[]) {
  const sortedPlans = [...plans].sort((left, right) => {
    const leftPrice = getPriceOrderValue(left.price);
    const rightPrice = getPriceOrderValue(right.price);

    if (leftPrice !== rightPrice) {
      return leftPrice - rightPrice;
    }

    return left.name.localeCompare(right.name);
  });

  let hasFeaturedPlan = false;

  return sortedPlans.map((plan) => {
    const featured = plan.featured && !hasFeaturedPlan;
    hasFeaturedPlan ||= featured;

    return featured === plan.featured ? plan : { ...plan, featured };
  });
}

const fallbackServiceDescriptions = new Map<string, string>(
  fallbackServices.map((service) => [service.title, service.description] as const)
);

export function mapPublicServices(
  rows: Array<{
    title: string;
    description: string | null;
    price: string | null;
    icon: string | null;
  }>
): PublicServiceCard[] {
  return rows.map((item) => ({
    title: item.title,
    description:
      item.description?.trim() ||
      fallbackServiceDescriptions.get(item.title) ||
      "Website service yang bisa disesuaikan dengan kebutuhan bisnis kamu.",
    price: item.price,
    icon: item.icon,
  }));
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

export async function getPublicServices(limit?: number): Promise<PublicServiceCard[]> {
  try {
    const rows = await db
      .select({
        title: servicesTable.title,
        description: servicesTable.description,
        price: servicesTable.price,
        icon: servicesTable.icon,
      })
      .from(servicesTable)
      .orderBy(asc(servicesTable.createdAt));

    if (rows.length > 0) {
      const items = mapPublicServices(rows);
      return typeof limit === "number" ? items.slice(0, limit) : items;
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public services.", error);
    }
  }

  const fallback = fallbackServices.map((item) => ({
    title: item.title,
    description: item.description,
    price: null,
    icon: null,
  }));

  return typeof limit === "number" ? fallback.slice(0, limit) : fallback;
}

export async function getPublicPricing(): Promise<PublicPricingPlan[]> {
  try {
    const pricingRows = await db.select().from(pricings).orderBy(desc(pricings.isFeatured), desc(pricings.createdAt));

    if (pricingRows.length > 0) {
      return normalizePublicPricingPlans(pricingRows.map((item) => ({
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

  return normalizePublicPricingPlans(pricingPlans.map((item) => ({
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

export async function getPortfolioProjects(limit?: number): Promise<PortfolioCard[]> {
  try {
    const rows = await db
      .select({
        name: portfolios.name,
        result: portfolios.result,
        thumbnail: portfolios.thumbnail,
        categoryName: portfolioCategories.name,
      })
      .from(portfolios)
      .leftJoin(portfolioCategories, eq(portfolios.categoryId, portfolioCategories.id))
      .orderBy(desc(portfolios.createdAt));

    if (rows.length > 0) {
      const items: PortfolioCard[] = rows.map((item) => ({
        category: item.categoryName || "Tanpa Kategori",
        name: item.name,
        result: item.result || "Portfolio project",
        thumbnail: item.thumbnail,
      }));
      return typeof limit === "number" ? items.slice(0, limit) : items;
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load portfolio projects.", error);
    }
  }

  const fallback: PortfolioCard[] = portfolioItems.map((item) => ({
    category: item.category,
    name: item.name,
    result: item.result,
    thumbnail: null,
  }));
  return typeof limit === "number" ? fallback.slice(0, limit) : fallback;
}
