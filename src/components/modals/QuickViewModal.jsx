"use client";

import Link from "next/link";
import Dialog from "./Dialog";
import Placeholder from "@/components/feedback/Placeholder";
import PriceDisplay from "@/components/feedback/PriceDisplay";
import StockBadge from "@/components/feedback/StockBadge";
import Button from "@/components/primitives/Button";
import Eyebrow from "@/components/feedback/Eyebrow";
import { useCart } from "@/lib/mock-cart";

export default function QuickViewModal({ open, onClose, product }) {
  const { add } = useCart();
  if (!product) return null;
  return (
    <Dialog open={open} onClose={onClose} size="xl" ariaLabel="Quick view">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Placeholder ratio="1/1" tone="light" label={product.name} />
        <div className="p-8 md:p-10">
          <Eyebrow>{product.category}</Eyebrow>
          <h2 className="font-display mt-3 text-3xl">{product.name}</h2>
          <div className="mt-3">
            <StockBadge status={product.status} stock={product.stock} />
          </div>
          <p className="text-taupe mt-4">{product.description}</p>
          <div className="mt-6">
            <PriceDisplay
              price={product.price}
              compareAt={product.compareAt}
              size="lg"
            />
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Button
              variant="primary"
              onClick={() => {
                add(product);
                onClose();
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              href={`/products/${product.slug}`}
              onClick={onClose}
            >
              View Full Details
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
