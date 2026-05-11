import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import FullBleedImage from "@/components/editorial/FullBleedImage";
import EditorialBlock from "@/components/editorial/EditorialBlock";
import PullQuote from "@/components/editorial/PullQuote";
import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";

export const metadata = { title: "Our Story · Firman Furniture" };

const TIMELINE = [
  { year: "1924", body: "Henry Firman opens a furniture-makers shop on Acushnet Avenue, New Bedford." },
  { year: "1952", body: "A fire claims the original shop. The ledger survives." },
  { year: "1962", body: "First retail showroom opens in Manhattan." },
  { year: "1978", body: "Palm Beach showroom opens on Worth Avenue." },
  { year: "2003", body: "Doulton family acquires the firm; manufacturing remains in New Bedford." },
  { year: "2025", body: "Tokyo showroom opens, our twelfth worldwide." },
];

const PRINCIPLES = [
  {
    title: "Built by hand",
    body:
      "Hand-tied eight-way coils, mortise-and-tenon joinery, kiln-dried hardwood. Every piece passes through one craftsman's hands.",
  },
  {
    title: "Materials that age",
    body:
      "Aniline leather, Belgian linen, solid walnut. Materials chosen because they look better at 30 than at three.",
  },
  {
    title: "Heirloom warranty",
    body:
      "Lifetime structural warranty. Bring it back, and we'll restore it — as long as the house stands.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Story" }]} />
      <section className="mx-auto w-full max-w-screen-md px-6 pt-12 pb-12 text-center md:px-10">
        <Eyebrow>Our Story</Eyebrow>
        <h1 className="font-display mt-4 text-5xl md:text-7xl">
          A century of Firman.
        </h1>
        <p className="mt-6 text-lg text-taupe">
          Furniture made by hand in New Bedford, Massachusetts, since 1924.
        </p>
      </section>
      <FullBleedImage
        tone="oxblood"
        label="Founder portrait · 1924"
        src="https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=2000&q=80"
      />

      <EditorialBlock
        eyebrow="The Atelier"
        title="One craftsman, one piece, one finish."
        body="Our New Bedford workshop has changed less than you'd think in a hundred years. The same eight-way hand-tied coils. The same mortise-and-tenon. The same beeswax."
        imageLabel="Atelier · long view"
        src="https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&w=2000&q=80"
        tone="ink"
        ratio="3/2"
      />

      <section className="mx-auto w-full max-w-screen-lg px-6 py-20 md:px-10">
        <Eyebrow>The Heritage</Eyebrow>
        <h2 className="font-display mt-3 text-4xl">A century, six rooms.</h2>
        <ol className="mt-12 relative border-l border-brass/40 pl-10">
          {TIMELINE.map((t) => (
            <li key={t.year} className="mb-12 last:mb-0">
              <span className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-brass" />
              <span className="font-display block text-3xl text-brass-deep">
                {t.year}
              </span>
              <p className="mt-2 max-w-xl text-taupe">{t.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-bone">
        <div className="mx-auto w-full max-w-screen-2xl px-6 py-20 md:px-10">
          <Eyebrow>Craft Principles</Eyebrow>
          <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border-t border-brass/40 pt-6">
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="text-taupe mt-3">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PullQuote attribution="Henry Doulton, master craftsman">
        We don't make furniture for the next decade. We make it for the next
        century.
      </PullQuote>

      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-24 md:px-10">
        <Eyebrow>As Featured In</Eyebrow>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-6">
          {["Architectural Digest", "Elle Decor", "House & Garden", "T Magazine", "AD France", "Domus"].map(
            (m) => (
              <Placeholder
                key={m}
                ratio="3/1"
                tone="taupe"
                label={m}
                className="opacity-60"
              />
            )
          )}
        </div>
      </section>
    </>
  );
}
