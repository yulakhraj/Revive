-- ==========================================
-- AUSPHOTIC — DATABASE SCHEMA FOR SUPABASE
-- Paste this script into your Supabase SQL Editor
-- ==========================================

-- 1. Profiles Table (Linked to Supabase Auth)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  email text not null unique,
  avatar_url text,
  phone text,
  is_admin boolean default false,
  preferences jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone" on profiles
  for select using (true);

create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

-- 2. Products Table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text,
  price numeric not null check (price >= 0),
  original_price numeric check (original_price >= price),
  discount_percent numeric default 0,
  category_id text not null,
  brand text not null,
  condition text not null check (condition in ('new', 'like_new', 'good', 'fair')),
  gender text not null check (gender in ('men', 'women', 'unisex')),
  fabric text,
  color text,
  style text,
  size_available text[] default '{}'::text[],
  stock_quantity integer default 1 check (stock_quantity >= 0),
  is_featured boolean default false,
  is_premium boolean default false,
  is_flash_deal boolean default false,
  is_verified boolean default true,
  seller_type text default 'admin' check (seller_type in ('admin', 'vendor')),
  seller_id text default 'admin1',
  avg_rating numeric default 5.0,
  review_count integer default 0,
  view_count integer default 0,
  tags text[] default '{}'::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Products
alter table products enable row level security;

create policy "Products are viewable by everyone" on products
  for select using (true);

create policy "Only admin can modify products" on products
  for all using (
    exists (
      select 1 from profiles 
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

-- 3. Product Images Table
create table if not exists product_images (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references products on delete cascade not null,
  url text not null,
  sort_order integer default 0,
  is_primary boolean default false
);

alter table product_images enable row level security;

create policy "Images are viewable by everyone" on product_images
  for select using (true);

create policy "Only admin can modify images" on product_images
  for all using (
    exists (
      select 1 from profiles 
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

-- 4. Addresses Table
create table if not exists addresses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  label text not null check (label in ('home', 'work', 'other')),
  full_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Addresses
alter table addresses enable row level security;

create policy "Users can view their own addresses" on addresses
  for select using (auth.uid() = user_id);

create policy "Users can modify their own addresses" on addresses
  for all using (auth.uid() = user_id);

-- 5. Orders Table
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  order_number text not null unique,
  user_id uuid references auth.users on delete set null,
  address_id uuid,
  subtotal numeric not null,
  discount numeric default 0,
  shipping_fee numeric default 0,
  total numeric not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned')),
  payment_method text not null,
  payment_id text,
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  coupon_id text,
  tracking_number text,
  tracking_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Orders
alter table orders enable row level security;

create policy "Users can view their own orders" on orders
  for select using (auth.uid() = user_id);

create policy "Users can create their own orders" on orders
  for insert with check (auth.uid() = user_id);

create policy "Only admin can modify orders" on orders
  for all using (
    exists (
      select 1 from profiles 
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

-- 6. Order Items Table
create table if not exists order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders on delete cascade not null,
  product_id uuid references products on delete set null,
  size text not null,
  color text,
  quantity integer not null check (quantity > 0),
  price_at_purchase numeric not null,
  product_name_snapshot text not null,
  product_image_snapshot text
);

-- Enable RLS on Order Items
alter table order_items enable row level security;

create policy "Users can view their own order items" on order_items
  for select using (
    exists (
      select 1 from orders 
      where orders.id = order_id and orders.user_id = auth.uid()
    )
  );

create policy "Users can insert their own order items" on order_items
  for insert with check (
    exists (
      select 1 from orders 
      where orders.id = order_id and orders.user_id = auth.uid()
    )
  );

create policy "Only admin can modify order items" on order_items
  for all using (
    exists (
      select 1 from profiles 
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

-- 7. Categories Table
create table if not exists categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  parent_id text references categories(id) on delete set null,
  gender text not null check (gender in ('men', 'women', 'unisex', 'premium')),
  sort_order integer default 0,
  is_active boolean default true,
  product_count integer default 0
);

-- Enable RLS on Categories
alter table categories enable row level security;

create policy "Categories are viewable by everyone" on categories
  for select using (true);

create policy "Only admin can modify categories" on categories
  for all using (
    exists (
      select 1 from profiles 
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

-- 8. Auto-create profile on Auth Signup trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url, is_admin)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'New Member'),
    new.email,
    'https://api.dicebear.com/7.x/adventurer/svg?seed=' || new.id,
    case when new.email like '%admin%' then true else false end -- auto-admin for test emails
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
