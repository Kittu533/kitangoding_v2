import {
  ArrowRight,
  Code2,
  FileText,
  MonitorSmartphone,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { services } from "@/lib/landing-data";
import { whatsappHref } from "@/lib/site";

const icons = [FileText, MonitorSmartphone, ShoppingBag, Code2] as const;

const serviceDetails = [
  {
    audience: "Untuk bisnis yang butuh profil rapi",
    deliverables: ["Struktur halaman", "Copy dasar", "CTA konsultasi"],
  },
  {
    audience: "Untuk promo dan campaign cepat",
    deliverables: ["Hero konversi", "Benefit section", "Tracking-ready"],
  },
  {
    audience: "Untuk katalog dan order WhatsApp",
    deliverables: ["Kategori produk", "CTA per item", "FAQ pembelian"],
  },
  {
    audience: "Untuk website yang sudah terasa usang",
    deliverables: ["Audit UI", "Refresh konten", "Rebuild responsif"],
  },
] as const;

export function ServicesSection() {
  const [featuredService, ...secondaryServices] = services;
  const [FeaturedIcon, ...secondaryIcons] = icons;
  const [featuredDetail, ...secondaryDetails] = serviceDetails;

  return (
    <section className="section-space bg-surface relative overflow-hidden" id="layanan">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 h-[500px] w-[500px] rounded-full bg-orange-light/40 blur-[100px]" aria-hidden="true" />
      
      <div className="container-shell relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="lg:w-2/3">
            <SectionHeader
              description="Pilih bentuk website yang paling dekat dengan kebutuhan bisnismu sekarang. Setiap layanan tetap diarahkan ke tujuan yang sama: lebih jelas, lebih dipercaya, dan lebih gampang dihubungi."
              eyebrow="Layanan utama"
              title="Paket layanan yang langsung nyambung ke kebutuhan UMKM."
            />
          </div>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 rounded-full border border-orange/20 bg-orange-light/60 px-5 py-3 text-orange-dark shadow-sm backdrop-blur-sm lg:mb-4">
              <Sparkles aria-hidden="true" className="size-5" />
              <span className="text-sm font-semibold">Bukan sekadar template kosong</span>
            </div>
          </Reveal>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Featured (Company Profile) */}
          <Reveal className="md:col-span-2 lg:col-span-2 lg:row-span-2" delay={0.2}>
            <article className="service-feature group relative h-full overflow-hidden rounded-[2rem] bg-navy p-8 md:p-12 text-white shadow-soft transition-all duration-300 hover:shadow-card">
              <div className="relative z-10 flex h-full flex-col justify-between gap-12">
                <div>
                  <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
                    <Badge tone="glass" className="border-white/20 px-4 py-1.5 text-sm">Rekomendasi awal</Badge>
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange to-orange-dark text-white shadow-inner">
                      <FeaturedIcon aria-hidden="true" className="size-7" />
                    </div>
                  </div>

                  <p className="text-sm font-bold tracking-widest text-orange-glow uppercase mb-4">
                    {featuredDetail.audience}
                  </p>
                  <h3 className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-6">
                    {featuredService.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-white/80 max-w-xl">
                    {featuredService.description}
                  </p>
                </div>

                <div>
                  <div className="grid gap-4 sm:grid-cols-3 mb-8">
                    {featuredDetail.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-colors group-hover:bg-white/10">
                        <CheckCircle2 aria-hidden="true" className="size-5 text-orange-glow shrink-0" />
                        <span className="text-sm font-medium text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>

                  <ButtonLink
                    className="group/btn w-full sm:w-fit"
                    href={whatsappHref}
                    icon={<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Bahas Company Profile
                  </ButtonLink>
                </div>
              </div>
              
              {/* Decorative gradient orb */}
              <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange/20 blur-[100px]" aria-hidden="true" />
            </article>
          </Reveal>

          {/* Card 2 & 3: Secondary Services (Landing Page & Toko Online) */}
          {secondaryServices.slice(0, 2).map((service, index) => {
            const Icon = secondaryIcons[index];
            const detail = secondaryDetails[index];
            return (
              <Reveal key={service.title} className="md:col-span-1 lg:col-span-1" delay={0.3 + index * 0.1}>
                <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/50 hover:shadow-card">
                  <div>
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-orange-light text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                        <Icon aria-hidden="true" className="size-7" />
                      </div>
                      <span className="text-5xl font-black text-surface-2 transition-colors group-hover:text-orange-light">
                        0{index + 2}
                      </span>
                    </div>
                    <p className="text-xs font-bold tracking-widest text-orange-dark uppercase mb-3">
                      {detail.audience}
                    </p>
                    <h3 className="text-2xl font-extrabold leading-snug text-foreground mb-4">
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted mb-8">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t border-border/50 mt-auto">
                    {detail.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 aria-hidden="true" className="size-5 text-orange shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-body">{item}</span>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}

          {/* Card 4: Last Service (Redesign) */}
          <Reveal className="md:col-span-2 lg:col-span-3" delay={0.5}>
            <article className="group relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-white to-surface p-8 md:p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/50 hover:shadow-card">
              <div className="flex flex-col md:flex-row md:items-center gap-10 justify-between relative z-10">
                <div className="flex-1 max-w-2xl">
                  <div className="flex items-center gap-5 mb-5">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-navy-light text-navy transition-transform group-hover:scale-110">
                      {(() => {
                        const Icon = secondaryIcons[2];
                        return <Icon aria-hidden="true" className="size-7" />;
                      })()}
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest text-navy uppercase mb-1">
                        {secondaryDetails[2].audience}
                      </p>
                      <span className="text-sm font-semibold text-muted">04</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-extrabold text-foreground mb-4">
                    {secondaryServices[2].title}
                  </h3>
                  <p className="text-lg text-muted">
                    {secondaryServices[2].description}
                  </p>
                </div>
                
                <div className="flex-1 md:border-l md:border-border/60 md:pl-10 flex flex-col justify-center">
                  <p className="text-sm font-bold tracking-widest text-foreground uppercase mb-5">Yang kamu dapatkan</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {secondaryDetails[2].deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 border border-border/60 shadow-sm transition-colors group-hover:border-orange/30">
                        <CheckCircle2 aria-hidden="true" className="size-5 text-orange shrink-0" />
                        <span className="text-sm font-semibold text-body">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-orange-light/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}