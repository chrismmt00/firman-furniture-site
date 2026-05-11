"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export default function Dialog({
  open,
  onClose,
  side = "center",
  size = "md",
  children,
  showClose = true,
  ariaLabel,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const sideClasses = {
    center:
      "fixed inset-0 flex items-center justify-center p-4",
    right:
      "fixed inset-y-0 right-0 flex",
    left:
      "fixed inset-y-0 left-0 flex",
    bottom:
      "fixed inset-x-0 bottom-0 flex items-end justify-center",
  };

  // For side="right" / "left" we use w-screen so the panel fills the
  // viewport on mobile (where the fixed parent has no explicit width),
  // then caps at max-w-* on larger screens.
  const sizeClasses = {
    sm: side === "right" || side === "left" ? "w-screen max-w-sm" : "w-full max-w-md",
    md: side === "right" || side === "left" ? "w-screen max-w-md" : "w-full max-w-lg",
    lg: side === "right" || side === "left" ? "w-screen max-w-lg" : "w-full max-w-2xl",
    xl: side === "right" || side === "left" ? "w-screen max-w-xl" : "w-full max-w-4xl",
    full: "w-screen max-w-full h-full",
  };

  const panelMotion = {
    center: "animate-[dialog-fade-in_180ms_ease-out]",
    right: "animate-[dialog-slide-left_220ms_ease-out]",
    left: "animate-[dialog-slide-right_220ms_ease-out]",
    bottom: "animate-[dialog-slide-up_220ms_ease-out]",
  };

  return (
    <div
      role="dialog"
      aria-modal
      aria-label={ariaLabel}
      className="fixed inset-0 z-50"
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className={sideClasses[side]}>
        <div
          className={cn(
            "relative bg-ivory shadow-2xl",
            sizeClasses[size],
            panelMotion[side]
          )}
        >
          {showClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 text-ink/60 hover:text-ink"
            >
              <X strokeWidth={1.25} className="h-5 w-5" />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
