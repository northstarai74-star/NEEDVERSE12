const STEPS = [
  { number: "01", title: "Select your car", description: "Tell us your make, model, year and fuel type." },
  { number: "02", title: "Browse what fits", description: "See only accessories verified compatible with your car." },
  { number: "03", title: "Add to cart", description: "Pick individual products or grab a curated bundle." },
  { number: "04", title: "Get it delivered", description: "Cash on delivery, 2–5 day shipping, 7-day returns." },
];

export function HowItWorks() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((step) => (
        <div key={step.number} className="rounded-2xl border border-border bg-surface p-6">
          <span className="text-sm font-bold text-accent">{step.number}</span>
          <p className="mt-3 font-semibold">{step.title}</p>
          <p className="mt-1 text-sm text-muted">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
