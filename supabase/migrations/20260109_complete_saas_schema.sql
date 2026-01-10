-- ==============================================================
-- POWALYZE - MODÈLE DE DONNÉES COMPLET
-- ==============================================================
-- Description: Schéma SQL complet pour le SaaS Powalyze
-- Version: 1.0
-- Date: 2026-01-09
-- ==============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================
-- 1. ORGANISATION & USERS
-- ==============================================================

-- Organisation Table
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    logo_url TEXT,
    settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Roles Enum
CREATE TYPE user_role AS ENUM (
    'PMO',
    'EXECUTIVE', 
    'DATA',
    'PROJECT_MANAGER',
    'CONSULTANT',
    'ADMIN'
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role user_role NOT NULL DEFAULT 'PROJECT_MANAGER',
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_org_email UNIQUE (organization_id, email)
);

-- Roles & Permissions (granular control)
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_org_role_name UNIQUE (organization_id, name)
);

-- User Roles Assignment
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_user_role UNIQUE (user_id, role_id)
);

-- ==============================================================
-- 2. GOUVERNANCE & PORTEFEUILLES
-- ==============================================================

-- Portfolio Status Enum
CREATE TYPE status_enum AS ENUM (
    'ACTIVE',
    'ON_HOLD',
    'CLOSED'
);

-- Portfolio Table
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status status_enum DEFAULT 'ACTIVE',
    strategic_axis VARCHAR(255),
    priority INTEGER CHECK (priority BETWEEN 1 AND 5),
    start_date DATE,
    end_date DATE,
    budget_planned DECIMAL(15, 2),
    budget_actual DECIMAL(15, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Program Table
CREATE TABLE IF NOT EXISTS programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status status_enum DEFAULT 'ACTIVE',
    start_date DATE,
    end_date DATE,
    budget_planned DECIMAL(15, 2),
    budget_actual DECIMAL(15, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Status Enum
CREATE TYPE project_status AS ENUM (
    'NOT_STARTED',
    'IN_PROGRESS',
    'AT_RISK',
    'BLOCKED',
    'DONE'
);

-- Project Health Enum
CREATE TYPE health_enum AS ENUM (
    'GREEN',
    'AMBER',
    'RED'
);

-- Project Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE SET NULL,
    program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sponsor_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    project_manager_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status project_status DEFAULT 'NOT_STARTED',
    health health_enum DEFAULT 'GREEN',
    start_date DATE,
    end_date DATE,
    budget_planned DECIMAL(15, 2),
    budget_actual DECIMAL(15, 2),
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================
-- 3. COMITÉS & GOUVERNANCE
-- ==============================================================

-- Committee Frequency Enum
CREATE TYPE committee_frequency AS ENUM (
    'WEEKLY',
    'BIWEEKLY',
    'MONTHLY',
    'QUARTERLY',
    'AD_HOC'
);

-- Committee Type Table
CREATE TABLE IF NOT EXISTS committee_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    frequency committee_frequency DEFAULT 'MONTHLY',
    default_participants JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_org_committee_type UNIQUE (organization_id, name)
);

-- Committee Status Enum
CREATE TYPE committee_status AS ENUM (
    'PLANNED',
    'IN_PROGRESS',
    'CLOSED'
);

-- Committee Table
CREATE TABLE IF NOT EXISTS committees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    committee_type_id UUID REFERENCES committee_types(id) ON DELETE SET NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    status committee_status DEFAULT 'PLANNED',
    agenda TEXT,
    chair_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    participants JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Committee Item Type Enum
CREATE TYPE committee_item_type AS ENUM (
    'PROJECT_REVIEW',
    'RISK_REVIEW',
    'DECISION',
    'INFORMATION',
    'ESCALATION'
);

-- Committee Item Status Enum
CREATE TYPE committee_item_status AS ENUM (
    'PENDING',
    'DISCUSSING',
    'CLOSED'
);

-- Committee Item Table
CREATE TABLE IF NOT EXISTS committee_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    committee_id UUID NOT NULL REFERENCES committees(id) ON DELETE CASCADE,
    type committee_item_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    related_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    related_risk_id UUID,
    related_decision_id UUID,
    status committee_item_status DEFAULT 'PENDING',
    order_index INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================
-- 4. DÉCISIONS
-- ==============================================================

-- Decision Status Enum
CREATE TYPE decision_status AS ENUM (
    'PLANNED',
    'TAKEN',
    'REJECTED',
    'DEFERRED'
);

-- Decision Type Enum
CREATE TYPE decision_type AS ENUM (
    'GO',
    'NO_GO',
    'SCOPE_CHANGE',
    'BUDGET',
    'PRIORITY',
    'RISK_ACCEPT',
    'RISK_MITIGATE',
    'OTHER'
);

-- Decision Table
CREATE TABLE IF NOT EXISTS decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    decision_date DATE,
    status decision_status DEFAULT 'PLANNED',
    decision_type decision_type NOT NULL,
    committee_id UUID REFERENCES committees(id) ON DELETE SET NULL,
    created_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    related_portfolio_id UUID REFERENCES portfolios(id) ON DELETE SET NULL,
    related_program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
    related_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    impact_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Decision Action Status Enum
CREATE TYPE action_status AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'DONE',
    'CANCELLED'
);

-- Decision Action Table
CREATE TABLE IF NOT EXISTS decision_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    decision_id UUID NOT NULL REFERENCES decisions(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    owner_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    due_date DATE,
    status action_status DEFAULT 'OPEN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================
-- 5. RISQUES & IA
-- ==============================================================

-- Risk Status Enum
CREATE TYPE risk_status AS ENUM (
    'OPEN',
    'MITIGATED',
    'CLOSED',
    'ACCEPTED'
);

-- Risk Table
CREATE TABLE IF NOT EXISTS risks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    owner_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    related_portfolio_id UUID REFERENCES portfolios(id) ON DELETE SET NULL,
    related_program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
    related_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    probability INTEGER CHECK (probability BETWEEN 1 AND 5),
    impact INTEGER CHECK (impact BETWEEN 1 AND 5),
    severity INTEGER GENERATED ALWAYS AS (probability * impact) STORED,
    status risk_status DEFAULT 'OPEN',
    mitigation_plan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Predictive Signal Type Enum
CREATE TYPE signal_type AS ENUM (
    'DELAY_RISK',
    'BUDGET_RISK',
    'RESOURCE_OVERLOAD',
    'SCOPE_DRIFT'
);

-- Predictive Signal Source Type Enum
CREATE TYPE signal_source_type AS ENUM (
    'PROJECT',
    'PORTFOLIO',
    'PROGRAM'
);

-- Predictive Signal Table
CREATE TABLE IF NOT EXISTS predictive_signals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    source_type signal_source_type NOT NULL,
    source_id UUID NOT NULL,
    signal_type signal_type NOT NULL,
    score INTEGER CHECK (score BETWEEN 0 AND 100),
    message TEXT,
    recommended_action TEXT,
    is_acknowledged BOOLEAN DEFAULT false,
    acknowledged_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================
-- 6. KPI & REPORTING
-- ==============================================================

-- KPI Direction Enum
CREATE TYPE kpi_direction AS ENUM (
    'HIGHER_IS_BETTER',
    'LOWER_IS_BETTER'
);

-- KPI Definition Table
CREATE TABLE IF NOT EXISTS kpi_definitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100) NOT NULL,
    description TEXT,
    unit VARCHAR(50),
    target_value DECIMAL(15, 2),
    direction kpi_direction DEFAULT 'HIGHER_IS_BETTER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_org_kpi_code UNIQUE (organization_id, code)
);

-- KPI Scope Type Enum
CREATE TYPE kpi_scope_type AS ENUM (
    'PORTFOLIO',
    'PROGRAM',
    'PROJECT',
    'ORGANIZATION'
);

-- KPI Value Table
CREATE TABLE IF NOT EXISTS kpi_values (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    kpi_definition_id UUID NOT NULL REFERENCES kpi_definitions(id) ON DELETE CASCADE,
    scope_type kpi_scope_type NOT NULL,
    scope_id UUID NOT NULL,
    value DECIMAL(15, 2) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================
-- 7. DOCUMENTS & RÉFÉRENTIELS
-- ==============================================================

-- Document Type Enum
CREATE TYPE document_type AS ENUM (
    'CHARTER',
    'SLIDE',
    'REPORT',
    'CONTRACT',
    'OTHER'
);

-- Document Table
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    type document_type DEFAULT 'OTHER',
    related_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    related_portfolio_id UUID REFERENCES portfolios(id) ON DELETE SET NULL,
    related_program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
    created_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================
-- 8. COLLABORATION & NOTIFICATIONS
-- ==============================================================

-- Comment Entity Type Enum
CREATE TYPE comment_entity_type AS ENUM (
    'PROJECT',
    'DECISION',
    'RISK',
    'COMMITTEE',
    'PORTFOLIO',
    'PROGRAM'
);

-- Comment Table
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    author_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    entity_type comment_entity_type NOT NULL,
    entity_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification Type Enum
CREATE TYPE notification_type AS ENUM (
    'NEW_DECISION',
    'RISK_UPDATED',
    'COMMITTEE_UPCOMING',
    'ACTION_DUE',
    'PROJECT_STATUS_CHANGE',
    'PREDICTIVE_SIGNAL'
);

-- Notification Table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    payload JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================
-- 9. INDEXES
-- ==============================================================

-- Organization indexes
CREATE INDEX idx_organizations_is_active ON organizations(is_active);

-- User indexes
CREATE INDEX idx_users_organization_id ON users(organization_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);

-- Portfolio indexes
CREATE INDEX idx_portfolios_organization_id ON portfolios(organization_id);
CREATE INDEX idx_portfolios_owner_user_id ON portfolios(owner_user_id);
CREATE INDEX idx_portfolios_status ON portfolios(status);

-- Program indexes
CREATE INDEX idx_programs_organization_id ON programs(organization_id);
CREATE INDEX idx_programs_portfolio_id ON programs(portfolio_id);
CREATE INDEX idx_programs_owner_user_id ON programs(owner_user_id);

-- Project indexes
CREATE INDEX idx_projects_organization_id ON projects(organization_id);
CREATE INDEX idx_projects_portfolio_id ON projects(portfolio_id);
CREATE INDEX idx_projects_program_id ON projects(program_id);
CREATE INDEX idx_projects_sponsor_user_id ON projects(sponsor_user_id);
CREATE INDEX idx_projects_pm_user_id ON projects(project_manager_user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_health ON projects(health);

-- Committee indexes
CREATE INDEX idx_committees_organization_id ON committees(organization_id);
CREATE INDEX idx_committees_committee_type_id ON committees(committee_type_id);
CREATE INDEX idx_committees_date ON committees(date);
CREATE INDEX idx_committees_status ON committees(status);

-- Committee Item indexes
CREATE INDEX idx_committee_items_committee_id ON committee_items(committee_id);
CREATE INDEX idx_committee_items_related_project_id ON committee_items(related_project_id);

-- Decision indexes
CREATE INDEX idx_decisions_organization_id ON decisions(organization_id);
CREATE INDEX idx_decisions_committee_id ON decisions(committee_id);
CREATE INDEX idx_decisions_related_project_id ON decisions(related_project_id);
CREATE INDEX idx_decisions_related_portfolio_id ON decisions(related_portfolio_id);
CREATE INDEX idx_decisions_status ON decisions(status);

-- Risk indexes
CREATE INDEX idx_risks_organization_id ON risks(organization_id);
CREATE INDEX idx_risks_related_project_id ON risks(related_project_id);
CREATE INDEX idx_risks_related_portfolio_id ON risks(related_portfolio_id);
CREATE INDEX idx_risks_status ON risks(status);
CREATE INDEX idx_risks_severity ON risks(severity);

-- Predictive Signal indexes
CREATE INDEX idx_predictive_signals_organization_id ON predictive_signals(organization_id);
CREATE INDEX idx_predictive_signals_source ON predictive_signals(source_type, source_id);
CREATE INDEX idx_predictive_signals_score ON predictive_signals(score DESC);
CREATE INDEX idx_predictive_signals_is_acknowledged ON predictive_signals(is_acknowledged);

-- KPI indexes
CREATE INDEX idx_kpi_values_organization_id ON kpi_values(organization_id);
CREATE INDEX idx_kpi_values_definition_id ON kpi_values(kpi_definition_id);
CREATE INDEX idx_kpi_values_scope ON kpi_values(scope_type, scope_id);
CREATE INDEX idx_kpi_values_date ON kpi_values(date);

-- Document indexes
CREATE INDEX idx_documents_organization_id ON documents(organization_id);
CREATE INDEX idx_documents_related_project_id ON documents(related_project_id);
CREATE INDEX idx_documents_related_portfolio_id ON documents(related_portfolio_id);

-- Comment indexes
CREATE INDEX idx_comments_organization_id ON comments(organization_id);
CREATE INDEX idx_comments_entity ON comments(entity_type, entity_id);
CREATE INDEX idx_comments_author_user_id ON comments(author_user_id);

-- Notification indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- ==============================================================
-- 10. ROW LEVEL SECURITY (RLS) - À ADAPTER SELON VOS BESOINS
-- ==============================================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE committees ENABLE ROW LEVEL SECURITY;
ALTER TABLE committee_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE risks ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictive_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ==============================================================
-- 11. TRIGGERS - Automatic updated_at
-- ==============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_committee_types_updated_at BEFORE UPDATE ON committee_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_committees_updated_at BEFORE UPDATE ON committees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_committee_items_updated_at BEFORE UPDATE ON committee_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_decisions_updated_at BEFORE UPDATE ON decisions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_decision_actions_updated_at BEFORE UPDATE ON decision_actions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_risks_updated_at BEFORE UPDATE ON risks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_kpi_definitions_updated_at BEFORE UPDATE ON kpi_definitions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================
-- END OF SCHEMA
-- ==============================================================
