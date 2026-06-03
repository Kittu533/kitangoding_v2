import { ChevronDown, Receipt } from "lucide-react";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { PricingPlanGrid } from "@/components/organisms/PricingPlanGrid";
import { Reveal } from "@/components/atoms/Reveal";
import { faqs } from "@/lib/landing-data";
import { getPublicPricing } from "@/lib/public-content";

export async function PricingPage() {
  const pricingPlans = await getPublicPricing();

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
            <PricingPlanGrid plans={pricingPlans} />
            
            {/* FAQ Section */}
            <div className="mt-32 max-w-6xl mx-auto">
               <Reveal>
                 <div className="text-center mb-12">
                   <h2 className="text-3xl font-extrabold text-foreground mb-4">Pertanyaan yang sering diajukan</h2>
                   <p className="text-muted">Masih ragu? Berikut beberapa pertanyaan yang sering ditanyakan klien kami.</p>
                 </div>
               </Reveal>
               
               <div className="border-y border-border/80 bg-transparent">
                 {faqs.map((faq, index) => (
                   <Reveal key={faq.question} delay={index * 0.1}>
                     <details className="group border-b border-border/80 last:border-b-0">
                       <summary className="flex list-none items-center justify-between gap-6 px-8 py-7 text-left cursor-pointer select-none md:px-12">
                         <h3 className="pr-4 text-xl font-semibold text-foreground md:text-2xl">
                           {faq.question}
                         </h3>
                         <span className="flex size-10 flex-none items-center justify-center rounded-full border border-border bg-white text-foreground transition-all duration-200 group-open:rotate-180 group-open:border-orange group-open:text-orange">
                           <ChevronDown aria-hidden="true" className="size-5" />
                         </span>
                       </summary>
                       <div className="px-8 pb-7 md:px-12">
                         <p className="max-w-4xl text-base leading-8 text-body md:text-lg">
                           {faq.answer}
                         </p>
                       </div>
                     </details>
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
