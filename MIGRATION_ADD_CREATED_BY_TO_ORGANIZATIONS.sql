-- =====================================================
-- MIGRATION : Ajouter created_by à la table organizations
-- Date: 2026-01-13
-- =====================================================

-- 1. AJOUTER LA COLONNE created_by
-- =====================================================

ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. METTRE À JOUR LES ORGANISATIONS EXISTANTES
-- =====================================================
-- Associer le premier admin de chaque org comme créateur

UPDATE public.organizations o
SET created_by = (
  SELECT uo.user_id
  FROM public.user_organizations uo
  WHERE uo.organization_id = o.id
    AND uo.role IN ('admin', 'owner')
  ORDER BY uo.created_at ASC
  LIMIT 1
)
WHERE created_by IS NULL;

-- Si pas d'admin, prendre le premier membre
UPDATE public.organizations o
SET created_by = (
  SELECT uo.user_id
  FROM public.user_organizations uo
  WHERE uo.organization_id = o.id
  ORDER BY uo.created_at ASC
  LIMIT 1
)
WHERE created_by IS NULL;

-- 3. RENDRE LA COLONNE OBLIGATOIRE (après migration des données)
-- =====================================================

ALTER TABLE public.organizations
ALTER COLUMN created_by SET NOT NULL;

-- 4. CRÉER L'INDEX pour les requêtes par created_by
-- =====================================================

CREATE INDEX IF NOT EXISTS organizations_created_by_idx 
ON public.organizations (created_by);

-- 5. METTRE À JOUR LES RLS POLICIES POUR ORGANIZATIONS
-- =====================================================

-- Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "org_select" ON public.organizations;
DROP POLICY IF EXISTS "org_insert" ON public.organizations;
DROP POLICY IF EXISTS "org_update" ON public.organizations;
DROP POLICY IF EXISTS "org_delete" ON public.organizations;

-- SELECT : Voir les orgs dont on est membre OU créateur
CREATE POLICY "org_select" ON public.organizations
FOR SELECT
TO authenticated
USING (
  created_by = auth.uid() 
  OR EXISTS (
    SELECT 1 FROM public.user_organizations uo
    WHERE uo.organization_id = id
      AND uo.user_id = auth.uid()
  )
);

-- INSERT : Créer une org (avec created_by = auth.uid())
CREATE POLICY "org_insert" ON public.organizations
FOR INSERT
TO authenticated
WITH CHECK (created_by = auth.uid());

-- UPDATE : Modifier une org si on est créateur OU admin
CREATE POLICY "org_update" ON public.organizations
FOR UPDATE
TO authenticated
USING (
  created_by = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.user_organizations uo
    WHERE uo.organization_id = id
      AND uo.user_id = auth.uid()
      AND uo.role IN ('admin', 'owner')
  )
);

-- DELETE : Supprimer une org SEULEMENT si on est créateur
CREATE POLICY "org_delete" ON public.organizations
FOR DELETE
TO authenticated
USING (created_by = auth.uid());

-- 6. ACTIVER RLS SUR LA TABLE (si pas déjà fait)
-- =====================================================

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- 7. VÉRIFICATIONS
-- =====================================================

-- Vérifier que toutes les orgs ont un created_by
SELECT 
  COUNT(*) as total_orgs,
  COUNT(created_by) as orgs_with_creator,
  COUNT(*) - COUNT(created_by) as missing_creators
FROM public.organizations;

-- Afficher les orgs sans créateur (devrait être 0)
SELECT id, name, created_by
FROM public.organizations
WHERE created_by IS NULL;

-- =====================================================
-- FIN DE LA MIGRATION
-- =====================================================
