"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/atoms/Reveal";
import { PortfolioCard } from "@/components/molecules/PortfolioCard";
import type { PortfolioCard as PortfolioCardData } from "@/lib/public-content";
import { cn } from "@/lib/utils";

export function PortfolioGalleryGrid({
  items,
  categories,
}: {
  items: PortfolioCardData[];
  categories: string[];
}) {
  const [active, setActive] = useState("Semua");

  const visible = useMemo(
    () => (active === "Semua" ? items : items.filter((item) => item.category === active)),
    [active, items]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3 text-sm font-semibold">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "rounded-lg px-4 py-2 shadow-sm transition",
              active === category
                ? "bg-navy text-white"
                : "border border-border bg-white text-navy hover:border-orange/40"
            )}
            aria-pressed={active === category}
          >
            {category}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((item, index) => (
            <Reveal key={`${item.name}-${index}`} delay={index * 0.05}>
              <PortfolioCard item={item} />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-border-strong bg-surface p-10 text-center text-sm font-medium text-muted">
          Belum ada project di kategori ini. Coba kategori lain atau lihat semua.
        </p>
      )}
    </div>
  );
}
