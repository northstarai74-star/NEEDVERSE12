import Link from "next/link";
import { getVehicleMakes, getVehicleModels } from "@/lib/catalog";

export const metadata = { title: "Shop By Car — NeedVerse" };

export default async function CarsPage() {
  const [makes, models] = await Promise.all([getVehicleMakes(), getVehicleModels()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="label-mono text-xs text-accent">[ Shop by car ]</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl">Find accessories for your exact model</h1>
      <p className="label-mono mt-3 max-w-xl text-xs text-muted">
        Pick your car below to see only the accessories that fit it — vehicle-specific parts and every universal
        accessory in the catalog.
      </p>

      <div className="mt-10 space-y-10">
        {makes.map((make) => {
          const makeModels = models.filter((m) => m.makeId === make.id);
          if (makeModels.length === 0) return null;

          return (
            <div key={make.id}>
              <h2 className="font-display mb-4 text-2xl">{make.name}</h2>
              <div className="grid grid-cols-1 divide-y divide-border border border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-4">
                {makeModels.map((model) => (
                  <Link
                    key={model.id}
                    href={`/shop?vehicle=${model.id}`}
                    className="p-5 text-center transition hover:bg-surface"
                  >
                    <p className="text-lg font-bold uppercase tracking-tight">{model.name}</p>
                    <p className="label-mono mt-1 text-xs text-muted">
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
