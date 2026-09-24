const STATS = [
  { value: "24", label: "Vehicle models supported" },
  { value: "150+", label: "Products in the catalog" },
  { value: "4.4/5", label: "Average product rating" },
  { value: "2–5 days", label: "Typical delivery time" },
];

export function StatsSection() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border bg-surface p-8 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold tracking-tight sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
