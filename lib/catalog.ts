import "server-only";
import type { Category, Product, ProductFilters, VehicleMake, VehicleModel } from "@/lib/types";
import { createPublicClient } from "@/lib/supabase/public";
import {
  fallbackGetBundleById,
  fallbackGetBundles,
  fallbackGetCategories,
  fallbackGetCategoryById,
  fallbackGetFeaturedProducts,
  fallbackGetMakes,
  fallbackGetModelById,
  fallbackGetModels,
  fallbackGetProductById,
  fallbackGetProducts,
  fallbackGetProductsByIds,
  fallbackGetRelatedProducts,
} from "@/lib/data/fallback";

type ProductRow = {
  id: string;
  name: string;
  category_id: string;
  categories: { name: string } | { name: string }[] | null;
  brand: string | null;
  sku: string | null;
  description: string | null;
  whats_included: string[] | null;
  price_inr: number;
  compare_at_price_inr: number | null;
  fit_type: "universal" | "vehicle_specific";
  images: string[] | null;
  specs: Record<string, string> | null;
  rating: number;
  review_count: number;
  stock: number;
  is_featured: boolean;
  product_fitments?: { vehicle_model_id: string }[];
};

function rowToProduct(row: ProductRow): Product {
  const categoryRel = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  return {
    id: row.id,
    name: row.name,
    categoryId: row.category_id,
    categoryName: categoryRel?.name ?? row.category_id,
    brand: row.brand,
    sku: row.sku,
    description: row.description,
    whatsIncluded: row.whats_included ?? [],
    priceInr: Number(row.price_inr),
    compareAtPriceInr: row.compare_at_price_inr !== null ? Number(row.compare_at_price_inr) : null,
    fitType: row.fit_type,
    images: row.images ?? [],
    specs: row.specs ?? {},
    rating: Number(row.rating),
    reviewCount: row.review_count,
    stock: row.stock,
    isFeatured: row.is_featured,
    compatibleVehicleIds: (row.product_fitments ?? []).map((f) => f.vehicle_model_id),
  };
}

const PRODUCT_SELECT = "*, categories(name), product_fitments(vehicle_model_id)";

export async function getVehicleMakes(): Promise<VehicleMake[]> {
  const client = createPublicClient();
  if (!client) return fallbackGetMakes();

  const { data, error } = await client.from("vehicle_makes").select("*").order("name");
  if (error || !data) return fallbackGetMakes();
  return data.map((m) => ({ id: m.id, name: m.name }));
}

export async function getVehicleModels(makeId?: string): Promise<VehicleModel[]> {
  const client = createPublicClient();
  if (!client) return fallbackGetModels(makeId);

  let query = client.from("vehicle_models").select("*, vehicle_makes(name)").order("name");
  if (makeId) query = query.eq("make_id", makeId);

  const { data, error } = await query;
  if (error || !data) return fallbackGetModels(makeId);

  return data.map((m) => {
    const makeRel = Array.isArray(m.vehicle_makes) ? m.vehicle_makes[0] : m.vehicle_makes;
    return {
      id: m.id,
      makeId: m.make_id,
      makeName: makeRel?.name ?? m.make_id,
      name: m.name,
      generation: m.generation,
      yearStart: m.year_start,
      yearEnd: m.year_end,
      fuelTypes: m.fuel_types ?? [],
    };
  });
}

export async function getVehicleModelById(modelId: string): Promise<VehicleModel | null> {
  const client = createPublicClient();
  if (!client) return fallbackGetModelById(modelId);

  const { data, error } = await client
    .from("vehicle_models")
    .select("*, vehicle_makes(name)")
    .eq("id", modelId)
    .maybeSingle();
  if (error || !data) return fallbackGetModelById(modelId);

  const makeRel = Array.isArray(data.vehicle_makes) ? data.vehicle_makes[0] : data.vehicle_makes;
  return {
    id: data.id,
    makeId: data.make_id,
    makeName: makeRel?.name ?? data.make_id,
    name: data.name,
    generation: data.generation,
    yearStart: data.year_start,
    yearEnd: data.year_end,
    fuelTypes: data.fuel_types ?? [],
  };
}

export async function getCategories(): Promise<Category[]> {
  const client = createPublicClient();
  if (!client) return fallbackGetCategories();

  const { data, error } = await client.from("categories").select("*").order("sort_order");
  if (error || !data) return fallbackGetCategories();
  return data.map((c) => ({ id: c.id, name: c.name, description: c.description, sortOrder: c.sort_order }));
}

export async function getCategoryById(categoryId: string): Promise<Category | null> {
  const client = createPublicClient();
  if (!client) return fallbackGetCategoryById(categoryId);

  const { data, error } = await client.from("categories").select("*").eq("id", categoryId).maybeSingle();
  if (error || !data) return fallbackGetCategoryById(categoryId);
  return { id: data.id, name: data.name, description: data.description, sortOrder: data.sort_order };
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const client = createPublicClient();
  if (!client) return fallbackGetProducts(filters);

  try {
    let compatibleIds: string[] | null = null;
    if (filters.vehicle) {
      const { data: fitmentRows, error: fitmentError } = await client
        .from("product_fitments")
        .select("product_id")
        .eq("vehicle_model_id", filters.vehicle);
      if (fitmentError) throw fitmentError;
      compatibleIds = (fitmentRows ?? []).map((r) => r.product_id);
    }

    let query = client.from("products").select(PRODUCT_SELECT);

    if (filters.category) query = query.eq("category_id", filters.category);
    if (typeof filters.minPrice === "number") query = query.gte("price_inr", filters.minPrice);
    if (typeof filters.maxPrice === "number") query = query.lte("price_inr", filters.maxPrice);
    if (filters.q) query = query.ilike("name", `%${filters.q}%`);

    if (compatibleIds !== null) {
      const idList = compatibleIds.length > 0 ? `,id.in.(${compatibleIds.join(",")})` : "";
      query = query.or(`fit_type.eq.universal${idList}`);
    }

    switch (filters.sort) {
      case "price_asc":
        query = query.order("price_inr", { ascending: true });
        break;
      case "price_desc":
        query = query.order("price_inr", { ascending: false });
        break;
      case "rating":
        query = query.order("rating", { ascending: false });
        break;
      default:
        query = query.order("is_featured", { ascending: false });
    }

    const { data, error } = await query;
    if (error || !data) throw error ?? new Error("No data");
    return data.map(rowToProduct);
  } catch {
    return fallbackGetProducts(filters);
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const client = createPublicClient();
  if (!client) return fallbackGetProductById(id);

  const { data, error } = await client.from("products").select(PRODUCT_SELECT).eq("id", id).maybeSingle();
  if (error || !data) return fallbackGetProductById(id);
  return rowToProduct(data as ProductRow);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const client = createPublicClient();
  if (!client) return fallbackGetProductsByIds(ids);

  const { data, error } = await client.from("products").select(PRODUCT_SELECT).in("id", ids);
  if (error || !data) return fallbackGetProductsByIds(ids);
  const products = data.map(rowToProduct);
  const byId = new Map(products.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter((p): p is Product => Boolean(p));
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const client = createPublicClient();
  if (!client) return fallbackGetFeaturedProducts(limit);

  const { data, error } = await client
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_featured", true)
    .limit(limit);
  if (error || !data) return fallbackGetFeaturedProducts(limit);
  return data.map(rowToProduct);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const client = createPublicClient();
  if (!client) return fallbackGetRelatedProducts(product, limit);

  const { data, error } = await client
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("category_id", product.categoryId)
    .neq("id", product.id)
    .limit(limit);
  if (error || !data) return fallbackGetRelatedProducts(product, limit);
  return data.map(rowToProduct);
}

export async function getBundles() {
  return fallbackGetBundles();
}

export async function getBundleById(id: string) {
  return fallbackGetBundleById(id);
}
