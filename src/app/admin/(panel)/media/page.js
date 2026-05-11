import PageHeader from "@/components/admin/PageHeader";
import Toolbar from "@/components/admin/Toolbar";
import Placeholder from "@/components/feedback/Placeholder";
import Input from "@/components/primitives/Input";
import Select from "@/components/primitives/Select";
import Button from "@/components/primitives/Button";

export const metadata = { title: "Media Library · Admin" };

export default function MediaPage() {
  const tones = ["light", "oxblood", "forest", "ink", "brass", "taupe"];
  const items = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    name: `IMG_${1000 + i}.jpg`,
    tone: tones[i % tones.length],
    used: i % 3 !== 0,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Media Library"
        subtitle={`${items.length} assets · 4 unused`}
        actions={<Button variant="primary" size="sm">Upload</Button>}
      />
      <Toolbar>
        <div className="flex flex-1 gap-3">
          <Input placeholder="Search by filename or tag" className="!py-2 max-w-xs" />
          <Select className="!py-2 max-w-[160px]">
            <option>All types</option>
            <option>Image</option>
            <option>Video</option>
          </Select>
          <Select className="!py-2 max-w-[160px]">
            <option>All tags</option>
            <option>Hero</option>
            <option>Lifestyle</option>
            <option>Product</option>
          </Select>
          <Select className="!py-2 max-w-[160px]">
            <option>Used &amp; unused</option>
            <option>Used only</option>
            <option>Unused only</option>
          </Select>
        </div>
      </Toolbar>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((m) => (
          <article key={m.id} className="group relative">
            <Placeholder ratio="1/1" tone={m.tone} label={m.name} />
            <div className="absolute inset-0 hidden bg-ink/60 p-3 group-hover:block">
              <span className="text-ivory text-[10px] tracking-[0.2em] uppercase">
                {m.used ? "Used" : "Unused"}
              </span>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between">
                <button className="text-ivory text-[10px] tracking-[0.2em] uppercase underline">
                  View
                </button>
                <button className="text-oxblood text-[10px] tracking-[0.2em] uppercase underline">
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
