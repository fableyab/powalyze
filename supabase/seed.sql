-- Script de seed pour données de démo Powalyze

-- ORGANISATION DE DEMO
insert into organizations (id, name)
values ('00000000-0000-0000-0000-000000000001', 'Powalyze Demo Org')
on conflict (id) do nothing;

-- INITIATIVES
insert into initiatives (organization_id, name, progress, status, description)
values
('00000000-0000-0000-0000-000000000001', 'Migration Cloud', 72, 'in_progress', 'Migration complète de l''infrastructure vers le cloud'),
('00000000-0000-0000-0000-000000000001', 'Refonte CRM', 45, 'delayed', 'Modernisation du système CRM'),
('00000000-0000-0000-0000-000000000001', 'Programme Q3', 88, 'in_progress', 'Objectifs stratégiques du trimestre')
on conflict do nothing;

-- JALONS
insert into milestones (initiative_id, name, due_date, status, criticality)
select 
  i.id, 
  'Kickoff projet', 
  now() + interval '3 days', 
  'upcoming', 
  'high'
from initiatives i 
where i.name = 'Migration Cloud'
on conflict do nothing;

insert into milestones (initiative_id, name, due_date, status, criticality)
select 
  i.id, 
  'Sprint Review', 
  now() + interval '7 days', 
  'upcoming', 
  'medium'
from initiatives i 
where i.name = 'Refonte CRM'
on conflict do nothing;

-- RISQUES
insert into risks (initiative_id, name, probability, impact, description)
select 
  i.id,
  'Risque de surcharge équipe',
  60,
  70,
  'Risque de saturation des ressources clés'
from initiatives i 
where i.name = 'Migration Cloud'
on conflict do nothing;

insert into risks (initiative_id, name, probability, impact, description)
select 
  i.id,
  'Dépendances externes critiques',
  55,
  80,
  'Dépendances sur des fournisseurs externes'
from initiatives i 
where i.name = 'Programme Q3'
on conflict do nothing;

-- TENSIONS
insert into tensions (organization_id, domain, level)
values
('00000000-0000-0000-0000-000000000001', 'execution', 78),
('00000000-0000-0000-0000-000000000001', 'ressources', 82),
('00000000-0000-0000-0000-000000000001', 'strategie', 55),
('00000000-0000-0000-0000-000000000001', 'dependances', 60),
('00000000-0000-0000-0000-000000000001', 'qualite', 30),
('00000000-0000-0000-0000-000000000001', 'conformite', 50)
on conflict do nothing;

-- TEAMS
insert into teams (organization_id, name)
values
('00000000-0000-0000-0000-000000000001', 'Delivery'),
('00000000-0000-0000-0000-000000000001', 'Support'),
('00000000-0000-0000-0000-000000000001', 'Gouvernance')
on conflict do nothing;

-- CAPACITY
insert into team_capacity (team_id, period, capacity, used)
select id, '2025-W12', 100, 88 from teams where name='Delivery'
on conflict do nothing;

insert into team_capacity (team_id, period, capacity, used)
select id, '2025-W12', 100, 55 from teams where name='Support'
on conflict do nothing;

insert into team_capacity (team_id, period, capacity, used)
select id, '2025-W12', 100, 70 from teams where name='Gouvernance'
on conflict do nothing;

-- DECISIONS
insert into decisions (organization_id, title, impact_level, due_date, description)
values
('00000000-0000-0000-0000-000000000001', 'Arbitrer les ressources clés', 'high', now() + interval '2 days', 'Décision stratégique sur l''allocation des ressources'),
('00000000-0000-0000-0000-000000000001', 'Valider le cadrage Q3', 'high', now() + interval '1 day', 'Validation du périmètre du programme'),
('00000000-0000-0000-0000-000000000001', 'Confirmer les jalons critiques', 'medium', now() + interval '5 days', 'Confirmation des dates clés')
on conflict do nothing;

-- FOCUS DU JOUR
insert into focus_items (organization_id, type, description)
values
('00000000-0000-0000-0000-000000000001', 'secure', 'Stabiliser les jalons critiques sous tension.'),
('00000000-0000-0000-0000-000000000001', 'accelerate', 'Lever les blocages sur les initiatives clés.'),
('00000000-0000-0000-0000-000000000001', 'arbitrate', 'Éclaircir les choix de priorisation.')
on conflict do nothing;
