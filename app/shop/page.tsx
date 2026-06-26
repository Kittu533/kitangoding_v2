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

export default async function Page() {
  await connection();

  return <ShopPage />;
}
