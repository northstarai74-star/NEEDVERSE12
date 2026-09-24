const STEPS = [
  { number: "01", title: "Select your car", description: "Tell us your make, model, year and fuel type." },
  { number: "02", title: "Browse what fits", description: "See only accessories verified compatible with your car." },
  { number: "03", title: "Add to cart", description: "Pick individual products or grab a curated bundle." },
  { number: "04", title: "Get it delivered", description: "Cash on delivery, 2–5 day shipping, 7-day returns." },
];

export function HowItWorks() {
  return (
    <div className="bg-grain grid grid-cols-1 divide-y divide-border border border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
      {STEPS.map((step) => (
        <div key={step.number} className="relative p-6">
          <span className="font-display text-3xl text-accent">{step.number}.</span>
          <p className="mt-4 text-lg font-bold uppercase tracking-tight">{step.title}</p>
          <p className="label-mono mt-2 text-xs text-muted">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
