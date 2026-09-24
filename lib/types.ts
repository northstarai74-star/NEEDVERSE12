export type FuelType = "Petrol" | "Diesel" | "CNG" | "Electric";

export type FitType = "universal" | "vehicle_specific";

export interface VehicleMake {
  id: string;
  name: string;
}

export interface VehicleModel {
  id: string;
  makeId: string;
  makeName: string;
  name: string;
  generation: string | null;
  yearStart: number;
  yearEnd: number | null;
  fuelTypes: FuelType[];
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  brand: string | null;
  sku: string | null;
  description: string | null;
  whatsIncluded: string[];
  priceInr: number;
  compareAtPriceInr: number | null;
  fitType: FitType;
  images: string[];
  specs: Record<string, string>;
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured: boolean;
  compatibleVehicleIds: string[];
}

export interface CartItem {
  productId: string;
  name: string;
  image: string | null;
  priceInr: number;
  quantity: number;
  stock: number;
}

export interface SelectedVehicle {
  makeId: string;
  makeName: string;
  modelId: string;
  modelName: string;
  year: number;
  fuel: FuelType;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  productName: string;
  unitPriceInr: number;
  quantity: number;
  lineTotalInr: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotalInr: number;
  shippingInr: number;
  totalInr: number;
  status: OrderStatus;
  paymentMethod: "cod";
  createdAt: string;
}

export interface ProductFilters {
  category?: string;
  vehicle?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "recommended" | "price_asc" | "price_desc" | "rating";
  q?: string;
}
