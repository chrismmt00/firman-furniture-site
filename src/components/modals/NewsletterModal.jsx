"use client";

import { useState } from "react";
import Dialog from "./Dialog";
import Button from "@/components/primitives/Button";
import Input from "@/components/primitives/Input";
import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";

export default function NewsletterModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Dialog open={open} onClose={onClose} size="lg">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Placeholder
          ratio="4/5"
          tone="oxblood"
          label="Newsletter · editorial"
          className="hidden md:block"
        />
        <div className="p-10">
          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <Eyebrow>10% Off Your First Order</Eyebrow>
              <h2 className="font-display mt-3 text-3xl">
                Become a Firman insider.
              </h2>
              <p className="text-taupe mt-3 text-sm">
                Early access to new collections, the journal, and showroom
                events.
              </p>
              <div className="mt-6">
                <Input type="email" placeholder="Email address" required />
              </div>
              <Button type="submit" variant="primary" className="mt-6 w-full">
                Subscribe
              </Button>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 w-full text-xs tracking-[0.2em] uppercase text-taupe hover:text-ink"
              >
                No thanks
              </button>
            </form>
          ) : (
            <div>
              <Eyebrow>Welcome</Eyebrow>
              <h2 className="font-display mt-3 text-3xl">Thank you.</h2>
              <p className="text-taupe mt-3">
                Your discount code is on its way. Watch your inbox.
              </p>
              <Button onClick={onClose} variant="primary" className="mt-6">
                Continue
              </Button>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
