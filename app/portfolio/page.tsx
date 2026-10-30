import type { Metadata } from "next";
import { StudioHeader, StudioFooter } from "@/components/marketing/sections/StudioChrome";
import studio from "@/components/marketing/Studio.module.css";
import { PortfolioGallery } from "@/components/marketing/sections/PortfolioGallery";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio Website Bisnis",
  description:
    "Lihat contoh project website bisnis yang bisa dijadikan bukti kerja Rekalur sebelum konsultasi.",
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
      "Lihat contoh project website bisnis yang bisa dijadikan bukti kerja Rekalur sebelum konsultasi.",
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
      "Lihat contoh project website bisnis yang bisa dijadikan bukti kerja Rekalur sebelum konsultasi.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio Website Bisnis",
    description:
      "Contoh project website bisnis, landing page, dan toko online yang dikerjakan oleh Rekalur.",
    url: `${siteConfig.domain}/portfolio`,
  };

  return (
    <div className={studio.root}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
        type="application/ld+json"
      />
      <StudioHeader />
      <main id="konten">
        <PortfolioGallery />
      </main>
      <StudioFooter />
    </div>
  );
}
