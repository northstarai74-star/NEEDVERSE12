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
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-border bg-surface/90 px-4 shadow-lg shadow-black/30 backdrop-blur sm:px-6">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <Link href="/" className="font-display text-2xl tracking-wide">
          NEED<span className="text-accent">VERSE</span>
        </Link>

        <nav className="label-mono hidden items-center gap-6 text-xs md:flex">
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
              className="label-mono hidden items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs sm:flex"
              title="Clear selected vehicle"
            >
              🚗 {vehicle.modelName}
              <span aria-hidden className="text-muted">✕</span>
            </button>
          )}

          <Link
            href="/track-order"
            className="label-mono hidden text-xs text-muted transition hover:text-foreground md:block"
          >
            Track Order
          </Link>

          <Link href="/cart" className="relative rounded-full border border-border p-2 hover:bg-background" aria-label="Cart">
            <span aria-hidden>🛒</span>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav className="label-mono mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border border-border bg-surface p-3 text-sm md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-muted hover:bg-background hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/track-order"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-2.5 text-muted hover:bg-background hover:text-foreground"
          >
            Track Order
          </Link>
        </nav>
      )}
    </header>
  );
}
