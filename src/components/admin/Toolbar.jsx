import { cn } from "@/lib/cn";

export default function Toolbar({ children, className }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4 mb-6",
        className
      )}
    >
      {children}
    </div>
  );
}
