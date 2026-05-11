"use client";

import { useState } from "react";
import Dialog from "./Dialog";
import Button from "@/components/primitives/Button";
import Input from "@/components/primitives/Input";
import Checkbox from "@/components/primitives/Checkbox";
import FormField from "@/components/primitives/FormField";
import Eyebrow from "@/components/feedback/Eyebrow";

export default function BackInStockModal({ open, onClose, product }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} size="md" ariaLabel="Back in stock">
      <div className="p-10">
        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <Eyebrow>Notify Me</Eyebrow>
            <h2 className="font-display mt-3 text-3xl">
              When the {product?.name} is back.
            </h2>
            <p className="text-taupe mt-3">
              We'll email you the moment your variant is restocked. Usually
              within 4–6 weeks.
            </p>
            <div className="mt-8 flex flex-col gap-5">
              <FormField label="Email">
                <Input
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </FormField>
              <FormField label="Phone (optional)">
                <Input type="tel" placeholder="+1 555 555 0100" />
              </FormField>
              <Checkbox label="Also text me when it ships" />
            </div>
            <Button type="submit" variant="primary" className="mt-8 w-full">
              Notify Me
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <Eyebrow>Confirmed</Eyebrow>
            <h2 className="font-display mt-3 text-3xl">
              You're on the list.
            </h2>
            <p className="text-taupe mt-3">
              We'll be in touch the moment the {product?.name} is back.
            </p>
            <Button onClick={onClose} variant="primary" className="mt-8">
              Continue Browsing
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
}
