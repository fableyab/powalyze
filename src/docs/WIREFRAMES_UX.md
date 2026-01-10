# 🎨 Maquettes UX & Wireframes - Powalyze Governance SaaS

> **Design System:** Ultra-Premium (#0A1A2F dark blue, #D4AF37 gold)  
> **Framework UI:** React + Tailwind CSS + Framer Motion  
> **Icons:** Lucide React  
> **Charts:** Recharts

---

## 📐 1. Cockpit Exécutif (Executive Dashboard)

**Route:** `/app/cockpit-executif`  
**Page:** `CockpitExecutif.jsx`  
**Persona:** Executive, PMO

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo Powalyze]    [Org Selector] [Portfolio] [@User Profile]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Cockpit Exécutif                                                │
│  Vue d'ensemble de votre portefeuille et gouvernance            │
│                                                                   │
├────────────────────────────────┬────────────────────────────────┤
│  LEFT COLUMN (60%)             │  RIGHT COLUMN (40%)            │
│                                │                                │
│ ┌──────────────────────────┐  │ ┌──────────────────────────┐  │
│ │ 🎯 Santé du Portefeuille │  │ │ 🧠 Signaux IA            │  │
│ ├──────────────────────────┤  │ ├──────────────────────────┤  │
│ │  12 GREEN  4 AMBER  2 RED│  │ │ ⚡ Risque dérive         │  │
│ │  ████████▓▓▒▒             │  │ │    Score: 87/100        │  │
│ │   68%    22%   10%        │  │ │    Revoir planning      │  │
│ └──────────────────────────┘  │ │                          │  │
│                                │ │ ⚡ Dépassement budget    │  │
│ ┌──────────────────────────┐  │ │    Score: 72/100        │  │
│ │ ⚠️ Projets à Risque       │  │ │    Revue budgétaire     │  │
│ ├──────────────────────────┤  │ └──────────────────────────┘  │
│ │ • Projet ERP SAP         │  │                                │
│ │   Status: IN_PROGRESS    │  │ ┌──────────────────────────┐  │
│ │   Health: 🔴 RED         │  │ │ 📅 Prochains Comités     │  │
│ │                          │  │ ├──────────────────────────┤  │
│ │ • Migration CRM          │  │ │ 👥 COPIL Transformation  │  │
│ │   Status: AT_RISK        │  │ │    15 Jan 2026 14h00     │  │
│ │   Health: 🟠 AMBER       │  │ │    3 participants        │  │
│ └──────────────────────────┘  │ │                          │  │
│                                │ │ 👥 CODIR Q1 2026        │  │
│ ┌──────────────────────────┐  │ │    20 Mar 2026 10h00    │  │
│ │ ⏰ Décisions en Attente   │  │ │    5 participants       │  │
│ ├──────────────────────────┤  │ └──────────────────────────┘  │
│ │ • Validation Phase 2     │  │                                │
│ │   Type: GO               │  │                                │
│ │   Impact: +500K€ budget  │  │                                │
│ │                          │  │                                │
│ │ • Budget Marketing Q1    │  │                                │
│ │   Type: BUDGET           │  │                                │
│ │   Impact: 200K€          │  │                                │
│ └──────────────────────────┘  │                                │
└────────────────────────────────┴────────────────────────────────┘
```

### Key Features
- ✅ **Health Distribution:** Horizontal bar with GREEN/AMBER/RED percentages
- ✅ **At-Risk Projects:** Max 5 projects with RED health, clickable to Project Detail
- ✅ **Pending Decisions:** Max 5 decisions with PLANNED status
- ✅ **AI Signals:** Max 4 unacknowledged signals with score > 70
- ✅ **Upcoming Committees:** Max 3 next committees ordered by date
- ✅ **Framer Motion:** Stagger animation on each section (delay 0.1s)
- ✅ **Live Data:** Fetched from `portfolioService`, `committeeService`, `decisionService`, `riskService`, `predictiveSignalService`

---

## 📊 2. Portfolio Manager

**Route:** `/app/portfolio-view`  
**Page:** `PortfolioView.jsx`  
**Persona:** PMO, Executive, Project Manager

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ [Filters: Portfolio ▼] [Status ▼] [Health ▼]                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  PORTFOLIO GRID (Cards)                                          │
│                                                                   │
│ ┌────────────────┐  ┌────────────────┐  ┌────────────────┐    │
│ │ 📁 Transfo     │  │ 📁 Excellence  │  │                │    │
│ │ Digitale       │  │ Opérationnelle │  │                │    │
│ ├────────────────┤  ├────────────────┤  │                │    │
│ │ 5 Projets      │  │ 3 Projets      │  │                │    │
│ │ 5M€ Budget     │  │ 2M€ Budget     │  │                │    │
│ │ ██▓░ 3/1/1     │  │ ███░ 2/1/0     │  │                │    │
│ └────────────────┘  └────────────────┘  └────────────────┘    │
│                                                                   │
│  PROJECT TABLE (Sortable)                                        │
│                                                                   │
│ ┌──────────┬──────────┬──────┬────────┬────────┬─────────┬────┐│
│ │ Nom      │Portfolio │ PM   │ Status │ Health │ Progress│ BUD││
│ ├──────────┼──────────┼──────┼────────┼────────┼─────────┼────┤│
│ │ ERP SAP  │Transfo   │Thomas│ IN_PRG │ 🟢 G   │ ███░ 65%│1.5M││
│ │ CRM SF   │Transfo   │Claire│ AT_RSK │ 🟠 A   │ ██░░ 40%│0.8M││
│ │ Cloud Az │Transfo   │Thomas│ BLOCKED│ 🔴 R   │ █░░░ 25%│2.0M││
│ └──────────┴──────────┴──────┴────────┴────────┴─────────┴────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Key Features
- ✅ **Portfolio Cards:** Grid with health distribution bars (GREEN/AMBER/RED)
- ✅ **Three Filters:** Portfolio dropdown, Status dropdown, Health dropdown
- ✅ **Project Table:** Sortable columns with status badges, health indicators
- ✅ **Progress Bars:** Visual 0-100% with gradient blue→purple
- ✅ **Budget Display:** Actual vs Planned (CHF format)
- ✅ **Stagger Animation:** Cards animate on load with 0.1s delay per card

---

## 🎯 3. Project 360° (Project Detail)

**Route:** `/app/projects/:id`  
**Page:** `ProjectDetail.jsx`  
**Persona:** Project Manager, PMO, Executive

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Retour aux projets                           [Excel][PPTX][📄]│
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  🎯 Refonte ERP SAP [IN_PROGRESS] 🟠                             │
│  Migrating legacy mainframe to cloud-native microservices       │
│                                                                   │
│  Sponsor: Jean Martin    PM: Thomas Leroy                        │
│  Début: 2025-01-15       Fin: 2025-12-31                        │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                │
│ │ 🎯 65%      │ │ 💰 CHF 4.2M │ │ 📅 Timeline  │                │
│ │ Avancement  │ │ sur 5M      │ │ 2025-01-15  │                │
│ │ ████░       │ │ Budget      │ │ 2025-12-31  │                │
│ └─────────────┘ └─────────────┘ └─────────────┘                │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ [Overview] [Risques] [Décisions] [Actions] [Documents] [Histo] │
│ ──────────                                                       │
│                                                                   │
│ ┌────────────────────────┐  ┌────────────────────────┐          │
│ │ 📈 Burndown Analysis   │  │ 📊 Résumé Rapide       │          │
│ │                        │  │ Risques ouverts: 2     │          │
│ │     (Chart)            │  │ Décisions en attente: 1│          │
│ │                        │  │ Documents: 4           │          │
│ │                        │  │ Commentaires: 3        │          │
│ └────────────────────────┘  └────────────────────────┘          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Tab: Risques

```
┌─────────────────────────────────────────────────────────────────┐
│ Risques du Projet                                               │
│                                                                   │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │ ⚠️ Faille sécurité API                    Sévérité: 20 🔴   ││
│ │ Vulnérabilité CVE-2025-12345 découverte                     ││
│ │ Probabilité: 4/5  Impact: 5/5  Statut: OPEN                 ││
│ └──────────────────────────────────────────────────────────────┘│
│                                                                   │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │ ⚠️ Manque compétences DevOps              Sévérité: 9 🟡    ││
│ │ Difficultés pour recruter profils qualifiés                 ││
│ │ Probabilité: 3/5  Impact: 3/5  Statut: MITIGATED            ││
│ └──────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Key Features
- ✅ **Header:** Project name, status badge, health indicator (●), sponsor/PM names
- ✅ **3 KPI Cards:** Avancement (progress bar), Budget (actual vs planned), Timeline (dates)
- ✅ **6 Tabs:** Overview, Risques, Décisions, Actions, Documents, Historique
- ✅ **Tab Overview:** Burndown chart + Quick summary (risks, decisions, documents, comments)
- ✅ **Tab Risques:** List of risks with severity badges (red ≥20, amber ≥15, yellow ≥10)
- ✅ **Tab Décisions:** List of decisions with status badges
- ✅ **Export Buttons:** Excel, PPTX, PDF
- ✅ **Data:** Loaded via `projectService.getProjectFull(id)` for complete 360° view

---

## 🏛️ 4. Committee Center

**Route:** `/app/committees` or `/app/committees/:id`  
**Page:** `CommitteeView.jsx`  
**Persona:** PMO, Executive

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ [À venir] [Tous] [Terminés]                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  COMMITTEE CARDS                                                 │
│                                                                   │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │ 👥 COPIL Transformation                     [PLANNED] 🔵     ││
│ │ 📅 Mercredi 15 janvier 2026 à 14h00                         ││
│ │ Président: Jean Martin                                       ││
│ │ 3 participants • 5 points à l'ordre du jour                 ││
│ │                                          [Voir détails →]    ││
│ └──────────────────────────────────────────────────────────────┘│
│                                                                   │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │ 👥 CODIR Q4 2025                           [CLOSED] ⚪       ││
│ │ 📅 Lundi 15 décembre 2025 à 10h00                           ││
│ │ Président: Jean Martin                                       ││
│ │ 4 participants • 3 décisions prises                         ││
│ │                               [Export compte-rendu] [PDF]    ││
│ └──────────────────────────────────────────────────────────────┘│
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Detail View (when clicking "Voir détails")

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Retour aux comités                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  👥 COPIL Transformation - [PLANNED]                            │
│  📅 Mercredi 15 janvier 2026 à 14h00                            │
│  Président: Jean Martin                                         │
│                                                                   │
├────────────────────────────────┬────────────────────────────────┤
│  ORDRE DU JOUR                 │  DÉCISIONS PRISES              │
│                                │                                │
│ 1. Point avancement ERP SAP   │  • Validation Phase 2          │
│    [PROJECT] - PENDING         │    Status: TAKEN               │
│                                │    Date: 15/01/2026            │
│ 2. Risque sécurité critique   │                                │
│    [RISK] - PENDING            │  • Budget Marketing Q1         │
│                                │    Status: PLANNED             │
│ 3. Validation Budget 2026     │                                │
│    [DECISION] - PENDING        │                                │
│                                │                                │
└────────────────────────────────┴────────────────────────────────┘
```

### Key Features
- ✅ **Filter Buttons:** "À venir" (upcoming), "Tous" (all), "Terminés" (closed)
- ✅ **Committee Cards:** Formatted date (long weekday/month), chair name, participant count, agenda preview
- ✅ **Status Badges:** PLANNED (blue), IN_PROGRESS (amber), CLOSED (gray)
- ✅ **Export Button:** For CLOSED committees (triggers `exportCommitteeReport()`)
- ✅ **Layout Animation:** Framer Motion with layout transitions

---

## ✅ 5. Decision Hub

**Route:** `/app/decisions` or `/app/decisions/:id`  
**Page:** `DecisionHub.jsx`  
**Persona:** PMO, Executive

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ [Status ▼]  [Type ▼]                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  STATS CARDS                                                     │
│                                                                   │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                │
│ │ ✅ 12   │ │ ❌ 3    │ │ ⏰ 5    │ │ ⏸️ 1    │                │
│ │ TAKEN   │ │REJECTED │ │PLANNED  │ │DEFERRED │                │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘                │
│                                                                   │
│  DECISION CARDS                                                  │
│                                                                   │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │ ✅ [TAKEN] Validation Phase 2 - Migration SAP                ││
│ │ Type: GO                                                     ││
│ │ Impact: Budget additionnel de 500K€ approuvé                ││
│ │                                                              ││
│ │ Projet: Refonte ERP SAP                                     ││
│ │ Créateur: Marie Dupont  |  Date: 15/12/2025                ││
│ │                                              [3 actions] →   ││
│ └──────────────────────────────────────────────────────────────┘│
│                                                                   │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │ ⏰ [PLANNED] Validation Budget Marketing Q1                  ││
│ │ Type: BUDGET                                                 ││
│ │ Impact: Investissement 200K€ campagnes digitales            ││
│ │                                                              ││
│ │ Portfolio: Transformation Digitale                          ││
│ │ Créateur: Jean Martin  |  Date: -                           ││
│ │                                              [0 actions] →   ││
│ └──────────────────────────────────────────────────────────────┘│
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Key Features
- ✅ **Two Filters:** Status dropdown (ALL/PLANNED/TAKEN/REJECTED/DEFERRED), Type dropdown (GO/NO_GO/BUDGET...)
- ✅ **Stats Cards:** Counts by status with colored icons (CheckCircle, XCircle, Clock, PauseCircle)
- ✅ **Decision Cards:** Status icon + badge, title + description, related project link, impact summary
- ✅ **Metadata:** Project name, Creator name, Decision date
- ✅ **Action Count Badge:** Number of actions linked to decision
- ✅ **Stagger Animation:** 0.05s delay per card

---

## ⚠️ 6. Risk Intelligence (3 Views)

**Route:** `/app/risk-intelligence`  
**Page:** `RiskIntelligence.jsx`  
**Persona:** PMO, Project Manager, Executive

### Layout Structure - View 1: Risks

```
┌─────────────────────────────────────────────────────────────────┐
│ [Risks] [Signaux IA] [Matrice 5x5]                             │
│ ─────                                                            │
│                                                                   │
│ [Status ▼]  [Sévérité min: ─────o─── 15]                       │
│                                                                   │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │ ⚠️ Faille sécurité API                  [Sévérité: 20] 🔴  ││
│ │                                                              ││
│ │ Probabilité: ████░ 4/5                                      ││
│ │ Impact:      █████ 5/5                                      ││
│ │                                                              ││
│ │ Owner: Sophie Bernard  |  Status: OPEN                      ││
│ │                                                              ││
│ │ ℹ️ Plan de mitigation:                                      ││
│ │ Patch de sécurité déployé en urgence + audit complet       ││
│ └──────────────────────────────────────────────────────────────┘│
│                                                                   │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │ ⚠️ Manque compétences DevOps            [Sévérité: 9] 🟡   ││
│ │                                                              ││
│ │ Probabilité: ███░░ 3/5                                      ││
│ │ Impact:      ███░░ 3/5                                      ││
│ │                                                              ││
│ │ Owner: Thomas Leroy  |  Status: MITIGATED                   ││
│ └──────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Layout Structure - View 2: Signaux IA

```
┌─────────────────────────────────────────────────────────────────┐
│ [Risks] [Signaux IA] [Matrice 5x5]                             │
│          ───────────                                             │
│                                                                   │
│ [ ] Afficher uniquement non-acknowleged                         │
│                                                                   │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │ ⚡ DELAY_RISK                              [Score: 87/100]   ││
│ │                                                              ││
│ │ Risque de dérive planning détecté sur Projet ERP SAP        ││
│ │                                                              ││
│ │ 💡 Action recommandée:                                      ││
│ │ Revoir le planning et identifier les goulots d'étranglement ││
│ │                                                              ││
│ │                                         [Acknowledge] [→]    ││
│ └──────────────────────────────────────────────────────────────┘│
│                                                                   │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │ ⚡ BUDGET_RISK                             [Score: 72/100]   ││
│ │                                                              ││
│ │ Dépassement budget prévu de 15% sur Projet CRM              ││
│ │                                                              ││
│ │ 💡 Action recommandée:                                      ││
│ │ Organiser une revue budgétaire urgente avec le sponsor      ││
│ │                                                              ││
│ │                                         [Acknowledge] [→]    ││
│ └──────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Layout Structure - View 3: Matrice 5x5

```
┌─────────────────────────────────────────────────────────────────┐
│ [Risks] [Signaux IA] [Matrice 5x5]                             │
│                      ───────────                                 │
│                                                                   │
│               MATRICE DES RISQUES 5×5                            │
│                                                                   │
│         Impact →                                                 │
│         1        2        3        4        5                    │
│    ┌────────┬────────┬────────┬────────┬────────┐               │
│  5 │ 🟢 0   │ 🟡 0   │ 🟠 1   │ 🔴 0   │ 🔴 1   │ Certain       │
│ P  ├────────┼────────┼────────┼────────┼────────┤               │
│ r 4│ 🟢 0   │ 🟡 0   │ 🟠 0   │ 🟠 0   │ 🔴 1   │ Probable      │
│ o  ├────────┼────────┼────────┼────────┼────────┤               │
│ b 3│ 🟢 1   │ 🟢 0   │ 🟡 1   │ 🟠 0   │ 🔴 0   │ Possible      │
│ a  ├────────┼────────┼────────┼────────┼────────┤               │
│ . 2│ 🟢 0   │ 🟢 0   │ 🟡 0   │ 🟠 0   │ 🔴 0   │ Peu probable  │
│    ├────────┼────────┼────────┼────────┼────────┤               │
│  1 │ 🟢 0   │ 🟢 0   │ 🟡 0   │ 🟡 0   │ 🟠 0   │ Rare          │
│    └────────┴────────┴────────┴────────┴────────┘               │
│      Négl.  Mineur  Modéré  Majeur  Critique                    │
│                                                                   │
│  🟢 Low (1-9)   🟡 Medium (10-14)   🟠 High (15-19)   🔴 Critical (20-25)│
└─────────────────────────────────────────────────────────────────┘
```

### Key Features - Risks View
- ✅ **Filter Controls:** Status dropdown, Min severity slider (1-25)
- ✅ **Risk Cards:** Severity badge color-coded (red ≥20, amber ≥15, yellow ≥10, green <10)
- ✅ **Probability & Impact Bars:** 5 segments, filled based on value 1-5
- ✅ **Owner Display:** User name + Status badge
- ✅ **Mitigation Plan:** Blue info box with plan text

### Key Features - AI Signals View
- ✅ **Signal Cards:** Score badge (0-100), Type-specific icon (AlertTriangle, TrendingUp, Users, Zap)
- ✅ **Message Display:** Clear AI-generated message
- ✅ **Recommended Action:** Amber highlight for visibility
- ✅ **Acknowledge Button:** Triggers `predictiveSignalService.acknowledgeSignal()`
- ✅ **Filter:** Toggle to show only unacknowledged signals

### Key Features - Matrix 5x5 View
- ✅ **Heatmap Grid:** 5 rows (probability) × 5 columns (impact)
- ✅ **Each Cell:** Risk count, Background color based on severity (green/yellow/amber/red)
- ✅ **Border Styling:** Emphasize high-risk zones (top-right corner)
- ✅ **Y-axis Labels:** 1 (Rare) to 5 (Certain)
- ✅ **X-axis Labels:** 1 (Négligeable) to 5 (Critique)
- ✅ **Legend:** Color mapping at bottom

---

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-dark: #0A1A2F;      /* Main background */
--primary-gold: #D4AF37;      /* Premium accent */

/* Status Colors */
--success: #22c55e;           /* green-500 (GREEN health) */
--warning: #f59e0b;           /* amber-500 (AMBER health) */
--danger: #ef4444;            /* red-500 (RED health) */
--info: #3b82f6;              /* blue-500 (IN_PROGRESS status) */

/* Text Colors */
--text-primary: #ffffff;      /* white */
--text-secondary: #9ca3af;    /* gray-400 */
--text-muted: #64748b;        /* gray-500 */

/* Background Colors */
--bg-card: rgba(15, 23, 42, 0.9);        /* slate-900/90 */
--bg-card-hover: rgba(30, 41, 59, 0.9);  /* slate-800/90 */
--border: #334155;            /* slate-700 */
```

### Typography
- **Headings:** `font-bold` with `text-[#D4AF37]` for main titles
- **Body:** `text-white` for primary content, `text-slate-400` for secondary
- **Labels:** `text-sm font-medium text-slate-500`

### Components Réutilisables
```jsx
// Badge Status
<span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-900/30 text-blue-400">
  IN_PROGRESS
</span>

// Health Indicator
<span className="text-2xl text-green-500">●</span>

// Progress Bar
<div className="w-full bg-slate-800 rounded-full h-2">
  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
</div>

// Card Container
<div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg">
  {/* Content */}
</div>
```

### Animations (Framer Motion)
```jsx
// Stagger Children
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
  {/* Content */}
</motion.div>

// Layout Animation
<motion.div layout>
  {/* Content that changes dynamically */}
</motion.div>
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
sm:  640px   /* Tablet portrait */
md:  768px   /* Tablet landscape */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

### Grid Responsiveness
```jsx
// 2-column on desktop, 1-column on mobile
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">Left (60%)</div>
  <div>Right (40%)</div>
</div>
```

---

## 🚀 Implémentation Status

| Écran                | Fichier                    | Status   | Services Intégrés                    |
|----------------------|----------------------------|----------|--------------------------------------|
| Cockpit Exécutif     | CockpitExecutif.jsx        | ✅ Done  | portfolio, committee, decision, risk, signal |
| Portfolio Manager    | PortfolioView.jsx          | ✅ Done  | portfolio, program, project          |
| Project 360°         | ProjectDetail.jsx          | ✅ Done  | project (getProjectFull)             |
| Committee Center     | CommitteeView.jsx          | ✅ Done  | committee, committeeItem             |
| Decision Hub         | DecisionHub.jsx            | ✅ Done  | decision                             |
| Risk Intelligence    | RiskIntelligence.jsx       | ✅ Done  | risk, predictiveSignal               |

---

## 🎯 Conclusion

**6 écrans clés 100% implémentés** avec design ultra-premium, animations Framer Motion, intégration complète des services backend, et responsive design.

**Prêt pour production!** 🚀
