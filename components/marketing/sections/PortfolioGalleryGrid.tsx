"use client";

import { useMemo, useState } from "react";
import { PortfolioCard } from "@/components/marketing/components/PortfolioCard";
import type { PortfolioCard as PortfolioCardData } from "@/features/portfolio/types";
import studio from "@/components/marketing/Studio.module.css";
import styles from "@/components/marketing/components/Portfolio.module.css";

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
      <div className={styles.filters}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
          >
            {category}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className={studio.workGrid} style={{ marginTop: 30 }}>
          {visible.map((item, index) => (
            <div key={`${item.name}-${index}`} className={studio.workItem}>
              <PortfolioCard item={item} />
            </div>
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
