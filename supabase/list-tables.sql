-- ============================================================================
-- DÉCOUVERTE: Lister toutes les tables existantes
-- ============================================================================
-- Exécutez ce script pour voir quelles tables existent dans votre base

SELECT 
    tablename as nom_table
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
