"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { ProductImage } from "@/components/product-image";
import { formatInr } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotalInr, removeItem, setQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <p className="text-2xl font-bold">Your cart is empty</p>
        <p className="mt-2 text-muted">Find accessories for your car and they&apos;ll show up here.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight">Your cart</h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.productId} className="flex gap-4 rounded-xl border border-border bg-surface p-4">
              <Link href={`/product/${item.productId}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                <ProductImage name={item.name} src={item.image} />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/product/${item.productId}`} className="font-semibold hover:text-accent">
                    {item.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-xs text-muted hover:text-foreground"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.productId, item.quantity - 1)}
                      className="px-2.5 py-1 text-sm"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.productId, item.quantity + 1)}
                      className="px-2.5 py-1 text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold">{formatInr(item.priceInr * item.quantity)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit rounded-xl border border-border bg-surface p-5">
          <div className="flex justify-between text-sm text-muted">
            <span>Subtotal</span>
            <span>{formatInr(subtotalInr)}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm text-muted">
            <span>Shipping</span>
            <span>{subtotalInr >= 999 ? "Free" : formatInr(79)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-border pt-3 font-bold">
            <span>Total</span>
            <span>{formatInr(subtotalInr + (subtotalInr >= 999 ? 0 : 79))}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-4 block rounded-xl bg-accent py-3 text-center text-sm font-bold text-accent-foreground hover:bg-accent/90"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
