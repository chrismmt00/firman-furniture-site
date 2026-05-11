import { cn } from "@/lib/cn";

export default function FormField({
  label,
  helper,
  error,
  required,
  children,
  className,
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <span className="mb-2 text-[11px] tracking-[0.2em] uppercase text-taupe">
          {label}
          {required && <span className="text-oxblood ml-1">*</span>}
        </span>
      )}
      {children}
      {(helper || error) && (
        <span
          className={cn(
            "mt-1.5 text-xs",
            error ? "text-alert" : "text-taupe"
          )}
        >
          {error || helper}
        </span>
      )}
    </div>
  );
}
