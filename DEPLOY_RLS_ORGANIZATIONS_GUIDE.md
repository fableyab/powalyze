# 🚀 Déploiement RLS Organizations - Guide

## 📋 Résumé

Ce script configure les policies RLS pour la table `organizations` en tenant compte de la structure **SANS** colonne `owner_id` ou `created_by`.

La propriété des organisations est gérée via la table `user_organizations` avec le champ `role`.

## ⚡ Déploiement Rapide

### Option 1 : Interface Supabase (Recommandé)

1. **Connexion**
   - Ouvrir [Supabase Dashboard](https://supabase.com/dashboard)
   - Sélectionner le projet Powalyze

2. **SQL Editor**
   - Menu → **SQL Editor**
   - Cliquer **"New query"**

3. **Exécuter**
   - Copier tout le contenu de [DEPLOY_RLS_ORGANIZATIONS.sql](DEPLOY_RLS_ORGANIZATIONS.sql)
   - Coller dans l'éditeur
   - Cliquer **"Run"**
   - Attendre "Success"

### Option 2 : Supabase CLI

```bash
supabase db execute --file DEPLOY_RLS_ORGANIZATIONS.sql
```

## 🏗️ Architecture de la table organizations

### Structure actuelle (SANS owner_id)

```sql
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);
```

**⚠️ IMPORTANT** : Contrairement à d'autres tables, `organizations` n'a **PAS** de colonne `owner_id` ou `created_by`.

### Relation propriétaire via user_organizations

```sql
create table public.user_organizations (
  user_id uuid not null references auth.users(id),
  organization_id uuid not null references public.organizations(id),
  role text not null default 'member',  -- 'admin' ou 'member'
  created_at timestamptz not null default now(),
  primary key (user_id, organization_id)
);
```

## 🔐 Policies RLS

### 1. INSERT - Création libre
```sql
-- Tout utilisateur authentifié peut créer une organisation
with check (true)
```

**Pourquoi ?** Pas de colonne `owner_id` dans organizations. Le lien propriétaire est créé ensuite dans `user_organizations`.

### 2. SELECT - Lecture filtrée
```sql
-- Lire uniquement les organisations où l'utilisateur est membre
using (
  id in (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid()
  )
)
```

### 3. UPDATE - Modification admin uniquement
```sql
-- Modifier uniquement si l'utilisateur est admin
using (
  id in (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid() and role = 'admin'
  )
)
```

### 4. DELETE - Suppression admin uniquement
```sql
-- Supprimer uniquement si l'utilisateur est admin
using (
  id in (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid() and role = 'admin'
  )
)
```

## 💻 Code client (organizationService.js)

### Création d'organisation correcte

```javascript
// 1. Créer l'organisation (PAS de owner_id)
const { data: newOrg, error: createOrgError } = await supabase
  .from('organizations')
  .insert([{ 
    name: orgName
  }])
  .select()
  .single();

// 2. Lier l'utilisateur avec role admin
const { error: linkError } = await supabase
  .from('user_organizations')
  .insert([{
    user_id: user.id,
    organization_id: newOrg.id,
    role: 'admin'  // Important: définir comme admin
  }]);
```

### ✅ Code actuel aligné

Le fichier `src/lib/organizationService.js` est **déjà correct** :
- Ligne 35-39 : INSERT sans `owner_id`
- Ligne 52-56 : INSERT dans `user_organizations` avec `role: 'admin'`

## ✅ Vérifications post-déploiement

### Test 1 : Vérifier RLS activée
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'organizations';
```
Résultat attendu : `rowsecurity = true`

### Test 2 : Lister les policies
```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'organizations';
```
Résultat attendu : 4 policies (INSERT, SELECT, UPDATE, DELETE)

### Test 3 : Créer une organisation depuis l'app
1. Se connecter à l'application
2. Le système devrait créer automatiquement une organisation
3. Vérifier dans Supabase :
   - Table `organizations` : nouvelle entrée
   - Table `user_organizations` : lien avec `role = 'admin'`

## 🔄 Différence avec les policies initiatives

| Table | Colonne propriétaire | Policy INSERT |
|-------|---------------------|---------------|
| `initiatives` | `owner_id` (existe) | Vérifie `owner_id = auth.uid()` |
| `organizations` | **AUCUNE** | `with check (true)` |

**Raison** : Pour `organizations`, la propriété est gérée **après** l'insertion via `user_organizations`.

## 🛡️ Sécurité multi-tenant

Avec ces policies :
- ✅ Création libre (mais lien requis dans user_organizations)
- ✅ Lecture limitée aux organisations de l'utilisateur
- ✅ Modification/suppression limitée aux admins
- ✅ Isolation totale entre organisations
- ✅ Pas de risque d'accès croisé

## 🔄 Rollback (Si problème)

```sql
-- Désactiver RLS temporairement
alter table public.organizations disable row level security;

-- Ou supprimer les policies
drop policy if exists "allow insert organizations" on public.organizations;
drop policy if exists "allow select organizations" on public.organizations;
drop policy if exists "allow update organizations" on public.organizations;
drop policy if exists "allow delete organizations" on public.organizations;
```

## 📞 Support

En cas de problème :
1. Vérifier les logs Supabase Dashboard > Logs
2. Confirmer que `user_organizations` contient bien l'association
3. Vérifier que le `role` est défini (`'admin'` ou `'member'`)
4. Tester avec la console SQL Supabase

---

**Créé le** : 13 janvier 2026  
**Version** : 1.0  
**Statut** : Prêt à déployer ✅  
**Compatible avec** : DEPLOY_RLS_POLICIES_NOW.sql (initiatives)
