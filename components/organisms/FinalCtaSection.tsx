import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { LeadForm } from "@/components/molecules/LeadForm";
import { whatsappHref } from "@/lib/site";

export function FinalCtaSection() {
  return (
    <section className="final-cta relative overflow-hidden bg-navy-dark">
      <div className="container-shell section-space relative z-10 text-center text-white">
        <Reveal>
          <Badge tone="danger">Slot terbatas minggu ini</Badge>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl leading-tight font-extrabold text-white md:text-6xl">
            Kalau websitemu sudah ada, mari kita buat orang lebih yakin untuk menghubungi.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/72">
            Ceritakan bisnis, target pasar, dan tantanganmu. Kita bahas arah website yang paling
            realistis untuk tahap bisnismu sekarang.
          </p>
          <div className="mt-8">
            <ButtonLink
              href={whatsappHref}
              icon={<MessageCircle aria-hidden="true" className="size-5" />}
              rel="noreferrer"
              size="lg"
              target="_blank"
            >
              Booking Konsultasi WhatsApp
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-4xl" delay={0.1}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
