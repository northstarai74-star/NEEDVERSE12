"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart/cart-context";
import { VehicleProvider } from "@/lib/vehicle/vehicle-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <VehicleProvider>
      <CartProvider>{children}</CartProvider>
    </VehicleProvider>
  );
}
