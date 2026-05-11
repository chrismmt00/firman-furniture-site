import categories from "@/lib/mock-data/categories.json";
import PageHeader from "@/components/admin/PageHeader";
import Button from "@/components/primitives/Button";
import { GripVertical } from "lucide-react";

export const metadata = { title: "Categories · Admin" };

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catalog"
        title="Categories"
        subtitle="Drag to reorder. Edit details or add subcategories."
        actions={<Button variant="primary" size="sm">+ New Category</Button>}
      />
      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c.slug} className="border border-ink/10 bg-ivory">
            <details>
              <summary className="flex cursor-pointer list-none items-center gap-4 p-4">
                <GripVertical strokeWidth={1.25} className="h-4 w-4 text-taupe" />
                <div className="flex-1">
                  <span className="font-display text-lg">{c.name}</span>
                  <span className="text-taupe ml-2 text-xs">/{c.slug}</span>
                </div>
                <span className="text-taupe text-xs">
                  {c.subcategories?.length || 0} subcategories
                </span>
                <button className="text-xs tracking-[0.2em] uppercase text-brass-deep underline underline-offset-4">
                  Edit
                </button>
              </summary>
              <ul className="border-t border-ink/10 bg-bone/30 px-4 py-2">
                {c.subcategories?.map((s) => (
                  <li
                    key={s.slug}
                    className="flex items-center gap-3 py-2 text-sm"
                  >
                    <GripVertical
                      strokeWidth={1.25}
                      className="h-4 w-4 text-taupe"
                    />
                    <span className="flex-1">{s.name}</span>
                    <span className="text-taupe text-xs">/{s.slug}</span>
                    <button className="text-xs tracking-[0.2em] uppercase text-brass-deep">
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
