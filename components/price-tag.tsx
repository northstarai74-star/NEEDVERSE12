import { formatInr } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PriceTag({
  priceInr,
  compareAtPriceInr,
  size = "md",
  className,
}: {
  priceInr: number;
  compareAtPriceInr?: number | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "text-sm",
    md: "text-base font-semibold",
    lg: "text-2xl font-bold",
  };

  return (
    <div className={cn("flex items-baseline gap-2 font-mono", className)}>
      <span className={sizes[size]}>{formatInr(priceInr)}</span>
      {compareAtPriceInr && compareAtPriceInr > priceInr && (
        <span className="text-sm text-muted line-through">{formatInr(compareAtPriceInr)}</span>
      )}
    </div>
  );
}
