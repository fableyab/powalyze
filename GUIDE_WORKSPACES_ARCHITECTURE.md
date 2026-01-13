# 🏗️ ARCHITECTURE WORKSPACES COMPLÈTE - Guide de Déploiement

## 🎯 Vue d'ensemble

Cette architecture remplace le modèle simple `organizations` → `initiatives` par un système multi-niveaux plus robuste :

```
organizations (créées par des users)
    └── workspaces (espaces de travail)
        ├── memberships (qui peut accéder)
        ├── initiatives (projets)
        └── portfolios (regroupements)
```

## ✅ Avantages

| Ancien modèle | Nouveau modèle (Workspaces) |
|---------------|------------------------------|
| ❌ Org = tout ou rien | ✅ Workspaces granulaires |
| ❌ Pas de collaboration fine | ✅ Memberships par workspace |
| ❌ Initiatives liées à org | ✅ Initiatives scoped par workspace |
| ❌ RLS complexe | ✅ RLS via memberships |

## 📋 ÉTAPE 1 : Vérifier le schéma Supabase

Assurez-vous que ces tables existent avec ces colonnes :

### `organizations`
```sql
id              uuid primary key
name            text not null
created_by      uuid not null references auth.users(id)
created_at      timestamptz not null default now()
```

### `workspaces`
```sql
id              uuid primary key
organization_id uuid not null references organizations(id)
name            text not null
owner_id        uuid not null references auth.users(id)
created_by      uuid not null references auth.users(id)
created_at      timestamptz not null default now()
updated_at      timestamptz not null default now()
```

### `memberships`
```sql
id              uuid primary key
workspace_id    uuid not null references workspaces(id)
user_id         uuid not null references auth.users(id)
role            text not null default 'member'
created_at      timestamptz not null default now()

UNIQUE (workspace_id, user_id)
```

### `initiatives`
```sql
id              uuid primary key
workspace_id    uuid not null references workspaces(id)  -- ✅ CLEF
name            text not null
description     text
status          text not null default 'planned'
progress        numeric(5,2) not null default 0
owner_id        uuid references auth.users(id)
created_by      uuid not null references auth.users(id)
start_date      date
end_date        date
created_at      timestamptz not null default now()
```

### `portfolios`
```sql
id              uuid primary key
workspace_id    uuid not null references workspaces(id)  -- ✅ CLEF
name            text not null
description     text
created_by      uuid not null references auth.users(id)
created_at      timestamptz not null default now()
```

## 📋 ÉTAPE 2 : Appliquer la migration SQL

1. Ouvrir **Supabase Dashboard** → SQL Editor
2. Copier le contenu de `MIGRATION_WORKSPACES_COMPLETE_RLS.sql`
3. Exécuter (F5 ou Run)
4. Vérifier les résultats avec les requêtes de vérification (fin du fichier)

**Ce que fait la migration :**
- ✅ Reset TOUTES les policies existantes
- ✅ Active RLS sur 5 tables
- ✅ Crée le trigger global `auto_set_created_by()` (rempli `created_by = auth.uid()`)
- ✅ Applique le trigger sur 4 tables (organizations, workspaces, initiatives, portfolios)
- ✅ Crée 19 policies RLS optimisées

## 📋 ÉTAPE 3 : Intégrer le service JavaScript

Le fichier `src/lib/workspaceService.js` fournit 4 fonctions principales :

### 1. Créer une organisation complète

```javascript
import { createOrganizationWithWorkspaceAndMembership } from '@/lib/workspaceService';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const { user } = useAuth();

const result = await createOrganizationWithWorkspaceAndMembership(
  'Ma Nouvelle Entreprise',
  user.id
);

if (result.success) {
  console.log('Org:', result.organization);
  console.log('Workspace:', result.workspace);
  console.log('Membership:', result.membership);
  // Rediriger vers /app/workspaces/{workspace.id}
}
```

### 2. Récupérer les workspaces d'un utilisateur

```javascript
import { getUserWorkspaces } from '@/lib/workspaceService';

const workspaces = await getUserWorkspaces(user.id);
// Retourne TOUS les workspaces où user est owner OU member
```

### 3. Récupérer les organisations créées

```javascript
import { getUserOrganizations } from '@/lib/workspaceService';

const orgs = await getUserOrganizations(user.id);
// Retourne SEULEMENT les orgs créées par l'utilisateur
```

### 4. Ajouter un membre à un workspace

```javascript
import { addMemberToWorkspace } from '@/lib/workspaceService';

const result = await addMemberToWorkspace(
  workspaceId,
  'collaborateur@example.com',
  'member',  // ou 'admin', 'owner'
  currentUserId
);

if (result.success) {
  console.log('Membre ajouté:', result.membership);
}
```

## 🧪 ÉTAPE 4 : Tests

### Test 1 : Création d'organisation

```javascript
// Doit créer org + workspace + membership sans erreur
const result = await createOrganizationWithWorkspaceAndMembership(
  'Test Org',
  user.id
);

console.assert(result.success === true);
console.assert(result.organization.name === 'Test Org');
console.assert(result.workspace.name.includes('Portefeuille principal'));
console.assert(result.membership.role === 'owner');
```

### Test 2 : Vérifier le trigger auto-fill

```sql
-- Dans Supabase SQL Editor
INSERT INTO organizations (name) VALUES ('Test Sans created_by');

-- Vérifier que created_by est rempli automatiquement
SELECT id, name, created_by,
  (SELECT email FROM auth.users WHERE id = created_by) as creator
FROM organizations
WHERE name = 'Test Sans created_by';

-- created_by doit être votre user ID actuel
```

### Test 3 : RLS Workspaces

```javascript
// User A crée un workspace
const ws1 = await createOrganizationWithWorkspaceAndMembership('Org A', userA.id);

// User B ne doit PAS le voir
const wsB = await getUserWorkspaces(userB.id);
console.assert(!wsB.find(w => w.id === ws1.workspace.id));

// User A ajoute User B au workspace
await addMemberToWorkspace(ws1.workspace.id, userB.email, 'member', userA.id);

// Maintenant User B DOIT le voir
const wsB2 = await getUserWorkspaces(userB.id);
console.assert(wsB2.find(w => w.id === ws1.workspace.id));
```

## 🔐 Sécurité RLS

### Organizations
- **INSERT** : Tout user authentifié (trigger remplit created_by)
- **SELECT** : User voit seulement ses orgs (created_by = auth.uid())
- **UPDATE/DELETE** : Seulement le créateur

### Workspaces
- **INSERT** : Tout user authentifié (trigger remplit created_by)
- **SELECT** : Owner OU membre (via memberships)
- **UPDATE/DELETE** : Seulement l'owner

### Memberships
- **INSERT** : Seulement l'owner du workspace
- **SELECT** : L'user lui-même OU l'owner du workspace
- **DELETE** : Seulement l'owner du workspace

### Initiatives & Portfolios
- **INSERT** : Membres du workspace (via memberships)
- **SELECT** : Membres du workspace
- **UPDATE/DELETE** : Créateur ET membre du workspace

## 🚀 Migration depuis l'ancien modèle

Si vous aviez déjà `organizations` et `initiatives` sans workspaces :

```sql
-- 1. Créer un workspace par défaut pour chaque org
INSERT INTO workspaces (organization_id, name, owner_id, created_by)
SELECT 
  o.id,
  o.name || ' – Workspace par défaut',
  o.created_by,
  o.created_by
FROM organizations o;

-- 2. Créer les memberships pour chaque user_organizations
INSERT INTO memberships (workspace_id, user_id, role)
SELECT 
  w.id,
  uo.user_id,
  CASE 
    WHEN uo.role IN ('admin', 'owner') THEN 'owner'
    ELSE 'member'
  END
FROM user_organizations uo
JOIN organizations o ON o.id = uo.organization_id
JOIN workspaces w ON w.organization_id = o.id;

-- 3. Mettre à jour les initiatives (ajouter workspace_id)
ALTER TABLE initiatives ADD COLUMN workspace_id uuid;

UPDATE initiatives i
SET workspace_id = (
  SELECT w.id
  FROM workspaces w
  WHERE w.organization_id = i.organization_id
  LIMIT 1
);

ALTER TABLE initiatives 
  ALTER COLUMN workspace_id SET NOT NULL,
  ADD CONSTRAINT initiatives_workspace_fk 
    FOREIGN KEY (workspace_id) REFERENCES workspaces(id);
```

## 📊 Vérifications finales

```sql
-- Vérifier les triggers
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_name LIKE '%created_by%';

-- Vérifier les policies
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies
WHERE tablename IN ('organizations', 'workspaces', 'memberships', 'initiatives', 'portfolios')
GROUP BY tablename;

-- Résultat attendu :
-- organizations : 4 policies
-- workspaces    : 4 policies
-- memberships   : 3 policies
-- initiatives   : 4 policies
-- portfolios    : 4 policies
```

## 🆘 Troubleshooting

### Erreur : "new row violates row-level security policy"
**Cause** : Policy trop stricte ou membership manquant  
**Solution** : Vérifier que l'user a un membership dans le workspace

### Erreur : "null value in column created_by violates not-null constraint"
**Cause** : Trigger pas appliqué ou colonne déjà NOT NULL avant migration  
**Solution** : Vérifier que le trigger existe avec :
```sql
SELECT * FROM pg_trigger WHERE tgname LIKE '%created_by%';
```

### User ne voit aucun workspace
**Cause** : Pas de membership créé  
**Solution** :
```sql
-- Vérifier les memberships
SELECT * FROM memberships WHERE user_id = 'USER_ID';

-- Si vide, créer manuellement
INSERT INTO memberships (workspace_id, user_id, role)
VALUES ('WORKSPACE_ID', 'USER_ID', 'owner');
```

## 🎉 Résultat final

✅ **Architecture multi-niveaux robuste**  
✅ **Collaboration granulaire par workspace**  
✅ **RLS sécurisé basé sur memberships**  
✅ **Trigger auto-fill eliminant 100% des erreurs created_by**  
✅ **19 policies RLS optimisées**  
✅ **Service JavaScript complet**

---

**Version** : 3.0 (Workspaces Architecture)  
**Date** : 2026-01-13  
**Statut** : ✅ Production-Ready  
**Breaking Changes** : Oui (migration depuis ancien modèle requise)
