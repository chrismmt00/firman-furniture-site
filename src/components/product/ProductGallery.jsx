"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import Placeholder from "@/components/feedback/Placeholder";
import Dialog from "@/components/modals/Dialog";
import { cn } from "@/lib/cn";

export default function ProductGallery({ name, images = [], count = 5 }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const list =
    images.length > 0
      ? images
      : Array.from({ length: count }).map(() => null);

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="hidden flex-col gap-3 md:flex">
        {list.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "block w-20",
              i === active ? "ring-1 ring-ink" : "opacity-70 hover:opacity-100"
            )}
          >
            <Placeholder
              ratio="1/1"
              tone={i % 2 === 0 ? "light" : "taupe"}
              label={`${i + 1}`}
              src={src || undefined}
              alt={`${name} thumbnail ${i + 1}`}
            />
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="relative flex-1">
        <Placeholder
          ratio="4/5"
          tone="light"
          label={`${name} · view ${active + 1}`}
          src={list[active] || undefined}
          alt={`${name} view ${active + 1}`}
          className="w-full"
        />
        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="View larger"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-ivory/90 hover:bg-ivory"
        >
          <Maximize2 strokeWidth={1.25} className="h-4 w-4" />
        </button>
      </div>

      <Dialog
        open={lightbox}
        onClose={() => setLightbox(false)}
        size="xl"
        ariaLabel="Image lightbox"
      >
        <div className="p-2">
          <Placeholder
            ratio="4/5"
            tone="light"
            label={`${name} · zoom view ${active + 1}`}
            src={list[active] || undefined}
            alt={`${name} large`}
          />
        </div>
      </Dialog>
    </div>
  );
}
