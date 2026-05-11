"use client";

import Link from "next/link";
import orders from "@/lib/mock-data/orders.json";
import products from "@/lib/mock-data/products.json";
import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";
import ProductGrid from "@/components/catalog/ProductGrid";
import Button from "@/components/primitives/Button";
import { formatPrice } from "@/components/feedback/PriceDisplay";
import { useAuth } from "@/lib/mock-auth";
import { useWishlist } from "@/lib/mock-wishlist";

export default function AccountOverviewPage() {
  const { user } = useAuth();
  const { count: wishCount } = useWishlist();
  const myOrders = orders.filter((o) => o.customerId === "c-1001");
  const recent = myOrders[0];
  const recommended = products.slice(0, 4);

  return (
    <div>
      <Eyebrow>Welcome Back</Eyebrow>
      <h1 className="font-display mt-3 text-4xl">
        Hello, {user?.name?.split(" ")[0] || "Christian"}.
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Stat label="Active Orders" value={myOrders.filter((o) => o.status !== "delivered").length} hint="Track shipments" href="/account/orders" />
        <Stat label="Wishlist" value={wishCount} hint="Pieces saved" href="/account/wishlist" />
        <Stat label="Saved Addresses" value={1} hint="Manage" href="/account/addresses" />
      </div>

      {recent && (
        <section className="mt-12">
          <Eyebrow>Most Recent</Eyebrow>
          <div className="mt-4 border border-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl">{recent.id}</h3>
                <p className="text-taupe mt-1 text-sm">
                  Placed {recent.placedAt} ·{" "}
                  <span className="capitalize">{recent.status}</span>
                </p>
              </div>
              <Link
                href={`/account/orders/${recent.id}`}
                className="text-xs tracking-[0.2em] uppercase border-b border-brass pb-1 hover:border-ink"
              >
                View Order
              </Link>
            </div>
            <ul className="mt-6 flex gap-4">
              {recent.items.map((it) => (
                <li key={it.slug} className="w-24 shrink-0">
                  <Placeholder ratio="1/1" label={it.name} />
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
              <span className="text-taupe text-sm">
                {recent.items.length} pieces
              </span>
              <span className="font-medium">{formatPrice(recent.total)}</span>
            </div>
          </div>
        </section>
      )}

      <section className="mt-16">
        <Eyebrow>Recommended For You</Eyebrow>
        <h2 className="font-display mt-3 mb-6 text-3xl">
          Pieces we picked for you.
        </h2>
        <ProductGrid products={recommended} cols={4} />
      </section>
    </div>
  );
}

function Stat({ label, value, hint, href }) {
  return (
    <Link
      href={href}
      className="block border border-ink/10 p-6 transition-colors hover:border-ink"
    >
      <span className="text-xs tracking-[0.2em] uppercase text-taupe">
        {label}
      </span>
      <span className="font-display mt-2 block text-4xl">{value}</span>
      <span className="text-taupe mt-3 block text-xs">{hint} →</span>
    </Link>
  );
}
