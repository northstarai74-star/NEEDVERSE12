export const metadata = { title: "Contact — NeedVerse" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">Contact us</h1>
      <p className="mt-4 text-muted">
        Have a question about an order or whether a product fits your car? Reach out and we&apos;ll get back to you.
      </p>
      <div className="label-mono mt-6 space-y-2 text-xs">
        <p>
          <span className="text-muted">Email:</span> support@needverse.example
        </p>
        <p>
          <span className="text-muted">Hours:</span> Mon–Sat, 10am–7pm IST
        </p>
      </div>
      <p className="label-mono mt-6 text-xs text-muted">
        Wire a real WhatsApp Business API or helpdesk integration here when you&apos;re ready to go live.
      </p>
    </div>
  );
}
