import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Compass,
  Layers3,
  MonitorSmartphone,
  Quote,
  SearchCheck,
  Store,
  Workflow,
} from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { ShopCatalog } from "@/components/molecules/ShopCatalog";
import { HeroPreviewCarousel } from "@/components/molecules/HeroPreviewCarousel";
import { PortfolioSection } from "@/components/organisms/PortfolioSection";
import { PricingPlanGrid } from "@/components/organisms/PricingPlanGrid";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { Reveal } from "@/components/atoms/Reveal";
import {
  getPublicBlogPosts,
  getPublicPricing,
  getPublicServices,
  type PublicBlogCard,
  type PublicCreativeCard,
  type PublicPricingPlan,
  type PublicServiceCard,
} from "@/lib/public-content";
import { advantages, faqs, painPoints, solutions, testimonials } from "@/lib/landing-data";
import { serviceLandingPages } from "@/lib/service-landing-pages";
import { whatsappHref } from "@/lib/site";

const serviceSolutions = [
  {
    title: "Website Company Profile",
    href: serviceLandingPages[0].pathname,
    description:
      "Bikin bisnismu langsung terlihat kredibel begitu calon klien buka websitenya—profil rapi yang menjawab “ini bisnis serius” dalam 5 detik pertama.",
    icon: MonitorSmartphone,
    points: ["Profil & layanan yang meyakinkan", "Kontak + Google Maps", "SEO nama brand di Google"],
    span: "md:col-span-2",
  },
  {
    title: "Landing Page Iklan",
    href: serviceLandingPages[1].pathname,
    description:
      "Ubah klik iklan jadi chat WhatsApp. Satu halaman fokus konversi untuk Meta Ads, Google Ads, atau launching produk—dirancang biar pengunjung ambil aksi.",
    icon: SearchCheck,
    points: ["Copy penawaran yang menjual", "CTA WhatsApp / form lead", "Pixel & analytics siap pakai"],
    span: "md:col-span-1",
  },
  {
    title: "Toko Online & Katalog",
    href: serviceLandingPages[2].pathname,
    description:
      "Terima order lebih rapi tanpa terus bagi-bagi margin ke marketplace. Katalog jelas + alur order yang gampang bikin pembeli nggak ragu checkout.",
    icon: Store,
    points: ["Katalog & kategori produk", "Checkout / order via WA", "Promo & laporan penjualan"],
    span: "md:col-span-1",
  },
  {
    title: "Aplikasi Web Custom",
    description:
      "Rapikan operasional yang masih manual lewat Excel & WhatsApp. Dashboard dan sistem khusus yang dibangun persis sesuai alur kerja bisnismu.",
    icon: Workflow,
    points: ["Sesuai SOP bisnismu", "Role user & audit log", "Integrasi API / notifikasi"],
    span: "md:col-span-2",
  },
] as const;

export async function MarketplaceHome() {
  const [pricingItems, blogItems, serviceItems] = await Promise.all([
    getPublicPricing(),
    getPublicBlogPosts(3),
    getPublicServices(4),
  ]);

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <MarketplaceHero />
        <ProblemSolutionSection />
        <ServicesOverviewSection services={serviceItems} />
        <PortfolioSection />
        <TestimonialsSection />
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
  const focusAreas = ["Company Profile", "Landing Page", "Toko Online", "Web App", "Dashboard"];

  return (
    <section className="marketplace-grid relative overflow-hidden pt-24 pb-2" id="hero">
      <div className="container-shell text-center">
        <Reveal duration={0.95} parallax={14}>
          <span className="inline-flex rounded-lg border border-success/20 bg-white px-3 py-2 marketplace-eyebrow text-success">
            Jasa pembuatan website untuk bisnis
          </span>
          <h1 className="mx-auto mt-8 max-w-3xl text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
            Website bisnis yang bikin calon pelanggan percaya dan langsung menghubungi kamu.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl marketplace-hero-copy">
            Kita Ngoding adalah jasa pembuatan website untuk UMKM, brand lokal, dan bisnis jasa di
            Jogja, Solo, Wonogiri, dan area Jawa. Dari company profile, landing page iklan, toko online,
            sampai web app custom, kami rapikan copy, alur, dan tampilannya supaya pengunjung paham,
            percaya, lalu chat.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              className="shadow-soft"
              href={whatsappHref}
              icon={<ArrowRight aria-hidden="true" className="size-4" />}
              rel="noreferrer"
              target="_blank"
            >
              Konsultasi Gratis via WhatsApp
            </ButtonLink>
            <ButtonLink href="#layanan" icon={<Compass aria-hidden="true" className="size-4" />} variant="outline">
              Lihat Layanan
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm font-medium text-body">
            Gratis konsultasi &amp; estimasi—tanpa wajib lanjut.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-body">
            Fokus layanan: website company profile, landing page, toko online, dan aplikasi web custom
            untuk bisnis yang ingin tampil lebih kredibel di Google.
          </p>
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3 text-sm font-semibold text-body">
            <span className="rounded-lg border border-border bg-white px-4 py-2">Company profile</span>
            <span className="rounded-lg border border-border bg-white px-4 py-2">Landing page iklan</span>
            <span className="rounded-lg border border-border bg-white px-4 py-2">Toko online</span>
            <span className="rounded-lg border border-border bg-white px-4 py-2">Web app custom</span>
          </div>
        </Reveal>

        <Reveal className="mt-16" delay={0.2} duration={1.05} parallax={26} variant="zoom-in">
          <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
            <div className="mb-4 flex gap-2 px-2 pt-1">
              <span className="size-2 rounded-full bg-danger" />
              <span className="size-2 rounded-full bg-orange" />
              <span className="size-2 rounded-full bg-success" />
            </div>
            <div className="relative overflow-hidden rounded-xl bg-white">
              <HeroPreviewCarousel />
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

        <div className="mt-14">
          <p className="text-sm font-semibold tracking-[0.12em] text-body uppercase">
            Yang paling sering kami bantu
          </p>
          <div className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-3">
            {focusAreas.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const advantageIcons = [Compass, Layers3, Workflow, SearchCheck] as const;

function ProblemSolutionSection() {
  return (
    <section className="marketplace-grid py-4" id="masalah">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-3xl text-center" duration={0.95} parallax={10}>
          <span className="inline-flex rounded-lg border border-success/20 bg-white px-3 py-2 marketplace-eyebrow text-success">
            Kenapa website lama sering gagal jualan
          </span>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight text-foreground">
            Punya website tapi calon pelanggan tetap ragu? Ini biasanya penyebabnya.
          </h2>
          <p className="mt-4 text-base leading-7 text-body">
            Kabar baiknya: setiap masalah di bawah ini ada lawannya. Lihat bagaimana kami ubah website
            yang cuma “ada” menjadi website yang benar-benar bekerja menjual.
          </p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal className="h-full" variant="fade-right">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-danger/20 bg-gradient-to-b from-danger/[0.06] to-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 flex-none items-center justify-center rounded-full bg-danger/10 text-danger">
                  <CircleAlert aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="marketplace-eyebrow text-danger">Sebelum</p>
                  <h3 className="text-xl font-extrabold leading-tight text-foreground">Website yang bikin calon pelanggan ragu</h3>
                </div>
              </div>
              <ul className="mt-6 space-y-4">
                {painPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 rounded-xl border border-danger/10 bg-white/70 p-4 text-sm leading-7 text-body">
                    <CircleAlert aria-hidden="true" className="mt-0.5 size-5 flex-none text-danger" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="flex items-center justify-center" aria-hidden="true">
            <span className="inline-flex size-12 items-center justify-center rounded-full border border-success/30 bg-white text-success shadow-card">
              <ArrowRight className="size-5 lg:block hidden" />
              <ArrowRight className="size-5 rotate-90 lg:hidden" />
            </span>
          </div>

          <Reveal className="h-full" delay={0.1} duration={0.95} variant="fade-left">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-success/30 bg-gradient-to-b from-success/[0.08] to-white p-7 shadow-card">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 flex-none items-center justify-center rounded-full bg-success/15 text-success">
                  <CheckCircle2 aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="marketplace-eyebrow text-success">Sesudah dibenahi</p>
                  <h3 className="text-xl font-extrabold leading-tight text-foreground">Website yang siap mengubah pengunjung jadi pembeli</h3>
                </div>
              </div>
              <ul className="mt-6 space-y-4">
                {solutions.map((point) => (
                  <li key={point} className="flex items-start gap-3 rounded-xl border border-success/15 bg-white/70 p-4 text-sm leading-7 text-foreground">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 flex-none text-success" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-14">
          <Reveal className="flex flex-col items-center gap-2 text-center" duration={0.9}>
            <p className="text-lg font-extrabold text-foreground">Plus, alasan klien akhirnya percaya ke kami</p>
            <p className="max-w-2xl text-sm leading-7 text-body">
              Bukan sekadar bikin tampilan baru kami pikirkan pesan, struktur, dan proses supaya hasilnya benar-benar terasa di bisnismu.
            </p>
          </Reveal>

          <BentoGrid className="mt-8 md:auto-rows-[1fr] md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item, index) => {
              const Icon = advantageIcons[index % advantageIcons.length];
              return (
                <Reveal
                  key={item.title}
                  className="h-full"
                  delay={(index + 1) * 0.08}
                  duration={0.9}
                  variant={index % 2 === 0 ? "fade-up" : "zoom-in"}
                >
                  <div className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-success/30 hover:shadow-card">
                    <span className="inline-flex size-11 flex-none items-center justify-center rounded-xl bg-success/10 text-success transition duration-200 group-hover:bg-success group-hover:text-white">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="text-lg font-extrabold leading-snug text-foreground">{item.title}</h3>
                    <p className="text-sm leading-7 text-body">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="marketplace-grid py-16" id="testimoni">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-3xl text-center" duration={0.95} parallax={10}>
          <span className="inline-flex rounded-lg border border-success/20 bg-white px-3 py-2 marketplace-eyebrow text-success">
            Kata mereka yang sudah dibantu
          </span>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight text-foreground">
            Bisnis yang website-nya jadi lebih gampang menjelaskan dan closing.
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal
              key={item.name}
              className="h-full"
              delay={index * 0.08}
              duration={0.9}
              variant={index % 2 === 0 ? "fade-up" : "zoom-in"}
            >
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-sm">
                <Quote aria-hidden="true" className="size-7 text-success" />
                <blockquote className="mt-4 flex-1 text-sm leading-7 text-foreground">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5">
                  <p className="text-sm font-extrabold text-foreground">{item.name}</p>
                  <p className="mt-1 text-xs font-medium text-body">{item.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesOverviewSection({ services }: { services: PublicServiceCard[] }) {
  return (
    <section className="marketplace-grid py-4" id="layanan">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-3xl text-center" duration={0.95} parallax={10}>
          <span className="inline-flex rounded-lg border border-success/20 bg-white px-3 py-2 marketplace-eyebrow text-success">
            Layanan utama
          </span>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight text-foreground">
            Satu partner untuk semua kebutuhan website bisnismu.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-body">
            Apa pun jenis websitemu, tujuannya sama: calon pelanggan paham bisnismu, percaya dengan
            penawaranmu, lalu langsung tahu tombol mana yang harus diklik untuk menghubungi.
          </p>
        </Reveal>

        <BentoGrid className="mt-12 auto-rows-auto items-stretch md:auto-rows-auto">
          {serviceSolutions.map((service, index) => {
            const Icon = service.icon;
            const publicService = services[index];
            const hasHref = "href" in service;

            return (
              <Reveal
                key={service.title}
                className={cn("h-full", service.span)}
                delay={index * 0.08}
                duration={0.95}
                variant={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <BentoGridItem
                  className="h-full min-h-[20rem] border-border bg-white shadow-sm hover:shadow-card"
                  icon={
                    <div className="flex size-12 items-center justify-center rounded-xl bg-navy text-white">
                      <Icon aria-hidden="true" className="size-6" />
                    </div>
                  }
                  title={<span className="text-xl font-extrabold text-foreground">{service.title}</span>}
                  description={
                    <div className="flex h-full flex-col">
                      <p className="text-sm leading-7 text-body">
                        {publicService?.description || service.description}
                      </p>
                      <div className="mt-5 space-y-2.5">
                        {service.points.map((point) => (
                          <div key={point} className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                            <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 flex-none text-success" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        {hasHref ? (
                          <ButtonLink href={service.href} variant="outline">
                            Detail layanan
                          </ButtonLink>
                        ) : null}
                        <ButtonLink href="/project-inquiry">Minta estimasi</ButtonLink>
                      </div>
                    </div>
                  }
                />
              </Reveal>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}

export function VisualReferenceSection({ items }: { items: PublicCreativeCard[] }) {
  return (
    <section className="marketplace-grid py-6" id="referensi">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal duration={0.95} parallax={10}>
            <span className="inline-flex rounded-lg border border-orange/20 bg-white px-3 py-2 marketplace-eyebrow text-orange-dark">
              Inspirasi tampilan
            </span>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-foreground">
              Pilih arah visual, lalu kami sesuaikan dengan brand dan isi bisnismu.
            </h2>
          </Reveal>
          <Reveal delay={0.12} duration={0.95} variant="fade-left">
            <p className="text-base leading-8 text-body lg:text-lg">
            Section ini bukan katalog template mentah. Fungsinya membantu kamu lebih cepat memilih
            gaya tampilan: formal, campaign, katalog produk, dashboard, atau app-like interface.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10" delay={0.08} duration={0.95} variant="zoom-in">
          <div className="mx-auto flex max-w-xl items-center justify-center gap-3 text-center">
            <span className="flex size-10 flex-none items-center justify-center rounded-xl bg-orange-light text-orange-dark">
              <Layers3 aria-hidden="true" className="size-5" />
            </span>
            <p className="text-sm font-semibold text-body">
              Referensi ini dipakai sebagai titik awal diskusi visual dan scope project.
            </p>
          </div>
          <ShopCatalog allFilterLabel="Semua referensi" creatives={items} ctaLabel="Konsultasi style ini" />
        </Reveal>
      </div>
    </section>
  );
}

function MarketplacePricing({ plans }: { plans: PublicPricingPlan[] }) {
  return (
    <section className="marketplace-grid py-6" id="harga">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-3xl text-center" duration={0.95} parallax={10}>
          <h2 className="text-4xl font-extrabold leading-tight text-foreground">
            Paket harga yang gampang dipilih sebelum konsultasi.
          </h2>
          <p className="mt-5 text-base leading-8 text-body">
            Mulai dari website profil sampai sistem custom. Harga final tetap kami validasi setelah
            tahu jumlah halaman, fitur, dan bahan konten yang sudah kamu punya.
          </p>
        </Reveal>
        <Reveal className="mt-12" delay={0.12} duration={0.95} variant="zoom-in">
          <PricingPlanGrid plans={plans} delayStep={0.06} />
        </Reveal>
      </div>
    </section>
  );
}

function BlogSection({ posts }: { posts: PublicBlogCard[] }) {
  return (
    <section className="marketplace-grid py-6" id="blog">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-3xl text-center" duration={0.95} parallax={10}>
          <h2 className="text-4xl font-extrabold leading-tight text-foreground">
            Panduan singkat sebelum bikin website bisnis.
          </h2>
          <p className="mt-5 text-base leading-8 text-body">
            Baca dulu kalau kamu masih bingung harus mulai dari company profile, landing page,
            toko online, atau sistem web custom.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal
              key={post.title}
              delay={index * 0.08}
              duration={0.95}
              variant={index % 2 === 0 ? "fade-up" : "zoom-in"}
            >
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
    <section className="marketplace-grid py-6" id="faq">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-3xl text-center" duration={0.95} parallax={10}>
          <h2 className="text-4xl font-extrabold leading-tight text-foreground">
            Pertanyaan umum sebelum mulai project.
          </h2>
          <p className="mt-5 text-base leading-8 text-body">
            Jawaban singkat untuk hal yang biasanya ditanyakan sebelum membuat website company
            profile, landing page, toko online, atau aplikasi web custom.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-4xl" delay={0.12} duration={1} variant="zoom-in">
          <div className="divide-y divide-border rounded-2xl border border-border bg-white">
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
        </Reveal>
      </div>
    </section>
  );
}
