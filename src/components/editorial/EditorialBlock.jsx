import Link from "next/link";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";

export default function EditorialBlock({
  eyebrow,
  title,
  body,
  cta,
  href,
  imageLabel,
  src,
  tone = "oxblood",
  reverse = false,
  ratio = "4/5",
}) {
  return (
    <section className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-6 py-24 md:grid-cols-12 md:px-10">
      <div
        className={`md:col-span-7 ${reverse ? "md:order-2" : ""}`}
      >
        <Placeholder ratio={ratio} tone={tone} label={imageLabel} src={src} alt={imageLabel} />
      </div>
      <div
        className={`flex flex-col justify-center md:col-span-5 ${
          reverse ? "md:order-1 md:pr-10" : "md:pl-10"
        }`}
      >
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="font-display mt-4 text-4xl md:text-5xl">{title}</h2>
        {body && <p className="mt-5 text-lg text-taupe">{body}</p>}
        {cta && href && (
          <Link
            href={href}
            className="mt-8 inline-block self-start border-b border-brass pb-1 text-xs tracking-[0.2em] uppercase hover:border-ink"
          >
            {cta}
          </Link>
        )}
      </div>
    </section>
  );
}
