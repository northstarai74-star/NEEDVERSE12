"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart/cart-context";
import { ProductImage } from "./product-image";
import { RatingStars } from "./rating-stars";
import { PriceTag } from "./price-tag";
import { FitBadge } from "./fit-badge";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="group flex flex-col">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
          <ProductImage
            name={product.name}
            categoryId={product.categoryId}
            src={product.images[0]}
            className="transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <FitBadge fitType={product.fitType} compatibleVehicleIds={product.compatibleVehicleIds} compact />
          </div>
          {product.compareAtPriceInr && product.compareAtPriceInr > product.priceInr && (
            <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
              {Math.round((1 - product.priceInr / product.compareAtPriceInr) * 100)}% OFF
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-3">
        <span className="text-xs uppercase tracking-wide text-muted">{product.categoryName}</span>
        <Link href={`/product/${product.id}`}>
          <h3 className="mt-1 font-semibold leading-snug hover:text-accent">{product.name}</h3>
        </Link>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} className="mt-2" />
        <PriceTag priceInr={product.priceInr} compareAtPriceInr={product.compareAtPriceInr} className="mt-2" />

        <button
          type="button"
          onClick={() => addItem(product)}
          disabled={product.stock === 0}
          className="mt-4 w-full rounded-xl bg-foreground py-2.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-border disabled:text-muted disabled:opacity-100"
        >
          {product.stock === 0 ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
