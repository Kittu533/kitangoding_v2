import { LandingPage } from "@/components/templates/LandingPage";
import { siteConfig } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.domain,
  image: `${siteConfig.domain}/og-image.png`,
  telephone: `+${siteConfig.phoneHref}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.addressLocality,
    addressRegion: siteConfig.addressRegion,
    addressCountry: siteConfig.addressCountry,
  },
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${siteConfig.phoneHref}`,
      email: siteConfig.email,
      areaServed: "ID",
      availableLanguage: ["id"],
    },
  ],
  priceRange: "$$",
  sameAs: [siteConfig.instagram, `https://wa.me/${siteConfig.phoneHref}`],
};

export default function Home() {
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
