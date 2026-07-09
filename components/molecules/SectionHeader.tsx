import type { ReactNode } from "react";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/utils";

export function SectionHeader({
  align = "left",
  eyebrow,
  title,
  description,
  invert = false,
}: {
  align?: "left" | "center";
  eyebrow: ReactNode;
  title: string;
  description?: string;
  invert?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Badge tone={invert ? "glass" : "orange"}>{eyebrow}</Badge>
      <h2
        className={cn(
          "mt-5 font-display text-4xl leading-tight font-bold text-black md:text-5xl",
          invert && "text-white!"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-5 leading-8 text-body", invert && "text-white")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
