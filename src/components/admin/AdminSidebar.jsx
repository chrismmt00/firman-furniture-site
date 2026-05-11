"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/mock-auth";
import { cn } from "@/lib/cn";

const NAV = [
  {
    heading: "Dashboard",
    items: [{ href: "/admin", label: "Overview", roles: ["super", "content", "fulfillment", "cs"] }],
  },
  {
    heading: "Products",
    items: [
      { href: "/admin/products", label: "Products", roles: ["super", "content"] },
      { href: "/admin/categories", label: "Categories", roles: ["super", "content"] },
      { href: "/admin/collections", label: "Collections", roles: ["super", "content"] },
      { href: "/admin/inventory", label: "Inventory", roles: ["super", "fulfillment"] },
    ],
  },
  {
    heading: "Orders",
    items: [
      { href: "/admin/orders", label: "All Orders", roles: ["super", "fulfillment", "cs"] },
      { href: "/admin/fulfillment", label: "Fulfillment", roles: ["super", "fulfillment"] },
      { href: "/admin/delivery", label: "Delivery Schedule", roles: ["super", "fulfillment"] },
      { href: "/admin/returns", label: "Returns", roles: ["super", "fulfillment", "cs"] },
    ],
  },
  {
    heading: "Customers",
    items: [
      { href: "/admin/customers", label: "Customers", roles: ["super", "cs"] },
      { href: "/admin/tickets", label: "Tickets", roles: ["super", "cs"] },
    ],
  },
  {
    heading: "Content",
    items: [
      { href: "/admin/journal", label: "Journal", roles: ["super", "content"] },
      { href: "/admin/homepage", label: "Homepage", roles: ["super", "content"] },
      { href: "/admin/showrooms", label: "Showrooms", roles: ["super", "content"] },
      { href: "/admin/media", label: "Media Library", roles: ["super", "content"] },
    ],
  },
  {
    heading: "System",
    items: [
      { href: "/admin/reports", label: "Reports", roles: ["super"] },
      { href: "/admin/team", label: "Team", roles: ["super"] },
      { href: "/admin/settings", label: "Settings", roles: ["super"] },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { role } = useAuth();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-ink/10 bg-ivory md:block">
      <div className="border-b border-ink/10 px-6 py-5">
        <Link
          href="/admin"
          className="font-display block text-base tracking-[0.28em] whitespace-nowrap"
        >
          FIRMAN FURNITURE
        </Link>
        <span className="text-taupe mt-1 block text-[10px] tracking-[0.25em] uppercase">
          Admin
        </span>
      </div>
      <nav className="px-3 py-5">
        {NAV.map((group) => {
          const items = group.items.filter((i) => i.roles.includes(role));
          if (items.length === 0) return null;
          return (
            <div key={group.heading} className="mb-6">
              <span className="px-3 text-[10px] tracking-[0.22em] uppercase text-taupe">
                {group.heading}
              </span>
              <ul className="mt-2">
                {items.map((it) => {
                  const active =
                    it.href === "/admin"
                      ? pathname === "/admin"
                      : pathname?.startsWith(it.href);
                  return (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className={cn(
                          "block rounded-sm px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-ink text-ivory"
                            : "text-ink hover:bg-bone"
                        )}
                      >
                        {it.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
