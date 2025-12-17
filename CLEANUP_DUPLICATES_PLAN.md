# 🗑️ Plan de Nettoyage des Pages en Doublon - POWALYZE

## Problématique Actuelle
- **26+ pages PMO** différentes créant de la confusion
- Contenu répétitif entre pages similaires  
- Maintenance complexe et incohérences
- Navigation confuse pour l'utilisateur

---

## Pages à CONSERVER (5)

### 1. **Services/StrategicPMO.jsx** ✅
- **URL**: `/services/pmo-strategique`
- **Rôle**: Page service principale PMO Stratégique
- **Contenu**: Description complète, méthodologie, cas d'usage
- **Action**: GARDER + Optimiser contenu suisse premium

### 2. **PMO360DemoPage.jsx** ✅
- **URL**: `/pmo-360-demo`
- **Rôle**: Portail d'entrée vers les démos interactives
- **Contenu**: Hub avec liens vers Financial/Sales/PMO reports
- **Action**: GARDER + Simplifier navigation

### 3. **PMO360/FinancialOverviewPage.jsx** ✅
- **URL**: `/pmo-360/financial-overview`
- **Rôle**: Dashboard financier interactif
- **Action**: GARDER (unique)

### 4. **PMO360/SalesPerformancePage.jsx** ✅
- **URL**: `/pmo-360/sales-performance`
- **Rôle**: Dashboard commercial
- **Action**: GARDER (unique)

### 5. **PMO360/PMOReportPage.jsx** ✅
- **URL**: `/pmo-360/pmo-report`
- **Rôle**: Rapport exécutif PMO
- **Action**: GARDER (unique)

---

## Pages à SUPPRIMER (12+)

### Groupe 1: Doublons Service PMO
- ❌ `Services/StrategicPMOPage.jsx` → Doublon de StrategicPMO.jsx
- ❌ `Services/PMOStrategiquePage.jsx` → Doublon de StrategicPMO.jsx
- **Action**: Supprimer fichiers + enlever routes dans App.jsx

### Groupe 2: Demos PMO Redondantes
- ❌ `PMODemoPage.jsx` → Contenu similaire à PMO360DemoPage
- ❌ `ProtectedPMODemoPage.jsx` → Auth inutile pour une démo publique
- ❌ `PMOExecutiveDashboardDemoPage.jsx` → Fusionner dans PMO360DemoPage
- **Action**: Rediriger toutes les routes vers `/pmo-360-demo`

### Groupe 3: Pages "Solution" Génériques
- ❌ `PMOSolutionPage.jsx` → Contenu déjà dans StrategicPMO.jsx
- **Action**: Rediriger `/pmo-solution` → `/services/pmo-strategique`

### Groupe 4: Dashboards Isolés
- ❌ `PMOPortfolioDashboard.jsx` → Isolé sans contexte
- ❌ `dashboard/PMODashboardPage.jsx` → Doublon
- **Action**: Fusionner dans PMO360/PMOReportPage ou supprimer

### Groupe 5: Pages "Walkthrough"
- ❌ `PowalyzePMO360Walkthrough.jsx` → Complexité inutile
- ❌ `PowalyzePMO360Page.jsx` → Doublon de PMO360DemoPage
- **Action**: Supprimer

---

## Plan d'Action Étape par Étape

### Phase 1: Préparation (Backup)
```bash
# Déjà fait: BACKUP_2025-12-15_00-27-13/
```

### Phase 2: Consolidation des Routes
**Fichier**: `src/App.jsx`

#### Routes à GARDER:
```jsx
// Service principal
<Route path="/services/pmo-strategique" element={<PMOStrategiquePage />} />
<Route path="/services/strategic-pmo" element={<PMOStrategiquePage />} /> // Alias EN

// Demos PMO 360
<Route path="/pmo-360-demo" element={<PMO360DemoPage />} />
<Route path="/pmo-360/financial-overview" element={<FinancialOverviewPage />} />
<Route path="/pmo-360/sales-performance" element={<SalesPerformancePage />} />
<Route path="/pmo-360/pmo-report" element={<PMOReportPage />} />
```

#### Routes à REDIRIGER:
```jsx
// Anciennes URLs → Nouvelles
<Route path="/pmo-demo" element={<Navigate to="/pmo-360-demo" replace />} />
<Route path="/pmo-solution" element={<Navigate to="/services/pmo-strategique" replace />} />
<Route path="/pmo-protected-demo" element={<Navigate to="/pmo-360-demo" replace />} />
<Route path="/pmo-executive-dashboard" element={<Navigate to="/pmo-360-demo" replace />} />
```

### Phase 3: Suppression des Fichiers
```bash
# Supprimer les doublons
rm src/pages/Services/StrategicPMOPage.jsx
rm src/pages/Services/PMOStrategiquePage.jsx
rm src/pages/PMODemoPage.jsx
rm src/pages/ProtectedPMODemoPage.jsx
rm src/pages/PMOExecutiveDashboardDemoPage.jsx
rm src/pages/PMOSolutionPage.jsx
rm src/pages/PMOPortfolioDashboard.jsx
rm src/pages/PowalyzePMO360Walkthrough.jsx
rm src/pages/PowalyzePMO360Page.jsx
rm src/pages/dashboard/PMODashboardPage.jsx
```

### Phase 4: Nettoyer les Imports dans App.jsx
```jsx
// SUPPRIMER ces imports
// const PMODemoPage = lazy(() => import('@/pages/PMODemoPage'));
// const ProtectedPMODemoPage = lazy(() => import('@/pages/ProtectedPMODemoPage'));
// const PMOExecutiveDashboardDemoPage = lazy(() => import('@/pages/PMOExecutiveDashboardDemoPage'));
// const PMOSolutionPage = lazy(() => import('@/pages/PMOSolutionPage'));

// GARDER uniquement
const PMOStrategiquePage = lazy(() => import('@/pages/Services/StrategicPMO'));
const PMO360DemoPage = lazy(() => import('@/pages/PMO360DemoPage'));
const FinancialOverviewPage = lazy(() => import('@/pages/PMO360/FinancialOverviewPage'));
const SalesPerformancePage = lazy(() => import('@/pages/PMO360/SalesPerformancePage'));
const PMOReportPage = lazy(() => import('@/pages/PMO360/PMOReportPage'));
```

### Phase 5: Mise à Jour des Liens Internes
**Rechercher et remplacer** dans tous les composants:
```jsx
// Avant
<Link to="/pmo-demo">...</Link>

// Après
<Link to="/pmo-360-demo">...</Link>
```

**Fichiers à vérifier**:
- `components/landing/Services.jsx`
- `components/landing/DemoInteractiveSection.jsx`
- `pages/Services/StrategicPMO.jsx`
- `pages/PowerBIAdvancedPage.jsx`

---

## Autres Pages en Doublon (Non-PMO)

### Reporting/Dashboards
- ❌ `FinancialReportPage.jsx` → Fusionner dans PowerBIAdvancedPage
- ❌ `InteractivePreviewPage.jsx` → Inutile
- ❌ `ExecutiveDashboardPage.jsx` → Rediriger vers PMO360
- ❌ `LiveDemoPage.jsx` → Fusionner dans PMO360
- ❌ `ExecutiveAnalyticsDashboard.jsx` → Doublon
- ❌ `SalesPerformanceDashboard.jsx` → Déjà dans PMO360

### Solution
```bash
# Rediriger toutes les routes vers les pages consolidées
<Route path="/financial-report" element={<Navigate to="/power-bi-advanced" replace />} />
<Route path="/interactive-preview" element={<Navigate to="/pmo-360-demo" replace />} />
<Route path="/executive-dashboard" element={<Navigate to="/pmo-360-demo" replace />} />
<Route path="/live-demo" element={<Navigate to="/pmo-360-demo" replace />} />
```

---

## Résultat Attendu

### Avant (26+ pages PMO)
- PMODemoPage
- ProtectedPMODemoPage
- PMOExecutiveDashboardDemoPage
- PMOSolutionPage
- PMO360DemoPage
- PowalyzePMO360Walkthrough
- PowalyzePMO360Page
- PMOPortfolioDashboard
- dashboard/PMODashboardPage
- Services/StrategicPMO
- Services/StrategicPMOPage
- Services/PMOStrategiquePage
- PMO360/FinancialOverviewPage
- PMO360/SalesPerformancePage
- PMO360/PMOReportPage
- ExecutiveAnalyticsDashboard
- SalesPerformanceDashboard
- ...et plus

### Après (5 pages PMO)
1. `/services/pmo-strategique` → StrategicPMO.jsx
2. `/pmo-360-demo` → PMO360DemoPage.jsx
3. `/pmo-360/financial-overview` → FinancialOverviewPage.jsx
4. `/pmo-360/sales-performance` → SalesPerformancePage.jsx
5. `/pmo-360/pmo-report` → PMOReportPage.jsx

**Gain**: 
- 21 fichiers supprimés
- Navigation claire
- Maintenance simplifiée
- Cohérence du contenu

---

## Checklist de Validation

- [ ] Toutes les anciennes routes redirigent correctement
- [ ] Aucun lien cassé dans les composants
- [ ] Build `npm run build` passe sans erreur
- [ ] Test manuel: Navigation depuis accueil → Services → Demos
- [ ] Sitemap mis à jour (`npm run generate-sitemap`)
- [ ] Fichier llms.txt régénéré (`npm run generate-llms`)

---

**Prêt à exécuter ce plan ?** 
Commençons par supprimer les fichiers et mettre à jour App.jsx.
