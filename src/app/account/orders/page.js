"use client";

import Link from "next/link";
import { useState } from "react";
import orders from "@/lib/mock-data/orders.json";
import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";
import Tag from "@/components/feedback/Tag";
import Button from "@/components/primitives/Button";
import { formatPrice } from "@/components/feedback/PriceDisplay";
import { cn } from "@/lib/cn";

const TABS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_CLR = {
  pending: "bg-bone text-ink",
  processing: "bg-brass text-ink",
  shipped: "bg-forest text-ivory",
  delivered: "bg-ink text-ivory",
  cancelled: "bg-oxblood text-ivory",
};

export default function OrdersPage() {
  const [tab, setTab] = useState("all");
  const myOrders = orders.filter((o) => o.customerId === "c-1001" || true);
  const filtered = myOrders.filter((o) => {
    if (tab === "all") return true;
    if (tab === "active")
      return ["pending", "processing", "shipped"].includes(o.status);
    return o.status === tab;
  });

  return (
    <div>
      <Eyebrow>My Orders</Eyebrow>
      <h1 className="font-display mt-3 text-4xl">Orders.</h1>

      <div className="mt-8 flex gap-2 border-b border-ink/10 pb-4">
        {TABS.map((t) => (
          <Tag
            key={t.value}
            selected={tab === t.value}
            onClick={() => setTab(t.value)}
          >
            {t.label}
          </Tag>
        ))}
      </div>

      <ul className="mt-8 space-y-6">
        {filtered.length === 0 && (
          <li className="border border-ink/10 p-10 text-center text-taupe">
            No orders here yet.
          </li>
        )}
        {filtered.map((o) => (
          <li key={o.id} className="border border-ink/10 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl">{o.id}</h3>
                <p className="text-taupe mt-1 text-sm">
                  Placed{" "}
                  {new Date(o.placedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  · {o.deliveryMethod === "white-glove"
                    ? "White-glove"
                    : "Standard"}
                </p>
              </div>
              <span
                className={cn(
                  "px-3 py-1 text-[10px] tracking-[0.2em] uppercase",
                  STATUS_CLR[o.status] || "bg-bone text-ink"
                )}
              >
                {o.status}
              </span>
            </div>
            <ul className="mt-5 flex gap-3 overflow-x-auto">
              {o.items.map((it) => (
                <li key={it.slug} className="w-20 shrink-0">
                  <Placeholder ratio="1/1" label={it.name} />
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-4">
              <div className="text-taupe text-sm">
                {o.items.length} {o.items.length === 1 ? "piece" : "pieces"} ·{" "}
                <strong className="text-ink">{formatPrice(o.total)}</strong>
              </div>
              <div className="flex gap-2">
                <Button
                  href={`/account/orders/${o.id}`}
                  variant="secondary"
                  size="sm"
                >
                  View
                </Button>
                {o.status === "shipped" && (
                  <Button variant="ghost" size="sm">
                    Track
                  </Button>
                )}
                {o.status === "delivered" && (
                  <Button variant="ghost" size="sm">
                    Reorder
                  </Button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
