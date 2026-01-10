# 🔧 Instructions SQL - Migration Documents Module

## ⚠️ IMPORTANT

**À exécuter dans Supabase SQL Editor** avant de tester le module Documents.

## 🗃️ Option 1 : Migration complète (recommandée)

Cette option **supprime** l'ancienne table et crée la nouvelle avec le bon schéma.

```sql
-- ⭐ Supprimer l'ancienne table si elle existe
DROP TABLE IF EXISTS documents CASCADE;

-- ⭐ Créer la nouvelle table
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id uuid NULL,
  name text NOT NULL,
  path text NOT NULL,
  theme text NOT NULL,
  type text NULL,
  tags text NULL,
  version integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone DEFAULT now()
);

-- ⭐ Index pour accélérer les filtres
CREATE INDEX documents_user_id_idx ON documents(user_id);
CREATE INDEX documents_theme_idx ON documents(theme);
CREATE INDEX documents_type_idx ON documents(type);

-- ⭐ Activer RLS (Row Level Security)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- ⭐ Politique : lecture
CREATE POLICY "Users can read their own documents"
ON documents FOR SELECT
USING (auth.uid() = user_id);

-- ⭐ Politique : insertion
CREATE POLICY "Users can insert their own documents"
ON documents FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ⭐ Politique : suppression
CREATE POLICY "Users can delete their own documents"
ON documents FOR DELETE
USING (auth.uid() = user_id);

-- ⭐ Politique : mise à jour
CREATE POLICY "Users can update their own documents"
ON documents FOR UPDATE
USING (auth.uid() = user_id);
```

---

## 🗃️ Option 2 : Migration incrémentale (si vous avez des données à conserver)

Cette option **modifie** la table existante en ajoutant les nouvelles colonnes.

```sql
-- ⚠️ Attention : cela va conserver vos documents existants

-- Ajouter les nouvelles colonnes
ALTER TABLE documents ADD COLUMN IF NOT EXISTS project_id uuid;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS type text;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS tags text;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS version integer DEFAULT 1;

-- Renommer les colonnes si nécessaire
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name='documents' AND column_name='file_path') THEN
    ALTER TABLE documents RENAME COLUMN file_path TO path;
  END IF;
END $$;

-- Supprimer les colonnes obsolètes
ALTER TABLE documents DROP COLUMN IF EXISTS storage_path;
ALTER TABLE documents DROP COLUMN IF EXISTS file_type;
ALTER TABLE documents DROP COLUMN IF EXISTS file_size;
ALTER TABLE documents DROP COLUMN IF EXISTS uploaded_by;
ALTER TABLE documents DROP COLUMN IF EXISTS tenant_id;

-- Créer les index
CREATE INDEX IF NOT EXISTS documents_user_id_idx ON documents(user_id);
CREATE INDEX IF NOT EXISTS documents_theme_idx ON documents(theme);
CREATE INDEX IF NOT EXISTS documents_type_idx ON documents(type);

-- Activer RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "Users can read their own documents" ON documents;
DROP POLICY IF EXISTS "Users can insert their own documents" ON documents;
DROP POLICY IF EXISTS "Users can delete their own documents" ON documents;
DROP POLICY IF EXISTS "Users can update their own documents" ON documents;

-- Créer les nouvelles policies
CREATE POLICY "Users can read their own documents"
ON documents FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
ON documents FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
ON documents FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
ON documents FOR UPDATE
USING (auth.uid() = user_id);
```

---

## 📊 Vérification de la migration

Après avoir exécuté une des options ci-dessus, vérifiez que tout est correct :

```sql
-- Vérifier la structure de la table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'documents'
ORDER BY ordinal_position;

-- Résultat attendu :
-- id              | uuid                        | NO
-- user_id         | uuid                        | NO
-- project_id      | uuid                        | YES
-- name            | text                        | NO
-- path            | text                        | NO
-- theme           | text                        | NO
-- type            | text                        | YES
-- tags            | text                        | YES
-- version         | integer                     | NO
-- created_at      | timestamp with time zone    | YES

-- Vérifier les index
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'documents';

-- Résultat attendu :
-- documents_pkey                | CREATE UNIQUE INDEX documents_pkey ON documents USING btree (id)
-- documents_user_id_idx         | CREATE INDEX documents_user_id_idx ON documents USING btree (user_id)
-- documents_theme_idx           | CREATE INDEX documents_theme_idx ON documents USING btree (theme)
-- documents_type_idx            | CREATE INDEX documents_type_idx ON documents USING btree (type)

-- Vérifier RLS
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'documents';

-- Résultat attendu :
-- documents       | true

-- Vérifier les policies
SELECT policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'documents';

-- Résultat attendu :
-- Users can read their own documents    | SELECT | (auth.uid() = user_id)
-- Users can insert their own documents  | INSERT | (auth.uid() = user_id)
-- Users can delete their own documents  | DELETE | (auth.uid() = user_id)
-- Users can update their own documents  | UPDATE | (auth.uid() = user_id)
```

---

## 🧪 Test de la migration

Insérer un document de test :

```sql
-- Remplacer USER_UUID par votre UUID (récupéré via auth.users)
INSERT INTO documents (user_id, name, path, theme, type, tags, version)
VALUES (
  'USER_UUID', -- Remplacer par un vrai UUID
  'Document Test',
  'test/document.pdf',
  'Test Migration',
  'Rapport',
  'test, migration, v2',
  1
);

-- Vérifier l'insertion
SELECT * FROM documents
WHERE name = 'Document Test';
```

---

## 🔄 Rollback (en cas de problème)

Si la migration échoue, vous pouvez revenir à l'ancienne structure :

```sql
-- Supprimer la nouvelle table
DROP TABLE IF EXISTS documents CASCADE;

-- Recréer l'ancienne table (structure simplifiée)
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  storage_path text NOT NULL,
  file_path text NOT NULL,
  file_type text,
  file_size bigint,
  uploaded_by uuid,
  tenant_id uuid,
  theme text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Activer RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Recréer les policies
CREATE POLICY "Users can read their own documents"
ON documents FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
ON documents FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
ON documents FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
ON documents FOR UPDATE
USING (auth.uid() = user_id);
```

---

## ✅ Checklist

Avant de déployer en production :

- [ ] Option 1 OU Option 2 exécutée sans erreurs
- [ ] Vérification de la structure de la table ✅
- [ ] Vérification des index ✅
- [ ] Vérification RLS activé ✅
- [ ] Vérification des policies ✅
- [ ] Test d'insertion réussi ✅
- [ ] Build Vite réussi (déjà fait ✅)
- [ ] Bucket `documents` existe dans Supabase Storage
- [ ] Storage policies configurées (voir ci-dessous)

---

## 📦 Storage Policies (Supabase Dashboard → Storage → documents)

Vérifier/Créer ces policies pour le bucket `documents` :

```sql
-- Policy 1: SELECT (lecture)
CREATE POLICY "Users can read their own documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 2: INSERT (upload)
CREATE POLICY "Users can upload to their folder"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 3: DELETE (suppression)
CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

---

**✨ Migration prête ! Vous pouvez maintenant tester le module Documents.**

Rendez-vous sur : **https://www.powalyze.com/app/documents**
