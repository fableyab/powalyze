# 🚀 Guide de Déploiement Powalyze V2

**Date:** 12 janvier 2026  
**Statut:** Prêt pour déploiement (build validé ✅)

## ⚠️ PRÉREQUIS CRITIQUES

### 1. Déployer le Schéma Database AVANT de tester en production

Le schéma DB V2 **DOIT** être déployé dans Supabase **AVANT** d'utiliser les nouvelles pages :

1. **Ouvrir** : https://app.supabase.com/project/phfeteiholkfiredgero/sql
2. **Copier** le contenu de `c:\powalyze\supabase\schema_refonte_v2.sql`
3. **Coller** dans le SQL Editor et **RUN**
4. **Vérifier** : 9 nouvelles tables créées (organizations, profiles, portfolios, projects, phases, tasks, kpis, risks, budget_entries)

⚠️ **Sans ce schéma, toutes les pages V2 échoueront avec des erreurs 404 Not Found (tables inexistantes)**

---

## 📦 Déploiement sur Vercel

### Problème Actuel
- **Erreur** : "Too many requests - more than 5000 files"
- **Cause** : CLI Vercel upload limite à 5000 fichiers (projet contient 1713 fichiers Git)
- **Impact** : Déploiement CLI `vercel --prod` échoue systématiquement

### ✅ Solution Recommandée : GitHub + Vercel Integration

#### Étape 1 : Créer un repository GitHub

```powershell
# Option A : Via GitHub CLI (si installé)
gh repo create powalyze-v2 --private --source=. --push

# Option B : Manuellement
# 1. Aller sur https://github.com/new
# 2. Nom : powalyze-v2
# 3. Visibilité : Private
# 4. NE PAS initialiser avec README
# 5. Copier l'URL du repo (ex: https://github.com/username/powalyze-v2.git)
```

```powershell
# Ajouter le remote Git
git remote add origin https://github.com/VOTRE-USERNAME/powalyze-v2.git

# Pousser le code
git branch -M main
git push -u origin main
```

#### Étape 2 : Connecter Vercel à GitHub

1. **Ouvrir** : https://vercel.com/dashboard
2. **Cliquer** : "Add New" → "Project"
3. **Sélectionner** : "Import Git Repository"
4. **Choisir** : Repository `powalyze-v2`
5. **Configuration détectée automatiquement** :
   - Framework Preset : **Vite**
   - Build Command : `npm run build`
   - Output Directory : `dist`
   - Install Command : `npm install`

6. **Variables d'environnement** (optionnel pour frontend, hardcodé dans `customSupabaseClient.js`) :
   - `VITE_SUPABASE_URL` : `https://phfeteiholkfiredgero.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` : (clé déjà hardcodée)

7. **Deploy** → Attendre 2-3 minutes

#### Étape 3 : Vérifier le Déploiement

Une fois déployé, tester :

- **Dashboard Executive** : `https://powalyze-v2.vercel.app/dashboard-executive`
- **Portfolios** : `https://powalyze-v2.vercel.app/portfolios`
- **Projects V2** : `https://powalyze-v2.vercel.app/projects-v2`

---

## 🔧 Solution Alternative : Deploiement Manuel via Dashboard Vercel

Si GitHub n'est pas une option :

### Option 1 : Upload ZIP via Vercel Dashboard

1. **Créer un ZIP propre** (exclure node_modules) :
```powershell
# Créer archive sans node_modules, dist, caches
$exclude = @('node_modules', 'dist', '.git', 'backend', 'android', 'supabase', 'backups')
$files = Get-ChildItem -Recurse | Where-Object { 
    $path = $_.FullName
    -not ($exclude | Where-Object { $path -like "*\$_\*" })
}
Compress-Archive -Path $files -DestinationPath "powalyze-v2-deploy.zip" -Force
```

2. **Uploader** : https://vercel.com/new → "Upload" → Sélectionner ZIP
3. **Problème** : Peut toujours échouer si >5000 fichiers dans l'archive

### Option 2 : Migrer vers Netlify

Netlify accepte les gros projets :

```powershell
# Installer Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Déployer
netlify deploy --prod --dir=dist --build
```

---

## 📊 État Actuel du Projet

### ✅ Completé

- **Schema DB V2** : `supabase/schema_refonte_v2.sql` (401 lignes, 9 tables avec RLS)
- **Services Layer** :
  - `portfolioServiceV2.js` (CRUD + stats + agrégations)
  - `projectServiceV2.js` (CRUD + filtres + analytics)
  - `phaseService.js` (ordering + progress)
  - `budgetService.js` (entries + sync)
  
- **Frontend Pages** :
  - `DashboardExecutive.jsx` (KPIs globaux, graphiques, portefeuilles, projets critiques)
  - `PortfoliosList.jsx` (table avec recherche/stats)
  - `PortfolioDetail.jsx` (4 onglets : Overview, Projects, Risks, Performance)
  - `ProjectsList.jsx` (table complète avec filtres)
  - `ProjectNew.jsx` (formulaire 6 blocs)
  - `ProjectDetail.jsx` (4 onglets : Overview, Phases, Budget, Risks)

- **Routes** : Toutes configurées dans `App.jsx`
- **Build** : ✅ Réussi (19.71s, 177 fichiers, 60.34MB)
- **Git** : 2 commits créés :
  - `c4879607` : Architecture refonte V2 (schema + services + Projects pages)
  - `94d7e920` : Modules Portfolios + Dashboard Executive

### ⏳ En Attente

1. **Déploiement Schema DB** : Exécuter `schema_refonte_v2.sql` dans Supabase
2. **Déploiement Frontend** : Vercel via GitHub ou alternative
3. **Tests E2E** : Valider le flow complet en production

---

## 🎯 Prochaines Étapes (Après Déploiement)

### Phase 1 : Modules Manquants

- **Reports Module** : Templates reporting (PDF/HTML), exports CSV/XLS
- **Admin Module** : Gestion org/users/rôles, types projets, statuts
- **Portfolio Creation** : PortfolioNew.jsx (formulaire création)
- **Phase Management** : PhaseNew.jsx, PhaseEdit.jsx (dans ProjectDetail)

### Phase 2 : Nettoyage

- **Supprimer** : Anciens fichiers (projectService.js, portfolioService.js)
- **Supprimer** : Routes obsolètes dans App.jsx
- **Mettre à jour** : Header.jsx avec navigation simplifiée (Dashboard, Portfolios, Projects, Reports, Admin)

### Phase 3 : Documentation

- **Guide Utilisateur** : Scénarios d'utilisation des nouveaux modules
- **API Reference** : Documentation complète des services V2
- **Migration Guide** : Comment passer de V1 à V2

---

## 🛠️ Commandes Utiles

```powershell
# Build local
npm run build

# Dev server
npm run dev

# Vérifier erreurs build
npm run build 2>&1 | Select-String "error|warning" -Context 2

# Compter fichiers projet
(git ls-files).Count

# Taille dist
Get-ChildItem dist -Recurse | Measure-Object -Property Length -Sum

# Git status
git status --short

# Créer commit
git add .
git commit -m "feat: description"

# Pousser vers remote
git push origin main
```

---

## 📞 Support

En cas de problème :

1. **Schema DB** : Vérifier que toutes les tables existent dans Supabase Table Editor
2. **Build errors** : Vérifier console pour imports manquants
3. **Deployment** : Utiliser GitHub Integration (méthode la plus fiable)
4. **Runtime errors** : Ouvrir DevTools Console (F12) et vérifier erreurs réseau

---

**Dernière mise à jour** : 12 janvier 2026, 15:30 UTC  
**Version** : Powalyze V2.0.0  
**Build** : ✅ Validé (19.71s)  
**Schéma DB** : ⏳ En attente de déploiement
