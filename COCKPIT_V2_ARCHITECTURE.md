# 🎯 COCKPIT PMO V2 - Architecture "Type monday.com"

**Date**: 12 janvier 2026  
**Statut**: ✅ Architecture complète créée  
**Objectif**: Cockpit logique, structuré, exploitable avec boards/items/vues

---

## 📊 Vue d'Ensemble

### Problèmes Résolus

| Problème Actuel | Solution V2 |
|-----------------|-------------|
| Sections conceptuelles floues | **Boards clairs**: Initiatives, Risques, Décisions, Capacité |
| Unité de base peu claire | **Item unifié**: Type + statut + responsable + dates + tags |
| Peu d'actions visibles | **Actions évidentes**: + Nouveau, filtrer, trier, détail |
| Données souvent vides | **Mode démo transparent**: Toujours des données visibles |
| Mode démo/prod mélangé | **Séparation claire**: Flag isDemoMode + banner |

---

## 🏗️ Architecture

### Structure Hiérarchique

```
Cockpit PMO V2
  ├── Boards (4)
  │   ├── Initiatives Stratégiques
  │   ├── Risques Critiques
  │   ├── Décisions à Suivre
  │   └── Capacité PMO & Charge
  │
  ├── Vues par Board (3-4)
  │   ├── Table (défaut)
  │   ├── Kanban
  │   ├── Timeline
  │   └── Executive
  │
  └── Items
      ├── Type: initiative|project|risk|decision|signal
      ├── Statut: backlog|planned|in_progress|blocked|done|cancelled
      ├── Propriétaire: User ID
      ├── Dates: start_date, end_date
      ├── Progress: 0-100%
      ├── Priority: low|medium|high|critical
      └── Tags: Array de strings
```

---

## 📁 Fichiers Créés

### Modèles & Types
- ✅ `src/types/cockpit.js` (340 lignes)
  - Définitions TypeScript JSDoc
  - BOARDS_CONFIG (initiatives, risks, decisions, capacity)
  - VIEWS_CONFIG (table, kanban, timeline, executive)
  - STATUS_CONFIG + PRIORITY_CONFIG
  - Helpers: getBoardConfig(), getBoardViews(), getDefaultView()

### Composants UI
- ✅ `src/components/cockpit/BoardSelector.jsx` (60 lignes)
  - Tabs horizontal avec icônes + badge count
  - Active state avec gold gradient

- ✅ `src/components/cockpit/ViewSelector.jsx` (50 lignes)
  - Pills pour basculer entre vues
  - Icônes: Table, Kanban, Timeline, Executive

- ✅ `src/components/cockpit/BoardTableView.jsx` (140 lignes)
  - Vue principale type spreadsheet
  - Tri, filtres, sélection
  - Panneau détail slide-in droit

- ✅ `src/components/cockpit/ItemRow.jsx` (120 lignes)
  - Ligne d'item avec cellules typées
  - Renderers: text, status, user, date, progress, tags, number

- ✅ `src/components/cockpit/ItemDetailPanel.jsx` (100 lignes)
  - Panneau latéral (fixed right, width: 384px)
  - Actions: Modifier, Supprimer
  - Affiche tous les champs item

- ✅ `src/components/cockpit/BoardKanbanView.jsx` (110 lignes)
  - Swimlanes par statut (drag & drop)
  - Cards compactes avec progress + tags
  - Bouton + par colonne

### Pages & Hooks
- ✅ `src/pages/app/CockpitV2.jsx` (180 lignes)
  - Orchestrateur principal
  - Gère navigation boards + vues
  - Banner mode démo
  - Loading state

- ✅ `src/hooks/useCockpitItems.js` (240 lignes)
  - Charge items d'un board (mode auto démo/prod)
  - Mapping Supabase ↔ Item unifié
  - CRUD: createItem(), updateItem(), deleteItem()
  - Table mapping: initiatives/risks/decisions → Supabase tables

### Données Démo
- ✅ `src/lib/cockpitDemoDataV2.js` (280 lignes)
  - generateInitiatives(): 6 initiatives fictives
  - generateRisks(): 4 risques critiques
  - generateDecisions(): 4 décisions COMEX/CODIR
  - generateCapacity(): Filtre sur in_progress
  - Données crédibles avec budgets, FTE, sponsors

---

## 🎨 Design Patterns

### Boards Config (Type Definition)
```javascript
{
  id: 'initiatives',
  name: 'Initiatives Stratégiques',
  description: 'Portefeuille d\'initiatives et programmes',
  item_type: 'initiative',
  icon: 'Rocket',
  columns: [
    { id: 'title', label: 'Initiative', type: 'text', width: 300, sortable: true },
    { id: 'status', label: 'Statut', type: 'status', width: 150, sortable: true },
    // ...
  ],
  default_filters: { status: ['planned', 'in_progress'] },
  default_sort: ['priority:desc', 'progress:asc']
}
```

### Item Format (Unifié)
```javascript
{
  id: 'uuid',
  type: 'initiative',
  title: 'Transformation Digitale Groupe',
  status: 'in_progress',
  owner: 'Marie Dubois',
  sponsor: 'Jean-Marc Lefort (CEO)',
  start_date: '2025-01-15T00:00:00Z',
  end_date: '2026-12-31T00:00:00Z',
  progress: 42,
  priority: 'critical',
  tags: ['Digital', 'Stratégie', 'Groupe'],
  custom_fields: {
    budget: '2.5M€',
    fte: 15,
    business_unit: 'Corporate'
  },
  created_at: '2024-12-01T00:00:00Z',
  updated_at: '2026-01-12T00:00:00Z'
}
```

### Mode Démo/Prod (Transparent)
```javascript
// Hook détecte automatiquement
const { items, loading, isDemoMode } = useCockpitItems(orgId, 'initiatives');

// Banner affiché si isDemoMode === true
{isDemoMode && (
  <div className="bg-amber-500/10 border-b border-amber-500/30">
    <span className="text-amber-400">📊 Mode Démo - Données fictives affichées</span>
  </div>
)}
```

---

## 🚀 Roadmap Implémentation

### Phase 1: P1 - Rendre Logique (Core MVP)
**Objectif**: Cockpit exploitable avec 1 board fonctionnel

1. ✅ **Modèle de données** (src/types/cockpit.js)
   - Item/Board/Vue types
   - Configurations prédéfinies

2. ✅ **Composants UI de base**
   - BoardSelector (navigation boards)
   - ViewSelector (table/kanban/timeline/executive)
   - BoardTableView (vue principale)
   - ItemRow + ItemDetailPanel

3. ✅ **Hook data** (useCockpitItems)
   - Chargement auto démo/prod
   - CRUD operations
   - Mapping Supabase ↔ Item

4. ✅ **Page CockpitV2** (orchestrateur)
   - Navigation boards + vues
   - Loading states
   - Banner mode démo

5. 🔲 **Test board "Initiatives"** (à faire)
   - Afficher 6 initiatives démo
   - Tester vue Table
   - Tester vue Kanban
   - Tester panneau détail

6. 🔲 **Créer item end-to-end** (à faire)
   - Bouton "+ Nouveau"
   - Modal création
   - Sauvegarde Supabase
   - Rafraîchissement liste

### Phase 2: P1 - Distinguer Démo vs Prod
**Objectif**: Séparation claire modes

7. ✅ **Flag mode démo** (déjà fait dans useCockpitItems)
   - Détection auto (pas de données → démo)
   - Banner visible

8. 🔲 **Toggle mode démo** (optionnel, admin only)
   - Paramètre URL ?demo=1
   - Ou bouton dans header (dev mode)

9. 🔲 **Connecter tables Supabase réelles**
   - Vérifier mapping initiatives/risks/decisions
   - Tester RLS policies
   - Vérifier organization_id filtering

### Phase 3: P2 - Lisibilité Executive
**Objectif**: Vue agrégée pour COMEX

10. 🔲 **Vue Executive** (à créer)
    - KPIs principaux (avg_progress, on_track_count, at_risk_count, total_budget)
    - Charts: Progress distribution, Status breakdown, Priority matrix
    - Composant BoardExecutiveView.jsx

11. 🔲 **Timeline View** (à créer)
    - Gantt-style timeline
    - Groupement par priorité
    - Milestones visuels
    - Composant BoardTimelineView.jsx

12. 🔲 **Filtres avancés**
    - Multi-select status/priority/tags
    - Sauvegarde vues custom ("Vue COMEX", "Vue PMO")
    - Composant FilterPanel.jsx

### Phase 4: P3 - Polish & Animations
**Objectif**: UX premium

13. 🔲 **Micro-interactions**
    - Hover states
    - Transitions smooth
    - Loading skeletons
    - Toast notifications

14. 🔲 **Drag & drop avancé**
    - Réorganiser colonnes table
    - Drag entre swimlanes kanban
    - Timeline drag resize

15. 🔲 **Keyboard shortcuts**
    - N: Nouveau item
    - /: Focus search
    - Esc: Fermer panneau détail
    - ←→: Navigation boards

---

## 🔄 Migration Cockpit V1 → V2

### Stratégie Recommandée

**Option A: Remplacement progressif (Recommandé)**
1. Déployer CockpitV2 sur route `/app/cockpit-v2`
2. Tester en parallèle avec V1
3. Basculer `/app/cockpit` vers V2 quand stable
4. Garder V1 en `/app/cockpit-legacy` (1 mois backup)

**Option B: Feature flag**
1. Ajouter localStorage.getItem('use_cockpit_v2')
2. Composant CockpitRouter bascule entre V1/V2
3. Toggle dans Settings pour early adopters

### Cohabitation Code

**Fichiers à conserver (V1)**:
- `src/pages/app/Cockpit.jsx` (847 lignes) → Renommer `CockpitV1.jsx`
- `src/hooks/useCockpitData.js` (97 lignes) → Conserver pour legacy
- `src/lib/cockpitDemoData.js` (332 lignes) → Conserver pour legacy

**Fichiers nouveaux (V2)**:
- `src/pages/app/CockpitV2.jsx` → Nouveau orchestrateur
- `src/hooks/useCockpitItems.js` → Nouveau hook
- `src/lib/cockpitDemoDataV2.js` → Nouveau générateur
- `src/types/cockpit.js` → Config boards/vues
- `src/components/cockpit/*` → 6 composants

### Route Migration

```javascript
// src/App.jsx
<Route path="/app/cockpit" element={
  <ProtectedRoute>
    {localStorage.getItem('use_cockpit_v2') === 'true' 
      ? <CockpitV2 /> 
      : <CockpitV1 />
    }
  </ProtectedRoute>
} />

<Route path="/app/cockpit-v2" element={
  <ProtectedRoute><CockpitV2 /></ProtectedRoute>
} />

<Route path="/app/cockpit-legacy" element={
  <ProtectedRoute><CockpitV1 /></ProtectedRoute>
} />
```

---

## 🧪 Tests Validation

### Checklist Test Manuel

**Board Initiatives**:
- [ ] Affiche 6 initiatives en mode démo
- [ ] Colonnes visibles: Title, Statut, Responsable, Sponsor, Progress, Priorité, Dates
- [ ] Tri par colonne fonctionne
- [ ] Clic sur ligne ouvre panneau détail
- [ ] Bouton "+ Nouveau" ouvre modal/formulaire
- [ ] Badge count correct (6)

**Vue Kanban**:
- [ ] 4 swimlanes: Backlog, Planned, In Progress, Done
- [ ] Items répartis correctement
- [ ] Drag & drop change le statut
- [ ] Cards affichent: titre, owner, progress, tags

**Panneau Détail**:
- [ ] Slide-in depuis droite (w-96)
- [ ] Affiche tous les champs item
- [ ] Bouton Modifier ouvre edit mode
- [ ] Bouton Supprimer demande confirmation

**Mode Démo**:
- [ ] Banner "Mode Démo" visible en haut
- [ ] Données fictives affichées
- [ ] CRUD local fonctionne (pas Supabase)

**Navigation**:
- [ ] BoardSelector tabs fonctionnent
- [ ] ViewSelector bascule entre Table/Kanban
- [ ] Changement board reset vue à default

---

## 📊 Métriques Succès

### KPIs Produit
- **Temps de compréhension**: < 30 secondes pour comprendre la structure
- **Actions par session**: > 5 actions (clic item, changement vue, filtres)
- **Taux vide**: 0% (toujours des données démo si vide)
- **Taux adoption V2**: > 80% après 2 semaines

### KPIs Technique
- **Performance**: Table 100 items < 100ms render
- **Build**: 0 erreurs TypeScript/ESLint
- **Couverture tests**: > 70% (à implémenter)
- **Bundle size**: < +50KB vs V1

---

## 🎯 Prochaines Actions

### Immédiat (Aujourd'hui)
1. **Build & Test**: `npm run build` → Vérifier 0 erreurs
2. **Importer useState**: Ajouter dans ItemDetailPanel.jsx
3. **Route test**: Ajouter `/app/cockpit-v2` dans App.jsx
4. **Test visuel**: Ouvrir http://localhost:5173/app/cockpit-v2

### Court Terme (Cette Semaine)
1. **Formulaire création item**: Modal avec tous les champs
2. **Connexion Supabase**: Tester avec vraies données
3. **Vue Executive**: Layout + KPIs
4. **Timeline View**: Gantt simple

### Moyen Terme (2 Semaines)
1. **Migration V1 → V2**: Route switch
2. **Tests automatisés**: Vitest + Testing Library
3. **Documentation utilisateur**: Guide COMEX/PMO
4. **Feedback loop**: User testing avec 5 décideurs

---

**Date**: 12 janvier 2026  
**Auteur**: GitHub Copilot  
**Version**: v2.0.0-alpha  
**Statut**: ✅ Architecture complète, prêt pour test
