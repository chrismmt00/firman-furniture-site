import { notFound } from "next/navigation";
import products from "@/lib/mock-data/products.json";
import ProductEditor from "@/components/admin/ProductEditor";
import PageHeader from "@/components/admin/PageHeader";
import Button from "@/components/primitives/Button";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.slug }));
}

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.slug === id);
  if (!product) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Edit Product"
        title={product.name}
        subtitle={`SKU-${product.slug.toUpperCase()} · Last edited 2 days ago`}
        actions={
          <>
            <Button variant="ghost" size="sm" href={`/products/${product.slug}`}>
              View Live
            </Button>
            <Button variant="destructive" size="sm">
              Archive
            </Button>
            <Button variant="primary" size="sm">
              Save Changes
            </Button>
          </>
        }
      />
      <ProductEditor product={product} />
    </>
  );
}
