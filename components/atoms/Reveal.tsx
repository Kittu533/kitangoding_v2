"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type RevealVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in";

const variantMap: Record<RevealVariant, { x?: number; y?: number; scale?: number }> = {
  "fade-up": { y: 24 },
  "fade-down": { y: -24 },
  "fade-left": { x: 28 },
  "fade-right": { x: -28 },
  "zoom-in": { y: 20, scale: 0.96 },
};

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "fade-up",
  duration = 0.8,
  parallax = 0,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
  duration?: number;
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const hiddenState = reduceMotion ? { opacity: 1 } : { opacity: 0, ...variantMap[variant] };
  const visibleState = reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1 };
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-parallax, parallax]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hiddenState}
      style={{ y: parallaxY }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={visibleState}
    >
      {children}
    </motion.div>
  );
}
