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
          title="Contoh proyek website dan aplikasi kitangoding.id."
          description="Pelajari jenis website dan aplikasi yang pernah kami kerjakan. URL publik dan studi kasus lengkap akan ditambahkan setelah mendapat izin publikasi."
        />
        <p className="mt-4 text-sm font-semibold text-black">
          {items.length} proyek siap menjadi referensi kebutuhanmu.
        </p>

        <div className="mt-10">
          <PortfolioGalleryGrid categories={categories} items={items} />
        </div>
      </div>
    </section>
  );
}
