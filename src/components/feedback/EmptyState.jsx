import { cn } from "@/lib/cn";

export default function EmptyState({
  icon: Icon,
  title,
  body,
  cta,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 text-center",
        className
      )}
    >
      {Icon && (
        <Icon
          aria-hidden
          strokeWidth={1.25}
          className="text-taupe mb-6 h-10 w-10"
        />
      )}
      {title && (
        <h3 className="font-display mb-2 text-2xl text-ink">{title}</h3>
      )}
      {body && <p className="max-w-md text-taupe">{body}</p>}
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  );
}
