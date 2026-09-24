# NeedVerse

A vehicle-fitment car accessories store: pick your car, see only the accessories that fit it. Built with
Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Supabase (Postgres + service role for orders).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site works immediately with **no setup** — without
Supabase env vars it runs on the built-in demo catalog (`lib/data/seed-data.ts`) and an in-memory order store, so
you can click through the whole store (browse → vehicle filter → cart → checkout → order tracking) right away.

## Connecting a real Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run `supabase/schema.sql`, then `supabase/seed.sql` (seeds the same demo catalog so the
   site looks identical once you switch over).
3. Copy `.env.example` to `.env.local` and fill in the three values from **Project Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only — used for order creation/lookup, never sent to the browser)
4. Restart `npm run dev`. Product/vehicle reads now come from Postgres; orders are written there too.

If Supabase env vars are missing or a query fails for any reason, every data-access function in `lib/catalog.ts`
falls back to the in-memory demo data automatically — the site never hard-crashes for a misconfigured database.

## Architecture

```
app/
  page.tsx                 Homepage — hero + vehicle selector, categories, trending, bundle teaser
  shop/page.tsx             Product listing with filters (category, vehicle, price, sort)
  cars/page.tsx             Browse by make → model, links into /shop?vehicle=<modelId>
  product/[slug]/page.tsx   Product detail — gallery, price, compatibility, related products
  bundles/                  Curated multi-product packages
  cart/page.tsx             Client-side cart (persisted to localStorage)
  checkout/page.tsx         Address + COD checkout, posts to /api/orders
  order/[orderNumber]/      Post-checkout confirmation
  track-order/page.tsx      Order lookup by order number + email
  guides/, about/, contact/, returns/   Static support content
  api/orders/               Order create (POST) + lookup (GET, email-gated)

components/                 UI: header, footer, vehicle-selector, product-card, filters, cart/vehicle badges
lib/
  types.ts                  Shared domain types
  catalog.ts                Supabase-first data layer with automatic fallback (server-only)
  orders.ts                 Order create/lookup — Supabase if configured, else in-memory (server-only)
  data/seed-data.ts         Single source of truth for demo makes/models/categories/products/bundles
  data/fallback.ts          In-memory query functions mirroring the Supabase query shape
  cart/cart-context.tsx     Client cart state (React context + localStorage)
  vehicle/vehicle-context.tsx  Client "selected vehicle" state, drives the "✓ Fits your car" badges
  supabase/public.ts        Anon-key client for public catalog reads
  supabase/admin.ts         Service-role client for orders (server-only, never imported client-side)

supabase/schema.sql          Tables + RLS policies (public read on catalog, no public access to orders)
supabase/seed.sql            Demo data matching lib/data/seed-data.ts exactly
```

### Vehicle fitment model

Compatibility is a real relation, not a text field: `product_fitments` joins `products` to `vehicle_models`.
A product is either `fit_type = 'universal'` (shown for every vehicle) or `vehicle_specific` (shown only when its
`product_fitments` row lists the selected model). The same join logic is duplicated in `lib/data/fallback.ts`, so
switching between demo data and a live database never changes what a shopper sees.

### Cart & orders

- **Cart** is client-only (localStorage), no account required — matches the "don't make customers create an
  account before purchasing" checkout principle from the store's UX research.
- **Checkout** is Cash on Delivery only. Order totals are recomputed server-side from the authoritative product
  prices in `lib/orders.ts` — the client-sent cart is never trusted for pricing.
- **Payments**: no gateway is wired up (needs your own Razorpay/Stripe merchant account + keys). `paymentMethod`
  on the `Order` type is intentionally narrowed to `"cod"` — widen it and add a provider call in `lib/orders.ts`
  when you're ready to accept cards/UPI.

## What's deliberately not built yet

Following the phased build plan (ship a thin MVP, prove people buy, then layer on):

- **Customer accounts / auth** — not needed for checkout today; add Supabase Auth when you want order history,
  wishlists, or saved addresses.
- **Real product photography** — `components/product-image.tsx` renders a category-colored placeholder until a
  product has real image URLs in `images`. Swap in real photos (clean shot, installed shot, detail, compatibility
  card — see the photography plan) by populating that column; no component changes needed.
- **Reviews, Q&A, AI shopping assistant, "Build My Car" configurator** — Version 2/3 features once the MVP catalog
  and vehicle-selector flow are validated with real traffic.

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build (also runs the TypeScript check)
npm run start   # run the production build
npm run lint    # ESLint
```
