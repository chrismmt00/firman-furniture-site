import { cn } from "@/lib/cn";

export default function Input({ className, error, ...props }) {
  return (
    <input
      {...props}
      className={cn(
        "w-full bg-transparent border-0 border-b py-3 text-ink placeholder-taupe outline-none transition-colors",
        error
          ? "border-alert focus:border-alert"
          : "border-ink/20 focus:border-brass",
        className
      )}
    />
  );
}
