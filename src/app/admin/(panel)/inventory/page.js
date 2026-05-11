import products from "@/lib/mock-data/products.json";
import PageHeader from "@/components/admin/PageHeader";
import Toolbar from "@/components/admin/Toolbar";
import DataTable from "@/components/admin/DataTable";
import Input from "@/components/primitives/Input";
import Button from "@/components/primitives/Button";

export const metadata = { title: "Inventory · Admin" };

export default function InventoryPage() {
  const rows = products.flatMap((p) =>
    (p.colors || ["Default"]).map((c, i) => ({
      id: `${p.slug}-${i}`,
      sku: `SKU-${p.slug.toUpperCase()}-${c.slice(0, 3).toUpperCase()}`,
      name: p.name,
      variant: c,
      onHand: Math.max(0, (p.stock ?? 0) - i * 2),
      committed: i,
      get available() {
        return Math.max(0, this.onHand - this.committed);
      },
      threshold: 5,
    }))
  );

  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Inventory"
        subtitle={`${rows.length} SKUs across ${products.length} products`}
        actions={
          <>
            <Button variant="ghost" size="sm">
              Bulk import CSV
            </Button>
            <Button variant="primary" size="sm">
              Adjust Counts
            </Button>
          </>
        }
      />
      <Toolbar>
        <Input placeholder="Search SKU or product" className="!py-2 max-w-xs" />
      </Toolbar>
      <DataTable
        columns={[
          { key: "sku", label: "SKU" },
          { key: "name", label: "Product" },
          { key: "variant", label: "Variant" },
          { key: "onHand", label: "On Hand", align: "right" },
          { key: "committed", label: "Committed", align: "right" },
          {
            key: "available",
            label: "Available",
            align: "right",
            render: (r) => (
              <span
                className={
                  r.available <= r.threshold ? "text-oxblood" : ""
                }
              >
                {r.available}
              </span>
            ),
          },
        ]}
        rows={rows}
      />
    </>
  );
}
