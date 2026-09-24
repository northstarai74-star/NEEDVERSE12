"use client";

import { useSelectedVehicle } from "@/lib/vehicle/vehicle-context";

export function FitBadge({
  fitType,
  compatibleVehicleIds,
}: {
  fitType: "universal" | "vehicle_specific";
  compatibleVehicleIds: string[];
}) {
  const { vehicle, isCompatible } = useSelectedVehicle();
  const compatible = isCompatible({ fitType, compatibleVehicleIds });

  if (compatible === null) return null;

  if (compatible) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400">
        ✓ Fits your {vehicle?.modelName}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-muted">
      Not listed for your {vehicle?.modelName}
    </span>
  );
}
