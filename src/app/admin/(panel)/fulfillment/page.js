import orders from "@/lib/mock-data/orders.json";
import PageHeader from "@/components/admin/PageHeader";
import Toolbar from "@/components/admin/Toolbar";
import Select from "@/components/primitives/Select";
import { formatPrice } from "@/components/feedback/PriceDisplay";

export const metadata = { title: "Fulfillment · Admin" };

const COLUMNS = [
  { key: "new", label: "New", filter: ["pending"] },
  { key: "picking", label: "Picking", filter: [] },
  { key: "packed", label: "Packed", filter: ["processing"] },
  { key: "ready", label: "Ready to Ship", filter: [] },
  { key: "out", label: "Out for Delivery", filter: ["shipped"] },
];

export default function FulfillmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Fulfillment Queue"
        subtitle="Drag cards across columns to log status changes."
      />
      <Toolbar>
        <div className="flex gap-3">
          <Select className="!py-2 max-w-[160px]">
            <option>All warehouses</option>
            <option>New Bedford, MA</option>
            <option>Reno, NV</option>
          </Select>
          <Select className="!py-2 max-w-[160px]">
            <option>All delivery methods</option>
            <option>White-glove</option>
            <option>Standard</option>
          </Select>
        </div>
      </Toolbar>

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
        {COLUMNS.map((col) => {
          const items = orders.filter((o) => col.filter.includes(o.status));
          return (
            <div
              key={col.key}
              className="w-72 shrink-0 bg-bone/40 p-3 min-h-[60vh] md:w-auto"
            >
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-[10px] tracking-[0.2em] uppercase">
                  {col.label}
                </span>
                <span className="text-taupe text-xs">{items.length}</span>
              </div>
              <ul className="space-y-2">
                {items.map((o) => (
                  <li
                    key={o.id}
                    className="cursor-grab border border-ink/10 bg-ivory p-3 text-sm shadow-sm"
                  >
                    <p className="font-display">{o.id}</p>
                    <p className="text-taupe mt-1 text-xs">
                      {o.customerName}
                    </p>
                    <p className="text-taupe mt-1 text-xs">
                      {o.deliveryMethod === "white-glove"
                        ? "White-glove"
                        : "Standard"}{" "}
                      · {formatPrice(o.total)}
                    </p>
                  </li>
                ))}
                {items.length === 0 && (
                  <li className="text-taupe py-8 text-center text-xs">
                    No orders
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
