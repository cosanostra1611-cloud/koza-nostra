-- Koza Nostra: shema baze (Supabase / PostgreSQL)
-- Zaženi v Supabase: SQL Editor -> New query -> prilepi -> Run
-- Skripto lahko zaženeš večkrat; obstoječih podatkov ne briše.

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
  category text not null,
  price_cents integer not null check (price_cents > 0),
  unit_label text,
  image_url text,
  stock integer check (stock is null or stock >= 0), -- null = neomejeno
  active boolean not null default true,
  created_at timestamptz not null default now()
);
-- Dodatna polja (dodana kasneje, zato z "if not exists")
alter table products add column if not exists why_chosen text;          -- razlog izbora, v mojem glasu
alter table products add column if not exists koza_approved boolean not null default true; -- žig "Odobreno od koze"
alter table products add column if not exists series_label text;        -- npr. 'Jesenska serija'
alter table products add column if not exists weight_grams integer check (weight_grams is null or weight_grams > 0);
alter table products drop constraint if exists products_category_check;
alter table products add constraint products_category_check
  check (category in ('olje','vino','meso','med','sir','sol','kozmetika','obrt','nakit','drugo'));
create index if not exists products_category_idx on products (category) where active;
create index if not exists products_producer_idx on products (producer_id);

-- Paketi (fiksna cena; ob nakupu se zmanjša zaloga posameznih izdelkov)
create table if not exists bundles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  occasion text not null check (occasion in ('turist','dom','darilo','poslovno')),
  price_cents integer not null check (price_cents > 0),
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists bundles_occasion_idx on bundles (occasion) where active;

create table if not exists bundle_items (
  bundle_id uuid not null references bundles(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  quantity integer not null default 1 check (quantity > 0),
  primary key (bundle_id, product_id)
);

-- Prijave ponudnikov (/postani-del-druzine)
create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  business_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  city text,
  category text,
  description text,
  website_url text,
  photo_urls text[] not null default '{}',
  price_info text,
  legal_form text check (legal_form in ('sp','doo','kmetija','drugo')),
  vat_registered boolean,
  food_registration text,
  weekly_capacity text,
  accepts_terms boolean not null default false,
  status text not null default 'new' check (status in ('new','review','accepted','rejected')),
  internal_note text
);
create index if not exists applications_status_idx on applications (status, created_at desc);

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
-- Postavka je lahko tudi paket (takrat je product_id prazen)
alter table order_items add column if not exists bundle_id uuid references bundles(id) on delete set null;
create index if not exists order_items_order_idx on order_items (order_id);

-- Zmanjšanje zaloge (kliče ga webhook po plačilu)
create or replace function decrement_stock(p_id uuid, q integer)
returns void language sql security definer as $$
  update products
     set stock = greatest(stock - q, 0)
   where id = p_id and stock is not null;
$$;
revoke all on function decrement_stock(uuid, integer) from public, anon, authenticated;

-- Varnost (RLS): javnost sme samo brati aktivne ponudnike, izdelke in pakete.
-- Naročila, prijave in vse pisanje gredo prek strežnika s service role ključem
-- (tabele brez pravil so za javnost zaprte).
alter table producers enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table bundles enable row level security;
alter table bundle_items enable row level security;
alter table applications enable row level security;

-- Provizija ponudnika ni javen podatek: javnost vidi samo naštete stolpce.
revoke select on producers from anon, authenticated;
grant select (id, slug, name, region, story, photo_url, active, created_at)
  on producers to anon, authenticated;

drop policy if exists "javno branje ponudnikov" on producers;
create policy "javno branje ponudnikov" on producers
  for select using (active);

drop policy if exists "javno branje izdelkov" on products;
create policy "javno branje izdelkov" on products
  for select using (
    active and exists (select 1 from producers p where p.id = producer_id and p.active)
  );

drop policy if exists "javno branje paketov" on bundles;
create policy "javno branje paketov" on bundles
  for select using (active);

drop policy if exists "javno branje vsebine paketov" on bundle_items;
create policy "javno branje vsebine paketov" on bundle_items
  for select using (
    exists (select 1 from bundles b where b.id = bundle_id and b.active)
  );
