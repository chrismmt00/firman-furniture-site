import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import orders from "@/lib/mock-data/orders.json";
import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";
import Button from "@/components/primitives/Button";
import { formatPrice } from "@/components/feedback/PriceDisplay";
import { cn } from "@/lib/cn";

export async function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

const TIMELINE = ["Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);
  if (!order) notFound();
  const stepIdx =
    order.status === "delivered"
      ? 4
      : order.status === "shipped"
        ? 2
        : order.status === "processing"
          ? 1
          : 0;

  return (
    <div>
      <Link
        href="/account/orders"
        className="text-xs tracking-[0.2em] uppercase text-taupe hover:text-ink"
      >
        ← All Orders
      </Link>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Order Detail</Eyebrow>
          <h1 className="font-display mt-3 text-4xl">{order.id}</h1>
          <p className="text-taupe mt-1 text-sm">
            Placed{" "}
            {new Date(order.placedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Contact Support
          </Button>
          <Button variant="secondary" size="sm">
            Start a Return
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <ol className="mt-10 grid grid-cols-5 gap-2">
        {TIMELINE.map((label, i) => {
          const done = i <= stepIdx;
          return (
            <li key={label} className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full border text-[10px]",
                  done
                    ? "border-brass bg-brass text-ink"
                    : "border-ink/20 text-taupe"
                )}
              >
                {done ? <Check strokeWidth={1.5} className="h-4 w-4" /> : i + 1}
              </span>
              <span className="text-center text-[10px] tracking-[0.15em] uppercase">
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12">
        <ul className="md:col-span-7">
          {order.items.map((it) => (
            <li
              key={it.slug}
              className="flex gap-4 border-b border-ink/10 py-4"
            >
              <Placeholder
                ratio="1/1"
                label={it.name}
                className="w-24"
              />
              <div className="flex-1">
                <Link
                  href={`/products/${it.slug}`}
                  className="font-display text-xl hover:text-brass-deep"
                >
                  {it.name}
                </Link>
                <p className="text-taupe mt-1 text-sm">
                  {it.color} · Qty {it.qty}
                </p>
              </div>
              <span className="font-medium">{formatPrice(it.price)}</span>
            </li>
          ))}
          <div className="mt-6 space-y-2 text-sm">
            <Row label="Subtotal" value={formatPrice(order.subtotal)} />
            <Row
              label={
                order.deliveryMethod === "white-glove"
                  ? "White-glove delivery"
                  : "Shipping"
              }
              value={
                order.shipping === 0 ? "Free" : formatPrice(order.shipping)
              }
            />
            <Row label="Tax" value={formatPrice(order.tax)} />
            <Row label="Total" value={formatPrice(order.total)} bold />
          </div>
        </ul>
        <aside className="md:col-span-5">
          <Card title="Delivery">
            <p>
              {order.deliveryMethod === "white-glove"
                ? "White-Glove · in-room placement"
                : "Standard delivery"}
            </p>
            {order.deliveryWindow && (
              <p className="text-taupe mt-2">{order.deliveryWindow}</p>
            )}
            {stepIdx < 3 && (
              <Button variant="secondary" size="sm" className="mt-4">
                Reschedule
              </Button>
            )}
          </Card>
          <Card title="Shipping Address" className="mt-4">
            <p>
              Christian Genus
              <br />
              127 West Loop Drive
              <br />
              Austin, TX 78703
            </p>
          </Card>
          <Card title="Payment" className="mt-4">
            <p>Visa ···· 4242</p>
            <p className="text-taupe mt-1 text-xs">{order.paymentStatus}</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, bold = false }) {
  return (
    <div
      className={cn(
        "flex justify-between",
        bold && "border-t border-ink/15 pt-3 font-medium text-base"
      )}
    >
      <span className="text-taupe">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Card({ title, children, className }) {
  return (
    <div className={cn("border border-ink/10 p-5", className)}>
      <span className="text-xs tracking-[0.2em] uppercase text-taupe">
        {title}
      </span>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
}
