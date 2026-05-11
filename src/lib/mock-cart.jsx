"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "firman.cart";

function loadInitial() {
  if (typeof window === "undefined") return { items: [], drawerOpen: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], drawerOpen: false };
    const parsed = JSON.parse(raw);
    return { items: parsed.items || [], drawerOpen: false };
  } catch {
    return { items: [], drawerOpen: false };
  }
}

export function MockCartProvider({ children }) {
  const [state, setState] = useState({ items: [], drawerOpen: false });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadInitial());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
  }, [state.items, hydrated]);

  const add = (product, options = {}) => {
    const variant = options.color || product.colors?.[0] || "Default";
    const qty = options.qty || 1;
    setState((s) => {
      const existing = s.items.find(
        (i) => i.slug === product.slug && i.variant === variant
      );
      const items = existing
        ? s.items.map((i) =>
            i === existing ? { ...i, qty: i.qty + qty } : i
          )
        : [
            ...s.items,
            {
              slug: product.slug,
              name: product.name,
              price: product.price,
              variant,
              qty,
            },
          ];
      return { ...s, items, drawerOpen: true };
    });
  };

  const remove = (slug, variant) =>
    setState((s) => ({
      ...s,
      items: s.items.filter((i) => !(i.slug === slug && i.variant === variant)),
    }));

  const setQty = (slug, variant, qty) =>
    setState((s) => ({
      ...s,
      items: s.items.map((i) =>
        i.slug === slug && i.variant === variant
          ? { ...i, qty: Math.max(1, qty) }
          : i
      ),
    }));

  const clear = () => setState((s) => ({ ...s, items: [] }));

  const openDrawer = () => setState((s) => ({ ...s, drawerOpen: true }));
  const closeDrawer = () => setState((s) => ({ ...s, drawerOpen: false }));

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);
  const tax = Math.round(subtotal * 0.085);
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        drawerOpen: state.drawerOpen,
        hydrated,
        subtotal,
        tax,
        total,
        count,
        add,
        remove,
        setQty,
        clear,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside MockCartProvider");
  return ctx;
}
