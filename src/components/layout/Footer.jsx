import Link from "next/link";
import Eyebrow from "@/components/feedback/Eyebrow";

const COLUMNS = [
  {
    heading: "Shop",
    links: [
      { label: "Living Room", href: "/shop/living-room" },
      { label: "Dining", href: "/shop/dining" },
      { label: "Bedroom", href: "/shop/bedroom" },
      { label: "Lighting", href: "/shop/lighting" },
      { label: "Rugs", href: "/shop/rugs" },
    ],
  },
  {
    heading: "Discover",
    links: [
      { label: "Collections", href: "/collections" },
      { label: "The Journal", href: "/journal" },
      { label: "Showrooms", href: "/showrooms" },
      { label: "Our Story", href: "/about" },
    ],
  },
  {
    heading: "Service",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns & Warranty", href: "/returns" },
      { label: "Care Guide", href: "/care" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign In", href: "/sign-in" },
      { label: "Create Account", href: "/sign-up" },
      { label: "Order Status", href: "/account/orders" },
      { label: "Wishlist", href: "/account/wishlist" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 border-b border-ivory/10 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="font-display block text-2xl tracking-[0.28em] md:text-[28px]">
              FIRMAN FURNITURE
            </span>
            <p className="mt-4 max-w-sm text-ivory/70">
              Heirloom furniture, made by hand in New Bedford since 1924.
            </p>
            <div className="mt-8">
              <Eyebrow tone="ivory">Insider Newsletter</Eyebrow>
              <form className="mt-3 flex border-b border-ivory/30">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 bg-transparent py-2 text-ivory placeholder-ivory/50 outline-none"
                />
                <button
                  type="submit"
                  className="text-xs tracking-[0.2em] uppercase text-brass-soft hover:text-ivory"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <Eyebrow tone="ivory">{col.heading}</Eyebrow>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-ivory/80 hover:text-brass-soft"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 py-6 text-xs text-ivory/60 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Firman Furniture, Ltd. · Est. 1924</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ivory">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ivory">
              Terms
            </Link>
            <Link href="/care" className="hover:text-ivory">
              Care
            </Link>
            <Link href="/sitemap" className="hover:text-ivory">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
