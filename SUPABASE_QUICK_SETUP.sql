-- =====================================================
-- CRÉATION RAPIDE DES TABLES POWALYZE
-- Version SIMPLIFIÉE sans RLS (pour démarrer vite)
-- =====================================================

-- 1. ORGANIZATIONS
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. USER_ORGANIZATIONS  
CREATE TABLE IF NOT EXISTS public.user_organizations (
  user_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, organization_id)
);

-- 3. INITIATIVES (PROJETS)
CREATE TABLE IF NOT EXISTS public.initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'planned',
  progress NUMERIC(5,2) NOT NULL DEFAULT 0,
  owner_id UUID,
  start_date DATE,
  end_date DATE,
  budget NUMERIC(15,2),
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS initiatives_org_idx ON public.initiatives (organization_id);

-- 4. RISKS
CREATE TABLE IF NOT EXISTS public.risks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  initiative_id UUID NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  probability NUMERIC(5,2) NOT NULL DEFAULT 0,
  impact NUMERIC(5,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open',
  mitigation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS risks_initiative_idx ON public.risks (initiative_id);

-- 5. DECISIONS
CREATE TABLE IF NOT EXISTS public.decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  impact_level TEXT NOT NULL DEFAULT 'medium',
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS decisions_org_idx ON public.decisions (organization_id);

-- 6. ALERTS
CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info',
  type TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS alerts_org_idx ON public.alerts (organization_id);

-- =====================================================
-- ACTIVER RLS (ROW LEVEL SECURITY)
-- =====================================================

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES PERMISSIVES (TEMPORAIRE - pour tester)
-- =====================================================

-- ORGANIZATIONS: Tout le monde peut tout faire
CREATE POLICY "allow_all_organizations" ON public.organizations FOR ALL USING (true) WITH CHECK (true);

-- USER_ORGANIZATIONS: Tout le monde peut tout faire
CREATE POLICY "allow_all_user_organizations" ON public.user_organizations FOR ALL USING (true) WITH CHECK (true);

-- INITIATIVES: Tout le monde peut tout faire
CREATE POLICY "allow_all_initiatives" ON public.initiatives FOR ALL USING (true) WITH CHECK (true);

-- RISKS: Tout le monde peut tout faire
CREATE POLICY "allow_all_risks" ON public.risks FOR ALL USING (true) WITH CHECK (true);

-- DECISIONS: Tout le monde peut tout faire
CREATE POLICY "allow_all_decisions" ON public.decisions FOR ALL USING (true) WITH CHECK (true);

-- ALERTS: Tout le monde peut tout faire
CREATE POLICY "allow_all_alerts" ON public.alerts FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- VÉRIFICATION
-- =====================================================
-- Exécutez ceci après pour vérifier:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
