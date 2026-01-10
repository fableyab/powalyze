-- Migration: Module Documents avec Supabase Storage
-- Date: 2026-01-08
-- Description: Ajout des colonnes nécessaires pour le nouveau module Documents

-- Ajouter les colonnes manquantes si elles n'existent pas
DO $$ BEGIN
  -- Ajouter file_type si elle n'existe pas
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'documents' AND column_name = 'file_type') THEN
    ALTER TABLE public.documents ADD COLUMN file_type TEXT;
  END IF;

  -- Ajouter file_size si elle n'existe pas
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'documents' AND column_name = 'file_size') THEN
    ALTER TABLE public.documents ADD COLUMN file_size BIGINT;
  END IF;

  -- Ajouter user_id si elle n'existe pas (pour compatibilité avec le code frontend)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'documents' AND column_name = 'user_id') THEN
    ALTER TABLE public.documents ADD COLUMN user_id UUID REFERENCES auth.users(id);
  END IF;

  -- Ajouter file_path si elle n'existe pas (alias pour storage_path)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'documents' AND column_name = 'file_path') THEN
    ALTER TABLE public.documents ADD COLUMN file_path TEXT;
  END IF;
END $$;

-- Créer un index sur user_id pour performances
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);

-- Créer le bucket 'documents' dans Supabase Storage (si pas déjà fait)
-- À exécuter manuellement dans Supabase Dashboard > Storage:
-- 1. Create new bucket: 'documents'
-- 2. Public bucket: NO (private avec RLS)
-- 3. File size limit: 52428800 (50MB)

-- Policies pour Supabase Storage (à exécuter dans Storage > Policies)
-- Policy 1: Users can read their own documents
INSERT INTO storage.policies (name, bucket_id, definition, operation)
VALUES (
  'Users can read their own documents',
  'documents',
  '((bucket_id = ''documents''::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))',
  'SELECT'
) ON CONFLICT DO NOTHING;

-- Policy 2: Users can upload to their own folder
INSERT INTO storage.policies (name, bucket_id, definition, operation)
VALUES (
  'Users can upload to their own folder',
  'documents',
  '((bucket_id = ''documents''::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))',
  'INSERT'
) ON CONFLICT DO NOTHING;

-- Policy 3: Users can delete their own documents
INSERT INTO storage.policies (name, bucket_id, definition, operation)
VALUES (
  'Users can delete their own documents',
  'documents',
  '((bucket_id = ''documents''::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))',
  'DELETE'
) ON CONFLICT DO NOTHING;

-- Policy 4: Users can update their own documents metadata
INSERT INTO storage.policies (name, bucket_id, definition, operation)
VALUES (
  'Users can update their own documents',
  'documents',
  '((bucket_id = ''documents''::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))',
  'UPDATE'
) ON CONFLICT DO NOTHING;

-- Modifier les RLS policies sur la table documents pour être compatibles avec user_id
DROP POLICY IF EXISTS "documents_select_user" ON public.documents;
CREATE POLICY "documents_select_user" ON public.documents 
  FOR SELECT 
  USING (user_id = auth.uid() OR uploaded_by = auth.uid() OR tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS "documents_insert_user" ON public.documents;
CREATE POLICY "documents_insert_user" ON public.documents 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "documents_delete_user" ON public.documents;
CREATE POLICY "documents_delete_user" ON public.documents 
  FOR DELETE 
  USING (user_id = auth.uid() OR uploaded_by = auth.uid());

-- Fonction pour synchroniser user_id avec uploaded_by
CREATE OR REPLACE FUNCTION public.sync_document_user_id()
RETURNS TRIGGER AS $$
BEGIN
  -- Si user_id n'est pas fourni, utiliser uploaded_by
  IF NEW.user_id IS NULL AND NEW.uploaded_by IS NOT NULL THEN
    NEW.user_id := NEW.uploaded_by;
  END IF;
  
  -- Si uploaded_by n'est pas fourni, utiliser user_id
  IF NEW.uploaded_by IS NULL AND NEW.user_id IS NOT NULL THEN
    NEW.uploaded_by := NEW.user_id;
  END IF;
  
  -- Si ni l'un ni l'autre, utiliser auth.uid()
  IF NEW.user_id IS NULL AND NEW.uploaded_by IS NULL THEN
    NEW.user_id := auth.uid();
    NEW.uploaded_by := auth.uid();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger pour synchroniser user_id et uploaded_by
DROP TRIGGER IF EXISTS sync_document_user_id_trigger ON public.documents;
CREATE TRIGGER sync_document_user_id_trigger
  BEFORE INSERT OR UPDATE ON public.documents
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_document_user_id();

-- Commentaires
COMMENT ON COLUMN public.documents.file_type IS 'MIME type du fichier (e.g., application/pdf, image/jpeg)';
COMMENT ON COLUMN public.documents.file_size IS 'Taille du fichier en bytes';
COMMENT ON COLUMN public.documents.user_id IS 'ID de l''utilisateur propriétaire (auth.users.id)';
COMMENT ON COLUMN public.documents.file_path IS 'Chemin du fichier dans Supabase Storage (format: userId/timestamp-filename)';
