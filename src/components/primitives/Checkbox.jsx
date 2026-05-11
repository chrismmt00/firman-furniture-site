import { cn } from "@/lib/cn";

export default function Checkbox({ label, className, id, ...props }) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-start gap-3 cursor-pointer select-none",
        className
      )}
    >
      <span className="relative mt-0.5 inline-block h-4 w-4 shrink-0 border border-ink/40">
        <input
          {...props}
          id={id}
          type="checkbox"
          className="peer absolute inset-0 m-0 cursor-pointer opacity-0"
        />
        <span className="absolute inset-[2px] hidden bg-ink peer-checked:block" />
      </span>
      {label && <span className="text-sm text-ink">{label}</span>}
    </label>
  );
}
