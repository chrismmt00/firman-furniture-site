import Link from "next/link";
import { cn } from "@/lib/cn";

const VARIANTS = {
  primary:
    "bg-ink text-ivory border border-ink hover:bg-ink-soft",
  secondary:
    "bg-transparent text-ink border border-brass hover:border-ink hover:bg-bone",
  ghost:
    "bg-transparent text-ink border border-transparent hover:bg-bone",
  link: "bg-transparent text-ink border-0 underline underline-offset-[6px] decoration-brass hover:decoration-ink p-0",
  destructive:
    "bg-oxblood text-ivory border border-oxblood hover:bg-oxblood-deep",
  inverted:
    "bg-ivory text-ink border border-ivory hover:bg-bone",
  brass:
    "bg-brass text-ink border border-brass hover:bg-brass-deep",
};

const SIZES = {
  sm: "px-4 py-2 text-[10px]",
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-xs",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  type = "button",
  disabled = false,
  ...rest
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium tracking-[0.15em] uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
    VARIANTS[variant] || VARIANTS.primary,
    variant !== "link" && SIZES[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}
