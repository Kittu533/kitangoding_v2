import { ShopCatalog } from "@/components/marketing/components/ShopCatalog";
import type { PublicCreativeCard } from "@/features/marketplace/types";
import styles from "../Studio.module.css";

export function VisualReferenceSection({ items }: { items: PublicCreativeCard[] }) {
  return <>
    <section className="text-center" id="referensi"><div className="container-shell">
      <span className={styles.eyebrow}><i aria-hidden="true" />Inspirasi tampilan</span>
      <h1 className="mx-auto mt-7 max-w-4xl">TEMUKAN ARAH <em>VISUALMU.</em></h1>
      <p className="mx-auto mt-5 max-w-2xl marketplace-hero-copy">Eksplorasi referensi website, katalog produk, dan dashboard. Kami sesuaikan arahnya dengan brand, konten, dan kebutuhan bisnismu.</p>
    </div></section>
    <section className="pb-20"><div className="container-shell"><ShopCatalog allFilterLabel="Semua referensi" creatives={items} ctaLabel="Konsultasi style ini" /></div></section>
  </>;
}
