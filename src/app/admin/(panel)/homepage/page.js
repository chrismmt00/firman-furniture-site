import PageHeader from "@/components/admin/PageHeader";
import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";
import Button from "@/components/primitives/Button";
import { GripVertical, Eye } from "lucide-react";

const SECTIONS = [
  { key: "hero", label: "Hero · Spring 2026", type: "Hero" },
  { key: "categories", label: "Shop By Room", type: "Category Grid" },
  { key: "featured", label: "Featured Collection · Wexford", type: "Editorial Block" },
  { key: "bestsellers", label: "Bestsellers", type: "Product Strip" },
  { key: "journal", label: "Journal Teaser", type: "Editorial Block" },
  { key: "showrooms", label: "Showroom CTA", type: "Full-bleed CTA" },
  { key: "newsletter", label: "Newsletter Strip", type: "Form" },
];

export const metadata = { title: "Homepage Editor · Admin" };

export default function HomepageEditorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Homepage Editor"
        subtitle="Drag to reorder. Click any section to edit content."
        actions={
          <>
            <Button variant="ghost" size="sm" href="/">
              <Eye strokeWidth={1.25} className="mr-2 h-4 w-4" />
              View Live
            </Button>
            <Button variant="primary" size="sm">
              Publish Changes
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <ul className="space-y-2 lg:col-span-7">
          {SECTIONS.map((s) => (
            <li
              key={s.key}
              className="flex items-center gap-4 border border-ink/10 bg-ivory p-4"
            >
              <GripVertical strokeWidth={1.25} className="h-4 w-4 text-taupe" />
              <div className="flex-1">
                <p className="font-display">{s.label}</p>
                <p className="text-taupe text-xs">{s.type}</p>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </li>
          ))}
          <li>
            <button className="block w-full border border-dashed border-ink/30 bg-bone/30 p-4 text-xs tracking-[0.2em] uppercase text-taupe hover:text-ink">
              + Add Section
            </button>
          </li>
        </ul>
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-20 border border-ink/10 bg-ivory p-3">
            <Eyebrow>Live Preview</Eyebrow>
            <div className="mt-3 space-y-1">
              <Placeholder ratio="16/9" tone="oxblood" label="Hero" />
              <Placeholder ratio="16/4" tone="light" label="Categories" />
              <Placeholder ratio="16/8" tone="ink" label="Featured Collection" />
              <Placeholder ratio="16/4" tone="light" label="Bestsellers" />
              <Placeholder ratio="16/6" tone="oxblood" label="Journal" />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
