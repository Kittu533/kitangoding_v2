"use client";

import { useMemo, useState } from "react";
import { CreativeCard, type CreativeCardItem } from "@/components/molecules/CreativeCard";
import { Reveal } from "@/components/atoms/Reveal";
import { cn } from "@/lib/utils";

const allFilterLabel = "All Creatives";

export function ShopCatalog({ creatives }: { creatives: CreativeCardItem[] }) {
  const [activeFilter, setActiveFilter] = useState(allFilterLabel);

  const filters = useMemo(
    () => [allFilterLabel, ...new Set(creatives.map((creative) => creative.category))],
    [creatives]
  );

  const filteredCreatives = useMemo(() => {
    if (activeFilter === allFilterLabel) {
      return creatives;
    }

    return creatives.filter((creative) => creative.category === activeFilter);
  }, [activeFilter, creatives]);

  return (
    <>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              key={filter}
              className={cn(
                "rounded-lg border bg-white px-5 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "border-success bg-success/5 text-black shadow-sm"
                  : "border-border text-black hover:border-success/30 hover:bg-success/5"
              )}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredCreatives.map((creative, index) => (
          <Reveal key={`${creative.name}-${creative.category}`} className="h-full" delay={(index % 3) * 0.04}>
            <CreativeCard creative={creative} imageLoading={index < 3 ? "eager" : "lazy"} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
