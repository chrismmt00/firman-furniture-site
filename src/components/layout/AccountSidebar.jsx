"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/mock-auth";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/account", label: "Overview" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/wishlist", label: "Wishlist" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/payment", label: "Payment Methods" },
  { href: "/account/notifications", label: "Notifications" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/security", label: "Security" },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <aside className="md:col-span-3">
      <div className="md:sticky md:top-24">
        <div className="border-b border-ink/10 pb-6">
          <span className="font-display text-2xl">
            {user?.name || "Account"}
          </span>
          <p className="text-taupe mt-1 text-sm">
            {user?.email || "guest@firman.demo"}
          </p>
        </div>
        <nav className="mt-6">
          <ul className="space-y-1">
            {NAV.map((n) => {
              const active =
                n.href === "/account"
                  ? pathname === "/account"
                  : pathname?.startsWith(n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={cn(
                      "block py-2.5 text-sm tracking-[0.05em]",
                      active
                        ? "text-ink border-l-2 border-brass pl-3"
                        : "text-taupe hover:text-ink pl-3"
                    )}
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          type="button"
          onClick={() => {
            signOut();
            router.push("/");
          }}
          className="mt-8 text-xs tracking-[0.2em] uppercase text-oxblood hover:text-ink"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
