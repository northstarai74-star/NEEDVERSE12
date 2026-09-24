/**
 * Placeholder reviews for launch — swap in real customer quotes once orders
 * start coming in (Version 2: reviews tied to actual verified purchases).
 */
const TESTIMONIALS = [
  {
    quote: "Picked my Nexon from the dropdown and every mat on the page actually fit. No returns, no guessing.",
    name: "Aditya R.",
    role: "Tata Nexon owner",
  },
  {
    quote: "Ordered the Daily Driver bundle instead of hunting for four separate products. Saved time and money.",
    name: "Priya M.",
    role: "Maruti Swift owner",
  },
  {
    quote: "The dash cam page told me exactly what's in the box before I bought it. Delivery was two days.",
    name: "Karan S.",
    role: "Hyundai Creta owner",
  },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <div className="bg-grain grid grid-cols-1 divide-y divide-border border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {TESTIMONIALS.map((t) => (
        <figure key={t.name} className="relative p-6">
          <blockquote className="font-display text-2xl leading-[1.05]">&ldquo;{t.quote}&rdquo;</blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
              {initials(t.name)}
            </span>
            <span className="label-mono text-xs">
              <span className="text-foreground">{t.name}</span>
              <span className="text-muted"> — {t.role}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
