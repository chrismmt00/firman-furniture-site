"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

function Row({ label, openByDefault = false, children }) {
  const [open, setOpen] = useState(openByDefault);
  return (
    <div className="border-t border-ink/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-xs tracking-[0.2em] uppercase">{label}</span>
        <ChevronDown
          strokeWidth={1.25}
          className={cn(
            "h-4 w-4 transition-transform",
            open ? "rotate-180" : ""
          )}
        />
      </button>
      {open && <div className="pb-6 text-taupe">{children}</div>}
    </div>
  );
}

export default function ProductSpecs({ product }) {
  return (
    <section className="mx-auto w-full max-w-screen-lg px-6 py-16 md:px-10">
      <Row label="Dimensions" openByDefault>
        <p>{product.dimensions}</p>
      </Row>
      <Row label="Materials">
        <ul className="space-y-1">
          {(product.materials || ["Solid hardwood", "Hand-applied finish"]).map(
            (m) => (
              <li key={m}>· {m}</li>
            )
          )}
        </ul>
      </Row>
      <Row label="Construction">
        <p>
          Built by hand in our New Bedford atelier. Hand-tied eight-way coils,
          mortise-and-tenon joinery, kiln-dried hardwood frames.
        </p>
      </Row>
      <Row label="Care">
        <p>
          Regular dusting with a soft cloth. Avoid direct sunlight. See our{" "}
          <a href="/care" className="underline underline-offset-4">
            care guide
          </a>{" "}
          for material-specific guidance.
        </p>
      </Row>
      <Row label="Shipping & Returns">
        <p>
          {product.delivery === "white-glove"
            ? "White-glove delivery included. Two-person crew, in-room placement, packaging removed. Returns accepted within 30 days."
            : "Standard delivery in 5–7 business days. Returns accepted within 30 days."}
        </p>
      </Row>
    </section>
  );
}
