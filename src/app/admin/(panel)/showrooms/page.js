import showrooms from "@/lib/mock-data/showrooms.json";
import PageHeader from "@/components/admin/PageHeader";
import Toolbar from "@/components/admin/Toolbar";
import DataTable, { RowAction } from "@/components/admin/DataTable";
import Input from "@/components/primitives/Input";
import Button from "@/components/primitives/Button";

export const metadata = { title: "Showrooms · Admin" };

export default function ShowroomsAdminPage() {
  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Showrooms"
        subtitle={`${showrooms.length} locations worldwide`}
        actions={<Button variant="primary" size="sm">+ New Showroom</Button>}
      />
      <Toolbar>
        <Input placeholder="Search showrooms" className="!py-2 max-w-xs" />
      </Toolbar>
      <DataTable
        columns={[
          { key: "name", label: "Showroom" },
          { key: "address", label: "Address" },
          { key: "hours", label: "Hours" },
          { key: "phone", label: "Phone" },
          {
            key: "actions",
            label: "",
            align: "right",
            render: (r) => <RowAction>Edit</RowAction>,
          },
        ]}
        rows={showrooms.map((s) => ({ ...s, id: s.slug }))}
      />
    </>
  );
}
