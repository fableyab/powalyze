-- ============================================================================
-- NETTOYAGE PRODUCTION - VERSION SIMPLE (ignore les tables manquantes)
-- ============================================================================

-- Désactiver les contraintes
SET session_replication_role = replica;

-- Vider les tables QUI EXISTENT (ignore les erreurs)
DO $$ 
BEGIN
    -- Alerts
    BEGIN
        DELETE FROM alerts;
        RAISE NOTICE 'alerts: vidée ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'alerts: n''existe pas ou erreur ⚠️';
    END;
    
    -- Team invitations
    BEGIN
        DELETE FROM team_invitations;
        RAISE NOTICE 'team_invitations: vidée ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'team_invitations: n''existe pas ou erreur ⚠️';
    END;
    
    -- Team members
    BEGIN
        DELETE FROM team_members;
        RAISE NOTICE 'team_members: vidée ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'team_members: n''existe pas ou erreur ⚠️';
    END;
    
    -- Documents
    BEGIN
        DELETE FROM documents;
        RAISE NOTICE 'documents: vidée ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'documents: n''existe pas ou erreur ⚠️';
    END;
    
    -- Decisions
    BEGIN
        DELETE FROM decisions;
        RAISE NOTICE 'decisions: vidée ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'decisions: n''existe pas ou erreur ⚠️';
    END;
    
    -- Risks
    BEGIN
        DELETE FROM risks;
        RAISE NOTICE 'risks: vidée ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'risks: n''existe pas ou erreur ⚠️';
    END;
    
    -- Initiatives
    BEGIN
        DELETE FROM initiatives;
        RAISE NOTICE 'initiatives: vidée ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'initiatives: n''existe pas ou erreur ⚠️';
    END;
    
    -- User organizations
    BEGIN
        DELETE FROM user_organizations;
        RAISE NOTICE 'user_organizations: vidée ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'user_organizations: n''existe pas ou erreur ⚠️';
    END;
    
    -- Profiles
    BEGIN
        DELETE FROM profiles;
        RAISE NOTICE 'profiles: vidée ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'profiles: n''existe pas ou erreur ⚠️';
    END;
    
    -- Organizations
    BEGIN
        DELETE FROM organizations;
        RAISE NOTICE 'organizations: vidée ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'organizations: n''existe pas ou erreur ⚠️';
    END;
    
    RAISE NOTICE '✅ Nettoyage terminé!';
END $$;

-- Réactiver les contraintes
SET session_replication_role = DEFAULT;

-- Vérification
SELECT 
    'organizations' as table_name, 
    COUNT(*) as lignes 
FROM organizations

UNION ALL

SELECT 'profiles', COUNT(*) FROM profiles

UNION ALL

SELECT 'user_organizations', COUNT(*) FROM user_organizations

UNION ALL

SELECT 'initiatives', COUNT(*) FROM initiatives

UNION ALL

SELECT 'risks', COUNT(*) FROM risks

UNION ALL

SELECT 'decisions', COUNT(*) FROM decisions

ORDER BY table_name;
