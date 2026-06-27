import Image from "next/image";
import { desc, eq } from "drizzle-orm";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { db } from "@/lib/db";
import { portfolioCategories, portfolios } from "@/lib/db/schema";
import { portfolioItems } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

const filters = ["Semua", "Company Profile", "E-Commerce", "Landing Page"] as const;
const sectionStats = [
  { value: "4 jenis", label: "website yang biasa kami kerjakan untuk bisnis" },
  { value: "Brief → live", label: "alur kerja jelas dari diskusi awal sampai online" },
] as const;
const referencePoints = [
  ["Jenis project", "Arah tampilan", "Alur CTA"],
  ["Halaman utama", "Struktur penawaran", "Arah konversi"],
  ["Kategori bisnis", "Flow order", "Pola konten"],
] as const;

type PortfolioCard = {
  category: string;
  name: string;
  result: string;
  thumbnail?: string | null;
};

export async function PortfolioSection() {
  let items: PortfolioCard[] = portfolioItems.map((item) => ({
    ...item,
    thumbnail: null,
  }));

  try {
    const dbItems = await db
      .select({
        name: portfolios.name,
        result: portfolios.result,
        thumbnail: portfolios.thumbnail,
        categoryName: portfolioCategories.name,
      })
      .from(portfolios)
      .leftJoin(portfolioCategories, eq(portfolios.categoryId, portfolioCategories.id))
      .orderBy(desc(portfolios.createdAt));

    if (dbItems.length > 0) {
      items = dbItems.map((item) => ({
        category: item.categoryName || "Tanpa Kategori",
        name: item.name,
        result: item.result || "Portfolio project",
        thumbnail: item.thumbnail,
      }));
    }
  } catch (error) {
    console.warn("Portfolio section fallback to mock data", error);
  }

  return (
    <section className="marketplace-grid py-20 md:py-24" id="portfolio">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <SectionHeader
              eyebrow="Portfolio"
              title="Contoh project yang bisa kamu lihat sebelum mulai."
              description="Bagian ini menjawab pertanyaan paling umum dari calon client: sudah pernah bikin apa saja? Lihat tipe website yang relevan, lalu pakai sebagai bahan diskusi project kamu."
            />
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
              {filters.map((filter, index) => (
                <span
                  key={filter}
                  className={cn(
                    "rounded-lg px-4 py-2 shadow-sm",
                    index === 0
                      ? "bg-navy text-white"
                      : "border border-border bg-white text-navy hover:border-orange/40"
                  )}
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>

          <Reveal delay={0.08}>
            <aside className="rounded-lg border border-border bg-white p-5 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-dark">
                Fungsi halaman ini
              </p>
              <p className="mt-3 text-lg font-bold leading-7 text-foreground">
                Ini tempat calon client melihat bukti kerja Kita Ngoding sebelum chat atau minta estimasi.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {sectionStats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-border bg-surface p-4">
                    <p className="text-2xl font-black text-navy">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </aside>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-7 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const points = referencePoints[index % referencePoints.length];

            return (
              <Reveal key={`${item.name}-${index}`} delay={index * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-card">
                  <div className="border-b border-border bg-surface p-3">
                    {item.thumbnail ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white">
                        <Image
                          alt={item.name}
                          className="object-cover object-top transition duration-500 group-hover:scale-105"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          src={item.thumbnail}
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-border-strong bg-white px-6 text-center">
                        <div>
                          <span className="inline-flex rounded-lg bg-orange-light px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-orange-dark">
                            {item.category}
                          </span>
                          <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex rounded-lg border border-border bg-surface px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                        {item.category}
                      </span>
                      <span className="text-xs font-bold text-orange-dark">
                        0{(index % 9) + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-bold leading-tight text-foreground">{item.name}</h3>
                    <p className="mt-4 text-sm leading-7 text-body">{item.result}</p>

                    <div className="mt-6 border-t border-border pt-5">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">
                        Yang bisa dilihat calon client
                      </p>
                      <ul className="mt-4 space-y-3">
                        {points.map((point) => (
                          <li key={point} className="flex items-start gap-3 text-sm font-medium text-body">
                            <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-orange" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-navy transition hover:text-orange-dark"
                      href="/project-inquiry"
                    >
                      Bahas project seperti ini
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink
            href="/project-inquiry"
            icon={<ArrowRight aria-hidden="true" className="size-4" />}
            variant="outline"
          >
            Bahas project kamu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
