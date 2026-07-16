import type { Metadata } from "next";
import { connection } from "next/server";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { ServicesOverviewSection } from "@/components/templates/MarketplaceHome";
import { getPublicServices } from "@/lib/public-content";
import { serviceAreas, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Layanan Jasa Website & Aplikasi Web",
  description: `${siteConfig.name} menyediakan website company profile, landing page, toko online, dan aplikasi web custom untuk bisnis di Jogja, Solo, Wonogiri, dan area Jawa.`,
  keywords: [
    siteConfig.name,
    "jasa pembuatan website",
    "jasa website UMKM",
    "jasa aplikasi web",
  ],
  alternates: {
    canonical: `${siteConfig.domain}/layanan`,
  },
  openGraph: {
    title: `Layanan Jasa Website & Aplikasi Web | ${siteConfig.name}`,
    description: `${siteConfig.name} menyediakan website company profile, landing page, toko online, dan aplikasi web custom untuk bisnis di area Jawa.`,
    url: `${siteConfig.domain}/layanan`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Layanan Jasa Website & Aplikasi Web | ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Layanan Jasa Website & Aplikasi Web | ${siteConfig.name}`,
    description: `${siteConfig.name} menyediakan jasa website untuk UMKM dan bisnis jasa di area Jawa.`,
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  await connection();

  const services = await getPublicServices(4);
  const serviceCatalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Layanan Jasa Website kitangoding.id",
    url: `${siteConfig.domain}/layanan`,
    itemListElement: services.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        areaServed: serviceAreas.map((area) => ({
          "@type": "AdministrativeArea",
          name: area,
        })),
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.domain,
        },
      },
    })),
  };

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogJsonLd) }}
        type="application/ld+json"
      />
      <FloatingNav />
      <main id="konten">
        <ServicesOverviewSection services={services} />
        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}
