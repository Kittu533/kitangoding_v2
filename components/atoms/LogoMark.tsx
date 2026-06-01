import { siteConfig } from "@/lib/site";

export function LogoMark({ invert = false }: { invert?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-lg bg-navy font-display text-lg font-extrabold text-white">
        KN
      </div>
      <div>
        <p className={invert ? "font-display text-lg font-bold text-white" : "font-display text-lg font-bold text-foreground"}>
          {siteConfig.name}
        </p>
        <p className={invert ? "text-sm text-white/55" : "text-sm text-muted"}>Website untuk UMKM</p>
      </div>
    </div>
  );
}
