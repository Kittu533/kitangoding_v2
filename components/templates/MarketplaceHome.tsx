import { Suspense, type ComponentProps } from "react";
import {
  ArrowRight,
  ChevronDown,
  Compass,
  Layers3,
  Quote,
} from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { Features as ProblemSolutionFeatures } from "@/components/ui/features-4";
import { Features as ServicesFeatures } from "@/components/ui/features-8";
import { ShopCatalog } from "@/components/molecules/ShopCatalog";
import { HeroPreviewCarousel } from "@/components/molecules/HeroPreviewCarousel";
import { PortfolioSection } from "@/components/organisms/PortfolioSection";
import { PricingPlanGrid } from "@/components/organisms/PricingPlanGrid";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { Reveal as BaseReveal } from "@/components/atoms/Reveal";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getPublicPricing,
  type PublicCreativeCard,
  type PublicPricingPlan,
} from "@/lib/public-content";
import { faqs, testimonials } from "@/lib/landing-data";
import { whatsappHref } from "@/lib/site";

function Reveal(props: ComponentProps<typeof BaseReveal>) {
  return <BaseReveal {...props} once={false} />;
}

async function HomePricing() {
  return <MarketplacePricing plans={await getPublicPricing()} />;
}

function HomeDataSectionSkeleton({ cards }: { cards: number }) {
  return (
    <section aria-busy="true" aria-label="Memuat konten" className="marketplace-grid py-20">
      <div className="container-shell">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="mt-5 h-10 max-w-xl" />
        <Skeleton className="mt-4 h-5 max-w-2xl" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: cards }, (_, index) => (
            <div className="space-y-4 rounded-3xl border border-border bg-white p-6" key={index}>
              <Skeleton className="size-12 rounded-xl" />
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MarketplaceHome() {

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <MarketplaceHero />
        <ProblemSolutionSection />
        <ServicesOverviewSection />
        <PortfolioSection />
        <TestimonialsSection />
        <Suspense fallback={<HomeDataSectionSkeleton cards={2} />}>
          <HomePricing />
        </Suspense>
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
            <span className="sm:hidden">Website untuk bisnis</span>
            <span className="hidden sm:inline">Jasa pembuatan website untuk bisnis</span>
          </span>
          <h1 className="mx-auto mt-7 max-w-3xl text-[2.25rem] leading-[1.08] font-extrabold text-foreground sm:mt-8 sm:text-5xl sm:leading-tight md:text-6xl">
            <span className="sm:hidden">Website bisnis yang bikin pelanggan percaya.</span>
            <span className="hidden sm:inline">
              Website bisnis yang bikin calon pelanggan percaya dan langsung menghubungi kamu.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl marketplace-hero-copy">
            <span className="sm:hidden">
              Website profesional agar bisnismu lebih dipercaya dan mudah dihubungi.
            </span>
            <span className="hidden sm:inline">
              kitangoding.id adalah jasa pembuatan website untuk UMKM, brand lokal, dan bisnis jasa di
              Jogja, Solo, Wonogiri, dan area Jawa. Dari company profile, landing page iklan, toko
              online, sampai web app custom, kami rapikan copy, alur, dan tampilannya supaya pengunjung
              paham, percaya, lalu chat.
            </span>
          </p>
          <div className="mt-7 grid grid-cols-2 justify-center gap-2 sm:mt-8 sm:flex sm:gap-3">
            <ButtonLink
              className="w-full shadow-soft sm:w-auto"
              href={whatsappHref}
              icon={<ArrowRight aria-hidden="true" className="size-4" />}
              rel="noreferrer"
              target="_blank"
            >
              <span className="sm:hidden">Konsultasi</span>
              <span className="hidden sm:inline">Konsultasi Gratis via WhatsApp</span>
            </ButtonLink>
            <ButtonLink
              className="w-full sm:w-auto"
              href="#layanan"
              icon={<Compass aria-hidden="true" className="size-4" />}
              variant="outline"
            >
              <span className="sm:hidden">Layanan</span>
              <span className="hidden sm:inline">Lihat Layanan</span>
            </ButtonLink>
          </div>
          <p className="mt-4 hidden text-sm font-medium text-body sm:block">
            Gratis konsultasi &amp; estimasi—tanpa wajib lanjut.
          </p>
        </Reveal>

        <Reveal className="mt-10 sm:mt-16" delay={0.2} duration={1.05} parallax={26} variant="zoom-in">
          <div className="rounded-2xl border border-border bg-white p-2 shadow-card sm:p-4">
            <div className="mb-2 flex gap-2 px-2 pt-1 sm:mb-4">
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

        <div className="mt-14 hidden sm:block">
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

function ProblemSolutionSection() {
  return <ProblemSolutionFeatures />;
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

export function ServicesOverviewSection() {
  return <ServicesFeatures />;
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
          <h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Paket harga yang gampang dipilih sebelum konsultasi.
          </h2>
          <p className="mt-4 text-sm leading-7 text-body sm:mt-5 sm:text-base sm:leading-8">
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

// function BlogSection({ posts }: { posts: PublicBlogCard[] }) {
//   return (
//     <section className="marketplace-grid py-6" id="blog">
//       <div className="container-shell">
//         <Reveal className="mx-auto max-w-3xl text-center" duration={0.95} parallax={10}>
//           <h2 className="text-4xl font-extrabold leading-tight text-foreground">
//             Panduan singkat sebelum bikin website bisnis.
//           </h2>
//           <p className="mt-5 text-base leading-8 text-body">
//             Baca dulu kalau kamu masih bingung harus mulai dari company profile, landing page,
//             toko online, atau sistem web custom.
//           </p>
//         </Reveal>
//         <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
//           {posts.map((post, index) => (
//             <Reveal
//               key={post.title}
//               delay={index * 0.08}
//               duration={0.95}
//               variant={index % 2 === 0 ? "fade-up" : "zoom-in"}
//             >
//               <article className="bg-market p-7">
//                 <div className="blog-thumb relative h-52 overflow-hidden rounded-lg border border-border/60 bg-white">
//                   <Image
//                     alt={post.title}
//                     className="object-cover object-top"
//                     fill
//                     sizes="(max-width: 768px) 100vw, 33vw"
//                     src={post.image}
//                   />
//                 </div>
//                 <p className="mt-5 text-xs font-medium text-body/80">{post.date}</p>
//                 <p className="mt-3 inline-flex rounded-full border border-success/20 bg-success-bg px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-success">
//                   {post.category}
//                 </p>
//                 <h3 className="mt-3 text-xl leading-tight font-extrabold text-foreground">{post.title}</h3>
//                 <p className="mt-4 min-h-16 leading-7 text-black">{post.excerpt}</p>
//                 <ButtonLink className="mt-5 w-full shadow-soft" href={`/blog/${post.slug}`}>
//                   Baca Artikel
//                 </ButtonLink>
//               </article>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

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
