import type { Metadata } from "next";
import { connection } from "next/server";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { PortfolioGallery } from "@/components/organisms/PortfolioGallery";
import { getPortfolioProjects } from "@/lib/public-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio Website Bisnis",
  description:
    "Lihat contoh project website bisnis yang bisa dijadikan bukti kerja kitangoding.id sebelum konsultasi.",
  keywords: [
    siteConfig.name,
    "portfolio website bisnis",
    "contoh website UMKM",
    "contoh landing page bisnis",
  ],
  alternates: {
    canonical: `${siteConfig.domain}/portfolio`,
  },
  openGraph: {
    title: `Portfolio Website Bisnis | ${siteConfig.name}`,
    description:
      "Lihat contoh project website bisnis yang bisa dijadikan bukti kerja kitangoding.id sebelum konsultasi.",
    url: `${siteConfig.domain}/portfolio`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Portfolio Website Bisnis | ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Portfolio Website Bisnis | ${siteConfig.name}`,
    description:
      "Lihat contoh project website bisnis yang bisa dijadikan bukti kerja kitangoding.id sebelum konsultasi.",
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  await connection();
  const items = await getPortfolioProjects(9);
  const portfolioJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Portfolio Website Bisnis",
      description:
        "Contoh project website bisnis, landing page, dan toko online yang dikerjakan oleh kitangoding.id.",
      url: `${siteConfig.domain}/portfolio`,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Portfolio Project kitangoding.id",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        description: item.result,
      })),
    },
  ];

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
        type="application/ld+json"
      />
      <FloatingNav />
      <main id="konten">
        <PortfolioGallery />
        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}
