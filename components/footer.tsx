import Link from "next/link";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All accessories" },
      { href: "/cars", label: "Shop by car" },
      { href: "/bundles", label: "Bundles" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/track-order", label: "Track order" },
      { href: "/guides", label: "Buying guides" },
      { href: "/contact", label: "Contact us" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About NeedVerse" },
      { href: "/returns", label: "Shipping & returns" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "X", href: "https://x.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold tracking-tight">
            NEED<span className="text-accent">VERSE</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            The easiest way to upgrade your specific car. Tell us what you drive, we&apos;ll show you what fits.
          </p>
          <div className="mt-4 space-y-1 text-sm text-muted">
            <p>support@needverse.example</p>
            <p>Mon–Sat, 10am–7pm IST</p>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} NeedVerse. Vehicle compatibility checked. Secure payments. Clear returns.
      </div>
    </footer>
  );
}
