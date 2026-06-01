import { Reveal } from "@/components/atoms/Reveal";
import { PricingCard } from "@/components/molecules/PricingCard";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { pricingPlans } from "@/lib/landing-data";
import { whatsappHref } from "@/lib/site";

export function PricingSection() {
  return (
    <section className="section-space bg-white" id="harga">
      <div className="container-shell">
        <SectionHeader
          align="center"
          description="Scope akhir tetap kami sesuaikan dengan brief, tapi gambaran ini membantu kamu menilai opsi mana yang paling realistis untuk mulai."
          eyebrow="Harga yang transparan"
          title="Pilih paket sesuai tahap bisnismu sekarang."
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-4">
          {pricingPlans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.06}>
              <PricingCard ctaHref={whatsappHref} plan={plan} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
