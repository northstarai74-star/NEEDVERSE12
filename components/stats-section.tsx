const STATS = [
  { value: "24", label: "Vehicle models" },
  { value: "150+", label: "Products in the catalog" },
  { value: "4.4/5", label: "Average product rating" },
  { value: "2–5 DAYS", label: "Typical delivery time" },
];

export function StatsSection() {
  return (
    <div className="bg-dot-grid border-y border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-5xl sm:text-6xl">{stat.value}</p>
            <p className="label-mono mt-2 text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
