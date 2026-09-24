"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Order } from "@/lib/types";
import { formatInr } from "@/lib/utils";

const STATUS_STEPS: Order["status"][] = ["confirmed", "processing", "shipped", "delivered"];

function TrackOrderForm() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get("orderNumber") ?? "");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function lookup(number: string, mail: string) {
    if (!number || !mail) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(number)}?email=${encodeURIComponent(mail)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Order not found");
      setOrder(data.order);
    } catch (err) {
      setOrder(null);
      setError(err instanceof Error ? err.message : "Order not found");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Auto-lookup once when arriving via the confirmation page's deep link.
    if (searchParams.get("orderNumber") && searchParams.get("email")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      lookup(searchParams.get("orderNumber")!, searchParams.get("email")!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stepIndex = order ? STATUS_STEPS.indexOf(order.status) : -1;

  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight">Track your order</h1>
      <p className="mt-2 text-sm text-muted">Enter your order number and the email you used at checkout.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          lookup(orderNumber, email);
        }}
        className="mt-6 space-y-3"
      >
        <input
          required
          placeholder="Order number (e.g. NV1A2B3C)"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
        />
        <input
          required
          type="email"
          placeholder="Email used at checkout"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-accent py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
        >
          {loading ? "Looking up..." : "Track order"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {order && (
        <div className="mt-8 rounded-xl border border-border bg-surface p-5">
          <p className="font-semibold">Order #{order.orderNumber}</p>
          <p className="mt-1 text-sm text-muted">Placed on {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>

          <div className="mt-5 flex items-center justify-between">
            {STATUS_STEPS.map((step, i) => (
              <div key={step} className="flex flex-1 flex-col items-center text-center">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${i <= stepIndex ? "bg-accent" : "bg-border"}`}
                />
                <span className={`mt-2 text-xs capitalize ${i <= stepIndex ? "text-foreground" : "text-muted"}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-1.5 border-t border-border pt-4 text-sm">
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between text-muted">
                <span>
                  {item.productName} × {item.quantity}
                </span>
                <span>{formatInr(item.lineTotalInr)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 font-bold text-foreground">
              <span>Total</span>
              <span>{formatInr(order.totalInr)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={null}>
      <TrackOrderForm />
    </Suspense>
  );
}
