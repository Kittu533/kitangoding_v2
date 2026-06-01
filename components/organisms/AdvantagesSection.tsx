import { Braces, Handshake, Layers, Rocket } from "lucide-react";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { advantages } from "@/lib/landing-data";

const icons = [Braces, Layers, Handshake, Rocket] as const;

export function AdvantagesSection() {
  return (
    <section className="section-space bg-navy text-white">
      <div className="container-shell">
        <SectionHeader
          description="Desain yang kuat tetap harus terasa masuk akal untuk bisnis kecil, dari copy sampai alur konsultasi."
          eyebrow="Kenapa kerja bareng kami"
          invert
          title="Website UMKM perlu terlihat profesional tanpa kehilangan konteks bisnisnya."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {advantages.map((item, index) => {
            const Icon = icons[index];

            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="h-full rounded-lg border border-white/10 bg-white/8 p-6">
                  <div className="inline-flex rounded-lg bg-orange p-3 text-white">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-8 text-white/70">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
