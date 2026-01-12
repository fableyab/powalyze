# 🚀 Guide de Déploiement Vercel - URGENT

## ⚠️ Situation Actuelle

**Problème:** Vercel ne montre aucun déploiement disponible  
**Cause:** Problème d'authentification GitHub (compte `fableyab` n'a pas les permissions)  
**Solution:** 3 options ci-dessous

---

## ✅ **OPTION 1: Déploiement via Vercel Interface (RECOMMANDÉ)**

### Étapes:
1. **Ouvrez Vercel Dashboard:**
   ```
   https://vercel.com/powalyze
   ```

2. **Allez dans le projet:**
   - Cliquez sur le projet `powalyze`
   - Project ID: `prj_3i1L79taeDFJy9aY2HopS2huQlP1`

3. **Vérifiez la connexion Git:**
   - Allez dans **Settings** → **Git**
   - Si "Not Connected" ou "Disconnected":
     - Cliquez **Reconnect**
     - Sélectionnez le repository `Powalyze/powalyzeV2`
     - Autorisez l'accès GitHub

4. **Déclenchez un déploiement:**
   - Allez dans **Deployments**
   - Cliquez **Deploy** ou **Redeploy**
   - Sélectionnez la branche `main`

### ⏱️ Temps estimé: 5 minutes

---

## ✅ **OPTION 2: Authentification GitHub avec Token**

### Étapes:
1. **Créez un Personal Access Token:**
   ```
   https://github.com/settings/tokens/new
   ```
   
   - **Note:** "Powalyze Deployment"
   - **Expiration:** 90 days (ou No expiration)
   - **Scopes à cocher:**
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (si vous utilisez GitHub Actions)

2. **Copiez le token** (vous ne le verrez qu'une fois!)

3. **Configurez Git pour utiliser le token:**
   ```powershell
   cd c:\powalyze
   git remote set-url origin https://YOUR_TOKEN@github.com/Powalyze/powalyzeV2.git
   ```
   
   Remplacez `YOUR_TOKEN` par votre token GitHub

4. **Poussez les changements:**
   ```powershell
   git push origin main
   ```

### ⏱️ Temps estimé: 8 minutes

---

## ✅ **OPTION 3: Déploiement depuis le dépôt GitHub**

Si vous avez accès au dépôt GitHub:

1. **Ouvrez GitHub:**
   ```
   https://github.com/Powalyze/powalyzeV2
   ```

2. **Vérifiez que Vercel est installé:**
   - Allez dans **Settings** → **Integrations**
   - Si Vercel n'est pas installé:
     - Installez Vercel GitHub App
     - Autorisez l'accès au repository `powalyzeV2`

3. **Déclenchez un déploiement:**
   - Allez dans **Actions** (si configuré)
   - Ou faites un commit vide:
     ```powershell
     git commit --allow-empty -m "Trigger Vercel deployment"
     git push origin main
     ```

### ⏱️ Temps estimé: 10 minutes

---

## 📋 Changements Prêts à Déployer

Le commit suivant est prêt et attend d'être déployé:

```
Commit: cae5a69a
Message: 🚀 Mise à jour: Français par défaut + Fix RLS + Build complet Vercel

Fichiers modifiés:
✅ vercel.json                      → Build command: npm run build:full
✅ src/lib/i18n/config.js           → defaultLocale: "fr"
✅ src/i18n.js                      → lng: 'fr' forcé
✅ src/lib/i18n.js                  → lng: 'fr' forcé
✅ src/main.jsx                     → localStorage force French
✅ src/pages/app/ProjectNew.jsx     → Délai 500ms + vérification RLS
✅ FIX_RLS_INITIATIVES.sql          → Script SQL complet
```

---

## 🎯 Après le Déploiement

### 1. Exécutez le script SQL sur Supabase:
```
https://supabase.com/dashboard/project/YOUR_PROJECT/sql
```

Copiez et exécutez le contenu de: `FIX_RLS_INITIATIVES.sql`

### 2. Vérifiez le site:
```
https://powalyze.com
```

**Checklist:**
- [ ] La langue par défaut est français
- [ ] Le site ne redirige plus vers `#for-who`
- [ ] La page d'accueil affiche la nouvelle version
- [ ] La création de projet fonctionne sans erreur RLS

### 3. Testez la création de projet:
1. Connectez-vous: https://powalyze.com/login
2. Créez un nouveau projet
3. Vérifiez qu'il n'y a pas d'erreur RLS

---

## 🆘 En Cas de Problème

### Le site montre toujours l'ancienne version?
- Attendez 2-3 minutes (propagation CDN)
- Videz le cache: `Ctrl + Shift + R` (Chrome/Firefox)
- Vérifiez les logs Vercel: https://vercel.com/powalyze/deployments

### Erreur RLS persiste?
- Vérifiez que le script SQL a été exécuté sur Supabase
- Consultez: `FIX_RLS_SUMMARY.md`

### Déploiement échoue?
- Vérifiez les logs de build dans Vercel
- Le script `npm run build:full` doit s'exécuter sans erreur

---

## 📞 Support

**Logs de build:**
```powershell
cd c:\powalyze
npm run build:full > build-vercel.log 2>&1
```

**État Git:**
```powershell
git status
git log --oneline -5
```

**Configuration Vercel:**
```powershell
cat .vercel\project.json
```
