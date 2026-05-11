import Link from "next/link";
import { cn } from "@/lib/cn";

export default function DataTable({
  columns,
  rows,
  empty = "No records.",
  className,
}) {
  return (
    <div className={cn("overflow-x-auto border border-ink/10 bg-ivory", className)}>
      <table className="w-full text-left text-sm">
        <thead className="bg-bone text-[10px] tracking-[0.2em] uppercase">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={cn(
                  "px-5 py-3 font-medium text-taupe whitespace-nowrap",
                  c.align === "right" && "text-right",
                  c.className
                )}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-12 text-center text-taupe"
              >
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr
                key={r.id || i}
                className="border-t border-ink/10 hover:bg-bone/40"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "px-5 py-3 align-middle",
                      c.align === "right" && "text-right",
                      c.cellClassName
                    )}
                  >
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function StatusPill({ status }) {
  const map = {
    active: "bg-forest text-ivory",
    pending: "bg-bone text-ink",
    processing: "bg-brass text-ink",
    shipped: "bg-forest text-ivory",
    delivered: "bg-ink text-ivory",
    cancelled: "bg-oxblood text-ivory",
    refunded: "bg-oxblood text-ivory",
    paid: "bg-forest text-ivory",
    authorized: "bg-bone text-ink",
    open: "bg-brass text-ink",
    resolved: "bg-ink text-ivory",
    VIP: "bg-brass text-ink",
    dormant: "bg-bone text-taupe",
  };
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase",
        map[status] || "bg-bone text-ink"
      )}
    >
      {status}
    </span>
  );
}

export function RowAction({ href, children, onClick }) {
  if (href)
    return (
      <Link
        href={href}
        className="text-xs tracking-[0.2em] uppercase text-brass-deep underline underline-offset-4 hover:text-ink"
      >
        {children}
      </Link>
    );
  return (
    <button
      onClick={onClick}
      className="text-xs tracking-[0.2em] uppercase text-brass-deep underline underline-offset-4 hover:text-ink"
    >
      {children}
    </button>
  );
}
