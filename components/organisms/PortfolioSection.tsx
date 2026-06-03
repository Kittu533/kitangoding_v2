import Image from "next/image";
import { desc, eq } from "drizzle-orm";
import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { db } from "@/lib/db";
import { portfolioCategories, portfolios } from "@/lib/db/schema";
import { portfolioItems } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

const filters = ["Semua", "Company Profile", "E-Commerce", "Landing Page"] as const;

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
    <section className="marketplace-grid py-16" id="portfolio">
      <div className="container-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Portfolio pilihan"
            title="Project nyata yang bisa langsung jadi referensi kualitas website bisnismu."
          />
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            {filters.map((filter, index) => (
              <span
                key={filter}
                className={cn(
                  "rounded-full px-4 py-2",
                  index === 0 ? "bg-orange text-white" : "border border-border bg-white text-navy"
                )}
              >
                {filter}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={`${item.name}-${index}`} delay={index * 0.06}>
              <article className="group overflow-hidden rounded-2xl border border-border bg-white shadow-card">
                <div className={cn("p-4", index % 2 === 1 ? "bg-orange-light" : "bg-navy-light")}>
                  <div className="overflow-hidden rounded-xl border border-white/70 bg-white/70 backdrop-blur">
                    {item.thumbnail ? (
                      <div className="relative h-56 w-full">
                        <Image
                          alt={item.name}
                          className="object-cover object-top"
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          src={item.thumbnail}
                        />
                      </div>
                    ) : (
                      <div className="flex min-h-56 items-end p-6">
                        <div>
                          <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">
                            {item.category}
                          </span>
                          <h3 className="mt-5 font-display text-3xl font-bold text-foreground">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">
                        {item.category}
                      </span>
                      <h3 className="mt-4 text-2xl font-bold text-foreground">{item.name}</h3>
                      <div className="mt-5 rounded-lg bg-navy p-4 text-white">
                        <p className="text-sm text-white/65">Highlight</p>
                        <p className="mt-2 text-sm leading-7">{item.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-navy">
                  <span>Lihat studi kasus</span>
                  <ExternalLink aria-hidden="true" className="size-4" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
