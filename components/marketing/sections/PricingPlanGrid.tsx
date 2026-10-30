import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { PublicPricingPlan } from "@/features/pricing/types";
import { whatsappHref } from "@/lib/site";
import styles from "../Studio.module.css";

export function PricingPlanGrid({ plans }: { plans: PublicPricingPlan[] }) {
  return <div className={styles.pricingGrid}>{plans.map(plan => <article className={`${styles.priceCard} ${plan.featured ? styles.featured : ""}`} key={plan.name}>
    <div className={styles.planHeading}><h3>{plan.name}</h3>{plan.featured && <span>Pilihan utama</span>}</div>
    <p>{plan.description}</p><strong className={styles.price}>{plan.price}</strong>
    <Link className={`${styles.cta} ${!plan.featured ? styles.secondary : ""}`} href={whatsappHref} data-analytics-event="pricing_cta_click" data-analytics-label={plan.name}>Diskusikan paket ini<span><ArrowUpRight size={21} aria-hidden="true" /></span></Link>
    <ul>{plan.features.map(feature => <li key={feature}><Check size={16} aria-hidden="true" />{feature}</li>)}</ul>
  </article>)}</div>;
}
