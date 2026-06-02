import type { Metadata } from "next";
import { PricingPage } from "@/components/templates/PricingPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing & Plans",
  description:
    "Pilihan paket pembuatan website dan landing page untuk UMKM yang sesuai dengan kebutuhan dan budget.",
  alternates: {
    canonical: `${siteConfig.domain}/pricing`,
  },
};

export default function Page() {
  return <PricingPage />;
}
