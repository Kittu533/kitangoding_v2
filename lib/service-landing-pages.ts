import type { Metadata } from "next";
import { serviceAreas, siteConfig } from "@/lib/site";

export type ServiceLandingPageConfig = {
  pathname: string;
  keyword: string;
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  highlights: {
    title: string;
    description: string;
  }[];
  deliverables: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  relatedLinks: {
    href: string;
    label: string;
  }[];
};

export const serviceLandingPages = [
  {
    pathname: "/jasa-website-company-profile",
    keyword: "jasa website company profile",
    title: "Jasa Website Company Profile untuk UMKM",
    description:
      "Website company profile yang rapi, cepat, dan meyakinkan untuk UMKM, CV, agensi, dan bisnis lokal.",
    heroTitle: "Website company profile yang bikin bisnis lebih cepat dipercaya.",
    heroDescription:
      "Cocok untuk bisnis yang butuh profil online yang jelas, mudah dipahami, dan siap dipakai untuk memperkuat kredibilitas di pencarian Google maupun saat dibagikan ke calon pelanggan.",
    highlights: [
      {
        title: "Struktur profil yang jelas",
        description: "Membantu pengunjung cepat paham siapa kamu, apa yang kamu kerjakan, dan bagaimana cara menghubungi bisnis kamu.",
      },
      {
        title: "Tampilan responsif",
        description: "Dirancang tetap nyaman dibuka di HP supaya calon pelanggan tidak perlu zoom-in atau scroll berantakan.",
      },
      {
        title: "CTA yang mudah ditemukan",
        description: "Tombol kontak, WhatsApp, dan inquiry disusun supaya langkah berikutnya terasa sederhana.",
      },
    ],
    deliverables: [
      "Hero section dengan value bisnis yang ringkas",
      "Profil usaha, layanan utama, dan proses kerja",
      "Bukti sosial seperti portfolio, klien, atau testimoni",
      "Section kontak dan CTA yang jelas",
      "Layout yang siap dikembangkan ke halaman lain",
    ],
    faq: [
      {
        question: "Apakah cocok untuk CV atau agensi kecil?",
        answer:
          "Cocok. Fokusnya memang membuat profil bisnis terlihat lebih profesional tanpa harus membuat website yang terlalu besar dulu.",
      },
      {
        question: "Kalau saya belum punya copy, apakah tetap bisa mulai?",
        answer:
          "Bisa. Kita bisa bantu menyusun kerangka isi dari diskusi singkat tentang layanan, target pelanggan, dan keunggulan bisnis kamu.",
      },
      {
        question: "Bisa dipakai untuk SEO brand juga?",
        answer:
          "Bisa. Halaman ini membantu brand kamu punya halaman tujuan yang jelas untuk kata kunci nama bisnis dan layanan utamanya.",
      },
    ],
    relatedLinks: [
      { href: "/jasa-landing-page-bisnis", label: "Landing page bisnis" },
      { href: "/jasa-toko-online-umkm", label: "Toko online UMKM" },
      { href: "/blog/jasa-website-company-profile-umkm", label: "Artikel company profile UMKM" },
      { href: "/pricing", label: "Lihat harga" },
      { href: "/contact", label: "Kontak" },
    ],
  },
  {
    pathname: "/jasa-landing-page-bisnis",
    keyword: "jasa landing page bisnis",
    title: "Jasa Landing Page Bisnis untuk Campaign",
    description:
      "Landing page bisnis yang fokus konversi untuk promo, iklan, launching produk, dan lead generation.",
    heroTitle: "Landing page bisnis yang fokus ke satu tujuan: menghasilkan action.",
    heroDescription:
      "Ideal untuk campaign iklan, promo terbatas, launching produk, atau penawaran jasa yang butuh alur pesan lebih tajam dari homepage biasa.",
    highlights: [
      {
        title: "Fokus ke konversi",
        description: "Satu halaman, satu pesan utama, satu CTA. Itu membantu pengunjung lebih cepat mengambil keputusan.",
      },
      {
        title: "Copy yang lebih langsung",
        description: "Struktur isi dirancang untuk menjawab pertanyaan utama: ini untuk siapa, manfaatnya apa, dan kenapa harus sekarang.",
      },
      {
        title: "Siap tracking",
        description: "Cocok untuk campaign yang ingin dipantau performanya lewat analytics, form lead, atau WhatsApp click.",
      },
    ],
    deliverables: [
      "Headline, subheadline, dan value proposition",
      "Benefit section, proof point, dan FAQ singkat",
      "CTA ke WhatsApp atau form inquiry",
      "Struktur yang cocok untuk iklan Meta Ads atau Google Ads",
      "Layout yang tetap enak dibaca di mobile",
    ],
    faq: [
      {
        question: "Apakah landing page ini bisa dipakai untuk iklan?",
        answer:
          "Bisa. Layout-nya memang dibuat untuk mendukung campaign dan memudahkan pengunjung mengambil action dari satu halaman tujuan.",
      },
      {
        question: "Apakah harus jualan produk fisik?",
        answer:
          "Tidak. Landing page ini juga cocok untuk jasa, kelas, workshop, konsultasi, atau penawaran lead magnet.",
      },
      {
        question: "Bisa dibuat lebih singkat kalau campaign-nya sederhana?",
        answer:
          "Bisa. Kita bisa sesuaikan panjang copy dan section yang dipakai agar tetap relevan dengan tujuan kampanye.",
      },
    ],
    relatedLinks: [
      { href: "/jasa-website-company-profile", label: "Company profile" },
      { href: "/jasa-toko-online-umkm", label: "Toko online UMKM" },
      { href: "/blog/jasa-landing-page-untuk-iklan", label: "Artikel landing page untuk iklan" },
      { href: "/pricing", label: "Lihat harga" },
      { href: "/project-inquiry", label: "Konsultasi project" },
    ],
  },
  {
    pathname: "/jasa-toko-online-umkm",
    keyword: "jasa toko online umkm",
    title: "Jasa Toko Online UMKM yang Mudah Dipakai",
    description:
      "Toko online UMKM dengan katalog rapi, CTA order jelas, dan alur pembelian yang sederhana.",
    heroTitle: "Toko online UMKM yang membantu produk lebih gampang ditemukan dan dipesan.",
    heroDescription:
      "Dipakai saat kamu butuh katalog yang lebih tertata, order yang lebih rapi, dan halaman produk yang tetap terasa ringan untuk calon pembeli dari HP.",
    highlights: [
      {
        title: "Katalog produk yang rapi",
        description: "Kategori dan tampilan produk disusun supaya calon pembeli lebih cepat menemukan barang yang mereka cari.",
      },
      {
        title: "Alur order sederhana",
        description: "Order bisa diarahkan ke WhatsApp, form, atau flow lain yang paling cocok dengan operasional bisnismu.",
      },
      {
        title: "Siap tumbuh",
        description: "Fondasinya cukup fleksibel untuk ditambah fitur promo, ongkir, dan halaman detail produk di tahap berikutnya.",
      },
    ],
    deliverables: [
      "Katalog produk dan kategori utama",
      "CTA order per produk atau per kategori",
      "FAQ pengiriman, pembayaran, dan proses order",
      "Layout mobile-first yang cepat dipakai",
      "Struktur yang mudah dikembangkan ke toko lebih lengkap",
    ],
    faq: [
      {
        question: "Apakah harus langsung punya e-commerce penuh?",
        answer:
          "Tidak. Untuk banyak UMKM, katalog produk dengan alur order yang jelas sudah cukup efektif untuk mulai meningkatkan penjualan.",
      },
      {
        question: "Bisa tetap diarahkan ke WhatsApp?",
        answer:
          "Bisa. Untuk banyak bisnis UMKM, WhatsApp justru jadi jalur order yang paling praktis dan paling cepat dipakai.",
      },
      {
        question: "Apakah halaman ini cocok untuk produk rumahan?",
        answer:
          "Cocok. Justru banyak produk rumahan lebih terbantu saat tampilannya rapi, kategorinya jelas, dan CTA order tidak membingungkan.",
      },
    ],
    relatedLinks: [
      { href: "/jasa-website-company-profile", label: "Company profile" },
      { href: "/jasa-landing-page-bisnis", label: "Landing page bisnis" },
      { href: "/blog/jasa-toko-online-untuk-umkm", label: "Artikel toko online UMKM" },
      { href: "/pricing", label: "Lihat harga" },
      { href: "/contact", label: "Kontak" },
    ],
  },
] as const satisfies readonly ServiceLandingPageConfig[];

export function getServiceLandingPage(pathname: string) {
  return serviceLandingPages.find((page) => page.pathname === pathname);
}

export function createServiceLandingPageUrl(page: ServiceLandingPageConfig) {
  return `${siteConfig.domain}${page.pathname}`;
}

export function createServiceLandingMetadata(page: ServiceLandingPageConfig): Metadata {
  const url = createServiceLandingPageUrl(page);
  const description = `${page.description} Konsultasikan kebutuhanmu dengan ${siteConfig.name}.`;

  return {
    title: page.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${page.title} | ${siteConfig.name}`,
      description,
      url,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${page.title} | ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | ${siteConfig.name}`,
      description,
      images: ["/og-image.png"],
    },
    keywords: [
      siteConfig.name,
      "kitangoding id",
      page.keyword,
      page.title.toLowerCase(),
      "jasa website jogja",
      "jasa website solo",
      "jasa website wonogiri",
    ],
  };
}

export function createServiceLandingPageStructuredData(page: ServiceLandingPageConfig) {
  const url = createServiceLandingPageUrl(page);
  const organizationId = `${siteConfig.domain}#organization`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.domain,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.title,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      description: page.description,
      url,
      mainEntityOfPage: url,
      areaServed: serviceAreas.map((area) => ({
        "@type": "AdministrativeArea",
        name: area,
      })),
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: url,
      },
      provider: {
        "@id": organizationId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Internal links untuk ${page.title}`,
      itemListElement: page.relatedLinks.map((link, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.domain}${link.href}`,
        name: link.label,
      })),
    },
  ];
}
