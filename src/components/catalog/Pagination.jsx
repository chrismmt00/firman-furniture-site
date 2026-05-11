import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export default function Pagination({ page = 1, total = 1 }) {
  const pages = Array.from({ length: Math.min(total, 5) }, (_, i) => i + 1);
  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-center gap-3 text-sm tracking-[0.15em] uppercase"
    >
      <button
        aria-label="Previous"
        className="grid h-9 w-9 place-items-center border border-ink/20 hover:border-ink"
      >
        <ChevronLeft strokeWidth={1.25} className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={cn(
            "h-9 w-9",
            p === page
              ? "border border-ink bg-ink text-ivory"
              : "border border-transparent hover:border-ink"
          )}
        >
          {p}
        </button>
      ))}
      {total > 5 && <span className="text-taupe">…</span>}
      <button
        aria-label="Next"
        className="grid h-9 w-9 place-items-center border border-ink/20 hover:border-ink"
      >
        <ChevronRight strokeWidth={1.25} className="h-4 w-4" />
      </button>
      <span className="ml-4 text-xs text-taupe">
        Page {page} of {total}
      </span>
    </nav>
  );
}
