import { Box } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { CreativeCard } from "@/components/molecules/CreativeCard";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { Reveal } from "@/components/atoms/Reveal";
import { shopCreatives } from "@/lib/marketplace-data";

const filters = ["All Creatives", "Mobile App", "Framer", "Branding", "SaaS", "Figma", "Dashboard"];

export function ShopPage() {
  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <section className="marketplace-grid pt-24 pb-14">
          <div className="container-shell text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-lg border border-success/20 bg-white px-3 py-2 text-xs font-bold text-success">
                <Box aria-hidden="true" className="size-3.5" />
                All Products
              </span>
              <h1 className="mx-auto mt-8 max-w-4xl text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
                Find Your Next Creative Asset
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-body">
                Browse website templates, landing pages, and digital assets that can be adjusted for
                your business needs.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {filters.map((filter, index) => (
                  <span
                    key={filter}
                    className={
                      index === 0
                        ? "rounded-lg border border-success bg-white px-5 py-3 text-sm font-semibold text-foreground"
                        : "rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-muted"
                    }
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="marketplace-grid pb-16">
          <div className="container-shell">
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
              {shopCreatives.map((creative, index) => (
                <Reveal key={`${creative.name}-${index}`} delay={(index % 3) * 0.04}>
                  <CreativeCard creative={creative} />
                </Reveal>
              ))}
            </div>

            <div className="mt-14 text-center">
              <ButtonLink className="border border-ink bg-white text-foreground hover:bg-surface" href="#shop">
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
