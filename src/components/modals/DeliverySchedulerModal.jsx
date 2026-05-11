"use client";

import { useState } from "react";
import Dialog from "./Dialog";
import Button from "@/components/primitives/Button";
import Eyebrow from "@/components/feedback/Eyebrow";
import { cn } from "@/lib/cn";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WINDOWS = ["9am – 12pm", "12pm – 3pm", "3pm – 6pm"];

export default function DeliverySchedulerModal({ open, onClose, onConfirm }) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedWindow, setSelectedWindow] = useState(null);

  const days = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + 14 + i); // 2 weeks out
    return d;
  });

  return (
    <Dialog open={open} onClose={onClose} size="lg">
      <div className="p-10">
        <Eyebrow>White-Glove Delivery</Eyebrow>
        <h2 className="font-display mt-3 text-3xl">
          Choose a delivery window.
        </h2>
        <p className="text-taupe mt-3 text-sm">
          Two-person crew, in-room placement, packaging removed.
        </p>

        <div className="mt-8">
          <Eyebrow>Available Dates</Eyebrow>
          <div className="mt-3 grid grid-cols-3 gap-2 md:grid-cols-6">
            {days.slice(0, 6).map((d, i) => {
              const key = d.toISOString();
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedDay(key)}
                  className={cn(
                    "border p-3 text-center transition-colors",
                    selectedDay === key
                      ? "border-ink bg-ink text-ivory"
                      : "border-ink/20 hover:border-ink"
                  )}
                >
                  <span className="block text-[10px] tracking-[0.2em] uppercase">
                    {DAYS[(d.getDay() + 6) % 7]}
                  </span>
                  <span className="font-display block text-2xl">
                    {d.getDate()}
                  </span>
                  <span className="block text-[10px] tracking-[0.15em] uppercase opacity-70">
                    {d.toLocaleDateString("en-US", { month: "short" })}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {selectedDay && (
          <div className="mt-8">
            <Eyebrow>Time Window</Eyebrow>
            <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
              {WINDOWS.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setSelectedWindow(w)}
                  className={cn(
                    "border px-4 py-3 text-sm transition-colors",
                    selectedWindow === w
                      ? "border-ink bg-ink text-ivory"
                      : "border-ink/20 hover:border-ink"
                  )}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!selectedDay || !selectedWindow}
            onClick={() => {
              onConfirm?.({ day: selectedDay, window: selectedWindow });
              onClose();
            }}
          >
            Confirm Window
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
