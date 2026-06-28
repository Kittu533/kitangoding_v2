import type { Metadata } from "next";
import { connection } from "next/server";
import { ShopPage } from "@/components/templates/ShopPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Template Website & Aset Kreatif",
  description:
    "Pilih template website, landing page, dan aset kreatif dari Kita Ngoding untuk kebutuhan bisnis kamu.",
  alternates: {
    canonical: `${siteConfig.domain}/shop`,
  },
  openGraph: {
    title: "Template Website & Aset Kreatif | Kita Ngoding",
    description:
      "Pilih template website, landing page, dan aset kreatif dari Kita Ngoding untuk kebutuhan bisnis kamu.",
    url: `${siteConfig.domain}/shop`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Template Website & Aset Kreatif | Kita Ngoding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Template Website & Aset Kreatif | Kita Ngoding",
    description:
      "Pilih template website, landing page, dan aset kreatif dari Kita Ngoding untuk kebutuhan bisnis kamu.",
    images: ["/og-image.png"],
  },
};

const shopJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Template Website & Aset Kreatif",
    description:
      "Template website, landing page, dan aset kreatif dari Kita Ngoding untuk kebutuhan bisnis.",
    url: `${siteConfig.domain}/shop`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Katalog Template Website Kita Ngoding",
    url: `${siteConfig.domain}/shop`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Template Website Company Profile",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Template Landing Page Campaign",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Template Toko Online UMKM",
      },
    ],
  },
];

export default async function Page() {
  await connection();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
        type="application/ld+json"
      />
      <ShopPage />
    </>
  );
}
