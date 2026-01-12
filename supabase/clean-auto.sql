-- ============================================================================
-- NETTOYAGE AUTOMATIQUE - Vide TOUTES les tables qui existent
-- ============================================================================
-- Ce script découvre automatiquement les tables et les vide

-- Désactiver les contraintes
SET session_replication_role = replica;

-- Vider toutes les tables automatiquement
DO $$ 
DECLARE
    r RECORD;
    v_count INTEGER;
BEGIN
    -- Boucle sur toutes les tables du schema public
    FOR r IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        ORDER BY tablename
    LOOP
        BEGIN
            -- Compter les lignes avant
            EXECUTE format('SELECT COUNT(*) FROM %I', r.tablename) INTO v_count;
            
            -- Vider la table
            EXECUTE format('DELETE FROM %I', r.tablename);
            
            RAISE NOTICE 'Table %: % lignes supprimées ✅', r.tablename, v_count;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Table %: erreur ⚠️ - %', r.tablename, SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE '✅ Nettoyage automatique terminé!';
END $$;

-- Réactiver les contraintes
SET session_replication_role = DEFAULT;

-- Vérification finale - Afficher le compte de TOUTES les tables
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
        
        IF v_count > 0 THEN
            RAISE NOTICE 'Table %: % lignes restantes ⚠️', r.tablename, v_count;
        ELSE
            RAISE NOTICE 'Table %: VIDE ✅', r.tablename;
        END IF;
    END LOOP;
END $$;
