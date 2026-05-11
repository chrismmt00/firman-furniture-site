"use client";

import { useState } from "react";
import Link from "next/link";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";
import Input from "@/components/primitives/Input";
import Button from "@/components/primitives/Button";
import FormField from "@/components/primitives/FormField";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Placeholder
        fill
        tone="ink"
        label="Editorial · password reset"
        src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1400&q=80"
        alt="Firman Furniture editorial"
        className="hidden md:block"
      />
      <section className="flex flex-col justify-center px-6 py-24 md:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Eyebrow>Forgot Password</Eyebrow>
          <h1 className="font-display mt-3 text-4xl">
            {sent ? "Check your inbox." : "Reset your password."}
          </h1>
          {!sent ? (
            <>
              <p className="text-taupe mt-3 text-sm">
                Enter your email and we'll send a reset link.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-10 flex flex-col gap-5"
              >
                <FormField label="Email">
                  <Input type="email" required />
                </FormField>
                <Button type="submit" variant="primary">
                  Send Reset Link
                </Button>
                <Link
                  href="/sign-in"
                  className="text-center text-xs tracking-[0.2em] uppercase text-taupe hover:text-ink"
                >
                  Back to Sign In
                </Link>
              </form>
            </>
          ) : (
            <>
              <p className="text-taupe mt-3 text-sm">
                If an account exists for that email, you'll get a message
                shortly.
              </p>
              <Link
                href="/sign-in"
                className="mt-8 inline-block border-b border-brass pb-1 text-xs tracking-[0.2em] uppercase hover:border-ink"
              >
                Back to Sign In
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}
