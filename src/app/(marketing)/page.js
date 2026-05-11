import Link from "next/link";
import categories from "@/lib/mock-data/categories.json";
import collections from "@/lib/mock-data/collections.json";
import products from "@/lib/mock-data/products.json";
import journal from "@/lib/mock-data/journal.json";
import Hero from "@/components/editorial/Hero";
import EditorialBlock from "@/components/editorial/EditorialBlock";
import CategoryTile from "@/components/catalog/CategoryTile";
import ProductCard from "@/components/catalog/ProductCard";
import JournalCard from "@/components/editorial/JournalCard";
import Eyebrow from "@/components/feedback/Eyebrow";
import Button from "@/components/primitives/Button";
import Placeholder from "@/components/feedback/Placeholder";

export default function HomePage() {
  const bestsellers = products.filter((p) => p.tags?.includes("bestseller")).slice(0, 4);
  const featured = collections[0];
  const journalTeasers = journal.slice(0, 1);

  return (
    <div className="flex flex-col">
      <Hero
        eyebrow="Spring 2026"
        title={"Heirloom\nLiving."}
        body="Furniture made to outlast trends — by hand, in New Bedford, since 1924."
        cta="Shop the Collection"
        href="/shop"
        tone="oxblood"
        height="tall"
      />

      {/* Shop by category */}
      <section className="mx-auto w-full max-w-screen-2xl px-6 py-24 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Eyebrow>Shop By Room</Eyebrow>
            <h2 className="font-display mt-2 text-4xl md:text-5xl">
              Eight rooms, one heritage.
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-xs tracking-[0.2em] uppercase border-b border-brass pb-1 hover:border-ink md:inline-block"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((c, i) => (
            <CategoryTile key={c.slug} category={c} index={i} />
          ))}
        </div>
      </section>

      {/* Featured collection */}
      <EditorialBlock
        eyebrow="New · Featured Collection"
        title={featured.name}
        body={featured.intro}
        cta="Explore Collection"
        href={`/collections/${featured.slug}`}
        imageLabel={featured.name}
        src={featured.image}
        tone="oxblood"
        ratio="4/5"
      />

      {/* Bestsellers */}
      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-24 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Eyebrow>The Standards</Eyebrow>
            <h2 className="font-display mt-2 text-4xl md:text-5xl">
              Bestsellers.
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs tracking-[0.2em] uppercase border-b border-brass pb-1 hover:border-ink"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {bestsellers.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Dark journal teaser */}
      <section className="bg-oxblood text-ivory">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-6 py-24 md:grid-cols-12 md:px-10">
          <div className="md:col-span-6">
            <Placeholder
              ratio="4/5"
              tone="oxblood"
              label="Journal · five rooms"
              src={journalTeasers[0].image}
              alt={journalTeasers[0].title}
              className="border border-ivory/10"
            />
          </div>
          <div className="flex flex-col justify-center md:col-span-6 md:pl-10">
            <Eyebrow tone="ivory">From The Journal</Eyebrow>
            <h2 className="font-display mt-4 text-4xl md:text-6xl">
              {journalTeasers[0].title}
            </h2>
            <p className="mt-6 max-w-md text-ivory/80">
              {journalTeasers[0].excerpt}
            </p>
            <Button
              href={`/journal/${journalTeasers[0].slug}`}
              variant="inverted"
              className="mt-10 self-start"
            >
              Read the Story
            </Button>
          </div>
        </div>
      </section>

      {/* Showroom CTA */}
      <section className="relative">
        <Placeholder
          tone="forest"
          label="Showroom · full bleed"
          src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2000&q=80"
          alt="Firman Furniture showroom"
          className="h-[60vh] w-full"
          fill
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/40 px-6 text-center text-ivory">
          <Eyebrow tone="ivory">Twelve Showrooms Worldwide</Eyebrow>
          <h2 className="font-display mt-4 text-4xl md:text-6xl">
            Sit in it first.
          </h2>
          <p className="mt-4 max-w-md text-ivory/80">
            Visit a Firman showroom — Manhattan to Tokyo.
          </p>
          <Button href="/showrooms" variant="inverted" className="mt-8">
            Find a Showroom
          </Button>
        </div>
      </section>

      {/* Newsletter strip */}
      <section className="mx-auto w-full max-w-screen-2xl px-6 py-16 md:px-10">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-b border-brass/40 py-10 md:flex-row">
          <div>
            <Eyebrow>Insider</Eyebrow>
            <h3 className="font-display mt-2 text-3xl">
              Become a Firman insider.
            </h3>
          </div>
          <form className="flex w-full max-w-md items-center border-b border-ink/30">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-transparent py-3 outline-none placeholder-taupe"
            />
            <button
              type="submit"
              className="text-xs tracking-[0.2em] uppercase text-brass-deep hover:text-ink"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
