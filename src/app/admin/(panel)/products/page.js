import products from "@/lib/mock-data/products.json";
import categories from "@/lib/mock-data/categories.json";
import PageHeader from "@/components/admin/PageHeader";
import Toolbar from "@/components/admin/Toolbar";
import DataTable, { StatusPill, RowAction } from "@/components/admin/DataTable";
import Button from "@/components/primitives/Button";
import Input from "@/components/primitives/Input";
import Select from "@/components/primitives/Select";
import Placeholder from "@/components/feedback/Placeholder";
import { formatPrice } from "@/components/feedback/PriceDisplay";

export const metadata = { title: "Products · Admin" };

export default function AdminProductsPage() {
  const rows = products.map((p) => ({ ...p, id: p.slug }));
  return (
    <>
      <PageHeader
        eyebrow="Catalog"
        title="Products"
        subtitle={`${products.length} pieces · 6 low-stock`}
        actions={
          <>
            <Button variant="secondary" size="sm">
              Bulk Edit
            </Button>
            <Button href="/admin/products/new" variant="primary" size="sm">
              + New Product
            </Button>
          </>
        }
      />
      <Toolbar>
        <div className="flex flex-1 gap-3">
          <Input placeholder="Search products" className="!py-2 max-w-xs" />
          <Select className="!py-2 max-w-[160px]">
            <option>All categories</option>
            {categories.map((c) => (
              <option key={c.slug}>{c.name}</option>
            ))}
          </Select>
          <Select className="!py-2 max-w-[160px]">
            <option>All statuses</option>
            <option>In stock</option>
            <option>Low stock</option>
            <option>Sold out</option>
          </Select>
        </div>
        <span className="text-taupe text-xs">{rows.length} results</span>
      </Toolbar>
      <DataTable
        columns={[
          {
            key: "img",
            label: "",
            render: () => (
              <Placeholder ratio="1/1" label="" className="w-12" />
            ),
          },
          {
            key: "name",
            label: "Name",
            render: (r) => (
              <div>
                <span className="font-display block">{r.name}</span>
                <span className="text-taupe text-xs">SKU-{r.id.toUpperCase()}</span>
              </div>
            ),
          },
          { key: "category", label: "Category" },
          {
            key: "price",
            label: "Price",
            align: "right",
            render: (r) => formatPrice(r.price),
          },
          {
            key: "stock",
            label: "Stock",
            align: "right",
            render: (r) => (
              <span
                className={
                  r.stock === 0
                    ? "text-oxblood"
                    : r.stock < 5
                      ? "text-brass-deep"
                      : ""
                }
              >
                {r.stock}
              </span>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (r) => <StatusPill status={r.status} />,
          },
          {
            key: "actions",
            label: "",
            align: "right",
            render: (r) => (
              <RowAction href={`/admin/products/${r.id}`}>Edit</RowAction>
            ),
          },
        ]}
        rows={rows}
      />
    </>
  );
}
