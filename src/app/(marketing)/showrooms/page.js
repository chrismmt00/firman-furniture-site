import Link from "next/link";
import showrooms from "@/lib/mock-data/showrooms.json";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";

export const metadata = { title: "Showrooms · Firman Furniture" };

export default function ShowroomsPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Showrooms" }]}
      />
      <section className="mx-auto w-full max-w-screen-2xl px-6 pt-12 pb-8 md:px-10">
        <Eyebrow>Twelve Showrooms Worldwide</Eyebrow>
        <h1 className="font-display mt-3 text-4xl md:text-6xl">
          Sit in it first.
        </h1>
        <p className="mt-4 max-w-xl text-taupe">
          Every Firman piece is on display at one of our showrooms — from a
          1962 Manhattan flagship to our newest Tokyo location.
        </p>
      </section>
      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-12 md:px-10">
        <Placeholder
          ratio="21/9"
          tone="ink"
          label="World map · 12 showrooms"
          src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=2000&q=80"
          alt="Firman showrooms worldwide"
        />
      </section>
      <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-8 px-6 pb-24 md:grid-cols-3 md:px-10">
        {showrooms.map((s) => (
          <Link
            key={s.slug}
            href={`/showrooms/${s.slug}`}
            className="group block"
          >
            <Placeholder
              ratio="4/3"
              tone="ink"
              label={s.name}
              src={s.image}
              alt={`Firman ${s.name} showroom`}
              className="transition-transform group-hover:scale-[1.01]"
            />
            <div className="mt-5 border-t border-brass/40 pt-5">
              <Eyebrow>Firman</Eyebrow>
              <h3 className="font-display mt-2 text-3xl group-hover:text-brass-deep">
                {s.name}
              </h3>
              <p className="text-taupe mt-3 text-sm">{s.address}</p>
              <p className="text-taupe mt-1 text-sm">{s.hours}</p>
              <p className="text-taupe mt-1 text-sm">{s.phone}</p>
              <span className="mt-6 inline-block text-xs tracking-[0.2em] uppercase">
                Plan a Visit →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
