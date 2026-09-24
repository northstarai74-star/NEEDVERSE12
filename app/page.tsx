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
import { CtaButton } from "@/components/cta-button";
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
      <section className="bg-dot-grid relative overflow-hidden border-b border-border">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="label-mono text-xs text-accent">[ vehicle-fitment accessories ]</p>
          <h1 className="font-display mt-4 text-6xl sm:text-8xl">
            Upgrade
            <br />
            your drive.
          </h1>
          <p className="label-mono mt-6 max-w-md text-xs text-muted">
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
          <CtaButton href="/shop" variant="dark">
            View all
          </CtaButton>
        }
      >
        <ProductGrid products={featured} />
      </Section>

      <Section eyebrow="Process" title="How it works">
        <HowItWorks />
      </Section>

      <Section eyebrow="Why NeedVerse" title="Built around your car">
        <WhyChooseUs />
      </Section>

      <Section eyebrow="Browse" title="Shop by category">
        <CategoryGrid categories={categories} />
      </Section>

      {heroBundle && heroBundleProducts.length > 0 && (
        <Section eyebrow="Build your car" title={heroBundle.name}>
          <div className="border border-border p-6 sm:p-8">
            <p className="label-mono text-xs text-muted">{heroBundle.tagline}</p>
            <ul className="mt-4 grid gap-px sm:grid-cols-2">
              {heroBundleProducts.map((p) => (
                <li key={p.id} className="label-mono flex items-center justify-between border-b border-border py-3 text-xs">
                  <span className="text-foreground">{p.name}</span>
                  <span className="text-muted">{formatInr(p.priceInr)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="font-display text-3xl">Total: {formatInr(heroBundleTotal)}</p>
              <CtaButton href={`/bundles/${heroBundle.id}`} variant="accent">
                View bundle
              </CtaButton>
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
        <div className="grid grid-cols-1 divide-y divide-border border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Link href="/cars" className="group p-6 transition hover:bg-surface">
            <p className="text-lg font-bold uppercase tracking-tight group-hover:text-accent">Shop by car</p>
            <p className="label-mono mt-2 text-xs text-muted">Browse accessories organized by make and model.</p>
          </Link>
          <Link href="/guides" className="group p-6 transition hover:bg-surface">
            <p className="text-lg font-bold uppercase tracking-tight group-hover:text-accent">Buying guides</p>
            <p className="label-mono mt-2 text-xs text-muted">Quick reads on what to buy first for your car.</p>
          </Link>
          <Link href="/bundles" className="group p-6 transition hover:bg-surface">
            <p className="text-lg font-bold uppercase tracking-tight group-hover:text-accent">Curated bundles</p>
            <p className="label-mono mt-2 text-xs text-muted">Pre-built upgrade packages at a bundle price.</p>
          </Link>
        </div>
      </Section>
    </div>
  );
}
