"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart/cart-context";
import { useSelectedVehicle } from "@/lib/vehicle/vehicle-context";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/cars", label: "Shop By Car" },
  { href: "/bundles", label: "Bundles" },
  { href: "/guides", label: "Guides" },
];

export function Header() {
  const { itemCount } = useCart();
  const { vehicle, hydrated, clearVehicle } = useSelectedVehicle();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          NEED<span className="text-accent">VERSE</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted transition hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {hydrated && vehicle && (
            <button
              type="button"
              onClick={clearVehicle}
              className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium sm:flex"
              title="Clear selected vehicle"
            >
              🚗 {vehicle.modelName}
              <span aria-hidden className="text-muted">✕</span>
            </button>
          )}

          <Link
            href="/track-order"
            className="hidden text-sm font-medium text-muted transition hover:text-foreground md:block"
          >
            Track Order
          </Link>

          <Link href="/cart" className="relative rounded-full border border-border p-2 hover:bg-surface" aria-label="Cart">
            <span aria-hidden>🛒</span>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full border border-border p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-muted hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/track-order"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-2 py-2.5 text-sm font-medium text-muted hover:bg-surface hover:text-foreground"
          >
            Track Order
          </Link>
        </nav>
      )}
    </header>
  );
}
