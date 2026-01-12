-- ========================================
-- SUPPRESSION TOTALE - TOUT VIDER
-- Date: 2026-01-12
-- ========================================

-- 1. Supprimer TOUTES les données de TOUTES les tables
DELETE FROM alerts;
DELETE FROM team_invitations;
DELETE FROM documents;
DELETE FROM decisions;
DELETE FROM risks;
DELETE FROM initiatives;
DELETE FROM user_organizations;
DELETE FROM profiles;
DELETE FROM organizations;

-- 2. Vérifier - TOUT doit être à 0
SELECT 'organizations' as table_name, COUNT(*) as count FROM organizations
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
UNION ALL
SELECT 'documents', COUNT(*) FROM documents
UNION ALL
SELECT 'alerts', COUNT(*) FROM alerts
UNION ALL
SELECT 'team_invitations', COUNT(*) FROM team_invitations
ORDER BY table_name;

-- ========================================
-- ✅ Si tous les counts = 0, c'est vidé!
-- ========================================
