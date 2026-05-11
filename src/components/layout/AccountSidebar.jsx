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

  const isActive = (href) =>
    href === "/account" ? pathname === "/account" : pathname?.startsWith(href);

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <aside className="md:col-span-3">
      <div className="md:sticky md:top-24">
        <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4 md:block md:pb-6">
          <div className="min-w-0">
            <span className="font-display block truncate text-2xl">
              {user?.name || "Account"}
            </span>
            <p className="text-taupe mt-1 truncate text-sm">
              {user?.email || "guest@firman.demo"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="shrink-0 text-xs tracking-[0.2em] uppercase text-oxblood hover:text-ink md:hidden"
          >
            Sign Out
          </button>
        </div>

        {/* Mobile: horizontal tab strip */}
        <nav className="-mx-6 mt-4 overflow-x-auto px-6 md:hidden">
          <ul className="flex gap-2 whitespace-nowrap pb-1">
            {NAV.map((n) => {
              const active = isActive(n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={cn(
                      "inline-block border px-4 py-2 text-xs tracking-[0.15em] uppercase",
                      active
                        ? "border-ink bg-ink text-ivory"
                        : "border-ink/20 text-ink hover:border-ink"
                    )}
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop: vertical nav */}
        <nav className="mt-2 hidden md:block">
          <ul className="space-y-1">
            {NAV.map((n) => {
              const active = isActive(n.href);
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
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-8 text-xs tracking-[0.2em] uppercase text-oxblood hover:text-ink"
          >
            Sign Out
          </button>
        </nav>
      </div>
    </aside>
  );
}
