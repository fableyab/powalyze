-- =====================================================
-- FIX CRITIQUE: Erreur création organisation
-- "new row violates row-level security policy for table organizations"
-- =====================================================
-- Date: 2026-01-12
-- Priorité: P1 - BLOQUANT DEMO
-- =====================================================

-- DIAGNOSTIC DU PROBLÈME:
-- Les politiques RLS sur la table "organizations" bloquent l'INSERT
-- car elles vérifient que l'utilisateur est DÉJÀ membre de l'organisation
-- dans user_organizations AVANT qu'elle soit créée (chicken-egg problem).

-- SOLUTION:
-- 1. Autoriser TOUT utilisateur authentifié à créer une organisation
-- 2. Puis se lier automatiquement via user_organizations
-- 3. Maintenir la sécurité sur SELECT/UPDATE/DELETE

-- =====================================================
-- ÉTAPE 1: Vérifier l'état actuel
-- =====================================================

-- Voir les politiques actuelles
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive,
  cmd,
  CASE WHEN qual IS NULL THEN 'N/A' ELSE qual END as using_clause,
  CASE WHEN with_check IS NULL THEN 'N/A' ELSE with_check END as with_check_clause
FROM pg_policies
WHERE tablename = 'organizations'
ORDER BY policyname;

-- =====================================================
-- ÉTAPE 2: Désactiver temporairement RLS
-- =====================================================

ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- ÉTAPE 3: Supprimer TOUTES les anciennes politiques
-- =====================================================

DROP POLICY IF EXISTS "users_can_view_their_organizations" ON public.organizations;
DROP POLICY IF EXISTS "users_can_create_organizations" ON public.organizations;
DROP POLICY IF EXISTS "users_can_update_their_organizations" ON public.organizations;
DROP POLICY IF EXISTS "users_can_delete_their_organizations" ON public.organizations;
DROP POLICY IF EXISTS "select_organizations_as_member" ON public.organizations;
DROP POLICY IF EXISTS "insert_own_organization" ON public.organizations;
DROP POLICY IF EXISTS "update_own_organization" ON public.organizations;
DROP POLICY IF EXISTS "delete_own_organization" ON public.organizations;
-- Supprimer les nouvelles politiques si elles existent déjà
DROP POLICY IF EXISTS "organizations_select_policy" ON public.organizations;
DROP POLICY IF EXISTS "organizations_insert_policy" ON public.organizations;
DROP POLICY IF EXISTS "organizations_update_policy" ON public.organizations;
DROP POLICY IF EXISTS "organizations_delete_policy" ON public.organizations;

-- =====================================================
-- ÉTAPE 4: Créer les nouvelles politiques CORRECTES
-- =====================================================

-- Policy 1: SELECT - Voir ses organisations (via user_organizations)
CREATE POLICY "organizations_select_policy" 
ON public.organizations
FOR SELECT
USING (
  auth.uid() IS NOT NULL
  AND id IN (
    -- Membre de l'organisation
    SELECT organization_id 
    FROM public.user_organizations 
    WHERE user_id = auth.uid()
  )
);

-- Policy 2: INSERT - AUTORISER la création (FIX CRITIQUE)
CREATE POLICY "organizations_insert_policy" 
ON public.organizations
FOR INSERT
WITH CHECK (
  -- Tout utilisateur authentifié peut créer une organisation
  auth.uid() IS NOT NULL
);

-- Policy 3: UPDATE - Modifier son organisation (admin uniquement)
CREATE POLICY "organizations_update_policy" 
ON public.organizations
FOR UPDATE
USING (
  auth.uid() IS NOT NULL
  AND id IN (
    SELECT organization_id 
    FROM public.user_organizations 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Policy 4: DELETE - Supprimer son organisation (admin uniquement)
CREATE POLICY "organizations_delete_policy" 
ON public.organizations
FOR DELETE
USING (
  auth.uid() IS NOT NULL
  AND id IN (
    SELECT organization_id 
    FROM public.user_organizations 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- =====================================================
-- ÉTAPE 5: Réactiver RLS
-- =====================================================

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- ÉTAPE 6: Fix user_organizations également
-- =====================================================

ALTER TABLE public.user_organizations DISABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_can_join_organizations" ON public.user_organizations;
DROP POLICY IF EXISTS "insert_user_organizations" ON public.user_organizations;
DROP POLICY IF EXISTS "Users can view their own organizations" ON public.user_organizations;
DROP POLICY IF EXISTS "select_user_organizations" ON public.user_organizations;
-- Supprimer les nouvelles politiques si elles existent déjà
DROP POLICY IF EXISTS "user_organizations_select_policy" ON public.user_organizations;
DROP POLICY IF EXISTS "user_organizations_insert_policy" ON public.user_organizations;
DROP POLICY IF EXISTS "user_organizations_update_policy" ON public.user_organizations;
DROP POLICY IF EXISTS "user_organizations_delete_policy" ON public.user_organizations;

-- Policy SELECT: voir ses propres liaisons
CREATE POLICY "user_organizations_select_policy"
ON public.user_organizations
FOR SELECT
USING (
  auth.uid() IS NOT NULL
  AND user_id = auth.uid()
);

-- Policy INSERT: se lier à une organisation (FIX - autoriser auto-liaison)
CREATE POLICY "user_organizations_insert_policy"
ON public.user_organizations
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL
  AND user_id = auth.uid() -- Seulement se lier soi-même
);

-- Policy UPDATE: modifier son rôle (admin org uniquement)
CREATE POLICY "user_organizations_update_policy"
ON public.user_organizations
FOR UPDATE
USING (
  auth.uid() IS NOT NULL
  AND organization_id IN (
    SELECT organization_id 
    FROM public.user_organizations 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Policy DELETE: quitter une organisation
CREATE POLICY "user_organizations_delete_policy"
ON public.user_organizations
FOR DELETE
USING (
  auth.uid() IS NOT NULL
  AND (
    user_id = auth.uid() -- Quitter soi-même
    OR organization_id IN (
      SELECT organization_id 
      FROM public.user_organizations 
      WHERE user_id = auth.uid() 
      AND role = 'admin' -- OU admin peut retirer d'autres
    )
  )
);

ALTER TABLE public.user_organizations ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- ÉTAPE 7: Vérifier les politiques installées
-- =====================================================

SELECT 
  tablename, 
  policyname, 
  cmd,
  permissive
FROM pg_policies
WHERE tablename IN ('organizations', 'user_organizations')
ORDER BY tablename, policyname;

-- =====================================================
-- ÉTAPE 8: Test rapide (optionnel)
-- =====================================================

-- Simuler une création (remplacer YOUR_USER_ID)
/*
-- 1. Créer une organisation de test
INSERT INTO public.organizations (name)
VALUES ('Test Org')
RETURNING id;

-- Copier l'ID retourné et l'utiliser ci-dessous
-- 2. Lier l'utilisateur
INSERT INTO public.user_organizations (user_id, organization_id, role)
VALUES ('YOUR_USER_ID', 'ORG_ID_FROM_STEP_1', 'admin');

-- 3. Vérifier qu'on peut la voir
SELECT * FROM public.organizations WHERE name = 'Test Org';

-- 4. Nettoyer
DELETE FROM public.organizations WHERE name = 'Test Org';
*/

-- =====================================================
-- ✅ FIX APPLIQUÉ
-- =====================================================
-- Les utilisateurs peuvent maintenant:
-- 1. Créer une organisation (INSERT autorisé)
-- 2. Se lier automatiquement via user_organizations
-- 3. Voir uniquement leurs organisations (SELECT filtré)
-- 4. Modifier/supprimer leurs organisations (si admin)
-- =====================================================
