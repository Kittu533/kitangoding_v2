import { Suspense } from "react";
import { connection } from "next/server";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { PortfolioGalleryGrid } from "@/components/organisms/PortfolioGalleryGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { getPortfolioProjects } from "@/lib/public-content";
import { siteConfig } from "@/lib/site";

async function PortfolioGalleryContent() {
  await connection();
  const items = await getPortfolioProjects();
  const categories = ["Semua", ...Array.from(new Set(items.map((item) => item.category)))];
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio Project kitangoding.id",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
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
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
    <section className="marketplace-grid py-20 md:py-24" id="portfolio">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Portfolio"
          title="Contoh proyek website dan aplikasi kitangoding.id."
          description="Pelajari jenis website dan aplikasi yang pernah kami kerjakan. URL publik dan studi kasus lengkap akan ditambahkan setelah mendapat izin publikasi."
        />
        <Suspense fallback={<PortfolioGallerySkeleton />}>
          <PortfolioGalleryContent />
        </Suspense>
      </div>
    </section>
  );
}
