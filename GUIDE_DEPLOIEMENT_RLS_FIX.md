# 🚀 GUIDE DE DÉPLOIEMENT - Correction RLS Organizations

## ⚠️ PROBLÈME IDENTIFIÉ

La table `organizations` n'avait **PAS** de colonne `created_by`, ce qui empêchait les policies RLS de fonctionner correctement lors des INSERT.

## ✅ SOLUTIONS APPLIQUÉES

### 1. Schéma SQL Corrigé
- ✅ Ajout colonne `created_by uuid not null references auth.users(id)`
- ✅ Index créé : `organizations_created_by_idx`
- ✅ Policies RLS complètes ajoutées

### 2. Services JavaScript Corrigés
- ✅ `src/lib/organizationService.js` : Ajout de `created_by: userId` dans l'INSERT
- ✅ `src/lib/organizationServiceSimple.js` : Ajout de `created_by: userId` dans l'INSERT

## 📋 ÉTAPES DE DÉPLOIEMENT

### Étape 1 : Appliquer la migration SQL sur Supabase

1. Ouvrir **Supabase Dashboard** → SQL Editor
2. Copier et exécuter le fichier : `MIGRATION_ADD_CREATED_BY_TO_ORGANIZATIONS.sql`
3. Vérifier les résultats avec les requêtes de vérification (à la fin du fichier)

**Ce que fait la migration :**
- Ajoute la colonne `created_by` (nullable temporairement)
- Migre les données existantes (associe le premier admin comme créateur)
- Rend la colonne `NOT NULL` après migration
- Crée les policies RLS correctes
- Active RLS sur la table

### Étape 2 : Déployer le code frontend

```powershell
# Commit des changements
git add -A
git commit -m "fix(rls): Ajouter created_by à organizations + policies RLS"
git push origin main

# Déployer sur Vercel
npm run deploy:prod -- --force
```

## 🧪 TESTS À EFFECTUER

### Test 1 : Création d'organisation
```javascript
// Doit fonctionner maintenant
const { data, error } = await supabase
  .from("organizations")
  .insert({
    name: "Test Org",
    created_by: user.id  // ✅ OBLIGATOIRE
  });

console.log(data); // Doit retourner l'org créée
console.log(error); // Doit être null
```

### Test 2 : Lecture des organisations
```javascript
// L'utilisateur doit voir :
// - Les orgs qu'il a créées (created_by = son ID)
// - Les orgs dont il est membre (via user_organizations)

const { data: myOrgs, error } = await supabase
  .from("organizations")
  .select("*");

console.log(myOrgs); // Doit retourner les orgs accessibles
```

### Test 3 : Vérification RLS

Dans Supabase Dashboard → SQL Editor :

```sql
-- Vérifier que toutes les orgs ont un créateur
SELECT 
  id, 
  name, 
  created_by,
  (SELECT email FROM auth.users WHERE id = created_by) as creator_email
FROM organizations;

-- Doit retourner 0
SELECT COUNT(*) FROM organizations WHERE created_by IS NULL;
```

## 🎯 RÉSULTATS ATTENDUS

✅ **Avant** : INSERT échouait car `created_by` manquait  
✅ **Après** : INSERT fonctionne avec `created_by: userId`  

✅ **Avant** : Pas de policies sur organizations  
✅ **Après** : 4 policies (SELECT, INSERT, UPDATE, DELETE)  

✅ **Avant** : Utilisateurs ne voyaient aucune org  
✅ **Après** : Utilisateurs voient leurs orgs + orgs dont ils sont membres  

## 📝 FICHIERS MODIFIÉS

1. `MIGRATION_ADD_CREATED_BY_TO_ORGANIZATIONS.sql` (nouveau)
2. `SUPABASE_SCHEMA_COMPLETE.sql` (mis à jour)
3. `src/lib/organizationService.js` (ajout `created_by: userId`)
4. `src/lib/organizationServiceSimple.js` (ajout `created_by: userId`)

## ⚡ COMMANDES RAPIDES

```powershell
# Déploiement complet
git add -A && git commit -m "fix(rls): Organizations created_by + policies" && git push origin main && npm run deploy:prod -- --force
```

## 🆘 TROUBLESHOOTING

### Erreur : "null value in column created_by violates not-null constraint"
**Cause** : Insertion sans `created_by`  
**Solution** : Vérifier que TOUS les services font `created_by: user.id`

### Erreur : "new row violates row-level security policy"
**Cause** : Policy RLS trop stricte  
**Solution** : Vérifier que la policy INSERT autorise `created_by = auth.uid()`

### Utilisateur ne voit aucune organisation
**Cause** : Policy SELECT trop stricte ou user_organizations manquant  
**Solution** : 
1. Vérifier que user_organizations contient le lien user ↔ org
2. Vérifier que created_by correspond à l'utilisateur OU qu'il est membre

## 🎉 VALIDATION FINALE

```sql
-- Toutes les requêtes suivantes doivent réussir

-- 1. Vérifier la structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'organizations' 
ORDER BY ordinal_position;

-- 2. Vérifier les policies
SELECT schemaname, tablename, policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'organizations';

-- 3. Vérifier les données
SELECT COUNT(*) as total, 
       COUNT(created_by) as with_creator 
FROM organizations;
```

## 📚 RÉFÉRENCES

- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Policies](https://www.postgresql.org/docs/current/sql-createpolicy.html)

---

**Date de création** : 2026-01-13  
**Auteur** : GitHub Copilot  
**Statut** : ✅ Prêt à déployer
