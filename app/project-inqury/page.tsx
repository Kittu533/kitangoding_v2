import type { Metadata } from "next";
import { ProjectInquiryPage } from "@/components/templates/ProjectInquiryPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Project Inquiry Kita Ngoding",
  description:
    "Kirim detail project website atau digital product kamu agar Kita Ngoding bisa membantu menyusun kebutuhan dan estimasi awal.",
  alternates: {
    canonical: `${siteConfig.domain}/project-inqury`,
  },
};

export default function Page() {
  return <ProjectInquiryPage />;
}
