import type { Metadata } from "next";
import { LandingPage } from "@/components/templates/LandingPage";
import { faqs } from "@/lib/landing-data";
import { serviceAreas, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | Jasa Pembuatan Website UMKM`,
  },
  description:
    "kitangoding.id adalah jasa pembuatan website untuk UMKM di Jogja, Solo, Wonogiri, dan area Jawa. Kami melayani pembuatan website company profile, landing page, toko online, dan aplikasi web yang rapi, cepat, dan mudah dipakai untuk jualan.",
  alternates: {
    canonical: siteConfig.domain,
  },
  openGraph: {
    title: `${siteConfig.name} | Jasa Pembuatan Website UMKM`,
    description: `${siteConfig.name} membuat website bisnis yang rapi, meyakinkan, dan siap dipakai untuk promosi, lead, dan order pelanggan di area Jawa.`,
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
    title: `${siteConfig.name} | Jasa Pembuatan Website UMKM`,
    description: `${siteConfig.name} membuat website company profile, landing page, toko online, dan aplikasi web untuk bisnis di area Jawa.`,
    images: ["/og-image.png"],
  },
  keywords: [
    "kitangoding.id",
    "kitangoding id",
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

const organizationId = `${siteConfig.domain}#organization`;
const websiteId = `${siteConfig.domain}#website`;
const localBusinessId = `${siteConfig.domain}#localbusiness`;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    url: siteConfig.domain,
    description: siteConfig.description,
    logo: `${siteConfig.domain}/logo-kitangoding.webp`,
    email: siteConfig.email,
    sameAs: [
      siteConfig.instagram,
      siteConfig.tiktok,
      `https://wa.me/${siteConfig.phoneHref}`,
    ],
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
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
    publisher: {
      "@id": organizationId,
    },
    inLanguage: "id-ID",
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": localBusinessId,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.domain,
    image: `${siteConfig.domain}/og-image.png`,
    priceRange: "$$",
    telephone: `+${siteConfig.phoneHref}`,
    serviceType: [
      "Jasa pembuatan website company profile",
      "Jasa landing page",
      "Jasa toko online",
      "Jasa aplikasi web custom",
    ],
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
    sameAs: [
      siteConfig.instagram,
      siteConfig.tiktok,
      `https://wa.me/${siteConfig.phoneHref}`,
    ],
    parentOrganization: {
      "@id": organizationId,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

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
