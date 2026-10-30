import studio from "@/components/marketing/Studio.module.css";
import { ShopCatalog } from "@/components/marketing/components/ShopCatalog";
import { StudioProjectCta, StudioHeader, StudioFooter } from "@/components/marketing/sections/StudioChrome";
import { Reveal } from "@/components/marketing/ui/Reveal";
import { getPublicCreatives } from "@/features/marketplace/queries";

export async function ShopPage() {
  const shopCreatives = await getPublicCreatives();

  return (
    <div className={`marketplace-page ${studio.publicPage}`}>
      <StudioHeader />
      <main id="konten">
        <section className="marketplace-grid pt-24 pb-14">
          <div className="container-shell text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-lg border border-success/20 bg-white px-3 py-2 marketplace-eyebrow text-success">
                Referensi website
              </span>
              <h1 className="mx-auto mt-8 max-w-4xl text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
                TEMUKAN ARAH VISUAL UNTUK BISNISMU
              </h1>
              <p className="mx-auto mt-5 max-w-2xl marketplace-hero-copy">
                Eksplorasi konsep website dan karya yang bisa menjadi awal diskusi. Desain dan fitur disesuaikan dengan kebutuhan bisnismu.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="marketplace-grid pb-16">
          <div className="container-shell">
            <ShopCatalog creatives={shopCreatives} allFilterLabel="Semua referensi" ctaLabel="Diskusikan konsep ini" />
          </div>
        </section>

        <StudioProjectCta />
      </main>
      <StudioFooter />
    </div>
  );
}
