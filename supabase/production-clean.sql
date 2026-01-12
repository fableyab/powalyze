-- ========================================
-- NETTOYAGE COMPLET POUR PRODUCTION
-- Reset total - Base de données vierge
-- Date: 2026-01-12
-- ========================================

-- ⚠️ ATTENTION: Ce script va supprimer TOUTES les données!
-- Exécutez uniquement si vous voulez repartir à zéro

-- 1. DÉSACTIVER RLS temporairement
ALTER TABLE IF EXISTS user_organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS initiatives DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS risks DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS decisions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS committees DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS alerts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS team_invitations DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS reports DISABLE ROW LEVEL SECURITY;

-- 2. SUPPRIMER TOUTES LES DONNÉES (garder la structure)
TRUNCATE TABLE alerts CASCADE;
TRUNCATE TABLE reports CASCADE;
TRUNCATE TABLE team_invitations CASCADE;
TRUNCATE TABLE documents CASCADE;
TRUNCATE TABLE decisions CASCADE;
TRUNCATE TABLE risks CASCADE;
TRUNCATE TABLE initiatives CASCADE;
TRUNCATE TABLE committees CASCADE;
TRUNCATE TABLE user_organizations CASCADE;
TRUNCATE TABLE profiles CASCADE;
TRUNCATE TABLE organizations CASCADE;

-- 3. RÉACTIVER RLS
ALTER TABLE IF EXISTS user_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS risks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS committees ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS team_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS reports ENABLE ROW LEVEL SECURITY;

-- 4. RÉINITIALISER LES SÉQUENCES (si vous en avez)
-- (Les UUID n'ont pas de séquences, donc pas nécessaire)

-- 5. VÉRIFICATION - Tout doit être à 0
SELECT 
  'organizations' as table_name, COUNT(*) as count FROM organizations
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
SELECT 'committees', COUNT(*) FROM committees
UNION ALL
SELECT 'alerts', COUNT(*) FROM alerts
UNION ALL
SELECT 'team_invitations', COUNT(*) FROM team_invitations
UNION ALL
SELECT 'reports', COUNT(*) FROM reports
ORDER BY table_name;

-- ========================================
-- ✅ BASE DE DONNÉES NETTOYÉE
-- ========================================
-- La structure est intacte, seules les données sont supprimées
-- Le premier utilisateur qui s'inscrit devra:
-- 1. Créer un compte sur /signup
-- 2. Une organisation sera créée automatiquement
-- 3. Il sera associé comme admin
