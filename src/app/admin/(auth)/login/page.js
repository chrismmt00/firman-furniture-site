"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";
import Input from "@/components/primitives/Input";
import Select from "@/components/primitives/Select";
import Button from "@/components/primitives/Button";
import FormField from "@/components/primitives/FormField";
import { useAuth, ROLES } from "@/lib/mock-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [role, setRole] = useState("super");

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <Placeholder
        fill
        tone="ink"
        label="Admin · staff entrance"
        src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=80"
        alt="Firman Furniture admin"
        className="hidden md:block"
      />
      <section className="flex flex-col justify-center bg-ivory px-6 py-24 md:px-16">
        <div className="mx-auto w-full max-w-sm">
          <span className="font-display text-lg tracking-[0.3em] whitespace-nowrap">
            FIRMAN FURNITURE
          </span>
          <Eyebrow className="mt-6">Staff Sign In</Eyebrow>
          <h1 className="font-display mt-3 text-4xl">Admin.</h1>
          <p className="text-taupe mt-3 text-sm">
            For Firman team members only.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              signIn(fd.get("email"), role);
              router.push("/admin");
            }}
            className="mt-8 flex flex-col gap-5"
          >
            <FormField label="Email">
              <Input
                name="email"
                type="email"
                defaultValue="christian@firman.demo"
                required
              />
            </FormField>
            <FormField label="Password">
              <Input type="password" defaultValue="••••••••" required />
            </FormField>
            <FormField
              label="DEV · Sign in as role"
              helper="Use this to preview each admin role's dashboard and permissions."
            >
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {ROLES.filter((r) =>
                  ["super", "content", "fulfillment", "cs"].includes(r.value)
                ).map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </Select>
            </FormField>
            <Button type="submit" variant="primary" className="mt-3">
              Sign In
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
