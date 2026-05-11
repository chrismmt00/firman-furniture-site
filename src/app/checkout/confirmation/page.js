import Link from "next/link";
import Eyebrow from "@/components/feedback/Eyebrow";
import Button from "@/components/primitives/Button";

export const metadata = { title: "Order Confirmed · Firman Furniture" };

export default function ConfirmationPage() {
  return (
    <section className="mx-auto w-full max-w-screen-md px-6 py-24 text-center md:px-10">
      <Eyebrow>Order Confirmed</Eyebrow>
      <h1 className="font-display mt-4 text-5xl md:text-6xl">
        Thank you, Christian.
      </h1>
      <p className="text-taupe mt-6 text-lg">
        Your order <strong className="text-ink">ORD-2026-0142</strong> has been
        placed. A confirmation has been sent to{" "}
        <strong className="text-ink">christian@firman.demo</strong>.
      </p>

      <div className="mt-12 border border-brass/40 px-6 py-8 text-left">
        <Eyebrow>What's Next</Eyebrow>
        <ul className="mt-4 space-y-4 text-sm">
          <li>
            <span className="text-ink font-medium">Order processing</span>
            <p className="text-taupe">
              We'll review and confirm within 24 hours.
            </p>
          </li>
          <li>
            <span className="text-ink font-medium">Delivery scheduling</span>
            <p className="text-taupe">
              You'll receive an email to confirm your white-glove window 2 days
              before delivery.
            </p>
          </li>
          <li>
            <span className="text-ink font-medium">Care & registration</span>
            <p className="text-taupe">
              Register your purchase in your account to activate the lifetime
              warranty.
            </p>
          </li>
        </ul>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 md:flex-row">
        <Button href="/account/orders/ORD-2026-0142" variant="primary">
          View Order
        </Button>
        <Button href="/shop" variant="secondary">
          Continue Shopping
        </Button>
      </div>

      <Link
        href="/journal"
        className="mt-10 inline-block text-xs tracking-[0.2em] uppercase text-brass-deep underline underline-offset-4 hover:text-ink"
      >
        Read the Journal while you wait →
      </Link>
    </section>
  );
}
