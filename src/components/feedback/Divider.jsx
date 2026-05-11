import { cn } from "@/lib/cn";

export default function Divider({ className, tone = "brass" }) {
  return (
    <hr
      className={cn(
        "border-0 border-t",
        tone === "brass" && "border-brass/40",
        tone === "ink" && "border-ink/15",
        tone === "ivory" && "border-ivory/20",
        className
      )}
    />
  );
}
