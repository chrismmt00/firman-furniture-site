import { cn } from "@/lib/cn";

export default function Select({ className, children, error, ...props }) {
  return (
    <select
      {...props}
      className={cn(
        "w-full bg-transparent border-0 border-b py-3 pr-8 text-ink outline-none transition-colors appearance-none cursor-pointer",
        error
          ? "border-alert focus:border-alert"
          : "border-ink/20 focus:border-brass",
        className
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%231A1715' stroke-width='1'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.5rem center",
      }}
    >
      {children}
    </select>
  );
}
