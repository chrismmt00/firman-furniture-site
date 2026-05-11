import { cn } from "@/lib/cn";

const TONES = {
  light: "bg-bone text-taupe",
  dark: "bg-ink text-ivory/60",
  oxblood: "bg-oxblood text-ivory/70",
  forest: "bg-forest text-ivory/70",
  brass: "bg-brass text-ink/70",
  taupe: "bg-taupe text-ivory/70",
};

export default function Placeholder({
  ratio = "1/1",
  label,
  tone = "light",
  className,
  rounded = false,
  fill = false,
  src,
  alt,
}) {
  if (src) {
    if (fill) {
      // Render the img directly so the className (e.g. `absolute inset-0 -z-10`)
      // applies to the element responsible for layout — no parent/child position
      // class conflict.
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || label || ""}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover bg-bone",
            rounded && "rounded-full",
            className
          )}
        />
      );
    }
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-bone",
          rounded && "rounded-full",
          className
        )}
        style={{ aspectRatio: ratio }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || label || ""}
          loading="lazy"
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            rounded && "rounded-full"
          )}
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        TONES[tone] || TONES.light,
        rounded && "rounded-full",
        fill && "h-full w-full",
        className
      )}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <div
        className={cn(
          "absolute inset-3 border opacity-20",
          tone === "light" ? "border-ink" : "border-ivory",
          rounded && "rounded-full"
        )}
      />
      {label && (
        <span className="relative px-4 text-center text-[10px] tracking-[0.2em] uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
