-- =====================================================
-- SCHEMA COMPLET POWALYZE - AVEC RLS CORRECT
-- Création des tables + permissions pour auto-création
-- =====================================================

-- ÉTAPE 1: CRÉER TOUTES LES TABLES D'ABORD
-- =====================================================

-- 1. TABLE PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. TABLE ORGANIZATIONS (avec owner_id)
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- 3. TABLE USER_ORGANIZATIONS (lien users <-> orgs)
create table if not exists public.user_organizations (
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (user_id, organization_id)
);

-- 4. TABLE INITIATIVES (projets)
create table if not exists public.initiatives (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'planned',
  progress numeric(5,2) not null default 0,
  owner_id uuid references auth.users(id),
  start_date date,
  end_date date,
  priority text default 'medium',
  budget numeric(15,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists initiatives_org_idx on public.initiatives (organization_id);

-- 5. TABLE DOCUMENTS
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  initiative_id uuid references public.initiatives(id) on delete cascade,
  name text not null,
  description text,
  file_path text,
  file_url text,
  file_size bigint,
  file_type text,
  uploaded_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists documents_org_idx on public.documents (organization_id);

-- 6. TABLE REPORTS
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  report_type text,
  config jsonb,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

-- ÉTAPE 2: FONCTION HELPER
-- =====================================================

create or replace function public.user_in_org(org_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.user_organizations uo
    where uo.organization_id = org_id
      and uo.user_id = auth.uid()
  );
$$;

-- ÉTAPE 3: ACTIVER RLS ET CRÉER POLITIQUES
-- =====================================================

-- PROFILES
alter table public.profiles enable row level security;

create policy "users_can_view_own_profile" on public.profiles
  for select using (auth.uid() = id);

create policy "users_can_insert_own_profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "users_can_update_own_profile" on public.profiles
  for update using (auth.uid() = id);

-- ORGANIZATIONS
alter table public.organizations enable row level security;

create policy "select_organizations_as_member" on public.organizations
  for select using (
    id in (
      select uo.organization_id
      from public.user_organizations uo
      where uo.user_id = auth.uid()
    )
  );

create policy "insert_own_organization" on public.organizations
  for insert with check (
    auth.uid() is not null
    and owner_id = auth.uid()
  );

create policy "update_own_organization" on public.organizations
  for update using (owner_id = auth.uid());

create policy "delete_own_organization" on public.organizations
  for delete using (owner_id = auth.uid());

-- USER_ORGANIZATIONS
alter table public.user_organizations enable row level security;

create policy "select_user_organizations" on public.user_organizations
  for select using (user_id = auth.uid());

create policy "insert_user_organizations" on public.user_organizations
  for insert with check (true);

-- INITIATIVES
alter table public.initiatives enable row level security;

create policy "select_initiatives_by_org" on public.initiatives
  for select using (public.user_in_org(organization_id));

create policy "insert_initiatives_by_org" on public.initiatives
  for insert with check (public.user_in_org(organization_id));

create policy "update_initiatives_by_org" on public.initiatives
  for update using (public.user_in_org(organization_id));

create policy "delete_initiatives_by_org" on public.initiatives
  for delete using (public.user_in_org(organization_id));

-- DOCUMENTS
alter table public.documents enable row level security;

create policy "select_documents_by_org" on public.documents
  for select using (public.user_in_org(organization_id));

create policy "insert_documents_by_org" on public.documents
  for insert with check (public.user_in_org(organization_id));

create policy "delete_documents_by_org" on public.documents
  for delete using (public.user_in_org(organization_id));

-- REPORTS
alter table public.reports enable row level security;

create policy "select_reports_by_org" on public.reports
  for select using (public.user_in_org(organization_id));

create policy "insert_reports_by_org" on public.reports
  for insert with check (public.user_in_org(organization_id));

-- =====================================================
-- ✅ SCHEMA COMPLET - PRÊT POUR AUTO-CRÉATION
-- =====================================================
