import Link from "next/link";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto w-full max-w-screen-2xl px-6 pt-6 md:px-10"
    >
      <ol className="flex flex-wrap items-center gap-2 text-xs tracking-[0.15em] uppercase text-taupe">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-brass">/</span>}
            {it.href ? (
              <Link href={it.href} className="hover:text-ink">
                {it.label}
              </Link>
            ) : (
              <span className="text-ink">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
