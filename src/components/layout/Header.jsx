"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Heart, User, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/mock-cart";
import { useWishlist } from "@/lib/mock-wishlist";
import { useAuth } from "@/lib/mock-auth";
import MegaMenu from "./MegaMenu";

const NAV = [
  { label: "Shop", href: "/shop", hasMenu: true },
  { label: "Collections", href: "/collections" },
  { label: "Journal", href: "/journal" },
  { label: "Showrooms", href: "/showrooms" },
];

export default function Header({ tone = "auto" }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();
  const { user } = useAuth();

  const isHome = pathname === "/";
  const overlay = tone === "overlay" || (tone === "auto" && isHome && !scrolled);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = !overlay;

  return (
    <header
      className={cn(
        "sticky top-0 z-30 transition-colors",
        isLight
          ? "bg-ivory text-ink border-b border-ink/10"
          : "bg-transparent text-ivory [text-shadow:_0_1px_8px_rgb(0_0_0_/_0.45)]"
      )}
    >
      {!isLight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/65 via-ink/30 to-transparent"
        />
      )}
      <div className="relative mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6 md:px-10">
        <button
          aria-label="Menu"
          onClick={() => setMobileOpen(true)}
          className="md:hidden"
        >
          <Menu strokeWidth={1.25} className="h-5 w-5" />
        </button>

        <nav className="hidden items-center gap-7 text-xs tracking-[0.2em] uppercase md:flex">
          {NAV.map((item) =>
            item.hasMenu ? (
              <button
                key={item.label}
                onMouseEnter={() => setMegaOpen(true)}
                onClick={() => setMegaOpen((v) => !v)}
                className="hover:text-brass-soft"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => setMegaOpen(false)}
                className="hover:text-brass-soft"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <Link
          href="/"
          aria-label="Firman Furniture home"
          className="font-display absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-sm tracking-[0.22em] sm:text-base sm:tracking-[0.28em] md:text-xl md:tracking-[0.32em]"
          onMouseEnter={() => setMegaOpen(false)}
        >
          FIRMAN FURNITURE
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden hover:text-brass-soft md:inline-flex"
          >
            <Search strokeWidth={1.25} className="h-5 w-5" />
          </Link>
          <Link
            href={user ? "/account/wishlist" : "/account/wishlist"}
            aria-label="Wishlist"
            className="relative hover:text-brass-soft"
          >
            <Heart strokeWidth={1.25} className="h-5 w-5" />
            {wishCount > 0 && (
              <span className="absolute -right-2 -top-1.5 rounded-full bg-brass px-1.5 text-[10px] text-ink">
                {wishCount}
              </span>
            )}
          </Link>
          <Link
            href={user ? "/account" : "/sign-in"}
            aria-label="Account"
            className="hidden hover:text-brass-soft md:inline-flex"
          >
            <User strokeWidth={1.25} className="h-5 w-5" />
          </Link>
          <button
            aria-label="Cart"
            onClick={openDrawer}
            className="relative hover:text-brass-soft"
          >
            <ShoppingBag strokeWidth={1.25} className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-1.5 rounded-full bg-brass px-1.5 text-[10px] text-ink">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />

      {mobileOpen && (
        <MobileNav onClose={() => setMobileOpen(false)} user={user} />
      )}
    </header>
  );
}

function MobileNav({ onClose, user }) {
  return (
    <div className="fixed inset-0 z-50 bg-ivory text-ink md:hidden">
      <div className="flex h-16 items-center justify-between px-6">
        <span className="font-display text-base tracking-[0.28em] whitespace-nowrap">
          FIRMAN FURNITURE
        </span>
        <button onClick={onClose} aria-label="Close menu">
          <X strokeWidth={1.25} className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex flex-col px-6">
        {NAV.map((n) => (
          <Link
            key={n.label}
            href={n.href}
            onClick={onClose}
            className="font-display border-t border-ink/10 py-5 text-3xl"
          >
            {n.label}
          </Link>
        ))}
        <div className="border-t border-ink/10 py-5 mt-8 text-xs tracking-[0.2em] uppercase text-taupe">
          <Link onClick={onClose} href="/search" className="block py-2">
            Search
          </Link>
          <Link
            onClick={onClose}
            href={user ? "/account" : "/sign-in"}
            className="block py-2"
          >
            {user ? "Account" : "Sign in"}
          </Link>
          <Link
            onClick={onClose}
            href="/account/wishlist"
            className="block py-2"
          >
            Wishlist
          </Link>
          <Link onClick={onClose} href="/contact" className="block py-2">
            Contact
          </Link>
        </div>
      </nav>
    </div>
  );
}
