const BADGES = [
  { icon: "✓", label: "Vehicle compatibility checked" },
  { icon: "🔒", label: "Secure payments" },
  { icon: "↩", label: "Easy 7-day returns" },
  { icon: "📦", label: "Order tracking" },
  { icon: "💬", label: "Real customer support" },
];

export function TrustBadges() {
  return (
    <div className="border-y border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-4 px-4 py-6 text-sm text-muted sm:px-6">
        {BADGES.map((badge) => (
          <span key={badge.label} className="flex items-center gap-2">
            <span aria-hidden>{badge.icon}</span>
            {badge.label}
          </span>
        ))}
      </div>
    </div>
  );
}
