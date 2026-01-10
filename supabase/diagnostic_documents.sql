-- DIAGNOSTIC SUPABASE POUR MODULE DOCUMENTS
-- Copier-coller ce script dans Supabase SQL Editor pour diagnostiquer les problèmes

-- ========================================
-- 1. VÉRIFIER SI LA TABLE DOCUMENTS EXISTE
-- ========================================
SELECT 
    'Table documents' as check_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'documents'
        ) THEN '✅ EXISTE'
        ELSE '❌ MANQUANTE'
    END as status;

-- ========================================
-- 2. VÉRIFIER LES COLONNES DE LA TABLE
-- ========================================
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'documents'
ORDER BY ordinal_position;

-- ========================================
-- 3. VÉRIFIER SI LE BUCKET 'documents' EXISTE
-- ========================================
SELECT 
    'Bucket documents' as check_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM storage.buckets WHERE name = 'documents'
        ) THEN '✅ EXISTE'
        ELSE '❌ MANQUANT - Créer le bucket dans Storage'
    END as status;

-- ========================================
-- 4. VÉRIFIER LES STORAGE POLICIES
-- ========================================
SELECT 
    name as policy_name,
    operation,
    definition
FROM storage.policies
WHERE bucket_id = 'documents'
ORDER BY operation;

-- ========================================
-- 5. VÉRIFIER LES RLS POLICIES SUR LA TABLE
-- ========================================
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'documents'
ORDER BY policyname;

-- ========================================
-- 6. VÉRIFIER SI RLS EST ACTIVÉ
-- ========================================
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'documents';

-- ========================================
-- 7. TESTER SI L'UTILISATEUR A UN TENANT_ID
-- ========================================
SELECT 
    id,
    email,
    tenant_id,
    role
FROM public.profiles
WHERE id = auth.uid()
LIMIT 1;

-- ========================================
-- 8. COMPTER LES DOCUMENTS EXISTANTS
-- ========================================
SELECT 
    COUNT(*) as total_documents,
    COUNT(DISTINCT user_id) as unique_users
FROM public.documents;

-- ========================================
-- 9. VÉRIFIER LES COLONNES MANQUANTES
-- ========================================
DO $$ 
DECLARE
    missing_columns text[] := ARRAY[]::text[];
BEGIN
    -- Vérifier file_type
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'documents' AND column_name = 'file_type'
    ) THEN
        missing_columns := array_append(missing_columns, 'file_type');
    END IF;
    
    -- Vérifier file_size
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'documents' AND column_name = 'file_size'
    ) THEN
        missing_columns := array_append(missing_columns, 'file_size');
    END IF;
    
    -- Vérifier user_id
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'documents' AND column_name = 'user_id'
    ) THEN
        missing_columns := array_append(missing_columns, 'user_id');
    END IF;
    
    -- Vérifier file_path
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'documents' AND column_name = 'file_path'
    ) THEN
        missing_columns := array_append(missing_columns, 'file_path');
    END IF;
    
    -- Afficher le résultat
    IF array_length(missing_columns, 1) > 0 THEN
        RAISE NOTICE '❌ COLONNES MANQUANTES: %', array_to_string(missing_columns, ', ');
        RAISE NOTICE '➡️  Appliquez la migration: supabase/migrations/20260108_documents_module.sql';
    ELSE
        RAISE NOTICE '✅ Toutes les colonnes requises sont présentes';
    END IF;
END $$;

-- ========================================
-- 10. RÉSUMÉ DES ACTIONS À FAIRE
-- ========================================
SELECT 
    'RÉSUMÉ DIAGNOSTIC' as titre,
    CASE 
        WHEN NOT EXISTS (SELECT 1 FROM storage.buckets WHERE name = 'documents')
        THEN '❌ CRÉER LE BUCKET: Dashboard → Storage → New bucket → Name: documents'
        ELSE '✅ Bucket OK'
    END as bucket_status,
    CASE 
        WHEN (SELECT COUNT(*) FROM storage.policies WHERE bucket_id = 'documents') < 4
        THEN '❌ CONFIGURER LES STORAGE POLICIES (voir DOCUMENTS_MODULE_SETUP.md)'
        ELSE '✅ Policies OK'
    END as policies_status,
    CASE 
        WHEN NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'documents' AND column_name = 'file_type'
        )
        THEN '❌ APPLIQUER LA MIGRATION SQL (20260108_documents_module.sql)'
        ELSE '✅ Migration OK'
    END as migration_status;

-- ========================================
-- COMMANDES À EXÉCUTER SI PROBLÈMES DÉTECTÉS
-- ========================================

-- Si le bucket n'existe pas:
-- 1. Aller sur: https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/storage/buckets
-- 2. Cliquer: New bucket
-- 3. Name: documents, Public: NO, Size limit: 52428800

-- Si la migration n'est pas appliquée:
-- 1. Copier le contenu de: supabase/migrations/20260108_documents_module.sql
-- 2. Coller dans: https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/sql/new
-- 3. Exécuter

-- Si les policies manquent:
-- Voir: DOCUMENTS_MODULE_SETUP.md section "Configuration Supabase"
