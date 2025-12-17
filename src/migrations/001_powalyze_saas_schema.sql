-- ============================================================================
-- POWALYZE PREMIUM SAAS SCHEMA
-- Version: 1.0
-- Created: 2025-12-16
-- Purpose: Complete data model for Powalyze SaaS platform
-- Includes: Organizations, Users, Projects, Health Passports, Risks,
--           KPIs, Decision Engine, Predictive PMO, Maturity Scan,
--           PMO DNA, Digital Twin, Multiverse Scenarios, Genome Editor,
--           Strategic Pulse
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "timescaledb";

-- ============================================================================
-- 1. ORGANIZATIONS TABLE
-- Core tenant table for multi-tenant architecture
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT, -- banking, energy, trading, healthcare, etc.
  size TEXT, -- small, medium, large, enterprise
  country TEXT,
  language TEXT DEFAULT 'en', -- en, fr, de, es
  logo_url TEXT,
  subscription_plan TEXT DEFAULT 'starter' CHECK (subscription_plan IN ('starter', 'professional', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'trial', 'paused', 'cancelled')),
  max_users INTEGER DEFAULT 5,
  max_projects INTEGER DEFAULT 50,
  features JSONB DEFAULT '{}'::jsonb, -- activated features
  settings JSONB DEFAULT '{}'::jsonb, -- org preferences
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_organizations_name ON public.organizations(name);
CREATE INDEX idx_organizations_industry ON public.organizations(industry);
CREATE INDEX idx_organizations_subscription_status ON public.organizations(subscription_status);

-- ============================================================================
-- 2. USERS TABLE
-- Users with organization membership and role-based access
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE NOT NULL, -- Supabase Auth reference
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'analyst', 'viewer')) DEFAULT 'viewer',
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_users_organization_id ON public.users(organization_id);
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_auth_id ON public.users(auth_id);
CREATE INDEX idx_users_is_active ON public.users(is_active);

-- ============================================================================
-- 3. PROJECTS TABLE
-- Core project management with strategic alignment
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'blocked', 'completed', 'on_hold')) DEFAULT 'not_started',
  priority TEXT CHECK (priority IN ('critical', 'high', 'medium', 'low')) DEFAULT 'medium',
  start_date DATE,
  end_date DATE,
  budget NUMERIC,
  actual_spend NUMERIC DEFAULT 0,
  value NUMERIC, -- expected business value
  realized_value NUMERIC DEFAULT 0, -- actual business value
  strategic_alignment NUMERIC CHECK (strategic_alignment BETWEEN 0 AND 100),
  owner_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_projects_organization_id ON public.projects(organization_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_priority ON public.projects(priority);
CREATE INDEX idx_projects_owner_id ON public.projects(owner_id);

-- ============================================================================
-- 4. PROJECT HEALTH PASSPORT
-- Multi-dimensional health scoring for projects
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.project_health_passport (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  health_score NUMERIC CHECK (health_score BETWEEN 0 AND 100),
  risk_score NUMERIC CHECK (risk_score BETWEEN 0 AND 100),
  budget_score NUMERIC CHECK (budget_score BETWEEN 0 AND 100),
  timeline_score NUMERIC CHECK (timeline_score BETWEEN 0 AND 100),
  value_score NUMERIC CHECK (value_score BETWEEN 0 AND 100),
  quality_score NUMERIC CHECK (quality_score BETWEEN 0 AND 100),
  stakeholder_satisfaction NUMERIC CHECK (stakeholder_satisfaction BETWEEN 0 AND 100),
  health_status TEXT GENERATED ALWAYS AS (
    CASE 
      WHEN health_score >= 80 THEN 'excellent'
      WHEN health_score >= 60 THEN 'good'
      WHEN health_score >= 40 THEN 'at_risk'
      ELSE 'critical'
    END
  ) STORED,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_project_health_passport_project_id ON public.project_health_passport(project_id);
CREATE INDEX idx_project_health_passport_health_score ON public.project_health_passport(health_score);

-- ============================================================================
-- 5. RISKS TABLE
-- Risk tracking with probability × impact severity calculation
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.risks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('technical', 'schedule', 'budget', 'resource', 'stakeholder', 'external')),
  probability NUMERIC CHECK (probability BETWEEN 0 AND 100) NOT NULL,
  impact NUMERIC CHECK (impact BETWEEN 0 AND 100) NOT NULL,
  severity NUMERIC GENERATED ALWAYS AS (probability * impact / 100) STORED,
  status TEXT NOT NULL CHECK (status IN ('open', 'mitigated', 'closed', 'escalated')) DEFAULT 'open',
  mitigation_plan TEXT,
  owner_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_risks_project_id ON public.risks(project_id);
CREATE INDEX idx_risks_status ON public.risks(status);
CREATE INDEX idx_risks_severity ON public.risks(severity);

-- ============================================================================
-- 6. PROJECT DEPENDENCIES
-- Track inter-project dependencies and constraints
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.project_dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  depends_on_project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  dependency_type TEXT CHECK (dependency_type IN ('finish_to_start', 'start_to_start', 'finish_to_finish', 'start_to_finish')) DEFAULT 'finish_to_start',
  lag_days INTEGER DEFAULT 0,
  is_critical BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  CONSTRAINT no_self_dependency CHECK (project_id != depends_on_project_id)
);

CREATE INDEX idx_project_dependencies_project_id ON public.project_dependencies(project_id);
CREATE INDEX idx_project_dependencies_depends_on ON public.project_dependencies(depends_on_project_id);

-- ============================================================================
-- 7. KPIs TABLE
-- Key Performance Indicators tracking
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  value NUMERIC,
  target NUMERIC,
  unit TEXT NOT NULL, -- %, days, $, count, etc.
  baseline NUMERIC, -- starting value for trend calculation
  threshold_warning NUMERIC, -- alert threshold
  threshold_critical NUMERIC, -- critical threshold
  status TEXT GENERATED ALWAYS AS (
    CASE 
      WHEN target IS NULL OR value IS NULL THEN 'undefined'
      WHEN value >= target THEN 'on_track'
      WHEN value >= target * 0.8 THEN 'at_risk'
      ELSE 'critical'
    END
  ) STORED,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_kpis_project_id ON public.kpis(project_id);
CREATE INDEX idx_kpis_status ON public.kpis(status);

-- ============================================================================
-- 8. DECISION ENGINE RESULTS
-- AI/ML-powered go/no-go recommendations
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.decision_engine_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  recommendation TEXT NOT NULL CHECK (recommendation IN ('go', 'no_go', 'delay', 'reprioritize', 'optimize')),
  score NUMERIC CHECK (score BETWEEN 0 AND 100) NOT NULL,
  confidence NUMERIC CHECK (confidence BETWEEN 0 AND 100),
  justification TEXT,
  factors JSONB, -- {health: 0.7, risk: 0.3, value: 0.8, ...}
  model_version TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_decision_engine_project_id ON public.decision_engine_results(project_id);
CREATE INDEX idx_decision_engine_recommendation ON public.decision_engine_results(recommendation);

-- ============================================================================
-- 9. PREDICTIVE PMO FORECASTS
-- Machine learning predictions for delays, overruns, risks
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.predictive_pmo_forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  forecast_type TEXT NOT NULL CHECK (forecast_type IN ('delay', 'budget_overrun', 'risk_spike', 'scope_creep', 'resource_shortage')),
  probability NUMERIC CHECK (probability BETWEEN 0 AND 100) NOT NULL,
  predicted_date DATE,
  impact_days INTEGER, -- estimated days of delay
  impact_cost NUMERIC, -- estimated cost impact
  confidence NUMERIC CHECK (confidence BETWEEN 0 AND 100),
  explanation TEXT,
  mitigation_suggestions TEXT,
  model_version TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_predictive_forecasts_project_id ON public.predictive_pmo_forecasts(project_id);
CREATE INDEX idx_predictive_forecasts_forecast_type ON public.predictive_pmo_forecasts(forecast_type);

-- ============================================================================
-- 10. MATURITY SCAN RESULTS
-- PMO Maturity Assessment (IPMA/OPM3 style)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.maturity_scan_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  scan_name TEXT,
  score NUMERIC CHECK (score BETWEEN 0 AND 100) NOT NULL,
  maturity_level TEXT GENERATED ALWAYS AS (
    CASE 
      WHEN score < 20 THEN 'initial'
      WHEN score < 40 THEN 'developing'
      WHEN score < 60 THEN 'established'
      WHEN score < 80 THEN 'advanced'
      ELSE 'optimizing'
    END
  ) STORED,
  dimension_scores JSONB, -- {governance: 35, delivery: 50, risk: 45, data: 40, change: 55}
  recommendations TEXT,
  action_items JSONB,
  created_by_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_maturity_scan_organization_id ON public.maturity_scan_results(organization_id);
CREATE INDEX idx_maturity_scan_maturity_level ON public.maturity_scan_results(maturity_level);

-- ============================================================================
-- 11. PMO DNA PROFILES
-- Organizational genetic profile - structure, capabilities, culture
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.pmo_dna_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  dna JSONB NOT NULL, -- {
    -- structure: {type: 'centralized|hybrid|embedded', ...},
    -- capabilities: {governance, delivery, risk, data, change, ...},
    -- maturity: {...},
    -- culture: {...},
    -- tech_stack: {...}
    -- }
  recommendations JSONB, -- [{priority: 'high', action: '...', timeline: '...'}]
  generated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_pmo_dna_organization_id ON public.pmo_dna_profiles(organization_id);

-- ============================================================================
-- 12. DIGITAL TWIN SNAPSHOTS
-- Complete portfolio state snapshots for what-if analysis
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.digital_twin_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  snapshot_name TEXT,
  snapshot JSONB NOT NULL, -- {
    -- projects: [{id, name, status, health, risk, ...}],
    -- portfolio_health: {overall, by_status, by_priority, ...},
    -- dependencies: [{...}],
    -- critical_risks: [{...}],
    -- resource_utilization: {...},
    -- value_realization: {...}
    -- }
  scenario_type TEXT DEFAULT 'current' CHECK (scenario_type IN ('current', 'baseline', 'optimized', 'predicted')),
  is_baseline BOOLEAN DEFAULT false,
  created_by_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_digital_twin_organization_id ON public.digital_twin_snapshots(organization_id);
CREATE INDEX idx_digital_twin_scenario_type ON public.digital_twin_snapshots(scenario_type);

-- ============================================================================
-- 13. MULTIVERSE SCENARIOS
-- What-if analysis: parameter-based outcome predictions
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.multiverse_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  scenario_name TEXT NOT NULL,
  scenario_type TEXT CHECK (scenario_type IN ('optimistic', 'pessimistic', 'realistic', 'custom')) DEFAULT 'custom',
  parameters JSONB NOT NULL, -- {
    -- budget_change: 0.1,
    -- timeline_change: -0.2,
    -- team_size_change: 0.05,
    -- priority_boost: true,
    -- external_risks: ['supply_chain', 'regulatory'],
    -- resource_availability: 0.8
    -- }
  predicted_outcomes JSONB, -- {
    -- new_end_date: '2025-06-30',
    -- new_cost: 150000,
    -- new_risk_score: 65,
    -- health_impact: -15,
    -- feasibility_score: 0.75,
    -- recommendations: ['...']
    -- }
  feasibility_score NUMERIC CHECK (feasibility_score BETWEEN 0 AND 100),
  comparison_to_baseline JSONB, -- differences from original plan
  created_by_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_multiverse_scenarios_project_id ON public.multiverse_scenarios(project_id);
CREATE INDEX idx_multiverse_scenarios_scenario_type ON public.multiverse_scenarios(scenario_type);

-- ============================================================================
-- 14. GENOME EDITOR STATES
-- Project genetic engineering - modify genes for optimization
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.genome_editor_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  genome JSONB NOT NULL, -- {
    -- core_genes: {priority, strategic_fit, resource_requirement, ...},
    -- health_genes: {quality, timeline_adherence, budget_control, ...},
    -- risk_genes: {identified_risks, complexity, uncertainty, ...},
    -- mutation_history: [{date, change, rationale}]
    -- }
  mutation_count INTEGER DEFAULT 0,
  last_mutation_at TIMESTAMPTZ,
  optimization_score NUMERIC CHECK (optimization_score BETWEEN 0 AND 100),
  impact_analysis JSONB, -- predicted impact of genome changes
  created_by_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_genome_editor_project_id ON public.genome_editor_states(project_id);
CREATE INDEX idx_genome_editor_optimization_score ON public.genome_editor_states(optimization_score);

-- ============================================================================
-- 15. STRATEGIC PULSE
-- Real-time organizational health: rhythm, anomalies, critical signals
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.strategic_pulse (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  pulse JSONB NOT NULL, -- {
    -- rhythm: {heartbeat_health: 0.8, regularity: 0.9, trend: 'improving'},
    -- anomalies: [{type: 'risk_spike', severity: 'high', projects: [...], timestamp: '...'}],
    -- critical_signals: [{signal: 'budget_overrun_trend', impact: 'high', affected_count: 5}],
    -- portfolio_health_trend: 'declining|stable|improving',
    -- resource_stress: {pressure_level: 0.7, bottlenecks: [...]},
    -- dependencies_stress: {critical_chains: 3, at_risk: 1},
    -- stakeholder_sentiment: 0.65,
    -- burn_rate: 0.8,
    -- recovery_time_estimate: 15
    -- }
  health_index NUMERIC CHECK (health_index BETWEEN 0 AND 100),
  health_status TEXT CHECK (health_status IN ('critical', 'at_risk', 'stable', 'excellent')) DEFAULT 'stable',
  alert_count INTEGER DEFAULT 0,
  trend TEXT CHECK (trend IN ('improving', 'stable', 'declining')) DEFAULT 'stable',
  last_alert_at TIMESTAMPTZ,
  recommendations JSONB, -- executive actions
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_strategic_pulse_organization_id ON public.strategic_pulse(organization_id);
CREATE INDEX idx_strategic_pulse_health_status ON public.strategic_pulse(health_status);
CREATE INDEX idx_strategic_pulse_trend ON public.strategic_pulse(trend);

-- ============================================================================
-- AUDIT LOGGING TABLE
-- Track all significant changes for compliance and debugging
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  changes JSONB, -- {old: {...}, new: {...}}
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_audit_logs_organization_id ON public.audit_logs(organization_id);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_resource_type ON public.audit_logs(resource_type);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_health_passport ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decision_engine_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictive_pmo_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maturity_scan_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pmo_dna_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_twin_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.multiverse_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genome_editor_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategic_pulse ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own organization's data
CREATE POLICY "Users see own organization" ON public.users
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Users update own profile" ON public.users
  FOR UPDATE USING (auth_id = auth.uid());

-- Policy: Projects access via organization
CREATE POLICY "Access organization projects" ON public.projects
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
    )
  );

-- Policy: Health passport access
CREATE POLICY "Access health passports" ON public.project_health_passport
  FOR ALL USING (
    project_id IN (
      SELECT id FROM public.projects WHERE organization_id IN (
        SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
      )
    )
  );

-- Policy: Risks access
CREATE POLICY "Access project risks" ON public.risks
  FOR ALL USING (
    project_id IN (
      SELECT id FROM public.projects WHERE organization_id IN (
        SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
      )
    )
  );

-- Policy: Dependencies access
CREATE POLICY "Access project dependencies" ON public.project_dependencies
  FOR ALL USING (
    project_id IN (
      SELECT id FROM public.projects WHERE organization_id IN (
        SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
      )
    )
  );

-- Policy: KPIs access
CREATE POLICY "Access project KPIs" ON public.kpis
  FOR ALL USING (
    project_id IN (
      SELECT id FROM public.projects WHERE organization_id IN (
        SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
      )
    )
  );

-- Policy: Decision engine results
CREATE POLICY "Access decision results" ON public.decision_engine_results
  FOR ALL USING (
    project_id IN (
      SELECT id FROM public.projects WHERE organization_id IN (
        SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
      )
    )
  );

-- Policy: Predictive forecasts
CREATE POLICY "Access forecasts" ON public.predictive_pmo_forecasts
  FOR ALL USING (
    project_id IN (
      SELECT id FROM public.projects WHERE organization_id IN (
        SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
      )
    )
  );

-- Policy: Maturity scan results
CREATE POLICY "Access maturity scans" ON public.maturity_scan_results
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
    )
  );

-- Policy: PMO DNA profiles
CREATE POLICY "Access PMO DNA" ON public.pmo_dna_profiles
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
    )
  );

-- Policy: Digital twin snapshots
CREATE POLICY "Access digital twin" ON public.digital_twin_snapshots
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
    )
  );

-- Policy: Multiverse scenarios
CREATE POLICY "Access multiverse scenarios" ON public.multiverse_scenarios
  FOR ALL USING (
    project_id IN (
      SELECT id FROM public.projects WHERE organization_id IN (
        SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
      )
    )
  );

-- Policy: Genome editor states
CREATE POLICY "Access genome editor" ON public.genome_editor_states
  FOR ALL USING (
    project_id IN (
      SELECT id FROM public.projects WHERE organization_id IN (
        SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
      )
    )
  );

-- Policy: Strategic pulse
CREATE POLICY "Access strategic pulse" ON public.strategic_pulse
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
    )
  );

-- Policy: Audit logs
CREATE POLICY "Access audit logs" ON public.audit_logs
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM public.users WHERE auth_id = auth.uid()
    )
  );

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_health_passport_updated_at BEFORE UPDATE ON public.project_health_passport
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_risks_updated_at BEFORE UPDATE ON public.risks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kpis_updated_at BEFORE UPDATE ON public.kpis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pmo_dna_profiles_updated_at BEFORE UPDATE ON public.pmo_dna_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_genome_editor_states_updated_at BEFORE UPDATE ON public.genome_editor_states
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_strategic_pulse_updated_at BEFORE UPDATE ON public.strategic_pulse
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function: Log changes to audit_logs
CREATE OR REPLACE FUNCTION log_audit_change()
RETURNS TRIGGER AS $$
DECLARE
  v_org_id UUID;
BEGIN
  -- Determine organization_id based on table
  CASE TG_TABLE_NAME
    WHEN 'organizations' THEN v_org_id := COALESCE(NEW.id, OLD.id);
    WHEN 'users' THEN v_org_id := COALESCE(NEW.organization_id, OLD.organization_id);
    WHEN 'projects' THEN v_org_id := COALESCE(NEW.organization_id, OLD.organization_id);
    WHEN 'risks' THEN 
      SELECT organization_id INTO v_org_id FROM public.projects 
      WHERE id = COALESCE(NEW.project_id, OLD.project_id) LIMIT 1;
    ELSE v_org_id := NULL;
  END CASE;

  IF v_org_id IS NOT NULL THEN
    INSERT INTO public.audit_logs (organization_id, user_id, action, resource_type, resource_id, changes)
    VALUES (
      v_org_id,
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      COALESCE(NEW.id, OLD.id),
      jsonb_build_object(
        'old', to_jsonb(OLD),
        'new', to_jsonb(NEW)
      )
    );
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Enable audit logging (example for projects, expand as needed)
CREATE TRIGGER audit_projects_changes AFTER INSERT OR UPDATE OR DELETE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION log_audit_change();

-- ============================================================================
-- SAMPLE DATA (Comment out for production)
-- ============================================================================

-- Example organization
INSERT INTO public.organizations (name, industry, size, subscription_plan)
VALUES ('Acme Corporation', 'banking', 'enterprise', 'enterprise')
ON CONFLICT DO NOTHING;

-- Get the organization ID for subsequent inserts
-- Note: In production, use proper data migration scripts
