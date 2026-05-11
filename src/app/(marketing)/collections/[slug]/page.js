import { notFound } from "next/navigation";
import collections from "@/lib/mock-data/collections.json";
import products from "@/lib/mock-data/products.json";
import journal from "@/lib/mock-data/journal.json";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import ProductGrid from "@/components/catalog/ProductGrid";
import FullBleedImage from "@/components/editorial/FullBleedImage";
import PullQuote from "@/components/editorial/PullQuote";
import JournalCard from "@/components/editorial/JournalCard";
import Eyebrow from "@/components/feedback/Eyebrow";

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  return { title: `${c?.name || "Collection"} · Firman Furniture` };
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();
  const items = products.filter((p) => collection.products.includes(p.slug));
  const teaser = journal[0];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: collection.name },
        ]}
      />
      <FullBleedImage tone={collection.tone || "oxblood"} label={collection.name} src={collection.image} />
      <section className="mx-auto w-full max-w-screen-md px-6 py-20 text-center md:px-10">
        <Eyebrow>The Collection</Eyebrow>
        <h1 className="font-display mt-4 text-4xl md:text-6xl">
          {collection.name}
        </h1>
        <p className="mt-6 text-lg text-taupe">{collection.intro}</p>
      </section>
      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-24 md:px-10">
        <ProductGrid products={items} cols={3} />
      </section>
      <PullQuote attribution="Eleanor Fairchild · Style Director">
        Built to be passed down — not refreshed every five years.
      </PullQuote>
      <section className="mx-auto w-full max-w-screen-2xl border-t border-ink/10 px-6 py-20 md:px-10">
        <Eyebrow>From The Journal</Eyebrow>
        <h2 className="font-display mt-3 mb-10 text-3xl">In context.</h2>
        <div className="max-w-2xl">
          <JournalCard post={teaser} ratio="16/9" />
        </div>
      </section>
    </>
  );
}
