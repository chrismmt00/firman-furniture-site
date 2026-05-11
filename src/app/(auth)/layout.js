import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <Link
        href="/"
        className="absolute left-6 top-6 z-10 font-display text-base tracking-[0.28em] whitespace-nowrap md:left-10 md:top-10 md:text-lg"
      >
        FIRMAN FURNITURE
      </Link>
      {children}
    </div>
  );
}
