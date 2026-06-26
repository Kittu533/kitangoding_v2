import type { Metadata } from "next";
import { connection } from "next/server";
import { BlogPage } from "@/components/templates/BlogPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog Website UMKM, SEO, dan Branding",
  description:
    "Tips praktis seputar website UMKM, SEO, branding, UI/UX, dan strategi digital untuk membantu bisnis tampil lebih meyakinkan.",
  alternates: {
    canonical: `${siteConfig.domain}/blog`,
  },
  openGraph: {
    title: "Blog Website UMKM, SEO, dan Branding | Kita Ngoding",
    description:
      "Tips praktis seputar website UMKM, SEO, branding, UI/UX, dan strategi digital untuk membantu bisnis tampil lebih meyakinkan.",
    url: `${siteConfig.domain}/blog`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog Website UMKM, SEO, dan Branding | Kita Ngoding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Website UMKM, SEO, dan Branding | Kita Ngoding",
    description:
      "Tips praktis seputar website UMKM, SEO, branding, UI/UX, dan strategi digital untuk membantu bisnis tampil lebih meyakinkan.",
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  await connection();

  return <BlogPage />;
}
