import { cn } from "@/lib/cn";

export default function Textarea({ className, error, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      {...props}
      className={cn(
        "w-full bg-transparent border-0 border-b py-3 text-ink placeholder-taupe outline-none transition-colors resize-none",
        error
          ? "border-alert focus:border-alert"
          : "border-ink/20 focus:border-brass",
        className
      )}
    />
  );
}
