import type { Metadata } from "next";
import { connection } from "next/server";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { PortfolioGallery } from "@/components/organisms/PortfolioGallery";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio Website Bisnis",
  description:
    "Lihat contoh project website bisnis yang bisa dijadikan bukti kerja Kita Ngoding sebelum konsultasi.",
  alternates: {
    canonical: `${siteConfig.domain}/portfolio`,
  },
  openGraph: {
    title: "Portfolio Website Bisnis | Kita Ngoding",
    description:
      "Lihat contoh project website bisnis yang bisa dijadikan bukti kerja Kita Ngoding sebelum konsultasi.",
    url: `${siteConfig.domain}/portfolio`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Website Bisnis | Kita Ngoding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Website Bisnis | Kita Ngoding",
    description:
      "Lihat contoh project website bisnis yang bisa dijadikan bukti kerja Kita Ngoding sebelum konsultasi.",
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  await connection();

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <PortfolioGallery />
        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}
