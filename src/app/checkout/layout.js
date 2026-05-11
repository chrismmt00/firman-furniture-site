import Link from "next/link";
import { Lock } from "lucide-react";

export default function CheckoutLayout({ children }) {
  return (
    <>
      <header className="border-b border-ink/10 bg-ivory">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className="font-display text-base tracking-[0.28em] whitespace-nowrap md:text-lg md:tracking-[0.3em]"
          >
            FIRMAN FURNITURE
          </Link>
          <span className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-taupe">
            <Lock strokeWidth={1.25} className="h-4 w-4" />
            Secure Checkout
          </span>
          <Link
            href="/contact"
            className="text-xs tracking-[0.2em] uppercase hover:text-brass-deep"
          >
            Help
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-ink/10 px-6 py-6 text-center text-xs text-taupe md:px-10">
        © Firman Furniture, Ltd. ·{" "}
        <Link href="/privacy" className="hover:text-ink">
          Privacy
        </Link>{" "}
        ·{" "}
        <Link href="/terms" className="hover:text-ink">
          Terms
        </Link>
      </footer>
    </>
  );
}
