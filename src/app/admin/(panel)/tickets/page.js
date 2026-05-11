"use client";

import { useState } from "react";
import tickets from "@/lib/mock-data/tickets.json";
import customers from "@/lib/mock-data/customers.json";
import PageHeader from "@/components/admin/PageHeader";
import { StatusPill } from "@/components/admin/DataTable";
import Eyebrow from "@/components/feedback/Eyebrow";
import Button from "@/components/primitives/Button";
import Textarea from "@/components/primitives/Textarea";
import Select from "@/components/primitives/Select";
import { cn } from "@/lib/cn";

export default function TicketsPage() {
  const [active, setActive] = useState(tickets[0]);
  const customer = customers.find((c) => c.id === active?.customerId);

  return (
    <>
      <PageHeader eyebrow="Customer Service" title="Tickets" subtitle="Inbox view · open conversations" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <ul className="border border-ink/10 bg-ivory lg:col-span-4">
          <div className="flex border-b border-ink/10">
            {["Open", "Pending", "Resolved", "All"].map((s, i) => (
              <button
                key={s}
                className={cn(
                  "flex-1 border-b-2 py-3 text-[10px] tracking-[0.2em] uppercase",
                  i === 0
                    ? "border-brass text-ink"
                    : "border-transparent text-taupe hover:text-ink"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          {tickets.map((t) => {
            const isActive = t.id === active?.id;
            return (
              <li
                key={t.id}
                onClick={() => setActive(t)}
                className={cn(
                  "cursor-pointer border-b border-ink/10 p-4 last:border-b-0",
                  isActive && "bg-bone/40"
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="text-taupe text-xs">{t.id}</span>
                  <StatusPill status={t.status} />
                </div>
                <p className="mt-1 text-sm">{t.subject}</p>
                <span className="text-taupe mt-2 block text-[10px]">
                  Opened {t.openedAt} · {t.messages} messages
                </span>
              </li>
            );
          })}
        </ul>

        <section className="border border-ink/10 bg-ivory lg:col-span-8">
          {active && (
            <div className="flex h-full flex-col">
              <header className="border-b border-ink/10 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <Eyebrow>{active.id}</Eyebrow>
                    <h2 className="font-display mt-2 text-2xl">
                      {active.subject}
                    </h2>
                    <p className="text-taupe mt-1 text-xs">
                      From {customer?.name} · {customer?.email}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-right">
                    <Select className="!py-1 !text-xs">
                      <option>Open</option>
                      <option>Pending</option>
                      <option>Resolved</option>
                    </Select>
                    <Select className="!py-1 !text-xs">
                      <option>Imani Reyes</option>
                      <option>Christian Genus</option>
                      <option>Theo Park</option>
                    </Select>
                  </div>
                </div>
              </header>

              <div className="flex-1 space-y-4 p-5">
                <Message
                  who={customer?.name || "Customer"}
                  when="Today, 9:14 AM"
                  body="Could we move the delivery to next Saturday morning instead? We'll be away through Friday."
                />
                <Message
                  who="Imani · CS"
                  when="Today, 9:31 AM"
                  staff
                  body="Of course. I've reached out to dispatch — Saturday 9–12 should work. Confirming shortly."
                />
              </div>

              <footer className="border-t border-ink/10 p-5">
                <Textarea rows={3} placeholder="Reply…" />
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-taupe text-xs">
                    Notes are visible to staff only
                  </span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      Add Internal Note
                    </Button>
                    <Button variant="primary" size="sm">
                      Send Reply
                    </Button>
                  </div>
                </div>
              </footer>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function Message({ who, when, body, staff }) {
  return (
    <article
      className={cn(
        "border-l-2 p-4",
        staff ? "border-brass bg-bone/30" : "border-ink/20"
      )}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-medium text-sm">{who}</span>
        <span className="text-taupe text-xs">{when}</span>
      </div>
      <p className="mt-2 text-sm">{body}</p>
    </article>
  );
}
