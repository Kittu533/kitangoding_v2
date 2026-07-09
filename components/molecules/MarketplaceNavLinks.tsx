import Link from "next/link";
import { marketplaceNav } from "@/lib/marketplace-data";

export function MarketplaceNavLinks() {
  return (
    <nav className="hidden items-center gap-1 rounded-full border border-white/50 bg-white/35 p-1 text-[16px] leading-6 font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] lg:flex">
      {marketplaceNav.map((item) => (
        <Link
          key={item.href}
          className="rounded-full px-4 py-2 transition-colors hover:bg-orange/10 hover:text-orange"
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
