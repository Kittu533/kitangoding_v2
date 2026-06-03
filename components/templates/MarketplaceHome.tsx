import Image from "next/image";
import {
  ArrowRight,
} from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { ShopCatalog } from "@/components/molecules/ShopCatalog";
import { PortfolioSection } from "@/components/organisms/PortfolioSection";
import { PricingPlanGrid } from "@/components/organisms/PricingPlanGrid";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { Reveal } from "@/components/atoms/Reveal";
import {
  getPublicBlogPosts,
  getPublicCategories,
  getPublicCreatives,
  getPublicPricing,
  type PublicBlogCard,
  type PublicCategoryCard,
  type PublicCreativeCard,
  type PublicPricingPlan,
} from "@/lib/public-content";

export async function MarketplaceHome() {
  const [categoryItems, creativeItems, pricingItems, blogItems] = await Promise.all([
    getPublicCategories(4),
    getPublicCreatives(6),
    getPublicPricing(),
    getPublicBlogPosts(3),
  ]);

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <MarketplaceHero />
        <CategorySection items={categoryItems} />
        <CreativesSection items={creativeItems} />
        <PortfolioSection />
        <MarketplacePricing plans={pricingItems} />
        <BlogSection posts={blogItems} />
        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}

function MarketplaceHero() {
  const marqueeItems = ["Kedai", "Kursus", "Jasa", "Katalog", "Event"];

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

function CategorySection({ items }: { items: PublicCategoryCard[] }) {
  const categoryImages = [
    "/images/project-1.png",
    "/images/project-2.png",
    "/images/project-3.png",
    "/images/project-4.webp",
  ] as const;

  return (
    <section className="marketplace-grid py-16" id="kategori">
      <div className="container-shell">
        <h2 className="text-center text-4xl font-extrabold text-foreground">Explore Our Categories</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((category, index) => (
            <Reveal key={category.title} className="h-full" delay={index * 0.04}>
              <article className="group flex h-full min-h-72 flex-col items-center rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
                <div className="relative mx-auto aspect-square w-full max-w-52 overflow-hidden rounded-xl border border-border/60 bg-white">
                  <Image
                    alt={`Preview ${category.title}`}
                    className="object-cover opacity-90 transition group-hover:scale-[1.02] group-hover:opacity-100"
                    fill
                    sizes="(max-width: 768px) 50vw, 225px"
                    src={categoryImages[index % categoryImages.length]}
                  />
                </div>
                <h3 className="mt-5 font-medium text-foreground">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black">{category.description}</p>
                {category.countLabel ? (
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-success">
                    {category.countLabel}
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CreativesSection({ items }: { items: PublicCreativeCard[] }) {
  return (
    <section className="marketplace-grid py-16" id="shop">
      <div className="container-shell">
        <h2 className="text-center text-4xl font-extrabold text-foreground">Explore Our Creatives</h2>
        <ShopCatalog creatives={items} />
      </div>
    </section>
  );
}

function MarketplacePricing({ plans }: { plans: PublicPricingPlan[] }) {
  return (
    <section className="marketplace-grid py-16" id="harga">
      <div className="container-shell">
        <h2 className="text-center text-4xl font-extrabold text-foreground">Pricing Plan</h2>
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
        <h2 className="text-center text-4xl font-extrabold text-foreground">Read Our Blog</h2>
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
