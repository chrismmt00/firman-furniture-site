"use client";

import { useEffect, useState } from "react";
import Button from "@/components/primitives/Button";

const KEY = "firman.cookies";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setTimeout(() => setVisible(true), 1500);
  }, []);

  const close = (choice) => {
    localStorage.setItem(KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brass/40 bg-ivory">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-start gap-4 px-6 py-4 md:flex-row md:items-center md:gap-8 md:px-10">
        <p className="flex-1 text-sm text-ink">
          We use cookies to provide a refined browsing experience. See our{" "}
          <a href="/privacy" className="underline underline-offset-4">
            privacy policy
          </a>{" "}
          for details.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" onClick={() => close("essential")}>
            Essential Only
          </Button>
          <Button variant="primary" size="sm" onClick={() => close("all")}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
