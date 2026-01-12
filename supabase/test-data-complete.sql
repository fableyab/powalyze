-- ========================================
-- DONNÉES DE TEST COMPLÈTES
-- Pour tester Portfolio + Alertes + Décisions
-- Date: 2026-01-12
-- ========================================

-- VARIABLES (à remplacer)
-- User ID: 4fef37d8-b86a-496f-b7bb-4aeec90a470a
-- Org ID: 00000000-0000-0000-0000-000000000001

-- 1. INITIATIVES / PROJETS
-- ========================================

INSERT INTO initiatives (organization_id, name, description, status, progress, start_date, end_date, budget, priority, created_at)
VALUES 
  (
    '00000000-0000-0000-0000-000000000001',
    'Migration Cloud Azure',
    'Migration complète de l''infrastructure vers Azure',
    'in_progress',
    65,
    '2025-11-01',
    '2026-03-31',
    250000,
    'high',
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Refonte Application Mobile',
    'Développement nouvelle version de l''app mobile',
    'in_progress',
    40,
    '2025-12-01',
    '2026-06-30',
    180000,
    'high',
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Système BI & Analytics',
    'Mise en place d''un système de Business Intelligence',
    'at_risk',
    25,
    '2026-01-01',
    '2026-05-31',
    120000,
    'medium',
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Conformité RGPD',
    'Mise en conformité totale RGPD',
    'planned',
    10,
    '2026-02-01',
    '2026-08-31',
    80000,
    'high',
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Optimisation Infrastructure',
    'Réduction des coûts d''infrastructure',
    'completed',
    100,
    '2025-09-01',
    '2025-12-31',
    50000,
    'medium',
    NOW() - INTERVAL '30 days'
  )
ON CONFLICT DO NOTHING;

-- 2. RISQUES (pour alertes)
-- ========================================

INSERT INTO risks (organization_id, title, description, probability, impact, status, mitigation_plan, created_at)
VALUES 
  (
    '00000000-0000-0000-0000-000000000001',
    'Risque de sécurité critique',
    'Vulnérabilité détectée dans le système d''authentification',
    0.9,
    0.95,
    'open',
    'Patch de sécurité en cours de déploiement',
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Dépassement budget projet Azure',
    'Le budget du projet de migration risque d''être dépassé de 15%',
    0.75,
    0.7,
    'open',
    'Réunion de réajustement budgétaire planifiée',
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Retard livraison app mobile',
    'Risque de retard de 2 mois sur la livraison',
    0.6,
    0.65,
    'open',
    'Renforcement de l''équipe de développement',
    NOW()
  )
ON CONFLICT DO NOTHING;

-- 3. DÉCISIONS (avec dates urgentes pour alertes)
-- ========================================

INSERT INTO decisions (organization_id, title, description, impact_level, due_date, status, responsible, created_at)
VALUES 
  (
    '00000000-0000-0000-0000-000000000001',
    'Validation budget Q1 2026',
    'Approbation du budget pour le premier trimestre',
    'high',
    CURRENT_DATE + 1,  -- Demain (urgent!)
    'pending',
    'Direction Générale',
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Choix fournisseur Cloud',
    'Sélection finale entre Azure, AWS ou GCP',
    'high',
    CURRENT_DATE + 3,
    'pending',
    'CTO',
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Recrutement Lead Developer',
    'Validation de l''embauche du lead dev mobile',
    'medium',
    CURRENT_DATE + 7,
    'pending',
    'RH',
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Architecture microservices',
    'Décision sur l''architecture technique du projet',
    'high',
    CURRENT_DATE + 5,
    'pending',
    'Équipe Tech',
    NOW()
  )
ON CONFLICT DO NOTHING;

-- 4. VÉRIFICATION
-- ========================================

SELECT '✅ INITIATIVES' as type, COUNT(*) as count FROM initiatives WHERE organization_id = '00000000-0000-0000-0000-000000000001'
UNION ALL
SELECT '✅ RISQUES' as type, COUNT(*) as count FROM risks WHERE organization_id = '00000000-0000-0000-0000-000000000001'
UNION ALL
SELECT '✅ DÉCISIONS' as type, COUNT(*) as count FROM decisions WHERE organization_id = '00000000-0000-0000-0000-000000000001';

-- Aperçu des données
SELECT 
  'INITIATIVES' as table_name,
  name as title,
  status,
  progress || '%' as progress
FROM initiatives 
WHERE organization_id = '00000000-0000-0000-0000-000000000001'
ORDER BY created_at DESC
LIMIT 3;
