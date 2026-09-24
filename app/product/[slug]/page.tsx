import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById, getRelatedProducts, getVehicleModels } from "@/lib/catalog";
import { ProductImage } from "@/components/product-image";
import { RatingStars } from "@/components/rating-stars";
import { PriceTag } from "@/components/price-tag";
import { FitBadge } from "@/components/fit-badge";
import { AddToCartForm } from "@/components/add-to-cart-form";
import { ProductGrid } from "@/components/product-grid";

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductById(slug);
  if (!product) notFound();

  const [related, allModels] = await Promise.all([getRelatedProducts(product, 4), getVehicleModels()]);

  const compatibleModels = allModels.filter((m) => product.compatibleVehicleIds.includes(m.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="label-mono mb-6 text-xs text-muted">
        <Link href="/shop" className="hover:text-foreground">Shop</Link>
        {" / "}
        <Link href={`/shop?category=${product.categoryId}`} className="hover:text-foreground">
          {product.categoryName}
        </Link>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden border border-border bg-surface">
          <ProductImage name={product.name} categoryId={product.categoryId} src={product.images[0]} />
        </div>

        <div>
          <FitBadge fitType={product.fitType} compatibleVehicleIds={product.compatibleVehicleIds} />
          <h1 className="font-display mt-3 text-4xl sm:text-5xl">{product.name}</h1>
          {product.brand && <p className="label-mono mt-2 text-xs text-muted">by {product.brand}</p>}

          <RatingStars rating={product.rating} reviewCount={product.reviewCount} className="mt-3" />
          <PriceTag priceInr={product.priceInr} compareAtPriceInr={product.compareAtPriceInr} size="lg" className="mt-4" />

          {product.description && <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>}

          <div className="mt-6">
            <AddToCartForm product={product} />
          </div>

          <p className="label-mono mt-4 text-xs text-muted">
            Delivery in 2–5 business days · Cash on delivery available · 7-day easy returns
          </p>

          {product.whatsIncluded.length > 0 && (
            <div className="mt-8 border-t border-border pt-6">
              <p className="label-mono text-xs text-accent">[ What&apos;s included ]</p>
              <ul className="label-mono mt-3 space-y-1.5 text-xs text-muted">
                {product.whatsIncluded.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          )}

          {Object.keys(product.specs).length > 0 && (
            <div className="mt-6 border-t border-border pt-6">
              <p className="label-mono text-xs text-accent">[ Specifications ]</p>
              <dl className="label-mono mt-3 grid grid-cols-2 gap-y-2 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="contents">
                    <dt className="text-muted">{key}</dt>
                    <dd className="text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-6 border-t border-border pt-6">
            <p className="label-mono text-xs text-accent">[ Vehicle compatibility ]</p>
            {product.fitType === "universal" ? (
              <p className="label-mono mt-3 text-xs text-muted">Fits all cars — universal accessory.</p>
            ) : compatibleModels.length > 0 ? (
              <ul className="label-mono mt-3 space-y-1.5 text-xs">
                {compatibleModels.map((m) => (
                  <li key={m.id} className="text-emerald-400">
                    ✓ {m.makeName} {m.name} ({m.yearStart}
                    {m.yearEnd ? `–${m.yearEnd}` : "+"})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="label-mono mt-3 text-xs text-muted">Compatibility list coming soon.</p>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-display mb-6 text-3xl">You may also like</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
