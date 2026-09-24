"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { ProductImage } from "@/components/product-image";
import { CtaButton } from "@/components/cta-button";
import { formatInr } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotalInr, removeItem, setQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <p className="font-display text-4xl">Your cart is empty</p>
        <p className="label-mono mt-3 text-xs text-muted">Find accessories for your car and they&apos;ll show up here.</p>
        <div className="mt-6 flex justify-center">
          <CtaButton href="/shop" variant="accent">
            Browse the shop
          </CtaButton>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl">Your cart</h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.productId} className="flex gap-4 border border-border bg-surface p-4">
              <Link href={`/product/${item.productId}`} className="h-20 w-20 shrink-0 overflow-hidden">
                <ProductImage name={item.name} src={item.image} showCaption={false} />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/product/${item.productId}`} className="font-bold uppercase tracking-tight hover:text-accent">
                    {item.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="label-mono text-xs text-muted hover:text-foreground"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.productId, item.quantity - 1)}
                      className="px-2.5 py-1 text-sm"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-mono text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.productId, item.quantity + 1)}
                      className="px-2.5 py-1 text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-mono font-semibold">{formatInr(item.priceInr * item.quantity)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit border border-border bg-surface p-5">
          <div className="label-mono flex justify-between text-xs text-muted">
            <span>Subtotal</span>
            <span>{formatInr(subtotalInr)}</span>
          </div>
          <div className="label-mono mt-1 flex justify-between text-xs text-muted">
            <span>Shipping</span>
            <span>{subtotalInr >= 999 ? "Free" : formatInr(79)}</span>
          </div>
          <div className="label-mono mt-3 flex justify-between border-t border-border pt-3 font-bold text-foreground">
            <span>Total</span>
            <span>{formatInr(subtotalInr + (subtotalInr >= 999 ? 0 : 79))}</span>
          </div>
          <Link
            href="/checkout"
            className="label-mono mt-4 block bg-accent py-3 text-center text-xs font-bold text-accent-foreground hover:bg-accent/90"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
