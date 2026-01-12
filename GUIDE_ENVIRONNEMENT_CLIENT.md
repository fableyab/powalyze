# 🔒 Guide: Environnement Client Isolé et Vide

## Problème Actuel
La base de données de production contient des données de test qui polluent l'environnement. Chaque nouveau client doit avoir un environnement **100% vide** lors de son inscription.

---

## ✅ Solution: Nettoyage + Isolation RLS

### Étape 1: Nettoyer la Production

**Ouvrez Supabase SQL Editor** et exécutez:

```bash
Fichier: c:\powalyze\supabase\PRODUCTION-CLEAN-FINAL.sql
```

**Script SQL:**
```sql
-- Désactiver contraintes
SET session_replication_role = replica;

-- Vider TOUTES les tables
DELETE FROM alerts;
DELETE FROM team_invitations;
DELETE FROM team_members;
DELETE FROM documents;
DELETE FROM decisions;
DELETE FROM risks;
DELETE FROM initiatives;
DELETE FROM user_organizations;
DELETE FROM profiles;
DELETE FROM organizations;

-- Réactiver contraintes
SET session_replication_role = DEFAULT;
```

### Étape 2: Vérifier que Tout est Vide

**Exécutez la requête de vérification** (dans le même fichier SQL):

```sql
SELECT 'organizations' as table_name, COUNT(*) as row_count FROM organizations
UNION ALL
SELECT 'profiles', COUNT(*) FROM profiles
UNION ALL
SELECT 'user_organizations', COUNT(*) FROM user_organizations
UNION ALL
SELECT 'initiatives', COUNT(*) FROM initiatives
UNION ALL
SELECT 'risks', COUNT(*) FROM risks
UNION ALL
SELECT 'decisions', COUNT(*) FROM decisions
UNION ALL
SELECT 'documents', COUNT(*) FROM documents
UNION ALL
SELECT 'team_members', COUNT(*) FROM team_members
UNION ALL
SELECT 'team_invitations', COUNT(*) FROM team_invitations
UNION ALL
SELECT 'alerts', COUNT(*) FROM alerts
ORDER BY table_name;
```

**✅ Résultat attendu:** Toutes les tables affichent **0 lignes**

---

## 🛡️ Comment l'Isolation Fonctionne

### Row Level Security (RLS)

Chaque table a des **politiques RLS** qui garantissent l'isolation:

```sql
-- Exemple: Table initiatives
CREATE POLICY "Users can only see their org initiatives"
ON initiatives FOR SELECT
USING (organization_id IN (
  SELECT organization_id 
  FROM user_organizations 
  WHERE user_id = auth.uid()
));
```

### Flux d'Inscription d'un Nouveau Client

1. **Client crée un compte sur `/signup`**
   - Supabase Auth crée `auth.users` automatiquement

2. **Trigger automatique crée l'organisation**
   ```sql
   -- Trigger: on_auth_user_created
   INSERT INTO organizations (name, owner_id)
   VALUES ('Organisation de ' || NEW.email, NEW.id);
   
   INSERT INTO profiles (id, email)
   VALUES (NEW.id, NEW.email);
   
   INSERT INTO user_organizations (user_id, organization_id, role)
   VALUES (NEW.id, new_org_id, 'admin');
   ```

3. **RLS filtre automatiquement les données**
   - Le client ne voit QUE les données de `organization_id` = son organisation
   - Impossible de voir les données d'autres clients

### Schéma d'Isolation

```
Client A (org_id: aaa-111)          Client B (org_id: bbb-222)
├── Initiatives: 5                  ├── Initiatives: 8
├── Risques: 3                      ├── Risques: 12
├── Décisions: 7                    ├── Décisions: 4
└── Documents: 10                   └── Documents: 15

❌ Client A ne peut PAS voir les données de Client B
❌ Client B ne peut PAS voir les données de Client A
✅ Chaque client est dans une "bulle" isolée
```

---

## 📋 Checklist de Validation

Après avoir nettoyé la base de données:

### 1. Vérifier l'Environnement Vide

```bash
# Se connecter sur: https://www.powalyze.com/login
Email: fabrice.fays@outlook.fr
```

**Pages à vérifier:**
- ✅ `/app/dashboard` → Aucun projet
- ✅ `/app/portfolio` → Message "Aucune initiative"
- ✅ `/app/risks` → Liste vide
- ✅ `/app/decisions` → Liste vide
- ✅ `/app/documents` → Aucun document
- ✅ `/app/alerts` → Aucune alerte

### 2. Tester la Création de Contenu

**Créer un projet test:**
1. Aller sur `/app/projects/new`
2. Remplir le formulaire
3. Cliquer "Créer"
4. Vérifier que ça fonctionne sans erreur

**Créer un risque test:**
1. Aller sur `/app/risks/new`
2. Remplir le formulaire
3. Vérifier que ça fonctionne

**Créer une décision test:**
1. Aller sur `/app/decisions/new`
2. Remplir le formulaire
3. Vérifier que ça fonctionne

### 3. Tester l'Isolation Multi-Client (Optionnel)

**Créer un deuxième compte test:**
1. Se déconnecter
2. Aller sur `/signup`
3. S'inscrire avec un nouvel email: `test@example.com`
4. Vérifier que ce nouveau client a un environnement **COMPLÈTEMENT VIDE**
5. Vérifier qu'il ne voit AUCUN des projets créés par fabrice.fays@outlook.fr

---

## 🚨 Problèmes Potentiels

### Erreur: "relation does not exist"

**Cause:** Une table référencée n'existe pas dans votre schéma

**Solution:**
```sql
-- Lister toutes les tables existantes
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
```

Modifiez `PRODUCTION-CLEAN-FINAL.sql` en **retirant** les tables qui n'existent pas.

### Erreur: Foreign Key Constraint

**Cause:** Ordre de suppression incorrect

**Solution:** Le script utilise déjà `session_replication_role = replica` qui désactive les contraintes. Si ça ne marche pas:

```sql
-- Alternative: TRUNCATE avec CASCADE
TRUNCATE TABLE alerts CASCADE;
TRUNCATE TABLE team_invitations CASCADE;
TRUNCATE TABLE team_members CASCADE;
TRUNCATE TABLE documents CASCADE;
TRUNCATE TABLE decisions CASCADE;
TRUNCATE TABLE risks CASCADE;
TRUNCATE TABLE initiatives CASCADE;
TRUNCATE TABLE user_organizations CASCADE;
TRUNCATE TABLE profiles CASCADE;
TRUNCATE TABLE organizations CASCADE;
```

### Les Données ne Disparaissent Pas

**Vérifiez que vous êtes connecté au bon projet Supabase:**
1. Ouvrez Supabase Dashboard
2. Vérifiez le nom du projet en haut à gauche
3. Assurez-vous que c'est le projet de PRODUCTION (celui configuré dans `customSupabaseClient.js`)

---

## 🎯 Résultat Final Attendu

✅ **Base de données complètement vide**  
✅ **Chaque nouveau client a son propre environnement isolé**  
✅ **Aucune donnée de test visible en production**  
✅ **RLS garantit l'isolation automatique**  
✅ **Premier client peut créer projets/risques/décisions sans erreur**

---

## 📞 Prochaines Étapes

1. **Exécutez `PRODUCTION-CLEAN-FINAL.sql`** dans Supabase
2. **Vérifiez que toutes les tables sont à 0 lignes**
3. **Testez la création de contenu** sur https://www.powalyze.com
4. **Confirmez que tout fonctionne** sans données de test

Une fois cette étape terminée, votre SaaS sera prêt pour les vrais clients! 🚀
