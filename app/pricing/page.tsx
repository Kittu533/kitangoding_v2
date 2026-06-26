import type { Metadata } from "next";
import { connection } from "next/server";
import { ChevronDown, Receipt } from "lucide-react";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { Reveal } from "@/components/atoms/Reveal";
import { PricingPlanGrid } from "@/components/organisms/PricingPlanGrid";
import { faqs } from "@/lib/landing-data";
import { getPublicPricing } from "@/lib/public-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Harga Jasa Pembuatan Website UMKM",
  description:
    "Pilihan paket pembuatan website, landing page, dan toko online untuk UMKM yang sesuai dengan kebutuhan dan budget.",
  alternates: {
    canonical: `${siteConfig.domain}/pricing`,
  },
  openGraph: {
    title: "Harga Jasa Pembuatan Website UMKM | Kita Ngoding",
    description:
      "Pilih paket website, landing page, atau toko online yang sesuai dengan kebutuhan dan budget bisnismu.",
    url: `${siteConfig.domain}/pricing`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harga Jasa Pembuatan Website UMKM | Kita Ngoding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harga Jasa Pembuatan Website UMKM | Kita Ngoding",
    description:
      "Pilih paket website, landing page, atau toko online yang sesuai dengan kebutuhan dan budget bisnismu.",
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

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <div className="marketplace-page min-h-screen bg-market text-foreground">
        <FloatingNav />
        <main id="konten">
          <section className="marketplace-grid relative overflow-hidden pt-24 pb-14">
            <div
              aria-hidden="true"
              className="absolute right-0 top-0 -mr-40 -mt-40 h-[500px] w-[500px] rounded-full bg-orange-light/40 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="absolute left-0 top-40 -ml-40 h-[400px] w-[400px] rounded-full bg-navy-light/40 blur-[100px]"
            />

            <div className="container-shell relative z-10 text-center">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange-light/60 px-4 py-2 marketplace-eyebrow text-orange-dark shadow-sm backdrop-blur-sm">
                  <Receipt aria-hidden="true" className="size-4" />
                  Transparan & Terjangkau
                </span>
                <h1 className="mx-auto mt-8 max-w-4xl font-display text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
                  Harga yang pas untuk <br className="hidden md:block" /> pertumbuhan bisnismu
                </h1>
                <p className="mx-auto mt-6 max-w-2xl marketplace-hero-copy">
                  Pilih paket yang paling sesuai dengan kebutuhanmu sekarang. Semua paket sudah
                  termasuk optimasi dasar, desain responsif, dan siap langsung dipakai.
                </p>
              </Reveal>
            </div>
          </section>

          <section className="marketplace-grid relative z-10 pb-24">
            <div className="container-shell">
              <PricingPlanGrid plans={pricingPlans} />

              <div className="mx-auto mt-32 max-w-6xl">
                <Reveal>
                  <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-extrabold text-foreground">
                      Pertanyaan yang sering diajukan
                    </h2>
                    <p className="text-muted">
                      Masih ragu? Berikut beberapa pertanyaan yang sering ditanyakan klien kami.
                    </p>
                  </div>
                </Reveal>

                <div className="border-y border-border/80 bg-transparent">
                  {faqs.map((faq, index) => (
                    <Reveal key={faq.question} delay={index * 0.1}>
                      <details className="group border-b border-border/80 last:border-b-0">
                        <summary className="flex list-none cursor-pointer select-none items-center justify-between gap-6 px-8 py-7 text-left md:px-12">
                          <h3 className="pr-4 text-xl font-semibold text-foreground md:text-2xl">
                            {faq.question}
                          </h3>
                          <span className="flex size-10 flex-none items-center justify-center rounded-full border border-border bg-white text-foreground transition-all duration-200 group-open:rotate-180 group-open:border-orange group-open:text-orange">
                            <ChevronDown aria-hidden="true" className="size-5" />
                          </span>
                        </summary>
                        <div className="px-8 pb-7 md:px-12">
                          <p className="max-w-4xl text-base leading-8 text-body md:text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </details>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <CustomProjectCta />
        </main>
        <MarketplaceFooter />
      </div>
    </>
  );
}
