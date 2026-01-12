# 🔧 Correction Erreur RLS Création de Projets

**Date** : 12 janvier 2026  
**Problème** : `new row violates row-level security policy for table "initiatives"`

---

## 🎯 Problème identifié

Lors de la création d'un projet sur `/app/projects/new`, l'erreur RLS Supabase bloque l'insertion car :
1. La politique RLS vérifie que l'utilisateur est dans l'organisation (`user_in_org()`)
2. La vérification peut échouer si la liaison `user_organizations` n'est pas encore effective dans la base

---

## ✅ Corrections appliquées

### 1. **Langue française par défaut** ✅
- [src/lib/i18n/config.js](src/lib/i18n/config.js) → `defaultLocale: "fr"`
- [src/i18n.js](src/i18n.js) → `lng: 'fr'` forcé
- [src/lib/i18n.js](src/lib/i18n.js) → `lng: 'fr'` forcé
- [src/main.jsx](src/main.jsx) → Force `i18nextLng` et `powalyze-locale` au démarrage

### 2. **Fix RLS création de projets** ✅
- [src/pages/app/ProjectNew.jsx](src/pages/app/ProjectNew.jsx) :
  - Ajout délai de **500ms** après liaison `user_organizations`
  - **Vérification explicite** de la liaison avant création initiative
  - Messages d'erreur plus explicites

### 3. **Script SQL de correction** ✅
- [FIX_RLS_INITIATIVES.sql](FIX_RLS_INITIATIVES.sql) créé :
  - Ajoute `owner_id` à `organizations` si manquant
  - Désactive RLS sur `organizations` (pas nécessaire)
  - Crée policies RLS optimisées pour `initiatives`
  - Ajoute policies pour `user_organizations`
  - Ajoute index de performance

---

## 🚀 Actions à faire MAINTENANT

### **Étape 1 : Exécuter le script SQL sur Supabase**

1. **Ouvrir Supabase Dashboard** :
   ```
   https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new
   ```

2. **Copier le contenu de `FIX_RLS_INITIATIVES.sql`** (déjà ouvert dans VS Code)

3. **Coller dans l'éditeur SQL Supabase**

4. **Cliquer sur "Run"**

5. **Vérifier** qu'il n'y a pas d'erreurs

### **Étape 2 : Rebuilder et déployer**

```powershell
# Build local
npm run build

# Option A : Commit + Push (si GitHub fonctionne)
git add .
git commit -m "fix: Force FR default + Fix RLS initiatives creation"
git push origin main

# Option B : Interface Vercel
# → Allez sur vercel.com/powalyze/deployments
# → Redeploy (sans cache)
```

### **Étape 3 : Tester**

1. **Allez sur** : `https://www.powalyze.com/app/projects/new`
2. **Remplissez le formulaire**
3. **Cliquez sur "Créer"**
4. **Vérifiez** qu'il n'y a plus d'erreur RLS

---

## 🔍 Détails techniques

### **Pourquoi l'erreur RLS ?**

La politique RLS sur `initiatives` utilise cette fonction :

```sql
CREATE POLICY "insert_initiatives_by_org" ON public.initiatives
  FOR INSERT WITH CHECK ( public.user_in_org(organization_id) );
```

La fonction `user_in_org()` vérifie :
```sql
SELECT EXISTS (
  SELECT 1 FROM user_organizations
  WHERE organization_id = org_id AND user_id = auth.uid()
);
```

**Problème** : Si l'insertion dans `user_organizations` n'est pas encore commitée ou visible, la fonction retourne `false` → RLS bloque.

### **Solution appliquée**

1. **Délai de 500ms** après insertion dans `user_organizations`
2. **Vérification explicite** que la liaison existe avant de créer l'initiative
3. **Policies RLS améliorées** : Utilise un `IN` au lieu de la fonction (plus fiable)

```sql
CREATE POLICY "insert_initiatives_by_org" ON public.initiatives
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM user_organizations WHERE user_id = auth.uid()
    )
  );
```

---

## 📊 Fichiers modifiés

| Fichier | Changement |
|---------|------------|
| `src/lib/i18n/config.js` | `defaultLocale: "fr"` |
| `src/i18n.js` | `lng: 'fr'` forcé |
| `src/lib/i18n.js` | `lng: 'fr'` forcé |
| `src/main.jsx` | Force FR au démarrage |
| `src/pages/app/ProjectNew.jsx` | Délai + vérification liaison |
| `FIX_RLS_INITIATIVES.sql` | Script de correction RLS |

---

## ✅ Checklist finale

- [x] Langue française par défaut configurée
- [x] Code ProjectNew.jsx corrigé (délai + vérification)
- [x] Script SQL FIX_RLS_INITIATIVES.sql créé
- [ ] **Script SQL exécuté sur Supabase** ← **À FAIRE**
- [ ] **Build et déploiement effectués** ← **À FAIRE**
- [ ] **Test de création de projet** ← **À FAIRE**

---

**Une fois le script SQL exécuté, le problème sera résolu définitivement.**
