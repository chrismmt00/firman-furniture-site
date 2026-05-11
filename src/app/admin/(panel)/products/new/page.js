import ProductEditor from "@/components/admin/ProductEditor";
import PageHeader from "@/components/admin/PageHeader";
import Button from "@/components/primitives/Button";

export const metadata = { title: "New Product · Admin" };

export default function NewProductPage() {
  return (
    <>
      <PageHeader
        eyebrow="Create"
        title="New Product"
        actions={
          <>
            <Button variant="ghost" size="sm" href="/admin/products">
              Cancel
            </Button>
            <Button variant="secondary" size="sm">
              Save Draft
            </Button>
            <Button variant="primary" size="sm">
              Publish
            </Button>
          </>
        }
      />
      <ProductEditor product={null} />
    </>
  );
}
