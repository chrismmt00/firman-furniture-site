"use client";

import { useAuth } from "@/lib/mock-auth";
import StatCard from "@/components/admin/StatCard";
import ChartCard from "@/components/admin/ChartCard";
import DataTable, { StatusPill, RowAction } from "@/components/admin/DataTable";
import PageHeader from "@/components/admin/PageHeader";
import orders from "@/lib/mock-data/orders.json";
import tickets from "@/lib/mock-data/tickets.json";
import { formatPrice } from "@/components/feedback/PriceDisplay";

export default function AdminDashboard() {
  const { role } = useAuth();
  if (role === "content") return <ContentDashboard />;
  if (role === "fulfillment") return <FulfillmentDashboard />;
  if (role === "cs") return <CSDashboard />;
  return <SuperDashboard />;
}

function SuperDashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Welcome back."
        subtitle="At-a-glance metrics for the past 7 days."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard label="Revenue" value="$248,510" delta="+12.4% MoM" hint="7d" />
        <StatCard label="Orders Pending" value="14" delta="+3" hint="To fulfill" />
        <StatCard label="Inventory Low" value="6" delta="-2" hint="Below threshold" />
        <StatCard label="Active Customers" value="1,284" delta="+5.8%" hint="30d" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ChartCard title="Revenue · 7d" subtitle="Net of refunds" className="md:col-span-2" />
        <ChartCard title="Top Categories" subtitle="By units sold" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="font-display mb-4 text-2xl">Recent Orders</h2>
          <DataTable
            columns={[
              { key: "id", label: "Order #" },
              { key: "customerName", label: "Customer" },
              {
                key: "total",
                label: "Total",
                align: "right",
                render: (r) => formatPrice(r.total),
              },
              {
                key: "status",
                label: "Status",
                render: (r) => <StatusPill status={r.status} />,
              },
              {
                key: "actions",
                label: "",
                align: "right",
                render: (r) => (
                  <RowAction href={`/admin/orders/${r.id}`}>View</RowAction>
                ),
              },
            ]}
            rows={orders.slice(0, 5)}
          />
        </div>
        <div>
          <h2 className="font-display mb-4 text-2xl">Recent Tickets</h2>
          <ul className="border border-ink/10 bg-ivory">
            {tickets.slice(0, 4).map((t) => (
              <li
                key={t.id}
                className="border-b border-ink/10 p-4 last:border-b-0"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs text-taupe">{t.id}</span>
                  <StatusPill status={t.status} />
                </div>
                <p className="mt-1 text-sm">{t.subject}</p>
                <span className="text-taupe mt-2 block text-xs">
                  Opened {t.openedAt}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function ContentDashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Content Dashboard"
        title="Editorial overview."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard label="Site Visits" value="48,210" delta="+8.4%" hint="7d" />
        <StatCard label="Top Product Views" value="Wexford Sectional" hint="2,184 views" />
        <StatCard label="Journal Posts Live" value="6" hint="2 drafts pending" />
        <StatCard label="Avg Read Time" value="4:18" delta="+12s" hint="7d" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ChartCard title="Top Performing Posts" />
        <ChartCard title="Product Page Engagement" />
      </div>
    </>
  );
}

function FulfillmentDashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Fulfillment Dashboard"
        title="Today's queue."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard label="To Ship Today" value="14" delta="+3" hint="Picked & ready" />
        <StatCard label="In Transit" value="38" delta="-2" hint="Across all crews" />
        <StatCard label="Failed Deliveries" value="1" delta="-1" hint="Reschedule needed" />
        <StatCard label="Pending RMAs" value="4" hint="Awaiting pickup" />
      </div>
      <div className="mt-8">
        <ChartCard
          title="Today's White-Glove Schedule"
          subtitle="By zone & crew"
        />
      </div>
    </>
  );
}

function CSDashboard() {
  return (
    <>
      <PageHeader eyebrow="CS Dashboard" title="Inbox & escalations." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard label="Open Tickets" value="11" delta="-3" hint="From Friday" />
        <StatCard label="Avg Response" value="2h 14m" delta="-18m" hint="7d" />
        <StatCard label="Pending Refunds" value="3" hint="$8,420" />
        <StatCard label="Back-in-stock Subs" value="284" delta="+24" hint="7d" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h2 className="font-display mb-4 text-2xl">Recent Tickets</h2>
          <DataTable
            columns={[
              { key: "id", label: "ID" },
              { key: "subject", label: "Subject" },
              {
                key: "status",
                label: "Status",
                render: (r) => <StatusPill status={r.status} />,
              },
            ]}
            rows={tickets}
          />
        </div>
        <ChartCard title="Topic Volume · 7d" />
      </div>
    </>
  );
}
