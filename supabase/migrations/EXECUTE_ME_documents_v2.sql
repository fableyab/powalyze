-- ⭐ MIGRATION SQL AUTOMATIQUE - Documents Module v2
-- À exécuter dans Supabase SQL Editor
-- Date: 2026-01-08
-- Version: 2.0

-- ============================================
-- ÉTAPE 1 : Supprimer l'ancienne table
-- ============================================

DROP TABLE IF EXISTS documents CASCADE;

-- ============================================
-- ÉTAPE 2 : Créer la nouvelle table
-- ============================================

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

-- ============================================
-- ÉTAPE 3 : Créer les index (performance)
-- ============================================

CREATE INDEX documents_user_id_idx ON documents(user_id);
CREATE INDEX documents_theme_idx ON documents(theme);
CREATE INDEX documents_type_idx ON documents(type);

-- ============================================
-- ÉTAPE 4 : Activer Row Level Security
-- ============================================

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ÉTAPE 5 : Créer les policies de sécurité
-- ============================================

-- Policy 1: Lecture (SELECT)
CREATE POLICY "Users can read their own documents"
ON documents FOR SELECT
USING (auth.uid() = user_id);

-- Policy 2: Insertion (INSERT)
CREATE POLICY "Users can insert their own documents"
ON documents FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy 3: Suppression (DELETE)
CREATE POLICY "Users can delete their own documents"
ON documents FOR DELETE
USING (auth.uid() = user_id);

-- Policy 4: Mise à jour (UPDATE)
CREATE POLICY "Users can update their own documents"
ON documents FOR UPDATE
USING (auth.uid() = user_id);

-- ============================================
-- ✅ MIGRATION TERMINÉE
-- ============================================

-- Vérifier la structure de la table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'documents'
ORDER BY ordinal_position;

-- Vérifier que RLS est activé
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'documents';

-- Vérifier les policies
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'documents';

-- ============================================
-- 🎉 Migration réussie !
-- ============================================
-- 
-- Prochaines étapes :
-- 1. Vérifier que le bucket "documents" existe dans Supabase Storage
-- 2. Déployer le frontend : vercel --prod
-- 3. Tester l'upload : https://www.powalyze.com/app/documents
--
-- ============================================
