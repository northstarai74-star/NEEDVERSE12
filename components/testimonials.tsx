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

export function Testimonials() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <figure key={t.name} className="rounded-2xl border border-border bg-surface p-6">
          <blockquote className="text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
          <figcaption className="mt-4 text-sm">
            <span className="font-semibold">{t.name}</span>
            <span className="text-muted"> — {t.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
