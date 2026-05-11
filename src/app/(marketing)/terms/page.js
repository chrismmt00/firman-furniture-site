import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import Eyebrow from "@/components/feedback/Eyebrow";

export const metadata = { title: "Terms of Service · Firman Furniture" };

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <section className="mx-auto w-full max-w-screen-md px-6 py-16 md:px-10">
        <Eyebrow>Terms of Service</Eyebrow>
        <h1 className="font-display mt-3 text-4xl md:text-5xl">
          Terms of Service
        </h1>
        <p className="text-taupe mt-3 text-sm">Last updated · April 1, 2026</p>
        <div className="mt-10 space-y-6 text-taupe">
          <Section title="Acceptance">
            By using firman.demo you agree to these terms.
          </Section>
          <Section title="Orders & Payment">
            All orders are subject to acceptance and availability. Prices are
            in USD unless otherwise indicated.
          </Section>
          <Section title="Intellectual Property">
            All content, photography, and product designs are the property of
            Firman Furniture, Ltd.
          </Section>
          <Section title="Warranty Limitations">
            See our returns page for full warranty terms.
          </Section>
          <Section title="Governing Law">
            Massachusetts, USA.
          </Section>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-t border-ink/10 pt-6">
      <h2 className="font-display text-ink mb-2 text-2xl">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
