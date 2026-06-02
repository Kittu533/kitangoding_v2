"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { marketplaceNav } from "@/lib/marketplace-data";
import { cn } from "@/lib/utils";

function getNavTarget(href: string) {
  const [path, hash] = href.split("#");

  return {
    hash: hash ? `#${hash}` : "",
    path: path || "/",
  };
}

export function MarketplaceNavLinks() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return (
    <nav className="hidden items-center gap-1 rounded-full border border-white/50 bg-white/35 p-1 text-[16px] leading-6 font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] lg:flex">
      {marketplaceNav.map((item) => {
        const navTarget = getNavTarget(item.href);
        const isHomeAnchor = navTarget.path === "/" && navTarget.hash;
        const isActive = isHomeAnchor
          ? pathname === "/" && (activeHash === navTarget.hash || (!activeHash && navTarget.hash === "#tentang"))
          : pathname === navTarget.path;

        return (
          <Link
            key={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-4 py-2 transition-colors hover:bg-orange/10 hover:text-orange",
              isActive && "bg-orange text-white shadow-[0_10px_24px_rgba(245,130,31,0.25)] hover:bg-orange hover:text-white"
            )}
            href={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
