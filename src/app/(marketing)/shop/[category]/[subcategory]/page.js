import { notFound } from "next/navigation";
import categories from "@/lib/mock-data/categories.json";
import products from "@/lib/mock-data/products.json";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import FilterPanel from "@/components/catalog/FilterPanel";
import FilterDrawer from "@/components/catalog/FilterDrawer";
import SortDropdown from "@/components/catalog/SortDropdown";
import Pagination from "@/components/catalog/Pagination";
import ProductGrid from "@/components/catalog/ProductGrid";
import Eyebrow from "@/components/feedback/Eyebrow";

export async function generateMetadata({ params }) {
  const { category, subcategory } = await params;
  const cat = categories.find((c) => c.slug === category);
  const sub = cat?.subcategories?.find((s) => s.slug === subcategory);
  return { title: `${sub?.name || "Shop"} · Firman Furniture` };
}

export default async function SubcategoryPage({ params }) {
  const { category, subcategory } = await params;
  const cat = categories.find((c) => c.slug === category);
  const sub = cat?.subcategories?.find((s) => s.slug === subcategory);
  if (!cat || !sub) notFound();
  const items = products.filter(
    (p) => p.category === category && p.subcategory === subcategory
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: cat.name, href: `/shop/${cat.slug}` },
          { label: sub.name },
        ]}
      />
      <section className="mx-auto w-full max-w-screen-2xl px-6 pt-12 pb-6 md:px-10">
        <Eyebrow>
          {cat.name} · {sub.name}
        </Eyebrow>
        <h1 className="font-display mt-3 text-4xl md:text-5xl">{sub.name}</h1>
      </section>
      <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 px-6 pb-24 md:grid-cols-12 md:px-10">
        <FilterPanel className="hidden md:block md:col-span-3" />
        <div className="md:col-span-9">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
            <div className="flex items-center gap-3">
              <FilterDrawer className="md:hidden" />
              <span className="text-xs tracking-[0.2em] uppercase text-taupe">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
            <SortDropdown />
          </div>
          {items.length > 0 ? (
            <>
              <ProductGrid products={items} cols={3} />
              <Pagination page={1} total={1} />
            </>
          ) : (
            <p className="py-20 text-center text-taupe">
              Nothing here yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
