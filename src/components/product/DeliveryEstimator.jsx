"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import Input from "@/components/primitives/Input";

export default function DeliveryEstimator({ product }) {
  const [zip, setZip] = useState("");
  const valid = /^\d{5}$/.test(zip);
  const isWhiteGlove = product.delivery === "white-glove";

  return (
    <div className="border border-ink/10 bg-bone/40 p-5">
      <div className="flex items-start gap-3">
        <Truck strokeWidth={1.25} className="mt-1 h-5 w-5 text-brass-deep" />
        <div className="flex-1">
          <span className="text-xs tracking-[0.2em] uppercase text-taupe">
            {isWhiteGlove ? "White-Glove Delivery" : "Standard Delivery"}
          </span>
          <p className="mt-1 text-sm">
            {isWhiteGlove
              ? "Two-person crew, in-room placement, packaging removed."
              : "Curbside delivery within 5–7 business days."}
          </p>
          <form className="mt-3 flex max-w-xs items-center gap-3">
            <Input
              placeholder="ZIP code"
              value={zip}
              maxLength={5}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
              className="!py-1.5"
            />
            <button
              type="button"
              disabled={!valid}
              className="text-xs tracking-[0.2em] uppercase text-brass-deep disabled:opacity-40 hover:text-ink"
            >
              Estimate
            </button>
          </form>
          {valid && (
            <p className="text-ink mt-3 text-sm">
              Arrives <strong>March 14 – 18</strong> · Lead time {product.leadTime || "1–2 weeks"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
