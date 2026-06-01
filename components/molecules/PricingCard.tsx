import { Check } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  plan: {
    name: string;
    price: string;
    description: string;
    features: readonly string[];
    featured: boolean;
  };
  ctaHref: string;
};

export function PricingCard({ ctaHref, plan }: PricingCardProps) {
  return (
    <article
      className={cn(
        "relative rounded-lg p-7 shadow-card",
        plan.featured
          ? "bg-navy text-white lg:-translate-y-2"
          : "border border-border bg-surface-2 text-foreground"
      )}
    >
      {plan.featured ? (
        <span className="absolute top-6 right-6 rounded-full bg-orange px-3 py-1 text-xs font-bold text-white uppercase">
          Paling laris
        </span>
      ) : null}
      <p className={plan.featured ? "text-sm text-white/65" : "text-sm text-muted"}>{plan.name}</p>
      <h3 className="mt-3 font-display text-4xl font-bold">{plan.price}</h3>
      <p className={cn("mt-4 leading-8", plan.featured ? "text-white/75" : "text-muted")}>
        {plan.description}
      </p>
      <ul className="mt-6 space-y-3 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <Check
              aria-hidden="true"
              className={cn("mt-0.5 size-5 flex-none", plan.featured ? "text-orange" : "text-navy")}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <ButtonLink
        className="mt-8 w-full"
        href={ctaHref}
        rel="noreferrer"
        target="_blank"
        variant={plan.featured ? "primary" : "outline"}
      >
        Diskusikan Paket
      </ButtonLink>
    </article>
  );
}
