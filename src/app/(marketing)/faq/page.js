"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import Eyebrow from "@/components/feedback/Eyebrow";
import Input from "@/components/primitives/Input";
import { cn } from "@/lib/cn";

const FAQS = [
  {
    category: "Orders",
    items: [
      { q: "Can I modify or cancel my order?", a: "Yes — within 24 hours of placing your order, just contact customer care." },
      { q: "When will my card be charged?", a: "Cards are authorized at order placement and charged when the piece ships." },
      { q: "Do you offer financing?", a: "Yes — Affirm and Klarna are available at checkout for orders over $500." },
    ],
  },
  {
    category: "Delivery",
    items: [
      { q: "What is white-glove delivery?", a: "A two-person crew brings the piece into your room of choice, performs light assembly, and removes all packaging." },
      { q: "Can I schedule delivery?", a: "Yes — at checkout you can choose a date and 3-hour window." },
      { q: "What if I'm not home?", a: "We'll require a signature. Reschedule any time up to 24 hours before delivery." },
    ],
  },
  {
    category: "Returns",
    items: [
      { q: "How long do I have to return?", a: "30 days from delivery for a full refund." },
      { q: "Who pays for return shipping?", a: "We do — white-glove pickup is included." },
    ],
  },
  {
    category: "Product Care",
    items: [
      { q: "How do I care for aniline leather?", a: "See our care guide for material-specific guidance." },
      { q: "Is patina normal?", a: "Yes — aniline leather, brass, and walnut all develop a patina over time. We consider this a feature, not a flaw." },
    ],
  },
  {
    category: "Account",
    items: [
      { q: "Do I need an account to order?", a: "No, but creating one lets you track orders, save addresses, and access the heirloom warranty." },
      { q: "How do I reset my password?", a: "Use the 'Forgot password' link on the sign-in page." },
    ],
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-ink/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-base">{item.q}</span>
        <ChevronDown
          strokeWidth={1.25}
          className={cn(
            "h-4 w-4 shrink-0 transition-transform",
            open ? "rotate-180" : ""
          )}
        />
      </button>
      {open && <p className="text-taupe pb-6 pr-8">{item.a}</p>}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <section className="mx-auto w-full max-w-screen-md px-6 pt-16 pb-12 text-center md:px-10">
        <Eyebrow>FAQ</Eyebrow>
        <h1 className="font-display mt-4 text-4xl md:text-5xl">
          Frequently asked.
        </h1>
        <div className="mt-8 mx-auto flex max-w-md items-center border-b border-ink/30">
          <Search strokeWidth={1.25} className="h-4 w-4 text-taupe" />
          <Input placeholder="Search the FAQ" className="!py-3 ml-3" />
        </div>
      </section>
      <section className="mx-auto w-full max-w-screen-md px-6 pb-24 md:px-10">
        {FAQS.map((cat) => (
          <div key={cat.category} className="mb-12">
            <Eyebrow>{cat.category}</Eyebrow>
            <div className="mt-3">
              {cat.items.map((it, i) => (
                <FAQItem key={i} item={it} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
