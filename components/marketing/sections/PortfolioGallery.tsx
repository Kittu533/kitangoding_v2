import { serializeJsonLd } from "@/lib/seo";
import { Suspense } from "react";
import { connection } from "next/server";
import studio from "@/components/marketing/Studio.module.css";
import { PortfolioGalleryGrid } from "@/components/marketing/sections/PortfolioGalleryGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { getPortfolioProjects } from "@/features/portfolio/queries";
import { siteConfig } from "@/lib/site";

async function PortfolioGalleryContent() {
  await connection();
  const items = await getPortfolioProjects();
  const categories = ["Semua", ...Array.from(new Set(items.map((item) => item.category)))];
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio Project Kitangoding",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.domain}/portfolio/${item.slug}`,
      name: item.name,
      description: item.result,
    })),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }}
        type="application/ld+json"
      />
      <p className="mt-4 text-sm font-semibold text-black">
        {items.length} proyek siap menjadi referensi kebutuhanmu.
      </p>

      <div className="mt-10">
        <PortfolioGalleryGrid categories={categories} items={items} />
      </div>
    </>
  );
}

export function PortfolioGallerySkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat daftar portfolio">
      <Skeleton className="mt-4 h-5 w-56" />
      <div className="mt-10 flex gap-3">
        {["w-20", "w-32", "w-28"].map((width) => (
          <Skeleton className={`h-10 ${width}`} key={width} />
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="overflow-hidden rounded-3xl border border-border bg-white" key={index}>
            <Skeleton className="aspect-[4/3] rounded-none" />
            <div className="space-y-3 p-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortfolioGallery() {
  return (
    <section className={studio.section} id="portfolio">
      <div>
        <header className={studio.workHeading}><span className={studio.eyebrow}><i aria-hidden="true" />Our projects</span><h1 className="text-4xl font-bold tracking-tight">IDE JADI <em>KARYA.</em></h1><p>Eksplorasi website dan aplikasi yang kami kerjakan.<br />Setiap project punya cerita dan kebutuhannya sendiri.</p></header>
        <Suspense fallback={<PortfolioGallerySkeleton />}>
          <PortfolioGalleryContent />
        </Suspense>
      </div>
    </section>
  );
}
