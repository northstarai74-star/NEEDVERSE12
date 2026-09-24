import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import type { ShippingAddress } from "@/lib/types";

interface CreateOrderBody {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: { productId: string; quantity: number }[];
}

function isValidBody(body: unknown): body is CreateOrderBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.customerName === "string" &&
    b.customerName.trim().length > 0 &&
    typeof b.customerEmail === "string" &&
    b.customerEmail.includes("@") &&
    typeof b.customerPhone === "string" &&
    b.customerPhone.trim().length > 0 &&
    typeof b.shippingAddress === "object" &&
    Array.isArray(b.items) &&
    b.items.length > 0
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidBody(body)) {
    return NextResponse.json({ error: "Missing required order fields" }, { status: 400 });
  }

  try {
    const order = await createOrder(body);
    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
