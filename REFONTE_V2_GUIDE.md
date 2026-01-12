# Powalyze V2 - Guide de Refonte Complète

## 🎯 Vision

**Un seul endroit pour gérer les projets : "Projects"**

Hiérarchie : **Organization → Portfolios → Projects → Phases → Tasks**

- Portfolio = vue agrégée (pas de création de projets)
- Executive Dashboard = vue synthétique (pas de duplication)
- Gouvernance first : budget, risques, arbitrages, priorisation

---

## 📊 Nouveau Modèle de Données

### Schéma Complet

✅ **Fichier créé** : `supabase/schema_refonte_v2.sql`

**Tables principales** :
- `organizations` - Organisation cliente
- `profiles` - Utilisateurs (roles: ADMIN, PMO, PM, EXECUTIVE, VIEWER)
- `portfolios` - Portefeuilles (agrégateurs)
- `projects` - **SOURCE DE VÉRITÉ** (code unique, budget, planning, gouvernance)
- `phases` - Phases d'exécution (order_index, budget, livrables)
- `tasks` - Tâches dans les phases
- `kpis` - Indicateurs de performance
- `risks` - Risques projet/phase
- `budget_entries` - Entrées budgétaires détaillées (PLANNED/ACTUAL, CAPEX/OPEX)

**RLS activé** : toutes les tables avec policies basées sur `organization_id`

---

## 🚀 Étape 1 : Déploiement du Nouveau Schéma

### Option A : Recréer la base (recommandé pour dev)

```sql
-- Dans Supabase SQL Editor
-- Exécuter : supabase/schema_refonte_v2.sql
-- ⚠️ Ceci supprime toutes les tables existantes
```

### Option B : Migration progressive (production)

1. **Backup des données actuelles** :
   ```sql
   -- Export depuis Supabase Dashboard > Database > Backups
   ```

2. **Créer les nouvelles tables** sans supprimer les anciennes :
   ```sql
   -- Retirer les DROP TABLE du début de schema_refonte_v2.sql
   ```

3. **Migrer les données** :
   ```sql
   -- Script de migration à créer : migration_v1_to_v2.sql
   INSERT INTO projects (organization_id, name, ...)
   SELECT organization_id, title AS name, ...
   FROM old_projects;
   ```

---

## 🛠️ Étape 2 : Services Layer

### Services créés

✅ **portfolioServiceV2.js** - Gestion portfolios (agrégateurs)
- `getPortfolios()`, `getPortfolioById()`, `getPortfolioStats()`, `getPortfolioRisks()`

✅ **projectServiceV2.js** - Source unique projets
- `getProjects()`, `createProject()`, `getProjectStats()`, `getProjectTimeline()`

✅ **phaseService.js** - Phases d'exécution
- `getPhasesByProject()`, `createPhase()`, `reorderPhases()`, `syncPhaseCompletion()`

✅ **budgetService.js** - Gestion budgétaire
- `getBudgetEntriesByProject()`, `createBudgetEntry()`, `getProjectBudgetStats()`

### Anciens services à supprimer

- ❌ `src/lib/projectService.js` (remplacé par projectServiceV2.js)
- ❌ `src/lib/portfolioService.js` (remplacé par portfolioServiceV2.js)

---

## 🎨 Étape 3 : Refonte Navigation

### Nouvelle structure

```
Dashboard (Executive)
├── Portfolios
│   ├── Liste
│   └── [portfolioId]
│       ├── Overview
│       ├── Projects (référencés)
│       ├── Budget
│       └── Risks
├── Projects (COEUR)
│   ├── Liste
│   ├── /new (création)
│   └── [projectId]
│       ├── Overview
│       ├── Phases
│       ├── Budget & Performance
│       ├── KPIs
│       └── Risks
├── Reports
│   ├── Templates
│   └── Exports
└── Admin
    ├── Organization
    ├── Users & Roles
    └── Settings
```

### Fichiers à modifier

**1. src/App.jsx** - Nettoyer les routes

```jsx
// SUPPRIMER routes en doublon :
// - /portfolio/create (création déplacée dans Projects)
// - /dashboard/projects (doublon avec /projects)
// - Routes exécutives créant des projets

// GARDER structure simple :
<Route path="/dashboard" element={<ProtectedRoute><ExecutiveDashboard /></ProtectedRoute>} />
<Route path="/portfolios" element={<ProtectedRoute><PortfoliosList /></ProtectedRoute>} />
<Route path="/portfolios/:id" element={<ProtectedRoute><PortfolioDetail /></ProtectedRoute>} />
<Route path="/projects" element={<ProtectedRoute><ProjectsList /></ProtectedRoute>} />
<Route path="/projects/new" element={<ProtectedRoute><ProjectNew /></ProtectedRoute>} />
<Route path="/projects/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
```

**2. src/components/Header.jsx** - Navigation principale

```jsx
<nav>
  <Link to="/dashboard">Dashboard</Link>
  <Link to="/portfolios">Portfolios</Link>
  <Link to="/projects">Projects</Link>
  <Link to="/reports">Reports</Link>
  <Link to="/admin">Admin</Link>
</nav>
```

---

## 📄 Étape 4 : Nouvelles Pages

### 4.1. Dashboard (Executive)

**Fichier** : `src/pages/DashboardExecutive.jsx`

**Contenu** :
- Bloc portefeuille global (budget total, projets actifs)
- Santé des projets (On Track / At Risk / Off Track)
- Top 5 risques
- Sujets à arbitrer
- Timeline Gantt haut niveau

**PAS de création de données**, juste agrégation.

---

### 4.2. Portfolios

**Liste** : `src/pages/portfolios/PortfoliosList.jsx`
- Table : Nom, Propriétaire, Nb projets, Budget, Santé
- Bouton "Créer portfolio"

**Détail** : `src/pages/portfolios/PortfolioDetail.jsx`
- Info générale
- **Liste des projets référencés** (pas créés ici)
- Graphiques (budget, santé, répartition)
- Risques agrégés

---

### 4.3. Projects (COEUR)

**Liste** : `src/pages/projects/ProjectsList.jsx`
- Table : Code, Nom, Portfolio, Manager, Status, Budget, % avanc.
- Filtres : portfolio, status, type, manager
- Bouton "Créer projet"

**Création** : `src/pages/projects/ProjectNew.jsx`

Formulaire 6 blocs :
1. **Identité** : Nom, Code, Type, Département, Portfolio
2. **Gouvernance** : Sponsor, PM, Comité, Fréquence
3. **Périmètre** : Objectif principal, KPIs de succès
4. **Planning** : Dates, Milestones
5. **Budget** : Total, Capex/Opex, Ventilation
6. **Risques** : Risques initiaux, Dépendances

**Détail** : `src/pages/projects/ProjectDetail.jsx`

Onglets :
- Overview (infos générales)
- Phases (liste + détail)
- Budget & Performance (graphiques, KPIs)
- Risks

---

### 4.4. Reports

**Fichier** : `src/pages/Reports.jsx`

- Templates (Rapport projet, Portfolio, Mensuel exécutif)
- Exports CSV/XLS (projets, budget, risques)

---

### 4.5. Admin

**Fichier** : `src/pages/Admin.jsx`

- Paramètres organisation (nom, logo, langues)
- Utilisateurs & rôles
- Types de projets, Statuts standards
- Templates de phases réutilisables

---

## 🗂️ Structure de Fichiers (Vite/React)

```
src/
├── pages/
│   ├── DashboardExecutive.jsx
│   ├── portfolios/
│   │   ├── PortfoliosList.jsx
│   │   └── PortfolioDetail.jsx
│   ├── projects/
│   │   ├── ProjectsList.jsx
│   │   ├── ProjectNew.jsx
│   │   └── ProjectDetail.jsx
│   │       ├── ProjectOverview.jsx
│   │       ├── ProjectPhases.jsx
│   │       ├── ProjectBudget.jsx
│   │       └── ProjectRisks.jsx
│   ├── Reports.jsx
│   └── Admin.jsx
├── lib/
│   ├── portfolioServiceV2.js ✅
│   ├── projectServiceV2.js ✅
│   ├── phaseService.js ✅
│   ├── budgetService.js ✅
│   ├── kpiService.js
│   └── riskServiceV2.js
└── components/
    ├── Header.jsx (navigation refaite)
    ├── projects/
    │   ├── ProjectForm.jsx (formulaire 6 blocs)
    │   ├── ProjectCard.jsx
    │   └── PhaseTimeline.jsx
    └── portfolios/
        ├── PortfolioCard.jsx
        └── PortfolioStats.jsx
```

---

## ✅ Checklist de Refonte

### Phase 1 : Base de données
- [x] Créer schema_refonte_v2.sql
- [ ] Déployer sur Supabase (dev)
- [ ] Tester RLS policies
- [ ] Migrer données existantes (si prod)

### Phase 2 : Services
- [x] portfolioServiceV2.js
- [x] projectServiceV2.js
- [x] phaseService.js
- [x] budgetService.js
- [ ] kpiService.js (adapter existant)
- [ ] riskServiceV2.js

### Phase 3 : Navigation
- [ ] Nettoyer App.jsx (supprimer routes doublons)
- [ ] Refaire Header.jsx (menu simple)
- [ ] Supprimer pages obsolètes

### Phase 4 : Pages principales
- [ ] DashboardExecutive.jsx (vue agrégée)
- [ ] PortfoliosList.jsx + PortfolioDetail.jsx
- [ ] ProjectsList.jsx + ProjectNew.jsx + ProjectDetail.jsx
- [ ] Reports.jsx
- [ ] Admin.jsx

### Phase 5 : Composants
- [ ] ProjectForm (formulaire 6 blocs)
- [ ] PhaseTimeline (Gantt simple)
- [ ] BudgetChart (prévu vs réel)
- [ ] RiskMatrix (impact/probabilité)

### Phase 6 : Polissage
- [ ] Traductions (fr, en, de, no)
- [ ] Design system (composants Shadcn)
- [ ] Tests utilisateur
- [ ] Déploiement production

---

## 🎬 Ordre de Travail Recommandé

1. **Déployer schéma DB** (schema_refonte_v2.sql)
2. **Tester services** dans console JS ou composant test
3. **Créer page Projects** (liste + création) → COEUR du produit
4. **Créer page Portfolio** (référence les projets)
5. **Créer Executive Dashboard** (agrégation)
6. **Nettoyer navigation** (App.jsx + Header.jsx)
7. **Ajouter Phases/Budget/KPIs** dans Project Detail
8. **Reports & Admin** en dernier

---

## 🚨 Principes Non-Négociables

1. ✅ **Projects est la source unique de vérité**
2. ✅ **Portfolio ne crée PAS de projets** (juste référence via portfolio_id)
3. ✅ **Executive Dashboard ne crée RIEN** (vue read-only)
4. ✅ **Hiérarchie stricte** : Org → Portfolio → Project → Phase → Task
5. ✅ **RLS activé** sur toutes les tables (multi-tenant)

---

## 📞 Support

Questions ? Voir :
- `supabase/schema_refonte_v2.sql` - Schéma complet
- `src/lib/*ServiceV2.js` - Services créés
- Copilot instructions : `copilot-instructions.md`

**Prochaine étape** : Déployer schema_refonte_v2.sql sur Supabase et créer ProjectsList.jsx
