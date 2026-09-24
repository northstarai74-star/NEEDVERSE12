import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="divide-y divide-border border-t border-border">
      {categories.map((category, i) => (
        <Link
          key={category.id}
          href={`/shop?category=${category.id}`}
          className="group flex items-center justify-between gap-4 py-6 transition hover:pl-3"
        >
          <span className="font-display text-4xl transition group-hover:text-accent sm:text-6xl">
            {category.name}
          </span>
          <span className="label-mono shrink-0 text-sm text-muted">[{String(i + 1).padStart(2, "0")}]</span>
        </Link>
      ))}
    </div>
  );
}
