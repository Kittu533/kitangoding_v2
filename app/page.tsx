import type { Metadata } from "next";
import { LandingPage } from "@/components/templates/LandingPage";
import { serviceAreas, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jasa Pembuatan Website UMKM, Landing Page, dan Toko Online",
  description:
    "Kita Ngoding membantu UMKM di Jogja, Solo, Wonogiri, dan area Jawa membuat website company profile, landing page, toko online, dan aplikasi web yang rapi, cepat, dan mudah dipakai untuk jualan.",
  alternates: {
    canonical: siteConfig.domain,
  },
  openGraph: {
    title: `Jasa Pembuatan Website UMKM | ${siteConfig.name}`,
    description:
      "Website bisnis yang rapi, meyakinkan, dan siap dipakai untuk promosi, lead, dan order pelanggan di area Jawa.",
    url: siteConfig.domain,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Jasa Pembuatan Website UMKM`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Jasa Pembuatan Website UMKM | ${siteConfig.name}`,
    description:
      "Website company profile, landing page, toko online, dan aplikasi web untuk bisnis di area Jawa.",
    images: ["/og-image.png"],
  },
  keywords: [
    "jasa pembuatan website umkm",
    "jasa website company profile",
    "jasa landing page",
    "jasa toko online umkm",
    "web developer jawa",
    "jasa website jogja",
    "jasa website solo",
    "jasa website wonogiri",
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.domain,
  image: `${siteConfig.domain}/og-image.png`,
  telephone: `+${siteConfig.phoneHref}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.addressLocality,
    addressRegion: siteConfig.addressRegion,
    addressCountry: siteConfig.addressCountry,
  },
  areaServed: serviceAreas.map((area) => ({
    "@type": "AdministrativeArea",
    name: area,
  })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${siteConfig.phoneHref}`,
      email: siteConfig.email,
      areaServed: "ID",
      availableLanguage: ["id"],
    },
  ],
  priceRange: "$$",
  sameAs: [siteConfig.instagram, `https://wa.me/${siteConfig.phoneHref}`],
};

export default function Home() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <LandingPage />
    </>
  );
}
