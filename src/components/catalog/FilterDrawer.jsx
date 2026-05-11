"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import Dialog from "@/components/modals/Dialog";
import Button from "@/components/primitives/Button";
import Eyebrow from "@/components/feedback/Eyebrow";
import FilterPanel from "./FilterPanel";
import { cn } from "@/lib/cn";

export default function FilterDrawer({ count = 0, className }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 border border-ink/30 px-4 py-2 text-xs tracking-[0.2em] uppercase hover:border-ink",
          className
        )}
      >
        <SlidersHorizontal strokeWidth={1.25} className="h-4 w-4" />
        Filters{count > 0 && <span className="text-brass-deep">· {count}</span>}
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        side="bottom"
        size="lg"
        ariaLabel="Filters"
        showClose={false}
      >
        <div className="flex max-h-[85vh] flex-col">
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
            <Eyebrow>Refine</Eyebrow>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs tracking-[0.2em] uppercase text-taupe hover:text-ink"
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5">
            <FilterPanel className="!static !top-0" />
          </div>
          <div className="flex gap-3 border-t border-ink/10 p-4">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Apply
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
