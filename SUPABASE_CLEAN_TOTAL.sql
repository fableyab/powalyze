-- SCHEMA POWALYZE - NETTOYAGE TOTAL + RECRÉATION
-- Version: Clean Total (supprime TOUT y compris les politiques)
-- Date: 2026-01-11

-- ═══════════════════════════════════════════════════════════
-- ÉTAPE 1: SUPPRIMER TOUTES LES POLITIQUES RLS EXISTANTES
-- ═══════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "allow_all_organizations" ON public.organizations;
DROP POLICY IF EXISTS "allow_all_user_organizations" ON public.user_organizations;
DROP POLICY IF EXISTS "allow_all_initiatives" ON public.initiatives;
DROP POLICY IF EXISTS "allow_all_risks" ON public.risks;
DROP POLICY IF EXISTS "allow_all_decisions" ON public.decisions;
DROP POLICY IF EXISTS "allow_all_alerts" ON public.alerts;

-- ═══════════════════════════════════════════════════════════
-- ÉTAPE 2: SUPPRIMER TOUTES LES TABLES
-- ═══════════════════════════════════════════════════════════

DROP TABLE IF EXISTS public.alerts CASCADE;
DROP TABLE IF EXISTS public.decisions CASCADE;
DROP TABLE IF EXISTS public.risks CASCADE;
DROP TABLE IF EXISTS public.initiatives CASCADE;
DROP TABLE IF EXISTS public.user_organizations CASCADE;
DROP TABLE IF EXISTS public.organizations CASCADE;

-- ═══════════════════════════════════════════════════════════
-- ÉTAPE 3: CRÉER LES TABLES (SANS POLITIQUES)
-- ═══════════════════════════════════════════════════════════

-- Table: organizations
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  owner_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table: user_organizations
CREATE TABLE public.user_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, organization_id)
);

-- Table: initiatives (projets)
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
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table: risks
CREATE TABLE public.risks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  initiative_id UUID REFERENCES public.initiatives(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT DEFAULT 'medium',
  probability TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'open',
  owner_id UUID,
  mitigation_plan TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table: decisions
CREATE TABLE public.decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  initiative_id UUID REFERENCES public.initiatives(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  decision_date DATE,
  decided_by UUID,
  impact TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table: alerts
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  initiative_id UUID REFERENCES public.initiatives(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  severity TEXT DEFAULT 'info',
  title TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'active',
  acknowledged_by UUID,
  acknowledged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════
-- ÉTAPE 4: CRÉER LES INDEX POUR PERFORMANCE
-- ═══════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_user_organizations_user_id ON public.user_organizations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_organizations_org_id ON public.user_organizations(organization_id);
CREATE INDEX IF NOT EXISTS idx_initiatives_org_id ON public.initiatives(organization_id);
CREATE INDEX IF NOT EXISTS idx_initiatives_owner_id ON public.initiatives(owner_id);
CREATE INDEX IF NOT EXISTS idx_risks_initiative_id ON public.risks(initiative_id);
CREATE INDEX IF NOT EXISTS idx_decisions_initiative_id ON public.decisions(initiative_id);
CREATE INDEX IF NOT EXISTS idx_alerts_initiative_id ON public.alerts(initiative_id);

-- ═══════════════════════════════════════════════════════════
-- ÉTAPE 5: DÉSACTIVER RLS (pas de politiques = pas de restrictions)
-- ═══════════════════════════════════════════════════════════

ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiatives DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.risks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.decisions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts DISABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════
-- ÉTAPE 6: VÉRIFICATION - Liste les tables créées
-- ═══════════════════════════════════════════════════════════

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('organizations', 'user_organizations', 'initiatives', 'risks', 'decisions', 'alerts')
ORDER BY table_name;
