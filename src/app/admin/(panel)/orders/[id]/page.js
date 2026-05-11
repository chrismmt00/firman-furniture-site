import { notFound } from "next/navigation";
import Link from "next/link";
import orders from "@/lib/mock-data/orders.json";
import customers from "@/lib/mock-data/customers.json";
import PageHeader from "@/components/admin/PageHeader";
import { StatusPill } from "@/components/admin/DataTable";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";
import Button from "@/components/primitives/Button";
import Textarea from "@/components/primitives/Textarea";
import { formatPrice } from "@/components/feedback/PriceDisplay";

export async function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export default async function AdminOrderDetailPage({ params }) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);
  if (!order) notFound();
  const customer = customers.find((c) => c.id === order.customerId);

  return (
    <>
      <Link
        href="/admin/orders"
        className="text-xs tracking-[0.2em] uppercase text-taupe hover:text-ink"
      >
        ← All Orders
      </Link>
      <PageHeader
        eyebrow="Order Detail"
        title={order.id}
        subtitle={`Placed ${order.placedAt} · ${order.customerName}`}
        actions={
          <>
            <StatusPill status={order.status} />
            <Button variant="ghost" size="sm">
              Print
            </Button>
            <Button variant="secondary" size="sm">
              Send Invoice Email
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="border border-ink/10 bg-ivory p-6">
            <Eyebrow>Line Items</Eyebrow>
            <ul className="mt-4">
              {order.items.map((it) => (
                <li
                  key={it.slug}
                  className="flex gap-4 border-b border-ink/10 py-4 last:border-b-0"
                >
                  <Placeholder
                    ratio="1/1"
                    label=""
                    className="w-16 shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-display text-base">{it.name}</p>
                    <p className="text-taupe text-xs">
                      {it.color} · Qty {it.qty}
                    </p>
                  </div>
                  <span className="text-sm">{formatPrice(it.price)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" v={formatPrice(order.subtotal)} />
              <Row
                label="Delivery"
                v={order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
              />
              <Row label="Tax" v={formatPrice(order.tax)} />
              <Row label="Total" v={formatPrice(order.total)} bold />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="border border-ink/10 bg-ivory p-6">
            <Eyebrow>Status & Activity</Eyebrow>
            <ol className="mt-4 space-y-3 border-l border-brass/40 pl-5 text-sm">
              {[
                { label: "Order placed", t: order.placedAt },
                { label: "Payment captured", t: order.placedAt },
                { label: "Picked & packed", t: "—" },
                { label: "Shipped", t: order.status === "shipped" || order.status === "delivered" ? "2026-05-04" : "—" },
                { label: "Delivered", t: order.status === "delivered" ? "2026-05-08" : "—" },
              ].map((step, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[7px] top-1 h-2 w-2 rounded-full bg-brass" />
                  <p className="font-medium">{step.label}</p>
                  <p className="text-taupe text-xs">{step.t}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="primary" size="sm">
                Mark Shipped
              </Button>
              <Button variant="secondary" size="sm">
                Issue Refund
              </Button>
              <Button variant="destructive" size="sm">
                Cancel Order
              </Button>
            </div>
          </div>

          <div className="mt-4 border border-ink/10 bg-ivory p-6">
            <Eyebrow>Internal Notes</Eyebrow>
            <Textarea
              rows={4}
              placeholder="Visible only to staff…"
              className="mt-4"
            />
            <Button variant="ghost" size="sm" className="mt-3">
              Save Note
            </Button>
          </div>
        </div>

        <aside className="lg:col-span-3 space-y-4">
          <Card title="Customer">
            <Link
              href={`/admin/customers/${order.customerId}`}
              className="font-display block hover:text-brass-deep"
            >
              {customer?.name || order.customerName}
            </Link>
            <p className="text-taupe mt-1 text-xs">
              {customer?.email}
            </p>
            <p className="text-taupe mt-1 text-xs">
              {customer?.orders} orders · LTV ${customer?.ltv?.toLocaleString()}
            </p>
          </Card>
          <Card title="Shipping">
            <p>
              {order.customerName}
              <br />
              127 West Loop Drive
              <br />
              Austin, TX 78703
            </p>
          </Card>
          <Card title="Payment">
            <p>Visa ···· 4242</p>
            <p className="text-taupe text-xs mt-1">{order.paymentStatus}</p>
          </Card>
          {order.deliveryWindow && (
            <Card title="Delivery Window">
              <p>{order.deliveryWindow}</p>
            </Card>
          )}
        </aside>
      </div>
    </>
  );
}

function Row({ label, v, bold }) {
  return (
    <div
      className={
        "flex justify-between " +
        (bold ? "border-t border-ink/15 pt-3 font-medium" : "")
      }
    >
      <span className="text-taupe">{label}</span>
      <span>{v}</span>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="border border-ink/10 bg-ivory p-5">
      <span className="text-[10px] tracking-[0.2em] uppercase text-taupe">
        {title}
      </span>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
}
