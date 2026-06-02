import type { Metadata } from "next";
import { ContactPage } from "@/components/templates/ContactPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Kita Ngoding",
  description:
    "Hubungi Kita Ngoding untuk konsultasi website UMKM. Berlokasi di Sendangadi, Mlati, Sleman.",
  alternates: {
    canonical: `${siteConfig.domain}/contact`,
  },
};

export default function Page() {
  return <ContactPage />;
}
