# 🔍 DIAGNOSTIC D'ERREUR D'UPLOAD - MODULE DOCUMENTS

## ✅ Corrections déployées

### 1. Gestion d'erreur améliorée
Le code affiche maintenant des messages d'erreur détaillés :
- ❌ Si le bucket 'documents' n'existe pas → Message clair avec instructions
- ❌ Si les Storage policies manquent → Référence à la documentation
- ❌ Si une colonne SQL manque → Référence à la migration
- ❌ Si le fichier existe déjà → Notification de doublon

### 2. Filtre user_id corrigé
[Documents.jsx](src/pages/Documents.jsx) filtre maintenant correctement par `user_id` pour ne charger que les documents de l'utilisateur connecté.

---

## 🧪 DIAGNOSTIC EN 3 ÉTAPES

### Étape 1 : Exécuter le script de diagnostic SQL

1. **Aller sur** : https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/sql/new

2. **Copier-coller** : [supabase/diagnostic_documents.sql](supabase/diagnostic_documents.sql)

3. **Exécuter** → Le script affichera :
   - ✅ ou ❌ pour chaque composant (bucket, policies, colonnes, RLS)
   - Liste des actions à faire si problèmes détectés

### Étape 2 : Interpréter les résultats

#### Si "❌ CRÉER LE BUCKET"
```
Action : Créer le bucket 'documents'
URL : https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/storage/buckets
1. Cliquer : "New bucket"
2. Name : documents
3. Public : NO
4. File size limit : 52428800 (50 MB)
5. Save
```

#### Si "❌ CONFIGURER LES STORAGE POLICIES"
```
Action : Appliquer les 4 Storage Policies
Référence : DOCUMENTS_MODULE_SETUP.md section "Configuration Supabase > B. Appliquer les Storage Policies"
```

#### Si "❌ APPLIQUER LA MIGRATION SQL"
```
Action : Exécuter la migration
URL : https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/sql/new
1. Copier : supabase/migrations/20260108_documents_module.sql
2. Coller dans SQL Editor
3. Exécuter (Run)
```

### Étape 3 : Tester l'upload

1. **Aller sur** : https://www.powalyze.com/app/documents
2. **Glisser-déposer** un PDF (< 50 MB)
3. **Observer** :
   - Si succès : Toast vert "✅ Document ajouté"
   - Si erreur : Toast rouge avec message détaillé

---

## 📋 CHECKLIST DE RÉSOLUTION

Cocher chaque étape après validation :

- [ ] **Bucket créé**
  - Vérifier : https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/storage/buckets
  - Nom : `documents`
  - Public : NO
  - Limit : 50 MB

- [ ] **Migration SQL appliquée**
  - Script : [20260108_documents_module.sql](supabase/migrations/20260108_documents_module.sql)
  - Vérifier : Exécuter diagnostic SQL → "✅ Migration OK"

- [ ] **Storage Policies configurées**
  - 4 policies requises : SELECT, INSERT, DELETE, UPDATE
  - Vérifier : Dashboard → Storage → documents → Policies → 4 policies visibles

- [ ] **RLS activé sur table documents**
  - Vérifier : Diagnostic SQL → "rls_enabled: true"

- [ ] **Test upload réussi**
  - Upload d'un PDF → ✅ Succès
  - Document visible dans la liste
  - Preview fonctionne
  - Download fonctionne

---

## 🆘 MESSAGES D'ERREUR COMMUNS

### Erreur : "The resource was not found"
**Cause** : Bucket 'documents' n'existe pas  
**Solution** : Créer le bucket (voir Étape 1)

### Erreur : "new row violates row-level security policy"
**Cause** : RLS policies mal configurées  
**Solution** : Vérifier les policies avec diagnostic SQL

### Erreur : "null value in column 'tenant_id' violates not-null constraint"
**Cause** : Migration SQL pas appliquée (colonne `tenant_id` toujours NOT NULL)  
**Solution** : Appliquer [20260108_documents_module.sql](supabase/migrations/20260108_documents_module.sql)

### Erreur : "Access denied"
**Cause** : Storage policies manquantes  
**Solution** : Configurer les 4 Storage Policies (voir [DOCUMENTS_MODULE_SETUP.md](DOCUMENTS_MODULE_SETUP.md))

---

## 🎯 RACCOURCI : Configuration complète en 5 min

```bash
# 1. Créer le bucket (Dashboard)
https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/storage/buckets
→ New bucket → Name: documents, Public: NO, Limit: 50MB

# 2. Appliquer la migration (SQL Editor)
https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/sql/new
→ Copier/Coller: supabase/migrations/20260108_documents_module.sql → Run

# 3. Vérifier (Diagnostic)
https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/sql/new
→ Copier/Coller: supabase/diagnostic_documents.sql → Run
→ Vérifier: Tous les ✅

# 4. Tester
https://www.powalyze.com/app/documents
→ Upload un PDF → ✅ Succès
```

---

## 📚 Fichiers de référence

- **Migration SQL** : [supabase/migrations/20260108_documents_module.sql](supabase/migrations/20260108_documents_module.sql)
- **Diagnostic SQL** : [supabase/diagnostic_documents.sql](supabase/diagnostic_documents.sql)
- **Guide complet** : [DOCUMENTS_MODULE_SETUP.md](DOCUMENTS_MODULE_SETUP.md)
- **UploadBox corrigé** : [src/components/documents/UploadBox.jsx](src/components/documents/UploadBox.jsx)
- **Documents page** : [src/pages/Documents.jsx](src/pages/Documents.jsx)

---

## ✅ Déploiement

- **Build** : 14.02s ✅
- **Deploy** : https://www.powalyze.com ✅
- **Fichier Documents** : `Documents-a63fcfb3.js` (30.12 KB)
- **Gestion d'erreur** : Messages détaillés activés ✅

---

**Date** : 2026-01-08  
**Status** : 🟡 Configuration Supabase requise (voir Étape 1)
