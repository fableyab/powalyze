-- ============================================================================
-- POWALYZE V2 - Modèle de données refonte complète
-- Hiérarchie : Organization → Portfolios → Projects → Phases → Tasks
-- ============================================================================

-- Désactiver RLS temporairement pour la création
ALTER TABLE IF EXISTS organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS portfolios DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS phases DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS kpis DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS risks DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS budget_entries DISABLE ROW LEVEL SECURITY;

-- Drop tables si elles existent (ordre inverse des dépendances)
DROP TABLE IF EXISTS budget_entries CASCADE;
DROP TABLE IF EXISTS risks CASCADE;
DROP TABLE IF EXISTS kpis CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS phases CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS portfolios CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- ============================================================================
-- TABLE: organizations
-- ============================================================================
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLE: profiles (extension de auth.users)
-- ============================================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'VIEWER',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_role CHECK (role IN ('ADMIN', 'PMO', 'PM', 'EXECUTIVE', 'VIEWER'))
);

-- ============================================================================
-- TABLE: portfolios
-- ============================================================================
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_status CHECK (status IN ('ACTIVE', 'ARCHIVED', 'PLANNING'))
);

-- ============================================================================
-- TABLE: projects
-- ============================================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE SET NULL,
  
  -- Identité
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  department TEXT,
  
  -- Gouvernance
  sponsor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  manager_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  committee_frequency TEXT,
  
  -- Périmètre & objectifs
  main_objective TEXT,
  secondary_objectives JSONB DEFAULT '[]'::jsonb,
  
  -- Planning
  start_date DATE,
  end_date DATE,
  milestones JSONB DEFAULT '[]'::jsonb,
  
  -- Budget
  budget_total NUMERIC(15, 2) DEFAULT 0,
  budget_capex NUMERIC(15, 2) DEFAULT 0,
  budget_opex NUMERIC(15, 2) DEFAULT 0,
  budget_spent NUMERIC(15, 2) DEFAULT 0,
  
  -- Status & santé
  status TEXT NOT NULL DEFAULT 'PLANNED',
  health_status TEXT DEFAULT 'ON_TRACK',
  completion_percent INTEGER DEFAULT 0,
  risk_level TEXT DEFAULT 'LOW',
  
  -- Meta
  description TEXT,
  dependencies JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_status CHECK (status IN ('PLANNED', 'IN_PROGRESS', 'ON_HOLD', 'DONE', 'CANCELLED')),
  CONSTRAINT valid_health CHECK (health_status IN ('ON_TRACK', 'AT_RISK', 'OFF_TRACK')),
  CONSTRAINT valid_risk CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  CONSTRAINT valid_completion CHECK (completion_percent >= 0 AND completion_percent <= 100)
);

-- ============================================================================
-- TABLE: phases
-- ============================================================================
CREATE TABLE phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  
  -- Planning
  start_date DATE,
  end_date DATE,
  
  -- Budget
  budget_allocated NUMERIC(15, 2) DEFAULT 0,
  budget_spent NUMERIC(15, 2) DEFAULT 0,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'PENDING',
  completion_percent INTEGER DEFAULT 0,
  
  -- Livrables & KPI
  deliverables JSONB DEFAULT '[]'::jsonb,
  objectives JSONB DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_phase_status CHECK (status IN ('PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED')),
  CONSTRAINT valid_phase_completion CHECK (completion_percent >= 0 AND completion_percent <= 100)
);

-- ============================================================================
-- TABLE: tasks
-- ============================================================================
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id UUID NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  description TEXT,
  assignee_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'TODO',
  priority TEXT DEFAULT 'MEDIUM',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_task_status CHECK (status IN ('TODO', 'IN_PROGRESS', 'DONE', 'BLOCKED')),
  CONSTRAINT valid_priority CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT'))
);

-- ============================================================================
-- TABLE: kpis
-- ============================================================================
CREATE TABLE kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  description TEXT,
  target_value NUMERIC(15, 2),
  current_value NUMERIC(15, 2) DEFAULT 0,
  unit TEXT,
  
  status TEXT DEFAULT 'ON_TRACK',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_kpi_status CHECK (status IN ('ON_TRACK', 'AT_RISK', 'OFF_TRACK'))
);

-- ============================================================================
-- TABLE: risks
-- ============================================================================
CREATE TABLE risks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES phases(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  description TEXT,
  
  impact TEXT NOT NULL DEFAULT 'MEDIUM',
  probability TEXT NOT NULL DEFAULT 'MEDIUM',
  mitigation_plan TEXT,
  
  status TEXT NOT NULL DEFAULT 'OPEN',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_impact CHECK (impact IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  CONSTRAINT valid_probability CHECK (probability IN ('LOW', 'MEDIUM', 'HIGH')),
  CONSTRAINT valid_risk_status CHECK (status IN ('OPEN', 'MITIGATED', 'CLOSED'))
);

-- ============================================================================
-- TABLE: budget_entries
-- ============================================================================
CREATE TABLE budget_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES phases(id) ON DELETE CASCADE,
  
  category TEXT NOT NULL,
  amount NUMERIC(15, 2) NOT NULL,
  type TEXT NOT NULL DEFAULT 'PLANNED',
  entry_date DATE DEFAULT CURRENT_DATE,
  
  description TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_budget_type CHECK (type IN ('PLANNED', 'ACTUAL')),
  CONSTRAINT valid_category CHECK (category IN ('CAPEX', 'OPEX', 'INTERNAL', 'EXTERNAL', 'OTHER'))
);

-- ============================================================================
-- INDEX pour performance
-- ============================================================================
CREATE INDEX idx_profiles_org ON profiles(organization_id);
CREATE INDEX idx_portfolios_org ON portfolios(organization_id);
CREATE INDEX idx_projects_org ON projects(organization_id);
CREATE INDEX idx_projects_portfolio ON projects(portfolio_id);
CREATE INDEX idx_phases_project ON phases(project_id);
CREATE INDEX idx_tasks_phase ON tasks(phase_id);
CREATE INDEX idx_kpis_project ON kpis(project_id);
CREATE INDEX idx_risks_project ON risks(project_id);
CREATE INDEX idx_budget_project ON budget_entries(project_id);

-- ============================================================================
-- RLS Policies (Row Level Security)
-- ============================================================================

-- Organizations (tous les users de l'org peuvent voir)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY org_access ON organizations
  FOR ALL USING (
    id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY profile_access ON profiles
  FOR ALL USING (
    organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

-- Portfolios
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
CREATE POLICY portfolio_access ON portfolios
  FOR ALL USING (
    organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

-- Projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY project_access ON projects
  FOR ALL USING (
    organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

-- Phases
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
CREATE POLICY phase_access ON phases
  FOR ALL USING (
    project_id IN (
      SELECT id FROM projects 
      WHERE organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    )
  );

-- Tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY task_access ON tasks
  FOR ALL USING (
    phase_id IN (
      SELECT id FROM phases WHERE project_id IN (
        SELECT id FROM projects 
        WHERE organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
      )
    )
  );

-- KPIs
ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;
CREATE POLICY kpi_access ON kpis
  FOR ALL USING (
    project_id IN (
      SELECT id FROM projects 
      WHERE organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    )
  );

-- Risks
ALTER TABLE risks ENABLE ROW LEVEL SECURITY;
CREATE POLICY risk_access ON risks
  FOR ALL USING (
    project_id IN (
      SELECT id FROM projects 
      WHERE organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    )
  );

-- Budget Entries
ALTER TABLE budget_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY budget_access ON budget_entries
  FOR ALL USING (
    project_id IN (
      SELECT id FROM projects 
      WHERE organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    )
  );

-- ============================================================================
-- Functions utilitaires
-- ============================================================================

-- Mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_phases_updated_at BEFORE UPDATE ON phases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_kpis_updated_at BEFORE UPDATE ON kpis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_risks_updated_at BEFORE UPDATE ON risks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- Données de test
-- ============================================================================

-- Organisation de démo
INSERT INTO organizations (id, name, settings) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Powalyze Demo', '{"language": "fr", "currency": "EUR"}'::jsonb);

COMMENT ON TABLE organizations IS 'Organisations clientes de Powalyze';
COMMENT ON TABLE profiles IS 'Profils utilisateurs (extension auth.users)';
COMMENT ON TABLE portfolios IS 'Portefeuilles de projets (agrégateurs)';
COMMENT ON TABLE projects IS 'Projets (source unique de vérité)';
COMMENT ON TABLE phases IS 'Phases d''exécution des projets';
COMMENT ON TABLE tasks IS 'Tâches dans les phases';
COMMENT ON TABLE kpis IS 'Indicateurs de performance projet';
COMMENT ON TABLE risks IS 'Risques projet/phase';
COMMENT ON TABLE budget_entries IS 'Entrées budgétaires détaillées';
