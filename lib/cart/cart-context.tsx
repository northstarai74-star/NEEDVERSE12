"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Product } from "@/lib/types";

const STORAGE_KEY = "needverse.cart.v1";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotalInr: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage after mount, so the server-rendered
    // (empty-cart) markup matches the client's first paint and only updates
    // once we know what's actually in storage.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupt/blocked storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore blocked storage (private browsing, quota, etc.)
    }
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === product.id);
        if (existing) {
          const nextQty = Math.min(existing.quantity + quantity, product.stock || 99);
          return prev.map((i) => (i.productId === product.id ? { ...i, quantity: nextQty } : i));
        }
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            image: product.images[0] ?? null,
            priceInr: product.priceInr,
            quantity: Math.min(quantity, product.stock || 99),
            stock: product.stock,
          },
        ];
      });
    };

    const removeItem = (productId: string) => {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    };

    const setQuantity = (productId: string, quantity: number) => {
      setItems((prev) =>
        prev
          .map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock || 99)) } : i))
          .filter((i) => i.quantity > 0)
      );
    };

    const clear = () => setItems([]);

    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotalInr = items.reduce((sum, i) => sum + i.quantity * i.priceInr, 0);

    return { items, itemCount, subtotalInr, addItem, removeItem, setQuantity, clear };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
