import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  reviewCount,
  className,
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
}) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <div className={cn("flex items-center gap-1.5 text-sm", className)}>
      <div className="flex text-accent" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= rounded;
          const half = !filled && i + 0.5 === rounded;
          return (
            <span key={i} className="relative">
              <span className="text-border">★</span>
              {(filled || half) && (
                <span className="absolute inset-0 overflow-hidden" style={{ width: half ? "50%" : "100%" }}>
                  ★
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span className="sr-only">{rating.toFixed(1)} out of 5 stars</span>
      {typeof reviewCount === "number" && (
        <span className="text-muted">({reviewCount.toLocaleString("en-IN")})</span>
      )}
    </div>
  );
}
