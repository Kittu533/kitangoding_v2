import studio from "@/components/marketing/Studio.module.css";
import type { Metadata } from "next";
import { connection } from "next/server";
import { Plus } from "lucide-react";
import { StudioProjectCta, StudioHeader, StudioFooter } from "@/components/marketing/sections/StudioChrome";
import { PricingPlanGrid } from "@/components/marketing/sections/PricingPlanGrid";
import { faqs } from "@/lib/landing-data";
import { getPublicPricing } from "@/features/pricing/queries";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Harga Jasa Pembuatan Website UMKM",
  description: `Lihat pilihan harga jasa website, landing page, dan toko online dari ${siteConfig.name} untuk kebutuhan dan anggaran UMKM.`,
  keywords: [
    siteConfig.name,
    "harga jasa pembuatan website",
    "biaya website UMKM",
    "harga landing page",
  ],
  alternates: {
    canonical: `${siteConfig.domain}/pricing`,
  },
  openGraph: {
    title: `Harga Jasa Pembuatan Website UMKM | ${siteConfig.name}`,
    description: `Pilih paket website, landing page, atau toko online dari ${siteConfig.name} sesuai kebutuhan dan anggaran bisnismu.`,
    url: `${siteConfig.domain}/pricing`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Harga Jasa Pembuatan Website UMKM | ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Harga Jasa Pembuatan Website UMKM | ${siteConfig.name}`,
    description: `Bandingkan paket website dari ${siteConfig.name} sesuai kebutuhan dan anggaran bisnismu.`,
    images: ["/og-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default async function Page() {
  await connection();
  const pricingPlans = await getPublicPricing();
  return <div className={studio.root}>
    <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} type="application/ld+json" />
    <StudioHeader />
    <main id="konten">
      <section className={studio.section}>
        <header className={studio.workHeading}><span className={studio.eyebrow}><i aria-hidden="true" />Investasi untuk bisnismu</span><h1 className="text-4xl font-bold tracking-tight md:text-5xl">MULAI DARI YANG<br /><em>KAMU BUTUHKAN.</em></h1><p>Scope jelas, proses transparan.<br />Pilih paket yang paling sesuai dengan kebutuhan bisnismu.</p></header>
        <PricingPlanGrid plans={pricingPlans} />
      </section>
      <section className={`${studio.section} ${studio.faq}`} aria-labelledby="pricing-faq">
        <div><span className={studio.eyebrow}><i aria-hidden="true" />Sebelum mulai</span><h2 id="pricing-faq">MASIH ADA<br /><em>PERTANYAAN?</em></h2><p>Beberapa hal yang perlu kamu ketahui sebelum memilih paket.</p></div>
        <div>{faqs.map(faq => <details key={faq.question}><summary>{faq.question}<Plus size={19} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
      </section>
      <StudioProjectCta />
    </main>
    <StudioFooter />
  </div>;
}
