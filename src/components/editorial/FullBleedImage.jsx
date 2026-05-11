import Placeholder from "@/components/feedback/Placeholder";

export default function FullBleedImage({ tone = "ink", label, caption, height = "lg", src }) {
  return (
    <section className="relative w-full">
      <Placeholder
        fill
        tone={tone}
        label={label}
        src={src}
        alt={label}
        className={height === "lg" ? "h-[80vh]" : "h-[56vh]"}
      />
      {caption && (
        <p className="mx-auto max-w-2xl px-6 py-6 text-center text-sm italic text-taupe">
          {caption}
        </p>
      )}
    </section>
  );
}
