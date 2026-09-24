"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

const PRICE_BRACKETS = [
  { label: "Under ₹500", min: undefined, max: 500 },
  { label: "₹500 – ₹1,500", min: 500, max: 1500 },
  { label: "₹1,500 – ₹3,000", min: 1500, max: 3000 },
  { label: "Above ₹3,000", min: 3000, max: undefined },
];

const SORTS: { label: string; value: string }[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

export function Filters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  const activeCategory = searchParams.get("category") ?? "";
  const activeSort = searchParams.get("sort") ?? "recommended";
  const activeMin = searchParams.get("minPrice");
  const activeMax = searchParams.get("maxPrice");
  const activeVehicle = searchParams.get("vehicle");

  return (
    <aside className="space-y-8">
      {activeVehicle && (
        <div className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">
          <p className="font-semibold">Shopping for your car</p>
          <button
            type="button"
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("vehicle");
              router.push(`${pathname}?${params.toString()}`);
            }}
            className="mt-1 text-xs text-muted underline"
          >
            Show all products instead
          </button>
        </div>
      )}

      <div>
        <p className="mb-3 text-sm font-semibold">Category</p>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => updateParam("category", undefined)}
            className={cn(
              "rounded-lg px-3 py-2 text-left text-sm",
              !activeCategory ? "bg-accent/15 text-accent" : "text-muted hover:bg-surface"
            )}
          >
            All categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => updateParam("category", category.id)}
              className={cn(
                "rounded-lg px-3 py-2 text-left text-sm",
                activeCategory === category.id ? "bg-accent/15 text-accent" : "text-muted hover:bg-surface"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold">Price</p>
        <div className="flex flex-col gap-1">
          {PRICE_BRACKETS.map((bracket) => {
            const active = String(bracket.min ?? "") === (activeMin ?? "") && String(bracket.max ?? "") === (activeMax ?? "");
            return (
              <button
                key={bracket.label}
                type="button"
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  if (active) {
                    params.delete("minPrice");
                    params.delete("maxPrice");
                  } else {
                    if (bracket.min) params.set("minPrice", String(bracket.min));
                    else params.delete("minPrice");
                    if (bracket.max) params.set("maxPrice", String(bracket.max));
                    else params.delete("maxPrice");
                  }
                  router.push(`${pathname}?${params.toString()}`);
                }}
                className={cn(
                  "rounded-lg px-3 py-2 text-left text-sm",
                  active ? "bg-accent/15 text-accent" : "text-muted hover:bg-surface"
                )}
              >
                {bracket.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold">Sort by</p>
        <select
          value={activeSort}
          onChange={(e) => updateParam("sort", e.target.value === "recommended" ? undefined : e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          {SORTS.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
