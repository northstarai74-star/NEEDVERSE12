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
      <p className="text-xs uppercase tracking-widest text-muted">Bundle</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">{bundle.name}</h1>
      <p className="mt-2 text-muted">{bundle.tagline}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <p className="text-2xl font-bold">{formatInr(total)}</p>
        <AddBundleToCart products={products} />
      </div>

      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
