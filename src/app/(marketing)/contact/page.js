import Link from "next/link";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import Eyebrow from "@/components/feedback/Eyebrow";
import Input from "@/components/primitives/Input";
import Textarea from "@/components/primitives/Textarea";
import Select from "@/components/primitives/Select";
import FormField from "@/components/primitives/FormField";
import Button from "@/components/primitives/Button";

export const metadata = { title: "Contact · Firman Furniture" };

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-16 px-6 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <Eyebrow>Get In Touch</Eyebrow>
          <h1 className="font-display mt-3 text-4xl md:text-5xl">
            We'd love to hear from you.
          </h1>
          <p className="mt-4 max-w-xl text-taupe">
            Questions about an order, our atelier, or planning a showroom
            visit — we read every message.
          </p>
          <form className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField label="Name" required>
              <Input required />
            </FormField>
            <FormField label="Email" required>
              <Input type="email" required />
            </FormField>
            <FormField label="Topic" className="md:col-span-2">
              <Select>
                <option>General Inquiry</option>
                <option>Order Question</option>
                <option>Press</option>
                <option>Showroom Booking</option>
                <option>Trade Inquiry</option>
              </Select>
            </FormField>
            <FormField label="Message" className="md:col-span-2" required>
              <Textarea rows={6} required />
            </FormField>
            <div className="md:col-span-2">
              <Button variant="primary">Send Message</Button>
            </div>
          </form>
        </div>
        <aside className="md:col-span-5">
          <div className="border border-ink/10 p-8">
            <Eyebrow>Customer Service</Eyebrow>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <span className="block text-xs tracking-[0.2em] uppercase text-taupe">
                  Phone
                </span>
                +1 800 555 0124
              </li>
              <li>
                <span className="block text-xs tracking-[0.2em] uppercase text-taupe">
                  Hours
                </span>
                Mon–Fri 9am–7pm ET · Sat 10am–4pm ET
              </li>
              <li>
                <span className="block text-xs tracking-[0.2em] uppercase text-taupe">
                  Email
                </span>
                care@firman.demo
              </li>
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <Link
                href="/showrooms"
                className="border border-ink/20 p-4 text-xs tracking-[0.15em] uppercase hover:border-ink"
              >
                Find a Showroom
              </Link>
              <Link
                href="/faq"
                className="border border-ink/20 p-4 text-xs tracking-[0.15em] uppercase hover:border-ink"
              >
                Browse FAQ
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
