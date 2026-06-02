import { ArrowRight, CheckCircle2, Receipt } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { Reveal } from "@/components/atoms/Reveal";
import { pricingPlans, faqs } from "@/lib/landing-data";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PricingPage() {
  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <section className="marketplace-grid relative overflow-hidden pt-24 pb-14">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-40 -mt-40 h-[500px] w-[500px] rounded-full bg-orange-light/40 blur-[100px]" aria-hidden="true" />
          <div className="absolute top-40 left-0 -ml-40 h-[400px] w-[400px] rounded-full bg-navy-light/40 blur-[100px]" aria-hidden="true" />
          
          <div className="container-shell text-center relative z-10">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange-light/60 px-4 py-2 marketplace-eyebrow text-orange-dark shadow-sm backdrop-blur-sm">
                <Receipt aria-hidden="true" className="size-4" />
                Transparan & Terjangkau
              </span>
              <h1 className="mx-auto mt-8 max-w-4xl font-display text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
                Harga yang pas untuk <br className="hidden md:block" /> pertumbuhan bisnismu
              </h1>
              <p className="mx-auto mt-6 max-w-2xl marketplace-hero-copy">
                Pilih paket yang paling sesuai dengan kebutuhanmu sekarang. Semua paket sudah termasuk optimasi dasar, desain responsif, dan siap langsung dipakai.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="marketplace-grid pb-24 relative z-10">
          <div className="container-shell">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Reveal key={plan.name} delay={index * 0.1}>
                  <div
                    className={cn(
                      "relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] p-8 transition-all duration-300",
                      plan.featured
                        ? "bg-navy text-white shadow-card ring-2 ring-orange ring-offset-2 ring-offset-market md:-translate-y-4 md:hover:-translate-y-6 z-10"
                        : "bg-white text-foreground border border-border shadow-sm hover:shadow-md hover:-translate-y-2 hover:border-orange/30"
                    )}
                  >
                    {plan.featured && (
                      <div className="absolute top-0 inset-x-0 flex justify-center">
                        <span className="rounded-b-xl bg-gradient-to-r from-orange to-orange-dark px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                          Paling Populer
                        </span>
                      </div>
                    )}
                    
                    <div className={cn("mb-8", plan.featured && "mt-6")}>
                      <h3 className={cn("text-xl font-bold mb-3", plan.featured ? "text-orange-glow" : "text-navy")}>
                        {plan.name}
                      </h3>
                      <div className="flex items-end gap-1 mb-4">
                        <span className={cn("text-4xl font-extrabold tracking-tight", plan.featured ? "text-white" : "text-foreground")}>
                          {plan.price}
                        </span>
                      </div>
                      <p className={cn("text-sm leading-relaxed", plan.featured ? "text-white/80" : "text-muted")}>
                        {plan.description}
                      </p>
                    </div>

                    <div className="space-y-4 flex-1 mb-8 border-t pt-6" style={{ borderColor: plan.featured ? 'rgba(255,255,255,0.1)' : 'var(--color-border)' }}>
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckCircle2 
                            aria-hidden="true" 
                            className={cn("size-5 shrink-0 mt-0.5", plan.featured ? "text-orange" : "text-success")} 
                          />
                          <span className={cn("text-sm font-medium", plan.featured ? "text-white/95" : "text-body")}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <ButtonLink
                      className={cn(
                        "w-full group/btn",
                        plan.featured
                          ? "bg-orange hover:bg-orange-dark text-white shadow-md hover:shadow-lg"
                          : "bg-surface hover:bg-navy hover:text-white text-foreground border border-border"
                      )}
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      icon={<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />}
                    >
                      Pilih Paket
                    </ButtonLink>
                    
                    {/* Decorative gradient for featured card */}
                    {plan.featured && (
                      <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-orange/20 blur-3xl pointer-events-none" aria-hidden="true" />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            
            {/* FAQ Section */}
            <div className="mt-32 max-w-3xl mx-auto">
               <Reveal>
                 <div className="text-center mb-12">
                   <h2 className="text-3xl font-extrabold text-foreground mb-4">Pertanyaan yang sering diajukan</h2>
                   <p className="text-muted">Masih ragu? Berikut beberapa pertanyaan yang sering ditanyakan klien kami.</p>
                 </div>
               </Reveal>
               
               <div className="grid gap-6">
                 {faqs.map((faq, index) => (
                   <Reveal key={faq.question} delay={index * 0.1}>
                     <div className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:border-orange/30 transition-colors">
                       <h3 className="text-lg font-bold text-foreground mb-3">{faq.question}</h3>
                       <p className="text-muted leading-relaxed">{faq.answer}</p>
                     </div>
                   </Reveal>
                 ))}
               </div>
            </div>
          </div>
        </section>

        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}
