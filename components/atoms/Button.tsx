import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "light";
type ButtonSize = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:bg-navy",
  outline: "border border-navy text-navy hover:bg-navy-light",
  ghost: "border border-white/20 bg-white/10 text-white hover:bg-white/16",
  light: "bg-white text-navy hover:bg-orange-light",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "px-5 py-3 text-[14px] leading-[17px]",
  md: "px-6 py-3 text-[14px] leading-[17px]",
  lg: "px-8 py-4 text-[16px] leading-6",
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
  style,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  const classNameText = typeof className === "string" ? className : "";
  const hasTextOverride = /(^|\s)(!?text-(?!white\b)|hover:text-)/.test(classNameText);
  const shouldUseWhiteText = (variant === "primary" || variant === "ghost" || classNameText.includes("!text-white")) && !hasTextOverride;

  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
        "hover:-translate-y-0.5 active:translate-y-0",
        variantClass[variant],
        sizeClass[size],
        className
      )}
      style={{
        ...(shouldUseWhiteText ? { color: "#fff" } : {}),
        ...style,
      }}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </a>
  );
}
