import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { LogoMark } from "@/components/atoms/LogoMark";
import { navigationLinks, whatsappHref } from "@/lib/site";

export function Navbar() {
  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-border">
      <div className="container-shell flex h-17 items-center justify-between gap-6">
        <a href="#hero">
          <LogoMark />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-body lg:flex">
          {navigationLinks.map((link) => (
            <a key={link.href} className="hover:text-navy" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <ButtonLink
          href={whatsappHref}
          icon={<MessageCircle aria-hidden="true" className="size-4" />}
          rel="noreferrer"
          target="_blank"
        >
          Konsultasi
        </ButtonLink>
      </div>
    </header>
  );
}
