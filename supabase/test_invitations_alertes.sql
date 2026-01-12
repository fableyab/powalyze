-- ============================================
-- SCRIPT DE TEST - INVITATIONS ET ALERTES
-- ============================================
-- À exécuter dans Supabase SQL Editor pour tester les fonctionnalités

-- ============================================
-- 1. VÉRIFICATION DES TABLES
-- ============================================

-- Vérifier que la table invitations existe
SELECT 
  table_name, 
  table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'invitations';

-- Lister les colonnes de la table invitations
SELECT 
  column_name, 
  data_type, 
  is_nullable 
FROM information_schema.columns 
WHERE table_name = 'invitations' 
ORDER BY ordinal_position;

-- Vérifier les nouvelles colonnes de user_organizations
SELECT 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'user_organizations' 
AND column_name IN ('invited_at', 'invited_by', 'last_active_at');

-- ============================================
-- 2. VÉRIFICATION DES POLITIQUES RLS
-- ============================================

SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'invitations';

-- ============================================
-- 3. DONNÉES DE TEST POUR ALERTES
-- ============================================

-- ATTENTION: Remplacez 'YOUR_ORG_ID' par votre vrai organization_id
-- Pour le trouver: SELECT id FROM organizations LIMIT 1;

-- Créer un risque CRITIQUE (probability=0.9, impact=0.8 = score 72%)
INSERT INTO risks (
  organization_id, 
  title, 
  description, 
  probability, 
  impact, 
  status,
  created_at
)
VALUES (
  'YOUR_ORG_ID',  -- ⚠️ REMPLACER
  'Dépassement budgétaire Q2',
  'Le budget risque d''être dépassé de 35% suite aux imprévus techniques',
  0.9,  -- 90% de probabilité
  0.8,  -- Impact fort
  'open',
  NOW()
);

-- Créer un risque HAUTE priorité (probability=0.6, impact=0.7 = score 42%)
INSERT INTO risks (
  organization_id, 
  title, 
  description, 
  probability, 
  impact, 
  status,
  created_at
)
VALUES (
  'YOUR_ORG_ID',  -- ⚠️ REMPLACER
  'Retard livraison fournisseur',
  'Le fournisseur principal accuse un retard de 3 semaines',
  0.6,
  0.7,
  'open',
  NOW()
);

-- Créer une décision URGENTE (dans 2 jours)
INSERT INTO decisions (
  organization_id,
  title,
  description,
  impact_level,
  due_date,
  status,
  created_at
)
VALUES (
  'YOUR_ORG_ID',  -- ⚠️ REMPLACER
  'Validation budget infrastructure',
  'Décision urgente sur l''allocation budgétaire pour la migration cloud',
  'high',
  CURRENT_DATE + INTERVAL '2 days',
  'pending',
  NOW()
);

-- Créer une décision EN RETARD
INSERT INTO decisions (
  organization_id,
  title,
  description,
  impact_level,
  due_date,
  status,
  created_at
)
VALUES (
  'YOUR_ORG_ID',  -- ⚠️ REMPLACER
  'Choix prestataire sécurité',
  'La décision aurait dû être prise la semaine dernière',
  'critical',
  CURRENT_DATE - INTERVAL '5 days',  -- 5 jours en retard
  'pending',
  NOW()
);

-- Créer un projet À RISQUE
INSERT INTO initiatives (
  organization_id,
  name,
  description,
  status,
  progress,
  start_date,
  end_date,
  budget,
  created_at
)
VALUES (
  'YOUR_ORG_ID',  -- ⚠️ REMPLACER
  'Migration Cloud Azure',
  'Migration de l''infrastructure vers Azure',
  'at_risk',  -- Statut à risque
  25,  -- Seulement 25% d'avancement
  CURRENT_DATE - INTERVAL '3 months',
  CURRENT_DATE + INTERVAL '1 month',
  500000,
  NOW()
);

-- Créer un projet EN RETARD (faible progression, deadline proche)
INSERT INTO initiatives (
  organization_id,
  name,
  description,
  status,
  progress,
  start_date,
  end_date,
  budget,
  created_at
)
VALUES (
  'YOUR_ORG_ID',  -- ⚠️ REMPLACER
  'Refonte site web',
  'Modernisation du site corporate',
  'in_progress',
  15,  -- Seulement 15% d'avancement
  CURRENT_DATE - INTERVAL '2 months',
  CURRENT_DATE + INTERVAL '15 days',  -- Deadline dans 15 jours
  75000,
  NOW()
);

-- ============================================
-- 4. VÉRIFICATION DES DONNÉES DE TEST
-- ============================================

-- Compter les risques ouverts
SELECT 
  'Risques ouverts' AS type,
  COUNT(*) AS count
FROM risks 
WHERE status = 'open';

-- Compter les décisions en attente avec échéance
SELECT 
  'Décisions en attente' AS type,
  COUNT(*) AS count
FROM decisions 
WHERE status = 'pending' 
AND due_date IS NOT NULL;

-- Compter les projets à risque ou en cours
SELECT 
  'Projets à risque' AS type,
  COUNT(*) AS count
FROM initiatives 
WHERE status IN ('in_progress', 'at_risk');

-- ============================================
-- 5. TEST GÉNÉRATION D'ALERTES
-- ============================================

-- Après avoir cliqué sur "Générer les alertes" dans l'interface,
-- vérifier que des alertes ont été créées:

SELECT 
  id,
  type,
  severity,
  title,
  message,
  is_read,
  created_at
FROM alerts 
WHERE organization_id = 'YOUR_ORG_ID'  -- ⚠️ REMPLACER
ORDER BY created_at DESC 
LIMIT 10;

-- Statistiques des alertes par type
SELECT 
  type,
  severity,
  COUNT(*) AS count
FROM alerts 
WHERE organization_id = 'YOUR_ORG_ID'  -- ⚠️ REMPLACER
GROUP BY type, severity
ORDER BY severity DESC, type;

-- ============================================
-- 6. TEST INVITATIONS
-- ============================================

-- Lister toutes les invitations
SELECT 
  id,
  email,
  role,
  status,
  created_at,
  expires_at,
  CASE 
    WHEN expires_at < NOW() THEN 'Expirée'
    WHEN status = 'accepted' THEN 'Acceptée'
    WHEN status = 'cancelled' THEN 'Annulée'
    ELSE 'En attente'
  END AS etat
FROM invitations 
WHERE organization_id = 'YOUR_ORG_ID'  -- ⚠️ REMPLACER
ORDER BY created_at DESC;

-- Compter les invitations par statut
SELECT 
  status,
  COUNT(*) AS count
FROM invitations 
WHERE organization_id = 'YOUR_ORG_ID'  -- ⚠️ REMPLACER
GROUP BY status;

-- ============================================
-- 7. TEST MEMBRES D'ÉQUIPE
-- ============================================

-- Lister tous les membres avec leurs infos
SELECT 
  uo.id,
  uo.role,
  u.email,
  u.raw_user_meta_data->>'full_name' AS full_name,
  uo.created_at AS joined_at,
  uo.invited_at,
  uo.last_active_at
FROM user_organizations uo
JOIN auth.users u ON u.id = uo.user_id
WHERE uo.organization_id = 'YOUR_ORG_ID'  -- ⚠️ REMPLACER
ORDER BY uo.created_at DESC;

-- Compter les membres par rôle
SELECT 
  role,
  COUNT(*) AS count
FROM user_organizations 
WHERE organization_id = 'YOUR_ORG_ID'  -- ⚠️ REMPLACER
GROUP BY role
ORDER BY 
  CASE role
    WHEN 'admin' THEN 1
    WHEN 'manager' THEN 2
    WHEN 'analyst' THEN 3
    WHEN 'viewer' THEN 4
  END;

-- ============================================
-- 8. NETTOYAGE (si besoin)
-- ============================================

-- Supprimer TOUTES les données de test (⚠️ ATTENTION!)
-- Décommenter seulement si vous voulez vraiment supprimer:

/*
DELETE FROM alerts WHERE organization_id = 'YOUR_ORG_ID';
DELETE FROM invitations WHERE organization_id = 'YOUR_ORG_ID';
DELETE FROM risks WHERE organization_id = 'YOUR_ORG_ID' AND title LIKE '%test%';
DELETE FROM decisions WHERE organization_id = 'YOUR_ORG_ID' AND title LIKE '%test%';
DELETE FROM initiatives WHERE organization_id = 'YOUR_ORG_ID' AND name LIKE '%test%';
*/

-- ============================================
-- 9. FONCTIONS UTILITAIRES
-- ============================================

-- Obtenir votre organization_id
SELECT id, name FROM organizations LIMIT 5;

-- Obtenir votre user_id
SELECT id, email FROM auth.users WHERE email = 'VOTRE_EMAIL@example.com';

-- Vérifier vos permissions
SELECT 
  uo.role,
  o.name AS organization_name
FROM user_organizations uo
JOIN organizations o ON o.id = uo.organization_id
WHERE uo.user_id = (SELECT id FROM auth.users WHERE email = 'VOTRE_EMAIL@example.com');

-- ============================================
-- 10. RÉSULTATS ATTENDUS
-- ============================================

/*
Après avoir exécuté ce script ET cliqué sur "Générer les alertes":

ALERTES CRÉÉES:
- 2 alertes de risques (1 critique, 1 haute)
- 2 alertes de décisions (1 critique en retard, 1 haute urgente)
- 2 alertes de projets (1 à risque, 1 en retard)

TOTAL: 6 alertes minimum

VÉRIFICATION:
SELECT COUNT(*) FROM alerts WHERE organization_id = 'YOUR_ORG_ID';
-- Devrait retourner >= 6

INVITATIONS:
Après avoir créé une invitation dans l'interface:
SELECT * FROM invitations WHERE organization_id = 'YOUR_ORG_ID';
-- Devrait montrer 1 invitation avec status='pending'

MEMBRES:
SELECT COUNT(*) FROM user_organizations WHERE organization_id = 'YOUR_ORG_ID';
-- Devrait montrer au moins 1 membre (vous)
*/

-- ============================================
-- FIN DU SCRIPT
-- ============================================

-- Pour plus d'informations, voir:
-- - GUIDE_DEPLOIEMENT_INVITATIONS.md
-- - RECAP_INVITATIONS_ALERTES.md
