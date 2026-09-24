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
      <p className="label-mono text-xs text-accent">[ Guides ]</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl">Not sure what to buy first?</h1>

      <div className="mt-8 divide-y divide-border border border-border">
        {GUIDES.map((guide) => (
          <Link key={guide.title} href={guide.href} className="block p-6 transition hover:bg-surface">
            <p className="text-lg font-bold uppercase tracking-tight">{guide.title}</p>
            <p className="label-mono mt-2 text-xs text-muted">{guide.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
