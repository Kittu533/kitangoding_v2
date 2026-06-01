import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "orange" | "navy" | "glass" | "danger";

const toneClass: Record<BadgeTone, string> = {
  orange: "bg-orange-light text-orange-dark",
  navy: "bg-navy-light text-navy",
  glass: "bg-white/12 text-orange-glow ring-1 ring-white/10",
  danger: "bg-danger text-white",
};

export function Badge({
  children,
  className,
  tone = "orange",
}: {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs font-medium",
        toneClass[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
