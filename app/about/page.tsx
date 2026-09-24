export const metadata = { title: "About — NeedVerse" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">The easiest way to upgrade your specific car</h1>
      <p className="mt-4 text-muted">
        Most car accessory stores make you dig through thousands of products hoping something fits. NeedVerse flips
        that: tell us your make, model, year and fuel type, and we show you only what&apos;s actually compatible —
        plus every universal accessory that works with any car.
      </p>
      <p className="mt-4 text-muted">
        We&apos;re starting focused: a curated catalog across interior, exterior, electronics, comfort and care,
        with vehicle fitment built into the product data from day one rather than bolted on later.
      </p>
    </div>
  );
}
