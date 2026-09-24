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
    <div className="grid gap-8 sm:grid-cols-3">
      {PILLARS.map((pillar) => (
        <div key={pillar.title}>
          <p className="text-lg font-bold">{pillar.title}</p>
          <p className="mt-2 text-sm text-muted">{pillar.description}</p>
        </div>
      ))}
    </div>
  );
}
