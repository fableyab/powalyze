-- =====================================================================
-- MIGRATION ARCHITECTURE COMPLÈTE V1
-- Date: 2026-01-13
-- Version: 1.0
-- Description: Crée toutes les tables manquantes + vues analytiques
-- Prérequis: MIGRATION_WORKSPACES_COMPLETE_RLS.sql déjà appliquée
-- =====================================================================

-- =====================================================================
-- 1) AJOUTER COLONNES MANQUANTES SUR TABLES EXISTANTES
-- =====================================================================

-- Initiatives — Colonnes stratégiques et prévisions
ALTER TABLE public.initiatives
ADD COLUMN IF NOT EXISTS strategic_alignment integer,
ADD COLUMN IF NOT EXISTS risk_score numeric,
ADD COLUMN IF NOT EXISTS forecast_cost numeric,
ADD COLUMN IF NOT EXISTS forecast_date date;

CREATE INDEX IF NOT EXISTS initiatives_strategic_alignment_idx ON public.initiatives (strategic_alignment);
CREATE INDEX IF NOT EXISTS initiatives_risk_score_idx ON public.initiatives (risk_score);

-- Risks — Colonnes score, category, mitigation, owner
ALTER TABLE public.risks
ADD COLUMN IF NOT EXISTS score integer GENERATED ALWAYS AS (CAST(probability AS integer) * CAST(impact AS integer)) STORED,
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS mitigation text,
ADD COLUMN IF NOT EXISTS owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS risks_score_idx ON public.risks (score);
CREATE INDEX IF NOT EXISTS risks_category_idx ON public.risks (category);
CREATE INDEX IF NOT EXISTS risks_owner_idx ON public.risks (owner_id);

-- Decisions — Ajouter initiative_id si manquant
ALTER TABLE public.decisions
ADD COLUMN IF NOT EXISTS initiative_id uuid REFERENCES public.initiatives(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS decisions_initiative_idx ON public.decisions (initiative_id);

-- =====================================================================
-- 2) CRÉER TABLES GOVERNANCE
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.governance_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  cadence text, -- weekly, monthly, quarterly
  deliverables jsonb, -- Liste des livrables attendus
  indicators jsonb, -- Liste des KPI à suivre
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS governance_templates_workspace_idx ON public.governance_templates (workspace_id);
CREATE INDEX IF NOT EXISTS governance_templates_created_by_idx ON public.governance_templates (created_by);

CREATE TABLE IF NOT EXISTS public.rituals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  type text NOT NULL, -- comex, codir, steering, review
  frequency text, -- weekly, monthly, quarterly
  participants jsonb, -- Liste des participants {user_id, role}
  next_date date,
  notes text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS rituals_workspace_idx ON public.rituals (workspace_id);
CREATE INDEX IF NOT EXISTS rituals_type_idx ON public.rituals (type);
CREATE INDEX IF NOT EXISTS rituals_next_date_idx ON public.rituals (next_date);

CREATE TABLE IF NOT EXISTS public.roadmap_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  initiative_id uuid NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  start_date date,
  end_date date,
  status text DEFAULT 'planned', -- planned, in_progress, done, blocked
  dependency_id uuid REFERENCES public.roadmap_items(id) ON DELETE SET NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS roadmap_items_initiative_idx ON public.roadmap_items (initiative_id);
CREATE INDEX IF NOT EXISTS roadmap_items_status_idx ON public.roadmap_items (status);
CREATE INDEX IF NOT EXISTS roadmap_items_dependency_idx ON public.roadmap_items (dependency_id);

-- =====================================================================
-- 3) CRÉER TABLES DATA & POWER BI
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.data_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  source text NOT NULL, -- supabase, jira, sap, monday, excel
  table_name text NOT NULL,
  description text,
  owner text,
  sensitivity text, -- public, confidential, restricted
  quality_score integer, -- 0-100
  last_updated timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS data_catalog_workspace_idx ON public.data_catalog (workspace_id);
CREATE INDEX IF NOT EXISTS data_catalog_source_idx ON public.data_catalog (source);
CREATE INDEX IF NOT EXISTS data_catalog_quality_idx ON public.data_catalog (quality_score);

CREATE TABLE IF NOT EXISTS public.data_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  job_type text NOT NULL, -- sync, transform, export
  status text DEFAULT 'pending', -- pending, running, success, failed
  config jsonb, -- Configuration du job
  last_run timestamptz,
  next_run timestamptz,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS data_jobs_workspace_idx ON public.data_jobs (workspace_id);
CREATE INDEX IF NOT EXISTS data_jobs_status_idx ON public.data_jobs (status);
CREATE INDEX IF NOT EXISTS data_jobs_next_run_idx ON public.data_jobs (next_run);

CREATE TABLE IF NOT EXISTS public.external_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  type text NOT NULL, -- jira, sap, monday, excel, csv
  config jsonb, -- Credentials, endpoints, mapping
  last_sync timestamptz,
  sync_status text, -- success, failed, pending
  error_message text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS external_sources_workspace_idx ON public.external_sources (workspace_id);
CREATE INDEX IF NOT EXISTS external_sources_type_idx ON public.external_sources (type);
CREATE INDEX IF NOT EXISTS external_sources_sync_status_idx ON public.external_sources (sync_status);

-- =====================================================================
-- 4) ACTIVER RLS SUR NOUVELLES TABLES
-- =====================================================================

ALTER TABLE public.governance_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rituals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_sources ENABLE ROW LEVEL SECURITY;

-- =====================================================================
-- 5) TRIGGER AUTO-FILL created_by SUR NOUVELLES TABLES
-- =====================================================================

-- Réutiliser la fonction auto_set_created_by() existante
CREATE TRIGGER trg_gov_templates_created_by
BEFORE INSERT ON governance_templates
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

CREATE TRIGGER trg_rituals_created_by
BEFORE INSERT ON rituals
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

CREATE TRIGGER trg_roadmap_items_created_by
BEFORE INSERT ON roadmap_items
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

CREATE TRIGGER trg_data_catalog_created_by
BEFORE INSERT ON data_catalog
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

CREATE TRIGGER trg_external_sources_created_by
BEFORE INSERT ON external_sources
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

-- =====================================================================
-- 6) RLS POLICIES — GOVERNANCE_TEMPLATES
-- =====================================================================

CREATE POLICY gov_templates_insert
ON governance_templates
FOR INSERT
TO authenticated
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY gov_templates_select
ON governance_templates
FOR SELECT
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY gov_templates_update
ON governance_templates
FOR UPDATE
TO authenticated
USING (
  created_by = auth.uid()
  AND workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  created_by = auth.uid()
  AND workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY gov_templates_delete
ON governance_templates
FOR DELETE
TO authenticated
USING (
  created_by = auth.uid()
  AND workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

-- =====================================================================
-- 7) RLS POLICIES — RITUALS
-- =====================================================================

CREATE POLICY rituals_insert
ON rituals
FOR INSERT
TO authenticated
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY rituals_select
ON rituals
FOR SELECT
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY rituals_update
ON rituals
FOR UPDATE
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY rituals_delete
ON rituals
FOR DELETE
TO authenticated
USING (
  created_by = auth.uid()
  AND workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

-- =====================================================================
-- 8) RLS POLICIES — ROADMAP_ITEMS
-- =====================================================================

CREATE POLICY roadmap_items_insert
ON roadmap_items
FOR INSERT
TO authenticated
WITH CHECK (
  initiative_id IN (
    SELECT i.id FROM initiatives i
    WHERE i.workspace_id IN (
      SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY roadmap_items_select
ON roadmap_items
FOR SELECT
TO authenticated
USING (
  initiative_id IN (
    SELECT i.id FROM initiatives i
    WHERE i.workspace_id IN (
      SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY roadmap_items_update
ON roadmap_items
FOR UPDATE
TO authenticated
USING (
  initiative_id IN (
    SELECT i.id FROM initiatives i
    WHERE i.workspace_id IN (
      SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
    )
  )
)
WITH CHECK (
  initiative_id IN (
    SELECT i.id FROM initiatives i
    WHERE i.workspace_id IN (
      SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY roadmap_items_delete
ON roadmap_items
FOR DELETE
TO authenticated
USING (
  created_by = auth.uid()
  AND initiative_id IN (
    SELECT i.id FROM initiatives i
    WHERE i.workspace_id IN (
      SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
    )
  )
);

-- =====================================================================
-- 9) RLS POLICIES — DATA_CATALOG
-- =====================================================================

CREATE POLICY data_catalog_insert
ON data_catalog
FOR INSERT
TO authenticated
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY data_catalog_select
ON data_catalog
FOR SELECT
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY data_catalog_update
ON data_catalog
FOR UPDATE
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY data_catalog_delete
ON data_catalog
FOR DELETE
TO authenticated
USING (
  created_by = auth.uid()
  AND workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

-- =====================================================================
-- 10) RLS POLICIES — DATA_JOBS
-- =====================================================================

CREATE POLICY data_jobs_insert
ON data_jobs
FOR INSERT
TO authenticated
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY data_jobs_select
ON data_jobs
FOR SELECT
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY data_jobs_update
ON data_jobs
FOR UPDATE
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY data_jobs_delete
ON data_jobs
FOR DELETE
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

-- =====================================================================
-- 11) RLS POLICIES — EXTERNAL_SOURCES
-- =====================================================================

CREATE POLICY external_sources_insert
ON external_sources
FOR INSERT
TO authenticated
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY external_sources_select
ON external_sources
FOR SELECT
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY external_sources_update
ON external_sources
FOR UPDATE
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY external_sources_delete
ON external_sources
FOR DELETE
TO authenticated
USING (
  created_by = auth.uid()
  AND workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

-- =====================================================================
-- 12) VUES ANALYTIQUES
-- =====================================================================

-- Vue: Aperçu global du portefeuille
CREATE OR REPLACE VIEW public.portfolio_overview AS
SELECT
  i.workspace_id,
  COUNT(*) as total_projects,
  SUM(i.budget) as total_budget,
  AVG(i.risk_score) as avg_risk,
  COUNT(*) FILTER (WHERE i.status = 'done') as done_projects,
  COUNT(*) FILTER (WHERE i.status = 'in_progress') as in_progress_projects,
  COUNT(*) FILTER (WHERE i.status = 'blocked') as blocked_projects,
  AVG(i.strategic_alignment) as strategic_alignment_avg,
  SUM(i.forecast_cost) as forecast_total_cost
FROM public.initiatives i
GROUP BY i.workspace_id;

-- Vue: Matrice des risques
CREATE OR REPLACE VIEW public.risk_matrix_view AS
SELECT
  r.id as risk_id,
  r.initiative_id,
  i.name as initiative_name,
  i.workspace_id,
  r.name as risk_name,
  CAST(r.probability AS integer) as probability,
  CAST(r.impact AS integer) as impact,
  r.score,
  r.category,
  r.status,
  r.owner_id,
  r.mitigation
FROM public.risks r
JOIN public.initiatives i ON i.id = r.initiative_id
WHERE r.status = 'open';

-- Vue: Prévisions d'atterrissage
CREATE OR REPLACE VIEW public.forecast_view AS
SELECT
  i.id as initiative_id,
  i.workspace_id,
  i.name,
  i.budget,
  i.forecast_cost,
  i.forecast_date,
  i.end_date,
  (i.forecast_cost - i.budget) as variance_vs_budget,
  CASE
    WHEN i.forecast_cost > i.budget * 1.1 THEN 'critical'
    WHEN i.forecast_cost > i.budget THEN 'warning'
    ELSE 'ok'
  END as budget_status,
  CASE
    WHEN i.forecast_date > i.end_date THEN 'delayed'
    WHEN i.forecast_date = i.end_date THEN 'on_track'
    WHEN i.forecast_date < i.end_date THEN 'ahead'
    ELSE 'unknown'
  END as schedule_status
FROM public.initiatives i
WHERE i.forecast_cost IS NOT NULL OR i.forecast_date IS NOT NULL;

-- Vue: Détection d'anomalies
CREATE OR REPLACE VIEW public.anomalies_view AS
-- Anomalie: Retard sur projets en cours
SELECT
  i.id as initiative_id,
  i.workspace_id,
  i.name as initiative_name,
  'retard' as type,
  'Fin prévue dépassée — projet toujours en cours' as description,
  'high' as severity,
  now() as detected_at
FROM public.initiatives i
WHERE i.status = 'in_progress' AND i.end_date < now()

UNION ALL

-- Anomalie: Risques non mis à jour depuis 30 jours
SELECT
  i.id as initiative_id,
  i.workspace_id,
  i.name as initiative_name,
  'risque_non_maj' as type,
  'Risques non mis à jour depuis 30 jours' as description,
  'medium' as severity,
  now() as detected_at
FROM public.initiatives i
JOIN public.risks r ON r.initiative_id = i.id
WHERE r.updated_at < now() - INTERVAL '30 days'
  AND r.status = 'open'

UNION ALL

-- Anomalie: Dépassement budget prévisionnel > 10%
SELECT
  i.id as initiative_id,
  i.workspace_id,
  i.name as initiative_name,
  'depassement' as type,
  'Dépassement budget prévisionnel > 10%' as description,
  'critical' as severity,
  now() as detected_at
FROM public.initiatives i
WHERE i.forecast_cost > i.budget * 1.1

UNION ALL

-- Anomalie: Initiatives sans roadmap items
SELECT
  i.id as initiative_id,
  i.workspace_id,
  i.name as initiative_name,
  'roadmap_manquante' as type,
  'Aucun élément de roadmap défini' as description,
  'low' as severity,
  now() as detected_at
FROM public.initiatives i
LEFT JOIN public.roadmap_items ri ON ri.initiative_id = i.id
WHERE i.status IN ('in_progress', 'planned')
  AND ri.id IS NULL;

-- =====================================================================
-- 13) VÉRIFICATIONS
-- =====================================================================

-- Vérifier les nouvelles tables
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'governance_templates', 'rituals', 'roadmap_items',
    'data_catalog', 'data_jobs', 'external_sources'
  )
ORDER BY tablename;

-- Vérifier les nouvelles policies
SELECT 
  tablename,
  COUNT(*) as policies_count
FROM pg_policies
WHERE tablename IN (
  'governance_templates', 'rituals', 'roadmap_items',
  'data_catalog', 'data_jobs', 'external_sources'
)
GROUP BY tablename
ORDER BY tablename;

-- Vérifier les triggers
SELECT 
  event_object_table as table_name,
  trigger_name,
  event_manipulation as event_type
FROM information_schema.triggers
WHERE event_object_table IN (
  'governance_templates', 'rituals', 'roadmap_items',
  'data_catalog', 'external_sources'
)
ORDER BY event_object_table;

-- Vérifier les vues
SELECT 
  schemaname,
  viewname
FROM pg_views
WHERE schemaname = 'public'
  AND viewname IN (
    'portfolio_overview', 'risk_matrix_view', 
    'forecast_view', 'anomalies_view'
  )
ORDER BY viewname;

-- =====================================================
-- FIN DE LA MIGRATION
-- =====================================================
