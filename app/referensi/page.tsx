import type { Metadata } from "next";
import { connection } from "next/server";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { VisualReferenceSection } from "@/components/templates/MarketplaceHome";
import { getPublicCreatives } from "@/lib/public-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Referensi Tampilan Website",
  description: `Lihat referensi tampilan website, landing page, katalog produk, dan dashboard dari ${siteConfig.name} untuk menentukan arah visual proyek.`,
  keywords: [
    siteConfig.name,
    "referensi desain website",
    "inspirasi landing page",
    "contoh UI website bisnis",
  ],
  alternates: {
    canonical: `${siteConfig.domain}/referensi`,
  },
  openGraph: {
    title: `Referensi Tampilan Website | ${siteConfig.name}`,
    description: `Jelajahi referensi website, landing page, katalog produk, dan dashboard dari ${siteConfig.name} untuk menentukan arah visual proyek.`,
    url: `${siteConfig.domain}/referensi`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Referensi Tampilan Website | ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Referensi Tampilan Website | ${siteConfig.name}`,
    description: `Temukan arah visual website bisnismu bersama ${siteConfig.name}.`,
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  await connection();

  const creativeItems = await getPublicCreatives(12);
  const referenceJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Referensi Tampilan Website",
      description:
        "Referensi visual untuk website bisnis, landing page, katalog produk, dashboard, dan interface app-like.",
      url: `${siteConfig.domain}/referensi`,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Referensi Visual kitangoding.id",
      itemListElement: creativeItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        description: item.description,
      })),
    },
  ];

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(referenceJsonLd) }}
        type="application/ld+json"
      />
      <FloatingNav />
      <main id="konten">
        <VisualReferenceSection items={creativeItems} />
        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}
