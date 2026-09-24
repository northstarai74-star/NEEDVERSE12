import Link from "next/link";
import { getVehicleMakes, getVehicleModels } from "@/lib/catalog";

export const metadata = { title: "Shop By Car — NeedVerse" };

export default async function CarsPage() {
  const [makes, models] = await Promise.all([getVehicleMakes(), getVehicleModels()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs uppercase tracking-widest text-muted">Shop by car</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Find accessories for your exact model</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Pick your car below to see only the accessories that fit it — vehicle-specific parts and every universal
        accessory in the catalog.
      </p>

      <div className="mt-10 space-y-10">
        {makes.map((make) => {
          const makeModels = models.filter((m) => m.makeId === make.id);
          if (makeModels.length === 0) return null;

          return (
            <div key={make.id}>
              <h2 className="mb-4 text-lg font-semibold">{make.name}</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {makeModels.map((model) => (
                  <Link
                    key={model.id}
                    href={`/shop?vehicle=${model.id}`}
                    className="rounded-xl border border-border bg-surface px-4 py-5 text-center transition hover:border-accent/50"
                  >
                    <p className="font-semibold">{model.name}</p>
                    <p className="mt-1 text-xs text-muted">
                      {model.yearStart}
                      {model.yearEnd ? `–${model.yearEnd}` : "+"}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
