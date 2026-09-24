import { notFound } from "next/navigation";
import { getBundleById, getProductsByIds } from "@/lib/catalog";
import { formatInr } from "@/lib/utils";
import { ProductGrid } from "@/components/product-grid";
import { AddBundleToCart } from "@/components/add-bundle-to-cart";

export default async function BundleDetailPage(props: PageProps<"/bundles/[bundleId]">) {
  const { bundleId } = await props.params;
  const bundle = await getBundleById(bundleId);
  if (!bundle) notFound();

  const products = await getProductsByIds(bundle.productIds);
  const total = products.reduce((sum, p) => sum + p.priceInr, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="label-mono text-xs text-accent">[ Bundle ]</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl">{bundle.name}</h1>
      <p className="label-mono mt-3 text-xs text-muted">{bundle.tagline}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <p className="font-mono text-2xl font-bold text-accent">{formatInr(total)}</p>
        <AddBundleToCart products={products} />
      </div>

      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
