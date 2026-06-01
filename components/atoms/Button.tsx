import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "light";
type ButtonSize = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-orange text-white hover:bg-orange-dark",
  outline: "border border-navy text-navy hover:bg-navy-light",
  ghost: "border border-white/20 bg-white/10 text-white hover:bg-white/16",
  light: "bg-white text-navy hover:bg-orange-light",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "px-5 py-3 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

export function ButtonLink({
  children,
  className,
  icon,
  size = "md",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
        "hover:-translate-y-0.5 active:translate-y-0",
        variantClass[variant],
        sizeClass[size],
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </a>
  );
}
