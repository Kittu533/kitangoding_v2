import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { PortfolioCard as PortfolioCardData } from "@/lib/public-content";

export function PortfolioCard({ item }: { item: PortfolioCardData }) {
  return (
    <a
      href="/project-inquiry"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-orange/40 hover:shadow-soft"
    >
      {/* Visual: thumbnail with navy scrim, or a generative navy panel when none */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.thumbnail ? (
          <Image
            alt={item.name}
            className="object-cover object-top transition duration-700 group-hover:scale-[1.07]"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            src={item.thumbnail}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy-dark">
            {/* faint grid texture so empty tiles still feel intentional */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:28px_28px]"
            />
            <span className="absolute bottom-4 left-5 font-display text-5xl font-black tracking-tight text-white/12">
              {item.name.charAt(0)}
            </span>
          </div>
        )}

        {/* scrim keeps the floating badge legible on any image */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/55 via-navy-dark/0 to-navy-dark/0" />

        <span className="absolute top-4 left-4 inline-flex rounded-full bg-white/95 px-3 py-1 text-xs font-bold tracking-[0.12em] text-navy uppercase backdrop-blur-sm">
          {item.category}
        </span>
        <span className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full bg-orange text-white opacity-0 transition duration-300 group-hover:opacity-100">
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl leading-snug font-bold text-foreground transition group-hover:text-orange-dark">
          {item.name}
        </h3>
        <p className="mt-3 text-sm leading-7 text-body">{item.result}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-navy">
          Bahas project seperti ini
          <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-1" />
        </span>
      </div>

      {/* orange underline grows on hover — the one signature flourish */}
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-orange transition-all duration-500 group-hover:w-full" />
    </a>
  );
}
