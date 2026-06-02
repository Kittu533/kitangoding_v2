import { ArrowUpRight, LayoutDashboard, Monitor, Palette, Shapes, Smartphone, Sparkles } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/atoms/Reveal";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { categoryPageItems } from "@/lib/marketplace-data";
import { cn } from "@/lib/utils";

const categoryIcons = [Monitor, Smartphone, LayoutDashboard, Palette] as const;

const advisorItems = [
  "Belum punya website? Mulai dari Website Creatives.",
  "Butuh tampilan layanan di HP? Pilih App Creatives.",
  "Ingin brand lebih konsisten? Masuk ke Branding Creatives.",
] as const;

export function CategoryPage() {
  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <section className="marketplace-grid relative overflow-hidden pt-24 pb-20">
          <div
            aria-hidden="true"
            className="absolute top-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-success/10 blur-3xl"
          />
          <div className="container-shell relative z-10 text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-lg border border-success/20 bg-white/80 px-3 py-2 marketplace-eyebrow text-success shadow-sm backdrop-blur">
                <Shapes aria-hidden="true" className="size-3.5" />
                Category
              </span>
              <h1 className="mx-auto mt-8 max-w-4xl text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
                Pilih kategori yang paling cocok untuk bisnismu
              </h1>
              <p className="mx-auto mt-5 max-w-2xl marketplace-hero-copy">
                Mulai dari website, app concept, dashboard, sampai branding. Pilih arah yang paling dekat
                dengan kebutuhanmu, lalu kami bantu sesuaikan isinya.
              </p>
            </Reveal>

            <div className="mx-auto mt-28 grid max-w-4xl gap-6 md:grid-cols-2">
              {categoryPageItems.map((category, index) => {
                const Icon = categoryIcons[index];

                return (
                  <Reveal key={category.title} delay={index * 0.05}>
                    <Link
                      className="group block h-full rounded-[2rem] border border-border bg-white/82 p-7 text-left shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-success/30 hover:shadow-card"
                      href="/shop"
                    >
                      <div className="relative overflow-hidden rounded-3xl bg-surface px-6 pt-7 pb-5">
                        <div className="absolute inset-x-8 top-6 h-24 rounded-2xl border border-border bg-white/70 opacity-70" />
                        <div className="relative mx-auto flex h-32 max-w-72 items-center justify-center">
                          <Icon
                            aria-hidden="true"
                            className="absolute top-4 size-16 text-muted/15 transition group-hover:text-success/20"
                          />
                          <div className="mt-16 grid w-full grid-cols-2 gap-3">
                            <CategoryPreview tone={category.previewA} />
                            <CategoryPreview tone={category.previewB} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-success">
                            {category.count}
                          </p>
                          <h2 className="mt-2 text-xl font-extrabold text-foreground">{category.title}</h2>
                        </div>
                        <span className="rounded-full border border-border p-2 text-muted transition group-hover:border-success group-hover:text-success">
                          <ArrowUpRight aria-hidden="true" className="size-4" />
                        </span>
                      </div>

                      <p className="mt-4 leading-7 text-muted">{category.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {category.useCases.map((useCase) => (
                          <span
                            key={useCase}
                            className="rounded-full border border-border bg-market px-3 py-1 text-xs font-bold text-body"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="marketplace-grid pb-20">
          <div className="container-shell">
            <Reveal>
              <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-ink p-8 text-white shadow-card md:flex md:items-center md:justify-between md:gap-10">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/80">
                    <Sparkles aria-hidden="true" className="size-4 text-success" />
                    Quick guide
                  </span>
                  <h2 className="mt-5 text-3xl font-extrabold">Bingung pilih kategori?</h2>
                </div>
                <div className="mt-6 grid gap-3 text-sm font-semibold text-white/78 md:mt-0 md:min-w-96">
                  {advisorItems.map((item) => (
                    <p key={item} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}

function CategoryPreview({ tone }: { tone: string }) {
  return (
    <div className={cn("creative-thumb h-20 rounded-xl p-3 shadow-sm", tone)}>
      <div className="relative z-10 flex h-full flex-col justify-between">
        <span className="h-2 w-10 rounded-full bg-white/60" />
        <div className="grid grid-cols-3 gap-1">
          <span className="h-5 rounded bg-white/28" />
          <span className="h-5 rounded bg-white/45" />
          <span className="h-5 rounded bg-white/25" />
        </div>
      </div>
    </div>
  );
}
