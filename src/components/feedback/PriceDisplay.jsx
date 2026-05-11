import { cn } from "@/lib/cn";

export function formatPrice(value) {
  if (value == null) return "";
  return `$${value.toLocaleString("en-US")}`;
}

export default function PriceDisplay({
  price,
  compareAt,
  size = "md",
  className,
}) {
  const sized =
    size === "lg"
      ? "text-2xl"
      : size === "sm"
        ? "text-sm"
        : "text-base";
  return (
    <span className={cn("inline-flex items-baseline gap-2", sized, className)}>
      <span className={cn(compareAt && "text-oxblood")}>
        {formatPrice(price)}
      </span>
      {compareAt && (
        <span className="text-taupe text-sm line-through">
          {formatPrice(compareAt)}
        </span>
      )}
    </span>
  );
}
