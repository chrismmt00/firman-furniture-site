import orders from "@/lib/mock-data/orders.json";
import PageHeader from "@/components/admin/PageHeader";
import Toolbar from "@/components/admin/Toolbar";
import DataTable, { StatusPill, RowAction } from "@/components/admin/DataTable";
import Input from "@/components/primitives/Input";
import Select from "@/components/primitives/Select";
import Button from "@/components/primitives/Button";
import { formatPrice } from "@/components/feedback/PriceDisplay";

export const metadata = { title: "Orders · Admin" };

export default function AdminOrdersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Orders"
        title="All Orders"
        subtitle={`${orders.length} orders · 14 pending fulfillment`}
        actions={
          <>
            <Button variant="ghost" size="sm">
              Export CSV
            </Button>
            <Button variant="secondary" size="sm">
              Saved Views ▾
            </Button>
          </>
        }
      />
      <Toolbar>
        <div className="flex flex-1 gap-3">
          <Input placeholder="Search by order # or customer" className="!py-2 max-w-xs" />
          <Select className="!py-2 max-w-[160px]">
            <option>All statuses</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </Select>
          <Select className="!py-2 max-w-[160px]">
            <option>All payment</option>
            <option>Paid</option>
            <option>Authorized</option>
            <option>Refunded</option>
          </Select>
          <Select className="!py-2 max-w-[180px]">
            <option>All delivery</option>
            <option>White-glove</option>
            <option>Standard</option>
          </Select>
        </div>
      </Toolbar>
      <DataTable
        columns={[
          { key: "id", label: "Order #" },
          { key: "customerName", label: "Customer" },
          { key: "placedAt", label: "Date" },
          {
            key: "total",
            label: "Total",
            align: "right",
            render: (r) => formatPrice(r.total),
          },
          {
            key: "paymentStatus",
            label: "Payment",
            render: (r) => <StatusPill status={r.paymentStatus} />,
          },
          {
            key: "status",
            label: "Status",
            render: (r) => <StatusPill status={r.status} />,
          },
          { key: "deliveryMethod", label: "Delivery" },
          {
            key: "actions",
            label: "",
            align: "right",
            render: (r) => (
              <RowAction href={`/admin/orders/${r.id}`}>View</RowAction>
            ),
          },
        ]}
        rows={orders}
      />
    </>
  );
}
