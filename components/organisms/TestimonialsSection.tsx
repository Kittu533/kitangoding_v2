import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { testimonials } from "@/lib/landing-data";

export function TestimonialsSection() {
  return (
    <section className="section-space bg-surface">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Testimoni"
          title="Yang dicari bukan cuma website jadi, tapi rasa tenang saat website dipakai."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.06}>
              <article className="h-full rounded-r-lg border-l-4 border-l-orange bg-white p-6 shadow-card">
                <div className="font-display text-6xl leading-none text-orange-glow">&quot;</div>
                <p className="mt-2 leading-8 text-body">{item.quote}</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex size-11 items-center justify-center rounded-full bg-navy-light font-display text-lg font-bold text-navy">
                    {item.name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted">{item.role}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
