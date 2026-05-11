import { notFound } from "next/navigation";
import Link from "next/link";
import categories from "@/lib/mock-data/categories.json";
import products from "@/lib/mock-data/products.json";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import FilterPanel from "@/components/catalog/FilterPanel";
import SortDropdown from "@/components/catalog/SortDropdown";
import Pagination from "@/components/catalog/Pagination";
import ProductGrid from "@/components/catalog/ProductGrid";
import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  return { title: `${cat?.name || "Shop"} · Firman Furniture` };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();
  const items = products.filter((p) => p.category === category);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: cat.name },
        ]}
      />
      <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <Eyebrow>{cat.name}</Eyebrow>
          <h1 className="font-display mt-3 text-4xl md:text-6xl">
            {cat.tagline}
          </h1>
        </div>
        <div className="md:col-span-5">
          <Placeholder
            ratio="16/9"
            tone="oxblood"
            label={`${cat.name} · banner`}
            src={cat.image}
            alt={cat.name}
          />
        </div>
      </section>

      {cat.subcategories?.length > 0 && (
        <section className="mx-auto w-full max-w-screen-2xl overflow-x-auto px-6 pb-6 md:px-10">
          <ul className="flex gap-2 whitespace-nowrap">
            <li>
              <Link
                href={`/shop/${cat.slug}`}
                className="border border-ink bg-ink px-4 py-2 text-xs tracking-[0.15em] uppercase text-ivory"
              >
                All
              </Link>
            </li>
            {cat.subcategories.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/shop/${cat.slug}/${s.slug}`}
                  className="border border-ink/20 px-4 py-2 text-xs tracking-[0.15em] uppercase hover:border-ink"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 px-6 pb-24 md:grid-cols-12 md:px-10">
        <FilterPanel className="hidden md:block md:col-span-3" />
        <div className="md:col-span-9">
          <div className="mb-8 flex items-center justify-between border-b border-ink/10 pb-4">
            <span className="text-xs tracking-[0.2em] uppercase text-taupe">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
            <SortDropdown />
          </div>
          {items.length > 0 ? (
            <>
              <ProductGrid products={items} cols={3} />
              <Pagination page={1} total={Math.ceil(items.length / 12) || 1} />
            </>
          ) : (
            <p className="py-20 text-center text-taupe">
              No items match these filters.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
