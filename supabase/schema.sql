
-- PART 1: SUPABASE SCHEMA DESIGN
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1) TYPES
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'pmo', 'manager', 'contributor', 'viewer', 'auditor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE project_status AS ENUM ('planned', 'in_progress', 'on_hold', 'done', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE project_risk AS ENUM ('Low', 'Medium', 'High', 'Critical');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE connector_type AS ENUM ('power_bi', 'excel', 'csv', 'sharepoint', 'gsheet', 'sql_azure', 'sql_mysql', 'sql_pg', 'snowflake', 'rest_api');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE audit_action_severity AS ENUM ('info', 'warning', 'critical');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2) CORE TABLES
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    industry TEXT,
    country TEXT DEFAULT 'Switzerland',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.tenants IS 'Multi-tenant isolation root. Data Classification: Internal';

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.tenants(id),
    name TEXT,
    email TEXT,
    role user_role DEFAULT 'viewer',
    locale TEXT DEFAULT 'fr-CH',
    time_zone TEXT DEFAULT 'Europe/Zurich',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.profiles IS 'Extended user profile linked to Auth. Data Classification: Confidential (PII)';

-- 3) WORKSPACES & PROJECTS
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    objectives JSONB DEFAULT '[]'::jsonb,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.workspaces IS 'Strategic grouping of projects. Data Classification: Internal';

CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) NOT NULL,
    workspace_id UUID REFERENCES public.workspaces(id),
    code TEXT,
    name TEXT NOT NULL,
    description TEXT,
    sponsor TEXT,
    owner_id UUID REFERENCES public.profiles(id),
    status project_status DEFAULT 'planned',
    risk project_risk DEFAULT 'Low',
    priority TEXT,
    budget_planned NUMERIC(12,2) DEFAULT 0,
    budget_actual NUMERIC(12,2) DEFAULT 0,
    start_date DATE,
    end_date DATE,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.projects IS 'Core project entity. Data Classification: Confidential';

-- 4) REPORTS & SNAPSHOTS
CREATE TABLE IF NOT EXISTS public.report_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) NOT NULL,
    project_id UUID REFERENCES public.projects(id),
    snapshot_date TIMESTAMPTZ DEFAULT NOW(),
    kpi JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.report_snapshots IS 'Historical KPI data points. Data Classification: Confidential';

-- 5) DOCUMENTS
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) NOT NULL,
    project_id UUID REFERENCES public.projects(id),
    name TEXT NOT NULL,
    category TEXT,
    storage_path TEXT NOT NULL,
    version INTEGER DEFAULT 1,
    uploaded_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);
COMMENT ON TABLE public.documents IS 'Document metadata registry. Data Classification: Confidential/Restricted';

CREATE TABLE IF NOT EXISTS public.document_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    storage_path TEXT NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 6) CONNECTORS & DATA
CREATE TABLE IF NOT EXISTS public.connectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) NOT NULL,
    type connector_type NOT NULL,
    name TEXT NOT NULL,
    config JSONB DEFAULT '{}'::jsonb, -- ENCRYPTED CONTENT SUGGESTED
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.connectors IS 'External data source configurations. Data Classification: Restricted (Credentials)';

CREATE TABLE IF NOT EXISTS public.data_imports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) NOT NULL,
    connector_id UUID REFERENCES public.connectors(id),
    source_name TEXT,
    status TEXT,
    row_count INTEGER,
    error_message TEXT,
    started_at TIMESTAMPTZ,
    finished_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7) AI & INSIGHTS
CREATE TABLE IF NOT EXISTS public.ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) NOT NULL,
    project_id UUID REFERENCES public.projects(id),
    scope TEXT,
    input_ref JSONB,
    summary TEXT,
    risks JSONB,
    scenarios JSONB,
    recommendations JSONB,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.ai_insights IS 'Generated AI analysis. Data Classification: Internal';

-- 8) AUDIT & GOVERNANCE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id),
    user_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    severity audit_action_severity DEFAULT 'info',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.audit_logs IS 'Immutable audit trail. Data Classification: Restricted. Retention: 7 Years.';

-- 9) INDEXES
CREATE INDEX IF NOT EXISTS idx_projects_tenant ON public.projects(tenant_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_risk ON public.projects(risk);
CREATE INDEX IF NOT EXISTS idx_audit_tenant_date ON public.audit_logs(tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_project ON public.documents(project_id);

-- PART 2: RLS POLICIES (ULTRA-STRICT)
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_imports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper Functions
CREATE OR REPLACE FUNCTION public.current_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.current_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_tenant_admin()
RETURNS BOOLEAN AS $$
  SELECT role IN ('admin', 'pmo') FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- SELECT Policies
CREATE POLICY "profiles_select_self" ON public.profiles FOR SELECT USING (id = auth.uid() OR is_tenant_admin());
CREATE POLICY "tenants_select_own" ON public.tenants FOR SELECT USING (id = public.current_tenant_id());
CREATE POLICY "projects_select_tenant" ON public.projects FOR SELECT USING (tenant_id = public.current_tenant_id());
CREATE POLICY "workspaces_select_tenant" ON public.workspaces FOR SELECT USING (tenant_id = public.current_tenant_id());
CREATE POLICY "documents_select_tenant" ON public.documents FOR SELECT USING (tenant_id = public.current_tenant_id());
CREATE POLICY "connectors_select_tenant" ON public.connectors FOR SELECT USING (tenant_id = public.current_tenant_id());
CREATE POLICY "audit_logs_select_tenant" ON public.audit_logs FOR SELECT USING (tenant_id = public.current_tenant_id());

-- INSERT Policies
CREATE POLICY "projects_insert_admin_pmo" ON public.projects FOR INSERT WITH CHECK (
  public.is_tenant_admin() AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "documents_insert_contributor" ON public.documents FOR INSERT WITH CHECK (
  public.current_role() IN ('admin', 'pmo', 'manager', 'contributor') AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "connectors_insert_admin" ON public.connectors FOR INSERT WITH CHECK (
  public.is_tenant_admin() AND tenant_id = public.current_tenant_id()
);

-- UPDATE Policies
CREATE POLICY "projects_update_admin_pmo_manager" ON public.projects FOR UPDATE USING (
  public.current_role() IN ('admin', 'pmo', 'manager') AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "documents_update_owner_admin" ON public.documents FOR UPDATE USING (
  (uploaded_by = auth.uid() OR public.is_tenant_admin()) AND tenant_id = public.current_tenant_id()
);

-- DELETE Policies
CREATE POLICY "projects_delete_admin" ON public.projects FOR DELETE USING (
  public.current_role() = 'admin' AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "documents_delete_owner_admin" ON public.documents FOR DELETE USING (
  (uploaded_by = auth.uid() OR public.current_role() = 'admin') AND tenant_id = public.current_tenant_id()
);

-- PART 3: AUDIT TRIGGERS
CREATE OR REPLACE FUNCTION public.log_project_update()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_logs (tenant_id, user_id, action, entity_type, entity_id, severity, metadata)
  VALUES (
    OLD.tenant_id,
    auth.uid(),
    'UPDATE',
    'project',
    OLD.id,
    'info',
    jsonb_build_object('old_status', OLD.status, 'new_status', NEW.status, 'old_budget', OLD.budget_actual, 'new_budget', NEW.budget_actual)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_audit_project_update
AFTER UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.log_project_update();

CREATE OR REPLACE FUNCTION public.log_document_upload()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_logs (tenant_id, user_id, action, entity_type, entity_id, severity, metadata)
  VALUES (
    NEW.tenant_id,
    auth.uid(),
    'UPLOAD',
    'document',
    NEW.id,
    'info',
    jsonb_build_object('filename', NEW.name, 'size', 'N/A') -- Size would need extra column or storage hook
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_audit_document_insert
AFTER INSERT ON public.documents
FOR EACH ROW EXECUTE FUNCTION public.log_document_upload();

-- PART 4: HELPER FUNCTIONS & VIEWS
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

CREATE OR REPLACE VIEW public.v_project_summary AS
SELECT
  p.id,
  p.name,
  p.tenant_id,
  p.status,
  p.risk,
  (p.end_date - CURRENT_DATE) AS days_remaining,
  (p.budget_planned - p.budget_actual) AS budget_variance,
  CASE
    WHEN p.budget_actual > p.budget_planned THEN 0
    WHEN p.risk = 'Critical' THEN 20
    ELSE 100
  END AS health_score
FROM public.projects p;

-- PART 5: SEED DATA (FOR TESTING)
-- This section is commented out to prevent accidental re-seeding
/*
INSERT INTO public.tenants (name, slug, industry) VALUES ('Swiss Bank Corp', 'swiss-bank', 'Banking');
-- Note: You need a real auth.users ID to link a profile properly.
*/
