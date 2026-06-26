import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/atoms/Button";
import { LogoMark } from "@/components/atoms/LogoMark";
import { MarketplaceNavLinks } from "@/components/molecules/MarketplaceNavLinks";
import { footerColumns } from "@/lib/marketplace-data";
import { siteConfig, whatsappHref } from "@/lib/site";

export function FloatingNav() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 rounded-3xl border border-white/70 bg-white/45 px-5 shadow-[0_24px_70px_rgba(17,17,24,0.12)] backdrop-blur-2xl ring-1 ring-white/55 supports-[backdrop-filter]:bg-white/35">
        <Link className="flex shrink-0 items-center" href="/" aria-label="Kembali ke homepage">
          <LogoMark showText={false} />
        </Link>

        <MarketplaceNavLinks />

        <ButtonLink
          className="shadow-soft"
          href={whatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          Konsultasi
        </ButtonLink>
      </div>
    </header>
  );
}

export function CustomProjectCta() {
  return (
    <section className="marketplace-grid py-20" id="project">
      <div className="container-shell text-center">
        <span className="inline-flex rounded-lg border border-border bg-white px-3 py-1 marketplace-eyebrow text-foreground">
          Konsultasi gratis
        </span>
        <h2 className="mt-6 text-[32px] leading-9 font-semibold text-foreground">
          Butuh website yang dibuat khusus untuk bisnismu?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Ceritakan kebutuhanmu dalam 15 menit. Kami bantu pilih arah yang paling masuk akal.
        </p>
        <ButtonLink
          className="mt-7 shadow-soft"
          href={whatsappHref}
          icon={<MessageCircle aria-hidden="true" className="size-4" />}
          rel="noreferrer"
          target="_blank"
        >
          Konsultasi via WhatsApp
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
          <p className="mt-5 max-w-sm leading-8 text-foreground">
            {siteConfig.name} membantu bisnis memilih tampilan website yang rapi, mudah dipahami,
            dan siap dipakai untuk promosi.
          </p>
          <div className="mt-8 flex gap-3 text-[14px] leading-[17px] font-medium text-foreground">
            <span className="rounded-lg border border-border px-3 py-2">IG</span>
            <span className="rounded-lg border border-border px-3 py-2">X</span>
            <span className="rounded-lg border border-border px-3 py-2">WA</span>
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title} className="bg-market p-8">
            <h3 className="font-medium text-foreground">{column.title}</h3>
            <div className="mt-6 flex flex-col gap-4 text-foreground">
              {column.links.map((link) => (
                <Link key={link} className="transition-colors hover:text-success" href="/">
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
