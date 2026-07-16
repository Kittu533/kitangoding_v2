import type { Metadata } from "next";
import { connection } from "next/server";
import { ShopPage } from "@/components/templates/ShopPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Template Website & Aset Kreatif",
  description:
    "Pilih template website, landing page, dan aset kreatif dari kitangoding.id untuk kebutuhan bisnis kamu.",
  keywords: [
    siteConfig.name,
    "template website bisnis",
    "template landing page",
    "aset kreatif UMKM",
  ],
  alternates: {
    canonical: `${siteConfig.domain}/shop`,
  },
  openGraph: {
    title: `Template Website & Aset Kreatif | ${siteConfig.name}`,
    description:
      "Pilih template website, landing page, dan aset kreatif dari kitangoding.id untuk kebutuhan bisnis kamu.",
    url: `${siteConfig.domain}/shop`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Template Website & Aset Kreatif | ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Template Website & Aset Kreatif | ${siteConfig.name}`,
    description:
      "Pilih template website, landing page, dan aset kreatif dari kitangoding.id untuk kebutuhan bisnis kamu.",
    images: ["/og-image.png"],
  },
};

const shopJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Template Website & Aset Kreatif",
    description:
      "Template website, landing page, dan aset kreatif dari kitangoding.id untuk kebutuhan bisnis.",
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
    name: "Katalog Template Website kitangoding.id",
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
