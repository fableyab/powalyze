-- ========================================
-- FIX: Associer l'utilisateur à une organisation
-- User: fabrice.fays@outlook.fr
-- User ID: 4fef37d8-b86a-496f-b7bb-4aeec90a470a
-- Date: 2026-01-12
-- ========================================

-- ÉTAPE 1: Créer une organisation par défaut (si elle n'existe pas)
INSERT INTO organizations (id, name, description, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Powalyze Organization',
  'Organisation principale pour la plateforme',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- ÉTAPE 2: Associer l'utilisateur à l'organisation
INSERT INTO user_organizations (user_id, organization_id, role, created_at)
VALUES (
  '4fef37d8-b86a-496f-b7bb-4aeec90a470a',  -- Votre User ID
  '00000000-0000-0000-0000-000000000001',  -- Organisation par défaut
  'admin',                                   -- Rôle administrateur
  NOW()
)
ON CONFLICT (user_id, organization_id) 
DO UPDATE SET 
  role = EXCLUDED.role,
  updated_at = NOW();

-- ÉTAPE 3: Vérification - Afficher le résultat
SELECT 
  '✅ Association créée avec succès!' AS status,
  uo.user_id,
  uo.organization_id,
  uo.role,
  u.email,
  o.name AS organization_name,
  uo.created_at
FROM user_organizations uo
JOIN auth.users u ON u.id = uo.user_id
JOIN organizations o ON o.id = uo.organization_id
WHERE uo.user_id = '4fef37d8-b86a-496f-b7bb-4aeec90a470a';
