# Powalyze - Operating System de Gouvernance

> Un SaaS complet pour piloter vos portefeuilles, programmes et projets avec traçabilité, gouvernance structurée et intelligence artificielle prédictive.

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- Compte Supabase
- npm ou yarn

### Installation

```bash
# 1. Cloner le repo
git clone https://github.com/votre-org/powalyze.git
cd powalyze

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos credentials Supabase

# 4. Appliquer la migration SQL
# Via Supabase Dashboard > SQL Editor
# Exécuter: supabase/migrations/20260109_complete_saas_schema.sql

# 5. Lancer en dev
npm run dev
```

---

## 📊 Architecture du Système

### Vue d'ensemble

```
┌─────────────────────────────────────────┐
│        POWALYZE GOVERNANCE OS           │
├─────────────────────────────────────────┤
│  Executive   │  Portfolio  │  Committee │
│   Cockpit    │    View     │    View    │
├──────────────┼─────────────┼────────────┤
│   Decision   │    Risk     │   Project  │
│     Hub      │Intelligence │   Detail   │
└─────────────────────────────────────────┘
              ▼
┌─────────────────────────────────────────┐
│         SERVICES BACKEND                │
├─────────────────────────────────────────┤
│ Portfolio │ Committee │ Decision │ Risk │
│  Service  │  Service  │  Service │  KPI │
└─────────────────────────────────────────┘
              ▼
┌─────────────────────────────────────────┐
│      SUPABASE (PostgreSQL)              │
├─────────────────────────────────────────┤
│ 18 Tables │ RLS │ Indexes │ Triggers   │
└─────────────────────────────────────────┘
```

---

## 🗂️ Structure des Fichiers

```
powalyze/
├── src/
│   ├── pages/
│   │   ├── ExecutiveCockpit.jsx      # Cockpit exécutif
│   │   ├── PortfolioView.jsx         # Vue portefeuilles/projets
│   │   ├── ProjectDetail.jsx         # Détail projet 360°
│   │   ├── CommitteeView.jsx         # Gestion comités
│   │   ├── DecisionHub.jsx           # Registre décisions
│   │   └── RiskIntelligence.jsx      # Risques + IA
│   │
│   ├── lib/
│   │   ├── portfolioService.js       # Portfolios/Programs/Projects
│   │   ├── committeeService.js       # Comités/Types/Items
│   │   ├── decisionRiskService.js    # Décisions/Actions/Risques/Signaux
│   │   └── kpiService.js             # KPI Definitions/Values
│   │
│   ├── docs/
│   │   ├── SAAS_COMPLETE_DOCUMENTATION.md
│   │   ├── IMPLEMENTATION_STATUS.md
│   │   └── README.md (ce fichier)
│   │
│   └── App.jsx                       # Routing principal
│
├── supabase/
│   └── migrations/
│       └── 20260109_complete_saas_schema.sql
│
└── package.json
```

---

## 📱 Écrans Principaux

### 1. Executive Cockpit (`/app/cockpit`)
**Objectif:** Vue 10 secondes de la gouvernance

**Features:**
- KPIs globaux (Portfolios, Projets, Risques, Décisions)
- Alertes prédictives IA en temps réel
- Santé des projets (GREEN/AMBER/RED)
- Prochains comités
- Top 5 risques critiques
- Décisions en attente

**Services utilisés:**
```javascript
portfolioService.getPortfolioDashboard(orgId)
committeeService.getUpcomingCommittees(orgId, 3)
decisionService.getPendingDecisions(orgId)
riskService.getCriticalRisks(orgId)
predictiveSignalService.getUnacknowledgedSignals(orgId, 70)
```

---

### 2. Portfolio View (`/app/portfolio-view`)
**Objectif:** Piloter les portefeuilles et projets

**Features:**
- Grid de portfolios avec indicateurs de santé
- Filtres: Portfolio, Statut (ACTIVE/ON_HOLD/CLOSED), Santé (GREEN/AMBER/RED)
- Tableau de projets avec:
  - Nom, Portfolio, PM, Statut, Santé
  - Barres de progression (0-100%)
  - Budget actual vs planned
- Drill-down par portefeuille

**Services utilisés:**
```javascript
portfolioService.getPortfolios(orgId, filters)
programService.getPrograms(orgId, portfolioId)
projectService.getProjects(orgId, filters)
```

---

### 3. Project Detail (`/app/projects/:id`)
**Objectif:** Vue 360° d'un projet

**Onglets:**
1. **Overview** - Sponsor, PM, dates, budget, KPIs, signaux IA
2. **Risks** - Sévérité, probabilité, impact, mitigation
3. **Decisions** - Décisions liées, statut, impacts
4. **Actions** - Actions issues des décisions, owner, due date
5. **Documents** - Charte, slides, rapports
6. **History** - Timeline des changements

**Services utilisés:**
```javascript
projectService.getProjectFull(projectId) // Tout en 1 seule query
```

---

### 4. Committee View (`/app/committees`)
**Objectif:** Gérer les comités de gouvernance

**Features:**
- Liste des comités (Planifiés / En cours / Terminés)
- Cards par comité:
  - Date formatée (ex: "Jeudi 15 janvier 2026")
  - Président (chair)
  - Nombre de participants
  - Status badge coloré
- Détail comité:
  - Ordre du jour structuré
  - Points (projets, risques, décisions)
  - Notes de réunion
- Export compte-rendu PDF/MD

**Services utilisés:**
```javascript
committeeService.getCommittees(orgId, filters)
committeeService.getCommitteeById(committeeId)
committeeItemService.getCommitteeItems(committeeId)
committeeService.exportCommitteeReport(committeeId)
```

---

### 5. Decision Hub (`/app/decisions`)
**Objectif:** Registre central des décisions

**Features:**
- Filtres: Statut (PLANNED/TAKEN/REJECTED/DEFERRED), Type (GO/NO_GO/BUDGET...)
- Stats cards: Compteurs par statut
- Decision cards:
  - Titre, description
  - Lien vers projet/comité
  - Impact summary
  - Nombre d'actions
  - Metadata (créateur, date, approbateur)

**Services utilisés:**
```javascript
decisionService.getDecisions(orgId, filters)
decisionService.getDecisionById(decisionId)
decisionService.approveDecision(decisionId, userId)
decisionService.rejectDecision(decisionId)
```

---

### 6. Risk Intelligence (`/app/risk-intelligence`)
**Objectif:** Gestion des risques + Signaux IA

**3 Vues:**

#### **Vue 1: Risques**
- Liste des risques avec sévérité (probability × impact)
- Filtres: Statut, Portefeuille, Projet, Owner, Sévérité min
- Détail: Probabilité (1-5), Impact (1-5), Mitigation plan
- Colors:
  - Vert: severity < 10
  - Jaune: 10-14
  - Amber: 15-19
  - Rouge: 20-25

#### **Vue 2: Signaux IA**
- Alertes prédictives avec score 0-100
- Types:
  - DELAY_RISK (Risque de retard)
  - BUDGET_RISK (Dérive budgétaire)
  - RESOURCE_OVERLOAD (Surcharge équipe)
  - SCOPE_DRIFT (Dérive du scope)
- Message + Recommended action
- Bouton "Acknowledger"

#### **Vue 3: Matrice 5x5**
- Heatmap Probabilité × Impact
- Compteur de risques par case
- Zones colorées (vert → rouge)

**Services utilisés:**
```javascript
riskService.getRisks(orgId, filters)
riskService.getCriticalRisks(orgId)
riskService.getRiskMatrix(orgId)
predictiveSignalService.getSignals(orgId, filters)
predictiveSignalService.acknowledgeSignal(signalId, userId)
```

---

## 🔑 Services Backend

### portfolioService.js
Gestion des **portefeuilles, programmes et projets**

```javascript
// Exemple: Récupérer le dashboard d'un portefeuille
const dashboard = await portfolioService.getPortfolioDashboard(organizationId);
console.log(dashboard);
// {
//   portfolios: [...],
//   totalProjects: 42,
//   projectsByStatus: { IN_PROGRESS: 15, AT_RISK: 5, ... },
//   projectsByHealth: { GREEN: 20, AMBER: 10, RED: 5 },
//   criticalRisks: [...],
//   predictiveSignals: [...]
// }
```

**Méthodes principales:**
- `getPortfolios(orgId, filters)`
- `getPortfolioById(portfolioId)`
- `createPortfolio(orgId, data)`
- `updatePortfolio(portfolioId, updates)`
- `getPortfolioDashboard(orgId)` ← Agrégations complètes

---

### committeeService.js
Gestion des **comités de gouvernance**

```javascript
// Exemple: Prochains comités
const upcoming = await committeeService.getUpcomingCommittees(organizationId, 5);
console.log(upcoming);
// [
//   {
//     id: '...',
//     date: '2026-01-15T14:00:00Z',
//     committee_type: { name: 'COPIL' },
//     chair: { first_name: 'Alice', last_name: 'Martin' },
//     participants: ['user1', 'user2', ...]
//   },
//   ...
// ]
```

**Méthodes principales:**
- `getCommittees(orgId, filters)`
- `getUpcomingCommittees(orgId, limit)`
- `exportCommitteeReport(committeeId)` ← Génère compte-rendu
- `createCommitteeType(orgId, data)`
- `reorderItems(items)` ← Batch update ordre du jour

---

### decisionRiskService.js
Gestion des **décisions, actions, risques et signaux IA**

```javascript
// Exemple: Matrice de risques 5x5
const matrix = await riskService.getRiskMatrix(organizationId);
console.log(matrix);
// [
//   [2, 3, 5, 8, 12],  // Probabilité 1
//   [1, 4, 6, 9, 15],  // Probabilité 2
//   [0, 2, 4, 7, 10],  // Probabilité 3
//   [1, 3, 5, 8, 11],  // Probabilité 4
//   [0, 1, 2, 4, 6]    // Probabilité 5
// ]

// Exemple: Approuver une décision
await decisionService.approveDecision(decisionId, approvedByUserId);
```

**Méthodes principales:**
- `getRiskMatrix(orgId)` ← Matrice 5x5
- `getCriticalRisks(orgId)` ← Sévérité >= 15
- `approveDecision(decisionId, userId)`
- `rejectDecision(decisionId)`
- `getUnacknowledgedSignals(orgId, minScore)` ← Signaux IA non traités

---

### kpiService.js
Gestion des **KPI et metrics**

```javascript
// Exemple: Enregistrer une valeur KPI
await kpiValueService.recordKPIValue(organizationId, {
  kpi_definition_id: 'kpi-123',
  scope_type: 'PROJECT',
  scope_id: 'project-456',
  value: 87.5,
  date: '2026-01-09'
});

// Exemple: Récupérer le trend d'un KPI
const trend = await kpiValueService.getKPITrend(
  'kpi-123',
  'PROJECT',
  'project-456',
  30 // derniers 30 jours
);
console.log(trend);
// [
//   { date: '2025-12-10', value: 75.0 },
//   { date: '2025-12-20', value: 82.3 },
//   { date: '2026-01-09', value: 87.5 }
// ]
```

**Méthodes principales:**
- `recordKPIValue(orgId, data)`
- `getKPITrend(kpiId, scopeType, scopeId, days)`
- `getOrganizationKPIDashboard(orgId)` ← Agrégation globale

---

## 🗄️ Base de Données

### Schéma Principal (18 tables)

| Table | Description | Colonnes clés |
|-------|-------------|---------------|
| **organizations** | Entités multi-tenant | name, domain, settings |
| **users** | Utilisateurs | email, role (PMO/EXECUTIVE/DATA/PM/CONSULTANT) |
| **portfolios** | Portefeuilles stratégiques | name, owner, status, priority, budget |
| **programs** | Programmes | portfolio_id, owner, status |
| **projects** | Projets | sponsor, PM, status, health, progress_percent |
| **committee_types** | Types de comités | name, frequency (WEEKLY/MONTHLY...) |
| **committees** | Instances de comités | date, chair, participants, status |
| **committee_items** | Points ordre du jour | type, title, related_project_id, order_index |
| **decisions** | Registre des décisions | title, status, type, impact_summary |
| **decision_actions** | Actions issues décisions | owner, due_date, status |
| **risks** | Registre des risques | probability (1-5), impact (1-5), severity (calc) |
| **predictive_signals** | Alertes IA | signal_type, score (0-100), message |
| **kpi_definitions** | Définitions KPI | name, code, unit, target_value |
| **kpi_values** | Valeurs KPI | scope_type, scope_id, value, date |
| **documents** | Référentiel docs | name, url, type, related_project_id |
| **comments** | Commentaires | entity_type, entity_id, content |
| **notifications** | Notifications | user_id, type, message, is_read |
| **roles** | Permissions granulaires | name, permissions (JSONB) |

### Relations Clés

```
organizations
├── users
├── portfolios
│   ├── programs
│   │   └── projects
│   └── projects (direct)
├── committee_types
│   └── committees
│       └── committee_items
├── decisions
│   └── decision_actions
├── risks
├── predictive_signals
├── kpi_definitions
│   └── kpi_values
└── documents
```

### Indexes Critiques

```sql
-- Foreign Keys (18 indexes)
CREATE INDEX idx_users_organization_id ON users(organization_id);
CREATE INDEX idx_portfolios_organization_id ON portfolios(organization_id);
CREATE INDEX idx_projects_organization_id ON projects(organization_id);
...

-- Query Optimization (30+ indexes)
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_health ON projects(health);
CREATE INDEX idx_risks_severity ON risks(severity DESC);
CREATE INDEX idx_decisions_status ON decisions(status);
...
```

---

## 🔒 Sécurité (Row Level Security)

### Principes

1. **Isolation par Organization**
   - Chaque table a `organization_id`
   - RLS activé sur toutes les tables
   - Les users ne voient QUE les données de leur org

2. **Permissions par Rôle**
   ```sql
   -- Exemple: Seuls PMO et ADMIN peuvent créer des projets
   CREATE POLICY "PMO can insert projects"
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

3. **Rôles disponibles**
   - `PMO` - Gestion complète
   - `EXECUTIVE` - Lecture + validation décisions
   - `DATA` - Accès KPI + export
   - `PROJECT_MANAGER` - CRUD sur ses projets
   - `CONSULTANT` - Lecture + conseil
   - `ADMIN` - Super admin

---

## 🎨 Design System

### Palette de Couleurs

```css
/* Primary */
--primary: #0A1A2F;          /* Dark Blue Background */
--accent: #D4AF37;           /* Premium Gold */

/* Status Colors */
--green: #22c55e;            /* GREEN health */
--amber: #f59e0b;            /* AMBER health */
--red: #ef4444;              /* RED health */

/* UI */
--text: white;               /* Text principal */
--text-secondary: #9ca3af;  /* gray-400 */
--border: #374151;           /* gray-700 */
```

### Composants Réutilisables

```jsx
// Badge de statut
<span className={`
  px-2 py-1 rounded-full text-xs font-medium
  ${status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : ''}
  ${status === 'ON_HOLD' ? 'bg-amber-500/20 text-amber-400' : ''}
  ${status === 'CLOSED' ? 'bg-gray-500/20 text-gray-400' : ''}
`}>
  {status}
</span>

// Barre de progression
<div className="w-full bg-gray-700 rounded-full h-2">
  <div 
    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
    style={{ width: `${progress}%` }}
  />
</div>

// Health Indicator
<div className={`
  w-3 h-3 rounded-full
  ${health === 'GREEN' ? 'bg-green-500' : ''}
  ${health === 'AMBER' ? 'bg-amber-500' : ''}
  ${health === 'RED' ? 'bg-red-500' : ''}
`} />
```

### Animations (Framer Motion)

```jsx
// Stagger children
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ staggerChildren: 0.1 }}
>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>

// Layout animations
<motion.div layout>
  {filteredItems.map(item => (
    <motion.div key={item.id} layout>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## 🧪 Tests & Validation

### Checklist de Tests

#### Backend (Services)
- [ ] `portfolioService.getPortfolioDashboard()` retourne les bonnes agrégations
- [ ] `projectService.getProjectFull()` récupère tous les objets liés
- [ ] `riskService.getRiskMatrix()` génère matrice 5x5 correcte
- [ ] `committeeService.exportCommitteeReport()` exporte toutes les décisions
- [ ] `kpiValueService.getKPITrend()` calcule trend sur N jours

#### Frontend (Pages)
- [ ] ExecutiveCockpit affiche KPIs + alertes IA
- [ ] PortfolioView filtre par statut/santé
- [ ] CommitteeView exporte compte-rendu
- [ ] DecisionHub filtre par statut/type
- [ ] RiskIntelligence matrice 5x5 colorée correctement

#### Sécurité (RLS)
- [ ] User de l'org A ne voit PAS les données de l'org B
- [ ] Consultant ne peut PAS créer de projets
- [ ] PMO peut créer portfolios/projets/comités
- [ ] Executive peut approuver décisions

---

## 📚 Ressources

### Documentation Complète
- **[SAAS_COMPLETE_DOCUMENTATION.md](./src/docs/SAAS_COMPLETE_DOCUMENTATION.md)** - Architecture, User Stories, API
- **[IMPLEMENTATION_STATUS.md](./src/docs/IMPLEMENTATION_STATUS.md)** - État d'implémentation, checklist

### Guides API
- **portfolioService**: [src/lib/portfolioService.js](./src/lib/portfolioService.js)
- **committeeService**: [src/lib/committeeService.js](./src/lib/committeeService.js)
- **decisionRiskService**: [src/lib/decisionRiskService.js](./src/lib/decisionRiskService.js)
- **kpiService**: [src/lib/kpiService.js](./src/lib/kpiService.js)

### SQL Schema
- **Migration**: [supabase/migrations/20260109_complete_saas_schema.sql](./supabase/migrations/20260109_complete_saas_schema.sql)

---

## 🛠️ Commandes Utiles

```bash
# Dev
npm run dev              # Lancer en dev (port 5173)
npm run build            # Build production
npm run preview          # Preview du build

# Supabase
supabase start           # Lancer Supabase local
supabase db push         # Appliquer migrations
supabase db reset        # Reset DB (dev only)

# Deploy
vercel --prod            # Deploy sur Vercel

# Tests
npm run test             # Tests unitaires
npm run test:e2e         # Tests E2E (Playwright)
```

---

## 🚨 Troubleshooting

### Erreur: "User not authenticated"
```javascript
// Vérifier que l'utilisateur est connecté
const { data: { user } } = await supabase.auth.getUser();
console.log(user);

// Si null, rediriger vers /login
if (!user) {
  window.location.href = '/login';
}
```

### Erreur: "Organization not found"
```javascript
// Récupérer l'organization_id de l'utilisateur
const { data: userData } = await supabase
  .from('users')
  .select('organization_id')
  .eq('id', user.id)
  .single();

console.log(userData.organization_id);
```

### Erreur: "RLS policy violation"
```sql
-- Vérifier les policies
SELECT * FROM pg_policies WHERE tablename = 'projects';

-- Désactiver temporairement RLS (DEV ONLY)
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
```

### Performance lente
```javascript
// Utiliser les fonctions d'agrégation plutôt que plusieurs queries
const dashboard = await portfolioService.getPortfolioDashboard(orgId);
// ✅ 1 seule query

// Éviter
const portfolios = await getPortfolios(orgId);
const projects = await getProjects(orgId);
const risks = await getRisks(orgId);
// ❌ 3 queries séparées
```

---

## 🤝 Contribution

### Workflow Git

```bash
# 1. Créer une branche
git checkout -b feature/nouvelle-feature

# 2. Commit
git add .
git commit -m "feat: ajouter export Excel pour DecisionHub"

# 3. Push
git push origin feature/nouvelle-feature

# 4. Créer une Pull Request sur GitHub
```

### Convention de nommage

```
feat: Nouvelle feature
fix: Correction de bug
docs: Documentation
style: Formatting
refactor: Refactoring
test: Tests
chore: Maintenance
```

---

## 📝 Licence

**Propriétaire:** Powalyze SAS  
**Type:** Logiciel propriétaire  
**Usage:** Réservé aux clients sous licence commerciale

---

## 📧 Support

- **Email:** support@powalyze.com
- **Documentation:** https://docs.powalyze.com
- **Status:** https://status.powalyze.com

---

**Version:** 1.0  
**Dernière mise à jour:** 2026-01-09  
**Auteur:** Équipe Powalyze
