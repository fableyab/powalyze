# POWALYZE SAAS SCHEMA - COMPLETE REFERENCE
**Generated:** 2025-12-16  
**Version:** 1.0 - Production Ready  
**Architecture:** Multi-tenant, RLS-secured, TimescaleDB-enabled

---

## OVERVIEW

Powalyze uses a **normalized, relational schema** optimized for:
- ✅ Multi-tenant data isolation (via `organization_id`)
- ✅ Row-Level Security (RLS) for automatic access control
- ✅ Time-series data optimization (TimescaleDB-ready)
- ✅ Full audit trail for compliance
- ✅ Scalability to 1000s of organizations
- ✅ Real-time analytics capabilities

---

## TABLE HIERARCHY & RELATIONSHIPS

```
organizations (root)
├── users (1:N, RLS filtered)
├── projects (1:N, via organization_id)
│   ├── project_health_passport (1:1)
│   ├── risks (1:N)
│   ├── project_dependencies (N:N)
│   ├── kpis (1:N)
│   ├── decision_engine_results (1:N)
│   ├── predictive_pmo_forecasts (1:N)
│   ├── multiverse_scenarios (1:N)
│   └── genome_editor_states (1:N)
├── maturity_scan_results (1:N)
├── pmo_dna_profiles (1:1)
├── digital_twin_snapshots (1:N)
├── strategic_pulse (1:1, updated_at triggered)
└── audit_logs (1:N, auto-populated)
```

---

## TABLE SPECIFICATIONS

### 1. ORGANIZATIONS
**Purpose:** Root tenant entity for multi-tenant SaaS

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK, default gen_random_uuid() | Unique org identifier |
| name | TEXT | NOT NULL | Organization name |
| industry | TEXT | - | banking, energy, trading, healthcare, etc. |
| size | TEXT | - | small, medium, large, enterprise |
| country | TEXT | - | ISO country code |
| language | TEXT | DEFAULT 'en' | en, fr, de, es |
| logo_url | TEXT | - | CDN URL to org logo |
| subscription_plan | TEXT | CHECK IN (...) | starter, professional, enterprise |
| subscription_status | TEXT | DEFAULT 'active' | active, trial, paused, cancelled |
| max_users | INTEGER | DEFAULT 5 | Feature limit |
| max_projects | INTEGER | DEFAULT 50 | Feature limit |
| features | JSONB | DEFAULT '{}' | {digitalTwin: true, ...} |
| settings | JSONB | DEFAULT '{}' | Org preferences |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Update timestamp |

**Indexes:**
- `idx_organizations_name` - For org lookups
- `idx_organizations_subscription_status` - For billing reports

**Example:**
```sql
INSERT INTO organizations (name, industry, size, subscription_plan)
VALUES ('Acme Bank', 'banking', 'enterprise', 'enterprise');
```

---

### 2. USERS
**Purpose:** User accounts with role-based access control

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Internal user ID |
| auth_id | UUID | UNIQUE NOT NULL | Supabase Auth reference |
| organization_id | UUID | FK, CASCADE | Multi-tenant isolation |
| email | TEXT | UNIQUE NOT NULL | Login identifier |
| full_name | TEXT | - | Display name |
| avatar_url | TEXT | - | Profile picture URL |
| role | TEXT | CHECK IN (...), DEFAULT 'viewer' | admin, manager, analyst, viewer |
| is_active | BOOLEAN | DEFAULT true | Soft-delete flag |
| last_login_at | TIMESTAMPTZ | - | Activity tracking |
| created_at | TIMESTAMPTZ | DEFAULT now() | Account creation |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Profile updates |

**Indexes:**
- `idx_users_organization_id` - For tenant queries
- `idx_users_auth_id` - For auth lookups
- `idx_users_is_active` - For active user counts

**RLS Policies:**
```sql
-- Users see only their own organization's users
SELECT * FROM users 
WHERE organization_id IN (
  SELECT organization_id FROM users WHERE auth_id = auth.uid()
)
```

**Example:**
```sql
INSERT INTO users (auth_id, organization_id, email, full_name, role)
VALUES (auth_id_from_supabase, 'org_123', 'john@acme.com', 'John Doe', 'manager');
```

---

### 3. PROJECTS
**Purpose:** Core project portfolio with strategic metadata

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Unique project ID |
| organization_id | UUID | FK, CASCADE | Tenant isolation |
| name | TEXT | NOT NULL | Project title |
| description | TEXT | - | Long description |
| status | TEXT | CHECK, DEFAULT 'not_started' | Workflow status |
| priority | TEXT | CHECK | critical, high, medium, low |
| start_date | DATE | - | Project kickoff |
| end_date | DATE | - | Target completion |
| budget | NUMERIC | - | Planned investment |
| actual_spend | NUMERIC | DEFAULT 0 | Actual spend to date |
| value | NUMERIC | - | Expected business value |
| realized_value | NUMERIC | DEFAULT 0 | Actual value achieved |
| strategic_alignment | NUMERIC | CHECK 0-100 | Strategy alignment score |
| owner_id | UUID | FK SET NULL | Project sponsor |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Last modification |

**Indexes:**
- `idx_projects_organization_id` - For portfolio queries
- `idx_projects_status` - For status filtering
- `idx_projects_priority` - For priority views

**RLS Policies:**
```sql
-- Access via organization membership
SELECT * FROM projects 
WHERE organization_id IN (
  SELECT organization_id FROM users WHERE auth_id = auth.uid()
)
```

**Example:**
```sql
INSERT INTO projects (organization_id, name, status, budget, strategic_alignment, owner_id)
VALUES (
  'org_123',
  'Cloud Migration 2025',
  'in_progress',
  1800000,
  88,
  'user_456'
);
```

---

### 4. PROJECT_HEALTH_PASSPORT
**Purpose:** Multi-dimensional health scoring

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Health record ID |
| project_id | UUID | FK, CASCADE | Project reference |
| health_score | NUMERIC | CHECK 0-100 | Overall health |
| risk_score | NUMERIC | CHECK 0-100 | Risk exposure |
| budget_score | NUMERIC | CHECK 0-100 | Budget performance |
| timeline_score | NUMERIC | CHECK 0-100 | Schedule performance |
| value_score | NUMERIC | CHECK 0-100 | Value realization |
| quality_score | NUMERIC | CHECK 0-100 | Quality metrics |
| stakeholder_satisfaction | NUMERIC | CHECK 0-100 | Satisfaction index |
| health_status | TEXT | GENERATED | excellent, good, at_risk, critical |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Update |

**Generated Columns:**
```sql
health_status = CASE 
  WHEN health_score >= 80 THEN 'excellent'
  WHEN health_score >= 60 THEN 'good'
  WHEN health_score >= 40 THEN 'at_risk'
  ELSE 'critical'
END
```

**Indexes:**
- `idx_project_health_passport_project_id` - Health queries
- `idx_project_health_passport_health_score` - Scoring queries

**Example:**
```sql
INSERT INTO project_health_passport 
  (project_id, health_score, risk_score, budget_score, timeline_score, value_score)
VALUES ('proj_123', 78, 45, 85, 72, 80);
```

---

### 5. RISKS
**Purpose:** Risk register with severity calculation

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Risk ID |
| project_id | UUID | FK, CASCADE | Project reference |
| title | TEXT | NOT NULL | Risk description |
| description | TEXT | - | Detailed context |
| category | TEXT | CHECK | technical, schedule, budget, resource, stakeholder, external |
| probability | NUMERIC | CHECK 0-100 | Likelihood % |
| impact | NUMERIC | CHECK 0-100 | Impact % |
| severity | NUMERIC | GENERATED AS (probability * impact / 100) | Probability × Impact |
| status | TEXT | DEFAULT 'open' | open, mitigated, closed, escalated |
| mitigation_plan | TEXT | - | Response strategy |
| owner_id | UUID | FK SET NULL | Risk owner |
| created_at | TIMESTAMPTZ | DEFAULT now() | Created |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Updated |

**Indexes:**
- `idx_risks_project_id` - Risk queries
- `idx_risks_status` - Status filtering
- `idx_risks_severity` - Critical risk alerts

**Severity Scoring:**
```
severity = probability * impact / 100
Example: probability=70, impact=85 → severity=59.5
```

**Example:**
```sql
INSERT INTO risks (project_id, title, category, probability, impact, status)
VALUES (
  'proj_123',
  'Resource availability shortage',
  'resource',
  70,
  85,
  'open'
);
```

---

### 6. PROJECT_DEPENDENCIES
**Purpose:** Manage inter-project constraints

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Dependency ID |
| project_id | UUID | FK, CASCADE | Dependent project |
| depends_on_project_id | UUID | FK, CASCADE | Predecessor project |
| dependency_type | TEXT | CHECK, DEFAULT 'finish_to_start' | Scheduling type |
| lag_days | INTEGER | DEFAULT 0 | Buffer between projects |
| is_critical | BOOLEAN | DEFAULT false | Critical path flag |
| created_at | TIMESTAMPTZ | DEFAULT now() | Created |

**Constraint:**
```sql
CONSTRAINT no_self_dependency CHECK (project_id != depends_on_project_id)
```

**Dependency Types:**
- `finish_to_start` - Predecessor must complete before start
- `start_to_start` - Predecessors must start together
- `finish_to_finish` - Predecessors must complete together
- `start_to_finish` - Predecessor start = project finish

**Example:**
```sql
INSERT INTO project_dependencies 
  (project_id, depends_on_project_id, dependency_type, lag_days, is_critical)
VALUES ('proj_123', 'proj_456', 'finish_to_start', 5, true);
```

---

### 7. KPIs
**Purpose:** Metric tracking with status calculation

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | KPI ID |
| project_id | UUID | FK, CASCADE | Project reference |
| name | TEXT | NOT NULL | KPI name |
| description | TEXT | - | KPI definition |
| value | NUMERIC | - | Current value |
| target | NUMERIC | - | Target value |
| unit | TEXT | NOT NULL | %, days, $, count, etc. |
| baseline | NUMERIC | - | Starting value for trends |
| threshold_warning | NUMERIC | - | Alert threshold |
| threshold_critical | NUMERIC | - | Critical threshold |
| status | TEXT | GENERATED | undefined, on_track, at_risk, critical |
| created_at | TIMESTAMPTZ | DEFAULT now() | Created |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Updated |

**Status Calculation:**
```sql
status = CASE 
  WHEN target IS NULL OR value IS NULL THEN 'undefined'
  WHEN value >= target THEN 'on_track'
  WHEN value >= target * 0.8 THEN 'at_risk'
  ELSE 'critical'
END
```

**Example:**
```sql
INSERT INTO kpis (project_id, name, value, target, unit)
VALUES ('proj_123', 'Budget Utilization', 35, 70, '%');
```

---

### 8. DECISION_ENGINE_RESULTS
**Purpose:** AI-powered go/no-go recommendations

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Result ID |
| project_id | UUID | FK, CASCADE | Project reference |
| recommendation | TEXT | NOT NULL, CHECK | go, no_go, delay, reprioritize, optimize |
| score | NUMERIC | CHECK 0-100 | Overall score |
| confidence | NUMERIC | CHECK 0-100 | Model confidence |
| justification | TEXT | - | Reasoning explanation |
| factors | JSONB | - | {health: 0.78, risk: 0.55, ...} |
| model_version | TEXT | - | Algorithm version |
| created_at | TIMESTAMPTZ | DEFAULT now() | Created |

**Example:**
```sql
INSERT INTO decision_engine_results 
  (project_id, recommendation, score, confidence, factors)
VALUES (
  'proj_123',
  'go',
  82,
  88,
  '{"health": 0.78, "risk": 0.55, "alignment": 0.92}'::jsonb
);
```

---

### 9. PREDICTIVE_PMO_FORECASTS
**Purpose:** ML-based risk predictions

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Forecast ID |
| project_id | UUID | FK, CASCADE | Project reference |
| forecast_type | TEXT | CHECK | delay, budget_overrun, risk_spike, scope_creep, resource_shortage |
| probability | NUMERIC | CHECK 0-100 | Likelihood % |
| predicted_date | DATE | - | When risk occurs |
| impact_days | INTEGER | - | Timeline impact days |
| impact_cost | NUMERIC | - | Cost impact $ |
| confidence | NUMERIC | CHECK 0-100 | Model confidence |
| explanation | TEXT | - | Why this forecast |
| mitigation_suggestions | TEXT | - | Recommendations |
| model_version | TEXT | - | Algorithm version |
| created_at | TIMESTAMPTZ | DEFAULT now() | Created |

**Example:**
```sql
INSERT INTO predictive_pmo_forecasts 
  (project_id, forecast_type, probability, predicted_date, impact_days)
VALUES ('proj_123', 'delay', 62, '2025-09-15', 30);
```

---

### 10. MATURITY_SCAN_RESULTS
**Purpose:** PMO maturity assessments

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Assessment ID |
| organization_id | UUID | FK, CASCADE | Org reference |
| scan_name | TEXT | - | Assessment name |
| score | NUMERIC | CHECK 0-100 | Overall maturity score |
| maturity_level | TEXT | GENERATED | initial, developing, established, advanced, optimizing |
| dimension_scores | JSONB | - | {governance: 45, delivery: 60, ...} |
| recommendations | TEXT | - | Improvement recommendations |
| action_items | JSONB | - | [{priority, action, timeline}] |
| created_by_id | UUID | FK SET NULL | Assessor user |
| created_at | TIMESTAMPTZ | DEFAULT now() | Assessment date |

**Maturity Levels:**
```
0-20:   Initial (ad-hoc, unpredictable)
20-40:  Developing (some formalization)
40-60:  Established (documented processes)
60-80:  Advanced (measured and optimized)
80-100: Optimizing (continuous improvement)
```

**Example:**
```sql
INSERT INTO maturity_scan_results 
  (organization_id, score, dimension_scores)
VALUES (
  'org_123',
  62,
  '{
    "governance": 45,
    "delivery": 60,
    "risk": 55,
    "data": 70,
    "change": 40
  }'::jsonb
);
```

---

### 11. PMO_DNA_PROFILES
**Purpose:** Organizational structure and capability profile

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Profile ID |
| organization_id | UUID | FK, CASCADE | Org reference |
| dna | JSONB | NOT NULL | Complete DNA structure |
| recommendations | JSONB | - | Strategic recommendations |
| generated_at | TIMESTAMPTZ | - | Generation timestamp |
| created_at | TIMESTAMPTZ | DEFAULT now() | Created |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Updated |

**DNA Structure:**
```json
{
  "structure": {
    "type": "centralized|hybrid|embedded",
    "reportingLine": "CFO",
    "headcount": 18,
    "centers": ["EMEA", "APAC"]
  },
  "capabilities": {
    "governance": 65,
    "delivery": 72,
    "risk": 58,
    "data": 78,
    "change": 52
  },
  "maturity": {...},
  "culture": {...},
  "techStack": {...}
}
```

---

### 12. DIGITAL_TWIN_SNAPSHOTS
**Purpose:** Portfolio state snapshots for what-if analysis

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Snapshot ID |
| organization_id | UUID | FK, CASCADE | Org reference |
| snapshot_name | TEXT | - | Snapshot label |
| snapshot | JSONB | NOT NULL | Complete portfolio state |
| scenario_type | TEXT | DEFAULT 'current' | current, baseline, optimized, predicted |
| is_baseline | BOOLEAN | DEFAULT false | Baseline comparison flag |
| created_by_id | UUID | FK SET NULL | Creator |
| created_at | TIMESTAMPTZ | DEFAULT now() | Created |

**Snapshot Contents:**
```json
{
  "projects": [{...}],
  "portfolioHealth": {...},
  "dependencies": [{...}],
  "criticalRisks": [{...}],
  "resourceUtilization": {...},
  "valueRealization": {...}
}
```

---

### 13. MULTIVERSE_SCENARIOS
**Purpose:** What-if analysis with outcomes

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Scenario ID |
| project_id | UUID | FK, CASCADE | Project reference |
| scenario_name | TEXT | NOT NULL | Scenario label |
| scenario_type | TEXT | DEFAULT 'custom' | optimistic, pessimistic, realistic, custom |
| parameters | JSONB | NOT NULL | Input parameters |
| predicted_outcomes | JSONB | - | ML-predicted results |
| feasibility_score | NUMERIC | CHECK 0-100 | Achievability score |
| comparison_to_baseline | JSONB | - | Deltas from baseline |
| created_by_id | UUID | FK SET NULL | Creator |
| created_at | TIMESTAMPTZ | DEFAULT now() | Created |

**Parameters Example:**
```json
{
  "budgetChange": 0.15,
  "timelineChange": -0.3,
  "teamSizeChange": 0.2,
  "priorityBoost": true,
  "resourceAvailability": 0.95
}
```

---

### 14. GENOME_EDITOR_STATES
**Purpose:** Project genetic engineering states

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | State ID |
| project_id | UUID | FK, CASCADE | Project reference |
| genome | JSONB | NOT NULL | Complete genome state |
| mutation_count | INTEGER | DEFAULT 0 | Number of changes |
| last_mutation_at | TIMESTAMPTZ | - | Last modification |
| optimization_score | NUMERIC | CHECK 0-100 | Optimization index |
| impact_analysis | JSONB | - | Impact prediction |
| created_by_id | UUID | FK SET NULL | Creator |
| created_at | TIMESTAMPTZ | DEFAULT now() | Created |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Updated |

**Genome Contents:**
```json
{
  "coreGenes": {...},
  "healthGenes": {...},
  "riskGenes": {...},
  "mutationHistory": [{date, change, rationale}]
}
```

---

### 15. STRATEGIC_PULSE
**Purpose:** Real-time organizational health monitoring

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Pulse ID |
| organization_id | UUID | FK, CASCADE | Org reference |
| pulse | JSONB | NOT NULL | Complete pulse data |
| health_index | NUMERIC | CHECK 0-100 | Overall health |
| health_status | TEXT | DEFAULT 'stable' | critical, at_risk, stable, excellent |
| alert_count | INTEGER | DEFAULT 0 | Active alert count |
| trend | TEXT | DEFAULT 'stable' | improving, stable, declining |
| last_alert_at | TIMESTAMPTZ | - | Last anomaly |
| recommendations | JSONB | - | Executive actions |
| created_at | TIMESTAMPTZ | DEFAULT now() | Created |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Updated |

**Pulse Contents:**
```json
{
  "rhythm": {...},
  "anomalies": [{...}],
  "criticalSignals": [{...}],
  "portfolioHealthTrend": "improving|stable|declining",
  "resourceStress": {...},
  "dependenciesStress": {...},
  "stakeholderSentiment": 0-1,
  "burnRate": 0-1,
  "recoveryTimeEstimate": days
}
```

---

### 16. AUDIT_LOGS
**Purpose:** Compliance and audit trail

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | Log ID |
| organization_id | UUID | FK, CASCADE | Org reference |
| user_id | UUID | FK SET NULL | Who made change |
| action | TEXT | NOT NULL | INSERT, UPDATE, DELETE |
| resource_type | TEXT | NOT NULL | Table name |
| resource_id | UUID | - | Record ID |
| changes | JSONB | - | {old: {...}, new: {...}} |
| ip_address | TEXT | - | Source IP |
| user_agent | TEXT | - | Browser/client |
| created_at | TIMESTAMPTZ | DEFAULT now() | Timestamp |

**Indexes:**
- `idx_audit_logs_organization_id` - Org audit trail
- `idx_audit_logs_created_at DESC` - Timeline queries

**Example:**
```sql
INSERT INTO audit_logs (organization_id, user_id, action, resource_type, resource_id, changes)
VALUES (
  'org_123',
  'user_456',
  'UPDATE',
  'projects',
  'proj_789',
  '{"old": {"status": "not_started"}, "new": {"status": "in_progress"}}'::jsonb
);
```

---

## ROW LEVEL SECURITY (RLS) SUMMARY

All tables have RLS enabled. Access is restricted to:
1. **Own organization data only** - Users see only projects/data in their organization
2. **Role-based restrictions** - Viewers have SELECT-only, managers have full CRUD
3. **Automatic enforcement** - No manual filtering needed in application code

Example RLS enforcement:
```sql
-- User trying to access project
SELECT * FROM projects WHERE id = 'proj_123'
-- Actually executes as:
SELECT * FROM projects 
WHERE id = 'proj_123' 
  AND organization_id IN (
    SELECT organization_id FROM users WHERE auth_id = auth.uid()
  )
```

---

## UPDATED_AT TRIGGERS

All tables with `updated_at` column have automatic triggers:
```sql
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
```

This ensures `updated_at` is always current, no manual management needed.

---

## JSONB FIELDS BENEFITS

Using JSONB for complex data:
- ✅ Flexibility - Add fields without schema migrations
- ✅ Queryability - `WHERE pulse->'rhythm'->>'heartbeatHealth' > 0.8`
- ✅ Indexing - Can create GIN indexes for performance
- ✅ Type safety - Can validate in application layer

**Example JSONB query:**
```sql
-- Find all projects with critical risks
SELECT * FROM risks 
WHERE project_id IN (
  SELECT id FROM projects 
  WHERE organization_id = 'org_123'
)
  AND (probability * impact / 100) > 75
```

---

## INDEXES FOR PERFORMANCE

All tables optimized with strategic indexes:
- Tenant isolation (`organization_id`)
- Status/state filtering (`status`, `health_status`)
- Time-based queries (`created_at DESC`)
- Foreign key lookups (`project_id`, `user_id`)
- Search columns (`name`, `email`)

---

## DEPLOYMENT CHECKLIST

- [ ] Create extension `uuid-ossp`
- [ ] Create extension `pgcrypto`
- [ ] Create extension `timescaledb` (optional, for time-series)
- [ ] Run migration SQL
- [ ] Verify all indexes created
- [ ] Enable RLS on all tables
- [ ] Test RLS policies work correctly
- [ ] Configure Supabase Auth
- [ ] Create service role key
- [ ] Configure Edge Functions
- [ ] Set up audit logging triggers
- [ ] Test data isolation between orgs

---

## SCALING NOTES

This schema is designed to scale to:
- **1000+ organizations** - Partitioning by `organization_id` ready
- **1M+ projects** - Indexes support fast queries
- **100M+ project snapshots** - JSONB compression + TimescaleDB hypertables
- **1B+ audit logs** - Archive strategy recommended

---

## NEXT STEPS

1. Deploy schema to Supabase PostgreSQL
2. Configure RLS policies
3. Create Edge Functions (see EDGE_FUNCTIONS_GUIDE.ts)
4. Build API layer (see API_REFERENCE.md)
5. Implement React hooks for data fetching
6. Set up real-time subscriptions for Strategic Pulse
7. Configure email notifications for alerts
8. Implement compliance/export features

