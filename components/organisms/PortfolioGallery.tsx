import { SectionHeader } from "@/components/molecules/SectionHeader";
import { PortfolioGalleryGrid } from "@/components/organisms/PortfolioGalleryGrid";
import { getPortfolioProjects } from "@/lib/public-content";

export async function PortfolioGallery() {
  const items = await getPortfolioProjects();
  const categories = ["Semua", ...Array.from(new Set(items.map((item) => item.category)))];

  return (
    <section className="marketplace-grid py-20 md:py-24" id="portfolio">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Portfolio"
          title="Semua project yang sudah kami kerjakan."
          description="Kumpulan website yang sudah live, dikerjakan dari nol oleh tim Kita Ngoding. Saring per kategori untuk menemukan contoh yang paling dekat dengan bisnis kamu."
        />
        <p className="mt-4 text-sm font-semibold text-muted">
          {items.length} project siap jadi referensi project kamu.
        </p>

        <div className="mt-10">
          <PortfolioGalleryGrid categories={categories} items={items} />
        </div>
      </div>
    </section>
  );
}
