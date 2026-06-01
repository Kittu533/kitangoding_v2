import type { Metadata } from "next";
import { ShopPage } from "@/components/templates/ShopPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop Creative Assets",
  description:
    "Pilih template website, landing page, dan creative asset dari Kita Ngoding untuk kebutuhan bisnis kamu.",
  alternates: {
    canonical: `${siteConfig.domain}/shop`,
  },
};

export default function Page() {
  return <ShopPage />;
}
