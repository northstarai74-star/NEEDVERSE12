-- NeedVerse database schema
-- Run this once against a fresh Supabase Postgres database (SQL Editor -> New query).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Catalog tables
-- ---------------------------------------------------------------------------

create table if not exists vehicle_makes (
  id text primary key,
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists vehicle_models (
  id text primary key,
  make_id text not null references vehicle_makes(id) on delete cascade,
  name text not null,
  generation text,
  year_start int not null,
  year_end int,
  fuel_types text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists vehicle_models_make_id_idx on vehicle_models(make_id);

create table if not exists categories (
  id text primary key,
  name text not null unique,
  description text,
  sort_order int not null default 0
);

create table if not exists products (
  id text primary key,
  name text not null,
  category_id text references categories(id),
  brand text,
  sku text unique,
  description text,
  whats_included text[] not null default '{}',
  price_inr numeric(10, 2) not null,
  compare_at_price_inr numeric(10, 2),
  fit_type text not null default 'universal' check (fit_type in ('universal', 'vehicle_specific')),
  images text[] not null default '{}',
  specs jsonb not null default '{}',
  rating numeric(2, 1) not null default 0,
  review_count int not null default 0,
  stock int not null default 0,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on products(category_id);
create index if not exists products_is_featured_idx on products(is_featured);

create table if not exists product_fitments (
  product_id text not null references products(id) on delete cascade,
  vehicle_model_id text not null references vehicle_models(id) on delete cascade,
  primary key (product_id, vehicle_model_id)
);

create index if not exists product_fitments_vehicle_model_id_idx on product_fitments(vehicle_model_id);

-- ---------------------------------------------------------------------------
-- Orders (written server-side only, via the service role key)
-- ---------------------------------------------------------------------------

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  shipping_address jsonb not null,
  subtotal_inr numeric(10, 2) not null,
  shipping_inr numeric(10, 2) not null default 0,
  total_inr numeric(10, 2) not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_method text not null default 'cod',
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id text references products(id),
  product_name text not null,
  unit_price_inr numeric(10, 2) not null,
  quantity int not null,
  line_total_inr numeric(10, 2) not null
);

create index if not exists order_items_order_id_idx on order_items(order_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table vehicle_makes enable row level security;
alter table vehicle_models enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_fitments enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Catalog data is public read-only. Writes only ever happen from the
-- Supabase dashboard/SQL editor or via the service role key (which bypasses RLS).
create policy "Public read access" on vehicle_makes for select using (true);
create policy "Public read access" on vehicle_models for select using (true);
create policy "Public read access" on categories for select using (true);
create policy "Public read access" on products for select using (true);
create policy "Public read access" on product_fitments for select using (true);

-- Orders have no public policies at all: every order is created and read
-- through the Next.js server using the service role key (lib/supabase/admin.ts),
-- which bypasses RLS. The anon key can never read or write orders directly.
