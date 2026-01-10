-- ================================================================
-- POWALYZE - Script de données de test (SEED)
-- ================================================================
-- Ce script insère des données de test pour valider le modèle
-- ⚠️ À exécuter UNIQUEMENT en environnement de dev/staging
-- ================================================================

-- 1. ORGANISATION DE TEST
-- ================================================================
INSERT INTO organizations (id, name, domain, logo_url, settings, is_active)
VALUES (
  'org-acme-corp-123',
  'Acme Corporation',
  'acme.com',
  'https://via.placeholder.com/150',
  '{"theme": "dark", "language": "fr"}'::jsonb,
  true
);

-- 2. UTILISATEURS DE TEST
-- ================================================================
-- Password: "password123" (hashed avec bcrypt)
-- Réel hash bcrypt: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

INSERT INTO users (id, organization_id, email, password_hash, first_name, last_name, role, is_active)
VALUES
  -- PMO
  ('user-marie-pmo-456', 'org-acme-corp-123', 'marie.dupont@acme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Marie', 'Dupont', 'PMO', true),
  
  -- Executive
  ('user-jean-ceo-789', 'org-acme-corp-123', 'jean.martin@acme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Jean', 'Martin', 'EXECUTIVE', true),
  
  -- Data Analyst
  ('user-sophie-data-101', 'org-acme-corp-123', 'sophie.bernard@acme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Sophie', 'Bernard', 'DATA', true),
  
  -- Project Managers
  ('user-thomas-pm-202', 'org-acme-corp-123', 'thomas.leroy@acme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Thomas', 'Leroy', 'PROJECT_MANAGER', true),
  ('user-claire-pm-303', 'org-acme-corp-123', 'claire.moreau@acme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Claire', 'Moreau', 'PROJECT_MANAGER', true),
  
  -- Consultant
  ('user-julien-cons-404', 'org-acme-corp-123', 'julien.consultant@external.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Julien', 'Consultant', 'CONSULTANT', true);

-- 3. PORTFOLIOS
-- ================================================================
INSERT INTO portfolios (id, organization_id, name, description, owner_user_id, status, strategic_axis, priority, start_date, end_date, budget_planned, budget_actual)
VALUES
  (
    'portfolio-transform-digital-001',
    'org-acme-corp-123',
    'Transformation Digitale',
    'Programme de modernisation IT et digitalisation des processus métier',
    'user-marie-pmo-456',
    'ACTIVE',
    'Innovation & Digital',
    1,
    '2026-01-01',
    '2028-12-31',
    5000000,
    850000
  ),
  (
    'portfolio-excellence-operationnel-002',
    'org-acme-corp-123',
    'Excellence Opérationnelle',
    'Optimisation des processus et réduction des coûts',
    'user-marie-pmo-456',
    'ACTIVE',
    'Efficacité & Performance',
    2,
    '2025-06-01',
    '2027-12-31',
    2000000,
    450000
  );

-- 4. PROGRAMS
-- ================================================================
INSERT INTO programs (id, organization_id, portfolio_id, name, description, owner_user_id, status, start_date, end_date, budget_planned, budget_actual)
VALUES
  (
    'program-migration-cloud-001',
    'org-acme-corp-123',
    'portfolio-transform-digital-001',
    'Migration Cloud Azure',
    'Migration complète de l''infrastructure vers Azure',
    'user-thomas-pm-202',
    'ACTIVE',
    '2026-01-01',
    '2027-06-30',
    2000000,
    420000
  ),
  (
    'program-applis-mobiles-002',
    'org-acme-corp-123',
    'portfolio-transform-digital-001',
    'Applications Mobiles',
    'Développement d''apps mobiles iOS/Android',
    'user-claire-pm-303',
    'ACTIVE',
    '2026-03-01',
    '2027-12-31',
    1500000,
    280000
  );

-- 5. PROJECTS
-- ================================================================
INSERT INTO projects (id, organization_id, portfolio_id, program_id, name, description, sponsor_user_id, project_manager_user_id, status, health, start_date, end_date, budget_planned, budget_actual, progress_percent, metadata)
VALUES
  -- Programme Migration Cloud
  (
    'project-migration-bdd-001',
    'org-acme-corp-123',
    'portfolio-transform-digital-001',
    'program-migration-cloud-001',
    'Migration BDD vers Azure SQL',
    'Migration des bases de données vers Azure SQL Database',
    'user-jean-ceo-789',
    'user-thomas-pm-202',
    'IN_PROGRESS',
    'GREEN',
    '2026-01-15',
    '2026-06-30',
    500000,
    120000,
    35,
    '{"technology": "Azure SQL", "team_size": 5}'::jsonb
  ),
  (
    'project-migration-apps-002',
    'org-acme-corp-123',
    'portfolio-transform-digital-001',
    'program-migration-cloud-001',
    'Migration Apps vers AKS',
    'Containerisation et déploiement sur Azure Kubernetes Service',
    'user-jean-ceo-789',
    'user-thomas-pm-202',
    'AT_RISK',
    'AMBER',
    '2026-02-01',
    '2026-12-31',
    800000,
    250000,
    25,
    '{"technology": "Kubernetes", "team_size": 8}'::jsonb
  ),
  
  -- Programme Apps Mobiles
  (
    'project-app-ios-001',
    'org-acme-corp-123',
    'portfolio-transform-digital-001',
    'program-applis-mobiles-002',
    'App Mobile iOS',
    'Application mobile iOS pour clients B2C',
    'user-jean-ceo-789',
    'user-claire-pm-303',
    'IN_PROGRESS',
    'GREEN',
    '2026-03-01',
    '2026-09-30',
    400000,
    80000,
    45,
    '{"platform": "iOS", "team_size": 6}'::jsonb
  ),
  (
    'project-app-android-002',
    'org-acme-corp-123',
    'portfolio-transform-digital-001',
    'program-applis-mobiles-002',
    'App Mobile Android',
    'Application mobile Android pour clients B2C',
    'user-jean-ceo-789',
    'user-claire-pm-303',
    'NOT_STARTED',
    'GREEN',
    '2026-04-01',
    '2026-10-31',
    350000,
    0,
    0,
    '{"platform": "Android", "team_size": 5}'::jsonb
  ),
  
  -- Portfolio Excellence Opérationnelle
  (
    'project-rpa-finance-001',
    'org-acme-corp-123',
    'portfolio-excellence-operationnel-002',
    NULL,
    'Automatisation RPA Finance',
    'Robotisation des processus comptables',
    'user-jean-ceo-789',
    'user-thomas-pm-202',
    'BLOCKED',
    'RED',
    '2025-09-01',
    '2026-03-31',
    300000,
    180000,
    60,
    '{"technology": "UiPath", "blocked_reason": "Ressources indisponibles"}'::jsonb
  );

-- 6. COMMITTEE TYPES
-- ================================================================
INSERT INTO committee_types (id, organization_id, name, description, frequency, default_participants)
VALUES
  (
    'comtype-copil-001',
    'org-acme-corp-123',
    'COPIL (Comité de Pilotage)',
    'Revue exécutive mensuelle avec décisions stratégiques',
    'MONTHLY',
    '["user-jean-ceo-789", "user-marie-pmo-456"]'::jsonb
  ),
  (
    'comtype-codir-002',
    'org-acme-corp-123',
    'CODIR (Comité de Direction)',
    'Revue direction trimestrielle',
    'QUARTERLY',
    '["user-jean-ceo-789"]'::jsonb
  ),
  (
    'comtype-tech-003',
    'org-acme-corp-123',
    'Comité Technique',
    'Revue hebdomadaire équipes tech',
    'WEEKLY',
    '["user-thomas-pm-202", "user-claire-pm-303"]'::jsonb
  );

-- 7. COMMITTEES
-- ================================================================
INSERT INTO committees (id, organization_id, committee_type_id, date, status, agenda, chair_user_id, notes, participants)
VALUES
  -- Comité passé (CLOSED)
  (
    'committee-copil-dec-001',
    'org-acme-corp-123',
    'comtype-copil-001',
    '2025-12-15 14:00:00+00',
    'CLOSED',
    'Revue Q4 2025 + Validation budget 2026',
    'user-marie-pmo-456',
    E'**Présents**: Jean Martin (CEO), Marie Dupont (PMO), Thomas Leroy (PM)\n\n**Points clés**:\n- Budget 2026 validé: 7M€\n- 3 projets GREEN, 1 AMBER, 1 RED\n- Décision: débloquer projet RPA Finance\n\n**Prochaine séance**: 15 janvier 2026',
    '["user-jean-ceo-789", "user-marie-pmo-456", "user-thomas-pm-202"]'::jsonb
  ),
  
  -- Comité à venir (PLANNED)
  (
    'committee-copil-jan-002',
    'org-acme-corp-123',
    'comtype-copil-001',
    '2026-01-15 14:00:00+00',
    'PLANNED',
    'Revue janvier 2026 + Point projets AT_RISK',
    'user-marie-pmo-456',
    '',
    '["user-jean-ceo-789", "user-marie-pmo-456", "user-thomas-pm-202", "user-claire-pm-303"]'::jsonb
  );

-- 8. COMMITTEE ITEMS
-- ================================================================
INSERT INTO committee_items (id, committee_id, type, title, description, related_project_id, related_risk_id, related_decision_id, status, order_index)
VALUES
  -- Items du comité de décembre (CLOSED)
  (
    'comitem-001',
    'committee-copil-dec-001',
    'PROJECT_REVIEW',
    'Revue projet Migration Apps',
    'Projet en difficulté - dérive budget 30%',
    'project-migration-apps-002',
    NULL,
    NULL,
    'CLOSED',
    1
  ),
  (
    'comitem-002',
    'committee-copil-dec-001',
    'DECISION',
    'Déblocage projet RPA Finance',
    'Décision de recruter 2 devs supplémentaires',
    'project-rpa-finance-001',
    NULL,
    NULL,
    'CLOSED',
    2
  ),
  
  -- Items du comité de janvier (PLANNED)
  (
    'comitem-003',
    'committee-copil-jan-002',
    'PROJECT_REVIEW',
    'Revue projet Migration Apps',
    'Suivi plan de remédiation',
    'project-migration-apps-002',
    NULL,
    NULL,
    'PENDING',
    1
  );

-- 9. DECISIONS
-- ================================================================
INSERT INTO decisions (id, organization_id, title, description, decision_date, status, decision_type, committee_id, created_by_user_id, approved_by_user_id, related_portfolio_id, related_program_id, related_project_id, impact_summary)
VALUES
  -- Décision TAKEN
  (
    'decision-budget-rpa-001',
    'org-acme-corp-123',
    'Augmentation budget RPA Finance',
    'Budget supplémentaire de 50K€ pour débloquer le projet',
    '2025-12-15',
    'TAKEN',
    'BUDGET',
    'committee-copil-dec-001',
    'user-marie-pmo-456',
    'user-jean-ceo-789',
    'portfolio-excellence-operationnel-002',
    NULL,
    'project-rpa-finance-001',
    'Permet de recruter 2 devs UiPath pendant 2 mois pour rattraper le retard'
  ),
  
  -- Décision PLANNED
  (
    'decision-go-app-android-002',
    'org-acme-corp-123',
    'Lancer le projet App Android',
    'Validation du GO pour démarrer le développement Android',
    NULL,
    'PLANNED',
    'GO',
    'committee-copil-jan-002',
    'user-claire-pm-303',
    NULL,
    'portfolio-transform-digital-001',
    'program-applis-mobiles-002',
    'project-app-android-002',
    'Complète l''offre mobile avec une version Android, cible 100K utilisateurs'
  );

-- 10. DECISION ACTIONS
-- ================================================================
INSERT INTO decision_actions (id, decision_id, title, description, owner_user_id, due_date, status)
VALUES
  (
    'action-recrut-devs-001',
    'decision-budget-rpa-001',
    'Recruter 2 développeurs UiPath',
    'Profils seniors, mission 2 mois',
    'user-thomas-pm-202',
    '2026-01-31',
    'IN_PROGRESS'
  ),
  (
    'action-setup-android-002',
    'decision-go-app-android-002',
    'Setup environnement Android',
    'Préparer repo Git, CI/CD, Firebase',
    'user-claire-pm-303',
    '2026-01-20',
    'OPEN'
  );

-- 11. RISKS
-- ================================================================
INSERT INTO risks (id, organization_id, title, description, owner_user_id, related_portfolio_id, related_program_id, related_project_id, probability, impact, status, mitigation_plan)
VALUES
  -- Risque CRITIQUE (probability=4, impact=5, severity=20)
  (
    'risk-security-api-001',
    'org-acme-corp-123',
    'Vulnérabilité sécurité API Gateway',
    E'L''API Gateway ne supporte pas OAuth 2.0.\nRisque d''accès non autorisé aux données clients.',
    'user-thomas-pm-202',
    'portfolio-transform-digital-001',
    'program-migration-cloud-001',
    'project-migration-apps-002',
    4,  -- Probable
    5,  -- Critique
    'OPEN',
    E'1. Audit sécurité complet (1 semaine)\n2. Implémentation OAuth 2.0 (2 semaines)\n3. Pentest externe (1 semaine)'
  ),
  
  -- Risque MOYEN (probability=3, impact=3, severity=9)
  (
    'risk-skill-gap-002',
    'org-acme-corp-123',
    'Manque de compétences Kubernetes',
    'L''équipe n''a pas d''expérience sur Kubernetes, risque de retard',
    'user-thomas-pm-202',
    'portfolio-transform-digital-001',
    'program-migration-cloud-001',
    'project-migration-apps-002',
    3,  -- Possible
    3,  -- Modéré
    'OPEN',
    'Formation K8s pour 3 devs (1 semaine) + Support externe (2 semaines)'
  ),
  
  -- Risque FERMÉ
  (
    'risk-budget-overrun-003',
    'org-acme-corp-123',
    'Dépassement budget RPA',
    'Budget initial sous-estimé, nécessite 50K€ supplémentaires',
    'user-thomas-pm-202',
    'portfolio-excellence-operationnel-002',
    NULL,
    'project-rpa-finance-001',
    5,  -- Certain
    4,  -- Élevé
    'CLOSED',
    'Budget additionnel validé en COPIL du 15/12/2025'
  );

-- 12. PREDICTIVE SIGNALS (IA)
-- ================================================================
INSERT INTO predictive_signals (id, organization_id, source_type, source_id, signal_type, score, message, recommended_action, is_acknowledged, acknowledged_by_user_id, acknowledged_at)
VALUES
  -- Signal non-ack (HIGH severity)
  (
    'signal-delay-migration-001',
    'org-acme-corp-123',
    'PROJECT',
    'project-migration-apps-002',
    'DELAY_RISK',
    87,
    'Risque élevé de retard de 2 mois détecté sur la migration AKS. Vélocité actuelle: -35% vs planning.',
    'Revoir le planning avec l''équipe, envisager des ressources supplémentaires ou réduire le scope du MVP.',
    false,
    NULL,
    NULL
  ),
  
  -- Signal non-ack (MEDIUM severity)
  (
    'signal-budget-rpa-002',
    'org-acme-corp-123',
    'PROJECT',
    'project-rpa-finance-001',
    'BUDGET_RISK',
    72,
    'Dérive budgétaire détectée: 60% du budget consommé pour 60% d''avancement, mais trend négatif sur les 2 dernières sprints.',
    'Analyser les postes de dépenses supplémentaires, budgéter une réserve de contingence de 10%.',
    false,
    NULL,
    NULL
  ),
  
  -- Signal acknowledged
  (
    'signal-resource-overload-003',
    'org-acme-corp-123',
    'PORTFOLIO',
    'portfolio-transform-digital-001',
    'RESOURCE_OVERLOAD',
    65,
    'Surcharge détectée sur Thomas Leroy (PM): 2 projets critiques simultanés.',
    'Affecter un PM adjoint sur le projet Migration Apps pour libérer du temps.',
    true,
    'user-marie-pmo-456',
    '2025-12-20 10:30:00+00'
  );

-- 13. KPI DEFINITIONS
-- ================================================================
INSERT INTO kpi_definitions (id, organization_id, name, code, description, unit, target_value, direction)
VALUES
  (
    'kpi-project-success-rate-001',
    'org-acme-corp-123',
    'Taux de réussite projets',
    'PROJECT_SUCCESS_RATE',
    'Pourcentage de projets terminés en GREEN sur le total',
    '%',
    85.0,
    'HIGHER_IS_BETTER'
  ),
  (
    'kpi-budget-variance-002',
    'org-acme-corp-123',
    'Budget Variance',
    'BUDGET_VARIANCE',
    'Écart moyen entre budget planifié et réel',
    '%',
    5.0,
    'LOWER_IS_BETTER'
  ),
  (
    'kpi-avg-decision-time-003',
    'org-acme-corp-123',
    'Délai moyen de décision',
    'AVG_DECISION_TIME',
    'Nombre de jours entre création et approbation d''une décision',
    'jours',
    7.0,
    'LOWER_IS_BETTER'
  ),
  (
    'kpi-critical-risks-open-004',
    'org-acme-corp-123',
    'Risques critiques ouverts',
    'CRITICAL_RISKS_OPEN',
    'Nombre de risques avec sévérité >= 15',
    'count',
    0,
    'LOWER_IS_BETTER'
  );

-- 14. KPI VALUES (historique)
-- ================================================================
INSERT INTO kpi_values (id, organization_id, kpi_definition_id, scope_type, scope_id, value, date)
VALUES
  -- PROJECT_SUCCESS_RATE (Organization level)
  ('kpival-001', 'org-acme-corp-123', 'kpi-project-success-rate-001', 'ORGANIZATION', 'org-acme-corp-123', 75.0, '2025-11-01'),
  ('kpival-002', 'org-acme-corp-123', 'kpi-project-success-rate-001', 'ORGANIZATION', 'org-acme-corp-123', 78.5, '2025-12-01'),
  ('kpival-003', 'org-acme-corp-123', 'kpi-project-success-rate-001', 'ORGANIZATION', 'org-acme-corp-123', 82.3, '2026-01-01'),
  
  -- BUDGET_VARIANCE (Portfolio level)
  ('kpival-004', 'org-acme-corp-123', 'kpi-budget-variance-002', 'PORTFOLIO', 'portfolio-transform-digital-001', 12.5, '2025-12-01'),
  ('kpival-005', 'org-acme-corp-123', 'kpi-budget-variance-002', 'PORTFOLIO', 'portfolio-transform-digital-001', 8.7, '2026-01-01'),
  
  -- AVG_DECISION_TIME (Organization level)
  ('kpival-006', 'org-acme-corp-123', 'kpi-avg-decision-time-003', 'ORGANIZATION', 'org-acme-corp-123', 9.5, '2025-12-01'),
  ('kpival-007', 'org-acme-corp-123', 'kpi-avg-decision-time-003', 'ORGANIZATION', 'org-acme-corp-123', 6.2, '2026-01-01'),
  
  -- CRITICAL_RISKS_OPEN (Organization level)
  ('kpival-008', 'org-acme-corp-123', 'kpi-critical-risks-open-004', 'ORGANIZATION', 'org-acme-corp-123', 3, '2025-12-01'),
  ('kpival-009', 'org-acme-corp-123', 'kpi-critical-risks-open-004', 'ORGANIZATION', 'org-acme-corp-123', 1, '2026-01-01');

-- 15. DOCUMENTS
-- ================================================================
INSERT INTO documents (id, organization_id, name, url, type, related_project_id, related_portfolio_id, related_program_id, created_by_user_id, file_size, mime_type)
VALUES
  (
    'doc-charter-migration-001',
    'org-acme-corp-123',
    'Charte Projet Migration Cloud',
    'https://storage.supabase.co/documents/charter-migration-cloud.pdf',
    'CHARTER',
    'project-migration-apps-002',
    'portfolio-transform-digital-001',
    'program-migration-cloud-001',
    'user-thomas-pm-202',
    1024000,
    'application/pdf'
  ),
  (
    'doc-slides-copil-dec-002',
    'org-acme-corp-123',
    'Slides COPIL Décembre 2025',
    'https://storage.supabase.co/documents/copil-dec-2025.pptx',
    'SLIDE',
    NULL,
    'portfolio-transform-digital-001',
    NULL,
    'user-marie-pmo-456',
    5120000,
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  );

-- 16. COMMENTS
-- ================================================================
INSERT INTO comments (id, organization_id, author_user_id, entity_type, entity_id, content)
VALUES
  (
    'comment-001',
    'org-acme-corp-123',
    'user-thomas-pm-202',
    'PROJECT',
    'project-migration-apps-002',
    'Mise à jour: recrutement de 2 devs K8s finalisé, démarrage sprint 5 lundi prochain.'
  ),
  (
    'comment-002',
    'org-acme-corp-123',
    'user-marie-pmo-456',
    'RISK',
    'risk-security-api-001',
    'Risque critique - à traiter en priorité au prochain comité technique.'
  );

-- 17. NOTIFICATIONS
-- ================================================================
INSERT INTO notifications (id, organization_id, user_id, type, title, message, payload, is_read, read_at)
VALUES
  (
    'notif-001',
    'org-acme-corp-123',
    'user-thomas-pm-202',
    'ACTION_DUE',
    'Action à échéance: Recruter 2 développeurs UiPath',
    'Due date: 31 janvier 2026 (dans 22 jours)',
    '{"action_id": "action-recrut-devs-001", "due_date": "2026-01-31"}'::jsonb,
    false,
    NULL
  ),
  (
    'notif-002',
    'org-acme-corp-123',
    'user-marie-pmo-456',
    'PREDICTIVE_SIGNAL',
    'Signal IA: Risque de retard détecté',
    'Score: 87/100 - Projet Migration Apps',
    '{"signal_id": "signal-delay-migration-001", "score": 87}'::jsonb,
    false,
    NULL
  ),
  (
    'notif-003',
    'org-acme-corp-123',
    'user-jean-ceo-789',
    'COMMITTEE_UPCOMING',
    'Comité COPIL le 15 janvier 2026',
    'Dans 6 jours - Ordre du jour disponible',
    '{"committee_id": "committee-copil-jan-002", "date": "2026-01-15T14:00:00Z"}'::jsonb,
    false,
    NULL
  );

-- ================================================================
-- VALIDATION DES DONNÉES
-- ================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Seed data inserted successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Summary:';
  RAISE NOTICE '   - Organizations: %', (SELECT COUNT(*) FROM organizations);
  RAISE NOTICE '   - Users: %', (SELECT COUNT(*) FROM users);
  RAISE NOTICE '   - Portfolios: %', (SELECT COUNT(*) FROM portfolios);
  RAISE NOTICE '   - Programs: %', (SELECT COUNT(*) FROM programs);
  RAISE NOTICE '   - Projects: %', (SELECT COUNT(*) FROM projects);
  RAISE NOTICE '   - Committees: %', (SELECT COUNT(*) FROM committees);
  RAISE NOTICE '   - Decisions: %', (SELECT COUNT(*) FROM decisions);
  RAISE NOTICE '   - Risks: %', (SELECT COUNT(*) FROM risks);
  RAISE NOTICE '   - Predictive Signals: %', (SELECT COUNT(*) FROM predictive_signals);
  RAISE NOTICE '   - KPI Definitions: %', (SELECT COUNT(*) FROM kpi_definitions);
  RAISE NOTICE '   - KPI Values: %', (SELECT COUNT(*) FROM kpi_values);
  RAISE NOTICE '';
  RAISE NOTICE '👤 Test Credentials:';
  RAISE NOTICE '   - marie.dupont@acme.com (PMO)';
  RAISE NOTICE '   - jean.martin@acme.com (Executive/CEO)';
  RAISE NOTICE '   - sophie.bernard@acme.com (Data Analyst)';
  RAISE NOTICE '   - thomas.leroy@acme.com (Project Manager)';
  RAISE NOTICE '   - claire.moreau@acme.com (Project Manager)';
  RAISE NOTICE '   - julien.consultant@external.com (Consultant)';
  RAISE NOTICE '';
  RAISE NOTICE '🔑 Password for all: password123';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Next Steps:';
  RAISE NOTICE '   1. Login with any test user';
  RAISE NOTICE '   2. Navigate to /app/portfolio-view';
  RAISE NOTICE '   3. Explore /app/committees, /app/decisions, /app/risk-intelligence';
END $$;
