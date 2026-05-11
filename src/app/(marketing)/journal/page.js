import journal from "@/lib/mock-data/journal.json";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import JournalCard from "@/components/editorial/JournalCard";
import Eyebrow from "@/components/feedback/Eyebrow";

const CATEGORIES = ["All", "Style", "Craft", "Heritage", "Care"];

export const metadata = { title: "Journal · Firman Furniture" };

export default function JournalPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Journal" }]}
      />
      <section className="mx-auto w-full max-w-screen-2xl px-6 pt-12 pb-8 md:px-10">
        <Eyebrow>The Journal</Eyebrow>
        <h1 className="font-display mt-3 text-4xl md:text-6xl">
          Stories of craft, heritage, and home.
        </h1>
      </section>
      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-8 md:px-10">
        <ul className="flex gap-2 overflow-x-auto whitespace-nowrap">
          {CATEGORIES.map((c, i) => (
            <li key={c}>
              <button
                className={
                  i === 0
                    ? "border border-ink bg-ink px-4 py-2 text-xs tracking-[0.15em] uppercase text-ivory"
                    : "border border-ink/20 px-4 py-2 text-xs tracking-[0.15em] uppercase hover:border-ink"
                }
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-24 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {journal.map((p, i) => (
            <div key={p.slug} className={i % 3 === 1 ? "md:translate-y-12" : ""}>
              <JournalCard post={p} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
