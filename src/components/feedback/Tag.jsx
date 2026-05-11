import { cn } from "@/lib/cn";

export default function Tag({
  children,
  selected = false,
  onClick,
  removable = false,
  onRemove,
  className,
}) {
  const Cmp = onClick ? "button" : "span";
  return (
    <Cmp
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-1.5 text-xs tracking-[0.15em] uppercase transition-colors",
        selected
          ? "border-ink bg-ink text-ivory"
          : "border-ink/20 text-ink hover:border-ink",
        className
      )}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label="Remove"
          className="leading-none"
        >
          ×
        </button>
      )}
    </Cmp>
  );
}
