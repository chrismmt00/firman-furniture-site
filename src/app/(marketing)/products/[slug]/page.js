import { notFound } from "next/navigation";
import products from "@/lib/mock-data/products.json";
import categories from "@/lib/mock-data/categories.json";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCartPanel from "@/components/product/AddToCartPanel";
import ProductSpecs from "@/components/product/ProductSpecs";
import ReviewsBlock from "@/components/product/ReviewsBlock";
import EditorialBlock from "@/components/editorial/EditorialBlock";
import ProductGrid from "@/components/catalog/ProductGrid";
import Eyebrow from "@/components/feedback/Eyebrow";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return { title: `${product?.name || "Product"} · Firman Furniture` };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const category = categories.find((c) => c.slug === product.category);
  const related = products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="pb-24 md:pb-0">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          {
            label: category?.name || "",
            href: `/shop/${product.category}`,
          },
          { label: product.name },
        ]}
      />
      <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <ProductGallery name={product.name} images={product.images || (product.image ? [product.image] : [])} />
        </div>
        <div className="md:col-span-5 md:pl-6">
          <AddToCartPanel product={product} />
        </div>
      </section>

      <EditorialBlock
        eyebrow={`The ${product.collection || product.name} Story`}
        title={`Three generations of craft.`}
        body={product.description}
        imageLabel={`${product.name} · in situ`}
        src={product.images?.[1] || product.image}
        tone="ink"
        ratio="16/10"
      />

      <ProductSpecs product={product} />

      <ReviewsBlock product={product} />

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-screen-2xl px-6 py-20 md:px-10">
          <Eyebrow>Pairs With</Eyebrow>
          <h2 className="font-display mt-3 mb-10 text-4xl">
            From the same collection.
          </h2>
          <ProductGrid products={related} cols={4} />
        </section>
      )}
    </div>
  );
}
