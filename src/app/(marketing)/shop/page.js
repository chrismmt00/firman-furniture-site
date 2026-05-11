import categories from "@/lib/mock-data/categories.json";
import products from "@/lib/mock-data/products.json";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import CategoryTile from "@/components/catalog/CategoryTile";
import ProductGrid from "@/components/catalog/ProductGrid";
import Eyebrow from "@/components/feedback/Eyebrow";
import FullBleedImage from "@/components/editorial/FullBleedImage";

export const metadata = {
  title: "Shop · Firman Furniture",
};

export default function ShopPage() {
  const bestsellers = products.filter((p) => p.tags?.includes("bestseller"));
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <FullBleedImage
        tone="ink"
        label="Shop · 248 pieces in stock"
        height="md"
        src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="mx-auto w-full max-w-screen-2xl px-6 py-20 md:px-10">
        <Eyebrow>Shop By Room</Eyebrow>
        <h1 className="font-display mt-3 text-4xl md:text-5xl">
          The full collection.
        </h1>
        <p className="mt-3 max-w-xl text-taupe">
          Eight rooms, hand-finished in our New Bedford atelier.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((c, i) => (
            <CategoryTile key={c.slug} category={c} index={i} />
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-24 md:px-10">
        <div className="mb-10">
          <Eyebrow>The Standards</Eyebrow>
          <h2 className="font-display mt-2 text-4xl">Bestsellers.</h2>
        </div>
        <ProductGrid products={bestsellers} cols={4} />
      </section>
    </>
  );
}
