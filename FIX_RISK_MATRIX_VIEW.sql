-- =====================================================================
-- FIX: Correction vue risk_matrix_view
-- Date: 2026-01-13
-- Description: Corrige la vue en supprimant la colonne GENERATED et recréant la vue
-- =====================================================================

-- 1) Supprimer l'ancienne vue si elle existe
DROP VIEW IF EXISTS public.risk_matrix_view;

-- 2) Vérifier si la colonne score existe déjà
DO $$
BEGIN
  -- Supprimer la colonne score si elle existe (car GENERATED ALWAYS pose problème)
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'risks' 
    AND column_name = 'score'
  ) THEN
    ALTER TABLE public.risks DROP COLUMN score;
  END IF;
END $$;

-- 3) Ajouter les colonnes manquantes (sans GENERATED ALWAYS pour score)
ALTER TABLE public.risks
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS mitigation text,
ADD COLUMN IF NOT EXISTS owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Créer les index
CREATE INDEX IF NOT EXISTS risks_category_idx ON public.risks (category);
CREATE INDEX IF NOT EXISTS risks_owner_idx ON public.risks (owner_id);

-- 4) Recréer la vue risk_matrix_view avec calcul dynamique du score
CREATE OR REPLACE VIEW public.risk_matrix_view AS
SELECT
  r.id as risk_id,
  r.initiative_id,
  i.name as initiative_name,
  i.workspace_id,
  r.name as risk_name,
  CAST(r.probability AS integer) as probability,
  CAST(r.impact AS integer) as impact,
  (CAST(r.probability AS integer) * CAST(r.impact AS integer)) as score,
  r.category,
  r.status,
  r.owner_id,
  r.mitigation
FROM public.risks r
JOIN public.initiatives i ON i.id = r.initiative_id
WHERE r.status = 'open';

-- 5) Vérifier la vue
SELECT 
  schemaname,
  viewname
FROM pg_views
WHERE schemaname = 'public'
  AND viewname = 'risk_matrix_view';

-- 6) Tester la vue (devrait retourner 0 lignes si pas de risques)
SELECT COUNT(*) as total_risks FROM public.risk_matrix_view;

-- =====================================================================
-- FIN DE LA CORRECTION
-- =====================================================================
