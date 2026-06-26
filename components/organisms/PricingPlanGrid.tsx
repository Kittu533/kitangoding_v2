import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import type { PublicPricingPlan } from "@/lib/public-content";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PricingPlanGrid({
  plans,
  delayStep = 0.1,
}: {
  plans: PublicPricingPlan[];
  delayStep?: number;
}) {
  return (
    <div className="grid max-w-7xl gap-8 mx-auto md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan, index) => (
        <Reveal key={plan.name} delay={index * delayStep}>
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
                  Paling Dipilih
                </span>
              </div>
            )}

            <div className={cn("mb-8", plan.featured && "mt-6")}>
              <h3 className={cn("mb-3 text-xl font-bold", plan.featured ? "!text-orange-glow" : "!text-navy")}>
                {plan.name}
              </h3>
              <div className="mb-4 flex items-end gap-1">
                <span className={cn("text-4xl font-extrabold tracking-tight", plan.featured ? "!text-white" : "!text-foreground")}>
                  {plan.price}
                </span>
              </div>
              <p className={cn("text-sm leading-relaxed", plan.featured ? "!text-white/82" : "!text-body")}>
                {plan.description}
              </p>
            </div>

            <div
              className="mb-8 flex-1 space-y-4 border-t pt-6"
              style={{ borderColor: plan.featured ? "rgba(255,255,255,0.1)" : "var(--color-border)" }}
            >
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2
                    aria-hidden="true"
                    className={cn("mt-0.5 size-5 shrink-0", plan.featured ? "text-orange" : "text-success")}
                  />
                  <span className={cn("text-sm font-medium", plan.featured ? "!text-white" : "!text-body")}>
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
              data-analytics-event="pricing_cta_click"
              data-analytics-label={plan.name}
              icon={<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />}
              rel="noreferrer"
              target="_blank"
            >
              Konsultasi Paket Ini
            </ButtonLink>

            {plan.featured && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -bottom-24 h-48 w-48 rounded-full bg-orange/20 blur-3xl"
              />
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
