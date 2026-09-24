import Link from "next/link";
import type { Category } from "@/lib/types";

const ICONS: Record<string, string> = {
  interior: "🪑",
  exterior: "🚙",
  electronics: "🔌",
  comfort: "🛋️",
  care: "🧽",
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/shop?category=${category.id}`}
          className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-8 text-center transition hover:border-accent/50 hover:bg-surface-hover"
        >
          <span className="text-3xl">{ICONS[category.id] ?? "🚗"}</span>
          <span className="text-sm font-semibold">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}
