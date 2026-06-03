import { connection } from "next/server";
import { LandingPage } from "@/components/templates/LandingPage";
import { siteConfig } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.domain,
  telephone: siteConfig.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.addressLocality,
    addressRegion: siteConfig.addressRegion,
    addressCountry: siteConfig.addressCountry,
  },
  priceRange: "$$",
  sameAs: [siteConfig.instagram, `https://wa.me/${siteConfig.phoneHref}`],
};

export default async function Home() {
  await connection();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <LandingPage />
    </>
  );
}
