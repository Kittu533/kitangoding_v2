import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function LogoMark({
  invert = false,
  showText = true,
}: {
  invert?: boolean;
  showText?: boolean;
}) {
  return (
    <div className={showText ? "flex items-center gap-3" : "flex items-center"}>
      <Image
        alt={`${siteConfig.name} logo`}
        className="size-11 object-contain"
        height={72}
        priority
        src="/logo-kitangoding.webp"
        width={72}
      />
      {showText ? (
        <div>
          <p
            className={
              invert ? "font-display text-lg font-bold text-white" : "font-display text-lg font-bold text-foreground"
            }
          >
            {siteConfig.name}
          </p>
          <p className={invert ? "text-sm text-white/55" : "text-sm text-muted"}>Website untuk UMKM</p>
        </div>
      ) : null}
    </div>
  );
}
