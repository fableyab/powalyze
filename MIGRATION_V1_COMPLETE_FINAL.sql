-- =====================================================================
-- SCRIPT COMPLET CORRECTION ARCHITECTURE V1
-- Date: 2026-01-13
-- Version: FINALE
-- Description: Corrige TOUS les problèmes en une seule exécution
-- =====================================================================

-- =====================================================================
-- PARTIE 1: FONCTION ET TRIGGER OWNER_ID
-- =====================================================================

-- Créer fonction auto-remplissage owner_id
CREATE OR REPLACE FUNCTION auto_set_owner_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.owner_id IS NULL THEN
    NEW.owner_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Supprimer ancien trigger
DROP TRIGGER IF EXISTS trg_organizations_auto_owner ON public.organizations;

-- Créer nouveau trigger
CREATE TRIGGER trg_organizations_auto_owner
BEFORE INSERT ON public.organizations
FOR EACH ROW
EXECUTE FUNCTION auto_set_owner_id();

-- =====================================================================
-- PARTIE 2: COLONNES SUPPLÉMENTAIRES INITIATIVES
-- =====================================================================

ALTER TABLE public.initiatives
ADD COLUMN IF NOT EXISTS strategic_alignment integer,
ADD COLUMN IF NOT EXISTS risk_score numeric,
ADD COLUMN IF NOT EXISTS forecast_cost numeric,
ADD COLUMN IF NOT EXISTS forecast_date date;

CREATE INDEX IF NOT EXISTS initiatives_strategic_alignment_idx ON public.initiatives (strategic_alignment);
CREATE INDEX IF NOT EXISTS initiatives_risk_score_idx ON public.initiatives (risk_score);

-- =====================================================================
-- PARTIE 3: COLONNES RISKS (SANS GENERATED ALWAYS)
-- =====================================================================

-- Supprimer colonne score si existe (problème avec GENERATED ALWAYS)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'risks' 
    AND column_name = 'score'
  ) THEN
    ALTER TABLE public.risks DROP COLUMN score;
  END IF;
END $$;

-- Ajouter colonnes sans GENERATED ALWAYS
ALTER TABLE public.risks
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS mitigation text,
ADD COLUMN IF NOT EXISTS owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS risks_category_idx ON public.risks (category);
CREATE INDEX IF NOT EXISTS risks_owner_idx ON public.risks (owner_id);

-- =====================================================================
-- PARTIE 4: COLONNES DECISIONS
-- =====================================================================

ALTER TABLE public.decisions
ADD COLUMN IF NOT EXISTS initiative_id uuid REFERENCES public.initiatives(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS decisions_initiative_idx ON public.decisions (initiative_id);

-- =====================================================================
-- PARTIE 5: TABLES GOVERNANCE
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.governance_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  cadence text,
  deliverables jsonb,
  indicators jsonb,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS governance_templates_workspace_idx ON public.governance_templates (workspace_id);
CREATE INDEX IF NOT EXISTS governance_templates_created_by_idx ON public.governance_templates (created_by);

CREATE TABLE IF NOT EXISTS public.rituals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  type text NOT NULL,
  frequency text,
  participants jsonb,
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
  status text DEFAULT 'planned',
  dependency_id uuid REFERENCES public.roadmap_items(id) ON DELETE SET NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS roadmap_items_initiative_idx ON public.roadmap_items (initiative_id);
CREATE INDEX IF NOT EXISTS roadmap_items_status_idx ON public.roadmap_items (status);
CREATE INDEX IF NOT EXISTS roadmap_items_dependency_idx ON public.roadmap_items (dependency_id);

-- =====================================================================
-- PARTIE 6: TABLES DATA
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.data_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  source text NOT NULL,
  table_name text NOT NULL,
  description text,
  owner text,
  sensitivity text,
  quality_score integer,
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
  job_type text NOT NULL,
  status text DEFAULT 'pending',
  config jsonb,
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
  type text NOT NULL,
  config jsonb,
  last_sync timestamptz,
  sync_status text,
  error_message text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS external_sources_workspace_idx ON public.external_sources (workspace_id);
CREATE INDEX IF NOT EXISTS external_sources_type_idx ON public.external_sources (type);
CREATE INDEX IF NOT EXISTS external_sources_sync_status_idx ON public.external_sources (sync_status);

-- =====================================================================
-- PARTIE 7: ACTIVER RLS
-- =====================================================================

ALTER TABLE public.governance_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rituals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_sources ENABLE ROW LEVEL SECURITY;

-- =====================================================================
-- PARTIE 8: TRIGGERS AUTO-FILL CREATED_BY
-- =====================================================================

DROP TRIGGER IF EXISTS trg_gov_templates_created_by ON governance_templates;
CREATE TRIGGER trg_gov_templates_created_by
BEFORE INSERT ON governance_templates
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

DROP TRIGGER IF EXISTS trg_rituals_created_by ON rituals;
CREATE TRIGGER trg_rituals_created_by
BEFORE INSERT ON rituals
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

DROP TRIGGER IF EXISTS trg_roadmap_items_created_by ON roadmap_items;
CREATE TRIGGER trg_roadmap_items_created_by
BEFORE INSERT ON roadmap_items
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

DROP TRIGGER IF EXISTS trg_data_catalog_created_by ON data_catalog;
CREATE TRIGGER trg_data_catalog_created_by
BEFORE INSERT ON data_catalog
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

DROP TRIGGER IF EXISTS trg_external_sources_created_by ON external_sources;
CREATE TRIGGER trg_external_sources_created_by
BEFORE INSERT ON external_sources
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

-- =====================================================================
-- PARTIE 9: RLS POLICIES (VERSION SIMPLIFIÉE)
-- =====================================================================

-- Governance Templates
DROP POLICY IF EXISTS gov_templates_insert ON governance_templates;
DROP POLICY IF EXISTS gov_templates_select ON governance_templates;
DROP POLICY IF EXISTS gov_templates_update ON governance_templates;
DROP POLICY IF EXISTS gov_templates_delete ON governance_templates;

CREATE POLICY gov_templates_all ON governance_templates FOR ALL TO authenticated
USING (workspace_id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid()))
WITH CHECK (workspace_id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid()));

-- Rituals
DROP POLICY IF EXISTS rituals_insert ON rituals;
DROP POLICY IF EXISTS rituals_select ON rituals;
DROP POLICY IF EXISTS rituals_update ON rituals;
DROP POLICY IF EXISTS rituals_delete ON rituals;

CREATE POLICY rituals_all ON rituals FOR ALL TO authenticated
USING (workspace_id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid()))
WITH CHECK (workspace_id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid()));

-- Roadmap Items
DROP POLICY IF EXISTS roadmap_items_insert ON roadmap_items;
DROP POLICY IF EXISTS roadmap_items_select ON roadmap_items;
DROP POLICY IF EXISTS roadmap_items_update ON roadmap_items;
DROP POLICY IF EXISTS roadmap_items_delete ON roadmap_items;

CREATE POLICY roadmap_items_all ON roadmap_items FOR ALL TO authenticated
USING (initiative_id IN (SELECT i.id FROM initiatives i WHERE i.workspace_id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid())))
WITH CHECK (initiative_id IN (SELECT i.id FROM initiatives i WHERE i.workspace_id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid())));

-- Data Catalog
DROP POLICY IF EXISTS data_catalog_insert ON data_catalog;
DROP POLICY IF EXISTS data_catalog_select ON data_catalog;
DROP POLICY IF EXISTS data_catalog_update ON data_catalog;
DROP POLICY IF EXISTS data_catalog_delete ON data_catalog;

CREATE POLICY data_catalog_all ON data_catalog FOR ALL TO authenticated
USING (workspace_id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid()))
WITH CHECK (workspace_id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid()));

-- Data Jobs
DROP POLICY IF EXISTS data_jobs_insert ON data_jobs;
DROP POLICY IF EXISTS data_jobs_select ON data_jobs;
DROP POLICY IF EXISTS data_jobs_update ON data_jobs;
DROP POLICY IF EXISTS data_jobs_delete ON data_jobs;

CREATE POLICY data_jobs_all ON data_jobs FOR ALL TO authenticated
USING (workspace_id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid()))
WITH CHECK (workspace_id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid()));

-- External Sources
DROP POLICY IF EXISTS external_sources_insert ON external_sources;
DROP POLICY IF EXISTS external_sources_select ON external_sources;
DROP POLICY IF EXISTS external_sources_update ON external_sources;
DROP POLICY IF EXISTS external_sources_delete ON external_sources;

CREATE POLICY external_sources_all ON external_sources FOR ALL TO authenticated
USING (workspace_id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid()))
WITH CHECK (workspace_id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid()));

-- =====================================================================
-- PARTIE 10: VUES ANALYTIQUES
-- =====================================================================

-- Vue Portfolio
DROP VIEW IF EXISTS public.portfolio_overview;
CREATE VIEW public.portfolio_overview AS
SELECT
  i.workspace_id,
  COUNT(*) as total_projects,
  COALESCE(SUM(i.budget), 0) as total_budget,
  COALESCE(AVG(i.risk_score), 0) as avg_risk,
  COUNT(*) FILTER (WHERE i.status = 'done') as done_projects,
  COUNT(*) FILTER (WHERE i.status = 'in_progress') as in_progress_projects,
  COUNT(*) FILTER (WHERE i.status = 'blocked') as blocked_projects,
  COALESCE(AVG(i.strategic_alignment), 0) as strategic_alignment_avg,
  COALESCE(SUM(i.forecast_cost), 0) as forecast_total_cost
FROM public.initiatives i
GROUP BY i.workspace_id;

-- Vue Risk Matrix (avec calcul dynamique du score)
DROP VIEW IF EXISTS public.risk_matrix_view;
CREATE VIEW public.risk_matrix_view AS
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

-- Vue Forecast
DROP VIEW IF EXISTS public.forecast_view;
CREATE VIEW public.forecast_view AS
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

-- Vue Anomalies
DROP VIEW IF EXISTS public.anomalies_view;
CREATE VIEW public.anomalies_view AS
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
WHERE r.updated_at < now() - INTERVAL '30 days' AND r.status = 'open'

UNION ALL

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
WHERE i.status IN ('in_progress', 'planned') AND ri.id IS NULL;

-- =====================================================================
-- PARTIE 11: VÉRIFICATIONS FINALES
-- =====================================================================

-- Tables
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public' AND tablename IN (
  'governance_templates', 'rituals', 'roadmap_items',
  'data_catalog', 'data_jobs', 'external_sources'
) ORDER BY tablename;

-- Policies
SELECT tablename, COUNT(*) as policies_count FROM pg_policies
WHERE tablename IN (
  'governance_templates', 'rituals', 'roadmap_items',
  'data_catalog', 'data_jobs', 'external_sources'
) GROUP BY tablename ORDER BY tablename;

-- Triggers
SELECT event_object_table, trigger_name FROM information_schema.triggers
WHERE event_object_table IN (
  'organizations', 'governance_templates', 'rituals', 'roadmap_items',
  'data_catalog', 'external_sources'
) ORDER BY event_object_table;

-- Vues
SELECT viewname FROM pg_views
WHERE schemaname = 'public' AND viewname IN (
  'portfolio_overview', 'risk_matrix_view', 'forecast_view', 'anomalies_view'
) ORDER BY viewname;

-- =====================================================================
-- FIN - TOUT EST CONFIGURÉ
-- =====================================================================
