import ProductCard from "./ProductCard";
import { cn } from "@/lib/cn";

export default function ProductGrid({ products = [], cols = 4, className }) {
  return (
    <div
      className={cn(
        "grid gap-6 md:gap-8",
        cols === 4
          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          : cols === 3
            ? "grid-cols-2 md:grid-cols-3"
            : "grid-cols-2",
        className
      )}
    >
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
