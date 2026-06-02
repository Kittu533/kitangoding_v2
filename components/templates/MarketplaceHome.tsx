import Image from "next/image";
import {
  ArrowRight,
  CheckSquare,
  FileText,
} from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { CreativeCard } from "@/components/molecules/CreativeCard";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { Reveal } from "@/components/atoms/Reveal";
import {
  blogPosts,
  categories,
  creatives,
  marketplacePricing,
} from "@/lib/marketplace-data";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const categoryImages = [
  "/category-website.svg",
  "/category-app.svg",
  "/category-dashboard.svg",
  "/category-branding.svg",
] as const;

export function MarketplaceHome() {
  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <MarketplaceHero />
        <CategorySection />
        <CreativesSection />
        <MarketplacePricing />
        <BlogSection />
        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}

function MarketplaceHero() {
  return (
    <section className="marketplace-grid relative overflow-hidden pt-24 pb-16" id="hero">
      <div className="container-shell text-center">
        <Reveal>
          <span className="inline-flex rounded-lg border border-success/20 bg-white px-3 py-2 marketplace-eyebrow text-success">
            100+ website dan creative siap dikembangkan
          </span>
          <h1 className="mx-auto mt-8 max-w-3xl text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
            Website siap pakai untuk bisnis yang ingin tampil lebih meyakinkan
          </h1>
          <p className="mx-auto mt-5 max-w-2xl marketplace-hero-copy">
            Pilih contoh tampilan, sesuaikan dengan bisnismu, lalu kami bantu rapikan sampai siap
            dipakai untuk promosi, profil usaha, atau katalog produk.
          </p>
          <div className="mt-8">
            <ButtonLink
              className="shadow-soft"
              href="#shop"
              icon={<ArrowRight aria-hidden="true" className="size-4" />}
            >
              Browse Products
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="mt-16" delay={0.08}>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
            <div className="mb-4 flex gap-2 px-2 pt-1">
              <span className="size-2 rounded-full bg-danger" />
              <span className="size-2 rounded-full bg-orange" />
              <span className="size-2 rounded-full bg-success" />
            </div>
            <div className="overflow-hidden rounded-xl bg-preview-blue">
              <div className="marketplace-preview mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 px-8 pt-10 text-center text-navy md:px-12">
                <div className="flex w-full items-center justify-between text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <span className="size-8 rounded-lg bg-navy" />
                    <span>Kita Template</span>
                  </div>
                  <div className="hidden gap-6 md:flex">
                    <span>Features</span>
                    <span>Pricing</span>
                    <span>Blog</span>
                    <span>Testimonial</span>
                  </div>
                  <span className="rounded-full bg-orange px-4 py-2 text-white">Download</span>
                </div>
                <div>
                  <h2 className="mx-auto max-w-3xl text-4xl leading-tight font-extrabold md:text-6xl">
                    Website bisnismu terlihat rapi bahkan sebelum pelanggan bertanya
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl leading-8 text-navy/70">
                    Contoh halaman yang bisa diubah sesuai nama usaha, layanan, produk, dan tombol
                    WhatsApp kamu.
                  </p>
                </div>
                <div className="relative w-full max-w-3xl">
                  <div className="absolute left-0 bottom-14 hidden rounded-full bg-white/75 px-5 py-3 text-sm font-semibold text-navy shadow-card md:block">
                    Company Profile
                  </div>
                  <div className="absolute right-0 bottom-16 hidden rounded-lg bg-white/80 px-5 py-4 text-left text-sm font-semibold text-navy shadow-card md:block">
                    Order via WhatsApp
                  </div>
                  <div className="mx-auto w-72 rounded-t-4xl border-8 border-ink bg-white p-4 shadow-soft">
                    <div className="mx-auto mb-5 h-5 w-24 rounded-full bg-ink" />
                    <Image
                      alt="Contoh tampilan website di handphone"
                      className="h-auto w-full rounded-2xl"
                      height={800}
                      src="/process-launch.svg"
                      width={1200}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-14 text-sm font-bold text-foreground">Dipakai untuk berbagai kebutuhan bisnis</p>
        <div className="mt-6 flex flex-wrap justify-center gap-8 text-lg font-extrabold text-muted/40">
          {["Kedai", "Kursus", "Jasa", "Katalog", "Event"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="marketplace-grid py-16" id="kategori">
      <div className="container-shell">
        <h2 className="text-center text-4xl font-extrabold text-foreground">Explore Our Categories</h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.title} className="h-full" delay={index * 0.04}>
              <article className="group flex h-full min-h-72 flex-col items-center bg-white p-6 text-center">
                <div className="mx-auto flex h-32 max-w-52 items-center justify-center">
                  <Image
                    alt={`Ilustrasi ${category.title}`}
                    className="h-auto w-full max-w-44 opacity-90 transition group-hover:opacity-100"
                    height={166}
                    src={categoryImages[index]}
                    width={225}
                  />
                </div>
                <h3 className="mt-5 font-medium text-foreground">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{category.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CreativesSection() {
  const filters = ["All Creatives", "SaaS", "Business", "Technology", "Mobile App", "Dashboard", "Branding"];

  return (
    <section className="marketplace-grid py-16" id="shop">
      <div className="container-shell">
        <h2 className="text-center text-4xl font-extrabold text-foreground">Explore Our Creatives</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm font-semibold text-muted">
          {filters.map((filter, index) => (
            <span key={filter} className={index === 0 ? "border-b-2 border-success pb-3 text-success" : "pb-3"}>
              {filter}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
          {creatives.map((creative, index) => (
            <Reveal key={creative.name} delay={index * 0.04}>
              <CreativeCard creative={creative} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketplacePricing() {
  return (
    <section className="marketplace-grid py-16" id="harga">
      <div className="container-shell">
        <h2 className="text-center text-4xl font-extrabold text-foreground">Pricing Plan</h2>
        <div className="mx-auto mt-12 grid max-w-4xl gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
          {marketplacePricing.map((plan) => (
            <Reveal key={plan.name}>
              <article className="bg-market p-10">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-extrabold text-foreground">{plan.name}</h3>
                  {plan.note ? <span className="text-sm font-bold text-success underline">{plan.note}</span> : null}
                </div>
                <p className="mt-5 max-w-sm leading-8 text-muted">{plan.description}</p>
                <p className="mt-8 text-4xl font-extrabold text-success">{plan.price}</p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm font-semibold text-body">
                      <CheckSquare aria-hidden="true" className="mt-0.5 size-4 flex-none text-ink" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink className="mt-10 w-full shadow-soft" href={whatsappHref} rel="noreferrer" target="_blank">
                  {plan.cta}
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section className="marketplace-grid py-16" id="blog">
      <div className="container-shell">
        <h2 className="text-center text-4xl font-extrabold text-foreground">Read Our Blog</h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Reveal key={post.title} delay={index * 0.04}>
              <article className="bg-market p-7">
                <div className={cn("blog-thumb flex h-52 items-center justify-center rounded-lg", post.tone)}>
                  <FileText aria-hidden="true" className="size-16 text-white/85" />
                </div>
                <p className="mt-5 text-xs text-muted">{post.date}</p>
                <h3 className="mt-3 text-xl leading-tight font-extrabold text-foreground">{post.title}</h3>
                <p className="mt-4 min-h-16 leading-7 text-muted">{post.excerpt}</p>
                <ButtonLink className="mt-5 w-full shadow-soft" href="#blog">
                  View Details
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
