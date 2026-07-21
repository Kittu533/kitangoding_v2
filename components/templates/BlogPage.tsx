import { Newspaper } from "lucide-react";
import { Reveal } from "@/components/atoms/Reveal";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import type { PublicBlogCard, PublicBlogCategory } from "@/lib/public-content";
import { BlogListing } from "@/components/templates/BlogListing";

type BlogPageProps = {
  posts: PublicBlogCard[];
  categories: PublicBlogCategory[];
};

export function BlogPage({ posts, categories }: BlogPageProps) {
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
            </Reveal>
          </div>
        </section>

        <BlogListing categories={categories} posts={posts} />

        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}
