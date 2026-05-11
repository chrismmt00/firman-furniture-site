"use client";

import { MockAuthProvider } from "@/lib/mock-auth";
import { MockCartProvider } from "@/lib/mock-cart";
import { MockWishlistProvider } from "@/lib/mock-wishlist";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Providers({ children }) {
  return (
    <MockAuthProvider>
      <MockWishlistProvider>
        <MockCartProvider>
          {children}
          <CartDrawer />
        </MockCartProvider>
      </MockWishlistProvider>
    </MockAuthProvider>
  );
}
