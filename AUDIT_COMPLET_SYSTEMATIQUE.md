# 🔍 AUDIT COMPLET - POWALYZE SAAS
## Operating System pour Comités de Direction

**Date**: 12 janvier 2026  
**Standard cible**: Apple / Notion / Linear  
**Périmètre**: Full-stack (Auth, Navigation, Métier, UI/UX, Data/API, i18n, Performance)

---

## 📊 RÉSUMÉ EXÉCUTIF GLOBAL

### Score de maturité produit: 65/100 🟡

**Forces identifiées** :
- ✅ Architecture multi-tenant robuste (RLS Supabase)
- ✅ Stack moderne (React 18, Vite, TailwindCSS)
- ✅ Modules métier riches (Cockpit, Portfolio, Risques, Décisions)
- ✅ Corrections P1 déjà appliquées (RLS, Onboarding, Messages)

**Faiblesses critiques** :
- 🔴 **515 lignes de routes** dans un seul fichier (App.jsx)
- 🔴 **50+ console.log/error** en production
- 🔴 **Navigation incohérente** (3 systèmes différents)
- 🔴 **États vides non

 traités** systématiquement
- 🔴 **Performance dégradée** (rerenders, appels multiples)

---

## 🚨 PRIORITÉ 1 - BLOQUEURS CRITIQUES (0-3 jours)

### P1-004 🔴 NAVIGATION FRAGMENTÉE - 3 SYSTÈMES COEXISTENT

#### Symptôme observé
L'application utilise **3 mécanismes de navigation différents** créant confusion et incohérence :

1. **React Router `navigate()`** : 30+ occurrences
2. **`window.location.href`** : 5+ occurrences (force reload)
3. **Balises `<a href>`** : ~10 occurrences (AlertesSensible.jsx)

**Exemple concret** (AlertesSensible.jsx ligne 76-81):
```javascript
<NavButton href="/app/cockpit">Vue d'ensemble</NavButton>
<NavButton href="/app/projets-sensible">Projets</NavButton>
// ...puis ligne 251:
window.location.href = '/app/projets-sensible'; // Force reload!
```

#### Cause probable
Développement incrémental sans refactoring. Mélange de patterns :
- SPA moderne (navigate)
- Legacy (window.location)
- Hybrid (href sans Link)

#### Impact concret
- ⚠️ **Perte de contexte** : window.location force reload → perd state React
- ⚠️ **Performance dégradée** : Reload complet vs transition SPA instantanée
- ⚠️ **Incohérence UX** : Parfois instant, parfois avec flash blanc
- ⚠️ **Bugs potentiels** : Loss of unsaved data, broken animations

#### Correction proposée

**Étape 1 - Standardiser sur React Router**:
```javascript
// ❌ AVANT (3 patterns)
window.location.href = '/app/cockpit';
<a href="/app/projets">Projets</a>
navigate('/dashboard');

// ✅ APRÈS (1 seul pattern)
import { Link, useNavigate } from 'react-router-dom';
const navigate = useNavigate();

// Pour liens:
<Link to="/app/cockpit">Cockpit</Link>

// Pour logic:
navigate('/app/cockpit');
```

**Fichiers à modifier** :
- `src/pages/app/AlertesSensible.jsx` (lignes 76-81, 251)
- `src/components/OrganizationSwitcher.jsx` (ligne 60)
- `src/pages/app/AlertsPage.jsx` (ligne 157)
- Tous les composants avec `window.location` ou `<a href>`

**Pattern de remplacement global**:
```bash
# Rechercher tous les window.location
grep -r "window\.location" src/

# Remplacer par navigate()
```

#### Test de validation
1. Naviguer : Landing → Login → Dashboard → Projets → Détail projet
2. ✅ Vérifier : **AUCUN** flash blanc/reload entre pages
3. ✅ Vérifier : Animations page transitions fonctionnent
4. ✅ Vérifier : Breadcrumb mis à jour correctement
5. ✅ Vérifier : Browser back/forward fonctionne

---

### P1-005 🔴 APP.JSX MONOLITHIQUE - 515 LIGNES

#### Symptôme observé
Le fichier `App.jsx` contient **515 lignes** avec :
- ~100 imports de pages
- ~200 routes définies
- Mélange de routes publiques/privées/mobiles/tablettes
- Impossible à maintenir

**Extrait actuel** (App.jsx):
```javascript
// Ligne 1-100: IMPORTS
import LandingPage from '@/pages/LandingPage';
import PMO from '@/pages/PMO';
// ... 98 autres imports

// Ligne 200-500: ROUTES
<Route path="/" element={<LandingPage />} />
<Route path="/pmo" element={<PMO />} />
// ... 198 autres routes
```

#### Cause probable
**Absence d'architecture routing**. Tout ajouté linéairement sans refactoring.

#### Impact concret
- 🚫 **Maintenance impossible** : Ajouter une route = chercher dans 515 lignes
- 🚫 **Risque d'erreur élevé** : Routes dupliquées, typos non détectées
- 🚫 **Performance build** : Vite doit parser 515 lignes à chaque hot-reload
- 🚫 **Onboarding dev** : Nouveau dev perdu immédiatement

#### Correction proposée

**Créer une architecture routing modulaire** :

```javascript
// src/routes/index.jsx (NOUVEAU)
import { publicRoutes } from './publicRoutes';
import { appRoutes } from './appRoutes';
import { adminRoutes } from './adminRoutes';
import { mobileRoutes } from './mobileRoutes';

export const routes = [
  ...publicRoutes,
  ...appRoutes,
  ...adminRoutes,
  ...mobileRoutes
];
```

```javascript
// src/routes/publicRoutes.jsx (NOUVEAU)
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/Login';
// ... autres imports publics

export const publicRoutes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <Login /> },
  // ... autres routes publiques
];
```

```javascript
// src/routes/appRoutes.jsx (NOUVEAU - PROTÉGÉES)
import { lazy } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

const Cockpit = lazy(() => import('@/pages/app/Cockpit'));
const Projects = lazy(() => import('@/pages/app/Projects'));

export const appRoutes = [
  {
    path: '/app',
    element: <ProtectedRoute><DesktopLayoutWrapper /></ProtectedRoute>,
    children: [
      { path: 'cockpit', element: <Cockpit /> },
      { path: 'projects', element: <Projects /> },
      // ...
    ]
  }
];
```

```javascript
// src/App.jsx (NOUVEAU - 50 lignes max)
import { routes } from '@/routes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <Routes>
              {routes.map((route, idx) => (
                <Route key={idx} {...route} />
              ))}
            </Routes>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}
```

**Migration progressive** :
1. Créer `src/routes/` directory
2. Migrer 10 routes publiques → `publicRoutes.jsx`
3. Migrer 10 routes app → `appRoutes.jsx`
4. Tester
5. Continuer jusqu'à App.jsx < 100 lignes

#### Test de validation
1. ✅ App.jsx < 100 lignes
2. ✅ Routes organisées par domaine (public, app, admin, mobile)
3. ✅ Ajout nouvelle route = modifier 1 fichier (ex: appRoutes.jsx)
4. ✅ Toutes les routes existantes fonctionnent

---

### P1-006 🔴 CONSOLE.LOG EN PRODUCTION

#### Symptôme observé
**50+ console.log/error/warn** détectés dans le code production, exposant :
- IDs utilisateur
- Organization IDs
- Données métier (risques, décisions)
- Erreurs SQL

**Exemples** :
```javascript
// AlertsPage.jsx ligne 57
console.warn('⚠️ Aucune organisation trouvée pour charger les alertes');

// EnvironmentAdmin.jsx ligne 44
console.error('Error loading organizations:', error);

// AlertesSensible.jsx ligne 32
console.error('Erreur chargement alertes:', error);
```

#### Cause probable
**Debug logs jamais nettoyés**. Pas de distinction dev/prod.

#### Impact concret
- 🚫 **Sécurité** : Expose architecture interne (table names, user IDs)
- 🚫 **Performance** : Console.log ralentit (surtout en boucles)
- 🚫 **Crédibilité** : Client ouvre DevTools → voit erreurs techniques
- 🚫 **RGPD** : Logs peuvent contenir données personnelles

#### Correction proposée

**Pattern 1 - Utiliser logError() déjà créé** :
```javascript
// ❌ AVANT
console.error('Error loading organizations:', error);

// ✅ APRÈS
import { logError } from '@/lib/errorMessages';
logError('EnvironmentAdmin.loadOrganizations', error, { userId: user.id });
// Visible SEULEMENT si process.env.NODE_ENV === 'development'
```

**Pattern 2 - Logger centralisé** :
```javascript
// src/lib/logger.js (NOUVEAU)
export const logger = {
  info: (message, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`ℹ️ ${message}`, data);
    }
  },
  error: (message, error, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ ${message}`, error, data);
    }
    // En prod: envoyer à Sentry/Datadog
  },
  warn: (message, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ ${message}`, data);
    }
  }
};
```

**Script de nettoyage automatique** :
```bash
# Trouver tous les console.log
grep -rn "console\." src/ --include="*.jsx" --include="*.js"

# Remplacer par logger
# OU supprimer si non-critique
```

**Fichiers prioritaires à nettoyer** :
- `src/pages/app/AlertsPage.jsx` (6 console)
- `src/pages/app/EnvironmentAdmin.jsx` (3 console.error)
- `src/pages/app/AlertesSensible.jsx` (1 console.error)
- Tous les services dans `src/lib/`

#### Test de validation
1. Build production: `npm run build`
2. Preview: `npm run preview`
3. Ouvrir DevTools Console
4. ✅ Naviguer dans toute l'app
5. ✅ Vérifier : **AUCUN** console.log/error/warn visible
6. ✅ En dev: logs toujours visibles

---

### P1-007 🔴 ÉTATS VIDES NON TRAITÉS SYSTÉMATIQUEMENT

#### Symptôme observé
**Gestion incohérente des empty states** à travers l'app :

1. **Cockpit.jsx** (ligne 122) : Message générique
2. **Portfolio.jsx** : Message contextuel selon filtre
3. **Projects.jsx** : Commentaire `{/* Empty state */}` sans UI
4. **Decisions.jsx** : Empty state incomplet

**Exemple problématique** (Projects.jsx ligne 110):
```javascript
{/* Empty state */}
{projects.length === 0 && (
  // ❌ RIEN - Juste écran blanc!
)}
```

#### Cause probable
**Pas de composant EmptyState réutilisable**. Chaque dev réinvente.

#### Impact concret
- ⚠️ **Confusion utilisateur** : "Bug ou normal ?"
- ⚠️ **Abandon** : Utilisateur pense que l'app est cassée
- ⚠️ **Friction onboarding** : Nouveau user ne sait pas quoi faire
- ⚠️ **Support overhead** : "Pourquoi je ne vois rien ?"

#### Correction proposée

**Créer un composant EmptyState réutilisable** :

```javascript
// src/components/EmptyState.jsx (NOUVEAU)
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function EmptyState({ 
  icon: Icon,
  title,
  description,
  actionLabel,
  actionRoute,
  onAction
}) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (actionRoute) {
      navigate(actionRoute);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-6">
      {Icon && <Icon className="w-16 h-16 text-white/20 mb-4" />}
      
      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-slate-400 text-center max-w-md mb-6">
        {description}
      </p>

      {(actionLabel && (actionRoute || onAction)) && (
        <Button
          onClick={handleAction}
          className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
```

**Usage standardisé** :

```javascript
// ❌ AVANT (Projects.jsx)
{projects.length === 0 && (
  {/* Empty state */}
)}

// ✅ APRÈS
import EmptyState from '@/components/EmptyState';
import { FolderOpen } from 'lucide-react';

{projects.length === 0 && (
  <EmptyState
    icon={FolderOpen}
    title="Aucun projet"
    description="Créez votre premier projet pour commencer à gérer votre portfolio."
    actionLabel="Créer un projet"
    actionRoute="/app/projects/new"
  />
)}
```

**Pattern pour chaque module** :

| Module | Icon | Title | Action |
|--------|------|-------|--------|
| Projects | FolderOpen | "Aucun projet" | "Créer un projet" |
| Portfolio | Briefcase | "Portfolio vide" | "Ajouter une initiative" |
| Risques | AlertTriangle | "Aucun risque" | "Créer un risque" |
| Décisions | CheckCircle2 | "Aucune décision" | "Créer une décision" |
| Cockpit | LayoutDashboard | "Cockpit vide" | "Importer des données" |

**Fichiers à modifier** :
- `src/pages/app/Projects.jsx` (ligne 110)
- `src/pages/app/Portfolio.jsx` (ligne 157-158)
- `src/pages/app/Risks.jsx` (ligne 141)
- `src/pages/app/Decisions.jsx` (ligne 160-166)
- `src/pages/app/Cockpit.jsx` (ligne 122)

#### Test de validation
1. Créer compte nouveau (vide)
2. Naviguer : Cockpit → Projets → Portfolio → Risques → Décisions
3. ✅ Chaque page montre EmptyState cohérent
4. ✅ Bouton action visible et fonctionnel
5. ✅ Design homogène (même style partout)

---

### P1-008 🔴 REDIRECTIONS INCOHÉRENTES

#### Symptôme observé
**10+ redirections** dans App.jsx créant confusion :

```javascript
// Ligne 351
<Route path="/saas" element={<Navigate to="/signup" replace />} />

// Ligne 419-423
<Route path="/app/dashboard" element={<Navigate to="/app/cockpit" replace />} />
<Route path="/app/dashboard-new" element={<Navigate to="/app/cockpit" replace />} />
<Route path="/app/dashboard-premium" element={<Navigate to="/app/cockpit" replace />} />
<Route path="/app/projects-new" element={<Navigate to="/app/projects" replace />} />
<Route path="/app/projects-premium" element={<Navigate to="/app/projects" replace />} />
```

**Problèmes** :
- URLs obsolètes (`dashboard-new`, `dashboard-premium`)
- Liens externes peuvent pointer vers URLs mortes
- SEO impacté (redirect chains)

#### Cause probable
**Legacy routes jamais nettoyées**. Accumulation de refactorings.

#### Impact concret
- ⚠️ **SEO** : Google indexe URLs qui redirigent
- ⚠️ **Performance** : Redirect = 1 requête supplémentaire
- ⚠️ **Confusion dev** : Quelle URL utiliser ?
- ⚠️ **Bookmarks cassés** : Users ont peut-être bookmarké anciennes URLs

#### Correction proposée

**Étape 1 - Audit complet des redirections** :
```javascript
// Créer redirects.config.js (NOUVEAU)
export const REDIRECTS = {
  // Legacy → Canonical
  '/saas': '/signup',
  '/app/dashboard': '/app/cockpit',
  '/app/dashboard-new': '/app/cockpit',
  '/app/dashboard-premium': '/app/cockpit',
  '/app/projects-new': '/app/projects',
  '/app/projects-premium': '/app/projects',
};
```

**Étape 2 - Composant Redirect centralisé** :
```javascript
// src/components/Redirect.jsx (NOUVEAU)
import { Navigate } from 'react-router-dom';
import { REDIRECTS } from '@/config/redirects';

export function LegacyRedirects() {
  return (
    <>
      {Object.entries(REDIRECTS).map(([from, to]) => (
        <Route 
          key={from} 
          path={from} 
          element={<Navigate to={to} replace />} 
        />
      ))}
    </>
  );
}
```

**Étape 3 - Nettoyer App.jsx** :
```javascript
// ✅ APRÈS (App.jsx simplifié)
<Routes>
  {/* Routes principales */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/app/cockpit" element={<Cockpit />} />
  
  {/* Redirections legacy (documentées) */}
  <LegacyRedirects />
  
  {/* 404 */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

**Étape 4 - Documentation** :
```markdown
# redirects.md (NOUVEAU)

## URLs Canoniques
- Cockpit: `/app/cockpit`
- Projets: `/app/projects`
- Signup: `/signup`

## URLs Legacy (à NE PLUS utiliser)
- ❌ `/app/dashboard` → `/app/cockpit`
- ❌ `/app/projects-new` → `/app/projects`

## Politique
- Conserver redirects pendant 6 mois
- Puis supprimer si analytics montrent 0 traffic
```

#### Test de validation
1. Accéder à chaque URL legacy
2. ✅ Redirige vers canonical
3. ✅ Browser URL change (pas de redirect chain)
4. ✅ Analytics tracke le redirect
5. ✅ Documentation à jour

---

## ⚠️ PRIORITÉ 2 - IMPORTANT MAIS NON-BLOQUANT (3-7 jours)

### P2-004 ⚠️ PERFORMANCE - RERENDERS EXCESSIFS

#### Symptôme
Dashboard Cockpit re-render complet à chaque update de projet individuel.

#### Cause
Pas de memoization. State global au lieu de state local.

#### Correction
```javascript
// Avant
const [projects, setProjects] = useState([]);

// Après
import { useMemo } from 'react';
const projectsById = useMemo(() => 
  projects.reduce((acc, p) => ({ ...acc, [p.id]: p }), {}),
  [projects]
);
```

---

### P2-005 ⚠️ i18n INCOMPLET

#### Symptôme
Mélange FR/EN dans plusieurs pages. Clés manquantes.

#### Exemples
```javascript
// AlertsPage.jsx - Hardcodé FR
<button>Créer une alerte</button>

// Projects.jsx - Hardcodé EN
<button>Save</button>
```

#### Correction
```javascript
// Audit automatisé
grep -r "<button>" src/ | grep -v "{t("

// Puis ajouter traductions
{t('common.save')}
{t('alerts.create')}
```

---

### P2-006 ⚠️ CHARGEMENT SANS LOADER

#### Symptôme
Pages montrent contenu vide pendant fetch, puis pop brusque.

#### Correction
```javascript
// Pattern standard
if (loading) return <LoadingSpinner />;
if (error) return <ErrorView error={error} onRetry={refetch} />;
return <Content data={data} />;
```

---

### P2-007 ⚠️ ERREURS SILENCIEUSES

#### Symptôme
`try/catch` avalent erreurs sans feedback utilisateur.

#### Exemple
```javascript
// ❌ AVANT
try {
  await api.createProject();
} catch (err) {
  // Rien - utilisateur ne sait pas si ça a marché
}

// ✅ APRÈS
try {
  await api.createProject();
  toast({ title: "Projet créé" });
} catch (err) {
  toast({ 
    variant: "destructive",
    title: "Erreur",
    description: err.message 
  });
}
```

---

### P2-008 ⚠️ MOBILE - NAVIGATION CASSÉE

#### Symptôme
Routes `/mobile/*` et `/tablet/*` redirigent toutes vers cockpit.

```javascript
// App.jsx ligne 494-497
<Route path="portfolio" element={<Navigate to="/tablet/cockpit" />} />
<Route path="analytics" element={<Navigate to="/tablet/cockpit" />} />
```

#### Impact
Tablette = expérience dégradée. Impossible d'accéder modules.

#### Correction
Implémenter vraies pages mobiles/tablettes OU désactiver routes.

---

## 🎨 PRIORITÉ 3 - FINITION / POLISH (7-14 jours)

### P3-004 🎨 ANIMATIONS MANQUANTES

#### Symptôme
Transitions entre pages abruptes.

#### Correction
```javascript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
>
  {children}
</motion.div>
```

---

### P3-005 🎨 FORMULAIRES - VALIDATION TEMPS RÉEL

#### Symptôme
Validation seulement au submit.

#### Correction
```javascript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const { register, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
```

---

### P3-006 🎨 ACCESSIBILITÉ (A11Y)

#### Symptôme
- Pas de labels ARIA
- Navigation clavier incomplète
- Contraste couleurs insuffisant

#### Correction
```javascript
// Ajouter ARIA
<button aria-label="Créer un projet">
  <Plus />
</button>

// Focus visible
.focus-visible:outline-2 outline-[#D4AF37]
```

---

## 📋 BACKLOG STRUCTURÉ (TICKETS PRÊTS)

### Sprint 1 - Blockers critiques (3 jours)

**TICKET-004** : Navigation unifiée (1j)
- Standardiser sur React Router `navigate()` + `<Link>`
- Supprimer tous les `window.location` et `<a href>`
- Files: AlertesSensible.jsx, OrganizationSwitcher.jsx, AlertsPage.jsx

**TICKET-005** : Refactor App.jsx routing (1j)
- Créer `src/routes/` directory
- Migrer vers routing modulaire
- Target: App.jsx < 100 lignes

**TICKET-006** : Nettoyer console.log (0.5j)
- Remplacer par `logError()` ou `logger`
- Supprimer logs non-critiques
- 50+ occurrences à traiter

**TICKET-007** : EmptyState component (0.5j)
- Créer composant réutilisable
- Appliquer sur Projects, Portfolio, Risks, Decisions, Cockpit
- Design cohérent partout

**TICKET-008** : Redirections legacy (0.5j)
- Centraliser dans redirects.config.js
- Documenter URLs canoniques
- Nettoyer App.jsx

---

### Sprint 2 - Performance & UX (4 jours)

**TICKET-009** : Performance optimizations (1j)
- React.memo sur composants lourds
- useMemo pour calculs coûteux
- Code splitting avancé

**TICKET-010** : i18n complet (1.5j)
- Audit hardcoded strings
- Compléter traductions FR/EN/DE/NO
- Script automatisé détection

**TICKET-011** : Loading states (1j)
- LoadingSpinner partout
- Skeleton loaders
- Pattern standardisé

**TICKET-012** : Error handling (0.5j)
- Toasts sur tous les catch
- ErrorBoundary global
- Retry mechanisms

---

### Sprint 3 - Polish (5 jours)

**TICKET-013** : Animations (1j)
- Framer Motion page transitions
- Micro-interactions (hover, click)

**TICKET-014** : Validation formulaires (1j)
- React Hook Form + Zod
- Validation temps réel
- Messages d'erreur clairs

**TICKET-015** : Accessibilité (2j)
- ARIA labels
- Keyboard navigation
- Screen reader support

**TICKET-016** : Mobile/Tablet (1j)
- Implémenter vraies pages mobile
- OU désactiver routes + redirect desktop

---

## 🎯 RÉSUMÉ EXÉCUTIF FINAL

### ⚠️ À CORRIGER AVANT TOUTE DÉMO CLIENT

**Bloqueurs absolus** (3 jours):
1. ✅ **P1-001** : RLS Organizations (FAIT)
2. ✅ **P1-002** : Onboarding auto-création (FAIT)
3. ✅ **P1-003** : Messages d'erreur propres (FAIT)
4. 🔴 **P1-004** : Navigation unifiée (React Router only)
5. 🔴 **P1-005** : App.jsx routing modulaire
6. 🔴 **P1-006** : Nettoyer console.log production
7. 🔴 **P1-007** : EmptyState component partout
8. 🔴 **P1-008** : Redirections documentées

**Après démo, dans 2 sprints** :
- Performance (rerenders, memoization)
- i18n complet
- Loading states
- Error handling systématique

---

## 📊 MÉTRIQUES DE SUCCÈS

**Avant corrections** :
- App.jsx: 515 lignes ❌
- console.log: 50+ ❌
- Navigation: 3 systèmes ❌
- Empty states: 5/10 pages ❌

**Après corrections** :
- App.jsx: < 100 lignes ✅
- console.log: 0 en prod ✅
- Navigation: 1 système (React Router) ✅
- Empty states: 10/10 pages ✅

---

## 🔧 COMMANDES UTILES

```bash
# Audit navigation
grep -rn "window\.location\|<a href" src/

# Audit console
grep -rn "console\." src/ --include="*.jsx"

# Audit empty states
grep -rn "length === 0" src/pages/app/

# Audit i18n
grep -rn "<button>" src/ | grep -v "{t("

# Lignes par fichier
wc -l src/App.jsx
```

---

**Prêt pour corrections systématiques** ✅
