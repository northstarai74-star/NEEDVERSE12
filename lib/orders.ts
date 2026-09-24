import "server-only";
import type { Order, OrderItem, ShippingAddress } from "@/lib/types";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProductsByIds } from "@/lib/catalog";
import { generateOrderNumber } from "@/lib/utils";

/**
 * In-memory fallback so checkout works immediately in local/demo mode,
 * before a Supabase project is wired up. Resets whenever the server
 * restarts — this is a demo convenience, not a persistence layer.
 *
 * Stashed on `globalThis` rather than module scope: Next.js can compile this
 * file into more than one module instance (route handlers vs. server
 * components each get their own graph in dev), which would otherwise give
 * each entry point its own empty Map and break lookups across routes.
 */
declare global {
  var __needverseMemoryOrders: Map<string, Order> | undefined;
}

const memoryOrders = globalThis.__needverseMemoryOrders ?? new Map<string, Order>();
globalThis.__needverseMemoryOrders = memoryOrders;

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: { productId: string; quantity: number }[];
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const products = await getProductsByIds(input.items.map((i) => i.productId));
  const productById = new Map(products.map((p) => [p.id, p]));

  const orderItems: OrderItem[] = input.items
    .map((item) => {
      const product = productById.get(item.productId);
      if (!product) return null;
      const quantity = Math.max(1, item.quantity);
      return {
        productId: product.id,
        productName: product.name,
        unitPriceInr: product.priceInr,
        quantity,
        lineTotalInr: product.priceInr * quantity,
      };
    })
    .filter((i): i is OrderItem => i !== null);

  if (orderItems.length === 0) {
    throw new Error("Cannot place an order with no valid items");
  }

  const subtotalInr = orderItems.reduce((sum, i) => sum + i.lineTotalInr, 0);
  const shippingInr = subtotalInr >= 999 ? 0 : 79;

  const order: Order = {
    id: crypto.randomUUID(),
    orderNumber: generateOrderNumber(),
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    customerPhone: input.customerPhone,
    shippingAddress: input.shippingAddress,
    items: orderItems,
    subtotalInr,
    shippingInr,
    totalInr: subtotalInr + shippingInr,
    status: "pending",
    paymentMethod: "cod",
    createdAt: new Date().toISOString(),
  };

  const admin = createAdminClient();
  if (admin) {
    const { error: orderError } = await admin.from("orders").insert({
      id: order.id,
      order_number: order.orderNumber,
      customer_name: order.customerName,
      customer_email: order.customerEmail,
      customer_phone: order.customerPhone,
      shipping_address: order.shippingAddress,
      subtotal_inr: order.subtotalInr,
      shipping_inr: order.shippingInr,
      total_inr: order.totalInr,
      status: order.status,
      payment_method: order.paymentMethod,
    });
    if (orderError) throw new Error(orderError.message);

    const { error: itemsError } = await admin.from("order_items").insert(
      orderItems.map((i) => ({
        order_id: order.id,
        product_id: i.productId,
        product_name: i.productName,
        unit_price_inr: i.unitPriceInr,
        quantity: i.quantity,
        line_total_inr: i.lineTotalInr,
      }))
    );
    if (itemsError) throw new Error(itemsError.message);

    return order;
  }

  memoryOrders.set(order.orderNumber, order);
  return order;
}

export async function getOrderByNumber(orderNumber: string, email: string): Promise<Order | null> {
  const admin = createAdminClient();

  if (admin) {
    const { data: orderRow, error } = await admin
      .from("orders")
      .select("*")
      .eq("order_number", orderNumber)
      .ilike("customer_email", email)
      .maybeSingle();
    if (error || !orderRow) return null;

    const { data: itemRows } = await admin.from("order_items").select("*").eq("order_id", orderRow.id);

    return {
      id: orderRow.id,
      orderNumber: orderRow.order_number,
      customerName: orderRow.customer_name,
      customerEmail: orderRow.customer_email,
      customerPhone: orderRow.customer_phone,
      shippingAddress: orderRow.shipping_address,
      items: (itemRows ?? []).map((i) => ({
        productId: i.product_id,
        productName: i.product_name,
        unitPriceInr: Number(i.unit_price_inr),
        quantity: i.quantity,
        lineTotalInr: Number(i.line_total_inr),
      })),
      subtotalInr: Number(orderRow.subtotal_inr),
      shippingInr: Number(orderRow.shipping_inr),
      totalInr: Number(orderRow.total_inr),
      status: orderRow.status,
      paymentMethod: orderRow.payment_method,
      createdAt: orderRow.created_at,
    };
  }

  const order = memoryOrders.get(orderNumber);
  if (!order || order.customerEmail.toLowerCase() !== email.toLowerCase()) return null;
  return order;
}
