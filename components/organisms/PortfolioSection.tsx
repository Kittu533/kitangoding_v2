import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { portfolioItems } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

const filters = ["Semua", "Company Profile", "E-Commerce", "Landing Page"] as const;

export function PortfolioSection() {
  return (
    <section className="section-space bg-surface" id="portfolio">
      <div className="container-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Portfolio pilihan"
            title="Contoh arah visual yang fokus pada trust dan hasil."
          />
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            {filters.map((filter, index) => (
              <span
                key={filter}
                className={cn(
                  "rounded-full px-4 py-2",
                  index === 0
                    ? "bg-orange text-white"
                    : "border border-border bg-white text-navy"
                )}
              >
                {filter}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.06}>
              <article className="group overflow-hidden rounded-lg border border-border bg-white shadow-card">
                <div
                  className={cn(
                    "min-h-72 p-6",
                    index === 1 ? "bg-orange-light" : "bg-navy-light"
                  )}
                >
                  <div className="flex h-full min-h-60 flex-col justify-between rounded-lg border border-white/70 bg-white/70 p-6 backdrop-blur">
                    <div>
                      <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">
                        {item.category}
                      </span>
                      <h3 className="mt-5 font-display text-3xl font-bold text-foreground">
                        {item.name}
                      </h3>
                    </div>
                    <div className="rounded-lg bg-navy p-4 text-white">
                      <p className="text-sm text-white/65">Highlight</p>
                      <p className="mt-2 text-sm leading-7">{item.result}</p>
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
