import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderByNumber } from "@/lib/orders";
import { formatInr } from "@/lib/utils";

export default async function OrderConfirmationPage(props: PageProps<"/order/[orderNumber]">) {
  const { orderNumber } = await props.params;
  const sp = await props.searchParams;
  const email = typeof sp.email === "string" ? sp.email : "";

  const order = email ? await getOrderByNumber(orderNumber, email) : null;
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <p className="text-4xl">✓</p>
      <h1 className="mt-4 text-2xl font-bold">Order confirmed</h1>
      <p className="mt-2 text-muted">
        Order <span className="font-mono text-foreground">#{order.orderNumber}</span> is being prepared.
      </p>

      <div className="mt-8 space-y-2 rounded-xl border border-border bg-surface p-6 text-left">
        {order.items.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm">
            <span>
              {item.productName} × {item.quantity}
            </span>
            <span className="text-muted">{formatInr(item.lineTotalInr)}</span>
          </div>
        ))}
        <div className="flex justify-between border-t border-border pt-2 font-bold">
          <span>Total (COD)</span>
          <span>{formatInr(order.totalInr)}</span>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        Delivering to {order.shippingAddress.line1}, {order.shippingAddress.city}, {order.shippingAddress.state} —{" "}
        {order.shippingAddress.pincode}
      </p>

      <div className="mt-8 flex justify-center gap-3">
        <Link href="/shop" className="rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-surface">
          Continue shopping
        </Link>
        <Link
          href={`/track-order?orderNumber=${order.orderNumber}&email=${encodeURIComponent(order.customerEmail)}`}
          className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90"
        >
          Track this order
        </Link>
      </div>
    </div>
  );
}
