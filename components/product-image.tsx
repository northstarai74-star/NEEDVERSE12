import { cn } from "@/lib/utils";

const PALETTES: Record<string, string> = {
  interior: "from-orange-500/25 to-orange-900/10",
  exterior: "from-sky-500/25 to-sky-900/10",
  electronics: "from-violet-500/25 to-violet-900/10",
  comfort: "from-emerald-500/25 to-emerald-900/10",
  care: "from-amber-500/25 to-amber-900/10",
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter((w) => w.length > 0)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/**
 * Standing in for real product photography (see the "Product photography
 * system" section of the store's UX research) until real shots are shot.
 * Swap this for a real <img>/<Image> once assets exist — every call site
 * only needs `src` populated to switch over.
 */
export function ProductImage({
  name,
  categoryId,
  src,
  className,
}: {
  name: string;
  categoryId?: string;
  src?: string | null;
  className?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className={cn("h-full w-full object-cover", className)} />;
  }

  const palette = PALETTES[categoryId ?? ""] ?? "from-zinc-500/25 to-zinc-900/10";

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br text-2xl font-semibold text-white/70",
        palette,
        className
      )}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}
