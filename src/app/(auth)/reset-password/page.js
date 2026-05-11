"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";
import Input from "@/components/primitives/Input";
import Button from "@/components/primitives/Button";
import FormField from "@/components/primitives/FormField";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [done, setDone] = useState(false);
  return (
    <>
      <Placeholder
        fill
        tone="forest"
        label="Editorial · new password"
        src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=80"
        alt="Firman Furniture editorial"
        className="hidden md:block"
      />
      <section className="flex flex-col justify-center px-6 py-24 md:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Eyebrow>Reset Password</Eyebrow>
          <h1 className="font-display mt-3 text-4xl">
            {done ? "Password updated." : "Choose a new password."}
          </h1>
          {!done ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
                setTimeout(() => router.push("/sign-in"), 1500);
              }}
              className="mt-10 flex flex-col gap-5"
            >
              <FormField label="New password">
                <Input type="password" required minLength={8} />
              </FormField>
              <FormField label="Confirm password">
                <Input type="password" required minLength={8} />
              </FormField>
              <Button type="submit" variant="primary">
                Update Password
              </Button>
            </form>
          ) : (
            <p className="text-taupe mt-3 text-sm">
              Redirecting you to sign in…
            </p>
          )}
        </div>
      </section>
    </>
  );
}
