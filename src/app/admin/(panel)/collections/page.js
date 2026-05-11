import collections from "@/lib/mock-data/collections.json";
import PageHeader from "@/components/admin/PageHeader";
import Button from "@/components/primitives/Button";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";

export const metadata = { title: "Collections · Admin" };

export default function CollectionsAdminPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catalog"
        title="Collections"
        subtitle={`${collections.length} curated collections`}
        actions={<Button variant="primary" size="sm">+ New Collection</Button>}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {collections.map((c) => (
          <article
            key={c.slug}
            className="border border-ink/10 bg-ivory"
          >
            <Placeholder ratio="4/3" tone={c.tone || "oxblood"} label={c.name} />
            <div className="p-5">
              <Eyebrow>The Collection</Eyebrow>
              <h3 className="font-display mt-2 text-xl">{c.name}</h3>
              <p className="text-taupe mt-1 text-xs">
                {c.products.length} products · /{c.slug}
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
