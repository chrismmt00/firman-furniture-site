"use client";

import { useCart } from "@/lib/mock-cart";
import Placeholder from "@/components/feedback/Placeholder";
import { formatPrice } from "@/components/feedback/PriceDisplay";
import Eyebrow from "@/components/feedback/Eyebrow";
import Input from "@/components/primitives/Input";

export default function OrderSummary() {
  const { items, subtotal, tax, total } = useCart();
  return (
    <aside className="md:col-span-5">
      <div className="md:sticky md:top-24 border border-ink/10 bg-bone/30 p-6">
        <Eyebrow>Order Summary</Eyebrow>
        <ul className="mt-6 space-y-4">
          {items.length === 0 ? (
            <li className="text-taupe text-sm">Your cart is empty.</li>
          ) : (
            items.map((item) => (
              <li
                key={`${item.slug}-${item.variant}`}
                className="flex gap-3"
              >
                <Placeholder
                  ratio="1/1"
                  label={item.name}
                  className="w-16 shrink-0"
                />
                <div className="flex flex-1 flex-col">
                  <span className="font-display text-sm leading-tight">
                    {item.name}
                  </span>
                  <span className="text-taupe text-xs">
                    {item.variant} · Qty {item.qty}
                  </span>
                  <span className="text-taupe mt-auto text-sm">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
        <hr className="my-5 border-t border-ink/10" />
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-taupe">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-taupe">Delivery</dt>
            <dd>Free</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-taupe">Tax</dt>
            <dd>{formatPrice(tax)}</dd>
          </div>
        </dl>
        <hr className="my-4 border-t border-ink/15" />
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-[0.2em] uppercase">Total</span>
          <span className="font-display text-2xl">{formatPrice(total)}</span>
        </div>
        <div className="mt-5">
          <div className="flex border-b border-ink/30">
            <Input placeholder="Promo code" className="!py-2 flex-1" />
            <button className="text-xs tracking-[0.2em] uppercase text-brass-deep hover:text-ink">
              Apply
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
