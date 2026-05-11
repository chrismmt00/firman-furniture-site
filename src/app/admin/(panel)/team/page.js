import users from "@/lib/mock-data/admin-users.json";
import PageHeader from "@/components/admin/PageHeader";
import Toolbar from "@/components/admin/Toolbar";
import DataTable, { StatusPill, RowAction } from "@/components/admin/DataTable";
import Input from "@/components/primitives/Input";
import Button from "@/components/primitives/Button";

export const metadata = { title: "Team · Admin" };

const ROLE_LABEL = {
  super: "Super Admin",
  content: "Content Editor",
  fulfillment: "Fulfillment",
  cs: "Customer Service",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="System"
        title="Team"
        subtitle={`${users.length} active staff accounts`}
        actions={<Button variant="primary" size="sm">+ Invite Teammate</Button>}
      />
      <Toolbar>
        <Input placeholder="Search team" className="!py-2 max-w-xs" />
      </Toolbar>
      <DataTable
        columns={[
          {
            key: "name",
            label: "Name",
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
          { key: "role", label: "Role", render: (r) => ROLE_LABEL[r.role] || r.role },
          {
            key: "status",
            label: "Status",
            render: () => <StatusPill status="active" />,
          },
          { key: "lastActive", label: "Last Active" },
          {
            key: "actions",
            label: "",
            align: "right",
            render: () => <RowAction>Edit</RowAction>,
          },
        ]}
        rows={users}
      />
    </>
  );
}
