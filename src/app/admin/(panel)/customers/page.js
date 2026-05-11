import customers from "@/lib/mock-data/customers.json";
import PageHeader from "@/components/admin/PageHeader";
import Toolbar from "@/components/admin/Toolbar";
import DataTable, { StatusPill, RowAction } from "@/components/admin/DataTable";
import Input from "@/components/primitives/Input";
import Select from "@/components/primitives/Select";
import { formatPrice } from "@/components/feedback/PriceDisplay";

export const metadata = { title: "Customers · Admin" };

export default function AdminCustomersPage() {
  return (
    <>
      <PageHeader eyebrow="Customers" title="All Customers" subtitle={`${customers.length} accounts`} />
      <Toolbar>
        <div className="flex flex-1 gap-3">
          <Input placeholder="Search name or email" className="!py-2 max-w-xs" />
          <Select className="!py-2 max-w-[160px]">
            <option>All tiers</option>
            <option>VIP</option>
            <option>Standard</option>
          </Select>
          <Select className="!py-2 max-w-[160px]">
            <option>All statuses</option>
            <option>Active</option>
            <option>Dormant</option>
          </Select>
        </div>
      </Toolbar>
      <DataTable
        columns={[
          {
            key: "name",
            label: "Customer",
            render: (r) => (
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-ivory text-[10px]">
                  {r.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
                <div>
                  <p className="font-display">{r.name}</p>
                  <p className="text-taupe text-xs">{r.email}</p>
                </div>
              </div>
            ),
          },
          { key: "joined", label: "Joined" },
          { key: "orders", label: "Orders", align: "right" },
          {
            key: "ltv",
            label: "LTV",
            align: "right",
            render: (r) => formatPrice(r.ltv),
          },
          {
            key: "status",
            label: "Tier",
            render: (r) => <StatusPill status={r.tier} />,
          },
          {
            key: "actions",
            label: "",
            align: "right",
            render: (r) => <RowAction href={`/admin/customers/${r.id}`}>View</RowAction>,
          },
        ]}
        rows={customers}
      />
    </>
  );
}
