import Eyebrow from "@/components/feedback/Eyebrow";
import Button from "@/components/primitives/Button";

const CARDS = [
  { brand: "Visa", last4: "4242", expires: "08 / 27", isDefault: true },
  { brand: "Mastercard", last4: "8819", expires: "11 / 26" },
];

export default function PaymentPage() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <Eyebrow>Payment Methods</Eyebrow>
          <h1 className="font-display mt-3 text-4xl">Payment.</h1>
        </div>
        <Button variant="primary">+ Add Card</Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {CARDS.map((c) => (
          <div
            key={c.last4}
            className="border border-ink/10 bg-bone/30 p-6"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-xl">
                {c.brand} ···· {c.last4}
              </span>
              {c.isDefault && (
                <span className="bg-brass px-2 py-0.5 text-[10px] tracking-[0.2em] uppercase text-ink">
                  Default
                </span>
              )}
            </div>
            <p className="text-taupe mt-3 text-sm">Expires {c.expires}</p>
            <div className="mt-6 flex gap-3 text-xs tracking-[0.15em] uppercase">
              <button className="text-brass-deep underline underline-offset-4 hover:text-ink">
                Edit
              </button>
              <button className="text-brass-deep underline underline-offset-4 hover:text-oxblood">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-taupe mt-8 text-xs">
        Your payment information is encrypted and securely stored.
      </p>
    </div>
  );
}
