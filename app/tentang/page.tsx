import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import {
  CustomProjectCta,
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

const trustPoints = [
  { label: "Fokus", value: "UMKM, brand lokal, dan bisnis jasa" },
  { label: "Cara kerja", value: "Langsung, terbuka, dan bertahap" },
  { label: "Kepemilikan", value: "Akses dan source code milikmu" },
  { label: "Area layanan", value: "Jawa dan seluruh Indonesia" },
];

const principles = [
  {
    number: "01",
    title: "Mulai dari tujuan bisnis",
    description:
      "Kami cari tahu siapa pelangganmu, informasi apa yang mereka butuhkan, dan tindakan apa yang ingin kamu dapatkan dari website.",
  },
  {
    number: "02",
    title: "Struktur sebelum dekorasi",
    description:
      "Alur halaman dan copy dasar dirapikan lebih dulu supaya desain bukan hanya menarik, tetapi juga mudah dipahami.",
  },
  {
    number: "03",
    title: "Mudah dipakai setelah jadi",
    description:
      "Website dibuat responsif, punya arah pengelolaan yang jelas, dan tidak membuat bisnis bergantung pada proses yang rumit.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Diskusi kebutuhan",
    description: "Kita bahas bisnis, target pelanggan, tujuan website, dan batas scope proyek.",
  },
  {
    number: "02",
    title: "Susun arah",
    description: "Kami menyiapkan struktur halaman, prioritas konten, dan pendekatan visual.",
  },
  {
    number: "03",
    title: "Desain & development",
    description: "Tampilan dibangun responsif sambil memastikan alurnya tetap jelas dan ringan.",
  },
  {
    number: "04",
    title: "Review & serah terima",
    description: "Hasil direview bersama, dirapikan, lalu akses dan panduan dasar diserahkan.",
  },
];

const audiences = [
  "UMKM yang ingin terlihat lebih profesional",
  "Bisnis jasa yang butuh lebih banyak leads",
  "Brand lokal yang ingin punya rumah digital sendiri",
  "Bisnis dengan kebutuhan aplikasi web khusus",
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
        <section className="bg-white pb-16 pt-16 sm:pb-20 sm:pt-20">
          <div className="container-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <Reveal>
              <p className="marketplace-eyebrow text-orange-dark">Tentang kitangoding.id</p>
              <h1 className="mt-4 max-w-2xl !text-4xl !leading-tight !font-bold sm:!text-5xl">
                Kami membantu bisnis tampil jelas, dipercaya, dan mudah dihubungi.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-body sm:text-lg sm:leading-8">
                kitangoding.id adalah partner pembuatan website untuk UMKM, brand lokal, dan
                bisnis jasa yang ingin menyampaikan nilai bisnisnya dengan lebih meyakinkan.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={whatsappHref}>Konsultasi via WhatsApp</ButtonLink>
                <ButtonLink href="/portfolio" variant="outline">
                  Lihat contoh proyek
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <figure className="overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-card">
                <div className="overflow-hidden rounded-xl bg-market">
                  <Image
                    alt="Contoh website bisnis yang dirancang oleh kitangoding.id"
                    className="aspect-[16/10] h-auto w-full object-cover"
                    height={1536}
                    preload
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    src="/images/hero-img.webp"
                    width={2816}
                  />
                </div>
                <figcaption className="flex flex-col gap-2 px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <span className="marketplace-eyebrow text-orange-dark">Cara kami bekerja</span>
                  <p className="max-w-sm text-sm leading-6 text-body sm:text-right">
                    Setiap keputusan desain harus membantu pelanggan memahami bisnismu.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <section aria-label="Ringkasan kitangoding.id" className="border-y border-border bg-white">
          <div className="container-shell grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {trustPoints.map((item) => (
              <div className="py-6 sm:px-6 sm:first:pl-0 lg:py-8" key={item.label}>
                <p className="marketplace-eyebrow text-orange-dark">{item.label}</p>
                <p className="mt-2 max-w-xs font-semibold leading-6 text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="marketplace-grid py-20 md:py-28">
          <div className="container-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <Reveal>
              <p className="marketplace-eyebrow text-success">Kenapa kami ada</p>
              <h2 className="mt-5 max-w-lg !text-4xl !leading-tight sm:!text-5xl">
                Bisnis yang bagus seharusnya tidak sulit dipahami.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="space-y-6 text-lg leading-8 text-body">
                <p>
                  Banyak bisnis punya layanan yang kuat, tetapi calon pelanggan kesulitan
                  memahami apa yang ditawarkan, kenapa harus percaya, dan bagaimana cara mulai.
                  Website sering kali hanya menjadi pajangan, bukan alat bantu bisnis.
                </p>
                <p>
                  Karena itu, kami tidak memulai proyek dari warna atau animasi. Kami mulai dari
                  tujuan bisnis, pelanggan yang ingin dijangkau, dan pesan yang perlu disampaikan.
                  Baru setelah arahnya jelas, desain dan teknologinya mengikuti.
                </p>
                <blockquote className="border-l-4 border-orange bg-white px-6 py-5 text-xl font-semibold leading-8 text-foreground shadow-card">
                  Website yang baik membuat calon pelanggan lebih cepat paham dan lebih yakin
                  untuk mengambil langkah berikutnya.
                </blockquote>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="container-shell">
            <Reveal>
              <div className="max-w-3xl">
                <p className="marketplace-eyebrow text-orange-dark">Prinsip kerja</p>
                <h2 className="mt-5 !text-4xl !leading-tight sm:!text-5xl">
                  Sederhana dalam proses, jelas dalam keputusan.
                </h2>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {principles.map((principle, index) => (
                <Reveal delay={index * 0.06} key={principle.number}>
                  <article className="h-full rounded-3xl border border-border bg-market p-7 md:p-8">
                    <span className="text-sm font-bold tracking-[0.16em] text-orange-dark">
                      {principle.number}
                    </span>
                    <h3 className="mt-8 text-2xl font-bold">{principle.title}</h3>
                    <p className="mt-4 leading-7 text-body">{principle.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy py-20 text-white md:py-24">
          <div className="container-shell">
            <Reveal>
              <p className="marketplace-eyebrow text-orange-light">Cara kerja</p>
              <h2 className="mt-5 max-w-3xl !text-4xl !leading-tight !text-white sm:!text-5xl">
                Dari obrolan awal sampai website siap dipakai.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <Reveal delay={index * 0.06} key={step.number}>
                  <article className="h-full bg-navy p-7 md:p-8">
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-orange/50 text-sm font-bold text-orange-light">
                      {step.number}
                    </span>
                    <h3 className="mt-8 text-xl font-bold !text-white">{step.title}</h3>
                    <p className="mt-4 leading-7 !text-white/70">{step.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
            <Reveal>
              <p className="marketplace-eyebrow text-success">Cocok untuk siapa</p>
              <h2 className="mt-5 !text-4xl !leading-tight sm:!text-5xl">
                Partner yang pas kalau kamu butuh arah, bukan sekadar eksekusi.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-body">
                Kami paling cocok bekerja dengan bisnis yang terbuka berdiskusi tentang tujuan,
                pelanggan, dan prioritas sebelum masuk ke desain.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="grid gap-4 sm:grid-cols-2">
                {audiences.map((audience, index) => (
                  <li
                    className="flex min-h-32 items-start gap-4 rounded-2xl border border-border bg-market p-6"
                    key={audience}
                  >
                    <span className="flex size-8 flex-none items-center justify-center rounded-full bg-orange-light text-sm font-bold text-orange-dark">
                      {index + 1}
                    </span>
                    <span className="font-semibold leading-7 text-foreground">{audience}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}
