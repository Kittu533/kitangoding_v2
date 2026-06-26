import type { Metadata } from "next";
import { connection } from "next/server";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { ServicesOverviewSection } from "@/components/templates/MarketplaceHome";
import { getPublicServices } from "@/lib/public-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Layanan Jasa Website & Aplikasi Web",
  description:
    "Pilih jasa pembuatan website company profile, landing page, toko online, atau aplikasi web custom untuk jualan dan kredibilitas bisnis.",
  alternates: {
    canonical: `${siteConfig.domain}/layanan`,
  },
  openGraph: {
    title: "Layanan Jasa Website & Aplikasi Web | Kita Ngoding",
    description:
      "Pilih jasa pembuatan website company profile, landing page, toko online, atau aplikasi web custom untuk jualan dan kredibilitas bisnis.",
    url: `${siteConfig.domain}/layanan`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Layanan Jasa Website & Aplikasi Web | Kita Ngoding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Layanan Jasa Website & Aplikasi Web | Kita Ngoding",
    description:
      "Pilih jasa pembuatan website company profile, landing page, toko online, atau aplikasi web custom untuk jualan dan kredibilitas bisnis.",
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  await connection();

  const services = await getPublicServices(4);

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <ServicesOverviewSection services={services} />
        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}
