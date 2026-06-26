import type { Metadata } from "next";
import { ContactPage } from "@/components/templates/ContactPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak Jasa Pembuatan Website",
  description:
    "Hubungi Kita Ngoding untuk konsultasi website UMKM, landing page, dan toko online. Berlokasi di Sendangadi, Mlati, Sleman.",
  alternates: {
    canonical: `${siteConfig.domain}/contact`,
  },
  openGraph: {
    title: "Kontak Jasa Pembuatan Website | Kita Ngoding",
    description:
      "Hubungi Kita Ngoding untuk konsultasi website UMKM, landing page, dan toko online.",
    url: `${siteConfig.domain}/contact`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kontak Jasa Pembuatan Website | Kita Ngoding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontak Jasa Pembuatan Website | Kita Ngoding",
    description:
      "Hubungi Kita Ngoding untuk konsultasi website UMKM, landing page, dan toko online.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <ContactPage />;
}
