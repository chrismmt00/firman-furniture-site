import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";
import Button from "@/components/primitives/Button";

export default function Hero({
  eyebrow = "Spring 2026",
  title = "Heirloom Living",
  body = "Furniture made to outlast trends.",
  cta = "Shop the Collection",
  href = "/shop",
  tone = "oxblood",
  height = "tall",
  src = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2000&q=80",
}) {
  return (
    <section
      className={`relative isolate w-full ${
        height === "tall" ? "min-h-[88vh]" : "min-h-[56vh]"
      } -mt-16 flex items-end overflow-hidden text-ivory`}
    >
      <Placeholder
        fill
        tone={tone}
        label="Full-bleed hero image"
        src={src}
        alt={typeof title === "string" ? title : ""}
        className="absolute inset-0 -z-10"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
      <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10 pb-24 pt-32">
        <Eyebrow tone="brass">{eyebrow}</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-md text-lg text-ivory/80">{body}</p>
        <div className="mt-10">
          <Button variant="inverted" href={href} size="lg">
            {cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
