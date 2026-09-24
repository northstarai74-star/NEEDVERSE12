import Link from "next/link";
import {
  getBundles,
  getCategories,
  getFeaturedProducts,
  getProductsByIds,
  getVehicleMakes,
  getVehicleModels,
} from "@/lib/catalog";
import { VehicleSelector } from "@/components/vehicle-selector";
import { CategoryGrid } from "@/components/category-grid";
import { ProductGrid } from "@/components/product-grid";
import { StatsSection } from "@/components/stats-section";
import { HowItWorks } from "@/components/how-it-works";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { Section } from "@/components/section";
import { formatInr } from "@/lib/utils";

export default async function Home() {
  const [makes, models, categories, featured, bundles] = await Promise.all([
    getVehicleMakes(),
    getVehicleModels(),
    getCategories(),
    getFeaturedProducts(8),
    getBundles(),
  ]);

  const heroBundle = bundles[0];
  const heroBundleProducts = heroBundle ? await getProductsByIds(heroBundle.productIds) : [];
  const heroBundleTotal = heroBundleProducts.reduce((sum, p) => sum + p.priceInr, 0);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Upgrade your drive.
            <br />
            Start with your car.
          </h1>
          <p className="mt-5 max-w-lg text-muted">
            Tell us what you drive. We&apos;ll show you only the accessories that actually fit it — no more
            guessing from a giant catalog.
          </p>

          <div className="mt-10 w-full">
            <VehicleSelector makes={makes} models={models} />
          </div>
        </div>
      </section>

      <StatsSection />

      <Section
        eyebrow="Popular"
        title="Trending accessories"
        action={
          <Link href="/shop" className="text-sm font-semibold text-accent hover:underline">
            View all →
          </Link>
        }
      >
        <ProductGrid products={featured} />
      </Section>

      <Section eyebrow="Process" title="How it works" className="bg-surface/40">
        <HowItWorks />
      </Section>

      <Section eyebrow="Why NeedVerse" title="Built around your exact car">
        <WhyChooseUs />
      </Section>

      <Section eyebrow="Browse" title="Shop by category">
        <CategoryGrid categories={categories} />
      </Section>

      {heroBundle && heroBundleProducts.length > 0 && (
        <Section eyebrow="Build your car" title={heroBundle.name} className="bg-surface/40">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <p className="text-muted">{heroBundle.tagline}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {heroBundleProducts.map((p) => (
                <li key={p.id} className="flex items-center justify-between rounded-lg bg-background px-4 py-2.5 text-sm">
                  <span>{p.name}</span>
                  <span className="text-muted">{formatInr(p.priceInr)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-lg font-bold">
                Bundle total: {formatInr(heroBundleTotal)}
              </p>
              <Link
                href={`/bundles/${heroBundle.id}`}
                className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90"
              >
                View bundle
              </Link>
            </div>
          </div>
        </Section>
      )}

      <Section eyebrow="Reviews" title="What drivers say">
        <Testimonials />
      </Section>

      <Section eyebrow="FAQ" title="Questions, answered">
        <Faq />
      </Section>

      <Section eyebrow="Guides" title="Not sure where to start?">
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/cars"
            className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50"
          >
            <p className="font-semibold">Shop by car</p>
            <p className="mt-1 text-sm text-muted">Browse accessories organized by make and model.</p>
          </Link>
          <Link
            href="/guides"
            className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50"
          >
            <p className="font-semibold">Buying guides</p>
            <p className="mt-1 text-sm text-muted">Quick reads on what to buy first for your car.</p>
          </Link>
          <Link
            href="/bundles"
            className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50"
          >
            <p className="font-semibold">Curated bundles</p>
            <p className="mt-1 text-sm text-muted">Pre-built upgrade packages at a bundle price.</p>
          </Link>
        </div>
      </Section>
    </div>
  );
}
