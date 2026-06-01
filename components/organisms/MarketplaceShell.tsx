import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/atoms/Button";
import { LogoMark } from "@/components/atoms/LogoMark";
import { footerColumns, marketplaceNav } from "@/lib/marketplace-data";
import { siteConfig, whatsappHref } from "@/lib/site";

export function FloatingNav() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 rounded-xl border border-border bg-white/90 px-4 shadow-card backdrop-blur">
        <Link href="/" aria-label="Kembali ke homepage">
          <LogoMark />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-foreground lg:flex">
          {marketplaceNav.map((item) => (
            <a key={item.href} className="hover:text-success" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <ButtonLink
          className="bg-ink shadow-soft hover:bg-navy"
          href={whatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          Buy Template
        </ButtonLink>
      </div>
    </header>
  );
}

export function CustomProjectCta() {
  return (
    <section className="marketplace-grid py-20" id="project">
      <div className="container-shell text-center">
        <span className="inline-flex rounded-lg border border-border bg-white px-3 py-1 text-xs font-extrabold text-foreground">
          Cal.com
        </span>
        <h2 className="mt-6 text-3xl font-extrabold text-foreground">
          Butuh website yang dibuat khusus untuk bisnismu?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Ceritakan kebutuhanmu dalam 15 menit. Kami bantu pilih arah yang paling masuk akal.
        </p>
        <ButtonLink
          className="mt-7 bg-ink shadow-soft hover:bg-navy"
          href={whatsappHref}
          icon={<MessageCircle aria-hidden="true" className="size-4" />}
          rel="noreferrer"
          target="_blank"
        >
          Book Now
        </ButtonLink>
      </div>
    </section>
  );
}

export function MarketplaceFooter() {
  return (
    <footer className="marketplace-grid border-t border-border py-16" id="kontak">
      <div className="container-shell grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
        <div className="bg-market p-8">
          <LogoMark />
          <p className="mt-5 max-w-sm leading-8 text-muted">
            {siteConfig.name} membantu bisnis memilih tampilan website yang rapi, mudah dipahami,
            dan siap dipakai untuk promosi.
          </p>
          <div className="mt-8 flex gap-3 text-sm font-bold text-muted">
            <span className="rounded-lg border border-border px-3 py-2">IG</span>
            <span className="rounded-lg border border-border px-3 py-2">X</span>
            <span className="rounded-lg border border-border px-3 py-2">WA</span>
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title} className="bg-market p-8">
            <h3 className="font-extrabold text-foreground">{column.title}</h3>
            <div className="mt-6 flex flex-col gap-4 text-muted">
              {column.links.map((link) => (
                <Link key={link} className="hover:text-success" href="/">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-foreground">
        {siteConfig.name}© 2026. All rights reserved.
      </p>
    </footer>
  );
}
