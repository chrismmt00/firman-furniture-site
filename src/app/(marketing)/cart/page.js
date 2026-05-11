"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/mock-cart";
import products from "@/lib/mock-data/products.json";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import Placeholder from "@/components/feedback/Placeholder";
import PriceDisplay, { formatPrice } from "@/components/feedback/PriceDisplay";
import EmptyState from "@/components/feedback/EmptyState";
import Eyebrow from "@/components/feedback/Eyebrow";
import Button from "@/components/primitives/Button";
import Input from "@/components/primitives/Input";
import ProductGrid from "@/components/catalog/ProductGrid";

export default function CartPage() {
  const { items, subtotal, tax, total, remove, setQty } = useCart();
  const recommended = products
    .filter((p) => p.tags?.includes("bestseller"))
    .slice(0, 4);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <section className="mx-auto w-full max-w-screen-2xl px-6 pt-10 md:px-10">
        <Eyebrow>Your Cart</Eyebrow>
        <h1 className="font-display mt-3 text-4xl md:text-5xl">
          {items.length} {items.length === 1 ? "piece" : "pieces"}
        </h1>
      </section>

      {items.length === 0 ? (
        <section className="mx-auto w-full max-w-screen-2xl px-6 pb-24 md:px-10">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty."
            body="Pieces you add will appear here."
            cta={
              <Button href="/shop" variant="primary">
                Browse the Shop
              </Button>
            }
          />
          <div className="mt-12">
            <Eyebrow>You may also like</Eyebrow>
            <div className="mt-6">
              <ProductGrid products={recommended} cols={4} />
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-12 px-6 py-10 md:grid-cols-12 md:px-10">
          <ul className="md:col-span-8">
            {items.map((item) => (
              <li
                key={`${item.slug}-${item.variant}`}
                className="flex gap-6 border-b border-ink/10 py-8"
              >
                <Placeholder
                  ratio="1/1"
                  label={item.name}
                  className="w-32 md:w-40"
                />
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-display text-2xl leading-tight hover:text-brass-deep"
                  >
                    {item.name}
                  </Link>
                  <span className="text-taupe mt-1 text-sm">
                    Color · {item.variant}
                  </span>
                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div className="inline-flex items-center border border-ink/20">
                      <button
                        onClick={() =>
                          setQty(item.slug, item.variant, item.qty - 1)
                        }
                        className="px-3 py-2 hover:bg-bone"
                      >
                        −
                      </button>
                      <span className="px-4 text-sm">{item.qty}</span>
                      <button
                        onClick={() =>
                          setQty(item.slug, item.variant, item.qty + 1)
                        }
                        className="px-3 py-2 hover:bg-bone"
                      >
                        +
                      </button>
                    </div>
                    <PriceDisplay
                      price={item.price * item.qty}
                      size="md"
                    />
                  </div>
                  <div className="mt-3 flex gap-4 text-xs tracking-[0.15em] uppercase text-taupe">
                    <button className="hover:text-ink">Edit</button>
                    <span>·</span>
                    <button
                      onClick={() => remove(item.slug, item.variant)}
                      className="hover:text-oxblood"
                    >
                      Remove
                    </button>
                    <span>·</span>
                    <button className="hover:text-ink">Save for later</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="md:col-span-4">
            <div className="sticky top-24 border border-ink/10 bg-bone/30 p-8">
              <Eyebrow>Order Summary</Eyebrow>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-taupe">Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-taupe">Estimated tax</dt>
                  <dd>{formatPrice(tax)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-taupe">White-glove delivery</dt>
                  <dd>Free</dd>
                </div>
              </dl>
              <div className="mt-5 border-t border-ink/15 pt-5 flex items-center justify-between">
                <span className="text-xs tracking-[0.2em] uppercase">
                  Total
                </span>
                <PriceDisplay price={total} size="lg" />
              </div>
              <Button
                href="/checkout"
                variant="primary"
                className="mt-6 w-full"
              >
                Checkout →
              </Button>
              <div className="mt-6">
                <Eyebrow>Promo Code</Eyebrow>
                <div className="mt-2 flex border-b border-ink/30">
                  <Input placeholder="Code" className="!py-2 flex-1" />
                  <button className="text-xs tracking-[0.2em] uppercase text-brass-deep hover:text-ink">
                    Apply
                  </button>
                </div>
              </div>
              <p className="text-taupe mt-6 text-xs">
                Or pay over time with Klarna · Affirm.
              </p>
            </div>
          </aside>
        </section>
      )}

      {items.length > 0 && (
        <section className="mx-auto w-full max-w-screen-2xl border-t border-ink/10 px-6 py-20 md:px-10">
          <Eyebrow>You May Also Like</Eyebrow>
          <h2 className="font-display mt-3 mb-10 text-3xl">
            From the same hands.
          </h2>
          <ProductGrid products={recommended} cols={4} />
        </section>
      )}
    </>
  );
}
