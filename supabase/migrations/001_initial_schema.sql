
-- Migration: 001_initial_schema.sql
-- Description: Complete DDL with types, tables, indexes, and data classification comments.

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1) TYPES
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'pmo', 'manager', 'contributor', 'viewer', 'auditor');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE project_status AS ENUM ('planned', 'in_progress', 'on_hold', 'done', 'cancelled');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE project_risk AS ENUM ('Low', 'Medium', 'High', 'Critical');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE connector_type AS ENUM ('power_bi', 'excel', 'csv', 'sharepoint', 'gsheet', 'sql_azure', 'sql_mysql', 'sql_pg', 'snowflake', 'rest_api');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE audit_action_severity AS ENUM ('info', 'warning', 'critical');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2) TABLES

-- Tenants
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

-- Profiles
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

-- User Tenant Memberships (Optional if many-to-many needed later, strictly 1-1 for now via profiles.tenant_id but good for future proofing)
CREATE TABLE IF NOT EXISTS public.user_tenant_memberships (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    role user_role DEFAULT 'viewer',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, tenant_id)
);
COMMENT ON TABLE public.user_tenant_memberships IS 'User roles per tenant. Data Classification: Internal';

-- Workspaces
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

-- Projects
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

-- Workspace Projects (Many-to-Many Link)
CREATE TABLE IF NOT EXISTS public.workspace_projects (
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (workspace_id, project_id)
);
COMMENT ON TABLE public.workspace_projects IS 'Link between workspaces and projects. Data Classification: Internal';

-- Report Snapshots
CREATE TABLE IF NOT EXISTS public.report_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) NOT NULL,
    project_id UUID REFERENCES public.projects(id),
    snapshot_date TIMESTAMPTZ DEFAULT NOW(),
    kpi JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.report_snapshots IS 'Historical KPI data points. Data Classification: Confidential';

-- Documents
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

-- Document Versions
CREATE TABLE IF NOT EXISTS public.document_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    storage_path TEXT NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);
COMMENT ON TABLE public.document_versions IS 'Versioning for documents. Data Classification: Confidential';

-- Connectors
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

-- Data Imports
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
COMMENT ON TABLE public.data_imports IS 'Log of data ingestion jobs. Data Classification: Internal';

-- AI Insights
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

-- Audit Logs
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

-- 3) INDEXES
CREATE INDEX IF NOT EXISTS idx_tenants_created_at ON public.tenants(created_at);
CREATE INDEX IF NOT EXISTS idx_profiles_tenant_id ON public.profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_projects_tenant_id ON public.projects(tenant_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_risk ON public.projects(risk);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at);
CREATE INDEX IF NOT EXISTS idx_workspaces_tenant_id ON public.workspaces(tenant_id);
CREATE INDEX IF NOT EXISTS idx_documents_tenant_id ON public.documents(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant_id_created_at ON public.audit_logs(tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
