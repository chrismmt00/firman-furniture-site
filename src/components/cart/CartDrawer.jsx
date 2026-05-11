"use client";

import Link from "next/link";
import Dialog from "@/components/modals/Dialog";
import Button from "@/components/primitives/Button";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";
import { useCart } from "@/lib/mock-cart";
import { formatPrice } from "@/components/feedback/PriceDisplay";
import { ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { items, subtotal, drawerOpen, closeDrawer, remove, setQty } = useCart();

  return (
    <Dialog
      open={drawerOpen}
      onClose={closeDrawer}
      side="right"
      size="md"
      ariaLabel="Cart"
    >
      <div className="flex h-screen flex-col">
        <div className="border-b border-ink/10 px-6 pt-6 pb-4">
          <Eyebrow>Your Cart</Eyebrow>
          <h2 className="font-display mt-1 text-2xl">
            {items.length} {items.length === 1 ? "item" : "items"}
          </h2>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag
              strokeWidth={1.25}
              className="text-taupe h-10 w-10"
            />
            <h3 className="font-display mt-4 text-2xl">Your cart is empty</h3>
            <p className="text-taupe mt-2">
              Pieces you add will appear here.
            </p>
            <Button
              href="/shop"
              variant="primary"
              className="mt-8"
              onClick={closeDrawer}
            >
              Browse the Shop
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.variant}`}
                  className="flex gap-4 border-b border-ink/10 py-4"
                >
                  <Placeholder
                    ratio="1/1"
                    label={item.name}
                    className="w-24"
                  />
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeDrawer}
                      className="font-display text-lg leading-tight hover:text-brass-deep"
                    >
                      {item.name}
                    </Link>
                    <span className="text-taupe mt-1 text-sm">
                      {item.variant}
                    </span>
                    <div className="mt-auto flex items-end justify-between">
                      <div className="inline-flex items-center border border-ink/20">
                        <button
                          type="button"
                          onClick={() =>
                            setQty(item.slug, item.variant, item.qty - 1)
                          }
                          className="px-2 py-1 text-ink hover:bg-bone"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="px-3 text-sm">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setQty(item.slug, item.variant, item.qty + 1)
                          }
                          className="px-2 py-1 text-ink hover:bg-bone"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(item.slug, item.variant)}
                      className="text-taupe hover:text-oxblood mt-2 self-start text-xs tracking-[0.15em] uppercase"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-ink/10 px-6 py-5">
              <div className="flex justify-between text-sm">
                <span className="text-taupe tracking-[0.15em] uppercase">
                  Subtotal
                </span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-taupe mt-1 text-xs">
                White-glove delivery & taxes calculated at checkout.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button
                  href="/checkout"
                  variant="primary"
                  className="w-full"
                  onClick={closeDrawer}
                >
                  Checkout
                </Button>
                <Button
                  href="/cart"
                  variant="secondary"
                  className="w-full"
                  onClick={closeDrawer}
                >
                  View Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
