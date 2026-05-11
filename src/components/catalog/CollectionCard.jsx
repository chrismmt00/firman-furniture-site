import Link from "next/link";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";

export default function CollectionCard({ collection, large = false }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group block"
    >
      <Placeholder
        ratio={large ? "16/9" : "4/5"}
        tone={collection.tone || "oxblood"}
        label={collection.name}
        src={collection.image}
        alt={collection.name}
        className="transition-transform group-hover:scale-[1.01]"
      />
      <div className="mt-4">
        <Eyebrow>The Collection</Eyebrow>
        <h3 className="font-display mt-2 text-2xl group-hover:text-brass-deep">
          {collection.name}
        </h3>
        <p className="text-taupe mt-1">{collection.tagline}</p>
      </div>
    </Link>
  );
}
