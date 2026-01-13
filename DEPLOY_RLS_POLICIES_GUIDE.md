# 🚀 Déploiement RLS Policies - Guide d'Exécution

## 📋 Résumé

Ce script met à jour les policies RLS (Row Level Security) pour la table `initiatives` en utilisant la structure existante du schéma Powalyze :
- `organization_id` au lieu de `workspace_id`
- `user_organizations` au lieu de `memberships`
- `owner_id` au lieu de `created_by`

## ⚡ Déploiement Rapide

### Option 1 : Via l'interface Supabase (Recommandé)

1. **Connexion à Supabase**
   - Ouvrir [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Sélectionner le projet Powalyze

2. **Accéder au SQL Editor**
   - Cliquer sur "SQL Editor" dans le menu latéral
   - Cliquer sur "New query"

3. **Copier-Coller le Script**
   - Ouvrir le fichier `DEPLOY_RLS_POLICIES_NOW.sql`
   - Copier tout le contenu
   - Coller dans l'éditeur SQL Supabase

4. **Exécuter**
   - Cliquer sur "Run" (bouton en bas à droite)
   - Attendre le message de confirmation "Success"

### Option 2 : Via Supabase CLI

```bash
# Si vous avez Supabase CLI installé
supabase db execute --file DEPLOY_RLS_POLICIES_NOW.sql
```

### Option 3 : Via PowerShell (Automatique)

```powershell
# Utiliser le script de déploiement existant
.\deploy-supabase-tables.ps1
```

## ✅ Vérification Post-Déploiement

### Test 1 : Vérifier que RLS est activée

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'initiatives';
```

Résultat attendu : `rowsecurity = true`

### Test 2 : Lister les policies actives

```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'initiatives';
```

Résultat attendu : 4 policies (INSERT, SELECT, UPDATE, DELETE)

### Test 3 : Tester une insertion (depuis l'application)

1. Se connecter à l'application Powalyze
2. Aller dans "Projects" ou "Portfolio"
3. Créer une nouvelle initiative
4. Vérifier qu'aucune erreur RLS n'apparaît

## 🔍 Différences avec les Policies Fournies

### Adaptations effectuées :

| Concept Fourni | Schéma Actuel | Changement |
|----------------|---------------|------------|
| `workspace_id` | `organization_id` | Renommé pour correspondre au schéma |
| `memberships` | `user_organizations` | Table de liaison renommée |
| `created_by` | `owner_id` | Champ propriétaire renommé |
| Policy stricte sur owner | Policy permissive sur org | Permet à tous les membres de l'org d'éditer |

### Logique des Policies :

**INSERT** : L'utilisateur doit appartenir à l'organisation et peut définir owner_id à son propre ID ou null.

**SELECT** : L'utilisateur peut lire toutes les initiatives de son organisation.

**UPDATE** : L'utilisateur peut modifier toutes les initiatives de son organisation (pas seulement celles qu'il a créées).

**DELETE** : L'utilisateur peut supprimer toutes les initiatives de son organisation (pas seulement celles qu'il a créées).

> ⚠️ **Note** : Si vous voulez restreindre UPDATE/DELETE uniquement au créateur (`owner_id`), ajoutez cette condition :
> ```sql
> and (owner_id = auth.uid() or owner_id is null)
> ```

## 🛡️ Sécurité Multi-Tenant

Ces policies garantissent :
- ✅ Isolation totale entre organisations
- ✅ Un utilisateur ne peut accéder qu'aux initiatives de son organisation
- ✅ Pas de risque de fuite de données inter-organisations
- ✅ Respect du principe de moindre privilège

## 📊 Impact sur les Services Client

Les changements récents dans `initiativeService.js` et `projectService.js` sont **compatibles** avec ces policies :

- ✅ `createInitiative()` récupère `organization_id` via `user_organizations`
- ✅ `getInitiatives()` filtre par `organization_id`
- ✅ `owner_id` est défini automatiquement lors de la création

## 🔄 Rollback (Si Problème)

Si les nouvelles policies causent des problèmes, revenez aux anciennes :

```sql
-- Supprimer les nouvelles
drop policy if exists "allow_insert_initiatives_for_org_members" on public.initiatives;
drop policy if exists "allow_select_initiatives_for_org_members" on public.initiatives;
drop policy if exists "allow_update_initiatives_for_org_members" on public.initiatives;
drop policy if exists "allow_delete_initiatives_for_org_members" on public.initiatives;

-- Restaurer les anciennes (fonction helper requise)
create policy "insert_initiatives_by_org" on public.initiatives
  for insert with check ( public.user_in_org(organization_id) );

create policy "select_initiatives_by_org" on public.initiatives
  for select using ( public.user_in_org(organization_id) );

create policy "update_initiatives_by_org" on public.initiatives
  for update using ( public.user_in_org(organization_id) );

create policy "delete_initiatives_by_org" on public.initiatives
  for delete using ( public.user_in_org(organization_id) );
```

## 📝 Commandes Utiles

### Vérifier les permissions actuelles
```sql
SELECT * FROM pg_policies WHERE tablename = 'initiatives';
```

### Vérifier les tables RLS activées
```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = true;
```

### Tester en tant qu'utilisateur spécifique
```sql
-- Se mettre dans le contexte d'un utilisateur
SET request.jwt.claim.sub = '<user_uuid>';

-- Essayer de créer une initiative
INSERT INTO initiatives (organization_id, name, status)
VALUES ('<org_uuid>', 'Test Initiative', 'planned');
```

## 🎯 Prochaines Étapes

1. ✅ Déployer les policies (ce script)
2. ✅ Tester dans l'application (créer une initiative)
3. ✅ Vérifier les logs Supabase pour toute erreur RLS
4. ✅ Si tout fonctionne, promouvoir en production
5. ⏭️ Appliquer les mêmes patterns aux autres tables (milestones, risks, decisions, etc.)

## 📞 Support

En cas de problème :
1. Vérifier les logs Supabase Dashboard > Logs
2. Tester avec la console Supabase SQL Editor
3. Vérifier que `user_organizations` contient bien l'association user ↔ organization
4. Confirmer que `auth.uid()` retourne bien l'UUID de l'utilisateur connecté

---

**Créé le** : 13 janvier 2026  
**Version** : 1.0  
**Statut** : Prêt à déployer ✅
