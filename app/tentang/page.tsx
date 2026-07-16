import type { Metadata } from "next";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import {
  FloatingNav,
  MarketplaceFooter,
} from "@/components/organisms/MarketplaceShell";
import { serviceAreas, siteConfig, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Jasa Website untuk UMKM",
  description:
    "Kenal lebih dekat dengan kitangoding.id, partner pembuatan website untuk UMKM, brand lokal, dan bisnis jasa di Jogja, Solo, Wonogiri, dan area Jawa.",
  keywords: ["kitangoding.id", "tentang kitangoding id", "jasa website UMKM"],
  alternates: {
    canonical: `${siteConfig.domain}/tentang`,
  },
  openGraph: {
    title: `Tentang ${siteConfig.name}`,
    description: `Kenali layanan, proses kerja, dan area layanan ${siteConfig.name}.`,
    url: `${siteConfig.domain}/tentang`,
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `Tentang ${siteConfig.name}`,
    description: `Kenali layanan, proses kerja, dan area layanan ${siteConfig.name}.`,
    images: ["/og-image.png"],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Tentang ${siteConfig.name}`,
    url: `${siteConfig.domain}/tentang`,
    mainEntity: {
      "@id": `${siteConfig.domain}#organization`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.domain}#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    url: siteConfig.domain,
    email: siteConfig.email,
    areaServed: serviceAreas,
    sameAs: [siteConfig.instagram, siteConfig.tiktok],
  },
];

export default function Page() {
  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <FloatingNav />
      <main id="konten">
        <section className="marketplace-grid pb-20 pt-28">
          <div className="container-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <Reveal>
              <p className="marketplace-eyebrow text-success">Tentang kitangoding.id</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-tight md:text-6xl">
                Partner website untuk bisnis yang ingin lebih mudah dipahami dan dihubungi.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-body">
                kitangoding.id membantu UMKM, brand lokal, dan bisnis jasa menyusun website
                company profile, landing page, toko online, serta aplikasi web sesuai kebutuhan
                operasional.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={whatsappHref}>Konsultasi via WhatsApp</ButtonLink>
                <ButtonLink href="/portfolio" variant="outline">
                  Lihat contoh proyek
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
                <h2 className="text-2xl font-extrabold">Yang kamu dapatkan</h2>
                <ul className="mt-6 space-y-4 leading-7 text-body">
                  <li>Struktur halaman dan copy dasar yang sesuai tujuan bisnis.</li>
                  <li>Website responsif dengan akses dan source code milikmu.</li>
                  <li>Scope, estimasi, dan tahapan kerja yang dibahas sebelum mulai.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <MarketplaceFooter />
    </div>
  );
}
