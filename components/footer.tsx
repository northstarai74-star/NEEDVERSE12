import Link from "next/link";
import { CtaButton } from "./cta-button";

const NAV_COLUMN = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cars", label: "Shop by car" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
];

const SOCIALS = [
  { label: "IG", href: "https://instagram.com" },
  { label: "FB", href: "https://facebook.com" },
  { label: "X", href: "https://x.com" },
];

export function Footer() {
  return (
    <footer>
      <div className="bg-grain border-y border-border">
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
          <h2 className="font-display text-4xl sm:text-5xl">Ready to upgrade your car?</h2>
          <CtaButton href="/cars" variant="light">
            Find my car
          </CtaButton>
        </div>
      </div>

      <div className="bg-grain">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl">
              NEED<span className="text-accent">VERSE</span>
            </p>
            <p className="label-mono mt-4 max-w-xs text-xs text-muted">
              Find the perfect accessory, matched to your exact car, and shop with confidence.
            </p>
            <div className="label-mono mt-6 flex gap-3 text-xs">
              {SOCIALS.map((social, i) => (
                <span key={social.label} className="flex items-center gap-3">
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground">
                    {social.label}
                  </a>
                  {i < SOCIALS.length - 1 && <span className="text-border">/</span>}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="label-mono text-xs text-muted">Navigation</p>
            <ul className="mt-4 space-y-2">
              {NAV_COLUMN.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-display text-lg hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-mono text-xs text-muted">Contact</p>
            <div className="label-mono mt-4 space-y-2 text-xs text-muted">
              <p>support@needverse.example</p>
              <p>Mon–Sat, 10am–7pm IST</p>
              <p>Track order or returns any time</p>
            </div>
          </div>
        </div>

        <div className="label-mono relative flex flex-col gap-2 border-t border-border px-4 py-5 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} NeedVerse. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/returns" className="hover:text-foreground">
              Shipping &amp; returns
            </Link>
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
