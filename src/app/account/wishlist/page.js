"use client";

import { Heart } from "lucide-react";
import productsAll from "@/lib/mock-data/products.json";
import Eyebrow from "@/components/feedback/Eyebrow";
import EmptyState from "@/components/feedback/EmptyState";
import ProductGrid from "@/components/catalog/ProductGrid";
import Button from "@/components/primitives/Button";
import { useWishlist } from "@/lib/mock-wishlist";
import { useCart } from "@/lib/mock-cart";

export default function WishlistPage() {
  const { items, count } = useWishlist();
  const { add } = useCart();
  const products =
    items.length > 0
      ? productsAll.filter((p) => items.includes(p.slug))
      : productsAll.slice(0, 3); // placeholder demo

  const inStockProducts = products.filter((p) => p.status !== "sold-out");

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <Eyebrow>Saved Pieces</Eyebrow>
          <h1 className="font-display mt-3 text-4xl">Wishlist.</h1>
        </div>
        {inStockProducts.length > 0 && items.length > 0 && (
          <Button
            variant="secondary"
            onClick={() => inStockProducts.forEach((p) => add(p))}
          >
            Add All In-Stock to Cart
          </Button>
        )}
      </div>

      <div className="mt-10">
        {count === 0 ? (
          <>
            <EmptyState
              icon={Heart}
              title="No saved pieces yet."
              body="Tap the heart on any product to save it here."
              cta={
                <Button href="/shop" variant="primary">
                  Browse the Shop
                </Button>
              }
            />
            <div className="mt-12">
              <Eyebrow>You Might Like</Eyebrow>
              <h2 className="font-display mt-3 mb-6 text-2xl">
                A few we recommend.
              </h2>
              <ProductGrid products={products} cols={3} />
            </div>
          </>
        ) : (
          <ProductGrid products={products} cols={3} />
        )}
      </div>
    </div>
  );
}
