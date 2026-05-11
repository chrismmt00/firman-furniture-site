import collections from "@/lib/mock-data/collections.json";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import CollectionCard from "@/components/catalog/CollectionCard";
import Eyebrow from "@/components/feedback/Eyebrow";

export const metadata = { title: "Collections · Firman Furniture" };

export default function CollectionsPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Collections" }]}
      />
      <section className="mx-auto w-full max-w-screen-2xl px-6 pt-12 pb-8 md:px-10">
        <Eyebrow>The Collections</Eyebrow>
        <h1 className="font-display mt-3 text-4xl md:text-6xl">
          Curated, room by room.
        </h1>
        <p className="mt-4 max-w-xl text-taupe">
          Pieces designed to live together, photographed in homes that have
          earned them.
        </p>
      </section>
      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-24 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {collections.map((c, i) => (
            <div
              key={c.slug}
              className={i % 2 === 0 ? "md:translate-y-0" : "md:translate-y-16"}
            >
              <CollectionCard collection={c} large />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
