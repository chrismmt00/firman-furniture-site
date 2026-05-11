"use client";

import Select from "@/components/primitives/Select";

export default function SortDropdown({ value, onChange }) {
  return (
    <label className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-taupe">
      Sort By
      <Select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="!w-auto !py-1 !pr-6 !text-ink"
      >
        <option value="featured">Featured</option>
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="bestseller">Bestsellers</option>
      </Select>
    </label>
  );
}
