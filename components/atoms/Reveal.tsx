"use client";

import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in";
  duration?: number;
  parallax?: number;
}) {
  return <div className={className}>{children}</div>;
}
