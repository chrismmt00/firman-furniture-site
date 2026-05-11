"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import Placeholder from "@/components/feedback/Placeholder";
import PriceDisplay from "@/components/feedback/PriceDisplay";
import StockBadge from "@/components/feedback/StockBadge";
import { useWishlist } from "@/lib/mock-wishlist";
import { cn } from "@/lib/cn";

export default function ProductCard({ product, tone = "light" }) {
  const { has, toggle } = useWishlist();
  const wishlisted = has(product.slug);

  return (
    <article className="group">
      <div className="relative">
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <Placeholder
            ratio="4/5"
            tone={tone}
            label={product.name}
            src={product.image}
            alt={product.name}
            className="transition-transform group-hover:scale-[1.01]"
          />
        </Link>
        <button
          type="button"
          onClick={() => toggle(product.slug)}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          className={cn(
            "absolute right-3 top-3 grid h-9 w-9 place-items-center bg-ivory/90 backdrop-blur transition-opacity",
            wishlisted ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          <Heart
            strokeWidth={1.25}
            className={cn(
              "h-4 w-4",
              wishlisted ? "fill-oxblood text-oxblood" : "text-ink"
            )}
          />
        </button>
        {product.tags?.includes("new") && (
          <span className="absolute left-3 top-3 bg-ivory px-2 py-1 text-[10px] tracking-[0.2em] uppercase">
            New
          </span>
        )}
        {product.compareAt && (
          <span className="absolute left-3 top-3 bg-oxblood text-ivory px-2 py-1 text-[10px] tracking-[0.2em] uppercase">
            Sale
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <Link
          href={`/products/${product.slug}`}
          className="font-display text-lg leading-tight hover:text-brass-deep"
        >
          {product.name}
        </Link>
        <PriceDisplay
          price={product.price}
          compareAt={product.compareAt}
          size="sm"
        />
      </div>
      <div className="mt-1.5 flex items-center justify-between text-xs text-taupe">
        <span>{product.colors?.length || 1} colorways</span>
        {product.status !== "in-stock" && (
          <StockBadge status={product.status} stock={product.stock} />
        )}
      </div>
    </article>
  );
}
