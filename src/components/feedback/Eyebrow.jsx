import { cn } from "@/lib/cn";

export default function Eyebrow({ children, className, tone = "brass" }) {
  return (
    <span
      className={cn(
        "block text-[11px] font-medium uppercase tracking-[0.22em]",
        tone === "brass" && "text-brass",
        tone === "ivory" && "text-ivory/80",
        tone === "ink" && "text-ink",
        tone === "taupe" && "text-taupe",
        className
      )}
    >
      {children}
    </span>
  );
}
