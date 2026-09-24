export const metadata = { title: "Shipping & Returns — NeedVerse" };

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">Shipping & returns</h1>

      <div className="mt-8 space-y-6 text-sm">
        <div>
          <p className="font-semibold">Shipping</p>
          <p className="mt-1 text-muted">
            Orders are dispatched within 24–48 hours and typically arrive in 2–5 business days. Free shipping on
            orders over ₹999; ₹79 flat rate below that.
          </p>
        </div>
        <div>
          <p className="font-semibold">Returns</p>
          <p className="mt-1 text-muted">
            7-day return window from delivery for unused, unopened items in original packaging. Vehicle-specific
            parts that were correctly matched to your car are eligible under the same policy.
          </p>
        </div>
        <div>
          <p className="font-semibold">Payment</p>
          <p className="mt-1 text-muted">
            Cash on Delivery is available on every order today. Card and UPI checkout are on the roadmap once a
            payment gateway is connected.
          </p>
        </div>
      </div>
    </div>
  );
}
