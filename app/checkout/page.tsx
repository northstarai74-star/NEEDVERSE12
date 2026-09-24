"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { formatInr } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, subtotalInr, clear } = useCart();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const shippingInr = subtotalInr >= 999 ? 0 : 79;
  const totalInr = subtotalInr + shippingInr;

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.fullName,
          customerEmail: form.email,
          customerPhone: form.phone,
          shippingAddress: {
            fullName: form.fullName,
            phone: form.phone,
            email: form.email,
            line1: form.line1,
            line2: form.line2 || undefined,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
          },
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not place order");

      clear();
      router.push(`/order/${data.order.orderNumber}?email=${encodeURIComponent(form.email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <p className="font-display text-4xl">Nothing to check out</p>
        <p className="label-mono mt-3 text-xs text-muted">Add a product to your cart first.</p>
        <Link href="/shop" className="label-mono mt-6 inline-block bg-accent px-6 py-3 text-xs font-bold text-accent-foreground">
          Browse the shop
        </Link>
      </div>
    );
  }

  const inputClass =
    "label-mono w-full border border-border bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted focus:border-accent focus:outline-none";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="label-mono mb-2 text-xs text-accent">[ Contact ]</legend>
            <input required placeholder="Full name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputClass} />
            <div className="grid grid-cols-2 gap-3">
              <input required type="email" placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
              <input required type="tel" placeholder="Mobile number" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="label-mono mb-2 text-xs text-accent">[ Delivery address ]</legend>
            <input required placeholder="Address line 1" value={form.line1} onChange={(e) => update("line1", e.target.value)} className={inputClass} />
            <input placeholder="Address line 2 (optional)" value={form.line2} onChange={(e) => update("line2", e.target.value)} className={inputClass} />
            <div className="grid grid-cols-3 gap-3">
              <input required placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)} className={inputClass} />
              <input required placeholder="State" value={form.state} onChange={(e) => update("state", e.target.value)} className={inputClass} />
              <input required placeholder="Pincode" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} className={inputClass} />
            </div>
          </fieldset>

          <fieldset>
            <legend className="label-mono mb-2 text-xs text-accent">[ Payment ]</legend>
            <div className="label-mono border border-border bg-surface px-4 py-3 text-xs text-muted">
              Cash on Delivery — pay when your order arrives.
            </div>
          </fieldset>

          {error && <p className="label-mono text-xs text-red-500">{error}</p>}
        </div>

        <div className="h-fit space-y-4 border border-border bg-surface p-5">
          <ul className="label-mono space-y-2 text-xs">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between text-muted">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatInr(item.priceInr * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="label-mono border-t border-border pt-3 text-xs">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>{formatInr(subtotalInr)}</span>
            </div>
            <div className="mt-1 flex justify-between text-muted">
              <span>Shipping</span>
              <span>{shippingInr === 0 ? "Free" : formatInr(shippingInr)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-2 font-bold text-foreground">
              <span>Total</span>
              <span>{formatInr(totalInr)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="label-mono w-full bg-accent py-3 text-xs font-bold text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
          >
            {submitting ? "Placing order..." : `Place order — ${formatInr(totalInr)}`}
          </button>
        </div>
      </form>
    </div>
  );
}
