-- Packs
create table if not exists public.packs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  image_url text,
  base_price integer not null default 0,
  created_at timestamptz not null default now()
);

-- Items per pack
create table if not exists public.pack_items (
  id uuid primary key default gen_random_uuid(),
  pack_id uuid references public.packs(id) on delete cascade,
  name text not null,
  unit text,
  unit_price integer not null default 0,
  default_qty numeric not null default 1
);

-- Orders + statuses
DO $$ BEGIN
  CREATE TYPE public.order_status AS ENUM ('pending','confirmed','preparing','out_for_delivery','delivered','cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  pack_id uuid references public.packs(id),
  items jsonb not null,
  name text not null,
  phone text not null,
  address text not null,
  notes text,
  subtotal integer not null,
  delivery_fee integer not null default 0,
  total integer not null,
  status public.order_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.order_status_history (
  id bigserial primary key,
  order_id uuid references public.orders(id) on delete cascade,
  status public.order_status not null,
  changed_at timestamptz not null default now()
);

-- RLS
alter table public.orders enable row level security;
alter table public.order_status_history enable row level security;

-- Policies (drop first to avoid conflicts on re-run)
drop policy if exists "allow_insert_orders" on public.orders;
create policy "allow_insert_orders" on public.orders
  for insert to anon with check (true);

drop policy if exists "read_by_order_number" on public.orders;
create policy "read_by_order_number" on public.orders
  for select to anon using (true);

drop policy if exists "read_history" on public.order_status_history;
create policy "read_history" on public.order_status_history
  for select to anon using (true);

-- Seed data
insert into public.packs (slug, name, description, image_url, base_price) values
 ('family', 'باك العائلة', 'مجموعة شهرية متوازنة لعائلة من 4-5 أفراد', '/packs/family.jpg', 0),
 ('student', 'باك الطالب', 'أساسيات اقتصادية للطلبة', '/packs/student.jpg', 0),
 ('couple', 'باك الزوجين', 'احتياجات زوجين مع لمسة عملية', '/packs/couple.jpg', 0),
 ('premium', 'باك بريميوم', 'علامات ممتازة وكميات أكبر', '/packs/premium.jpg', 0)
 on conflict (slug) do nothing;

-- Family Pack Items
with p as (select id from public.packs where slug='family')
insert into public.pack_items (pack_id, name, unit, unit_price, default_qty) values
 ((select id from p), 'سميد', 'kg', 120, 5),
 ((select id from p), 'سكر', 'kg', 110, 4),
 ((select id from p), 'زيت', 'L', 220, 5),
 ((select id from p), 'قهوة', '250g', 350, 2),
 ((select id from p), 'حليب معقم', 'L', 95, 20),
 ((select id from p), 'أرز', 'kg', 150, 3),
 ((select id from p), 'معكرونة', 'kg', 100, 4),
 ((select id from p), 'طماطم مصبرة', '400g', 80, 6)
on conflict do nothing;

-- Student Pack Items
with p as (select id from public.packs where slug='student')
insert into public.pack_items (pack_id, name, unit, unit_price, default_qty) values
 ((select id from p), 'سميد', 'kg', 120, 2),
 ((select id from p), 'سكر', 'kg', 110, 2),
 ((select id from p), 'زيت', 'L', 220, 2),
 ((select id from p), 'قهوة', '250g', 350, 1),
 ((select id from p), 'حليب معقم', 'L', 95, 10),
 ((select id from p), 'أرز', 'kg', 150, 2),
 ((select id from p), 'معكرونة', 'kg', 100, 3),
 ((select id from p), 'طماطم مصبرة', '400g', 80, 3),
 ((select id from p), 'تن', '160g', 120, 4)
on conflict do nothing;

-- Couple Pack Items
with p as (select id from public.packs where slug='couple')
insert into public.pack_items (pack_id, name, unit, unit_price, default_qty) values
 ((select id from p), 'سميد', 'kg', 120, 3),
 ((select id from p), 'سكر', 'kg', 110, 3),
 ((select id from p), 'زيت', 'L', 220, 3),
 ((select id from p), 'قهوة', '250g', 350, 2),
 ((select id from p), 'حليب معقم', 'L', 95, 12),
 ((select id from p), 'أرز', 'kg', 150, 2),
 ((select id from p), 'معكرونة', 'kg', 100, 3),
 ((select id from p), 'طماطم مصبرة', '400g', 80, 4),
 ((select id from p), 'عدس', 'kg', 180, 1),
 ((select id from p), 'حمص', 'kg', 200, 1)
on conflict do nothing;

-- Premium Pack Items
with p as (select id from public.packs where slug='premium')
insert into public.pack_items (pack_id, name, unit, unit_price, default_qty) values
 ((select id from p), 'سميد كسكسي فاخر', 'kg', 180, 5),
 ((select id from p), 'سكر أبيض', 'kg', 130, 5),
 ((select id from p), 'زيت زيتون', 'L', 800, 2),
 ((select id from p), 'زيت نباتي', 'L', 240, 5),
 ((select id from p), 'قهوة محمصة', '500g', 650, 2),
 ((select id from p), 'حليب كامل الدسم', 'L', 110, 24),
 ((select id from p), 'أرز بسمتي', 'kg', 280, 4),
 ((select id from p), 'معكرونة إيطالية', 'kg', 180, 5),
 ((select id from p), 'طماطم مصبرة إيطالية', '400g', 120, 8),
 ((select id from p), 'عدس أحمر', 'kg', 200, 2),
 ((select id from p), 'حمص حب', 'kg', 220, 2),
 ((select id from p), 'تن في زيت الزيتون', '160g', 180, 6),
 ((select id from p), 'عسل طبيعي', '500g', 900, 1),
 ((select id from p), 'زيتون أخضر', 'kg', 400, 1)
on conflict do nothing;

