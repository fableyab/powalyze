# 🚨 GUIDE DÉPLOIEMENT SUPABASE - URGENT

## Problème
**Erreur**: `Could not find the table 'public.organizations' in the schema cache`

**Cause**: Les tables ne sont PAS créées dans votre base Supabase !

---

## ✅ SOLUTION EN 3 ÉTAPES

### ÉTAPE 1 : Ouvrir Supabase SQL Editor

1. Allez sur **https://supabase.com/dashboard**
2. Sélectionnez votre projet **Powalyze**
3. Dans le menu de gauche, cliquez sur **"SQL Editor"** (icône ⚡)

### ÉTAPE 2 : Exécuter le script SQL

1. Cliquez sur **"New query"** (nouveau bouton en haut)
2. Ouvrez le fichier **`SUPABASE_TABLES_ESSENTIELLES.sql`** (dans votre projet)
3. **COPIEZ TOUT LE CONTENU** du fichier
4. **COLLEZ** dans l'éditeur SQL de Supabase
5. Cliquez sur **"RUN"** (ou Ctrl+Enter)

### ÉTAPE 3 : Vérifier que tout est créé

Dans le SQL Editor, exécutez cette requête :

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

**Vous devez voir ces tables** :
- ✅ `organizations`
- ✅ `user_organizations`
- ✅ `initiatives`
- ✅ `risks`
- ✅ `decisions`
- ✅ `alerts`

---

## 🎯 QUE FAIT CE SCRIPT ?

### Tables créées

1. **organizations** — Base multi-tenant (chaque client a son organisation)
2. **user_organizations** — Lien users ↔ organisations (avec rôles admin/member)
3. **initiatives** — Projets/portfolios avec budget, priorité, dates
4. **risks** — Risques liés aux projets (probabilité × impact)
5. **decisions** — Décisions stratégiques avec urgence
6. **alerts** — Alertes automatiques (budget, risques critiques, etc.)

### Sécurité configurée

- ✅ **Row Level Security (RLS)** activée sur toutes les tables
- ✅ **Policies** : Chaque user ne voit QUE les données de son organisation
- ✅ **Fonction helper** : `user_in_org(org_id)` pour vérifier l'appartenance
- ✅ **Auto-création** : Tout user peut créer une organisation
- ✅ **Cascade delete** : Si organisation supprimée → tout est supprimé

### Index créés

- `initiatives_org_idx` — Performance requêtes par organisation
- `initiatives_status_idx` — Filtrage par statut
- `risks_initiative_idx` — Risques par projet
- `decisions_org_idx` — Décisions par organisation
- `alerts_org_idx` — Alertes par organisation

---

## 🔐 PERMISSIONS PAR RÔLE

### Admin d'une organisation
- ✅ Voir, créer, modifier, supprimer projets
- ✅ Voir, créer, modifier, supprimer risques
- ✅ Voir, créer, modifier, supprimer décisions
- ✅ Inviter d'autres users dans l'organisation
- ✅ Modifier le nom de l'organisation

### Member d'une organisation
- ✅ Voir projets, risques, décisions de son organisation
- ✅ Créer projets, risques, décisions
- ✅ Modifier ses propres créations

---

## 🚀 APRÈS L'EXÉCUTION DU SCRIPT

### Test immédiat

1. **Rechargez** votre app (www.powalyze.com)
2. **Connectez-vous** (ou créez un compte)
3. Allez sur **`/app/projects/new`**
4. **Créez un projet** — Aucune erreur ! ✅

### Ce qui se passe en coulisses

```javascript
// 1. organizationService détecte que user n'a pas d'org
console.log("⚠️ Aucune organisation trouvée - création automatique");

// 2. Crée automatiquement une organisation
INSERT INTO organizations (name) 
VALUES ('Organisation fabrice'); // Depuis email

// 3. Lie le user à l'org comme admin
INSERT INTO user_organizations (user_id, organization_id, role)
VALUES (user_id, new_org_id, 'admin');

// 4. Retourne l'organization_id
console.log("✅ Organisation créée:", new_org_id);

// 5. Crée le projet
INSERT INTO initiatives (organization_id, name, ...)
VALUES (new_org_id, 'Mon Projet', ...);
```

---

## 📊 VÉRIFICATION DES DONNÉES

### Voir les organisations créées

```sql
SELECT * FROM organizations ORDER BY created_at DESC;
```

### Voir les liens user ↔ org

```sql
SELECT 
  uo.user_id,
  u.email,
  o.name AS organization_name,
  uo.role
FROM user_organizations uo
JOIN organizations o ON o.id = uo.organization_id
JOIN auth.users u ON u.id = uo.user_id;
```

### Voir les projets par organisation

```sql
SELECT 
  o.name AS organization,
  i.name AS project,
  i.status,
  i.progress,
  i.created_at
FROM initiatives i
JOIN organizations o ON o.id = i.organization_id
ORDER BY i.created_at DESC;
```

---

## 🐛 DÉPANNAGE

### Erreur : "relation already exists"
✅ **NORMAL** — Tables déjà créées, pas d'action requise

### Erreur : "permission denied"
❌ **Vérifiez** que vous êtes connecté comme owner du projet Supabase

### Erreur : "function user_in_org does not exist"
❌ **Ré-exécutez** le script complet (partie "CREATE OR REPLACE FUNCTION")

### Projets ne s'affichent pas
1. Vérifiez RLS : `SELECT * FROM user_organizations WHERE user_id = auth.uid();`
2. Si vide → organizationService n'a pas créé l'org automatiquement
3. Créez manuellement :
   ```sql
   INSERT INTO organizations (name) VALUES ('Mon Organisation');
   INSERT INTO user_organizations (user_id, organization_id, role)
   VALUES (auth.uid(), 'votre-org-id', 'admin');
   ```

---

## 📝 NOTES IMPORTANTES

### Multi-tenancy strict
- Chaque organisation est **COMPLÈTEMENT ISOLÉE**
- Un user peut appartenir à **plusieurs organisations** (avec rôles différents)
- Les RLS policies garantissent que **personne ne voit les données des autres**

### Auto-provisioning
- Premier accès → organisation créée automatiquement
- Nom généré : `Organisation {prénom_email}` (ex: "Organisation fabrice")
- Rôle : Automatiquement **admin** de sa propre organisation

### Performance
- Index sur **organization_id** partout → requêtes ultra-rapides
- Cascade delete → pas de données orphelines
- Policies optimisées → pas de scan complet de table

---

## ✅ CHECKLIST FINALE

- [ ] Script SQL exécuté dans Supabase SQL Editor
- [ ] 6 tables créées (organizations, user_organizations, initiatives, risks, decisions, alerts)
- [ ] RLS activée sur toutes les tables
- [ ] Function `user_in_org()` créée
- [ ] Policies créées (4 par table minimum)
- [ ] Index créés
- [ ] Test création projet → ✅ Succès
- [ ] Test affichage projets → ✅ Succès
- [ ] Test cockpit → ✅ 14 KPIs affichés

---

## 🎉 RÉSULTAT ATTENDU

Après exécution du script :

```
🚀 Début création projet pour user: abc-123
⚠️ Aucune organisation trouvée - création automatique
✅ Organisation créée: def-456
✅ Utilisateur lié à l'organisation
✅ Organization ID obtenu: def-456
✅ Projet créé avec succès !
```

**Plus AUCUNE erreur "Organisation non trouvée" !**

---

## 📞 SUPPORT

Si problème persiste après exécution du script :

1. **Vérifiez les logs** :
   - Console navigateur (F12)
   - Supabase Dashboard → Logs → API

2. **Vérifiez les tables** :
   ```sql
   SELECT COUNT(*) FROM organizations;
   SELECT COUNT(*) FROM user_organizations;
   SELECT COUNT(*) FROM initiatives;
   ```

3. **Testez RLS** :
   ```sql
   SELECT * FROM organizations; -- Doit retourner seulement vos orgs
   ```

4. **Testez auto-creation** :
   - Créez un NOUVEAU compte
   - Naviguez vers `/app/projects/new`
   - Observez console : Doit voir "✅ Organisation créée"

---

**Date**: 11 janvier 2026  
**Version**: Powalyze v1.1.0  
**Script**: SUPABASE_TABLES_ESSENTIELLES.sql
