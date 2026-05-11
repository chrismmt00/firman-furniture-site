"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import Eyebrow from "@/components/feedback/Eyebrow";
import { cn } from "@/lib/cn";

const SECTIONS = [
  {
    title: "Aniline Leather",
    do: ["Dust weekly with a soft cloth", "Condition annually with neutral leather cream", "Embrace the patina"],
    dont: ["Direct sunlight for extended periods", "Harsh chemical cleaners", "Wet cloths"],
  },
  {
    title: "Belgian Linen",
    do: ["Vacuum monthly with upholstery attachment", "Spot-clean spills with cool water", "Rotate cushions seasonally"],
    dont: ["Bleach", "Tumble dry"],
  },
  {
    title: "Bouclé",
    do: ["Vacuum biweekly using a soft brush", "Address spills immediately"],
    dont: ["Vigorous brushing", "Heat-based stain treatments"],
  },
  {
    title: "Velvet",
    do: ["Steam gently to refresh nap", "Brush with a soft horsehair brush"],
    dont: ["Sharp objects", "Direct sunlight"],
  },
  {
    title: "Solid Walnut & Oak",
    do: ["Wipe with a damp cloth, dry immediately", "Apply furniture wax twice a year", "Use coasters under glassware"],
    dont: ["Place near radiators", "Use silicone sprays"],
  },
  {
    title: "Marble",
    do: ["Reseal annually", "Wipe with pH-neutral soap"],
    dont: ["Acidic cleaners (vinegar, lemon)"],
  },
  {
    title: "Brass",
    do: ["Polish twice yearly with brass cream", "Allow patina to develop if preferred"],
    dont: ["Abrasive scrubbers"],
  },
  {
    title: "Outdoor Teak",
    do: ["Power wash gently each spring", "Apply teak oil annually if you prefer the warm tone"],
    dont: ["Use a varnish — let it weather"],
  },
];

function Accordion({ section }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-6"
      >
        <span className="font-display text-2xl">{section.title}</span>
        <ChevronDown
          strokeWidth={1.25}
          className={cn(
            "h-5 w-5 transition-transform",
            open ? "rotate-180" : ""
          )}
        />
      </button>
      {open && (
        <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-2">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-brass-deep">
              Do
            </span>
            <ul className="mt-3 space-y-2 text-taupe">
              {section.do.map((d) => (
                <li key={d}>· {d}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-oxblood">
              Don't
            </span>
            <ul className="mt-3 space-y-2 text-taupe">
              {section.dont.map((d) => (
                <li key={d}>· {d}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CarePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Care Guide" }]} />
      <section className="mx-auto w-full max-w-screen-md px-6 py-16 text-center md:px-10">
        <Eyebrow>Care Guide</Eyebrow>
        <h1 className="font-display mt-4 text-4xl md:text-5xl">
          Heirlooms, well kept.
        </h1>
        <p className="text-taupe mt-6 text-lg">
          Material-by-material guidance to keep your Firman pieces looking
          better with each passing year.
        </p>
      </section>
      <section className="mx-auto w-full max-w-screen-lg px-6 pb-24 md:px-10">
        {SECTIONS.map((s) => (
          <Accordion key={s.title} section={s} />
        ))}
      </section>
    </>
  );
}
