"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart/cart-context";

export function AddToCartForm({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const outOfStock = product.stock === 0;

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-xl border border-border">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2.5 text-lg"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
            className="px-3 py-2.5 text-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <span className="text-xs text-muted">
          {outOfStock ? "Out of stock" : `${product.stock} in stock`}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={outOfStock}
          onClick={() => {
            addItem(product, quantity);
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
          className="rounded-xl border border-border py-3 text-sm font-semibold transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
        >
          {added ? "Added ✓" : "Add to cart"}
        </button>
        <button
          type="button"
          disabled={outOfStock}
          onClick={() => {
            addItem(product, quantity);
            router.push("/cart");
          }}
          className="rounded-xl bg-accent py-3 text-sm font-bold text-accent-foreground transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
