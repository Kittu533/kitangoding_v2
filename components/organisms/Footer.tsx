import { LogoMark } from "@/components/atoms/LogoMark";
import { navigationLinks, siteConfig, whatsappHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy-dark py-14 text-white">
      <div className="container-shell grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-3">
        <div>
          <LogoMark invert />
          <p className="mt-5 max-w-sm leading-8 text-white/55">{siteConfig.tagline}</p>
        </div>

        <div>
          <p className="font-semibold text-white">Navigasi</p>
          <div className="mt-4 flex flex-col gap-3 text-white/65">
            {navigationLinks.map((link) => (
              <a key={link.href} className="hover:text-orange-glow" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-white">Kontak</p>
          <div className="mt-4 flex flex-col gap-3 text-white/65">
            <a href={whatsappHref} rel="noopener noreferrer" target="_blank">
              WhatsApp: {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={siteConfig.instagram} rel="noopener noreferrer" target="_blank">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="container-shell pt-6 text-sm text-white/40">
        © 2026 {siteConfig.name}. Dibangun untuk UMKM yang ingin tampil lebih dipercaya.
      </div>
    </footer>
  );
}
