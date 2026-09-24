import type { Category, Product, ProductFilters, VehicleMake, VehicleModel } from "@/lib/types";
import { BUNDLES, CATEGORIES, MAKES, MODELS, PRODUCTS, type SeedBundle } from "./seed-data";

function toProduct(p: (typeof PRODUCTS)[number]): Product {
  const category = CATEGORIES.find((c) => c.id === p.categoryId);
  return {
    id: p.id,
    name: p.name,
    categoryId: p.categoryId,
    categoryName: category?.name ?? p.categoryId,
    brand: p.brand,
    sku: p.sku,
    description: p.description,
    whatsIncluded: p.whatsIncluded,
    priceInr: p.priceInr,
    compareAtPriceInr: p.compareAtPriceInr,
    fitType: p.fitType,
    images: [],
    specs: p.specs,
    rating: p.rating,
    reviewCount: p.reviewCount,
    stock: p.stock,
    isFeatured: p.isFeatured,
    compatibleVehicleIds: p.compatibleVehicleIds,
  };
}

const ALL_PRODUCTS: Product[] = PRODUCTS.map(toProduct);

export function fallbackGetMakes(): VehicleMake[] {
  return MAKES;
}

export function fallbackGetModels(makeId?: string): VehicleModel[] {
  return makeId ? MODELS.filter((m) => m.makeId === makeId) : MODELS;
}

export function fallbackGetModelById(modelId: string): VehicleModel | null {
  return MODELS.find((m) => m.id === modelId) ?? null;
}

export function fallbackGetCategories(): Category[] {
  return [...CATEGORIES].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function fallbackGetCategoryById(categoryId: string): Category | null {
  return CATEGORIES.find((c) => c.id === categoryId) ?? null;
}

export function fallbackIsCompatible(product: Product, vehicleModelId: string): boolean {
  return product.fitType === "universal" || product.compatibleVehicleIds.includes(vehicleModelId);
}

export function fallbackGetProducts(filters: ProductFilters = {}): Product[] {
  let results = ALL_PRODUCTS;

  if (filters.category) {
    results = results.filter((p) => p.categoryId === filters.category);
  }
  if (filters.vehicle) {
    results = results.filter((p) => fallbackIsCompatible(p, filters.vehicle!));
  }
  if (typeof filters.minPrice === "number") {
    results = results.filter((p) => p.priceInr >= filters.minPrice!);
  }
  if (typeof filters.maxPrice === "number") {
    results = results.filter((p) => p.priceInr <= filters.maxPrice!);
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q)
    );
  }

  switch (filters.sort) {
    case "price_asc":
      results = [...results].sort((a, b) => a.priceInr - b.priceInr);
      break;
    case "price_desc":
      results = [...results].sort((a, b) => b.priceInr - a.priceInr);
      break;
    case "rating":
      results = [...results].sort((a, b) => b.rating - a.rating);
      break;
    default:
      results = [...results].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }

  return results;
}

export function fallbackGetProductById(id: string): Product | null {
  return ALL_PRODUCTS.find((p) => p.id === id) ?? null;
}

export function fallbackGetFeaturedProducts(limit = 8): Product[] {
  return ALL_PRODUCTS.filter((p) => p.isFeatured).slice(0, limit);
}

export function fallbackGetRelatedProducts(product: Product, limit = 4): Product[] {
  return ALL_PRODUCTS.filter((p) => p.id !== product.id && p.categoryId === product.categoryId).slice(0, limit);
}

export function fallbackGetBundles(): SeedBundle[] {
  return BUNDLES;
}

export function fallbackGetBundleById(id: string): SeedBundle | null {
  return BUNDLES.find((b) => b.id === id) ?? null;
}

export function fallbackGetProductsByIds(ids: string[]): Product[] {
  const byId = new Map(ALL_PRODUCTS.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter((p): p is Product => Boolean(p));
}
