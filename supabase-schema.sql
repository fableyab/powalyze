-- ============================================================================
-- POWALYZE - SCHÉMA SUPABASE COMPLET
-- Cockpit de gouvernance multi-tenant
-- ============================================================================

-- ============================================================================
-- 1. TABLES DE BASE (MULTI-TENANT)
-- ============================================================================

-- ORGANISATIONS
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

-- LIEN UTILISATEURS <-> ORGANISATIONS
create table public.user_organizations (
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (user_id, organization_id)
);

-- ============================================================================
-- 2. INITIATIVES / PROJETS / PORTEFEUILLES
-- ============================================================================

create table public.initiatives (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'planned', -- planned | in_progress | delayed | done
  progress numeric(5,2) not null default 0, -- 0-100
  owner_id uuid references auth.users(id),
  start_date date,
  end_date date,
  created_at timestamptz not null default now()
);

create index initiatives_org_idx on public.initiatives (organization_id);
create index initiatives_status_idx on public.initiatives (status);

-- ============================================================================
-- 3. JALONS (PULSE DES ENJEUX)
-- ============================================================================

create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  initiative_id uuid not null references public.initiatives(id) on delete cascade,
  name text not null,
  due_date date not null,
  status text not null default 'upcoming', -- upcoming | done | delayed
  criticality text not null default 'medium', -- low | medium | high
  created_at timestamptz not null default now()
);

create index milestones_initiative_idx on public.milestones (initiative_id);
create index milestones_due_date_idx on public.milestones (due_date);

-- ============================================================================
-- 4. RISQUES & ACTIONS
-- ============================================================================

create table public.risks (
  id uuid primary key default gen_random_uuid(),
  initiative_id uuid not null references public.initiatives(id) on delete cascade,
  name text not null,
  description text,
  probability numeric(5,2) not null default 0, -- 0-100
  impact numeric(5,2) not null default 0,      -- 0-100
  status text not null default 'open', -- open | mitigated | closed
  created_at timestamptz not null default now()
);

create index risks_initiative_idx on public.risks (initiative_id);

create table public.risk_actions (
  id uuid primary key default gen_random_uuid(),
  risk_id uuid not null references public.risks(id) on delete cascade,
  name text not null,
  status text not null default 'open', -- open | in_progress | done
  owner_id uuid references auth.users(id),
  due_date date,
  created_at timestamptz not null default now()
);

create index risk_actions_risk_idx on public.risk_actions (risk_id);

-- ============================================================================
-- 5. DÉCISIONS (PRIORITÉS DU MOMENT)
-- ============================================================================

create table public.decisions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  description text,
  impact_level text not null default 'medium', -- low | medium | high
  due_date date,
  status text not null default 'pending', -- pending | in_progress | done
  created_at timestamptz not null default now()
);

create index decisions_org_idx on public.decisions (organization_id);
create index decisions_status_idx on public.decisions (status);
create index decisions_due_date_idx on public.decisions (due_date);

-- ============================================================================
-- 6. RESSOURCES & CAPACITÉ
-- ============================================================================

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create index teams_org_idx on public.teams (organization_id);

create table public.team_capacity (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  period text not null, -- format libre : semaine, mois, trimestre
  capacity numeric(10,2) not null default 100,
  used numeric(10,2) not null default 0,
  created_at timestamptz not null default now(),
  unique (team_id, period)
);

create index team_capacity_team_idx on public.team_capacity (team_id);
create index team_capacity_period_idx on public.team_capacity (period);

-- ============================================================================
-- 7. TENSIONS (HEATMAP)
-- ============================================================================

create table public.tensions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  domain text not null, -- strategie | execution | ressources | dependances | qualite | conformite
  level numeric(5,2) not null default 0, -- 0-100
  created_at timestamptz not null default now()
);

create index tensions_org_idx on public.tensions (organization_id);
create index tensions_domain_idx on public.tensions (domain);

-- ============================================================================
-- 8. FOCUS DU JOUR
-- ============================================================================

create table public.focus_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  type text not null, -- secure | accelerate | arbitrate
  description text not null,
  created_at timestamptz not null default now()
);

create index focus_items_org_idx on public.focus_items (organization_id);
create index focus_items_type_idx on public.focus_items (type);

-- ============================================================================
-- 9. VUES POUR LE COCKPIT
-- ============================================================================

-- 9.1. Santé globale
create or replace view public.global_health_view as
select
  o.id as organization_id,
  coalesce(avg(i.progress), 0) as avg_progress,
  coalesce(avg(case when i.status = 'done' then 100 else 0 end), 0) as commitments,
  coalesce(avg(r.probability * r.impact / 100), 0) as risk_score,
  (
    coalesce(avg(i.progress), 0) * 0.3
    + coalesce(avg(case when i.status = 'done' then 100 else 0 end), 0) * 0.3
    + (100 - coalesce(avg(r.probability * r.impact / 100), 0)) * 0.4
  ) as global_score
from public.organizations o
left join public.initiatives i on i.organization_id = o.id
left join public.risks r on r.initiative_id = i.id
group by o.id;

-- 9.2. Signal global
create or replace view public.global_signal as
select
  organization_id,
  global_score,
  case
    when global_score < 60 then 'critique'
    when global_score < 75 then 'tension'
    else 'ok'
  end as signal
from public.global_health_view;

-- 9.3. Pulse des enjeux
create or replace view public.pulse_milestones as
select
  m.id,
  i.organization_id,
  m.initiative_id,
  m.name,
  m.due_date,
  m.status,
  m.criticality,
  extract(epoch from (m.due_date::timestamptz - now())) / 86400 as days_remaining
from public.milestones m
join public.initiatives i on i.id = m.initiative_id;

-- 9.4. Heatmap des tensions
create or replace view public.tension_heatmap as
select
  organization_id,
  domain,
  avg(level) as avg_level
from public.tensions
group by organization_id, domain;

-- 9.5. Capacité & charge
create or replace view public.team_load as
select
  t.organization_id,
  t.name,
  c.period,
  c.capacity,
  c.used,
  case
    when c.capacity = 0 then null
    else (c.used::float / c.capacity)
  end as saturation
from public.teams t
join public.team_capacity c on c.team_id = t.id;

-- 9.6. Priorités du moment
create or replace view public.priority_decisions as
select
  id,
  organization_id,
  title,
  impact_level,
  due_date,
  status,
  created_at
from public.decisions
where status != 'done'
order by
  case impact_level
    when 'high' then 3
    when 'medium' then 2
    else 1
  end desc,
  due_date nulls last;

-- ============================================================================
-- 10. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Activer RLS sur toutes les tables métier
alter table public.user_organizations enable row level security;
alter table public.initiatives enable row level security;
alter table public.milestones enable row level security;
alter table public.risks enable row level security;
alter table public.risk_actions enable row level security;
alter table public.decisions enable row level security;
alter table public.teams enable row level security;
alter table public.team_capacity enable row level security;
alter table public.tensions enable row level security;
alter table public.focus_items enable row level security;

-- Fonction helper pour vérifier que l'utilisateur appartient à l'organisation
create or replace function public.user_in_org(org_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.user_organizations uo
    where uo.organization_id = org_id
      and uo.user_id = auth.uid()
  );
$$;

-- ============================================================================
-- POLICIES : INITIATIVES
-- ============================================================================

create policy "select_initiatives_by_org"
  on public.initiatives
  for select
  using ( public.user_in_org(organization_id) );

create policy "insert_initiatives_by_org"
  on public.initiatives
  for insert
  with check ( public.user_in_org(organization_id) );

create policy "update_initiatives_by_org"
  on public.initiatives
  for update
  using ( public.user_in_org(organization_id) )
  with check ( public.user_in_org(organization_id) );

create policy "delete_initiatives_by_org"
  on public.initiatives
  for delete
  using ( public.user_in_org(organization_id) );

-- ============================================================================
-- POLICIES : MILESTONES
-- ============================================================================

create policy "select_milestones_by_org"
  on public.milestones
  for select
  using (
    exists (
      select 1
      from public.initiatives i
      where i.id = milestones.initiative_id
        and public.user_in_org(i.organization_id)
    )
  );

create policy "insert_milestones_by_org"
  on public.milestones
  for insert
  with check (
    exists (
      select 1
      from public.initiatives i
      where i.id = milestones.initiative_id
        and public.user_in_org(i.organization_id)
    )
  );

create policy "update_milestones_by_org"
  on public.milestones
  for update
  using (
    exists (
      select 1
      from public.initiatives i
      where i.id = milestones.initiative_id
        and public.user_in_org(i.organization_id)
    )
  )
  with check (
    exists (
      select 1
      from public.initiatives i
      where i.id = milestones.initiative_id
        and public.user_in_org(i.organization_id)
    )
  );

create policy "delete_milestones_by_org"
  on public.milestones
  for delete
  using (
    exists (
      select 1
      from public.initiatives i
      where i.id = milestones.initiative_id
        and public.user_in_org(i.organization_id)
    )
  );

-- ============================================================================
-- POLICIES : RISKS
-- ============================================================================

create policy "select_risks_by_org"
  on public.risks
  for select
  using (
    exists (
      select 1
      from public.initiatives i
      where i.id = risks.initiative_id
        and public.user_in_org(i.organization_id)
    )
  );

create policy "insert_risks_by_org"
  on public.risks
  for insert
  with check (
    exists (
      select 1
      from public.initiatives i
      where i.id = risks.initiative_id
        and public.user_in_org(i.organization_id)
    )
  );

create policy "update_risks_by_org"
  on public.risks
  for update
  using (
    exists (
      select 1
      from public.initiatives i
      where i.id = risks.initiative_id
        and public.user_in_org(i.organization_id)
    )
  )
  with check (
    exists (
      select 1
      from public.initiatives i
      where i.id = risks.initiative_id
        and public.user_in_org(i.organization_id)
    )
  );

create policy "delete_risks_by_org"
  on public.risks
  for delete
  using (
    exists (
      select 1
      from public.initiatives i
      where i.id = risks.initiative_id
        and public.user_in_org(i.organization_id)
    )
  );

-- ============================================================================
-- POLICIES : RISK_ACTIONS
-- ============================================================================

create policy "select_risk_actions_by_org"
  on public.risk_actions
  for select
  using (
    exists (
      select 1
      from public.risks r
      join public.initiatives i on i.id = r.initiative_id
      where r.id = risk_actions.risk_id
        and public.user_in_org(i.organization_id)
    )
  );

create policy "insert_risk_actions_by_org"
  on public.risk_actions
  for insert
  with check (
    exists (
      select 1
      from public.risks r
      join public.initiatives i on i.id = r.initiative_id
      where r.id = risk_actions.risk_id
        and public.user_in_org(i.organization_id)
    )
  );

create policy "update_risk_actions_by_org"
  on public.risk_actions
  for update
  using (
    exists (
      select 1
      from public.risks r
      join public.initiatives i on i.id = r.initiative_id
      where r.id = risk_actions.risk_id
        and public.user_in_org(i.organization_id)
    )
  )
  with check (
    exists (
      select 1
      from public.risks r
      join public.initiatives i on i.id = r.initiative_id
      where r.id = risk_actions.risk_id
        and public.user_in_org(i.organization_id)
    )
  );

create policy "delete_risk_actions_by_org"
  on public.risk_actions
  for delete
  using (
    exists (
      select 1
      from public.risks r
      join public.initiatives i on i.id = r.initiative_id
      where r.id = risk_actions.risk_id
        and public.user_in_org(i.organization_id)
    )
  );

-- ============================================================================
-- POLICIES : DECISIONS
-- ============================================================================

create policy "select_decisions_by_org"
  on public.decisions
  for select
  using ( public.user_in_org(organization_id) );

create policy "insert_decisions_by_org"
  on public.decisions
  for insert
  with check ( public.user_in_org(organization_id) );

create policy "update_decisions_by_org"
  on public.decisions
  for update
  using ( public.user_in_org(organization_id) )
  with check ( public.user_in_org(organization_id) );

create policy "delete_decisions_by_org"
  on public.decisions
  for delete
  using ( public.user_in_org(organization_id) );

-- ============================================================================
-- POLICIES : TEAMS
-- ============================================================================

create policy "select_teams_by_org"
  on public.teams
  for select
  using ( public.user_in_org(organization_id) );

create policy "insert_teams_by_org"
  on public.teams
  for insert
  with check ( public.user_in_org(organization_id) );

create policy "update_teams_by_org"
  on public.teams
  for update
  using ( public.user_in_org(organization_id) )
  with check ( public.user_in_org(organization_id) );

create policy "delete_teams_by_org"
  on public.teams
  for delete
  using ( public.user_in_org(organization_id) );

-- ============================================================================
-- POLICIES : TEAM_CAPACITY
-- ============================================================================

create policy "select_team_capacity_by_org"
  on public.team_capacity
  for select
  using (
    exists (
      select 1
      from public.teams t
      where t.id = team_capacity.team_id
        and public.user_in_org(t.organization_id)
    )
  );

create policy "insert_team_capacity_by_org"
  on public.team_capacity
  for insert
  with check (
    exists (
      select 1
      from public.teams t
      where t.id = team_capacity.team_id
        and public.user_in_org(t.organization_id)
    )
  );

create policy "update_team_capacity_by_org"
  on public.team_capacity
  for update
  using (
    exists (
      select 1
      from public.teams t
      where t.id = team_capacity.team_id
        and public.user_in_org(t.organization_id)
    )
  )
  with check (
    exists (
      select 1
      from public.teams t
      where t.id = team_capacity.team_id
        and public.user_in_org(t.organization_id)
    )
  );

create policy "delete_team_capacity_by_org"
  on public.team_capacity
  for delete
  using (
    exists (
      select 1
      from public.teams t
      where t.id = team_capacity.team_id
        and public.user_in_org(t.organization_id)
    )
  );

-- ============================================================================
-- POLICIES : TENSIONS
-- ============================================================================

create policy "select_tensions_by_org"
  on public.tensions
  for select
  using ( public.user_in_org(organization_id) );

create policy "insert_tensions_by_org"
  on public.tensions
  for insert
  with check ( public.user_in_org(organization_id) );

create policy "update_tensions_by_org"
  on public.tensions
  for update
  using ( public.user_in_org(organization_id) )
  with check ( public.user_in_org(organization_id) );

create policy "delete_tensions_by_org"
  on public.tensions
  for delete
  using ( public.user_in_org(organization_id) );

-- ============================================================================
-- POLICIES : FOCUS_ITEMS
-- ============================================================================

create policy "select_focus_items_by_org"
  on public.focus_items
  for select
  using ( public.user_in_org(organization_id) );

create policy "insert_focus_items_by_org"
  on public.focus_items
  for insert
  with check ( public.user_in_org(organization_id) );

create policy "update_focus_items_by_org"
  on public.focus_items
  for update
  using ( public.user_in_org(organization_id) )
  with check ( public.user_in_org(organization_id) );

create policy "delete_focus_items_by_org"
  on public.focus_items
  for delete
  using ( public.user_in_org(organization_id) );

-- ============================================================================
-- FIN DU SCHÉMA
-- ============================================================================
