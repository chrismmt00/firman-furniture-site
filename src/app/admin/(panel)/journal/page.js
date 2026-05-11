import journal from "@/lib/mock-data/journal.json";
import PageHeader from "@/components/admin/PageHeader";
import Toolbar from "@/components/admin/Toolbar";
import DataTable, { RowAction, StatusPill } from "@/components/admin/DataTable";
import Input from "@/components/primitives/Input";
import Button from "@/components/primitives/Button";

export const metadata = { title: "Journal · Admin" };

export default function JournalAdminPage() {
  const rows = journal.map((p) => ({
    ...p,
    id: p.slug,
    status: "published",
    views: Math.floor(Math.random() * 5000) + 800,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Journal"
        subtitle={`${journal.length} posts published`}
        actions={<Button href="/admin/journal/new" variant="primary" size="sm">+ New Post</Button>}
      />
      <Toolbar>
        <Input placeholder="Search posts" className="!py-2 max-w-xs" />
      </Toolbar>
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          { key: "author", label: "Author" },
          { key: "publishedAt", label: "Published" },
          { key: "views", label: "Views", align: "right" },
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
              <RowAction href={`/admin/journal/${r.id}`}>Edit</RowAction>
            ),
          },
        ]}
        rows={rows}
      />
    </>
  );
}
