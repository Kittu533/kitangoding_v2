import { ArrowRight, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { PortfolioCard } from "@/components/molecules/PortfolioCard";
import { getPortfolioProjects } from "@/lib/public-content";

const trustPoints = [
  { value: "100%", label: "project diserahkan dengan source code & akses penuh" },
  { value: "Brief → live", label: "alur kerja transparan, kamu pantau tiap tahap" },
] as const;

export async function PortfolioSection() {
  const items = await getPortfolioProjects(3);

  return (
    <section className="marketplace-grid py-20 md:py-24" id="portfolio">
      <div className="container-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy to-navy-dark p-8 shadow-soft md:p-12">
            {/* ambient grid texture — same language as the empty project tiles */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:40px_40px]"
            />
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 size-72 rounded-full bg-orange/20 blur-3xl"
            />

            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-2xl text-white">
                <SectionHeader
                  invert
                  eyebrow="Contoh proyek"
                  title="Contoh proyek untuk memahami cara kerja kitangoding.id."
                  description="Pelajari jenis website dan aplikasi yang pernah kami kerjakan. URL publik dan studi kasus lengkap akan ditambahkan setelah mendapat izin publikasi."
                />
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.12em] text-white uppercase lg:self-end">
                  <ShieldCheck aria-hidden="true" className="size-4 text-orange-glow" />
                  Hasil 100% milikmu
                </div>
                <div className="flex gap-8">
                  {trustPoints.map((point) => (
                    <div key={point.label} className="max-w-[150px]">
                      <p className="font-display text-3xl font-black text-white">{point.value}</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-white/60">{point.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={`${item.name}-${index}`} className="h-full" delay={index * 0.06}>
              <PortfolioCard item={item} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink
            href="/portfolio"
            icon={<ArrowRight aria-hidden="true" className="size-4" />}
            variant="outline"
          >
            Lihat semua project
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
