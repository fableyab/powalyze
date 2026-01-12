-- =====================================================
-- SOLUTION FINALE - DÉTRUIRE ET RECRÉER SANS RLS
-- Exécuter ce script dans Supabase SQL Editor
-- =====================================================

-- 1. DÉTRUIRE COMPLÈTEMENT LES TABLES EXISTANTES
DROP TABLE IF EXISTS public.reports CASCADE;
DROP TABLE IF EXISTS public.documents CASCADE;
DROP TABLE IF EXISTS public.initiatives CASCADE;
DROP TABLE IF EXISTS public.user_organizations CASCADE;
DROP TABLE IF EXISTS public.organizations CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Supprimer les fonctions
DROP FUNCTION IF EXISTS public.user_in_org(uuid) CASCADE;

-- 2. RECRÉER LES TABLES SANS RLS DU TOUT
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.user_organizations (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  role text DEFAULT 'member',
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, organization_id)
);

CREATE TABLE public.initiatives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  status text DEFAULT 'planned',
  progress numeric(5,2) DEFAULT 0,
  owner_id uuid REFERENCES auth.users(id),
  start_date date,
  end_date date,
  priority text DEFAULT 'medium',
  budget numeric(15,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  initiative_id uuid REFERENCES public.initiatives(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  file_path text,
  file_url text,
  file_size bigint,
  file_type text,
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  report_type text,
  config jsonb,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- 3. CONFIRMER QUE RLS EST DÉSACTIVÉ (par défaut sur nouvelles tables)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiatives DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports DISABLE ROW LEVEL SECURITY;

-- 4. VÉRIFICATION FINALE
SELECT 
    tablename,
    rowsecurity as "RLS actif",
    CASE 
        WHEN rowsecurity THEN '❌ PROBLÈME'
        ELSE '✅ OK - RLS désactivé'
    END as statut
FROM pg_tables 
WHERE schemaname = 'public'
  AND tablename IN ('profiles', 'organizations', 'user_organizations', 'initiatives', 'documents', 'reports')
ORDER BY tablename;
