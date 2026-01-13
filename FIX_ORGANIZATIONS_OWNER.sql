-- =====================================================================
-- FIX: Auto-remplissage owner_id sur organizations
-- Date: 2026-01-13
-- Description: Ajoute trigger pour auto-remplir owner_id = auth.uid()
-- =====================================================================

-- 1) Créer ou remplacer la fonction de remplissage owner_id
CREATE OR REPLACE FUNCTION auto_set_owner_id()
RETURNS TRIGGER AS $$
BEGIN
  -- Si owner_id n'est pas fourni, utiliser l'utilisateur authentifié
  IF NEW.owner_id IS NULL THEN
    NEW.owner_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2) Supprimer l'ancien trigger s'il existe
DROP TRIGGER IF EXISTS trg_organizations_auto_owner ON public.organizations;

-- 3) Créer le nouveau trigger
CREATE TRIGGER trg_organizations_auto_owner
BEFORE INSERT ON public.organizations
FOR EACH ROW
EXECUTE FUNCTION auto_set_owner_id();

-- 4) Vérifier la table organizations
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'organizations'
  AND column_name IN ('id', 'owner_id', 'name')
ORDER BY ordinal_position;

-- 5) Vérifier le trigger
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table
FROM information_schema.triggers
WHERE event_object_table = 'organizations'
  AND trigger_name = 'trg_organizations_auto_owner';

-- =====================================================================
-- FIN DE LA CORRECTION
-- =====================================================================
