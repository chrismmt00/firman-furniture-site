import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export default function StepIndicator({ steps, current }) {
  return (
    <ol className="mx-auto flex w-full max-w-3xl items-center justify-between gap-2">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const Cmp = done ? Link : "span";
        return (
          <li
            key={step.key}
            className="flex flex-1 items-center gap-2 last:flex-none"
          >
            <Cmp
              {...(done ? { href: `?step=${step.key}` } : {})}
              className={cn(
                "flex items-center gap-2 text-xs tracking-[0.2em] uppercase",
                active && "text-ink",
                done && "text-brass-deep hover:text-ink",
                !active && !done && "text-taupe"
              )}
            >
              <span
                className={cn(
                  "grid h-7 w-7 place-items-center border text-[10px]",
                  active && "border-ink bg-ink text-ivory",
                  done && "border-brass bg-brass text-ink",
                  !active && !done && "border-ink/20"
                )}
              >
                {done ? (
                  <Check strokeWidth={1.5} className="h-3.5 w-3.5" />
                ) : (
                  i + 1
                )}
              </span>
              <span className="hidden md:inline">{step.label}</span>
            </Cmp>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "h-px flex-1",
                  done ? "bg-brass" : "bg-ink/15"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
