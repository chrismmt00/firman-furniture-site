"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";
import Input from "@/components/primitives/Input";
import Select from "@/components/primitives/Select";
import Button from "@/components/primitives/Button";
import Checkbox from "@/components/primitives/Checkbox";
import FormField from "@/components/primitives/FormField";
import { useAuth, ROLES } from "@/lib/mock-auth";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("christian@firman.demo");
  const [role, setRole] = useState("shopper");

  return (
    <>
      <Placeholder
        fill
        tone="oxblood"
        label="Editorial · brand image"
        src="https://images.unsplash.com/photo-1618219740975-d40978bb7378?auto=format&fit=crop&w=1400&q=80"
        alt="Firman Furniture interior"
        className="hidden md:block"
      />
      <section className="flex flex-col justify-center px-6 py-24 md:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Eyebrow>Welcome Back</Eyebrow>
          <h1 className="font-display mt-3 text-4xl">Sign in.</h1>
          <p className="text-taupe mt-3 text-sm">
            Or{" "}
            <Link
              href="/sign-up"
              className="text-ink underline underline-offset-4"
            >
              create an account
            </Link>{" "}
            — it takes a minute.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn(email, role);
              router.push(role === "shopper" ? "/account" : "/admin");
            }}
            className="mt-10 flex flex-col gap-5"
          >
            <FormField label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormField>
            <FormField label="Password">
              <Input type="password" defaultValue="••••••••" required />
            </FormField>
            <div className="flex items-center justify-between">
              <Checkbox label="Remember me" />
              <Link
                href="/forgot-password"
                className="text-xs tracking-[0.2em] uppercase text-brass-deep hover:text-ink"
              >
                Forgot?
              </Link>
            </div>
            <FormField
              label="DEV · Sign in as role"
              helper="This selector lets you preview shopper and admin views without a real backend."
            >
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {ROLES.filter((r) => r.value !== "guest").map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </Select>
            </FormField>
            <Button type="submit" variant="primary" className="mt-2">
              Sign In
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
