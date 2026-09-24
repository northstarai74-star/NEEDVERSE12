import { cn } from "@/lib/utils";

const PALETTES: Record<string, string> = {
  interior: "from-orange-950 to-black text-orange-400",
  exterior: "from-sky-950 to-black text-sky-400",
  electronics: "from-violet-950 to-black text-violet-400",
  comfort: "from-emerald-950 to-black text-emerald-400",
  care: "from-amber-950 to-black text-amber-400",
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

  const palette = PALETTES[categoryId ?? ""] ?? "from-zinc-900 to-black text-zinc-500";

  return (
    <div
      className={cn(
        "font-display flex h-full w-full items-center justify-center bg-gradient-to-br text-3xl",
        palette,
        className
      )}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}
