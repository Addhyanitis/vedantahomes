
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users see own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());
create policy "Admins manage roles" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Plots
create table public.plots (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  location text not null default '',
  area text not null default '',
  facing text not null default '',
  price text not null default '',
  tag text not null default 'AVAILABLE',
  image_url text not null default '',
  description text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.plots to anon, authenticated;
grant insert, update, delete on public.plots to authenticated;
grant all on public.plots to service_role;
alter table public.plots enable row level security;
create policy "Plots are public" on public.plots for select to anon, authenticated using (true);
create policy "Admins write plots" on public.plots for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  status text not null default 'Ongoing',
  year text not null default '',
  units text not null default '',
  image_url text not null default '',
  blurb text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;
grant all on public.projects to service_role;
alter table public.projects enable row level security;
create policy "Projects are public" on public.projects for select to anon, authenticated using (true);
create policy "Admins write projects" on public.projects for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Company info (single row)
create table public.company_info (
  id int primary key default 1,
  name text not null default 'Random Developers',
  tagline text not null default '',
  phone text not null default '',
  email text not null default '',
  address text not null default '',
  stats jsonb not null default '[]'::jsonb,
  about_text text not null default '',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
grant select on public.company_info to anon, authenticated;
grant insert, update on public.company_info to authenticated;
grant all on public.company_info to service_role;
alter table public.company_info enable row level security;
create policy "Company is public" on public.company_info for select to anon, authenticated using (true);
create policy "Admins write company" on public.company_info for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

insert into public.company_info (id, name, tagline, phone, email, address, stats, about_text)
values (1, 'Random Developers', 'Premium land. Generational ground.', '+91 98765 43210', 'hello@randomdevelopers.in',
  '12th Floor, Skyline Tower, MG Road, Bengaluru 560001',
  '[{"value":"25+","label":"Years Experience"},{"value":"4.2k","label":"Happy Families"},{"value":"18","label":"Projects Delivered"}]'::jsonb,
  'Two and a half decades of carefully chosen land, transparent paperwork and gated communities families actually want to live in.');

-- updated_at trigger
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger plots_touch before update on public.plots for each row execute function public.touch_updated_at();
create trigger projects_touch before update on public.projects for each row execute function public.touch_updated_at();
create trigger company_touch before update on public.company_info for each row execute function public.touch_updated_at();
