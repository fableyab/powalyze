# Bugs Identifiés et Corrections - Plateforme SaaS Powalyze

## 🔍 Analyse Effectuée

Date: 2024
Scope: Plateforme SaaS complète (Frontend React + Backend Express + Supabase)

## 🐛 Bugs Identifiés

### 1. **Gestion des Sessions Supabase** ⚠️ CRITIQUE
**Fichiers**: `src/contexts/SupabaseAuthContext.jsx`, `src/lib/authService.js`
**Problème**: 
- Multiples appels `console.error` au lieu de gestion d'erreurs appropriée
- Token refresh peut échouer silencieusement
- Session invalide cause des boucles de redirection

**Impact**: Utilisateurs déconnectés de manière aléatoire, expérience utilisateur dégradée

**Correction Prévue**:
```javascript
// Ajouter un retry mechanism pour le refresh token
// Implémenter un error boundary pour les erreurs d'auth
// Toast notifications au lieu de console.error
```

### 2. **Organisation Auto-Create Race Condition** ⚠️ HAUTE
**Fichier**: `src/lib/organizationService.js`
**Problème**:
- `getOrCreateUserOrganization()` peut créer des doublons si appelé simultanément
- Pas de vérification atomique lors de la création

**Impact**: Certains utilisateurs peuvent avoir plusieurs organisations créées

**Correction Prévue**:
```javascript
// Utiliser transaction Supabase
// Ajouter constraint UNIQUE sur user_id + organization_id dans user_organizations
```

### 3. **Gestion des Erreurs dans les Pages** 🟡 MOYENNE
**Fichiers Affectés**:
- `src/pages/app/CockpitExecutif.jsx`
- `src/pages/app/DashboardExecutive.jsx`
- `src/pages/app/DecisionHub.jsx`
- `src/pages/app/Documents.jsx`
- `src/pages/app/CommitteeView.jsx`
- `src/pages/auth/Register.jsx`

**Problème**: 30+ occurrences de `console.error` au lieu de feedback utilisateur

**Impact**: Utilisateurs ne sont pas informés des erreurs, difficile de débugger en production

**Correction Prévue**:
```javascript
// Remplacer tous les console.error par:
toast({
  title: "Erreur",
  description: error.message,
  variant: "destructive"
});
```

### 4. **RLS Policies Manquantes** ⚠️ HAUTE
**Problème**: Certaines tables n'ont pas de politiques RLS complètes
- `documents` peut avoir des permissions trop larges
- `committees` sans vérification de membership
- `risks` et `risk_actions` sans filtrage org

**Impact**: Potentielle fuite de données entre organisations

**Correction Prévue**:
```sql
-- Vérifier et resserrer toutes les politiques RLS
-- Audit complet du fichier SUPABASE_SCHEMA_COMPLETE.sql
```

### 5. **Power BI Backend CORS** 🟡 MOYENNE
**Fichier**: `backend/server.js`
**Problème**:
- CORS configuré uniquement pour localhost:5173
- Production peut bloquer les requêtes depuis www.powalyze.com

**Impact**: Rapports Power BI ne se chargent pas en production

**Correction Prévue**:
```javascript
// Ajouter les domaines de production aux origins autorisés
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://www.powalyze.com',
  'https://powalyze.com',
  'https://powalyze.ch'
];
```

### 6. **État de Chargement Manquant** 🟢 BASSE
**Fichiers**: Plusieurs pages dashboard
**Problème**: Pas de skeleton/spinner pendant le chargement des données

**Impact**: Mauvaise expérience utilisateur, impression de lenteur

**Correction Prévue**:
```javascript
// Ajouter des composants de chargement avec Skeleton UI
{loading ? <Skeleton /> : <DataDisplay />}
```

### 7. **Env Variables Hardcodées** ⚠️ CRITIQUE
**Fichier**: `src/lib/customSupabaseClient.js`
**Problème**: 
- Supabase URL et anon key hardcodées dans le code
- Pas d'utilisation de variables d'environnement

**Impact**: Impossible de changer l'environnement sans rebuild, credentials exposés dans le code

**Correction Prévue**:
```javascript
// Migrer vers .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### 8. **Navigation Mobile Non Optimisée** 🟡 MOYENNE
**Fichier**: `src/components/Header.jsx`
**Problème**: Menu hamburger peut ne pas fonctionner sur iOS/Android

**Impact**: Navigation difficile sur mobile

**Correction Prévue**:
```javascript
// Tester avec Capacitor
// Ajouter des event handlers tactiles spécifiques
```

### 9. **Absence de Validation Backend** ⚠️ HAUTE
**Fichier**: `backend/server.js`
**Problème**: 
- Pas de validation des inputs utilisateur
- Embed token Power BI généré sans vérification du reportType

**Impact**: Potentielle injection SQL, accès non autorisé à des rapports

**Correction Prévue**:
```javascript
// Ajouter validation avec Joi ou Zod
const reportTypeSchema = z.enum(['commercial', 'finance', 'pmo', ...]);
```

### 10. **Recherche de Documents Inefficace** 🟢 BASSE
**Fichier**: `src/pages/app/Documents.jsx`
**Problème**: Recherche côté client au lieu de côté serveur

**Impact**: Lent avec beaucoup de documents

**Correction Prévue**:
```javascript
// Utiliser full-text search Supabase
.textSearch('name', searchTerm)
```

## 🎯 Système Demo/Prod (NOUVEAU - Implémenté)

### Fonctionnalités Ajoutées ✅
1. **Migration SQL**: `migrations/add-demo-prod-environments.sql`
   - Colonne `environment` sur table `organizations`
   - Organisation demo avec UUID fixe
   - Seed data pour demo

2. **Service Environnement**: `src/lib/environmentService.js`
   - Gestion des environnements demo/prod
   - Création d'organisations clients
   - Accès demo pour utilisateurs

3. **UI Components**:
   - `OrganizationSwitcher.jsx`: Sélecteur d'organisation
   - `EnvironmentAdmin.jsx`: Page admin de gestion

4. **Documentation**: `DEPLOYMENT_DEMO_PROD.md`

### Tests Requis ⚠️
- [ ] Migration SQL exécutée sur Supabase
- [ ] Création automatique d'org prod au signup
- [ ] Accès demo fonctionnel
- [ ] Isolation des données entre environnements
- [ ] Basculement demo/prod sans erreur

## 📋 Plan d'Action Prioritaire

### Phase 1: Bugs Critiques (À faire IMMÉDIATEMENT)
1. **Migrer les env variables** (Bug #7)
   - Créer `.env` avec Supabase credentials
   - Modifier `customSupabaseClient.js`
   - Configurer Vercel env vars

2. **Déployer système demo/prod** (NOUVEAU)
   - Exécuter migration SQL
   - Ajouter routes et composants
   - Tester en local puis déployer

3. **Fix RLS policies** (Bug #4)
   - Audit complet des politiques
   - Resserrer les permissions
   - Tester l'isolation des données

### Phase 2: Bugs Haute Priorité (Cette semaine)
4. **Fix race condition organisations** (Bug #2)
   - Ajouter transaction atomique
   - Constraint UNIQUE dans DB

5. **Validation backend Power BI** (Bug #9)
   - Schémas de validation
   - Vérification des permissions

6. **Fix CORS backend** (Bug #5)
   - Ajouter domaines production
   - Tester depuis www.powalyze.com

### Phase 3: Améliorations UX (Prochains sprints)
7. **Remplacer console.error par toasts** (Bug #3)
   - Toutes les pages app/
   - Feedback utilisateur cohérent

8. **États de chargement** (Bug #6)
   - Skeleton components
   - Spinners

9. **Optimiser recherche** (Bug #10)
   - Full-text search Supabase

10. **Navigation mobile** (Bug #8)
    - Tests Capacitor
    - Touch handlers

## 🧪 Tests à Effectuer Après Corrections

### Tests Fonctionnels
```bash
# 1. Test signup + auto-create org
# 2. Test accès demo
# 3. Test basculement demo/prod
# 4. Test isolation données (RLS)
# 5. Test Power BI embed (prod domain)
# 6. Test navigation mobile (iOS/Android)
```

### Tests de Régression
```bash
# 1. Login/Logout
# 2. Création initiative
# 3. Upload documents
# 4. Gestion comités
# 5. Décisions COMEX
# 6. Rapports Power BI
```

## 📊 Métriques de Succès

- ✅ Zero erreurs `console.error` en production
- ✅ Isolation des données 100% entre environnements
- ✅ Rapports Power BI chargent en < 3s
- ✅ Navigation mobile fluide (60fps)
- ✅ Taux d'erreur auth < 0.1%
- ✅ Temps de création d'organisation < 1s

## 🚀 Prochaines Étapes

1. **IMMÉDIAT**: Exécuter migration demo/prod sur Supabase
2. **AUJOURD'HUI**: Migrer credentials vers .env
3. **CETTE SEMAINE**: Fix bugs critiques et haute priorité
4. **CE MOIS**: Compléter toutes les corrections

## 📝 Notes Techniques

### Supabase Credentials (À MIGRER)
**Emplacement actuel**: `src/lib/customSupabaseClient.js` (hardcodé)
**Destination**: `.env` + Vercel Environment Variables

### Power BI Backend
**Port**: 3001
**CORS**: Doit inclure www.powalyze.com en production
**Auth**: Azure AD client credentials flow

### Multi-Tenant
**Stratégie**: organization_id + RLS policies
**Demo Org UUID**: `00000000-0000-0000-0000-000000000001`
**Isolation**: Supabase RLS vérifie automatiquement

