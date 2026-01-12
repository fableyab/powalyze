-- ========================================
-- SUPPRESSION TOTALE - TOUTES LES TABLES
-- Efface TOUTES les données de TOUTES les tables
-- Date: 2026-01-12
-- ========================================

DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Désactiver temporairement toutes les contraintes
    EXECUTE 'SET session_replication_role = replica';
    
    -- Supprimer TOUTES les données de TOUTES les tables publiques
    FOR r IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        ORDER BY tablename
    LOOP
        BEGIN
            EXECUTE format('DELETE FROM %I', r.tablename);
            RAISE NOTICE 'Table % vidée: % lignes supprimées', r.tablename, (SELECT COUNT(*) FROM pg_stat_user_tables WHERE relname = r.tablename);
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Erreur avec table %: %', r.tablename, SQLERRM;
        END;
    END LOOP;
    
    -- Réactiver les contraintes
    EXECUTE 'SET session_replication_role = DEFAULT';
    
    RAISE NOTICE '✅ TOUTES les tables ont été vidées!';
END $$;

-- VÉRIFICATION COMPLÈTE - Afficher le nombre de lignes de TOUTES les tables
SELECT 
    schemaname,
    tablename,
    n_tup_ins - n_tup_del as row_count
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Compter les vraies lignes (plus précis)
DO $$ 
DECLARE
    r RECORD;
    v_count INTEGER;
BEGIN
    RAISE NOTICE '=== VÉRIFICATION FINALE ===';
    FOR r IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        ORDER BY tablename
    LOOP
        EXECUTE format('SELECT COUNT(*) FROM %I', r.tablename) INTO v_count;
        RAISE NOTICE 'Table %: % lignes', r.tablename, v_count;
    END LOOP;
END $$;
