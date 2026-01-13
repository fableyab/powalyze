# POWALYZE — ARCHITECTURE FONCTIONNELLE V1 COMPLÈTE

**Date**: 13 janvier 2026  
**Version**: 1.0  
**Stack**: React 18 + Vite + Supabase + Power BI

---

## 📋 ÉTAT DES LIEUX

### Tables Existantes (SUPABASE_SCHEMA_COMPLETE.sql)
✅ **Déjà créées**:
- `organizations` (id, name, created_by, created_at)
- `user_organizations` (user_id, organization_id, role)
- `initiatives` (id, organization_id, name, description, status, budget, start_date, end_date)
- `milestones` (id, initiative_id, title, due_date, status)
- `risks` (id, initiative_id, title, description, probability, impact, status)
- `risk_actions` (id, risk_id, action, owner_id, due_date, status)
- `decisions` (id, initiative_id, title, description, status, decided_at)
- `teams` (id, organization_id, name)
- `team_capacity` (id, team_id, available_hours, allocated_hours)
- `tensions` (id, organization_id, title, description, status)
- `focus_items` (id, organization_id, title, priority, status)

### Tables Nouvelles (Architecture Workspaces)
✅ **Créées dans MIGRATION_WORKSPACES_COMPLETE_RLS.sql**:
- `workspaces` (id, organization_id, name, owner_id, created_by)
- `memberships` (id, workspace_id, user_id, role)
- `portfolios` (id, workspace_id, name, description, created_by)

### Tables Manquantes (À créer)
❌ **Non créées**:
- `governance_templates` (modèles de comité)
- `rituals` (agenda des rituels exécutifs)
- `roadmap_items` (éléments de roadmap)
- `data_catalog` (catalogue de données)
- `data_jobs` (jobs d'automatisation)
- `external_sources` (sources externes Jira/SAP/Monday)

### Colonnes Manquantes sur Tables Existantes
❌ **Initiatives** — Manque:
- `workspace_id` (✅ Ajouté dans migration)
- `strategic_alignment` (score 0-100)
- `risk_score` (calculé)
- `forecast_cost` (prévision budget)
- `forecast_date` (prévision date)

❌ **Risks** — Manque:
- `score` (probability × impact)
- `category` (stratégique, opérationnel, financier)
- `mitigation` (plan d'atténuation)
- `owner_id` (propriétaire du risque)

---

## 🗺️ MAPPING ROUTES NEXT.JS → REACT ROUTER

### Routes Next.js (Architecture cible)
```
/app/portfolio → /portfolio (React Router)
/app/portfolio/risks → /portfolio/risks
/app/portfolio/forecast → /portfolio/forecast
/app/portfolio/arbitrage → /portfolio/arbitrage
/app/portfolio/alignment → /portfolio/alignment

/app/projects → /projects (✅ EXISTE)
/app/projects/new → /projects/new
/app/projects/[id] → /projects/:id (✅ EXISTE)
/app/projects/[id]/governance → /projects/:id/governance
/app/projects/[id]/roadmap → /projects/:id/roadmap
/app/projects/[id]/report → /projects/:id/report

/app/data → /data
/app/data/catalog → /data/catalog
/app/data/quality → /data/quality
/app/data/flows → /data/flows
/app/data/powerbi → /data/powerbi (✅ EXISTE partiellement)

/app/ai → /ai
/app/ai/assistant → /ai/assistant
/app/ai/summarize → /ai/summarize
/app/ai/anomalies → /ai/anomalies
/app/ai/reports → /ai/reports
/app/ai/predict → /ai/predict
```

### Pages Existantes (src/pages/)
✅ **Déjà créées**:
- `Dashboard.jsx` → Page d'accueil app
- `Projects.jsx` → Liste projets (initiatives)
- `ProjectsBoard.jsx` → Vue kanban
- `ProjectDetails.jsx` → Détail projet
- `Documents.jsx` → Gestion documents
- `Reports.jsx` → Rapports Power BI
- `Cockpit.jsx` → Cockpit PMO
- `Portfolio.jsx` → Portfolio stratégique (basique)

❌ **Pages à créer**:
- `PortfolioRisks.jsx` — Matrice risques
- `PortfolioForecast.jsx` — Prévisions atterrissage
- `PortfolioArbitrage.jsx` — Arbitrages IA
- `PortfolioAlignment.jsx` — Alignement stratégique
- `ProjectGovernance.jsx` — Modèles gouvernance
- `ProjectRoadmap.jsx` — Roadmap intelligente
- `ProjectReport.jsx` — Reporting automatisé
- `DataCatalog.jsx` — Catalogue données
- `DataQuality.jsx` — Qualité données
- `DataFlows.jsx` — Automatisation flux
- `DataPowerBI.jsx` — Dashboards exécutifs
- `AIAssistant.jsx` — Assistant IA
- `AISummarize.jsx` — Résumés automatiques
- `AIAnomalies.jsx` — Détection anomalies
- `AIReports.jsx` — Génération rapports
- `AIPredict.jsx` — Analyse prédictive

---

## 📊 SCHÉMA SUPABASE COMPLET (V1)

### Tables Core (Organizations & Workspaces)
```sql
organizations(
  id uuid PRIMARY KEY,
  name text NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
)

workspaces(
  id uuid PRIMARY KEY,
  organization_id uuid REFERENCES organizations(id),
  name text NOT NULL,
  owner_id uuid REFERENCES auth.users(id),
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
)

memberships(
  id uuid PRIMARY KEY,
  workspace_id uuid REFERENCES workspaces(id),
  user_id uuid REFERENCES auth.users(id),
  role text DEFAULT 'member',
  created_at timestamptz DEFAULT now(),
  UNIQUE (workspace_id, user_id)
)
```

### Tables Portfolio & Projects
```sql
portfolios(
  id uuid PRIMARY KEY,
  workspace_id uuid REFERENCES workspaces(id),
  name text NOT NULL,
  description text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
)

initiatives(
  id uuid PRIMARY KEY,
  workspace_id uuid REFERENCES workspaces(id),
  name text NOT NULL,
  description text,
  status text DEFAULT 'draft',
  budget numeric,
  strategic_alignment integer, -- Score 0-100
  risk_score numeric, -- Calculé
  forecast_cost numeric,
  forecast_date date,
  start_date date,
  end_date date,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
)

risks(
  id uuid PRIMARY KEY,
  initiative_id uuid REFERENCES initiatives(id),
  title text NOT NULL,
  description text,
  probability integer, -- 1-3
  impact integer, -- 1-3
  score integer GENERATED ALWAYS AS (probability * impact) STORED,
  category text, -- stratégique, opérationnel, financier
  mitigation text,
  owner_id uuid REFERENCES auth.users(id),
  status text DEFAULT 'open',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
)

decisions(
  id uuid PRIMARY KEY,
  initiative_id uuid REFERENCES initiatives(id),
  title text NOT NULL,
  description text,
  status text DEFAULT 'pending',
  due_date date,
  decided_at timestamptz,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
)
```

### Tables Governance
```sql
governance_templates(
  id uuid PRIMARY KEY,
  workspace_id uuid REFERENCES workspaces(id),
  name text NOT NULL,
  description text,
  cadence text, -- weekly, monthly, quarterly
  deliverables jsonb, -- Liste des livrables attendus
  indicators jsonb, -- Liste des KPI à suivre
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
)

rituals(
  id uuid PRIMARY KEY,
  workspace_id uuid REFERENCES workspaces(id),
  type text NOT NULL, -- comex, codir, steering
  frequency text, -- weekly, monthly
  participants jsonb, -- Liste des participants
  next_date date,
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
)

roadmap_items(
  id uuid PRIMARY KEY,
  initiative_id uuid REFERENCES initiatives(id),
  title text NOT NULL,
  start_date date,
  end_date date,
  status text DEFAULT 'planned',
  dependency_id uuid REFERENCES roadmap_items(id),
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
)
```

### Tables Data & Power BI
```sql
data_catalog(
  id uuid PRIMARY KEY,
  workspace_id uuid REFERENCES workspaces(id),
  source text NOT NULL, -- supabase, jira, sap, monday
  table_name text NOT NULL,
  description text,
  owner text,
  sensitivity text, -- public, confidential, restricted
  quality_score integer, -- 0-100
  last_updated timestamptz,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
)

data_jobs(
  id uuid PRIMARY KEY,
  workspace_id uuid REFERENCES workspaces(id),
  job_type text NOT NULL, -- sync, transform, export
  status text DEFAULT 'pending',
  config jsonb,
  last_run timestamptz,
  next_run timestamptz,
  error_message text,
  created_at timestamptz DEFAULT now()
)

external_sources(
  id uuid PRIMARY KEY,
  workspace_id uuid REFERENCES workspaces(id),
  type text NOT NULL, -- jira, sap, monday, excel
  config jsonb, -- Credentials, endpoints, mapping
  last_sync timestamptz,
  sync_status text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
)
```

---

## 📈 VUES ANALYTIQUES SUPABASE

### portfolio_overview
```sql
CREATE VIEW portfolio_overview AS
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
FROM initiatives i
GROUP BY i.workspace_id;
```

### risk_matrix_view
```sql
CREATE VIEW risk_matrix_view AS
SELECT
  r.initiative_id,
  i.name as initiative_name,
  r.probability,
  r.impact,
  r.score,
  r.category,
  r.status
FROM risks r
JOIN initiatives i ON i.id = r.initiative_id
WHERE r.status = 'open';
```

### forecast_view
```sql
CREATE VIEW forecast_view AS
SELECT
  i.id as initiative_id,
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
  END as budget_status
FROM initiatives i
WHERE i.forecast_cost IS NOT NULL;
```

### anomalies_view
```sql
CREATE VIEW anomalies_view AS
SELECT
  i.id as initiative_id,
  i.name,
  'retard' as type,
  'Fin prévue dépassée' as description,
  'high' as severity
FROM initiatives i
WHERE i.status = 'in_progress' AND i.end_date < now()

UNION ALL

SELECT
  i.id,
  i.name,
  'risque_non_maj' as type,
  'Risques non mis à jour depuis 30j' as description,
  'medium' as severity
FROM initiatives i
JOIN risks r ON r.initiative_id = i.id
WHERE r.updated_at < now() - INTERVAL '30 days'

UNION ALL

SELECT
  i.id,
  i.name,
  'depassement' as type,
  'Dépassement budget prévisionnel > 10%' as description,
  'critical' as severity
FROM initiatives i
WHERE i.forecast_cost > i.budget * 1.1;
```

---

## 🛠️ SERVICES JAVASCRIPT (src/lib/)

### portfolioService.js
```javascript
// Fonctions:
// - getPortfolioOverview(workspaceId)
// - getInitiatives(workspaceId, filters)
// - getRiskMatrix(workspaceId)
// - getForecastData(workspaceId)
// - getAnomalies(workspaceId)
// - getStrategicAlignment(workspaceId)
// - generateArbitrageScenarios(workspaceId, options)
```

### riskService.js
```javascript
// Fonctions:
// - getRisks(initiativeId)
// - createRisk(data)
// - updateRisk(riskId, data)
// - deleteRisk(riskId)
// - getRiskMatrixData(workspaceId)
// - getTopRisks(workspaceId, limit = 10)
// - getCriticalRisks(workspaceId)
```

### decisionService.js
```javascript
// Fonctions:
// - getDecisions(initiativeId)
// - createDecision(data)
// - updateDecision(decisionId, data)
// - getPendingDecisions(workspaceId)
// - getOverdueDecisions(workspaceId)
```

### governanceService.js
```javascript
// Fonctions:
// - getTemplates(workspaceId)
// - createTemplate(data)
// - getRituals(workspaceId)
// - createRitual(data)
// - getNextRitual(workspaceId, type)
// - prepareCommittee(ritualId) // Génération pack comité
```

### roadmapService.js
```javascript
// Fonctions:
// - getRoadmapItems(initiativeId)
// - createRoadmapItem(data)
// - updateRoadmapItem(itemId, data)
// - detectDependencies(workspaceId)
```

### dataService.js
```javascript
// Fonctions:
// - getCatalog(workspaceId)
// - addCatalogEntry(data)
// - updateQualityScore(entryId, score)
// - getDataJobs(workspaceId)
// - triggerJob(jobId)
// - getExternalSources(workspaceId)
// - syncExternalSource(sourceId)
```

### aiService.js
```javascript
// Fonctions:
// - summarizeProject(initiativeId)
// - summarizePortfolio(workspaceId)
// - summarizeCommittee(ritualId)
// - detectAnomalies(workspaceId)
// - generateReport(workspaceId, type)
// - predictDelay(initiativeId)
// - predictBudgetOverrun(initiativeId)
// - calculateSuccessScore(initiativeId)
// - generateCommitteeAssistance(ritualId)
```

---

## 🎨 COMPOSANTS UI (src/components/ui/)

### Dashboard Components
- `KPICard.jsx` — Carte KPI avec icône, valeur, évolution
- `PortfolioStats.jsx` — Stats globales portefeuille
- `AlignmentGauge.jsx` — Jauge d'alignement stratégique

### Risk Components
- `RiskMatrix.jsx` — Matrice 3x3 interactive
- `RiskCard.jsx` — Carte risque individuel
- `RiskHeatmap.jsx` — Heatmap risques

### Forecast Components
- `ForecastCurve.jsx` — Courbes budget/prévisions
- `VarianceChart.jsx` — Chart écarts budget
- `ForecastAlert.jsx` — Alerte dépassement

### Scenario Components
- `ScenarioPanel.jsx` — Panel scénarios IA
- `ScenarioCard.jsx` — Carte scénario individuel
- `ImpactSimulator.jsx` — Simulateur impact décision

### Project Components
- `ProjectList.jsx` — Liste projets (✅ existe)
- `ProjectHeader.jsx` — Header détail projet
- `ProjectTabs.jsx` — Onglets détail projet

### Roadmap Components
- `RoadmapTimeline.jsx` — Timeline Gantt-style
- `RoadmapItem.jsx` — Item de roadmap
- `DependencyGraph.jsx` — Graphe dépendances

### Governance Components
- `GovernanceTemplatePicker.jsx` — Sélecteur modèle
- `RitualAgenda.jsx` — Agenda comité
- `CommitteePack.jsx` — Pack comité généré

### Data Components
- `DataQualityBadge.jsx` — Badge qualité donnée
- `CatalogTable.jsx` — Table catalogue
- `JobStatusBadge.jsx` — Badge statut job

### AI Components
- `AIChatPanel.jsx` — Panel chat IA
- `AIInsightCard.jsx` — Carte insight IA
- `AnomalyAlert.jsx` — Alerte anomalie
- `AIReportPreview.jsx` — Aperçu rapport IA

---

## 🚀 WORKFLOW D'IMPLÉMENTATION (PRIORITÉS)

### Phase 1 — Foundation (Critique)
**Objectif**: Tables, services, pages de base

1. ✅ **Migration SQL V1**: Appliquer MIGRATION_WORKSPACES_COMPLETE_RLS.sql
2. ❌ **Migration SQL V2**: Créer MIGRATION_FULL_ARCHITECTURE_V1.sql avec:
   - governance_templates, rituals, roadmap_items
   - data_catalog, data_jobs, external_sources
   - Colonnes manquantes: strategic_alignment, risk_score, forecast_*, score, category, mitigation
   - Vues: portfolio_overview, risk_matrix_view, forecast_view, anomalies_view
3. ❌ **Services Core**: portfolioService.js, riskService.js, decisionService.js
4. ❌ **Pages Core**: Portfolio.jsx (refacto), PortfolioRisks.jsx, ProjectRoadmap.jsx

### Phase 2 — Portfolio Management (Haute priorité)
**Objectif**: Pilotage stratégique complet

5. ❌ **PortfolioForecast.jsx** — Prévisions atterrissage
6. ❌ **PortfolioArbitrage.jsx** — Arbitrages IA
7. ❌ **PortfolioAlignment.jsx** — Alignement stratégique
8. ❌ **Composants**: RiskMatrix, ForecastCurve, AlignmentGauge, ScenarioPanel
9. ❌ **Service IA**: aiService.js (summarize, detect, predict, generate)

### Phase 3 — Governance & PMO (Moyenne priorité)
**Objectif**: Rituels et gouvernance

10. ❌ **governanceService.js** — Modèles et rituels
11. ❌ **ProjectGovernance.jsx** — Modèles gouvernance
12. ❌ **ProjectReport.jsx** — Reporting automatisé
13. ❌ **Composants**: GovernanceTemplatePicker, RitualAgenda, CommitteePack

### Phase 4 — Data & Power BI (Moyenne priorité)
**Objectif**: Intégration données

14. ❌ **dataService.js** — Catalogue et jobs
15. ❌ **DataCatalog.jsx** — Catalogue données
16. ❌ **DataQuality.jsx** — Qualité données
17. ❌ **DataFlows.jsx** — Automatisation flux
18. ❌ **Composants**: DataQualityBadge, CatalogTable, JobStatusBadge

### Phase 5 — AI Features (Basse priorité)
**Objectif**: Features IA avancées

19. ❌ **AIAssistant.jsx** — Assistant IA comités
20. ❌ **AISummarize.jsx** — Résumés automatiques
21. ❌ **AIAnomalies.jsx** — Détection anomalies
22. ❌ **AIReports.jsx** — Génération rapports
23. ❌ **AIPredict.jsx** — Analyse prédictive
24. ❌ **Composants**: AIChatPanel, AIInsightCard, AnomalyAlert

---

## 📦 DÉPENDANCES & INTÉGRATIONS

### Power BI
- **Backend**: `/backend/server.js` (embed tokens Azure AD)
- **Reports existants**: commercial, finance, pmo, predictive, operational, strategic
- **Nouveaux reports**: portfolio_overview, risk_matrix, forecast_dashboard

### OpenAI / Azure OpenAI
- **Service**: aiService.js utilise OpenAI API
- **Use cases**: Résumés, détection anomalies, génération rapports, prédictions
- **Config**: Env var OPENAI_API_KEY ou Azure OpenAI credentials

### Jira / SAP / Monday
- **Service**: dataService.js + external_sources table
- **Sync**: Cron jobs ou webhooks
- **Mapping**: Jira issues → initiatives, Jira risks → risks

---

## 📝 NOTES IMPORTANTES

### Différences Stack
⚠️ **Architecture fournie**: Next.js App Router  
✅ **Stack actuelle**: React Router v6 + Vite

**Adaptation**:
- Pas de `/app/` → Routes React Router classiques
- Pas de Server Components → Client-side uniquement
- Pas d'API Routes → Backend séparé (Express.js)

### Tables Risks & Decisions
✅ **Existent déjà** dans SUPABASE_SCHEMA_COMPLETE.sql  
❌ **Manquent colonnes**: score, category, mitigation, owner_id sur risks

### RLS Policies
✅ **Déjà implémentées** pour organizations, workspaces, memberships, initiatives, portfolios  
❌ **À créer** pour nouvelles tables: governance_templates, rituals, roadmap_items, data_catalog, data_jobs, external_sources

---

## ✅ CHECKLIST DÉPLOIEMENT

- [ ] Appliquer MIGRATION_WORKSPACES_COMPLETE_RLS.sql (Phase 1 existante)
- [ ] Créer et appliquer MIGRATION_FULL_ARCHITECTURE_V1.sql (Phase 2 nouvelles tables)
- [ ] Créer 6 services: portfolio, risk, decision, governance, roadmap, data, ai
- [ ] Créer 15+ pages: Portfolio*, Project*, Data*, AI*
- [ ] Créer 20+ composants UI
- [ ] Configurer Power BI reports (portfolio, risks, forecast)
- [ ] Configurer OpenAI API pour features IA
- [ ] Configurer external sources (Jira/SAP/Monday optionnel)
- [ ] Tests E2E: Création org → workspace → initiative → risks → forecast
- [ ] Déployer frontend (Vercel)
- [ ] Déployer backend (VPS)

---

**FIN DU DOCUMENT**
