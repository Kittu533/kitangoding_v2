import type { Metadata } from "next";
import { ProjectInquiryPage } from "@/components/templates/ProjectInquiryPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Konsultasi Project Website & Landing Page",
  description:
    "Kirim detail project website atau landing page kamu agar Kita Ngoding bisa membantu menyusun kebutuhan dan estimasi awal.",
  alternates: {
    canonical: `${siteConfig.domain}/project-inquiry`,
  },
  openGraph: {
    title: "Konsultasi Project Website & Landing Page | Kita Ngoding",
    description:
      "Kirim detail project website atau landing page kamu agar Kita Ngoding bisa membantu menyusun kebutuhan dan estimasi awal.",
    url: `${siteConfig.domain}/project-inquiry`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Konsultasi Project Website & Landing Page | Kita Ngoding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Konsultasi Project Website & Landing Page | Kita Ngoding",
    description:
      "Kirim detail project website atau landing page kamu agar Kita Ngoding bisa membantu menyusun kebutuhan dan estimasi awal.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <ProjectInquiryPage />;
}
