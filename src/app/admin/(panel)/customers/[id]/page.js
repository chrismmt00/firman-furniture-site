"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import customers from "@/lib/mock-data/customers.json";
import orders from "@/lib/mock-data/orders.json";
import PageHeader from "@/components/admin/PageHeader";
import { StatusPill } from "@/components/admin/DataTable";
import Eyebrow from "@/components/feedback/Eyebrow";
import Button from "@/components/primitives/Button";
import { formatPrice } from "@/components/feedback/PriceDisplay";
import { cn } from "@/lib/cn";

const TABS = ["Profile", "Orders", "Addresses", "Wishlist", "Tickets", "Notes"];

export default function AdminCustomerDetailPage({ params }) {
  const { id } = use(params);
  const c = customers.find((x) => x.id === id);
  if (!c) notFound();
  const myOrders = orders.filter((o) => o.customerId === id);
  const [tab, setTab] = useState("Profile");

  return (
    <>
      <PageHeader
        eyebrow="Customer"
        title={c.name}
        subtitle={`${c.email} · Joined ${c.joined}`}
        actions={
          <>
            <StatusPill status={c.tier} />
            <Button variant="ghost" size="sm">
              Email
            </Button>
            <Button variant="secondary" size="sm">
              Impersonate
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Stat label="Orders" v={c.orders} />
        <Stat label="LTV" v={formatPrice(c.ltv)} />
        <Stat label="Avg Order" v={formatPrice(Math.round(c.ltv / Math.max(1, c.orders)))} />
        <Stat label="Tier" v={c.tier} />
      </div>

      <nav className="mt-10 flex gap-1 border-b border-ink/10">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "border-b-2 px-4 py-3 text-xs tracking-[0.15em] uppercase",
              tab === t
                ? "border-brass text-ink"
                : "border-transparent text-taupe hover:text-ink"
            )}
          >
            {t}
          </button>
        ))}
      </nav>

      <div className="mt-8">
        {tab === "Profile" && (
          <dl className="grid grid-cols-2 gap-6 max-w-xl">
            <Field label="Name" v={c.name} />
            <Field label="Email" v={c.email} />
            <Field label="Phone" v={c.phone} />
            <Field label="Joined" v={c.joined} />
            <Field label="Tier" v={c.tier} />
            <Field label="Status" v={c.status} />
          </dl>
        )}
        {tab === "Orders" && (
          <ul className="space-y-3">
            {myOrders.length === 0 ? (
              <li className="text-taupe">No orders yet.</li>
            ) : (
              myOrders.map((o) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between border border-ink/10 bg-ivory p-4"
                >
                  <div>
                    <a
                      href={`/admin/orders/${o.id}`}
                      className="font-display hover:text-brass-deep"
                    >
                      {o.id}
                    </a>
                    <span className="text-taupe ml-2 text-xs">
                      {o.placedAt}
                    </span>
                  </div>
                  <span>{formatPrice(o.total)}</span>
                  <StatusPill status={o.status} />
                </li>
              ))
            )}
          </ul>
        )}
        {(tab === "Addresses" || tab === "Wishlist" || tab === "Tickets" || tab === "Notes") && (
          <div className="border border-dashed border-ink/20 bg-bone/40 p-12 text-center">
            <Eyebrow>{tab}</Eyebrow>
            <p className="text-taupe mt-3">
              Wireframe placeholder for the {tab.toLowerCase()} tab.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function Stat({ label, v }) {
  return (
    <div className="border border-ink/10 bg-ivory p-5">
      <span className="text-[10px] tracking-[0.2em] uppercase text-taupe">
        {label}
      </span>
      <span className="font-display mt-2 block text-2xl">{v}</span>
    </div>
  );
}

function Field({ label, v }) {
  return (
    <div>
      <dt className="text-[10px] tracking-[0.2em] uppercase text-taupe">
        {label}
      </dt>
      <dd className="mt-1">{v}</dd>
    </div>
  );
}
