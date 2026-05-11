import { cn } from "@/lib/cn";

export default function StatCard({ label, value, delta, hint, className }) {
  const positive = delta && !delta.startsWith("-");
  return (
    <div className={cn("border border-ink/10 bg-ivory p-6", className)}>
      <span className="text-[10px] tracking-[0.22em] uppercase text-taupe">
        {label}
      </span>
      <span className="font-display mt-2 block text-3xl">{value}</span>
      <div className="mt-2 flex items-end justify-between">
        {delta && (
          <span
            className={cn(
              "text-xs font-medium",
              positive ? "text-forest" : "text-oxblood"
            )}
          >
            {delta}
          </span>
        )}
        {hint && (
          <span className="text-taupe text-xs">{hint}</span>
        )}
      </div>
    </div>
  );
}
