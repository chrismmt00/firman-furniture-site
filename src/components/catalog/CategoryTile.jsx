import Link from "next/link";
import Placeholder from "@/components/feedback/Placeholder";

const TONES = ["oxblood", "forest", "ink", "brass", "dark", "taupe", "oxblood", "forest"];

export default function CategoryTile({ category, index = 0, ratio = "3/4" }) {
  const tone = TONES[index % TONES.length];
  return (
    <Link
      href={`/shop/${category.slug}`}
      className="group relative block overflow-hidden"
    >
      <Placeholder
        ratio={ratio}
        tone={tone}
        label={category.name}
        src={category.image}
        alt={category.name}
        className="transition-transform group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-6 text-center text-ivory">
        <span className="font-display text-3xl">{category.name}</span>
        <span className="mt-1 text-xs tracking-[0.2em] uppercase text-ivory/80">
          Explore
        </span>
      </div>
    </Link>
  );
}
