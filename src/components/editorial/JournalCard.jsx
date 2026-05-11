import Link from "next/link";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";

export default function JournalCard({ post, ratio = "4/3" }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <Placeholder
        ratio={ratio}
        tone="ink"
        label={post.title}
        src={post.image}
        alt={post.title}
        className="transition-transform group-hover:scale-[1.01]"
      />
      <div className="mt-4">
        <Eyebrow>{post.eyebrow}</Eyebrow>
        <h3 className="font-display mt-2 text-2xl leading-tight group-hover:text-brass-deep">
          {post.title}
        </h3>
        <p className="text-taupe mt-2 line-clamp-2">{post.excerpt}</p>
        <div className="mt-3 text-xs tracking-[0.15em] uppercase text-taupe">
          {post.readTime} · {post.author}
        </div>
      </div>
    </Link>
  );
}
