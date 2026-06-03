import { Box } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { ShopCatalog } from "@/components/molecules/ShopCatalog";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { Reveal } from "@/components/atoms/Reveal";
import { getPublicCreatives } from "@/lib/public-content";

export async function ShopPage() {
  const shopCreatives = await getPublicCreatives();

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <section className="marketplace-grid pt-24 pb-14">
          <div className="container-shell text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-lg border border-success/20 bg-white px-3 py-2 marketplace-eyebrow text-success">
                <Box aria-hidden="true" className="size-3.5" />
                All Products
              </span>
              <h1 className="mx-auto mt-8 max-w-4xl text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
                Find Your Next Creative Asset
              </h1>
              <p className="mx-auto mt-5 max-w-2xl marketplace-hero-copy">
                Browse website templates, landing pages, and digital assets that can be adjusted for
                your business needs.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="marketplace-grid pb-16">
          <div className="container-shell">
            <ShopCatalog creatives={shopCreatives} />

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
