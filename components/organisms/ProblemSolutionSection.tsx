import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Reveal } from "@/components/atoms/Reveal";
import { painPoints, solutions } from "@/lib/landing-data";

export function ProblemSolutionSection() {
  return (
    <section className="diagonal-panel section-space bg-surface">
      <div className="container-shell relative z-10 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-lg border border-border bg-white p-8 shadow-card">
            <Badge>Masalah yang sering terjadi</Badge>
            <h2 className="mt-5 font-display text-4xl leading-tight font-bold text-foreground">
              Banyak website UMKM belum benar-benar membantu jualan.
            </h2>
            <div className="mt-7 space-y-5">
              {painPoints.map((point) => (
                <div key={point} className="flex gap-3 rounded-lg bg-surface p-5">
                  <AlertCircle aria-hidden="true" className="mt-1 size-5 flex-none text-danger" />
                  <p className="leading-8 text-muted">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-lg bg-navy p-8 text-white shadow-soft">
            <Badge tone="glass">Solusi dari kitangoding.id</Badge>
            <h2 className="mt-5 font-display text-4xl leading-tight font-bold text-white">
              Kita rapikan narasi, visual, dan CTA agar bisnismu terlihat lebih matang.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/76">
              Pendekatan kami sederhana: pastikan pengunjung cepat paham, cepat percaya, dan cepat
              tahu harus klik ke mana.
            </p>
            <div className="mt-8 grid gap-4">
              {solutions.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/8 p-4">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 flex-none text-orange" />
                  <p className="text-white/82">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
