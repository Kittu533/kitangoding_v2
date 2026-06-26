import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Compass,
  Layers3,
  MonitorSmartphone,
  SearchCheck,
  Store,
  Workflow,
} from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { ShopCatalog } from "@/components/molecules/ShopCatalog";
import { PortfolioSection } from "@/components/organisms/PortfolioSection";
import { PricingPlanGrid } from "@/components/organisms/PricingPlanGrid";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { Reveal } from "@/components/atoms/Reveal";
import {
  getPublicBlogPosts,
  getPublicCreatives,
  getPublicPricing,
  type PublicBlogCard,
  type PublicCreativeCard,
  type PublicPricingPlan,
} from "@/lib/public-content";
import { faqs } from "@/lib/landing-data";
import { whatsappHref } from "@/lib/site";

const serviceSolutions = [
  {
    title: "Website Company Profile",
    description: "Profil digital untuk firma, agensi, pabrik, CV, dan bisnis lokal yang ingin terlihat lebih kredibel.",
    icon: MonitorSmartphone,
    points: ["Struktur halaman profil", "Kontak dan Google Maps", "SEO dasar nama brand"],
  },
  {
    title: "Landing Page Iklan",
    description: "Halaman fokus konversi untuk campaign Meta Ads, Google Ads, launching produk, atau lead generation.",
    icon: SearchCheck,
    points: ["Copy penawaran", "CTA WhatsApp / form lead", "Pixel dan analytics"],
  },
  {
    title: "Toko Online & Katalog",
    description: "Website produk untuk bisnis yang ingin menerima order lebih rapi tanpa bergantung penuh ke marketplace.",
    icon: Store,
    points: ["Katalog dan kategori", "Checkout / order inquiry", "Promo dan laporan dasar"],
  },
  {
    title: "Aplikasi Web Custom",
    description: "Dashboard internal, sistem operasional, atau web app khusus untuk alur kerja yang tidak cukup memakai template.",
    icon: Workflow,
    points: ["Mapping SOP", "Role user dan audit log", "Integrasi API / notifikasi"],
  },
] as const;

export async function MarketplaceHome() {
  const [creativeItems, pricingItems, blogItems] = await Promise.all([
    getPublicCreatives(6),
    getPublicPricing(),
    getPublicBlogPosts(3),
  ]);

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <MarketplaceHero />
        <ServicesOverviewSection />
        <VisualReferenceSection items={creativeItems} />
        <PortfolioSection />
        <MarketplacePricing plans={pricingItems} />
        <BlogSection posts={blogItems} />
        <HomeFaqSection />
        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}

function MarketplaceHero() {
  const marqueeItems = ["Company Profile", "Landing Page", "Toko Online", "Web App", "Dashboard"];

  return (
    <section className="marketplace-grid relative overflow-hidden pt-24 pb-16" id="hero">
      <div className="container-shell text-center">
        <Reveal>
          <span className="inline-flex rounded-lg border border-success/20 bg-white px-3 py-2 marketplace-eyebrow text-success">
            Jasa pembuatan website dan aplikasi web
          </span>
          <h1 className="mx-auto mt-8 max-w-3xl text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
            Website dan aplikasi web yang membuat bisnis terlihat lebih profesional
          </h1>
          <p className="mx-auto mt-5 max-w-2xl marketplace-hero-copy">
            Kami bantu bisnis menyusun website company profile, landing page, toko online, sampai
            sistem web custom dengan alur konten yang jelas, cepat dibuka, dan siap dipakai untuk
            promosi maupun operasional.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              className="shadow-soft"
              href={whatsappHref}
              icon={<ArrowRight aria-hidden="true" className="size-4" />}
              rel="noreferrer"
              target="_blank"
            >
              Konsultasi Project
            </ButtonLink>
            <ButtonLink href="#layanan" icon={<Compass aria-hidden="true" className="size-4" />} variant="outline">
              Lihat Layanan
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="mt-16" delay={1}>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
            <div className="mb-4 flex gap-2 px-2 pt-1">
              <span className="size-2 rounded-full bg-danger" />
              <span className="size-2 rounded-full bg-orange" />
              <span className="size-2 rounded-full bg-success" />
            </div>
            <div className="relative overflow-hidden rounded-xl bg-white">
              <Image
                alt="Preview template marketplace"
                className="h-auto w-full"
                height={1628}
                sizes="(max-width: 768px) 100vw, 1200px"
                src="/images/img-1.png"
                width={2878}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/88 via-45% to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 -bottom-10 h-24 rounded-full bg-white/95 blur-3xl"
              />
            </div>
          </div>
        </Reveal>

        <p className="mt-14 text-sm font-bold text-foreground">Dipakai untuk berbagai kebutuhan bisnis</p>
        <div className="marquee-shell mt-6">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center gap-6 text-lg font-extrabold text-black/65"
              >
                <span>{item}</span>
                <span className="size-1.5 rounded-full bg-success/55" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesOverviewSection() {
  return (
    <section className="marketplace-grid py-16" id="layanan">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-lg border border-success/20 bg-white px-3 py-2 marketplace-eyebrow text-success">
            Solusi yang paling sering dibutuhkan
          </span>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight text-foreground">
            Pilih jenis website atau aplikasi sesuai masalah bisnismu.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-body">
            Setiap project dimulai dari tujuan bisnisnya dulu: meningkatkan trust, menangkap lead,
            menjual produk, atau merapikan proses operasional.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {serviceSolutions.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.title} className="h-full" delay={index * 0.04}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-navy text-white">
                    <Icon aria-hidden="true" className="size-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold leading-tight text-foreground">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-body">{service.description}</p>
                  <div className="mt-6 space-y-3">
                    {service.points.map((point) => (
                      <div key={point} className="flex items-start gap-3 text-sm font-medium text-foreground">
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 flex-none text-success" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                  <ButtonLink className="mt-auto pt-6" href="/project-inquiry" variant="outline">
                    Bahas kebutuhan
                  </ButtonLink>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VisualReferenceSection({ items }: { items: PublicCreativeCard[] }) {
  return (
    <section className="marketplace-grid py-16" id="referensi">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-lg border border-orange/20 bg-white px-3 py-2 marketplace-eyebrow text-orange-dark">
              Inspirasi tampilan
            </span>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-foreground">
              Pilih arah visual, lalu kami sesuaikan dengan brand dan isi bisnismu.
            </h2>
          </div>
          <p className="text-base leading-8 text-body lg:text-lg">
            Section ini bukan katalog template mentah. Fungsinya membantu kamu lebih cepat memilih
            gaya tampilan: formal, campaign, katalog produk, dashboard, atau app-like interface.
          </p>
        </div>

        <div className="mt-10">
          <div className="mx-auto flex max-w-xl items-center justify-center gap-3 text-center">
            <span className="flex size-10 flex-none items-center justify-center rounded-xl bg-orange-light text-orange-dark">
              <Layers3 aria-hidden="true" className="size-5" />
            </span>
            <p className="text-sm font-semibold text-body">
              Referensi ini dipakai sebagai titik awal diskusi visual dan scope project.
            </p>
          </div>
          <ShopCatalog allFilterLabel="Semua referensi" creatives={items} ctaLabel="Konsultasi style ini" />
        </div>
      </div>
    </section>
  );
}

function MarketplacePricing({ plans }: { plans: PublicPricingPlan[] }) {
  return (
    <section className="marketplace-grid py-16" id="harga">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight text-foreground">
            Paket harga jasa pembuatan website dan aplikasi web.
          </h2>
          <p className="mt-5 text-base leading-8 text-body">
            Mulai dari landing page iklan sampai sistem operasional custom. Scope akhir tetap kami
            validasi setelah memahami kebutuhan bisnis dan konten yang tersedia.
          </p>
        </div>
        <div className="mt-12">
          <PricingPlanGrid plans={plans} delayStep={0.06} />
        </div>
      </div>
    </section>
  );
}

function BlogSection({ posts }: { posts: PublicBlogCard[] }) {
  return (
    <section className="marketplace-grid py-16" id="blog">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight text-foreground">
            Insight sebelum membuat website bisnis.
          </h2>
          <p className="mt-5 text-base leading-8 text-body">
            Panduan praktis untuk memilih jenis website, menyiapkan konten, dan memahami bagaimana
            website bisa mendukung penjualan maupun kredibilitas bisnis.
          </p>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.title} delay={index * 0.04}>
              <article className="bg-market p-7">
                <div className="blog-thumb relative h-52 overflow-hidden rounded-lg border border-border/60 bg-white">
                  <Image
                    alt={post.title}
                    className="object-cover object-top"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src={post.image}
                  />
                </div>
                <p className="mt-5 text-xs font-medium text-body/80">{post.date}</p>
                <p className="mt-3 inline-flex rounded-full border border-success/20 bg-success-bg px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-success">
                  {post.category}
                </p>
                <h3 className="mt-3 text-xl leading-tight font-extrabold text-foreground">{post.title}</h3>
                <p className="mt-4 min-h-16 leading-7 text-black">{post.excerpt}</p>
                <ButtonLink className="mt-5 w-full shadow-soft" href={`/blog/${post.slug}`}>
                  Baca Artikel
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeFaqSection() {
  return (
    <section className="marketplace-grid py-16" id="faq">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight text-foreground">
            Pertanyaan umum sebelum mulai project.
          </h2>
          <p className="mt-5 text-base leading-8 text-body">
            Jawaban singkat untuk hal yang biasanya ditanyakan sebelum membuat website company
            profile, landing page, toko online, atau aplikasi web custom.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl divide-y divide-border rounded-2xl border border-border bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 text-left font-bold text-foreground">
                <span>{faq.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 flex-none transition group-open:rotate-180"
                />
              </summary>
              <p className="px-6 pb-6 leading-8 text-body">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
