"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import Checkbox from "@/components/primitives/Checkbox";

const FACETS = [
  {
    key: "subcategory",
    label: "Type",
    options: [
      { value: "sofas", label: "Sofas" },
      { value: "sectionals", label: "Sectionals" },
      { value: "chairs", label: "Chairs" },
      { value: "coffee-tables", label: "Coffee Tables" },
      { value: "side-tables", label: "Side Tables" },
    ],
  },
  {
    key: "material",
    label: "Material",
    options: [
      { value: "leather", label: "Leather" },
      { value: "linen", label: "Belgian Linen" },
      { value: "boucle", label: "Bouclé" },
      { value: "velvet", label: "Velvet" },
      { value: "walnut", label: "Walnut" },
      { value: "oak", label: "Oak" },
    ],
  },
  {
    key: "color",
    label: "Color",
    options: [
      { value: "ivory", label: "Ivory" },
      { value: "forest", label: "Forest" },
      { value: "oxblood", label: "Oxblood" },
      { value: "charcoal", label: "Charcoal" },
      { value: "walnut", label: "Walnut" },
      { value: "brass", label: "Brass" },
    ],
  },
  {
    key: "price",
    label: "Price",
    options: [
      { value: "u1k", label: "Under $1,000" },
      { value: "1-3k", label: "$1,000 – $3,000" },
      { value: "3-6k", label: "$3,000 – $6,000" },
      { value: "6kp", label: "$6,000+" },
    ],
  },
];

function FilterGroup({ facet }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-ink/10 py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-xs tracking-[0.2em] uppercase"
      >
        <span>{facet.label}</span>
        <ChevronDown
          strokeWidth={1.25}
          className={cn(
            "h-4 w-4 transition-transform",
            open ? "" : "-rotate-90"
          )}
        />
      </button>
      {open && (
        <div className="mt-4 flex flex-col gap-3">
          {facet.options.map((o) => (
            <Checkbox
              key={o.value}
              id={`${facet.key}-${o.value}`}
              label={o.label}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilterPanel({ className }) {
  return (
    <aside className={cn("sticky top-24 self-start", className)}>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs tracking-[0.2em] uppercase text-taupe">
          Refine
        </span>
        <button className="text-xs tracking-[0.15em] uppercase text-brass-deep underline underline-offset-4">
          Clear All
        </button>
      </div>
      <div className="border-t border-ink/10">
        <div className="border-b border-ink/10 py-5">
          <Checkbox id="in-stock" label="In stock only" defaultChecked />
        </div>
        <div className="border-b border-ink/10 py-5">
          <Checkbox id="on-sale" label="On sale" />
        </div>
        {FACETS.map((f) => (
          <FilterGroup key={f.key} facet={f} />
        ))}
      </div>
    </aside>
  );
}
