import { notFound } from "next/navigation";
import journal from "@/lib/mock-data/journal.json";
import products from "@/lib/mock-data/products.json";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import FullBleedImage from "@/components/editorial/FullBleedImage";
import PullQuote from "@/components/editorial/PullQuote";
import ProductGrid from "@/components/catalog/ProductGrid";
import JournalCard from "@/components/editorial/JournalCard";
import Placeholder from "@/components/feedback/Placeholder";
import Eyebrow from "@/components/feedback/Eyebrow";

export async function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  return { title: `${post?.title || "Journal"} · Firman Furniture` };
}

export default async function JournalPostPage({ params }) {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  if (!post) notFound();
  const featured = post.relatedProducts
    ? products.filter((p) => post.relatedProducts.includes(p.slug))
    : [];
  const next = journal.find((p) => p.slug !== slug);

  return (
    <article>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
          { label: post.eyebrow },
        ]}
      />
      <FullBleedImage tone="ink" label={post.title} src={post.image} />
      <header className="mx-auto w-full max-w-screen-md px-6 py-16 text-center md:px-10">
        <Eyebrow>{post.eyebrow}</Eyebrow>
        <h1 className="font-display mt-4 text-4xl leading-tight md:text-6xl">
          {post.title}
        </h1>
        <div className="mt-6 text-xs tracking-[0.2em] uppercase text-taupe">
          By {post.author} · {post.readTime} ·{" "}
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </header>
      <div className="mx-auto w-full max-w-screen-md space-y-6 px-6 pb-12 md:px-10">
        <p className="font-display text-2xl leading-snug">
          <span className="float-left mr-3 mt-2 text-7xl leading-none text-brass-deep">
            {post.excerpt[0]}
          </span>
          {post.excerpt.slice(1)}
        </p>
        <p className="text-taupe text-lg leading-relaxed">
          The story unfolds in three acts — the ledger from 1924 first, then
          the long journey across the Atlantic, and finally the workshop in New
          Bedford where these pieces are made today.
        </p>
        <p className="text-taupe text-lg leading-relaxed">
          Henry Doulton has been here for thirty years. He still hand-ties
          every coil before it leaves the floor.
        </p>
      </div>

      <Placeholder
        ratio="16/9"
        tone="oxblood"
        label="Inline editorial · atelier"
        src="https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&w=2000&q=80"
        alt="Inside the Firman atelier"
        className="mx-auto max-w-screen-xl px-6 md:px-10"
      />

      <div className="mx-auto w-full max-w-screen-md px-6 py-12 md:px-10">
        <p className="text-taupe text-lg leading-relaxed">
          The room itself smells of beeswax and oak shavings. There's a quiet
          rhythm — one piece, one craftsman, one finish at a time.
        </p>
      </div>

      <PullQuote attribution={post.author}>
        We don't make furniture for the next decade. We make it for the next
        century.
      </PullQuote>

      {featured.length > 0 && (
        <section className="mx-auto w-full max-w-screen-2xl border-t border-ink/10 px-6 py-20 md:px-10">
          <Eyebrow>Featured In This Story</Eyebrow>
          <h2 className="font-display mt-3 mb-10 text-3xl">Pieces shown.</h2>
          <ProductGrid products={featured} cols={3} />
        </section>
      )}

      {next && (
        <section className="bg-ink text-ivory">
          <div className="mx-auto w-full max-w-screen-md px-6 py-20 text-center md:px-10">
            <Eyebrow tone="ivory">Up Next</Eyebrow>
            <h2 className="font-display mt-3 text-3xl md:text-4xl">
              {next.title}
            </h2>
            <a
              href={`/journal/${next.slug}`}
              className="mt-8 inline-block border-b border-brass pb-1 text-xs tracking-[0.2em] uppercase hover:text-brass-soft"
            >
              Read the Story
            </a>
          </div>
        </section>
      )}
    </article>
  );
}
