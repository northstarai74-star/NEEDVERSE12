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
      <p className="label-mono text-xs text-accent">[ Bundles ]</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl">Curated upgrade packages</h1>
      <p className="label-mono mt-3 max-w-xl text-xs text-muted">
        Instead of picking accessories one by one, grab a bundle built around how you actually use your car.
      </p>

      <div className="mt-10 grid grid-cols-1 divide-y divide-border border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {withProducts.map(({ bundle, products }) => {
          const total = products.reduce((sum, p) => sum + p.priceInr, 0);
          return (
            <Link key={bundle.id} href={`/bundles/${bundle.id}`} className="flex flex-col p-6 transition hover:bg-surface">
              <p className="text-lg font-bold uppercase tracking-tight">{bundle.name}</p>
              <p className="label-mono mt-2 text-xs text-muted">{bundle.tagline}</p>
              <ul className="label-mono mt-4 flex-1 space-y-1 text-xs text-muted">
                {products.map((p) => (
                  <li key={p.id}>• {p.name}</li>
                ))}
              </ul>
              <p className="font-mono mt-4 text-lg font-bold text-accent">{formatInr(total)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
