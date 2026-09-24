"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart/cart-context";

export function AddBundleToCart({ products }: { products: Product[] }) {
  const { addItem } = useCart();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        products.forEach((p) => addItem(p, 1));
        router.push("/cart");
      }}
      className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90"
    >
      Add complete bundle to cart
    </button>
  );
}
