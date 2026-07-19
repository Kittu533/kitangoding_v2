import { Menu, MessageCircle, X } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";
import { ButtonLink } from "@/components/atoms/Button";
import { LogoMark } from "@/components/atoms/LogoMark";
import { MarketplaceNavLinks } from "@/components/molecules/MarketplaceNavLinks";
import { footerColumns, marketplaceNav } from "@/lib/marketplace-data";
import { siteConfig, whatsappHref } from "@/lib/site";

export function FloatingNav() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 rounded-3xl border border-white/70 bg-white/45 px-5 shadow-[0_24px_70px_rgba(17,17,24,0.12)] backdrop-blur-2xl ring-1 ring-white/55 supports-[backdrop-filter]:bg-white/35">
        <Link className="flex shrink-0 items-center" href="/" aria-label="Kembali ke homepage">
          <LogoMark showText={false} />
        </Link>

        <MarketplaceNavLinks />

        <div className="hidden lg:block">
          <ButtonLink
            className="shadow-soft"
            href={whatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            Konsultasi
          </ButtonLink>
        </div>

        <details className="group relative lg:hidden">
          <summary
            aria-label="Buka menu navigasi"
            className="flex size-11 cursor-pointer list-none items-center justify-center rounded-xl border border-border bg-white text-navy shadow-sm [&::-webkit-details-marker]:hidden"
          >
            <Menu aria-hidden="true" className="size-5 group-open:hidden" />
            <X aria-hidden="true" className="hidden size-5 group-open:block" />
          </summary>
          <nav
            aria-label="Navigasi mobile"
            className="absolute right-0 top-14 z-10 flex w-64 flex-col gap-1 rounded-2xl border border-border bg-white p-2 shadow-soft"
            id="mobile-navigation"
          >
            {marketplaceNav.map((item) => (
              <Link
                className="rounded-xl px-4 py-3 font-medium text-foreground hover:bg-orange-light hover:text-orange"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              className="mt-1 w-full"
              href={whatsappHref}
              icon={<MessageCircle aria-hidden="true" className="size-4" />}
              rel="noreferrer"
              target="_blank"
            >
              Konsultasi
            </ButtonLink>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function CustomProjectCta() {
  return (
    <section className="marketplace-grid py-20" id="project">
      <div className="container-shell text-center">
        <span className="inline-flex rounded-lg border border-border bg-white px-3 py-1 marketplace-eyebrow text-foreground">
          Mulai dari konsultasi singkat
        </span>
        <h2 className="mt-6 text-[32px] leading-9 font-semibold text-foreground">
          Punya bisnis yang butuh website lebih rapi dan meyakinkan?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-black">
          Ceritakan jenis bisnis, tujuan website, dan contoh yang kamu suka. Kami bantu arahkan
          paket, estimasi biaya, dan langkah paling masuk akal.
        </p>
        <ButtonLink
          className="mt-7 shadow-soft"
          href={whatsappHref}
          icon={<MessageCircle aria-hidden="true" className="size-4" />}
          rel="noreferrer"
          target="_blank"
        >
          Chat Konsultasi Website
        </ButtonLink>
        <p className="mt-4 text-sm font-medium text-black">
          Balas via WhatsApp di jam kerja. Gratis &amp; tanpa wajib lanjut.
        </p>
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
          <div className="mt-8 flex gap-3 text-foreground">
            <Link
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg border border-border p-2.5 transition-colors hover:bg-border"
              aria-label="Instagram"
            >
              <FaInstagram className="size-5" />
            </Link>
            <Link
              href={siteConfig.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg border border-border p-2.5 transition-colors hover:bg-border"
              aria-label="TikTok"
            >
              <FaTiktok className="size-5" />
            </Link>
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg border border-border p-2.5 transition-colors hover:bg-border"
              aria-label="WhatsApp"
            >
              <IoLogoWhatsapp className="size-5" />
            </Link>
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title} className="bg-market p-8">
            <h3 className="font-medium text-foreground">{column.title}</h3>
            <div className="mt-6 flex flex-col gap-4 text-foreground">
              {column.links.map((link) => (
                <Link key={link.href} className="transition-colors hover:text-success" href={link.href}>
                  {link.label}
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
