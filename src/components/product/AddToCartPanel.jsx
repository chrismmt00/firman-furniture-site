"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Button from "@/components/primitives/Button";
import PriceDisplay, { formatPrice } from "@/components/feedback/PriceDisplay";
import StockBadge from "@/components/feedback/StockBadge";
import Eyebrow from "@/components/feedback/Eyebrow";
import BackInStockModal from "@/components/modals/BackInStockModal";
import DeliveryEstimator from "./DeliveryEstimator";
import { useCart } from "@/lib/mock-cart";
import { useWishlist } from "@/lib/mock-wishlist";
import { cn } from "@/lib/cn";

export default function AddToCartPanel({ product }) {
  const [color, setColor] = useState(product.colors?.[0]);
  const [qty, setQty] = useState(1);
  const [bisOpen, setBisOpen] = useState(false);
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const wishlisted = has(product.slug);
  const soldOut = product.status === "sold-out" || product.stock === 0;

  return (
    <>
      <div className="flex flex-col gap-6">
        <div>
          <Eyebrow>{(product.collection || "Firman").replace(/-/g, " ")}</Eyebrow>
          <h1 className="font-display mt-3 text-3xl leading-tight sm:text-4xl md:text-5xl">
            {product.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-taupe">
            <span>★★★★★</span>
            <span>
              {product.rating || 4.7} ({product.reviews || 0} reviews)
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <PriceDisplay price={product.price} compareAt={product.compareAt} size="lg" />
          <StockBadge status={product.status} stock={product.stock} />
        </div>

        {product.colors?.length > 0 && (
          <div>
            <Eyebrow>Color · {color}</Eyebrow>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "border px-4 py-2 text-xs tracking-[0.15em] uppercase",
                    c === color
                      ? "border-ink bg-ink text-ivory"
                      : "border-ink/20 hover:border-ink"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <Eyebrow>Quantity</Eyebrow>
          <div className="mt-3 inline-flex items-center border border-ink/20">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-4 py-2 hover:bg-bone"
            >
              −
            </button>
            <span className="px-5 text-sm">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-4 py-2 hover:bg-bone"
            >
              +
            </button>
          </div>
        </div>

        {soldOut ? (
          <Button
            variant="primary"
            className="w-full"
            onClick={() => setBisOpen(true)}
          >
            Notify When Available
          </Button>
        ) : (
          <Button
            variant="primary"
            className="w-full justify-between"
            onClick={() => add(product, { color, qty })}
          >
            <span>Add to Cart</span>
            <span>{formatPrice(product.price * qty)}</span>
          </Button>
        )}

        <button
          type="button"
          onClick={() => toggle(product.slug)}
          className="flex items-center gap-2 self-start text-xs tracking-[0.15em] uppercase text-ink hover:text-brass-deep"
        >
          <Heart
            strokeWidth={1.25}
            className={cn(
              "h-4 w-4",
              wishlisted && "fill-oxblood text-oxblood"
            )}
          />
          {wishlisted ? "Saved" : "Save to Wishlist"}
        </button>

        <DeliveryEstimator product={product} />
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-ivory/95 backdrop-blur px-4 py-3 shadow-[0_-4px_18px_rgba(0,0,0,0.05)] md:hidden">
        <div className="mx-auto flex max-w-screen-sm items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-display truncate text-base leading-tight">
              {product.name}
            </p>
            <PriceDisplay
              price={product.price}
              compareAt={product.compareAt}
              size="sm"
              className="mt-0.5"
            />
          </div>
          {soldOut ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setBisOpen(true)}
              className="shrink-0"
            >
              Notify Me
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => add(product, { color, qty })}
              className="shrink-0"
            >
              Add · {formatPrice(product.price * qty)}
            </Button>
          )}
        </div>
      </div>

      <BackInStockModal
        open={bisOpen}
        onClose={() => setBisOpen(false)}
        product={product}
      />
    </>
  );
}
