import products from "@/lib/mock-data/products.json";
import collections from "@/lib/mock-data/collections.json";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import FilterPanel from "@/components/catalog/FilterPanel";
import FilterDrawer from "@/components/catalog/FilterDrawer";
import SortDropdown from "@/components/catalog/SortDropdown";
import ProductGrid from "@/components/catalog/ProductGrid";
import CollectionCard from "@/components/catalog/CollectionCard";
import EmptyState from "@/components/feedback/EmptyState";
import Eyebrow from "@/components/feedback/Eyebrow";
import { Search as SearchIcon } from "lucide-react";

export const metadata = { title: "Search · Firman Furniture" };

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const q = (sp?.q || "").toLowerCase().trim();

  const results = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.includes(q) ||
          p.subcategory?.includes(q)
      )
    : [];

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />
      <section className="mx-auto w-full max-w-screen-2xl px-6 pt-12 md:px-10">
        <Eyebrow>Search</Eyebrow>
        <h1 className="font-display mt-3 text-4xl md:text-5xl">
          {q ? (
            <>
              Results for <span className="italic text-brass-deep">"{q}"</span>
            </>
          ) : (
            "What are you looking for?"
          )}
        </h1>
        <form className="mt-8 flex max-w-xl items-center border-b border-ink/30">
          <input
            name="q"
            defaultValue={q}
            placeholder="Try 'sectional' or 'walnut'"
            className="flex-1 bg-transparent py-3 outline-none placeholder-taupe"
          />
          <button
            type="submit"
            className="text-xs tracking-[0.2em] uppercase text-brass-deep hover:text-ink"
          >
            Search
          </button>
        </form>
      </section>

      {q && results.length > 0 ? (
        <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:px-10">
          <FilterPanel className="hidden md:block md:col-span-3" />
          <div className="md:col-span-9">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
              <div className="flex items-center gap-3">
                <FilterDrawer className="md:hidden" />
                <span className="text-xs tracking-[0.2em] uppercase text-taupe">
                  {results.length} results
                </span>
              </div>
              <SortDropdown />
            </div>
            <ProductGrid products={results} cols={3} />
          </div>
        </section>
      ) : q ? (
        <section className="mx-auto w-full max-w-screen-2xl px-6 py-16 md:px-10">
          <EmptyState
            icon={SearchIcon}
            title={`No results for "${q}"`}
            body="Try a different search, or explore our collections below."
          />
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {collections.slice(0, 2).map((c) => (
              <CollectionCard key={c.slug} collection={c} large />
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto w-full max-w-screen-2xl px-6 py-12 md:px-10">
          <Eyebrow>Popular searches</Eyebrow>
          <div className="mt-4 flex flex-wrap gap-2 text-xs tracking-[0.15em] uppercase">
            {[
              "sectional",
              "walnut dining table",
              "leather chair",
              "chandelier",
              "hand-knotted rug",
              "tufted bed",
            ].map((s) => (
              <a
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                className="border border-ink/20 px-4 py-2 hover:border-ink"
              >
                {s}
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
