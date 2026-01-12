-- =====================================================
-- DÉPLOIEMENT COMPLET + FIX RLS ORGANIZATIONS
-- Crée toutes les tables puis applique les bonnes politiques
-- =====================================================

-- ÉTAPE 1: CRÉER LES TABLES DE BASE
-- =====================================================

-- ORGANISATIONS (sans owner_id)
CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- LIEN UTILISATEURS <-> ORGANISATIONS
CREATE TABLE IF NOT EXISTS public.user_organizations (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member',
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, organization_id)
);

-- INITIATIVES / PROJETS
CREATE TABLE IF NOT EXISTS public.initiatives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'planned',
  progress numeric(5,2) NOT NULL DEFAULT 0,
  owner_id uuid REFERENCES auth.users(id),
  start_date date,
  end_date date,
  priority text DEFAULT 'medium',
  budget numeric(15,2),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS initiatives_org_idx ON public.initiatives (organization_id);
CREATE INDEX IF NOT EXISTS initiatives_status_idx ON public.initiatives (status);

-- DOCUMENTS
CREATE TABLE IF NOT EXISTS public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  initiative_id uuid REFERENCES public.initiatives(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  file_path text,
  file_url text,
  file_size bigint,
  file_type text,
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS documents_org_idx ON public.documents (organization_id);

-- REPORTS
CREATE TABLE IF NOT EXISTS public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  report_type text,
  config jsonb,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS reports_org_idx ON public.reports (organization_id);

-- PROFILES (pour auto-provisioning)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ÉTAPE 2: FONCTION HELPER
-- =====================================================

CREATE OR REPLACE FUNCTION public.user_in_org(org_id uuid)
RETURNS boolean
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

-- ÉTAPE 3: ACTIVER RLS + POLITIQUES
-- =====================================================

-- PROFILES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_can_view_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "users_can_insert_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "users_can_update_own_profile" ON public.profiles;

CREATE POLICY "users_can_view_own_profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_can_insert_own_profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "users_can_update_own_profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ORGANIZATIONS (FIX PRINCIPAL - sans owner_id)
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_organizations_as_member" ON public.organizations;
DROP POLICY IF EXISTS "insert_own_organization" ON public.organizations;
DROP POLICY IF EXISTS "update_own_organization" ON public.organizations;
DROP POLICY IF EXISTS "delete_own_organization" ON public.organizations;
DROP POLICY IF EXISTS "users_can_view_their_organizations" ON public.organizations;
DROP POLICY IF EXISTS "users_can_create_organizations" ON public.organizations;
DROP POLICY IF EXISTS "users_can_update_their_organizations" ON public.organizations;
DROP POLICY IF EXISTS "users_can_delete_their_organizations" ON public.organizations;

-- Politiques corrigées (basées sur user_organizations, pas owner_id)
CREATE POLICY "users_can_view_their_organizations" ON public.organizations
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND id IN (
      SELECT uo.organization_id
      FROM public.user_organizations uo
      WHERE uo.user_id = auth.uid()
    )
  );

CREATE POLICY "users_can_create_organizations" ON public.organizations
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "users_can_update_their_organizations" ON public.organizations
  FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND id IN (
      SELECT uo.organization_id
      FROM public.user_organizations uo
      WHERE uo.user_id = auth.uid() AND uo.role = 'admin'
    )
  );

CREATE POLICY "users_can_delete_their_organizations" ON public.organizations
  FOR DELETE
  USING (
    auth.uid() IS NOT NULL
    AND id IN (
      SELECT uo.organization_id
      FROM public.user_organizations uo
      WHERE uo.user_id = auth.uid() AND uo.role = 'admin'
    )
  );

-- USER_ORGANIZATIONS
ALTER TABLE public.user_organizations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_user_organizations" ON public.user_organizations;
DROP POLICY IF EXISTS "insert_user_organizations" ON public.user_organizations;
DROP POLICY IF EXISTS "users_can_join_organizations" ON public.user_organizations;

CREATE POLICY "select_user_organizations" ON public.user_organizations
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "users_can_join_organizations" ON public.user_organizations
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()
  );

-- INITIATIVES
ALTER TABLE public.initiatives ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_initiatives_by_org" ON public.initiatives;
DROP POLICY IF EXISTS "insert_initiatives_by_org" ON public.initiatives;
DROP POLICY IF EXISTS "update_initiatives_by_org" ON public.initiatives;
DROP POLICY IF EXISTS "delete_initiatives_by_org" ON public.initiatives;

CREATE POLICY "select_initiatives_by_org" ON public.initiatives
  FOR SELECT USING (public.user_in_org(organization_id));

CREATE POLICY "insert_initiatives_by_org" ON public.initiatives
  FOR INSERT WITH CHECK (public.user_in_org(organization_id));

CREATE POLICY "update_initiatives_by_org" ON public.initiatives
  FOR UPDATE USING (public.user_in_org(organization_id));

CREATE POLICY "delete_initiatives_by_org" ON public.initiatives
  FOR DELETE USING (public.user_in_org(organization_id));

-- DOCUMENTS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_documents_by_org" ON public.documents;
DROP POLICY IF EXISTS "insert_documents_by_org" ON public.documents;
DROP POLICY IF EXISTS "delete_documents_by_org" ON public.documents;

CREATE POLICY "select_documents_by_org" ON public.documents
  FOR SELECT USING (public.user_in_org(organization_id));

CREATE POLICY "insert_documents_by_org" ON public.documents
  FOR INSERT WITH CHECK (public.user_in_org(organization_id));

CREATE POLICY "delete_documents_by_org" ON public.documents
  FOR DELETE USING (public.user_in_org(organization_id));

-- REPORTS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_reports_by_org" ON public.reports;
DROP POLICY IF EXISTS "insert_reports_by_org" ON public.reports;

CREATE POLICY "select_reports_by_org" ON public.reports
  FOR SELECT USING (public.user_in_org(organization_id));

CREATE POLICY "insert_reports_by_org" ON public.reports
  FOR INSERT WITH CHECK (public.user_in_org(organization_id));

-- ÉTAPE 4: VÉRIFICATION
-- =====================================================

SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  cmd
FROM pg_policies
WHERE tablename IN ('organizations', 'user_organizations', 'initiatives', 'profiles')
ORDER BY tablename, policyname;

-- =====================================================
-- ✅ DÉPLOIEMENT COMPLET TERMINÉ
-- Tables créées + RLS configuré correctement
-- =====================================================
