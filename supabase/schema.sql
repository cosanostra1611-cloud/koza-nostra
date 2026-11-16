-- Cosa Nostra: shema baze (Supabase / PostgreSQL)
-- Zaženi v Supabase: SQL Editor -> New query -> prilepi -> Run

create extension if not exists "pgcrypto";

-- Ponudniki
create table if not exists producers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  region text,
  story text,
  photo_url text,
  commission_pct numeric(5,2) not null default 20,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Izdelki (cene v centih, z DDV)
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  producer_id uuid not null references producers(id) on delete restrict,
  slug text unique not null,
  name text not null,
  description text,
  category text not null check (category in ('olje','vino','meso','med','kozmetika','obrt','drugo')),
  price_cents integer not null check (price_cents > 0),
  unit_label text,
  image_url text,
  stock integer check (stock is null or stock >= 0), -- null = neomejeno
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists products_category_idx on products (category) where active;
create index if not exists products_producer_idx on products (producer_id);

-- Naročila
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  number bigint generated always as identity,
  status text not null default 'pending'
    check (status in ('pending','paid','packed','shipped','cancelled')),
  stripe_session_id text unique,
  email text,
  customer_name text,
  phone text,
  ship_line1 text,
  ship_line2 text,
  ship_postal_code text,
  ship_city text,
  ship_country text,
  subtotal_cents integer not null,
  shipping_cents integer not null,
  total_cents integer not null,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  shipped_at timestamptz
);
create index if not exists orders_status_idx on orders (status, created_at desc);

-- Postavke naročila (ime in cena sta shranjena ob nakupu, provizija tudi)
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  producer_id uuid references producers(id) on delete set null,
  name text not null,
  unit_price_cents integer not null,
  quantity integer not null check (quantity > 0),
  commission_pct numeric(5,2) not null default 20
);
create index if not exists order_items_order_idx on order_items (order_id);

-- Zmanjšanje zaloge (kliče ga webhook po plačilu)
create or replace function decrement_stock(p_id uuid, q integer)
returns void language sql security definer as $$
  update products
     set stock = greatest(stock - q, 0)
   where id = p_id and stock is not null;
$$;
revoke all on function decrement_stock(uuid, integer) from public, anon, authenticated;

-- Varnost (RLS): javnost sme samo brati aktivne ponudnike in izdelke.
-- Naročila in vse pisanje gredo prek strežnika s service role ključem.
alter table producers enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

drop policy if exists "javno branje ponudnikov" on producers;
create policy "javno branje ponudnikov" on producers
  for select using (active);

drop policy if exists "javno branje izdelkov" on products;
create policy "javno branje izdelkov" on products
  for select using (
    active and exists (select 1 from producers p where p.id = producer_id and p.active)
  );
