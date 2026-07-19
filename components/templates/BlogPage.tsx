import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import type { PublicBlogCard, PublicBlogCategory } from "@/lib/public-content";
import { cn } from "@/lib/utils";

type BlogPageProps = {
  posts: PublicBlogCard[];
  categories: PublicBlogCategory[];
  activeCategory?: string;
};

export function BlogPage({ posts, categories, activeCategory }: BlogPageProps) {
  const selectedCategory = categories.some((item) => item.label === activeCategory) ? activeCategory : "Semua Artikel";
  const visiblePosts = selectedCategory === "Semua Artikel"
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <section className="marketplace-grid pt-24 pb-14">
          <div className="container-shell text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-lg border border-success/20 bg-white/80 px-3 py-2 marketplace-eyebrow text-success shadow-sm backdrop-blur">
                <Newspaper aria-hidden="true" className="size-3.5" />
                Blog
              </span>
              <h1 className="mx-auto mt-8 max-w-4xl text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
                Insight & inspirasi untuk website bisnismu
              </h1>
              <p className="mx-auto mt-5 max-w-2xl marketplace-hero-copy">
                Kumpulan tips praktis seputar website, branding, dan cara membuat calon pelanggan
                lebih cepat paham dengan bisnismu.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {categories.map((filter) => {
                  const active = filter.label === selectedCategory;
                  const href = filter.label === "Semua Artikel" ? "/blog" : `/blog?category=${encodeURIComponent(filter.label)}`;

                  return (
                    <Link
                      className={cn(
                        "rounded-xl border px-5 py-3 text-sm font-semibold shadow-sm transition-colors",
                        active
                          ? "border-success/30 bg-success-bg text-success"
                          : "border-border bg-white text-body hover:border-success/25 hover:text-foreground"
                      )}
                      href={href}
                      key={filter.label}
                    >
                      {filter.label}
                    </Link>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="marketplace-grid pb-20">
          <div className="container-shell">
            {visiblePosts.length > 0 ? (
              <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
                {visiblePosts.map((post, index) => (
                  <Reveal key={post.slug} className="h-full" delay={(index % 3) * 0.04}>
                    <article className="flex h-full flex-col bg-market p-7">
                      <div className="blog-thumb relative h-56 overflow-hidden rounded-lg border border-border/60 bg-white">
                        <Image alt={post.title} className="object-cover object-top" fill sizes="(max-width: 768px) 100vw, 33vw" src={post.image} />
                      </div>
                      <div className="mt-5 flex items-center justify-between gap-3 text-xs text-muted">
                        <span className="font-medium text-body/80">{post.date}</span>
                        <span className="rounded-full border border-success/20 bg-success-bg px-3 py-1 font-bold text-success">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="mt-3 min-h-16 text-xl leading-tight font-extrabold text-foreground">{post.title}</h2>
                      <p className="mt-4 min-h-20 leading-7 text-black">{post.excerpt}</p>
                      <ButtonLink
                        className="mt-auto w-full bg-ink !text-white shadow-soft hover:bg-navy"
                        data-analytics-event="blog_cta_click"
                        data-analytics-label={post.title}
                        href={`/blog/${post.slug}`}
                        icon={<ArrowUpRight aria-hidden="true" className="size-4" />}
                      >
                        Baca Artikel
                      </ButtonLink>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-white px-6 py-16 text-center shadow-card">
                <p className="text-lg font-bold text-foreground">Belum ada artikel pada kategori ini.</p>
                <Link className="mt-3 inline-flex text-sm font-semibold text-success underline underline-offset-4" href="/blog">
                  Lihat semua artikel
                </Link>
              </div>
            )}
          </div>
        </section>

        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}
