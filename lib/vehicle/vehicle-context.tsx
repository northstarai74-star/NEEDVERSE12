"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { SelectedVehicle } from "@/lib/types";

const STORAGE_KEY = "needverse.vehicle.v1";

interface VehicleContextValue {
  vehicle: SelectedVehicle | null;
  hydrated: boolean;
  setVehicle: (vehicle: SelectedVehicle) => void;
  clearVehicle: () => void;
  isCompatible: (opts: { fitType: "universal" | "vehicle_specific"; compatibleVehicleIds: string[] }) => boolean | null;
}

const VehicleContext = createContext<VehicleContextValue | null>(null);

export function VehicleProvider({ children }: { children: ReactNode }) {
  const [vehicle, setVehicleState] = useState<SelectedVehicle | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage after mount — keeps SSR output
    // (no vehicle selected) matching the client's first paint.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setVehicleState(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const value = useMemo<VehicleContextValue>(() => {
    const setVehicle = (v: SelectedVehicle) => {
      setVehicleState(v);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
      } catch {
        // ignore
      }
    };

    const clearVehicle = () => {
      setVehicleState(null);
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    };

    const isCompatible: VehicleContextValue["isCompatible"] = (opts) => {
      if (!hydrated) return null;
      if (!vehicle) return null;
      if (opts.fitType === "universal") return true;
      return opts.compatibleVehicleIds.includes(vehicle.modelId);
    };

    return { vehicle, hydrated, setVehicle, clearVehicle, isCompatible };
  }, [vehicle, hydrated]);

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;
}

export function useSelectedVehicle(): VehicleContextValue {
  const ctx = useContext(VehicleContext);
  if (!ctx) throw new Error("useSelectedVehicle must be used within VehicleProvider");
  return ctx;
}
