"use client";

import { useSelectedVehicle } from "@/lib/vehicle/vehicle-context";

export function FitBadge({
  fitType,
  compatibleVehicleIds,
  compact = false,
}: {
  fitType: "universal" | "vehicle_specific";
  compatibleVehicleIds: string[];
  /** Short form ("✓ Fits") for tight spaces like a product card corner,
   * where the full model name can collide with a discount badge. */
  compact?: boolean;
}) {
  const { vehicle, isCompatible } = useSelectedVehicle();
  const compatible = isCompatible({ fitType, compatibleVehicleIds });

  if (compatible === null) return null;

  if (compatible) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
        ✓ {compact ? "Fits" : `Fits your ${vehicle?.modelName}`}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-muted shadow-sm">
      {compact ? "Not a match" : `Not listed for your ${vehicle?.modelName}`}
    </span>
  );
}
