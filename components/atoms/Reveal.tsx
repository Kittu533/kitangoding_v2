"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  once = true,
  parallax = 0,
  variant = "fade-up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in";
  duration?: number;
  once?: boolean;
  parallax?: number;
}) {
  const reducedMotion = useReducedMotion();
  const distance = 24 + parallax;
  const hidden = reducedMotion
    ? { opacity: 0 }
    : {
        "fade-up": { opacity: 0, y: distance },
        "fade-down": { opacity: 0, y: -distance },
        "fade-left": { opacity: 0, x: distance },
        "fade-right": { opacity: 0, x: -distance },
        "zoom-in": { opacity: 0, scale: 0.96, y: parallax },
      }[variant];

  return (
    <motion.div
      className={className}
      initial={hidden}
      transition={{
        delay: reducedMotion ? 0 : delay,
        duration: reducedMotion ? 0.01 : duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -8% 0px" }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    >
      {children}
    </motion.div>
  );
}
