import { cn } from "@/lib/utils";

const PALETTES: Record<string, string> = {
  interior: "from-orange-950 via-orange-900/50 to-black",
  exterior: "from-sky-950 via-sky-900/50 to-black",
  electronics: "from-violet-950 via-violet-900/50 to-black",
  comfort: "from-emerald-950 via-emerald-900/50 to-black",
  care: "from-amber-950 via-amber-900/50 to-black",
};

/**
 * Standing in for real product photography (see the "Product photography
 * system" section of the store's UX research) until real shots are shot.
 * The bottom-gradient name/category caption mirrors the Luma testimonial
 * card pattern, so swapping in a real photo via `src` keeps the same
 * caption treatment — no layout changes needed once assets exist.
 */
export function ProductImage({
  name,
  categoryId,
  categoryName,
  src,
  showCaption = true,
  className,
}: {
  name: string;
  categoryId?: string;
  categoryName?: string;
  src?: string | null;
  showCaption?: boolean;
  className?: string;
}) {
  const palette = PALETTES[categoryId ?? ""] ?? "from-zinc-900 via-zinc-800/50 to-black";

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className={cn("h-full w-full bg-gradient-to-br", palette)} aria-hidden />
      )}

      {showCaption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-10">
          <p className="line-clamp-2 text-sm font-bold leading-tight text-white">{name}</p>
          {categoryName && <p className="label-mono mt-1 text-[10px] text-white/60">{categoryName}</p>}
        </div>
      )}
    </div>
  );
}
