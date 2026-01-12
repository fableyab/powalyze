-- ========================================
-- NETTOYAGE COMPLET - VERSION SÉCURISÉE
-- Ne tronque que les tables qui existent
-- Date: 2026-01-12
-- ========================================

-- 1. VÉRIFIER LES TABLES EXISTANTES
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 2. NETTOYER LES TABLES (une par une, ignore les erreurs)
DO $$ 
BEGIN
    -- Désactiver RLS
    EXECUTE 'ALTER TABLE IF EXISTS user_organizations DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS organizations DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS initiatives DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS risks DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS decisions DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS documents DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS alerts DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS team_invitations DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS reports DISABLE ROW LEVEL SECURITY';
    
    -- Tronquer les tables
    EXECUTE 'TRUNCATE TABLE IF EXISTS alerts CASCADE';
    EXECUTE 'TRUNCATE TABLE IF EXISTS reports CASCADE';
    EXECUTE 'TRUNCATE TABLE IF EXISTS team_invitations CASCADE';
    EXECUTE 'TRUNCATE TABLE IF EXISTS documents CASCADE';
    EXECUTE 'TRUNCATE TABLE IF EXISTS decisions CASCADE';
    EXECUTE 'TRUNCATE TABLE IF EXISTS risks CASCADE';
    EXECUTE 'TRUNCATE TABLE IF EXISTS initiatives CASCADE';
    EXECUTE 'TRUNCATE TABLE IF EXISTS user_organizations CASCADE';
    EXECUTE 'TRUNCATE TABLE IF EXISTS profiles CASCADE';
    EXECUTE 'TRUNCATE TABLE IF EXISTS organizations CASCADE';
    
    -- Réactiver RLS
    EXECUTE 'ALTER TABLE IF EXISTS user_organizations ENABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS organizations ENABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS initiatives ENABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS risks ENABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS decisions ENABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS documents ENABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS alerts ENABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS team_invitations ENABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE IF EXISTS reports ENABLE ROW LEVEL SECURITY';
    
    RAISE NOTICE '✅ Nettoyage terminé!';
END $$;

-- 3. VÉRIFICATION FINALE
SELECT 
    t.table_name,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = t.table_name AND table_schema = 'public') as exists,
    COALESCE(
        (SELECT 
            CASE 
                WHEN t.table_name = 'organizations' THEN (SELECT COUNT(*)::text FROM organizations)
                WHEN t.table_name = 'profiles' THEN (SELECT COUNT(*)::text FROM profiles)
                WHEN t.table_name = 'user_organizations' THEN (SELECT COUNT(*)::text FROM user_organizations)
                WHEN t.table_name = 'initiatives' THEN (SELECT COUNT(*)::text FROM initiatives)
                WHEN t.table_name = 'risks' THEN (SELECT COUNT(*)::text FROM risks)
                WHEN t.table_name = 'decisions' THEN (SELECT COUNT(*)::text FROM decisions)
                WHEN t.table_name = 'documents' THEN (SELECT COUNT(*)::text FROM documents)
                WHEN t.table_name = 'alerts' THEN (SELECT COUNT(*)::text FROM alerts)
                WHEN t.table_name = 'team_invitations' THEN (SELECT COUNT(*)::text FROM team_invitations)
                WHEN t.table_name = 'reports' THEN (SELECT COUNT(*)::text FROM reports)
                ELSE 'N/A'
            END
        ), '0'
    ) as row_count
FROM (
    VALUES 
        ('organizations'),
        ('profiles'),
        ('user_organizations'),
        ('initiatives'),
        ('risks'),
        ('decisions'),
        ('documents'),
        ('alerts'),
        ('team_invitations'),
        ('reports')
) AS t(table_name)
ORDER BY t.table_name;
