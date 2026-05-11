"use client";

import Link from "next/link";
import categories from "@/lib/mock-data/categories.json";
import collections from "@/lib/mock-data/collections.json";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";

export default function MegaMenu({ open, onClose }) {
  if (!open) return null;
  const featured = collections[0];
  return (
    <div
      className="absolute inset-x-0 top-full z-40 border-t border-brass/30 bg-ivory shadow-2xl"
      onMouseLeave={onClose}
    >
      <div className="mx-auto grid max-w-screen-2xl grid-cols-12 gap-10 px-10 py-10">
        <div className="col-span-3">
          <Eyebrow>Shop By Room</Eyebrow>
          <ul className="mt-5 space-y-2">
            {categories.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop/${c.slug}`}
                  className="font-display text-2xl text-ink hover:text-brass-deep"
                  onClick={onClose}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          <Eyebrow>&nbsp;</Eyebrow>
          <ul className="mt-5 space-y-2">
            {categories.slice(4).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop/${c.slug}`}
                  className="font-display text-2xl text-ink hover:text-brass-deep"
                  onClick={onClose}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Eyebrow>Featured Subcategories</Eyebrow>
            <ul className="mt-3 space-y-1.5 text-sm text-taupe">
              <li>
                <Link
                  href="/shop/living-room/sectionals"
                  onClick={onClose}
                  className="hover:text-ink"
                >
                  Sectionals
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/dining/dining-tables"
                  onClick={onClose}
                  className="hover:text-ink"
                >
                  Dining Tables
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/lighting/chandeliers"
                  onClick={onClose}
                  className="hover:text-ink"
                >
                  Chandeliers
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/rugs/hand-knotted"
                  onClick={onClose}
                  className="hover:text-ink"
                >
                  Hand-knotted Rugs
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-6">
          <Eyebrow>The Collection</Eyebrow>
          <Link
            href={`/collections/${featured.slug}`}
            onClick={onClose}
            className="mt-4 block group"
          >
            <Placeholder
              ratio="16/9"
              tone="oxblood"
              label={featured.name}
            />
            <h3 className="font-display mt-4 text-3xl text-ink group-hover:text-brass-deep">
              {featured.name}
            </h3>
            <p className="text-taupe mt-1">{featured.tagline}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
