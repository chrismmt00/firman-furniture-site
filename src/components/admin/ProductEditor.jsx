"use client";

import { useState } from "react";
import Input from "@/components/primitives/Input";
import Textarea from "@/components/primitives/Textarea";
import Select from "@/components/primitives/Select";
import Checkbox from "@/components/primitives/Checkbox";
import FormField from "@/components/primitives/FormField";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";
import { cn } from "@/lib/cn";

const TABS = [
  "Details",
  "Pricing",
  "Inventory",
  "Media",
  "SEO",
  "Specs",
  "Variants",
  "Related",
];

export default function ProductEditor({ product }) {
  const [tab, setTab] = useState("Details");
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <nav className="flex flex-wrap gap-1 border-b border-ink/10">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "border-b-2 px-4 py-3 text-xs tracking-[0.15em] uppercase transition-colors",
                tab === t
                  ? "border-brass text-ink"
                  : "border-transparent text-taupe hover:text-ink"
              )}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className="mt-8">
          {tab === "Details" && (
            <div className="grid grid-cols-1 gap-5">
              <FormField label="Product name">
                <Input defaultValue={product?.name || ""} />
              </FormField>
              <FormField label="Slug">
                <Input defaultValue={product?.slug || ""} />
              </FormField>
              <FormField label="Description">
                <Textarea
                  rows={6}
                  defaultValue={product?.description || ""}
                />
              </FormField>
              <div className="grid grid-cols-2 gap-5">
                <FormField label="Category">
                  <Select defaultValue={product?.category}>
                    <option>Living Room</option>
                    <option>Dining</option>
                    <option>Bedroom</option>
                    <option>Office</option>
                  </Select>
                </FormField>
                <FormField label="Collection">
                  <Select>
                    <option>None</option>
                    <option>Wexford Series</option>
                    <option>Kensington</option>
                    <option>Library</option>
                  </Select>
                </FormField>
              </div>
              <FormField label="Tags (comma-separated)">
                <Input defaultValue={product?.tags?.join(", ") || ""} />
              </FormField>
            </div>
          )}
          {tab === "Pricing" && (
            <div className="grid grid-cols-2 gap-5">
              <FormField label="Price (USD)">
                <Input type="number" defaultValue={product?.price || ""} />
              </FormField>
              <FormField label="Compare at">
                <Input type="number" defaultValue={product?.compareAt || ""} />
              </FormField>
              <FormField label="Currency">
                <Select defaultValue="USD">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </Select>
              </FormField>
              <FormField label="Tax class">
                <Select>
                  <option>Standard</option>
                  <option>Reduced</option>
                  <option>Exempt</option>
                </Select>
              </FormField>
            </div>
          )}
          {tab === "Inventory" && (
            <div className="grid grid-cols-2 gap-5">
              <FormField label="SKU">
                <Input defaultValue={`SKU-${product?.slug?.toUpperCase() || ""}`} />
              </FormField>
              <FormField label="Stock count">
                <Input type="number" defaultValue={product?.stock ?? ""} />
              </FormField>
              <FormField label="Low-stock threshold">
                <Input type="number" defaultValue={5} />
              </FormField>
              <FormField label="Lead time">
                <Input defaultValue={product?.leadTime || ""} />
              </FormField>
              <div className="col-span-2">
                <Checkbox label="Track inventory" defaultChecked />
              </div>
            </div>
          )}
          {tab === "Media" && (
            <div>
              <Eyebrow>Images</Eyebrow>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[0, 1, 2, 3].map((i) => (
                  <Placeholder
                    key={i}
                    ratio="1/1"
                    tone={i === 0 ? "oxblood" : "light"}
                    label={i === 0 ? "Hero" : `${i + 1}`}
                  />
                ))}
                <button className="border border-dashed border-ink/30 text-taupe hover:border-ink hover:text-ink">
                  + Upload
                </button>
              </div>
            </div>
          )}
          {tab === "Variants" && (
            <div>
              <Eyebrow>Variants</Eyebrow>
              <p className="text-taupe mt-3 text-sm">
                Build matrix by combining attributes (e.g., Color × Size).
              </p>
              <div className="mt-6 overflow-hidden border border-ink/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-bone text-[10px] tracking-[0.2em] uppercase">
                    <tr>
                      <th className="px-4 py-3">Variant</th>
                      <th className="px-4 py-3">SKU</th>
                      <th className="px-4 py-3">Stock</th>
                      <th className="px-4 py-3">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(product?.colors || ["Default"]).map((c) => (
                      <tr key={c} className="border-t border-ink/10">
                        <td className="px-4 py-3">{c}</td>
                        <td className="px-4 py-3 text-taupe">
                          SKU-{product?.slug?.toUpperCase()}-
                          {c.slice(0, 3).toUpperCase()}
                        </td>
                        <td className="px-4 py-3">{product?.stock ?? 0}</td>
                        <td className="px-4 py-3">${product?.price ?? 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {(tab === "SEO" || tab === "Specs" || tab === "Related") && (
            <div className="border border-dashed border-ink/20 bg-bone/40 p-12 text-center">
              <Eyebrow>{tab}</Eyebrow>
              <p className="text-taupe mt-3">
                Wireframe placeholder for the {tab.toLowerCase()} editor.
              </p>
            </div>
          )}
        </div>
      </div>

      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-20 space-y-4">
          <div className="border border-ink/10 bg-ivory p-5">
            <Eyebrow>Live Preview</Eyebrow>
            <Placeholder
              ratio="4/5"
              tone="light"
              label={product?.name || "New product"}
              className="mt-4"
            />
            <h3 className="font-display mt-4 text-lg">
              {product?.name || "Product name"}
            </h3>
            <p className="text-taupe mt-1 text-sm">
              ${product?.price?.toLocaleString() || "0"}
            </p>
          </div>
          <div className="border border-ink/10 bg-ivory p-5">
            <Eyebrow>Activity</Eyebrow>
            <ul className="mt-3 space-y-2 text-xs text-taupe">
              <li>· Christian edited price · 2d ago</li>
              <li>· Marlena published · 6d ago</li>
              <li>· Imported from CSV · 14d ago</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
