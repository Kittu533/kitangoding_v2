import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { trustItems } from "@/lib/landing-data";
import { siteConfig, whatsappHref } from "@/lib/site";

export function HeroSection() {
  return (
    <section
      className="hero-photo relative overflow-hidden bg-navy-dark text-white"
      id="hero"
    >
      <div className="container-shell hero-height relative z-10 flex items-center py-16">
        <Reveal className="max-w-3xl">
          <Badge tone="glass">{"<UMKM/>"} website yang bikin lebih dipercaya</Badge>
          <h1 className="mt-6 font-display text-5xl leading-tight font-extrabold text-white md:text-6xl xl:text-7xl">
            kitangoding.id
          </h1>
          <p className="mt-5 max-w-2xl text-2xl leading-snug font-semibold text-orange-glow md:text-3xl">
            Website profesional untuk UMKM yang ingin terlihat serius sejak 5 detik pertama.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
            {siteConfig.name} membantu bisnis kecil tampil lebih rapi, lebih jelas, dan lebih
            meyakinkan lewat landing page serta website yang fokus ke trust dan konversi.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink
              href={whatsappHref}
              icon={<MessageCircle aria-hidden="true" className="size-5" />}
              rel="noreferrer"
              size="lg"
              target="_blank"
            >
              Mulai Konsultasi
            </ButtonLink>
            <ButtonLink href="#portfolio" icon={<ArrowRight aria-hidden="true" className="size-5" />} size="lg" variant="ghost">
              Lihat Portfolio
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-white/80 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-lg bg-white/8 p-3">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 flex-none text-orange" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
