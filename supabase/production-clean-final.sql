-- ============================================================================
-- NETTOYAGE COMPLET PRODUCTION - ENVIRONNEMENT CLIENT VIDE
-- ============================================================================
-- Ce script vide TOUTES les données de test pour que chaque nouveau client
-- ait un environnement 100% vide lors de son inscription.
--
-- IMPORTANT: Exécutez ce script dans Supabase SQL Editor
-- ============================================================================

-- ÉTAPE 1: Désactiver les contraintes temporairement
SET session_replication_role = replica;

-- ÉTAPE 2: Vider TOUTES les tables (ordre important pour les foreign keys)
DELETE FROM alerts;
DELETE FROM team_invitations;
DELETE FROM team_members;
DELETE FROM documents;
DELETE FROM decisions;
DELETE FROM risks;
DELETE FROM initiatives;
DELETE FROM user_organizations;
DELETE FROM profiles;
DELETE FROM organizations;

-- Note: On ne touche PAS à auth.users (géré par Supabase Auth automatiquement)

-- ÉTAPE 3: Réactiver les contraintes
SET session_replication_role = DEFAULT;
            
            -- Tronquer la table

-- ============================================================================
-- VÉRIFICATION: Comptage des lignes dans chaque table
-- ============================================================================
-- Exécutez ce bloc SÉPARÉMENT après le nettoyage pour vérifier

SELECT 
    'organizations' as table_name, 
    COUNT(*) as row_count 
FROM organizations

UNION ALL

SELECT 
    'profiles' as table_name, 
    COUNT(*) as row_count 
FROM profiles

UNION ALL

SELECT 
    'user_organizations' as table_name, 
    COUNT(*) as row_count 
FROM user_organizations

UNION ALL

SELECT 
    'initiatives' as table_name, 
    COUNT(*) as row_count 
FROM initiatives

UNION ALL

SELECT 
    'risks' as table_name, 
    COUNT(*) as row_count 
FROM risks

UNION ALL

SELECT 
    'decisions' as table_name, 
    COUNT(*) as row_count 
FROM decisions

UNION ALL

SELECT 
    'documents' as table_name, 
    COUNT(*) as row_count 
FROM documents

UNION ALL

SELECT 
    'team_members' as table_name, 
    COUNT(*) as row_count 
FROM team_members

UNION ALL

SELECT 
    'team_invitations' as table_name, 
    COUNT(*) as row_count 
FROM team_invitations

UNION ALL

SELECT 
    'alerts' as table_name, 
    COUNT(*) as row_count 
FROM alerts

ORDER BY table_name;

-- ✅ Résultat attendu: TOUTES les tables doivent afficher 0 lignes

