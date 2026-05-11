import { notFound } from "next/navigation";
import showrooms from "@/lib/mock-data/showrooms.json";
import products from "@/lib/mock-data/products.json";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import FullBleedImage from "@/components/editorial/FullBleedImage";
import ProductGrid from "@/components/catalog/ProductGrid";
import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";
import Button from "@/components/primitives/Button";
import Input from "@/components/primitives/Input";
import Textarea from "@/components/primitives/Textarea";
import FormField from "@/components/primitives/FormField";

export async function generateStaticParams() {
  return showrooms.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = showrooms.find((x) => x.slug === slug);
  return { title: `${s?.name || "Showroom"} · Firman Furniture` };
}

export default async function ShowroomPage({ params }) {
  const { slug } = await params;
  const showroom = showrooms.find((s) => s.slug === slug);
  if (!showroom) notFound();
  const onDisplay = products.slice(0, 4);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Showrooms", href: "/showrooms" },
          { label: showroom.name },
        ]}
      />
      <FullBleedImage
        tone="ink"
        label={`Firman ${showroom.name} · exterior`}
        src={showroom.image}
      />
      <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Eyebrow>Firman</Eyebrow>
          <h1 className="font-display mt-3 text-4xl md:text-6xl">
            {showroom.name}
          </h1>
          <p className="mt-6 text-lg text-taupe">{showroom.story}</p>
        </div>
        <div className="md:col-span-7">
          <div className="border border-ink/10 p-8">
            <Eyebrow>Visit</Eyebrow>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <span className="block text-xs tracking-[0.2em] uppercase text-taupe">
                  Address
                </span>
                {showroom.address}
              </li>
              <li>
                <span className="block text-xs tracking-[0.2em] uppercase text-taupe">
                  Hours
                </span>
                {showroom.hours}
              </li>
              <li>
                <span className="block text-xs tracking-[0.2em] uppercase text-taupe">
                  Phone
                </span>
                {showroom.phone}
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <Button variant="primary">Get Directions</Button>
              <Button variant="secondary">Plan a Visit</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-12 md:px-10">
        <Placeholder ratio="21/9" tone="forest" label="Map placeholder" />
      </section>
      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-20 md:px-10">
        <Eyebrow>On Display</Eyebrow>
        <h2 className="font-display mt-3 mb-10 text-3xl">
          What you'll see in {showroom.name}.
        </h2>
        <ProductGrid products={onDisplay} cols={4} />
      </section>
      <section className="bg-bone">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-2 md:px-10">
          <div>
            <Eyebrow>Plan a Visit</Eyebrow>
            <h2 className="font-display mt-3 text-3xl">
              We'd love to see you.
            </h2>
            <p className="text-taupe mt-3">
              Reserve a one-on-one tour, or just drop in during open hours.
            </p>
          </div>
          <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField label="Name">
              <Input required />
            </FormField>
            <FormField label="Email">
              <Input type="email" required />
            </FormField>
            <FormField label="Preferred Date" className="md:col-span-1">
              <Input type="date" />
            </FormField>
            <FormField label="Party Size" className="md:col-span-1">
              <Input type="number" min={1} />
            </FormField>
            <FormField label="Message" className="md:col-span-2">
              <Textarea rows={3} />
            </FormField>
            <div className="md:col-span-2">
              <Button variant="primary">Request Visit</Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
