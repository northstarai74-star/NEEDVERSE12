import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  dark: {
    label: "border border-border bg-white/5 text-foreground hover:bg-white/10",
    icon: "bg-foreground text-background",
  },
  light: {
    label: "bg-foreground text-background hover:bg-foreground/90",
    icon: "bg-background text-foreground",
  },
  accent: {
    label: "bg-accent text-accent-foreground hover:bg-accent/90",
    icon: "bg-accent-foreground text-accent",
  },
} as const;

type Variant = keyof typeof VARIANTS;

interface SharedProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

/**
 * The two-part pill+chevron button used throughout the reference template
 * (hero CTA, card "view details", footer CTA): a text pill next to a square
 * icon box in the inverse color.
 */
export function CtaButton({
  href,
  variant = "dark",
  className,
  children,
  ...rest
}: SharedProps & ({ href: string } | { href?: undefined }) & ButtonHTMLAttributes<HTMLButtonElement>) {
  const v = VARIANTS[variant];
  const content = (
    <>
      <span className={cn("rounded-full px-5 py-3 text-xs font-semibold label-mono", v.label)}>{children}</span>
      <span className={cn("flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full text-sm", v.icon)}>
        »
      </span>
    </>
  );

  const wrapperClass = cn("inline-flex items-center gap-1", className);

  if (href) {
    return (
      <Link href={href} className={wrapperClass}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={wrapperClass} {...rest}>
      {content}
    </button>
  );
}
