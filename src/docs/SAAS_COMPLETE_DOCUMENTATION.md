# POWALYZE - Documentation Complète SaaS

## Table des Matières

1. [Vision & Architecture](#vision--architecture)
2. [Modèle de Données](#modèle-de-données)
3. [User Stories par Persona](#user-stories-par-persona)
4. [Écrans Clés](#écrans-clés)
5. [API & Services](#api--services)
6. [Guide d'Implémentation](#guide-dimplémentation)

---

## Vision & Architecture

### Vue d'ensemble

Powalyze est un **Operating System de Gouvernance** conçu pour les PMO, directions et consultants qui veulent piloter leurs portefeuilles, programmes et projets avec:

- **Traçabilité complète** des décisions
- **Intelligence Artificielle prédictive** pour anticiper les risques
- **Rituels de gouvernance structurés** (comités, revues)
- **Tableaux de bord exécutifs**
- **Intégration Power BI**

### Stack Technique

**Frontend:**
- React 18
- Vite 4.5.5
- Framer Motion (animations)
- Lucide React (icônes)
- Tailwind CSS
- React Router v6

**Backend:**
- Supabase (PostgreSQL + Auth + Storage)
- Row Level Security (RLS)
- Real-time subscriptions

**Déploiement:**
- Vercel (frontend)
- Supabase Cloud (backend)

### Architecture en Couches

```
┌─────────────────────────────────────┐
│     UI Components (React)           │
├─────────────────────────────────────┤
│     Pages & Routes                  │
├─────────────────────────────────────┤
│     Services (Business Logic)       │
├─────────────────────────────────────┤
│     Supabase Client (API)           │
├─────────────────────────────────────┤
│     PostgreSQL Database             │
└─────────────────────────────────────┘
```

---

## Modèle de Données

### 1. Organisation & Utilisateurs

#### **Organization**
```sql
- id: UUID
- name: VARCHAR(255)
- domain: VARCHAR(255) [OPTIONAL]
- logo_url: TEXT
- settings: JSONB
- is_active: BOOLEAN
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **User**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- email: VARCHAR(255) UNIQUE
- password_hash: VARCHAR(255)
- first_name: VARCHAR(100)
- last_name: VARCHAR(100)
- role: ENUM(PMO, EXECUTIVE, DATA, PROJECT_MANAGER, CONSULTANT, ADMIN)
- avatar_url: TEXT
- is_active: BOOLEAN
- last_login_at: TIMESTAMP
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **Role** (granular permissions)
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- name: VARCHAR(100)
- description: TEXT
- permissions: JSONB[]
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 2. Gouvernance & Portefeuilles

#### **Portfolio**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- name: VARCHAR(255)
- description: TEXT
- owner_user_id: UUID → users(id)
- status: ENUM(ACTIVE, ON_HOLD, CLOSED)
- strategic_axis: VARCHAR(255)
- priority: INTEGER (1-5)
- start_date: DATE
- end_date: DATE
- budget_planned: DECIMAL(15,2)
- budget_actual: DECIMAL(15,2)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **Program**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- portfolio_id: UUID → portfolios(id)
- name: VARCHAR(255)
- description: TEXT
- owner_user_id: UUID → users(id)
- status: ENUM(ACTIVE, ON_HOLD, CLOSED)
- start_date: DATE
- end_date: DATE
- budget_planned: DECIMAL(15,2)
- budget_actual: DECIMAL(15,2)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **Project**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- portfolio_id: UUID → portfolios(id)
- program_id: UUID → programs(id) [NULLABLE]
- name: VARCHAR(255)
- description: TEXT
- sponsor_user_id: UUID → users(id)
- project_manager_user_id: UUID → users(id)
- status: ENUM(NOT_STARTED, IN_PROGRESS, AT_RISK, BLOCKED, DONE)
- health: ENUM(GREEN, AMBER, RED)
- start_date: DATE
- end_date: DATE
- budget_planned: DECIMAL(15,2)
- budget_actual: DECIMAL(15,2)
- progress_percent: INTEGER (0-100)
- metadata: JSONB
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 3. Comités & Gouvernance

#### **CommitteeType**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- name: VARCHAR(255) (ex: "Comité de pilotage")
- description: TEXT
- frequency: ENUM(WEEKLY, BIWEEKLY, MONTHLY, QUARTERLY, AD_HOC)
- default_participants: JSONB[] (userIds)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **Committee**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- committee_type_id: UUID → committee_types(id)
- date: TIMESTAMP
- status: ENUM(PLANNED, IN_PROGRESS, CLOSED)
- agenda: TEXT
- chair_user_id: UUID → users(id)
- notes: TEXT
- participants: JSONB[]
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **CommitteeItem**
```sql
- id: UUID
- committee_id: UUID → committees(id)
- type: ENUM(PROJECT_REVIEW, RISK_REVIEW, DECISION, INFORMATION, ESCALATION)
- title: VARCHAR(255)
- description: TEXT
- related_project_id: UUID → projects(id) [NULLABLE]
- related_risk_id: UUID → risks(id) [NULLABLE]
- related_decision_id: UUID → decisions(id) [NULLABLE]
- status: ENUM(PENDING, DISCUSSING, CLOSED)
- order_index: INTEGER
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 4. Décisions

#### **Decision**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- title: VARCHAR(255)
- description: TEXT
- decision_date: DATE
- status: ENUM(PLANNED, TAKEN, REJECTED, DEFERRED)
- decision_type: ENUM(GO, NO_GO, SCOPE_CHANGE, BUDGET, PRIORITY, RISK_ACCEPT, RISK_MITIGATE, OTHER)
- committee_id: UUID → committees(id) [NULLABLE]
- created_by_user_id: UUID → users(id)
- approved_by_user_id: UUID → users(id) [NULLABLE]
- related_portfolio_id: UUID → portfolios(id) [NULLABLE]
- related_program_id: UUID → programs(id) [NULLABLE]
- related_project_id: UUID → projects(id) [NULLABLE]
- impact_summary: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **DecisionAction**
```sql
- id: UUID
- decision_id: UUID → decisions(id)
- title: VARCHAR(255)
- description: TEXT
- owner_user_id: UUID → users(id)
- due_date: DATE
- status: ENUM(OPEN, IN_PROGRESS, DONE, CANCELLED)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 5. Risques & IA

#### **Risk**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- title: VARCHAR(255)
- description: TEXT
- owner_user_id: UUID → users(id)
- related_portfolio_id: UUID → portfolios(id) [NULLABLE]
- related_program_id: UUID → programs(id) [NULLABLE]
- related_project_id: UUID → projects(id) [NULLABLE]
- probability: INTEGER (1-5)
- impact: INTEGER (1-5)
- severity: INTEGER (CALCULATED: probability * impact)
- status: ENUM(OPEN, MITIGATED, CLOSED, ACCEPTED)
- mitigation_plan: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **PredictiveSignal**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- source_type: ENUM(PROJECT, PORTFOLIO, PROGRAM)
- source_id: UUID
- signal_type: ENUM(DELAY_RISK, BUDGET_RISK, RESOURCE_OVERLOAD, SCOPE_DRIFT)
- score: INTEGER (0-100)
- message: TEXT
- recommended_action: TEXT
- is_acknowledged: BOOLEAN
- acknowledged_by_user_id: UUID → users(id) [NULLABLE]
- acknowledged_at: TIMESTAMP [NULLABLE]
- created_at: TIMESTAMP
```

### 6. KPI & Reporting

#### **KpiDefinition**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- name: VARCHAR(255)
- code: VARCHAR(100)
- description: TEXT
- unit: VARCHAR(50)
- target_value: DECIMAL(15,2) [NULLABLE]
- direction: ENUM(HIGHER_IS_BETTER, LOWER_IS_BETTER)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **KpiValue**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- kpi_definition_id: UUID → kpi_definitions(id)
- scope_type: ENUM(PORTFOLIO, PROGRAM, PROJECT, ORGANIZATION)
- scope_id: UUID
- value: DECIMAL(15,2)
- date: DATE
- created_at: TIMESTAMP
```

### 7. Documents & Référentiels

#### **Document**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- name: VARCHAR(255)
- url: TEXT
- type: ENUM(CHARTER, SLIDE, REPORT, CONTRACT, OTHER)
- related_project_id: UUID → projects(id) [NULLABLE]
- related_portfolio_id: UUID → portfolios(id) [NULLABLE]
- related_program_id: UUID → programs(id) [NULLABLE]
- created_by_user_id: UUID → users(id)
- file_size: BIGINT
- mime_type: VARCHAR(100)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 8. Collaboration & Notifications

#### **Comment**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- author_user_id: UUID → users(id)
- entity_type: ENUM(PROJECT, DECISION, RISK, COMMITTEE, PORTFOLIO, PROGRAM)
- entity_id: UUID
- content: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **Notification**
```sql
- id: UUID
- organization_id: UUID → organizations(id)
- user_id: UUID → users(id)
- type: ENUM(NEW_DECISION, RISK_UPDATED, COMMITTEE_UPCOMING, ACTION_DUE, PROJECT_STATUS_CHANGE, PREDICTIVE_SIGNAL)
- title: VARCHAR(255)
- message: TEXT
- payload: JSONB
- is_read: BOOLEAN
- read_at: TIMESTAMP [NULLABLE]
- created_at: TIMESTAMP
```

---

## User Stories par Persona

### 3.1. PMO

**US-PMO-01**  
*En tant que PMO, je veux voir un cockpit global des portefeuilles, projets, risques et décisions pour préparer mes comités.*

**Critères d'acceptation:**
- Dashboard avec KPIs clés
- Filtres par portefeuille, santé, statut
- Alertes prédictives IA visibles
- Accès rapide aux comités à venir

**US-PMO-02**  
*En tant que PMO, je veux configurer les types de comités, leurs fréquences et leurs participants pour structurer la gouvernance.*

**US-PMO-03**  
*En tant que PMO, je veux préparer un comité avec un ordre du jour basé sur les projets à risque, les décisions en attente et les signaux IA.*

**US-PMO-04**  
*En tant que PMO, je veux tracer toutes les décisions prises en comité et les lier aux projets et portefeuilles concernés.*

**US-PMO-05**  
*En tant que PMO, je veux exporter un compte-rendu de comité avec décisions, actions et risques mis à jour.*

---

### 3.2. Direction (Executive)

**US-EXEC-01**  
*En tant que membre de la direction, je veux voir une vue synthétique de la santé du portefeuille pour décider rapidement.*

**US-EXEC-02**  
*En tant que membre de la direction, je veux voir les décisions stratégiques récentes et leurs impacts.*

**US-EXEC-03**  
*En tant que membre de la direction, je veux être alerté des risques critiques et des dérives majeures.*

**US-EXEC-04**  
*En tant que membre de la direction, je veux valider ou refuser des décisions proposées par le PMO.*

---

### 3.3. Data / BI

**US-DATA-01**  
*En tant que Data/BI, je veux accéder à un modèle de données propre (portefeuilles, projets, décisions, risques) pour alimenter Power BI.*

**US-DATA-02**  
*En tant que Data/BI, je veux configurer des KPI et les lier aux portefeuilles et projets.*

**US-DATA-03**  
*En tant que Data/BI, je veux publier des dashboards exécutifs connectés à Powalyze.*

---

### 3.4. Chef de projet

**US-PM-01**  
*En tant que chef de projet, je veux mettre à jour l'état de mon projet (statut, santé, avancement).*

**US-PM-02**  
*En tant que chef de projet, je veux déclarer des risques et les suivre.*

**US-PM-03**  
*En tant que chef de projet, je veux voir les décisions qui impactent mon projet.*

**US-PM-04**  
*En tant que chef de projet, je veux préparer mon passage en comité avec les points clés et les demandes de décision.*

---

### 3.5. Consultant

**US-CONSULT-01**  
*En tant que consultant, je veux accompagner un client dans la structuration de sa gouvernance dans Powalyze.*

**US-CONSULT-02**  
*En tant que consultant, je veux configurer un modèle de gouvernance (comités, rituels, KPI) réutilisable.*

---

## Écrans Clés

### 4.1. Executive Cockpit

**Objectif:** Vue 10 secondes de la gouvernance

**Sections:**
1. **KPIs globaux**
   - Total Portefeuilles
   - Total Projets
   - Risques Critiques
   - Décisions en Attente

2. **Alertes Prédictives IA**
   - Bandeau avec signaux (score > 70)
   - Message + Recommandation

3. **Santé des Projets**
   - Répartition GREEN / AMBER / RED

4. **Prochains Comités**
   - Liste chronologique
   - Lien vers préparation

5. **Risques Critiques**
   - Top 5 par sévérité

6. **Décisions en Attente**
   - Liste des décisions PLANNED

---

### 4.2. Portfolio View

**Objectif:** Piloter les portefeuilles et programmes

**Features:**
- Filtres: Portefeuille, Statut, Santé
- Vue Kanban ou Tableau
- Drill-down par portefeuille
- Santé visuelle (barre de progression)
- Liens rapides vers projets

---

### 4.3. Project Detail (Vue 360°)

**Onglets:**

1. **Overview**
   - Sponsor, PM, Dates, Budget
   - KPIs clés
   - Signaux prédictifs IA
   - Avancement %

2. **Risks**
   - Liste des risques
   - Sévérité, Probabilité, Impact
   - Plan de mitigation

3. **Decisions**
   - Décisions liées au projet
   - Statut, Type, Impact

4. **Actions**
   - Actions issues des décisions
   - Owner, Due Date, Status

5. **Documents**
   - Charte, Slides, Rapports

6. **History / Audit**
   - Timeline des changements

---

### 4.4. Committee View

**Features:**
- Liste des comités (Planifiés / En cours / Terminés)
- Détail comité:
  - Ordre du jour structuré
  - Points (projets, risques, décisions)
  - Participants
  - Notes
- Export compte-rendu PDF/MD

---

### 4.5. Decision Hub

**Features:**
- Registre central
- Filtres: Statut, Type, Date, Projet, Comité
- Vue détaillée:
  - Contexte
  - Décision
  - Impacts
  - Actions associées
  - Historique

---

### 4.6. Risk & Predictive Intelligence

**Vues:**

1. **Risques**
   - Liste par sévérité
   - Filtres (portefeuille, projet, owner, sévérité min)
   - Détail: Probabilité, Impact, Mitigation

2. **Signaux IA**
   - Score 0-100
   - Type: DELAY_RISK, BUDGET_RISK, RESOURCE_OVERLOAD, SCOPE_DRIFT
   - Message + Recommandation
   - Bouton "Acknowledger"

3. **Matrice 5x5**
   - Visualisation des risques par Probabilité × Impact
   - Zones colorées (vert → rouge)

---

## API & Services

### Service: `portfolioService.js`

**Méthodes principales:**

```javascript
// Portfolios
createPortfolio(organizationId, portfolioData)
getPortfolios(organizationId, filters)
getPortfolioById(portfolioId)
updatePortfolio(portfolioId, updates)
deletePortfolio(portfolioId)
getPortfolioKPIs(portfolioId)
getPortfolioRisks(portfolioId)
getPortfolioDecisions(portfolioId)
getPortfolioDashboard(organizationId)

// Programs
createProgram(organizationId, programData)
getPrograms(organizationId, portfolioId)
updateProgram(programId, updates)
deleteProgram(programId)

// Projects
createProject(organizationId, projectData)
getProjects(organizationId, filters)
getProjectById(projectId)
updateProject(projectId, updates)
deleteProject(projectId)
getProjectFull(projectId) // Vue 360°
```

---

### Service: `committeeService.js`

```javascript
// Committee Types
createCommitteeType(organizationId, typeData)
getCommitteeTypes(organizationId)
updateCommitteeType(typeId, updates)

// Committees
createCommittee(organizationId, committeeData)
getCommittees(organizationId, filters)
getCommitteeById(committeeId)
updateCommittee(committeeId, updates)
deleteCommittee(committeeId)
getUpcomingCommittees(organizationId, limit)
exportCommitteeReport(committeeId)

// Committee Items
createCommitteeItem(itemData)
getCommitteeItems(committeeId)
updateCommitteeItem(itemId, updates)
deleteCommitteeItem(itemId)
reorderItems(itemsWithNewOrder)
```

---

### Service: `decisionRiskService.js`

```javascript
// Decisions
createDecision(organizationId, decisionData)
getDecisions(organizationId, filters)
getDecisionById(decisionId)
updateDecision(decisionId, updates)
deleteDecision(decisionId)
approveDecision(decisionId, approvedByUserId)
rejectDecision(decisionId)
getPendingDecisions(organizationId)

// Decision Actions
createAction(actionData)
getActionsByDecision(decisionId)
getActionsByUser(userId, status)
updateAction(actionId, updates)
completeAction(actionId)
getOverdueActions(organizationId)

// Risks
createRisk(organizationId, riskData)
getRisks(organizationId, filters)
getRiskById(riskId)
updateRisk(riskId, updates)
deleteRisk(riskId)
getCriticalRisks(organizationId)
getRiskMatrix(organizationId)

// Predictive Signals
createSignal(organizationId, signalData)
getSignals(organizationId, filters)
acknowledgeSignal(signalId, userId)
getUnacknowledgedSignals(organizationId, minScore)
```

---

### Service: `kpiService.js`

```javascript
// KPI Definitions
createKPIDefinition(organizationId, kpiData)
getKPIDefinitions(organizationId)
getKPIDefinitionById(kpiId)
updateKPIDefinition(kpiId, updates)
deleteKPIDefinition(kpiId)

// KPI Values
recordKPIValue(organizationId, valueData)
getKPIValues(kpiDefinitionId, filters)
getKPIValuesByScope(scopeType, scopeId, filters)
getLatestKPIValues(scopeType, scopeId)
getKPITrend(kpiDefinitionId, scopeType, scopeId, days)
getOrganizationKPIDashboard(organizationId)
```

---

## Guide d'Implémentation

### Étape 1: Déployer le schéma SQL

```bash
# Se connecter à Supabase
cd supabase

# Appliquer la migration
supabase db push

# Ou via l'interface Supabase
# SQL Editor → Coller le contenu de 20260109_complete_saas_schema.sql
```

### Étape 2: Configurer Supabase Auth

```javascript
// Dans customSupabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Étape 3: Configurer Row Level Security (RLS)

```sql
-- Exemple pour la table projects
CREATE POLICY "Users can view projects in their organization"
ON projects FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);

CREATE POLICY "PMO and Admins can insert projects"
ON projects FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND organization_id = projects.organization_id
    AND role IN ('PMO', 'ADMIN')
  )
);
```

### Étape 4: Intégrer les pages dans App.jsx

```javascript
// Dans src/App.jsx
import ExecutiveCockpit from './pages/ExecutiveCockpit';
import PortfolioView from './pages/PortfolioView';
import ProjectDetail from './pages/ProjectDetail';
import CommitteeView from './pages/CommitteeView';
import DecisionHub from './pages/DecisionHub';
import RiskIntelligence from './pages/RiskIntelligence';

// Ajouter les routes
<Route path="/cockpit" element={<ExecutiveCockpit />} />
<Route path="/portfolio" element={<PortfolioView />} />
<Route path="/projects/:projectId" element={<ProjectDetail />} />
<Route path="/committees" element={<CommitteeView />} />
<Route path="/decisions" element={<DecisionHub />} />
<Route path="/risks" element={<RiskIntelligence />} />
```

### Étape 5: Tester en local

```bash
npm run dev
```

### Étape 6: Build & Deploy

```bash
npm run build
vercel --prod
```

---

## Prochaines Étapes

### Phase 1: MVP (4 semaines)
- [ ] Authentification Supabase
- [ ] CRUD Portefeuilles/Projets
- [ ] Executive Cockpit basique
- [ ] Portfolio View
- [ ] Project Detail

### Phase 2: Gouvernance (4 semaines)
- [ ] Comités + Types
- [ ] Décisions + Actions
- [ ] Risques
- [ ] Committee View
- [ ] Decision Hub

### Phase 3: IA & Analytics (4 semaines)
- [ ] Signaux prédictifs IA
- [ ] KPIs
- [ ] Matrice de risques
- [ ] Risk Intelligence
- [ ] Notifications

### Phase 4: Intégrations (4 semaines)
- [ ] Power BI Embed
- [ ] Export PDF/Excel
- [ ] API REST publique
- [ ] Webhooks

---

**Auteur:** AI Assistant  
**Date:** 2026-01-09  
**Version:** 1.0  
**Statut:** ✅ Complet
