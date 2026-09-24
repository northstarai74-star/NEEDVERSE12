import Link from "next/link";
import { getBundles, getProductsByIds } from "@/lib/catalog";
import { formatInr } from "@/lib/utils";

export const metadata = { title: "Bundles — NeedVerse" };

export default async function BundlesPage() {
  const bundles = await getBundles();
  const withProducts = await Promise.all(
    bundles.map(async (bundle) => ({ bundle, products: await getProductsByIds(bundle.productIds) }))
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs uppercase tracking-widest text-muted">Bundles</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Curated upgrade packages</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Instead of picking accessories one by one, grab a bundle built around how you actually use your car.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {withProducts.map(({ bundle, products }) => {
          const total = products.reduce((sum, p) => sum + p.priceInr, 0);
          return (
            <Link
              key={bundle.id}
              href={`/bundles/${bundle.id}`}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50"
            >
              <p className="font-bold">{bundle.name}</p>
              <p className="mt-1 text-sm text-muted">{bundle.tagline}</p>
              <ul className="mt-4 flex-1 space-y-1 text-sm text-muted">
                {products.map((p) => (
                  <li key={p.id}>• {p.name}</li>
                ))}
              </ul>
              <p className="mt-4 font-bold">{formatInr(total)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
