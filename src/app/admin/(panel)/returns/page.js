import PageHeader from "@/components/admin/PageHeader";
import Toolbar from "@/components/admin/Toolbar";
import DataTable, { StatusPill, RowAction } from "@/components/admin/DataTable";
import Input from "@/components/primitives/Input";
import Select from "@/components/primitives/Select";
import { formatPrice } from "@/components/feedback/PriceDisplay";

export const metadata = { title: "Returns · Admin" };

const RMAS = [
  {
    id: "RMA-2026-0019",
    orderId: "ORD-2026-0118",
    customer: "Henry Doulton",
    reason: "Color mismatch",
    items: 1,
    status: "Requested",
    age: "2 days",
    refund: 7800,
  },
  {
    id: "RMA-2026-0017",
    orderId: "ORD-2026-0102",
    customer: "Marcus Penn",
    reason: "Defect on arrival",
    items: 1,
    status: "Approved",
    age: "5 days",
    refund: 1850,
  },
  {
    id: "RMA-2026-0014",
    orderId: "ORD-2026-0095",
    customer: "Eleanor Wexford",
    reason: "Changed mind",
    items: 2,
    status: "Refunded",
    age: "12 days",
    refund: 4200,
  },
];

export default function ReturnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Returns"
        subtitle={`${RMAS.length} active RMAs`}
      />
      <Toolbar>
        <div className="flex flex-1 gap-3">
          <Input placeholder="Search RMA or order #" className="!py-2 max-w-xs" />
          <Select className="!py-2 max-w-[160px]">
            <option>All statuses</option>
            <option>Requested</option>
            <option>Approved</option>
            <option>In transit</option>
            <option>Received</option>
            <option>Refunded</option>
            <option>Denied</option>
          </Select>
        </div>
      </Toolbar>
      <DataTable
        columns={[
          { key: "id", label: "RMA #" },
          { key: "orderId", label: "Order" },
          { key: "customer", label: "Customer" },
          { key: "reason", label: "Reason" },
          { key: "items", label: "Items", align: "right" },
          { key: "age", label: "Age" },
          {
            key: "refund",
            label: "Refund",
            align: "right",
            render: (r) => formatPrice(r.refund),
          },
          {
            key: "status",
            label: "Status",
            render: (r) => <StatusPill status={r.status.toLowerCase()} />,
          },
          {
            key: "actions",
            label: "",
            align: "right",
            render: () => <RowAction>Review</RowAction>,
          },
        ]}
        rows={RMAS}
      />
    </>
  );
}
