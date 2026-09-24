import { cn } from "@/lib/utils";

const PALETTES: Record<string, string> = {
  interior: "from-orange-100 to-orange-50 text-orange-700",
  exterior: "from-sky-100 to-sky-50 text-sky-700",
  electronics: "from-violet-100 to-violet-50 text-violet-700",
  comfort: "from-emerald-100 to-emerald-50 text-emerald-700",
  care: "from-amber-100 to-amber-50 text-amber-700",
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

  const palette = PALETTES[categoryId ?? ""] ?? "from-zinc-100 to-zinc-50 text-zinc-500";

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br text-2xl font-semibold",
        palette,
        className
      )}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}
