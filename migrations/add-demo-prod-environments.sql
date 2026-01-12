-- Migration: Ajout du système demo/prod pour les organisations
-- Date: 2026-01-12

-- 1. Ajouter le champ environment à organizations
ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS environment text NOT NULL DEFAULT 'prod' CHECK (environment IN ('demo', 'prod'));

-- 2. Ajouter un index pour les requêtes par environment
CREATE INDEX IF NOT EXISTS organizations_environment_idx ON public.organizations (environment);

-- 3. Créer une organisation de démonstration par défaut
INSERT INTO public.organizations (id, name, environment, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Powalyze Demo',
  'demo',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  name = 'Powalyze Demo',
  environment = 'demo';

-- 4. Créer des données de démonstration pour l'organisation demo
-- Initiatives de démo
INSERT INTO public.initiatives (organization_id, name, description, status, progress, start_date, end_date)
VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Transformation Digitale', 'Modernisation de l''infrastructure IT', 'in-progress', 65.00, '2026-01-01', '2026-12-31'),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Excellence Opérationnelle', 'Optimisation des processus métier', 'in-progress', 45.00, '2026-02-01', '2026-11-30'),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Innovation Produit', 'Développement nouvelle gamme', 'planned', 15.00, '2026-03-01', '2027-03-31')
ON CONFLICT DO NOTHING;

-- 5. Décisions de démo
INSERT INTO public.decisions (organization_id, title, description, impact_level, status, due_date)
VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Budget 2026 - Validation finale', 'Approbation du budget annuel par le COMEX', 'high', 'pending', '2026-01-20'),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Recrutement Head of Digital', 'Décision sur le profil pour la direction digitale', 'high', 'pending', '2026-01-25'),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Partenariat stratégique Cloud', 'Choix du fournisseur cloud principal', 'medium', 'in-progress', '2026-02-15')
ON CONFLICT DO NOTHING;

-- 6. Comités de démo
INSERT INTO public.committees (organization_id, name, description, frequency, next_meeting)
VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'COMEX', 'Comité Exécutif mensuel', 'monthly', '2026-01-20'),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Comité IT', 'Comité de pilotage IT', 'bi-weekly', '2026-01-18'),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Comité Risques', 'Revue des risques et conformité', 'quarterly', '2026-02-05')
ON CONFLICT DO NOTHING;

-- 7. Documents de démo
INSERT INTO public.documents (organization_id, title, type, url, uploaded_by)
VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Budget 2026 - Synthèse', 'financial', '#', NULL),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Roadmap Digitale Q1-Q2', 'strategy', '#', NULL),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'KPIs Mensuels - Décembre 2025', 'report', '#', NULL)
ON CONFLICT DO NOTHING;

-- 8. Mettre à jour la politique RLS pour inclure le filtre environment si nécessaire
-- (Les policies existantes filtrent déjà par organization_id, donc pas de changement RLS requis)

-- 9. Créer une vue pour faciliter l'accès aux organisations demo/prod
CREATE OR REPLACE VIEW public.v_organizations_with_stats AS
SELECT 
  o.id,
  o.name,
  o.environment,
  o.created_at,
  COUNT(DISTINCT uo.user_id) as user_count,
  COUNT(DISTINCT i.id) as initiative_count,
  COUNT(DISTINCT d.id) as decision_count
FROM public.organizations o
LEFT JOIN public.user_organizations uo ON uo.organization_id = o.id
LEFT JOIN public.initiatives i ON i.organization_id = o.id
LEFT JOIN public.decisions d ON d.organization_id = o.id
GROUP BY o.id, o.name, o.environment, o.created_at;

COMMENT ON TABLE public.organizations IS 'Table des organisations avec support demo/prod. Environment = demo pour démos, prod pour clients réels';
COMMENT ON COLUMN public.organizations.environment IS 'Type d''environnement: demo (données de démonstration) ou prod (données clients réelles)';
