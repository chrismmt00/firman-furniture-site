"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/PageHeader";
import Eyebrow from "@/components/feedback/Eyebrow";
import Input from "@/components/primitives/Input";
import Select from "@/components/primitives/Select";
import Textarea from "@/components/primitives/Textarea";
import FormField from "@/components/primitives/FormField";
import Button from "@/components/primitives/Button";
import Checkbox from "@/components/primitives/Checkbox";
import { cn } from "@/lib/cn";

const TABS = [
  "General",
  "Tax",
  "Shipping Zones",
  "Delivery Crews",
  "Payment",
  "Email Templates",
  "Domains",
  "Legal",
];

export default function SettingsPage() {
  const [tab, setTab] = useState("General");
  return (
    <>
      <PageHeader eyebrow="System" title="Settings" />
      <nav className="flex gap-1 overflow-x-auto border-b border-ink/10 mb-8">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "border-b-2 whitespace-nowrap px-4 py-3 text-xs tracking-[0.15em] uppercase",
              tab === t
                ? "border-brass text-ink"
                : "border-transparent text-taupe hover:text-ink"
            )}
          >
            {t}
          </button>
        ))}
      </nav>

      {tab === "General" && (
        <div className="grid max-w-2xl gap-5">
          <FormField label="Brand name">
            <Input defaultValue="Firman Furniture" />
          </FormField>
          <FormField label="Support email">
            <Input type="email" defaultValue="care@firman.demo" />
          </FormField>
          <FormField label="Currency">
            <Select defaultValue="USD">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </Select>
          </FormField>
          <FormField label="Timezone">
            <Select defaultValue="ET">
              <option>America/New_York (ET)</option>
              <option>America/Chicago (CT)</option>
              <option>America/Los_Angeles (PT)</option>
              <option>Europe/London</option>
            </Select>
          </FormField>
          <FormField label="Description">
            <Textarea
              rows={3}
              defaultValue="Heirloom furniture, made by hand in New Bedford since 1924."
            />
          </FormField>
          <Button variant="primary">Save Changes</Button>
        </div>
      )}

      {tab === "Payment" && (
        <div className="max-w-2xl space-y-4">
          {[
            { name: "Stripe", description: "Credit / debit cards", on: true },
            { name: "Klarna", description: "4 interest-free payments", on: true },
            { name: "Affirm", description: "Monthly financing", on: true },
            { name: "PayPal", description: "PayPal balance & cards", on: false },
          ].map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between border border-ink/10 bg-ivory p-5"
            >
              <div>
                <p className="font-display">{p.name}</p>
                <p className="text-taupe text-sm">{p.description}</p>
              </div>
              <Checkbox label={p.on ? "Enabled" : "Disabled"} defaultChecked={p.on} />
            </div>
          ))}
        </div>
      )}

      {tab === "Tax" && (
        <div className="max-w-3xl">
          <Eyebrow>Tax Rates</Eyebrow>
          <table className="mt-4 w-full border border-ink/10 bg-ivory text-left text-sm">
            <thead className="bg-bone text-[10px] tracking-[0.2em] uppercase">
              <tr>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3 text-right">Rate</th>
                <th className="px-4 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {[
                ["United States · Default", "8.5%"],
                ["California", "9.5%"],
                ["New York", "8.875%"],
                ["United Kingdom (VAT)", "20%"],
              ].map(([r, v]) => (
                <tr key={r} className="border-t border-ink/10">
                  <td className="px-4 py-3">{r}</td>
                  <td className="px-4 py-3 text-right">{v}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs tracking-[0.2em] uppercase text-brass-deep">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "Shipping Zones" && (
        <div className="max-w-3xl">
          <Eyebrow>Zones</Eyebrow>
          <ul className="mt-4 space-y-2">
            {["Zone 1 · Northeast", "Zone 2 · Mid-Atlantic", "Zone 3 · Southeast", "Zone 4 · Midwest", "Zone 5 · Pacific", "International"].map(
              (z) => (
                <li
                  key={z}
                  className="flex items-center justify-between border border-ink/10 bg-ivory p-4 text-sm"
                >
                  <span>{z}</span>
                  <button className="text-xs tracking-[0.2em] uppercase text-brass-deep">
                    Edit
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {tab === "Delivery Crews" && (
        <div className="max-w-3xl">
          <Eyebrow>White-Glove Crews</Eyebrow>
          <ul className="mt-4 space-y-2">
            {[
              { name: "Crew A", region: "Manhattan + Greenwich", capacity: "6 deliveries/day" },
              { name: "Crew B", region: "Palm Beach + Miami", capacity: "5 deliveries/day" },
              { name: "Crew C", region: "Boston + Providence", capacity: "5 deliveries/day" },
            ].map((c) => (
              <li
                key={c.name}
                className="flex items-center justify-between border border-ink/10 bg-ivory p-4"
              >
                <div>
                  <p className="font-display">{c.name}</p>
                  <p className="text-taupe text-xs">
                    {c.region} · {c.capacity}
                  </p>
                </div>
                <button className="text-xs tracking-[0.2em] uppercase text-brass-deep">
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(tab === "Email Templates" || tab === "Domains" || tab === "Legal") && (
        <div className="border border-dashed border-ink/20 bg-bone/40 p-12 text-center">
          <Eyebrow>{tab}</Eyebrow>
          <p className="text-taupe mt-3">
            Wireframe placeholder for the {tab.toLowerCase()} tab.
          </p>
        </div>
      )}
    </>
  );
}
