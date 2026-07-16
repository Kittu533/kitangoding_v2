import type { Metadata } from "next";
import { ProjectInquiryPage } from "@/components/templates/ProjectInquiryPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Konsultasi Project Website & Landing Page",
  description:
    "Kirim detail project website atau landing page kamu agar kitangoding.id bisa membantu menyusun kebutuhan dan estimasi awal.",
  keywords: [
    siteConfig.name,
    "konsultasi project website",
    "brief website bisnis",
    "estimasi website UMKM",
  ],
  alternates: {
    canonical: `${siteConfig.domain}/project-inquiry`,
  },
  openGraph: {
    title: `Konsultasi Project Website & Landing Page | ${siteConfig.name}`,
    description:
      "Kirim detail project website atau landing page kamu agar kitangoding.id bisa membantu menyusun kebutuhan dan estimasi awal.",
    url: `${siteConfig.domain}/project-inquiry`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Konsultasi Project Website & Landing Page | ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Konsultasi Project Website & Landing Page | ${siteConfig.name}`,
    description:
      "Kirim detail project website atau landing page kamu agar kitangoding.id bisa membantu menyusun kebutuhan dan estimasi awal.",
    images: ["/og-image.png"],
  },
};

const projectInquiryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Konsultasi Project Website & Landing Page",
  description:
    "Halaman brief awal untuk konsultasi project website, landing page, toko online, dan aplikasi web bersama kitangoding.id.",
  url: `${siteConfig.domain}/project-inquiry`,
  mainEntity: {
    "@type": "Service",
    name: "Konsultasi Project Website",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: "ID",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteConfig.domain}/project-inquiry`,
    },
  },
};

export default function Page() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectInquiryJsonLd) }}
        type="application/ld+json"
      />
      <ProjectInquiryPage />
    </>
  );
}
