"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { FuelType, VehicleMake, VehicleModel } from "@/lib/types";
import { useSelectedVehicle } from "@/lib/vehicle/vehicle-context";
import { cn } from "@/lib/utils";

function yearOptions(model: VehicleModel): number[] {
  const end = model.yearEnd ?? new Date().getFullYear() + 1;
  const years: number[] = [];
  for (let y = end; y >= model.yearStart; y--) years.push(y);
  return years;
}

export function VehicleSelector({
  makes,
  models,
  variant = "hero",
}: {
  makes: VehicleMake[];
  models: VehicleModel[];
  variant?: "hero" | "compact";
}) {
  const router = useRouter();
  const { setVehicle } = useSelectedVehicle();

  const [makeId, setMakeId] = useState("");
  const [modelId, setModelId] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [fuel, setFuel] = useState<FuelType | "">("");

  const modelsForMake = useMemo(() => models.filter((m) => m.makeId === makeId), [models, makeId]);
  const selectedModel = useMemo(() => models.find((m) => m.id === modelId) ?? null, [models, modelId]);
  const years = useMemo(() => (selectedModel ? yearOptions(selectedModel) : []), [selectedModel]);
  const fuels = selectedModel?.fuelTypes ?? [];

  const canSubmit = makeId && modelId && year && fuel;

  function handleMakeChange(value: string) {
    setMakeId(value);
    setModelId("");
    setYear("");
    setFuel("");
  }

  function handleModelChange(value: string) {
    setModelId(value);
    setYear("");
    setFuel("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !selectedModel) return;

    const make = makes.find((m) => m.id === makeId);
    setVehicle({
      makeId,
      makeName: make?.name ?? "",
      modelId,
      modelName: selectedModel.name,
      year: Number(year),
      fuel: fuel as FuelType,
    });

    router.push(`/shop?vehicle=${modelId}`);
  }

  const selectClass =
    "label-mono w-full border border-border bg-background px-4 py-3 text-xs text-foreground disabled:opacity-40 focus:border-accent focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "border border-border bg-surface p-5 text-left shadow-xl shadow-black/30",
        variant === "hero" ? "w-full max-w-xl" : "w-full"
      )}
    >
      <p className="label-mono mb-4 text-xs text-accent">[ find accessories for your car ]</p>
      <div className={cn("grid gap-3", variant === "hero" ? "sm:grid-cols-2" : "sm:grid-cols-4")}>
        <select value={makeId} onChange={(e) => handleMakeChange(e.target.value)} className={selectClass}>
          <option value="">Select brand</option>
          {makes.map((make) => (
            <option key={make.id} value={make.id}>
              {make.name}
            </option>
          ))}
        </select>

        <select
          value={modelId}
          onChange={(e) => handleModelChange(e.target.value)}
          disabled={!makeId}
          className={selectClass}
        >
          <option value="">Select model</option>
          {modelsForMake.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          disabled={!modelId}
          className={selectClass}
        >
          <option value="">Select year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={fuel}
          onChange={(e) => setFuel(e.target.value as FuelType)}
          disabled={!modelId}
          className={selectClass}
        >
          <option value="">Select fuel</option>
          {fuels.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="label-mono mt-4 w-full bg-accent py-3.5 text-xs font-bold text-accent-foreground transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-border disabled:text-muted"
      >
        Find my accessories »
      </button>
    </form>
  );
}
