import type { Metadata } from "next";
import { BlogPage } from "@/components/templates/BlogPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog & Insight Website UMKM",
  description:
    "Tips praktis seputar website, branding, UI/UX, dan strategi digital untuk membantu UMKM tampil lebih meyakinkan.",
  alternates: {
    canonical: `${siteConfig.domain}/blog`,
  },
};

export default function Page() {
  return <BlogPage />;
}
