import Link from "next/link";
import type { ServiceLandingPageConfig } from "@/lib/service-landing-pages";
import { createServiceLandingPageStructuredData } from "@/lib/service-landing-pages";
import { whatsappHref } from "@/lib/site";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";

export function ServiceLandingPage({ page }: { page: ServiceLandingPageConfig }) {
  const structuredData = createServiceLandingPageStructuredData(page);

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <FloatingNav />
      <main id="konten">
        <section className="marketplace-grid relative overflow-hidden pt-24 pb-16">
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 -mr-40 -mt-40 h-[500px] w-[500px] rounded-full bg-orange-light/40 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="absolute left-0 top-40 -ml-40 h-[400px] w-[400px] rounded-full bg-navy-light/40 blur-[100px]"
          />

          <div className="container-shell relative z-10">
            <Reveal>
              <span className="inline-flex rounded-lg border border-success/20 bg-white px-3 py-2 marketplace-eyebrow text-success">
                {page.keyword}
              </span>
              <h1 className="mt-8 max-w-4xl text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-body md:text-lg">
                {page.heroDescription}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={whatsappHref} rel="noreferrer" target="_blank">
                  Konsultasi via WhatsApp
                </ButtonLink>
                <ButtonLink href="/pricing" variant="outline">
                  Lihat harga
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="marketplace-grid py-16">
          <div className="container-shell">
            <SectionHeader
              align="center"
              eyebrow="Apa yang kamu dapat"
              title={`Kenapa ${page.keyword} ini relevan untuk bisnis kamu`}
              description={page.description}
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {page.highlights.map((highlight, index) => (
                <Reveal key={highlight.title} delay={index * 0.06}>
                  <article className="h-full rounded-2xl border border-border bg-white p-6 shadow-sm">
                    <p className="text-xs font-bold tracking-widest text-orange-dark uppercase">
                      0{index + 1}
                    </p>
                    <h3 className="mt-4 text-xl font-extrabold text-foreground">{highlight.title}</h3>
                    <p className="mt-3 leading-7 text-body">{highlight.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="marketplace-grid py-16">
          <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <SectionHeader
                eyebrow="Scope ringan"
                title="Isi halaman yang biasanya paling berguna"
                description="Bagian ini sengaja dibuat praktis. Tujuannya bukan menambah halaman tanpa arah, tapi memastikan pengunjung cepat paham dan tahu harus klik ke mana."
              />
              <div className="mt-8 space-y-4 rounded-2xl border border-border bg-white p-6">
                {page.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-2 size-2 rounded-full bg-orange" />
                    <p className="text-sm leading-7 text-body">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-border bg-navy p-8 text-white shadow-card">
              <p className="text-xs font-bold tracking-widest text-orange-glow uppercase">
                Internal links
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight">
                Hubungkan halaman ini dengan jalur yang paling dekat ke transaksi.
              </h2>
              <div className="mt-8 grid gap-3">
                {page.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white/90 transition-colors hover:bg-white/10"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="marketplace-grid py-16">
          <div className="container-shell">
            <SectionHeader
              align="center"
              eyebrow="FAQ"
              title="Pertanyaan yang biasanya muncul sebelum mulai"
            />
            <div className="mx-auto mt-10 max-w-4xl divide-y divide-border rounded-2xl border border-border bg-white">
              {page.faq.map((item) => (
                <details key={item.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 text-left font-bold text-foreground">
                    <span>{item.question}</span>
                    <span className="size-5 flex-none rounded-full border border-border" />
                  </summary>
                  <p className="px-6 pb-6 leading-8 text-body">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="marketplace-grid py-20">
          <div className="container-shell text-center">
            <span className="inline-flex rounded-lg border border-border bg-white px-3 py-1 marketplace-eyebrow text-foreground">
              Konsultasi gratis
            </span>
            <h2 className="mt-6 text-[32px] leading-9 font-semibold text-foreground">
              Butuh arahan yang paling cocok untuk halaman ini?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Ceritakan kebutuhanmu, lalu kami bantu pilih scope yang paling masuk akal untuk target keyword dan tujuan bisnis.
            </p>
            <ButtonLink
              className="mt-7 shadow-soft"
              href={whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              Mulai konsultasi
            </ButtonLink>
          </div>
        </section>
      </main>
      <MarketplaceFooter />
    </div>
  );
}
