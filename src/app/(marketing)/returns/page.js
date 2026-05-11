import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import Eyebrow from "@/components/feedback/Eyebrow";
import Button from "@/components/primitives/Button";

export const metadata = { title: "Returns & Warranty · Firman Furniture" };

export default function ReturnsPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Returns" }]}
      />
      <section className="mx-auto w-full max-w-screen-md px-6 py-16 md:px-10">
        <Eyebrow>Returns & Warranty</Eyebrow>
        <h1 className="font-display mt-4 text-4xl md:text-5xl">
          Built to be passed down.
        </h1>
        <p className="text-taupe mt-6 text-lg">
          We stand behind every Firman piece. Below is everything you need to
          know about returns, exchanges, and our heirloom warranty.
        </p>

        <div className="mt-12 space-y-10">
          <Section title="30-day returns">
            If a piece isn't right, contact us within 30 days of delivery for a
            full refund. White-glove pickup is included. Custom and final-sale
            items excluded.
          </Section>
          <Section title="Exchanges">
            We're happy to exchange for a different size, color, or piece
            entirely. Differences are credited or charged at current pricing.
          </Section>
          <Section title="Heirloom Warranty">
            Lifetime structural warranty against defects in materials and
            workmanship. Frames, joinery, springs — covered as long as the
            piece is in your home.
          </Section>
          <Section title="Care &amp; Refurbishment">
            For pieces over five years old, we offer in-atelier refurbishment.
            Reupholstery, refinishing, spring re-tying — all carried out in New
            Bedford by the same hands that built the piece.
          </Section>
        </div>

        <div className="mt-12 border border-brass/40 p-8 text-center">
          <Eyebrow>Need to start a return?</Eyebrow>
          <h2 className="font-display mt-3 text-2xl">
            Initiate from your account.
          </h2>
          <Button href="/account/orders" variant="primary" className="mt-6">
            Go to My Orders
          </Button>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-t border-ink/10 pt-6">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="text-taupe mt-3">{children}</p>
    </div>
  );
}
