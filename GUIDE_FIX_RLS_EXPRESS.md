# 🚨 RÉSOLUTION ERREUR RLS - GUIDE EXPRESS

## ❌ Erreur Actuelle
```
Erreur lors de la création
new row violates row-level security policy for table "initiatives"
```

## 🔍 Cause
Les tables `organizations`, `user_organizations` et `initiatives` n'ont pas les bonnes politiques RLS configurées dans Supabase.

---

## ✅ SOLUTION EN 4 ÉTAPES (5 MINUTES)

### ÉTAPE 1️⃣ : Ouvrir le script SQL
Le fichier est déjà ouvert dans VS Code :
```
📁 FIX_RLS_INITIATIVES.sql
```

**Action** : Sélectionnez TOUT le contenu (`Ctrl+A`) et copiez (`Ctrl+C`)

---

### ÉTAPE 2️⃣ : Aller sur Supabase Dashboard

1. **Ouvrez** : https://supabase.com/dashboard
2. **Cliquez** sur votre projet Powalyze
3. **Menu gauche** : Cherchez l'icône **`</>`** (SQL Editor)
4. **Cliquez** : **New Query**

**Screenshot mental** :
```
┌─────────────────────────────────────┐
│ [Supabase Logo]                     │
│ ┌─────────────┐                    │
│ │ Database    │                    │
│ │ Auth        │                    │
│ │ Storage     │                    │
│ │ SQL Editor  │ ← CLIQUEZ ICI      │
│ │ Functions   │                    │
│ └─────────────┘                    │
└─────────────────────────────────────┘
```

---

### ÉTAPE 3️⃣ : Exécuter le script

1. **Collez** le contenu copié (`Ctrl+V`)
2. **Cliquez** le bouton **RUN** (en bas à droite, bouton vert)
3. **Attendez** 2-3 secondes

**Message attendu** :
```
✅ Success. No rows returned
```

**Si erreur** : Vérifiez que vous avez bien copié TOUT le fichier (194 lignes)

---

### ÉTAPE 4️⃣ : Tester la création de projet

1. **Retournez** sur votre application locale
2. **Naviguez** vers `/app/projects/new`
3. **Remplissez** le formulaire :
   - Nom du projet : "Test RLS Fix"
   - Priorité : Moyenne
4. **Cliquez** "Créer le Projet"

**Résultat attendu** :
```
✅ Projet créé avec succès !
Redirection vers votre portefeuille...
```

---

## 📋 Ce que le script fait

Le script SQL va :

1. **Créer 3 tables** si elles n'existent pas :
   - `organizations` (les entreprises/tenants)
   - `user_organizations` (liaison users ↔ organisations)
   - `initiatives` (les projets)

2. **Configurer les politiques RLS** :
   - `SELECT` : Utilisateur peut voir les projets de son organisation
   - `INSERT` : Utilisateur peut créer des projets dans son organisation
   - `UPDATE` : Utilisateur peut modifier les projets de son organisation
   - `DELETE` : Utilisateur peut supprimer les projets de son organisation

3. **Créer des index** pour les performances

---

## 🔐 Vérification Post-Exécution

### Dans Supabase :
1. **Table Editor** → Vérifiez que vous voyez :
   - ✅ `organizations`
   - ✅ `user_organizations`
   - ✅ `initiatives`

2. **Chaque table** doit avoir une icône 🔒 (RLS activé)

### Dans l'application :
1. Créez un projet test
2. Vérifiez qu'il apparaît dans `/app/portfolio`
3. Vérifiez qu'aucune erreur n'apparaît dans la console

---

## ⚠️ Si l'erreur persiste

### Vérification 1 : Tables créées ?
```sql
-- Exécutez dans SQL Editor
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('organizations', 'user_organizations', 'initiatives');
```

**Résultat attendu** : 3 lignes (les 3 tables)

### Vérification 2 : RLS activé ?
```sql
-- Exécutez dans SQL Editor
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('organizations', 'user_organizations', 'initiatives');
```

**Résultat attendu** : `rowsecurity = true` pour les 3 tables

### Vérification 3 : Politiques présentes ?
```sql
-- Exécutez dans SQL Editor
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('organizations', 'user_organizations', 'initiatives');
```

**Résultat attendu** : Plusieurs lignes (4 politiques par table minimum)

---

## 🆘 Encore des erreurs ?

### Si "organization_id cannot be null"
Videz le cache de l'application :
```
1. Ouvrez Console navigateur (F12)
2. Application → Storage → Clear site data
3. Rechargez (Ctrl+Shift+R)
4. Reconnectez-vous
```

### Si "user_id not found in user_organizations"
Supprimez l'utilisateur test et recréez-le :
```sql
-- Dans SQL Editor Supabase
DELETE FROM auth.users WHERE email = 'votre@email.com';
```
Puis créez un nouveau compte dans l'app.

---

## ✅ Checklist Finale

Après exécution du script :
- [ ] Script exécuté sans erreur dans Supabase
- [ ] 3 tables visibles dans Table Editor
- [ ] RLS activé (icône 🔒) sur chaque table
- [ ] Création de projet fonctionne
- [ ] Projet visible dans `/app/portfolio`
- [ ] Aucune erreur dans la console navigateur

---

## 💡 Explication Technique

### Pourquoi l'erreur se produisait ?

```javascript
// Dans ProjectNew.jsx, on fait :
const newInitiative = await initiativeService.createInitiative({
  organization_id: organizationId,  // ← RLS vérifie que vous avez accès
  name: formData.name,
  // ...
});
```

**Sans les politiques RLS** :
- Supabase refuse l'insertion
- Erreur: "violates row-level security policy"

**Avec les politiques RLS** :
- Supabase vérifie : "l'utilisateur est-il dans user_organizations ?"
- Si oui → ✅ Insertion autorisée
- Si non → ❌ Erreur

### Architecture Multi-Tenant

```
User (auth.users)
  ↓ (via user_organizations)
Organization
  ↓ (via organization_id)
Initiative (projet)
```

Chaque utilisateur voit UNIQUEMENT les projets de son organisation.

---

## 🎯 Après la Correction

Vous pourrez :
- ✅ Créer des projets sans erreur
- ✅ Voir vos projets dans le portfolio
- ✅ Modifier vos projets
- ✅ Supprimer vos projets
- ✅ Partager avec d'autres membres de votre organisation

**Temps de résolution estimé** : 5 minutes ⏱️
