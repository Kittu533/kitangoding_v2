import type { Metadata } from "next";
import { connection } from "next/server";
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

export default async function Page() {
  await connection();

  return <PricingPage />;
}
