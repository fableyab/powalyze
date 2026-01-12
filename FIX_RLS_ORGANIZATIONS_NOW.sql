-- =====================================================
-- FIX URGENT: RLS ORGANIZATIONS - Autoriser création automatique
-- =====================================================
-- Ce script corrige l'erreur:
-- "new row violates row-level security policy for table organizations"
-- =====================================================

-- 1. DÉSACTIVER RLS temporairement pour nettoyer
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;

-- 2. SUPPRIMER les anciennes politiques trop restrictives
DROP POLICY IF EXISTS "insert_own_organization" ON public.organizations;
DROP POLICY IF EXISTS "update_own_organization" ON public.organizations;
DROP POLICY IF EXISTS "delete_own_organization" ON public.organizations;
DROP POLICY IF EXISTS "select_organizations_as_member" ON public.organizations;

-- 3. RECRÉER les politiques avec permissions correctes
-- Politique SELECT: voir ses organisations (basé sur user_organizations)
CREATE POLICY "users_can_view_their_organizations" ON public.organizations
  FOR SELECT
  USING (
    -- Utilisateur authentifié ET membre de l'organisation
    auth.uid() IS NOT NULL
    AND id IN (
      SELECT uo.organization_id
      FROM public.user_organizations uo
      WHERE uo.user_id = auth.uid()
    )
  );

-- Politique INSERT: créer une organisation (PERMISSIVE - auto-provisioning)
CREATE POLICY "users_can_create_organizations" ON public.organizations
  FOR INSERT
  WITH CHECK (
    -- Tout utilisateur authentifié peut créer une organisation
    auth.uid() IS NOT NULL
  );

-- Politique UPDATE: modifier son organisation (admin seulement)
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

-- Politique DELETE: supprimer son organisation (admin seulement)
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

-- 4. RÉACTIVER RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- 5. FIX POUR USER_ORGANIZATIONS: autoriser auto-liaison
DROP POLICY IF EXISTS "insert_user_organizations" ON public.user_organizations;

CREATE POLICY "users_can_join_organizations" ON public.user_organizations
  FOR INSERT
  WITH CHECK (
    -- Utilisateur peut se lier à n'importe quelle org (auto-provisioning)
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()
  );

-- 6. VÉRIFIER les politiques actives
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('organizations', 'user_organizations')
ORDER BY tablename, policyname;

-- =====================================================
-- ✅ FIX APPLIQUÉ - Création organisations autorisée
-- =====================================================
