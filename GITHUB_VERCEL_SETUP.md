# 🚀 Instructions Déploiement GitHub + Vercel

## ✅ Étape 1 : Créer le Repository GitHub

Une fenêtre s'est ouverte dans votre navigateur : **https://github.com/new**

### Configuration du Repository

1. **Repository name** : `powalyze-v2`
2. **Description** (optionnel) : `Powalyze V2 - Plateforme SaaS de gestion de portefeuilles stratégiques`
3. **Visibilité** : 
   - ✅ **Private** (recommandé pour code propriétaire)
   - ⚠️ Public seulement si open-source
4. **⚠️ NE PAS cocher** :
   - ❌ "Add a README file"
   - ❌ "Add .gitignore"
   - ❌ "Choose a license"
5. **Cliquer** : "Create repository"

---

## ✅ Étape 2 : Copier l'URL du Repository

Après création, GitHub affiche une page avec des commandes.

**Copiez l'URL HTTPS du repository** (format: `https://github.com/USERNAME/powalyze-v2.git`)

Exemples possibles:
- `https://github.com/fabrice-fays/powalyze-v2.git`
- `https://github.com/powalyze/powalyze-v2.git`

---

## ✅ Étape 3 : Ajouter le Remote et Pousser

**Une fois l'URL copiée**, revenez dans VS Code et exécutez :

```powershell
# Remplacez <URL> par l'URL que vous avez copiée
git remote add origin <URL>

# Exemple :
# git remote add origin https://github.com/fabrice-fays/powalyze-v2.git

# Pousser le code
git branch -M main
git push -u origin main
```

**Durée estimée** : 30-60 secondes (selon connexion)

---

## ✅ Étape 4 : Connecter Vercel au Repository

1. **Ouvrir** : https://vercel.com/new
2. **Sélectionner** : "Import Git Repository"
3. **Si c'est votre première fois** : 
   - Cliquer "Add GitHub Account"
   - Autoriser Vercel à accéder à vos repos
4. **Chercher** : `powalyze-v2` dans la liste
5. **Cliquer** : "Import"

### Configuration Automatique Détectée

Vercel détecte automatiquement :
- **Framework Preset** : Vite ✅
- **Build Command** : `npm run build` ✅
- **Output Directory** : `dist` ✅
- **Install Command** : `npm install` ✅

### Variables d'Environnement (Optionnel)

⚠️ **Note** : Les variables Supabase sont hardcodées dans `customSupabaseClient.js`.

Si vous voulez les externaliser plus tard :
- `VITE_SUPABASE_URL` = `https://phfeteiholkfiredgero.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = (voir fichier)

**Pour l'instant, cliquez directement sur "Deploy"**

---

## ✅ Étape 5 : Déploiement en Cours

Vercel va :
1. **Clone** le repository (~5s)
2. **Install** les dépendances (~30s)
3. **Build** le projet (~20s)
4. **Deploy** sur CDN (~10s)

**Durée totale** : 1-2 minutes

Vous verrez un écran avec :
- 🟡 "Building..." → En cours
- 🟢 "Ready" → Déployé avec succès

---

## ✅ Étape 6 : Tester le Déploiement

Une fois "Ready", Vercel affiche :
- **URL de production** : `https://powalyze-v2.vercel.app` (ou similaire)

### Pages à Tester

1. **Dashboard Executive** : `/dashboard-executive`
2. **Portfolios** : `/portfolios`
3. **Projects V2** : `/projects-v2`

### ⚠️ AVANT de tester : Déployer le Schéma DB

**CRITIQUE** : Les pages V2 nécessitent les nouvelles tables Supabase.

**Si pas encore fait** :
1. Ouvrir : https://app.supabase.com/project/phfeteiholkfiredgero/sql
2. Copier le contenu de `c:\powalyze\supabase\schema_refonte_v2.sql`
3. Coller dans SQL Editor
4. Cliquer "RUN"
5. Vérifier que 9 tables sont créées

**Sans cette étape, les pages afficheront des erreurs 404 (tables non trouvées)**

---

## 🔄 Workflow Futur

Maintenant que GitHub + Vercel est connecté :

### Pour déployer de nouveaux changements :

```powershell
# 1. Faire vos modifications
# 2. Commit
git add .
git commit -m "feat: description des changements"

# 3. Push
git push origin main
```

**Vercel déploiera automatiquement** à chaque push ! 🚀

---

## 📊 Monitoring

### Voir les Déploiements
- **Dashboard Vercel** : https://vercel.com/dashboard
- **Logs de build** : Cliquer sur le déploiement → "View Function Logs"

### Voir les Analytics
- **Performance** : Vercel Analytics (activable dans settings)
- **Erreurs** : Vercel Error Tracking

---

## 🆘 Troubleshooting

### Problème : "Repository not found"
- **Solution** : Vérifier que vous avez bien autorisé Vercel à accéder au repo (GitHub Settings → Applications → Vercel)

### Problème : "Build failed"
- **Solution** : Vérifier les logs de build dans Vercel Dashboard
- **Cause commune** : Imports manquants, variables d'environnement

### Problème : Pages V2 affichent des erreurs
- **Solution** : Déployer `schema_refonte_v2.sql` dans Supabase AVANT de tester

### Problème : Git push demande authentification
- **Solution** : Configurer Personal Access Token GitHub
  - GitHub → Settings → Developer settings → Personal access tokens
  - Créer token avec scope "repo"
  - Utiliser le token comme mot de passe lors du push

---

## 📝 Commandes Utiles

```powershell
# Vérifier remote
git remote -v

# Voir status
git status

# Voir historique commits
git log --oneline -5

# Annuler dernier commit (si erreur)
git reset --soft HEAD~1

# Forcer push (si historique diverge)
git push --force origin main
```

---

## ✅ Checklist Complète

- [ ] Repository GitHub créé (`powalyze-v2`)
- [ ] Remote Git ajouté (`git remote add origin <URL>`)
- [ ] Code poussé (`git push -u origin main`)
- [ ] Vercel connecté au repo
- [ ] Déploiement réussi (status "Ready")
- [ ] Schéma DB V2 déployé dans Supabase
- [ ] Pages V2 testées en production

---

**Prêt à commencer ?**

👉 **PROCHAINE ÉTAPE** : Copiez l'URL de votre repository GitHub (après création) et revenez ici !
