import { getCategories, getProducts, getVehicleModelById } from "@/lib/catalog";
import { Filters } from "@/components/filters";
import { ProductGrid } from "@/components/product-grid";
import type { ProductFilters } from "@/lib/types";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ShopPage(props: PageProps<"/shop">) {
  const sp = await props.searchParams;

  const filters: ProductFilters = {
    category: first(sp.category),
    vehicle: first(sp.vehicle),
    minPrice: first(sp.minPrice) ? Number(first(sp.minPrice)) : undefined,
    maxPrice: first(sp.maxPrice) ? Number(first(sp.maxPrice)) : undefined,
    sort: (first(sp.sort) as ProductFilters["sort"]) ?? "recommended",
    q: first(sp.q),
  };

  const [categories, products, vehicle] = await Promise.all([
    getCategories(),
    getProducts(filters),
    filters.vehicle ? getVehicleModelById(filters.vehicle) : Promise.resolve(null),
  ]);

  const activeCategory = categories.find((c) => c.id === filters.category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="label-mono text-xs text-accent">[ Shop ]</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl">
        {vehicle ? `Accessories for your ${vehicle.makeName} ${vehicle.name}` : activeCategory?.name ?? "All accessories"}
      </h1>
      <p className="label-mono mt-2 text-xs text-muted">{products.length} products</p>

      <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <Filters categories={categories} />
        <ProductGrid
          products={products}
          emptyMessage={
            vehicle
              ? `No products are listed for your ${vehicle.name} yet — try clearing the vehicle filter.`
              : "No products match these filters."
          }
        />
      </div>
    </div>
  );
}
