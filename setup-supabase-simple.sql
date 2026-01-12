-- =====================================================
-- SETUP SUPABASE ULTRA-SIMPLE POUR POWALYZE
-- Exécuter ce script dans le SQL Editor de Supabase
-- =====================================================

-- 1. CRÉER LES TABLES
-- =====================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references auth.users(id),
  created_at timestamptz default now()
);

create table if not exists public.user_organizations (
  user_id uuid references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  role text default 'member',
  created_at timestamptz default now(),
  primary key (user_id, organization_id)
);

create table if not exists public.initiatives (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  status text default 'planned',
  progress numeric(5,2) default 0,
  owner_id uuid references auth.users(id),
  start_date date,
  end_date date,
  priority text default 'medium',
  budget numeric(15,2),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  initiative_id uuid references public.initiatives(id) on delete cascade,
  name text not null,
  description text,
  file_path text,
  file_url text,
  file_size bigint,
  file_type text,
  uploaded_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  report_type text,
  config jsonb,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

-- 2. SUPPRIMER TOUTES LES POLITIQUES RLS EXISTANTES
-- =====================================================

drop policy if exists "users_can_view_own_profile" on public.profiles;
drop policy if exists "users_can_insert_own_profile" on public.profiles;
drop policy if exists "users_can_update_own_profile" on public.profiles;
drop policy if exists "select_organizations_as_member" on public.organizations;
drop policy if exists "insert_own_organization" on public.organizations;
drop policy if exists "update_own_organization" on public.organizations;
drop policy if exists "delete_own_organization" on public.organizations;
drop policy if exists "select_user_organizations" on public.user_organizations;
drop policy if exists "insert_user_organizations" on public.user_organizations;
drop policy if exists "select_initiatives_by_org" on public.initiatives;
drop policy if exists "insert_initiatives_by_org" on public.initiatives;
drop policy if exists "update_initiatives_by_org" on public.initiatives;
drop policy if exists "delete_initiatives_by_org" on public.initiatives;
drop policy if exists "select_documents_by_org" on public.documents;
drop policy if exists "insert_documents_by_org" on public.documents;
drop policy if exists "delete_documents_by_org" on public.documents;
drop policy if exists "select_reports_by_org" on public.reports;
drop policy if exists "insert_reports_by_org" on public.reports;

-- 3. DÉSACTIVER RLS SUR TOUTES LES TABLES
-- =====================================================

alter table public.profiles disable row level security;
alter table public.organizations disable row level security;
alter table public.user_organizations disable row level security;
alter table public.initiatives disable row level security;
alter table public.documents disable row level security;
alter table public.reports disable row level security;

-- =====================================================
-- ✅ TERMINÉ ! Votre base est prête.
-- L'auto-création d'organisation fonctionnera maintenant.
-- =====================================================
