-- =====================================================
-- SCHEMA POWALYZE - VERSION ULTRA-SIMPLE
-- PAS DE RLS - Juste les tables
-- =====================================================

-- Supprimer les tables existantes si elles existent (avec CASCADE)
DROP TABLE IF EXISTS public.alerts CASCADE;
DROP TABLE IF EXISTS public.decisions CASCADE;
DROP TABLE IF EXISTS public.risks CASCADE;
DROP TABLE IF EXISTS public.initiatives CASCADE;
DROP TABLE IF EXISTS public.user_organizations CASCADE;
DROP TABLE IF EXISTS public.organizations CASCADE;

-- 1. ORGANIZATIONS
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. USER_ORGANIZATIONS
CREATE TABLE public.user_organizations (
  user_id UUID NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, organization_id)
);

-- 3. INITIATIVES (PROJETS)
CREATE TABLE public.initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'planned',
  progress NUMERIC(5,2) DEFAULT 0,
  owner_id UUID,
  start_date DATE,
  end_date DATE,
  budget NUMERIC(15,2),
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. RISKS
CREATE TABLE public.risks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  initiative_id UUID REFERENCES public.initiatives(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  probability NUMERIC(5,2) DEFAULT 0,
  impact NUMERIC(5,2) DEFAULT 0,
  status TEXT DEFAULT 'open',
  mitigation TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. DECISIONS
CREATE TABLE public.decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  impact_level TEXT DEFAULT 'medium',
  due_date DATE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. ALERTS
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT DEFAULT 'info',
  type TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index
CREATE INDEX initiatives_org_idx ON public.initiatives (organization_id);
CREATE INDEX risks_initiative_idx ON public.risks (initiative_id);
CREATE INDEX decisions_org_idx ON public.decisions (organization_id);
CREATE INDEX alerts_org_idx ON public.alerts (organization_id);

-- DÉSACTIVER RLS (pour que tout marche)
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiatives DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.risks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.decisions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts DISABLE ROW LEVEL SECURITY;

-- VÉRIFICATION
SELECT 
  table_name,
  CASE 
    WHEN table_name IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') THEN '✅ Créée'
    ELSE '❌ Manquante'
  END as statut
FROM (
  VALUES ('organizations'), ('user_organizations'), ('initiatives'), ('risks'), ('decisions'), ('alerts')
) AS t(table_name)
ORDER BY table_name;
