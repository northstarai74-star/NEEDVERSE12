const PILLARS = [
  {
    title: "Verified fitment",
    description: "Every vehicle-specific product is matched to exact makes, models and years — no guesswork.",
  },
  {
    title: "Transparent pricing",
    description: "The price you see on the card is the price you pay. No hidden fees at checkout.",
  },
  {
    title: "Flexible delivery",
    description: "Cash on delivery on every order, with clear tracking from confirmation to your doorstep.",
  },
];

export function WhyChooseUs() {
  return (
    <div className="grid grid-cols-1 divide-y divide-border border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {PILLARS.map((pillar) => (
        <div key={pillar.title} className="p-6">
          <p className="text-lg font-bold uppercase tracking-tight">{pillar.title}</p>
          <p className="label-mono mt-3 text-xs text-muted">{pillar.description}</p>
        </div>
      ))}
    </div>
  );
}
