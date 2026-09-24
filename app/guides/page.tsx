import Link from "next/link";

export const metadata = { title: "Buying Guides — NeedVerse" };

const GUIDES = [
  {
    title: "First-time buyer? Start with these 4 accessories",
    summary: "Floor mats, an organizer, a phone mount and a cleaning kit cover almost every new car.",
    href: "/bundles/daily-driver-bundle",
  },
  {
    title: "Planning a long road trip",
    summary: "Comfort and safety picks for highway drives — seat cushions, a dash cam and a tyre inflator.",
    href: "/bundles/long-trip-bundle",
  },
  {
    title: "Giving your interior a refresh",
    summary: "Small upgrades that make a cabin feel new again without touching the exterior.",
    href: "/bundles/interior-refresh-bundle",
  },
  {
    title: "Universal vs. vehicle-specific — what's the difference?",
    summary:
      "Universal accessories fit any car. Vehicle-specific accessories are molded or sized to one exact model — always check the compatibility badge on the product page before buying.",
    href: "/shop",
  },
];

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-xs uppercase tracking-widest text-muted">Guides</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Not sure what to buy first?</h1>

      <div className="mt-8 space-y-4">
        {GUIDES.map((guide) => (
          <Link
            key={guide.title}
            href={guide.href}
            className="block rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50"
          >
            <p className="font-semibold">{guide.title}</p>
            <p className="mt-1 text-sm text-muted">{guide.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
