import Link from "next/link";
import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";
import Button from "@/components/primitives/Button";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-ivory">
      <Placeholder
        fill
        tone="ink"
        label=""
        src="https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=2000&q=80"
        alt=""
        className="absolute inset-0 -z-10 opacity-50"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col items-center justify-center px-6 text-center md:px-10">
        <Eyebrow tone="brass">404</Eyebrow>
        <h1 className="font-display mt-4 text-5xl md:text-7xl">
          This page has wandered off.
        </h1>
        <p className="text-ivory/70 mt-6 max-w-md">
          Perhaps it's at the showroom. While we look — head home, or read
          something in the journal.
        </p>
        <div className="mt-10 flex flex-col gap-3 md:flex-row">
          <Button href="/" variant="inverted">
            Return Home
          </Button>
          <Button href="/journal" variant="ghost" className="text-ivory">
            Visit the Journal
          </Button>
        </div>
      </div>
    </main>
  );
}
