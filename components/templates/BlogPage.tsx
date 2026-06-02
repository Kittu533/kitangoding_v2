import { ArrowUpRight, BarChart3, BookOpen, Boxes, Clock3, Layers3, Newspaper, Palette, Waves } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { blogPageFilters, blogPagePosts } from "@/lib/marketplace-data";
import { cn } from "@/lib/utils";

const thumbnailIcons = [Boxes, Clock3, BarChart3, Waves, Layers3, Palette] as const;

export function BlogPage() {
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
                {blogPageFilters.map((filter, index) => (
                  <span
                    key={filter}
                    className={cn(
                      "rounded-lg border bg-white px-5 py-3 text-sm font-semibold",
                      index === 0 ? "border-success text-foreground" : "border-border text-muted"
                    )}
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="marketplace-grid pb-20">
          <div className="container-shell">
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
              {blogPagePosts.map((post, index) => {
                const Icon = thumbnailIcons[index];

                return (
                  <Reveal key={post.title} delay={(index % 3) * 0.04}>
                    <article className="bg-market p-7">
                      <BlogThumb icon={Icon} tone={post.tone} />
                      <div className="mt-5 flex items-center justify-between gap-3 text-xs text-muted">
                        <span>{post.date}</span>
                        <span className="rounded-full bg-white px-3 py-1 font-bold text-success">{post.category}</span>
                      </div>
                      <h2 className="mt-3 min-h-16 text-xl leading-tight font-extrabold text-foreground">
                        {post.title}
                      </h2>
                      <p className="mt-4 min-h-20 leading-7 text-muted">{post.excerpt}</p>
                      <ButtonLink
                        className="mt-5 w-full bg-ink !text-white shadow-soft hover:bg-navy"
                        href="/blog"
                        icon={<ArrowUpRight aria-hidden="true" className="size-4" />}
                      >
                        View Details
                      </ButtonLink>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-14 text-center">
              <ButtonLink className="border border-ink bg-white text-foreground hover:bg-surface" href="/blog">
                Load More
              </ButtonLink>
            </div>
          </div>
        </section>

        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}

function BlogThumb({ icon: Icon, tone }: { icon: typeof Boxes; tone: string }) {
  return (
    <div className={cn("blog-thumb flex h-56 items-center justify-center rounded-lg", tone)}>
      <div className="relative z-10 flex size-32 items-center justify-center rounded-3xl border border-white/35 bg-white/28 shadow-soft backdrop-blur">
        <Icon aria-hidden="true" className="size-16 text-white/88" />
        <BookOpen
          aria-hidden="true"
          className="absolute -right-4 -bottom-4 size-12 rounded-2xl bg-white/30 p-2 text-white/80 backdrop-blur"
        />
      </div>
    </div>
  );
}
