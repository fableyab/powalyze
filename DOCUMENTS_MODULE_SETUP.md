# 📄 Configuration du Module Documents

## ✅ 1. Vérifier l'état actuel

### Base de données
```bash
# La table 'documents' existe déjà dans schema.sql
# Colonnes actuelles: id, tenant_id, project_id, name, category, storage_path, version, uploaded_by, created_at, metadata
```

### Migration nécessaire
```bash
# Appliquer la migration pour ajouter les colonnes manquantes
supabase/migrations/20260108_documents_module.sql
```

## 🔧 2. Configuration Supabase (OBLIGATOIRE)

### A. Créer le bucket Storage

1. Aller sur **Supabase Dashboard** → **Storage**
2. Cliquer sur **New bucket**
3. Configurer:
   - **Name**: `documents`
   - **Public bucket**: ❌ **NO** (privé avec RLS)
   - **File size limit**: `52428800` (50 MB)
   - **Allowed MIME types**: `application/pdf,image/*,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/csv,text/plain`

### B. Appliquer les Storage Policies

Aller sur **Storage** → bucket `documents` → **Policies** → **New policy**

#### Policy 1: SELECT (Read)
```sql
CREATE POLICY "Users can read their own documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Policy 2: INSERT (Upload)
```sql
CREATE POLICY "Users can upload to their own folder"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Policy 3: DELETE
```sql
CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Policy 4: UPDATE
```sql
CREATE POLICY "Users can update their own documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

### C. Appliquer la migration SQL

Aller sur **SQL Editor** → Coller le contenu de `supabase/migrations/20260108_documents_module.sql`

Cette migration ajoute:
- ✅ Colonnes `file_type`, `file_size`, `user_id`, `file_path`
- ✅ RLS policies pour la table `documents`
- ✅ Trigger automatique pour synchroniser `user_id` ↔ `uploaded_by`
- ✅ Index sur `user_id` pour performances

## 🧪 3. Tester localement

### Démarrer le dev server
```bash
npm run dev
# → http://localhost:5173
```

### Naviguer vers Documents
```
http://localhost:5173/app/documents
```

### Tests à effectuer

#### ✅ Test 1: Upload
1. Glisser-déposer un **PDF** (< 50 MB)
2. Vérifier: Fichier apparaît dans la liste
3. Vérifier dans **Supabase Storage**: `documents/[user-id]/[timestamp]-filename.pdf`

#### ✅ Test 2: Preview PDF
1. Cliquer sur **Preview** d'un PDF
2. Vérifier: Modal s'ouvre avec iframe affichant le PDF
3. Vérifier: Bouton **Download** fonctionne

#### ✅ Test 3: Preview Image
1. Upload une **image JPG/PNG**
2. Cliquer sur **Preview**
3. Vérifier: Image s'affiche dans le modal

#### ✅ Test 4: Download
1. Cliquer sur **Download** d'un document
2. Vérifier: Fichier téléchargé avec le bon nom

#### ✅ Test 5: Delete
1. Cliquer sur **Delete** d'un document
2. Vérifier: Popup de confirmation
3. Confirmer
4. Vérifier: Document supprimé de la liste
5. Vérifier dans **Supabase Storage**: Fichier supprimé

#### ✅ Test 6: Search
1. Upload plusieurs documents
2. Taper un nom dans la barre de recherche
3. Vérifier: Seuls les documents correspondants s'affichent

#### ✅ Test 7: Filters
1. Cliquer sur **PDF**
2. Vérifier: Seuls les PDFs s'affichent
3. Cliquer sur **Images**
4. Vérifier: Seules les images s'affichent

#### ✅ Test 8: Stats Cards
1. Vérifier **Total documents**: Nombre correct
2. Vérifier **Espace utilisé**: Taille en MB
3. Vérifier **Ce mois-ci**: Documents uploadés ce mois

## 🔐 4. Sécurité Multi-tenant

### Architecture
```
Storage Path: documents/{user-id}/{timestamp}-{filename}
                           ^^^^^^^^
                           Isolation automatique par user
```

### RLS Policies actives
- ✅ **SELECT**: User peut lire SEULEMENT ses propres documents
- ✅ **INSERT**: User peut uploader SEULEMENT dans son dossier `{user-id}/`
- ✅ **DELETE**: User peut supprimer SEULEMENT ses propres documents
- ✅ **Tenant-level**: Policies tenant_id pour compatibilité multi-tenant

### Vérification
```sql
-- Dans Supabase SQL Editor
SELECT 
  id, 
  name, 
  user_id, 
  file_path, 
  file_size 
FROM public.documents 
WHERE user_id = auth.uid();
-- Doit retourner SEULEMENT les documents de l'utilisateur connecté
```

## 📦 5. Build & Deploy

### Build de production
```bash
npm run build
# ✅ Vérifier: dist/assets/Documents-[hash].js généré
```

### Deploy Vercel
```bash
vercel --prod
```

### Variables d'environnement Vercel
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🎯 6. Checklist finale

- [ ] Bucket `documents` créé dans Supabase Storage
- [ ] 4 Storage Policies créées (SELECT, INSERT, DELETE, UPDATE)
- [ ] Migration SQL appliquée (colonnes + RLS + trigger)
- [ ] Test local réussi (upload, preview, download, delete)
- [ ] Search et filters fonctionnels
- [ ] Stats cards affichent les bonnes valeurs
- [ ] Build réussi sans erreurs
- [ ] Déployé sur Vercel
- [ ] Test en production avec utilisateur réel

## 📊 Fichiers créés

### Composants
- ✅ `src/components/documents/UploadBox.jsx` (213 lignes)
- ✅ `src/components/documents/DocumentsList.jsx` (203 lignes)
- ✅ `src/components/documents/DocumentPreview.jsx` (183 lignes)

### Pages
- ✅ `src/pages/Documents.jsx` (191 lignes)

### Migration
- ✅ `supabase/migrations/20260108_documents_module.sql`

### Documentation
- ✅ `DOCUMENTS_MODULE_SETUP.md` (ce fichier)

## 🚀 Prochaines étapes

1. **Configurer Supabase** (bucket + policies + migration)
2. **Tester localement** (`npm run dev`)
3. **Build** (`npm run build`)
4. **Deploy** (`vercel --prod`)
5. **Test production** avec utilisateur réel

## 🆘 Troubleshooting

### Erreur: "Failed to upload file"
- ✅ Vérifier: Bucket `documents` existe
- ✅ Vérifier: Storage policies appliquées
- ✅ Vérifier: User connecté (auth.uid() valide)

### Erreur: "Permission denied"
- ✅ Vérifier: RLS policies sur table `documents`
- ✅ Vérifier: Storage policies sur bucket `documents`
- ✅ Vérifier: `user_id` correspond à `auth.uid()`

### Preview ne fonctionne pas
- ✅ Vérifier: Signed URL générée correctement
- ✅ Vérifier: Storage policy SELECT active
- ✅ Vérifier: Fichier existe dans Storage

### Delete ne fonctionne pas
- ✅ Vérifier: `doc.user_id === user.id` dans le code
- ✅ Vérifier: Storage policy DELETE active
- ✅ Vérifier: RLS policy documents_delete_user active

---

**🎉 Module Documents complet et prêt à l'emploi!**
