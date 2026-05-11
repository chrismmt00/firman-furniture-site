import { cn } from "@/lib/cn";

const STATUS = {
  "in-stock": { label: "In Stock", color: "bg-forest text-ivory" },
  "low-stock": { label: "Low Stock", color: "bg-brass text-ink" },
  "back-order": { label: "Back-order", color: "bg-taupe text-ivory" },
  "sold-out": { label: "Sold Out", color: "bg-oxblood text-ivory" },
};

export default function StockBadge({ status, stock, className }) {
  const config = STATUS[status] || STATUS["in-stock"];
  const label =
    status === "low-stock" && stock != null
      ? `Only ${stock} left`
      : config.label;
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase",
        config.color,
        className
      )}
    >
      {label}
    </span>
  );
}
