-- =====================================================
-- SCRIPT ULTRA-FORCE - DÉSACTIVATION TOTALE RLS
-- Copier-coller TOUT dans Supabase SQL Editor
-- Exécuter même si vous voyez des erreurs
-- =====================================================

-- ÉTAPE 1: Détruire toutes les fonctions RLS
DROP FUNCTION IF EXISTS public.user_in_org(uuid);

-- ÉTAPE 2: Supprimer TOUTES les politiques (boucle automatique)
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE schemaname = 'public'
    ) LOOP
        BEGIN
            EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I CASCADE', 
                r.policyname, r.schemaname, r.tablename);
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Erreur ignorée: %', SQLERRM;
        END;
    END LOOP;
END $$;

-- ÉTAPE 3: Forcer la désactivation RLS sur TOUTES les tables publiques
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    ) LOOP
        BEGIN
            EXECUTE format('ALTER TABLE IF EXISTS public.%I DISABLE ROW LEVEL SECURITY', r.tablename);
            RAISE NOTICE 'RLS désactivé sur: %', r.tablename;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Erreur ignorée: %', SQLERRM;
        END;
    END LOOP;
END $$;

-- ÉTAPE 4: Forcer spécifiquement les tables importantes
ALTER TABLE IF EXISTS public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.initiatives DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.reports DISABLE ROW LEVEL SECURITY;

-- ÉTAPE 5: Vérification finale
SELECT 
    tablename, 
    CASE 
        WHEN rowsecurity THEN '❌ ENCORE ACTIVÉ - RELANCER LE SCRIPT'
        ELSE '✅ DÉSACTIVÉ'
    END as statut
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Si vous voyez encore ❌, RE-EXÉCUTEZ ce script une 2ème fois
