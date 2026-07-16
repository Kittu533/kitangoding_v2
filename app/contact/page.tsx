import type { Metadata } from "next";
import { ContactPage } from "@/components/templates/ContactPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak Jasa Pembuatan Website",
  description:
    "Hubungi kitangoding.id untuk konsultasi website UMKM, landing page, dan toko online. Berlokasi di Sendangadi, Mlati, Sleman.",
  keywords: [
    siteConfig.name,
    "konsultasi website",
    "jasa website Jogja",
    "web developer Sleman",
  ],
  alternates: {
    canonical: `${siteConfig.domain}/contact`,
  },
  openGraph: {
    title: `Kontak Jasa Pembuatan Website | ${siteConfig.name}`,
    description:
      "Hubungi kitangoding.id untuk konsultasi website UMKM, landing page, dan toko online.",
    url: `${siteConfig.domain}/contact`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Kontak Jasa Pembuatan Website | ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Kontak Jasa Pembuatan Website | ${siteConfig.name}`,
    description:
      "Hubungi kitangoding.id untuk konsultasi website UMKM, landing page, dan toko online.",
    images: ["/og-image.png"],
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Kontak Jasa Pembuatan Website kitangoding.id",
  description:
    "Hubungi kitangoding.id untuk konsultasi website UMKM, landing page, dan toko online.",
  url: `${siteConfig.domain}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.domain,
    email: siteConfig.email,
    telephone: `+${siteConfig.phoneHref}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.addressLocality,
      addressRegion: siteConfig.addressRegion,
      addressCountry: siteConfig.addressCountry,
    },
    sameAs: [siteConfig.instagram, siteConfig.tiktok],
  },
};

export default function Page() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
        type="application/ld+json"
      />
      <ContactPage />
    </>
  );
}
