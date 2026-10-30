import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { PortfolioCard as PortfolioCardData } from "@/features/portfolio/types";
import styles from "./Portfolio.module.css";

export function PortfolioCard({ item }: { item: PortfolioCardData }) {
  return <Link href={`/portfolio/${item.slug}`} className={styles.card}>
    <div className={styles.cardVisual}>
      {item.thumbnail ? <Image src={item.thumbnail} alt={`Tampilan project ${item.name}`} fill sizes="(max-width: 700px) 90vw, 80vw" unoptimized={item.thumbnail.startsWith('/api/')} /> : <div className={styles.placeholder} aria-hidden="true">{item.name.charAt(0)}</div>}
      <div className={styles.scrim} />
      <span className={styles.projectLabel}>{item.name}</span>
      <span className={styles.cardArrow}><ArrowUpRight size={20} aria-hidden="true" /></span>
      <span className={styles.category}>• {item.category}</span>
    </div>
    <div className={styles.cardCaption}><h3>{item.name}</h3><span>Lihat project <ArrowUpRight size={13} aria-hidden="true" /></span></div>
  </Link>;
}
