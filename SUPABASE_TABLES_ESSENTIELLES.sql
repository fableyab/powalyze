-- =====================================================
-- TABLES ESSENTIELLES POUR POWALYZE
-- À exécuter dans Supabase SQL Editor
-- =====================================================

-- 1. TABLE ORGANIZATIONS (MULTI-TENANT)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABLE USER_ORGANIZATIONS (LIEN USERS <-> ORGS)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_organizations (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, organization_id)
);

-- 3. TABLE INITIATIVES (PROJETS/PORTFOLIOS)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'planned',
  progress NUMERIC(5,2) NOT NULL DEFAULT 0,
  owner_id UUID REFERENCES auth.users(id),
  start_date DATE,
  end_date DATE,
  budget NUMERIC(15,2),
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS initiatives_org_idx ON public.initiatives (organization_id);
CREATE INDEX IF NOT EXISTS initiatives_status_idx ON public.initiatives (status);

-- 4. TABLE RISKS (RISQUES)
-- =====================================================
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

-- 5. TABLE DECISIONS (DÉCISIONS)
-- =====================================================
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
CREATE INDEX IF NOT EXISTS decisions_status_idx ON public.decisions (status);

-- 6. TABLE ALERTS (ALERTES AUTOMATIQUES)
-- =====================================================
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
CREATE INDEX IF NOT EXISTS alerts_read_idx ON public.alerts (is_read);
CREATE INDEX IF NOT EXISTS alerts_severity_idx ON public.alerts (severity);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Fonction helper pour vérifier si user appartient à l'org
CREATE OR REPLACE FUNCTION public.user_in_org(org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_organizations uo
    WHERE uo.organization_id = org_id
      AND uo.user_id = auth.uid()
  );
$$;

-- =====================================================
-- POLICIES POUR ORGANIZATIONS
-- =====================================================

-- Select organizations où user est membre
CREATE POLICY "select_organizations" ON public.organizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_organizations uo
      WHERE uo.organization_id = organizations.id
        AND uo.user_id = auth.uid()
    )
  );

-- Insert organizations (tout user peut créer une org)
CREATE POLICY "insert_organizations" ON public.organizations
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Update organizations (seulement admin)
CREATE POLICY "update_organizations" ON public.organizations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.user_organizations uo
      WHERE uo.organization_id = organizations.id
        AND uo.user_id = auth.uid()
        AND uo.role = 'admin'
    )
  );

-- =====================================================
-- POLICIES POUR USER_ORGANIZATIONS
-- =====================================================

-- Select user_organizations
CREATE POLICY "select_user_organizations" ON public.user_organizations
  FOR SELECT USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.user_organizations uo2
      WHERE uo2.organization_id = user_organizations.organization_id
        AND uo2.user_id = auth.uid()
        AND uo2.role = 'admin'
    )
  );

-- Insert user_organizations (auto-join ou admin invite)
CREATE POLICY "insert_user_organizations" ON public.user_organizations
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.user_organizations uo
      WHERE uo.organization_id = user_organizations.organization_id
        AND uo.user_id = auth.uid()
        AND uo.role = 'admin'
    )
  );

-- =====================================================
-- POLICIES POUR INITIATIVES
-- =====================================================

CREATE POLICY "select_initiatives" ON public.initiatives
  FOR SELECT USING (public.user_in_org(organization_id));

CREATE POLICY "insert_initiatives" ON public.initiatives
  FOR INSERT WITH CHECK (public.user_in_org(organization_id));

CREATE POLICY "update_initiatives" ON public.initiatives
  FOR UPDATE USING (public.user_in_org(organization_id));

CREATE POLICY "delete_initiatives" ON public.initiatives
  FOR DELETE USING (public.user_in_org(organization_id));

-- =====================================================
-- POLICIES POUR RISKS
-- =====================================================

CREATE POLICY "select_risks" ON public.risks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.initiatives i
      WHERE i.id = risks.initiative_id
        AND public.user_in_org(i.organization_id)
    )
  );

CREATE POLICY "insert_risks" ON public.risks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.initiatives i
      WHERE i.id = risks.initiative_id
        AND public.user_in_org(i.organization_id)
    )
  );

CREATE POLICY "update_risks" ON public.risks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.initiatives i
      WHERE i.id = risks.initiative_id
        AND public.user_in_org(i.organization_id)
    )
  );

CREATE POLICY "delete_risks" ON public.risks
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.initiatives i
      WHERE i.id = risks.initiative_id
        AND public.user_in_org(i.organization_id)
    )
  );

-- =====================================================
-- POLICIES POUR DECISIONS
-- =====================================================

CREATE POLICY "select_decisions" ON public.decisions
  FOR SELECT USING (public.user_in_org(organization_id));

CREATE POLICY "insert_decisions" ON public.decisions
  FOR INSERT WITH CHECK (public.user_in_org(organization_id));

CREATE POLICY "update_decisions" ON public.decisions
  FOR UPDATE USING (public.user_in_org(organization_id));

CREATE POLICY "delete_decisions" ON public.decisions
  FOR DELETE USING (public.user_in_org(organization_id));

-- =====================================================
-- POLICIES POUR ALERTS
-- =====================================================

CREATE POLICY "select_alerts" ON public.alerts
  FOR SELECT USING (public.user_in_org(organization_id));

CREATE POLICY "insert_alerts" ON public.alerts
  FOR INSERT WITH CHECK (public.user_in_org(organization_id));

CREATE POLICY "update_alerts" ON public.alerts
  FOR UPDATE USING (public.user_in_org(organization_id));

CREATE POLICY "delete_alerts" ON public.alerts
  FOR DELETE USING (public.user_in_org(organization_id));

-- =====================================================
-- FIN DU SCRIPT
-- =====================================================

-- Pour vérifier que tout est créé :
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
