"use client";

import { useRouter } from "next/navigation";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useAuth, ROLES } from "@/lib/mock-auth";

export default function AdminTopbar() {
  const router = useRouter();
  const { user, role, setRole, signOut } = useAuth();
  const roleLabel = ROLES.find((r) => r.value === role)?.label || "Guest";

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-ink/10 bg-ivory px-6">
      <div className="flex flex-1 items-center gap-4">
        <Search strokeWidth={1.25} className="h-4 w-4 text-taupe" />
        <input
          placeholder="Search orders, products, customers…"
          className="bg-transparent placeholder-taupe outline-none text-sm w-full max-w-md"
        />
      </div>
      <div className="flex items-center gap-5">
        <button aria-label="Notifications" className="relative">
          <Bell strokeWidth={1.25} className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-oxblood" />
        </button>
        <label className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase">
          <span className="text-taupe">Role</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent border border-brass px-2 py-1 text-xs uppercase tracking-[0.15em] outline-none"
          >
            {ROLES.filter((r) => r.value !== "guest").map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
        <details className="relative">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-ivory text-[10px]">
              {(user?.name?.[0] || "C").toUpperCase()}
            </span>
            <span className="hidden md:inline">{user?.name || "Demo"}</span>
            <ChevronDown strokeWidth={1.25} className="h-4 w-4" />
          </summary>
          <div className="absolute right-0 mt-2 w-48 border border-ink/10 bg-ivory shadow-lg">
            <div className="border-b border-ink/10 px-4 py-3 text-xs">
              <p className="font-medium">{user?.name || "Demo User"}</p>
              <p className="text-taupe">{roleLabel}</p>
            </div>
            <button
              onClick={() => router.push("/account")}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-bone"
            >
              Customer view
            </button>
            <button
              onClick={() => {
                signOut();
                router.push("/admin/login");
              }}
              className="block w-full border-t border-ink/10 px-4 py-2 text-left text-sm text-oxblood hover:bg-bone"
            >
              Sign out
            </button>
          </div>
        </details>
      </div>
    </header>
  );
}
