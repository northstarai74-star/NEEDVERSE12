const FAQS = [
  {
    q: "How do I know an accessory will fit my car?",
    a: "Select your car in the vehicle selector, then every product page and card shows a \"✓ Fits your car\" badge. Vehicle-specific products list their exact compatible models under \"Vehicle compatibility.\" Universal products fit any car.",
  },
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes — Cash on Delivery is available on every order today. Card and UPI checkout are on the roadmap.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are dispatched within 24–48 hours and typically arrive in 2–5 business days, depending on your pincode.",
  },
  {
    q: "What's your return policy?",
    a: "7-day return window from delivery for unused, unopened items in original packaging — including vehicle-specific parts that were correctly matched to your car.",
  },
  {
    q: "Can I buy a bundle instead of individual products?",
    a: "Yes. Bundles group accessories around how you actually use your car (daily commuting, long trips, interior refresh) at a combined price — see the Bundles page.",
  },
  {
    q: "My car isn't listed yet — can I still order?",
    a: "You can still browse and order every universal accessory. We're adding vehicle-specific fitment data for more models regularly — contact us if you'd like your model prioritized.",
  },
];

export function Faq() {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface">
      {FAQS.map((item) => (
        <details key={item.q} className="group p-5 open:pb-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {item.q}
            <span className="shrink-0 text-muted transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
