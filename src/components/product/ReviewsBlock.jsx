import Eyebrow from "@/components/feedback/Eyebrow";
import Button from "@/components/primitives/Button";

const SAMPLE = [
  {
    author: "Eleanor W. · Greenwich, CT",
    rating: 5,
    title: "A piece I'll pass down",
    body: "Three months in and the leather is just beginning to patina. The Wexford anchors our living room.",
  },
  {
    author: "Marcus P. · Manhattan",
    rating: 5,
    title: "Worth every penny",
    body: "Built like nothing else I've owned. The hand-tied coils make a real difference — you sit in it, not on it.",
  },
  {
    author: "Henry D. · London",
    rating: 4,
    title: "Beautifully made",
    body: "Slight delivery delay but the white-glove crew was exceptional. The bench is gorgeous.",
  },
];

export default function ReviewsBlock({ product }) {
  return (
    <section className="border-t border-ink/10 bg-bone/40">
      <div className="mx-auto w-full max-w-screen-2xl px-6 py-20 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Eyebrow>Reviews</Eyebrow>
            <div className="mt-3 flex items-baseline gap-4">
              <span className="font-display text-5xl">
                {product.rating || 4.7}
              </span>
              <span className="text-taupe">
                from {product.reviews || 42} verified reviews
              </span>
            </div>
          </div>
          <Button variant="secondary">Write a Review</Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SAMPLE.map((r, i) => (
            <article
              key={i}
              className="border border-ink/10 bg-ivory p-6"
            >
              <span className="text-brass">
                {"★".repeat(r.rating)}
                <span className="text-ink/20">{"★".repeat(5 - r.rating)}</span>
              </span>
              <h4 className="font-display mt-2 text-xl">{r.title}</h4>
              <p className="text-taupe mt-2 text-sm">{r.body}</p>
              <span className="mt-4 block text-xs tracking-[0.15em] uppercase text-taupe">
                {r.author}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
