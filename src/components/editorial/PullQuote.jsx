export default function PullQuote({ children, attribution }) {
  return (
    <figure className="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
      <span aria-hidden className="font-display text-brass text-6xl leading-none">
        &ldquo;
      </span>
      <blockquote className="font-display mt-4 text-3xl italic leading-snug text-ink md:text-4xl">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-6 text-xs tracking-[0.2em] uppercase text-taupe">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}
