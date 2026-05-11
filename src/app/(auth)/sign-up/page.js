"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";
import Input from "@/components/primitives/Input";
import Button from "@/components/primitives/Button";
import Checkbox from "@/components/primitives/Checkbox";
import FormField from "@/components/primitives/FormField";
import { useAuth } from "@/lib/mock-auth";

export default function SignUpPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  return (
    <>
      <section className="flex flex-col justify-center px-6 py-24 md:px-16 md:order-2">
        <div className="mx-auto w-full max-w-sm">
          <Eyebrow>Create Account</Eyebrow>
          <h1 className="font-display mt-3 text-4xl">Become an insider.</h1>
          <p className="text-taupe mt-3 text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-ink underline underline-offset-4"
            >
              Sign in
            </Link>
            .
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              signIn(fd.get("email"), "shopper", fd.get("first"));
              router.push("/account");
            }}
            className="mt-10 flex flex-col gap-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField label="First name">
                <Input name="first" required />
              </FormField>
              <FormField label="Last name">
                <Input name="last" required />
              </FormField>
            </div>
            <FormField label="Email">
              <Input name="email" type="email" required />
            </FormField>
            <FormField label="Password">
              <Input type="password" required minLength={8} />
            </FormField>
            <Checkbox label="Subscribe to the Firman journal" defaultChecked />
            <Checkbox label="I agree to the Terms and Privacy Policy" required />
            <Button type="submit" variant="primary" className="mt-2">
              Create Account
            </Button>
          </form>
        </div>
      </section>
      <Placeholder
        fill
        tone="forest"
        label="Editorial · sign up"
        src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1400&q=80"
        alt="Firman Furniture craftsmanship"
        className="hidden md:block md:order-1"
      />
    </>
  );
}
