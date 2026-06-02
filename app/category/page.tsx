import type { Metadata } from "next";
import { CategoryPage } from "@/components/templates/CategoryPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Category Creative Assets",
  description:
    "Pilih kategori template website, app concept, dashboard, dan branding yang sesuai dengan kebutuhan bisnis kamu.",
  alternates: {
    canonical: `${siteConfig.domain}/category`,
  },
};

export default function Page() {
  return <CategoryPage />;
}
