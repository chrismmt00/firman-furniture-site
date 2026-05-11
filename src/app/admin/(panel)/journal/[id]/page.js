import journal from "@/lib/mock-data/journal.json";
import PageHeader from "@/components/admin/PageHeader";
import Eyebrow from "@/components/feedback/Eyebrow";
import Input from "@/components/primitives/Input";
import Textarea from "@/components/primitives/Textarea";
import Select from "@/components/primitives/Select";
import FormField from "@/components/primitives/FormField";
import Button from "@/components/primitives/Button";
import Placeholder from "@/components/feedback/Placeholder";

export async function generateStaticParams() {
  return journal.map((p) => ({ id: p.slug }));
}

export default async function JournalEditorPage({ params }) {
  const { id } = await params;
  const post =
    id === "new" ? null : journal.find((p) => p.slug === id);

  return (
    <>
      <PageHeader
        eyebrow={post ? "Edit Post" : "New Post"}
        title={post?.title || "Untitled post"}
        actions={
          <>
            <Button variant="ghost" size="sm" href="/admin/journal">
              Cancel
            </Button>
            <Button variant="secondary" size="sm">
              Save Draft
            </Button>
            <Button variant="primary" size="sm">
              Publish
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <FormField label="Title">
            <Input defaultValue={post?.title || ""} className="!py-2 !text-2xl !font-display" />
          </FormField>
          <FormField label="Eyebrow">
            <Input defaultValue={post?.eyebrow || "Style"} />
          </FormField>
          <FormField label="Excerpt">
            <Textarea rows={3} defaultValue={post?.excerpt || ""} />
          </FormField>
          <FormField label="Body (rich text)">
            <div className="border border-ink/15 bg-ivory">
              <div className="border-b border-ink/15 p-2 flex gap-2 text-xs tracking-[0.15em] uppercase text-taupe">
                <button className="px-2 py-1 hover:bg-bone">B</button>
                <button className="px-2 py-1 hover:bg-bone">I</button>
                <button className="px-2 py-1 hover:bg-bone">H2</button>
                <button className="px-2 py-1 hover:bg-bone">Quote</button>
                <button className="px-2 py-1 hover:bg-bone">Image</button>
                <button className="px-2 py-1 hover:bg-bone">Link</button>
              </div>
              <div className="min-h-[280px] p-4 text-sm leading-relaxed text-taupe">
                Rich-text editor placeholder. The Wexford has been hand-tied for
                three generations…
              </div>
            </div>
          </FormField>
        </div>
        <aside className="lg:col-span-4 space-y-4">
          <div className="border border-ink/10 bg-ivory p-5">
            <Eyebrow>Cover Image</Eyebrow>
            <Placeholder ratio="4/3" tone="oxblood" label={post?.title || "Cover"} className="mt-4" />
            <Button variant="secondary" size="sm" className="mt-3 w-full">
              Replace
            </Button>
          </div>
          <div className="border border-ink/10 bg-ivory p-5 space-y-4">
            <FormField label="Category">
              <Select defaultValue={post?.category || "Style"}>
                <option>Style</option>
                <option>Craft</option>
                <option>Heritage</option>
                <option>Care</option>
              </Select>
            </FormField>
            <FormField label="Author">
              <Select defaultValue={post?.author || ""}>
                <option>Eleanor Fairchild</option>
                <option>Marcus Penn</option>
                <option>Henry Doulton</option>
              </Select>
            </FormField>
            <FormField label="Read time">
              <Input defaultValue={post?.readTime || "5 min read"} />
            </FormField>
            <FormField label="Schedule">
              <Input type="datetime-local" />
            </FormField>
          </div>
          <div className="border border-ink/10 bg-ivory p-5">
            <Eyebrow>SEO</Eyebrow>
            <FormField label="Meta title" className="mt-3">
              <Input defaultValue={post?.title || ""} />
            </FormField>
            <FormField label="Meta description" className="mt-3">
              <Textarea rows={3} defaultValue={post?.excerpt || ""} />
            </FormField>
          </div>
        </aside>
      </div>
    </>
  );
}
