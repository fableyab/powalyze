
-- Migration: 004_helper_functions.sql
-- Description: Advanced helper functions, views, and compliance logic.

-- 1) KPI FUNCTION
CREATE OR REPLACE FUNCTION public.get_tenant_kpi(t_id UUID)
RETURNS TABLE (
  total_projects BIGINT,
  active_projects BIGINT,
  budget_total NUMERIC,
  budget_spent NUMERIC,
  avg_risk TEXT,
  on_time_pct NUMERIC
) AS $$
BEGIN
  RETURN QUERY SELECT
    COUNT(*),
    COUNT(*) FILTER (WHERE status = 'in_progress'),
    SUM(budget_planned),
    SUM(budget_actual),
    mode() WITHIN GROUP (ORDER BY risk) AS avg_risk,
    (COUNT(*) FILTER (WHERE end_date >= NOW()) / NULLIF(COUNT(*), 0)::NUMERIC) * 100
  FROM public.projects
  WHERE tenant_id = t_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 2) PROJECT HEALTH
CREATE OR REPLACE FUNCTION public.get_project_health(p_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_budget_var NUMERIC;
  v_risk_score INTEGER;
  v_health INTEGER;
  r RECORD;
BEGIN
  SELECT * INTO r FROM public.projects WHERE id = p_id;
  
  IF r.budget_planned > 0 THEN
    v_budget_var := (r.budget_actual / r.budget_planned) * 100;
  ELSE
    v_budget_var := 0;
  END IF;

  v_risk_score := CASE 
    WHEN r.risk = 'Critical' THEN 40 
    WHEN r.risk = 'High' THEN 30 
    WHEN r.risk = 'Medium' THEN 20 
    ELSE 10 END;

  v_health := 100 - (CASE WHEN v_budget_var > 110 THEN 30 ELSE 0 END) - v_risk_score;
  IF v_health < 0 THEN v_health := 0; END IF;
  
  RETURN v_health;
END;
$$ LANGUAGE plpgsql STABLE;

-- 3) COMPLIANCE & RETENTION LOGIC
-- Function to clean old audit logs (Retention Policy)
CREATE OR REPLACE FUNCTION public.fn_cleanup_old_audit_logs(days_threshold INTEGER DEFAULT 2555) -- 7 years default
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.audit_logs 
  WHERE created_at < NOW() - (days_threshold || ' days')::INTERVAL
  RETURNING count(*) INTO deleted_count;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- GDPR Export Function
CREATE OR REPLACE FUNCTION public.fn_gdpr_export_user_data(target_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_profile JSONB;
  v_audit_logs JSONB;
  v_documents JSONB;
BEGIN
  SELECT row_to_json(p) INTO v_profile FROM public.profiles p WHERE id = target_user_id;
  SELECT jsonb_agg(row_to_json(a)) INTO v_audit_logs FROM public.audit_logs a WHERE user_id = target_user_id;
  SELECT jsonb_agg(row_to_json(d)) INTO v_documents FROM public.documents d WHERE uploaded_by = target_user_id;

  RETURN jsonb_build_object(
    'profile', v_profile,
    'audit_logs', v_audit_logs,
    'documents', v_documents,
    'exported_at', NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4) VIEWS
CREATE OR REPLACE VIEW public.v_project_summary AS
SELECT
  p.id,
  p.name,
  p.tenant_id,
  p.status,
  p.risk,
  (p.end_date - CURRENT_DATE) AS days_remaining,
  (p.budget_planned - p.budget_actual) AS budget_variance,
  public.get_project_health(p.id) AS health_score
FROM public.projects p;

CREATE OR REPLACE VIEW public.v_audit_summary AS
SELECT
  tenant_id,
  action,
  entity_type,
  COUNT(*) as frequency,
  MAX(created_at) as last_occurrence
FROM public.audit_logs
GROUP BY tenant_id, action, entity_type;

-- 5) Data Classification Helpers
CREATE TABLE IF NOT EXISTS public.data_classification (
    table_name TEXT NOT NULL,
    column_name TEXT NOT NULL,
    classification_level TEXT DEFAULT 'Internal', -- Public, Internal, Confidential, Restricted
    PRIMARY KEY (table_name, column_name)
);

CREATE OR REPLACE FUNCTION public.fn_classify_data(p_table TEXT, p_column TEXT, p_level TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.data_classification (table_name, column_name, classification_level)
  VALUES (p_table, p_column, p_level)
  ON CONFLICT (table_name, column_name) 
  DO UPDATE SET classification_level = EXCLUDED.classification_level;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
