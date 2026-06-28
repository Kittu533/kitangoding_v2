import type { Metadata } from "next";
import { connection } from "next/server";
import { BlogPage } from "@/components/templates/BlogPage";
import { getPublicBlogPosts } from "@/lib/public-content";
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
  const posts = await getPublicBlogPosts(12);
  const blogJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog Website UMKM, SEO, dan Branding",
      description:
        "Tips praktis seputar website UMKM, SEO, branding, UI/UX, dan strategi digital untuk membantu bisnis tampil lebih meyakinkan.",
      url: `${siteConfig.domain}/blog`,
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.domain,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Daftar Artikel Kita Ngoding",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.domain}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  ];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        type="application/ld+json"
      />
      <BlogPage />
    </>
  );
}
