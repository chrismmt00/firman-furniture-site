import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";

export const metadata = { title: "Shipping & Delivery · Firman Furniture" };

const ZONES = [
  { zone: "Zone 1 · Northeast", lead: "1–2 weeks", note: "White-glove included on $1,500+" },
  { zone: "Zone 2 · Mid-Atlantic", lead: "1–2 weeks", note: "White-glove included on $1,500+" },
  { zone: "Zone 3 · Southeast", lead: "2–3 weeks", note: "White-glove included on $2,500+" },
  { zone: "Zone 4 · Midwest", lead: "2–3 weeks", note: "White-glove included on $2,500+" },
  { zone: "Zone 5 · Mountain & Pacific", lead: "3–4 weeks", note: "White-glove included on $3,500+" },
  { zone: "International", lead: "5–8 weeks", note: "Quoted per shipment" },
];

export default function ShippingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shipping" }]} />
      <section className="mx-auto w-full max-w-screen-md px-6 py-16 text-center md:px-10">
        <Eyebrow>Shipping & Delivery</Eyebrow>
        <h1 className="font-display mt-4 text-4xl md:text-5xl">
          From our atelier to your room.
        </h1>
      </section>

      <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-12 px-6 pb-16 md:grid-cols-2 md:px-10">
        <div>
          <Eyebrow>White-Glove Delivery</Eyebrow>
          <h2 className="font-display mt-3 text-3xl">What's included.</h2>
          <ul className="mt-6 space-y-3 text-taupe">
            <li>· Two-person crew</li>
            <li>· In-room placement</li>
            <li>· Light assembly</li>
            <li>· All packaging removed</li>
            <li>· Scheduled 4-hour window</li>
            <li>· 24-hour pre-delivery confirmation call</li>
          </ul>
        </div>
        <Placeholder
          ratio="4/3"
          tone="oxblood"
          label="White-glove crew · in-room placement"
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
          alt="White-glove delivery in-room placement"
        />
      </section>

      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-12 md:px-10">
        <Eyebrow>Delivery Zones</Eyebrow>
        <h2 className="font-display mt-3 text-3xl">Lead times by region.</h2>
        <div className="mt-8 overflow-hidden border border-ink/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-bone text-xs tracking-[0.15em] uppercase">
              <tr>
                <th className="px-5 py-3">Zone</th>
                <th className="px-5 py-3">Lead Time</th>
                <th className="px-5 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {ZONES.map((z) => (
                <tr key={z.zone} className="border-t border-ink/10">
                  <td className="px-5 py-4">{z.zone}</td>
                  <td className="px-5 py-4 text-taupe">{z.lead}</td>
                  <td className="px-5 py-4 text-taupe">{z.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-24 md:px-10">
        <Placeholder
          ratio="21/9"
          tone="forest"
          label="Delivery zones · US map"
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
          alt="Delivery zones across the United States"
        />
      </section>
    </>
  );
}
