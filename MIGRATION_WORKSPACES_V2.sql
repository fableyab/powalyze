-- =====================================================
-- MIGRATION WORKSPACES V2 - OPTION A
-- Architecture multi-tenant avec workspaces + created_by
-- =====================================================
-- ⚠️ BACKUP OBLIGATOIRE AVANT EXÉCUTION
-- ⚠️ Tester d'abord sur un environnement de développement
-- =====================================================

-- =====================================================
-- ÉTAPE 1: AJOUT DE created_by À organizations
-- =====================================================

-- Ajouter la colonne created_by (nullable temporairement)
alter table public.organizations
add column if not exists created_by uuid references auth.users(id);

-- Migrer les données existantes: utiliser le premier admin de chaque org
update public.organizations o
set created_by = (
  select uo.user_id
  from public.user_organizations uo
  where uo.organization_id = o.id
    and uo.role = 'admin'
  order by uo.created_at asc
  limit 1
)
where created_by is null;

-- Si des organisations n'ont pas d'admin, utiliser le premier membre
update public.organizations o
set created_by = (
  select uo.user_id
  from public.user_organizations uo
  where uo.organization_id = o.id
  order by uo.created_at asc
  limit 1
)
where created_by is null;

-- Maintenant rendre la colonne NOT NULL
alter table public.organizations
alter column created_by set not null;

comment on column public.organizations.created_by is 'Créateur de l''organisation';

-- =====================================================
-- ÉTAPE 2: CRÉATION TABLE WORKSPACES
-- =====================================================

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  owner_id uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workspaces_org_idx on public.workspaces (organization_id);
create index if not exists workspaces_owner_idx on public.workspaces (owner_id);

comment on table public.workspaces is 'Espaces de travail au sein d''une organisation';
comment on column public.workspaces.organization_id is 'Organisation parente';
comment on column public.workspaces.owner_id is 'Propriétaire du workspace';

-- =====================================================
-- ÉTAPE 3: CRÉATION TABLE MEMBERSHIPS
-- =====================================================

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

create index if not exists memberships_workspace_idx on public.memberships (workspace_id);
create index if not exists memberships_user_idx on public.memberships (user_id);

comment on table public.memberships is 'Appartenance utilisateur à un workspace';
comment on column public.memberships.role is 'Rôle: owner, admin, member';

-- =====================================================
-- ÉTAPE 4: MIGRATION DES DONNÉES
-- =====================================================

-- Pour chaque organisation, créer un workspace par défaut
insert into public.workspaces (organization_id, name, owner_id, created_at)
select
  o.id as organization_id,
  o.name || ' - Workspace principal' as name,
  o.created_by as owner_id,
  o.created_at as created_at
from public.organizations o
where not exists (
  select 1 from public.workspaces w where w.organization_id = o.id
);

-- Migrer les user_organizations vers memberships
-- Chaque membre d'une organisation devient membre de son workspace par défaut
insert into public.memberships (workspace_id, user_id, role, created_at)
select
  w.id as workspace_id,
  uo.user_id,
  uo.role,
  uo.created_at
from public.user_organizations uo
join public.organizations o on o.id = uo.organization_id
join public.workspaces w on w.organization_id = o.id
where not exists (
  select 1 from public.memberships m
  where m.workspace_id = w.id and m.user_id = uo.user_id
);

-- =====================================================
-- ÉTAPE 5: AJOUT workspace_id À initiatives
-- =====================================================

-- Ajouter la colonne workspace_id (nullable temporairement)
alter table public.initiatives
add column if not exists workspace_id uuid references public.workspaces(id) on delete cascade;

-- Migrer les initiatives vers le workspace par défaut de leur organisation
update public.initiatives i
set workspace_id = (
  select w.id
  from public.workspaces w
  where w.organization_id = i.organization_id
  order by w.created_at asc
  limit 1
)
where workspace_id is null;

-- Rendre la colonne NOT NULL
alter table public.initiatives
alter column workspace_id set not null;

-- Ajouter created_by si manquant
alter table public.initiatives
add column if not exists created_by uuid references auth.users(id);

-- Migrer created_by depuis owner_id
update public.initiatives
set created_by = owner_id
where created_by is null and owner_id is not null;

-- Si created_by est toujours null, utiliser le owner du workspace
update public.initiatives i
set created_by = (
  select w.owner_id
  from public.workspaces w
  where w.id = i.workspace_id
)
where created_by is null;

-- Rendre created_by NOT NULL
alter table public.initiatives
alter column created_by set not null;

create index if not exists initiatives_workspace_idx on public.initiatives (workspace_id);
create index if not exists initiatives_created_by_idx on public.initiatives (created_by);

-- =====================================================
-- ÉTAPE 6: AJOUT workspace_id AUX AUTRES TABLES
-- =====================================================

-- Portfolios
create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  description text,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolios_workspace_idx on public.portfolios (workspace_id);
create index if not exists portfolios_created_by_idx on public.portfolios (created_by);

comment on table public.portfolios is 'Portefeuilles stratégiques de projets';

-- =====================================================
-- ÉTAPE 7: ACTIVER RLS SUR NOUVELLES TABLES
-- =====================================================

alter table public.workspaces enable row level security;
alter table public.memberships enable row level security;
alter table public.portfolios enable row level security;

-- =====================================================
-- ÉTAPE 8: RLS POLICIES POUR ORGANIZATIONS
-- =====================================================

drop policy if exists "organizations_insert" on public.organizations;
drop policy if exists "organizations_select" on public.organizations;
drop policy if exists "organizations_update" on public.organizations;
drop policy if exists "organizations_delete" on public.organizations;

-- INSERT : l'utilisateur connecté crée une organisation
create policy "organizations_insert"
on public.organizations
for insert
to authenticated
with check (
  created_by = auth.uid()
);

-- SELECT : l'utilisateur voit uniquement les organisations qu'il a créées
create policy "organizations_select"
on public.organizations
for select
to authenticated
using (
  created_by = auth.uid()
);

-- UPDATE : seul le créateur peut modifier
create policy "organizations_update"
on public.organizations
for update
to authenticated
using (
  created_by = auth.uid()
)
with check (
  created_by = auth.uid()
);

-- DELETE : seul le créateur peut supprimer
create policy "organizations_delete"
on public.organizations
for delete
to authenticated
using (
  created_by = auth.uid()
);

-- =====================================================
-- ÉTAPE 9: RLS POLICIES POUR WORKSPACES
-- =====================================================

drop policy if exists "workspaces_insert" on public.workspaces;
drop policy if exists "workspaces_select" on public.workspaces;
drop policy if exists "workspaces_update" on public.workspaces;
drop policy if exists "workspaces_delete" on public.workspaces;

-- INSERT : propriétaire = user
create policy "workspaces_insert"
on public.workspaces
for insert
to authenticated
with check (
  owner_id = auth.uid()
);

-- SELECT : les workspaces où l'utilisateur est propriétaire OU membre
create policy "workspaces_select"
on public.workspaces
for select
to authenticated
using (
  owner_id = auth.uid()
  or id in (
    select workspace_id
    from public.memberships
    where user_id = auth.uid()
  )
);

-- UPDATE : seul le propriétaire peut modifier
create policy "workspaces_update"
on public.workspaces
for update
to authenticated
using (
  owner_id = auth.uid()
)
with check (
  owner_id = auth.uid()
);

-- DELETE : seul le propriétaire peut supprimer
create policy "workspaces_delete"
on public.workspaces
for delete
to authenticated
using (
  owner_id = auth.uid()
);

-- =====================================================
-- ÉTAPE 10: RLS POLICIES POUR MEMBERSHIPS
-- =====================================================

drop policy if exists "memberships_insert" on public.memberships;
drop policy if exists "memberships_select" on public.memberships;
drop policy if exists "memberships_update" on public.memberships;
drop policy if exists "memberships_delete" on public.memberships;

-- INSERT : le propriétaire du workspace peut ajouter des membres
create policy "memberships_insert"
on public.memberships
for insert
to authenticated
with check (
  exists (
    select 1
    from public.workspaces w
    where w.id = memberships.workspace_id
    and w.owner_id = auth.uid()
  )
);

-- SELECT : l'utilisateur voit ses memberships + ceux des workspaces qu'il possède
create policy "memberships_select"
on public.memberships
for select
to authenticated
using (
  user_id = auth.uid()
  or workspace_id in (
    select id
    from public.workspaces
    where owner_id = auth.uid()
  )
);

-- UPDATE : seul le propriétaire du workspace peut modifier les rôles
create policy "memberships_update"
on public.memberships
for update
to authenticated
using (
  workspace_id in (
    select id
    from public.workspaces
    where owner_id = auth.uid()
  )
)
with check (
  workspace_id in (
    select id
    from public.workspaces
    where owner_id = auth.uid()
  )
);

-- DELETE : seul le propriétaire peut retirer des membres
create policy "memberships_delete"
on public.memberships
for delete
to authenticated
using (
  workspace_id in (
    select id
    from public.workspaces
    where owner_id = auth.uid()
  )
);

-- =====================================================
-- ÉTAPE 11: RLS POLICIES POUR INITIATIVES (MISE À JOUR)
-- =====================================================

drop policy if exists "select_initiatives_by_org" on public.initiatives;
drop policy if exists "insert_initiatives_by_org" on public.initiatives;
drop policy if exists "update_initiatives_by_org" on public.initiatives;
drop policy if exists "delete_initiatives_by_org" on public.initiatives;

drop policy if exists "allow_insert_initiatives_for_org_members" on public.initiatives;
drop policy if exists "allow_select_initiatives_for_org_members" on public.initiatives;
drop policy if exists "allow_update_initiatives_for_org_members" on public.initiatives;
drop policy if exists "allow_delete_initiatives_for_org_members" on public.initiatives;

-- INSERT : user + workspace dans lequel il est membre
create policy "initiatives_insert"
on public.initiatives
for insert
to authenticated
with check (
  created_by = auth.uid()
  and workspace_id in (
    select workspace_id
    from public.memberships
    where user_id = auth.uid()
  )
);

-- SELECT : initiatives uniquement du workspace du user
create policy "initiatives_select"
on public.initiatives
for select
to authenticated
using (
  workspace_id in (
    select workspace_id
    from public.memberships
    where user_id = auth.uid()
  )
);

-- UPDATE : initiatives que le user a créées dans ses workspaces
create policy "initiatives_update"
on public.initiatives
for update
to authenticated
using (
  created_by = auth.uid()
  and workspace_id in (
    select workspace_id
    from public.memberships
    where user_id = auth.uid()
  )
)
with check (
  created_by = auth.uid()
  and workspace_id in (
    select workspace_id
    from public.memberships
    where user_id = auth.uid()
  )
);

-- DELETE : seul le créateur peut supprimer
create policy "initiatives_delete"
on public.initiatives
for delete
to authenticated
using (
  created_by = auth.uid()
  and workspace_id in (
    select workspace_id
    from public.memberships
    where user_id = auth.uid()
  )
);

-- =====================================================
-- ÉTAPE 12: RLS POLICIES POUR PORTFOLIOS
-- =====================================================

drop policy if exists "portfolios_insert" on public.portfolios;
drop policy if exists "portfolios_select" on public.portfolios;
drop policy if exists "portfolios_update" on public.portfolios;
drop policy if exists "portfolios_delete" on public.portfolios;

create policy "portfolios_insert"
on public.portfolios
for insert
to authenticated
with check (
  created_by = auth.uid()
  and workspace_id in (
    select workspace_id
    from public.memberships
    where user_id = auth.uid()
  )
);

create policy "portfolios_select"
on public.portfolios
for select
to authenticated
using (
  workspace_id in (
    select workspace_id
    from public.memberships
    where user_id = auth.uid()
  )
);

create policy "portfolios_update"
on public.portfolios
for update
to authenticated
using (
  created_by = auth.uid()
  and workspace_id in (
    select workspace_id
    from public.memberships
    where user_id = auth.uid()
  )
)
with check (
  created_by = auth.uid()
  and workspace_id in (
    select workspace_id
    from public.memberships
    where user_id = auth.uid()
  )
);

create policy "portfolios_delete"
on public.portfolios
for delete
to authenticated
using (
  created_by = auth.uid()
  and workspace_id in (
    select workspace_id
    from public.memberships
    where user_id = auth.uid()
  )
);

-- =====================================================
-- ÉTAPE 13: VUES POUR PORTFOLIO (MISE À JOUR)
-- =====================================================

-- Vue agrégée portfolio par workspace
drop view if exists public.portfolio_overview;

create view public.portfolio_overview as
select
  i.workspace_id,
  count(*) as total_projects,
  sum(coalesce(i.progress, 0)) as total_progress,
  avg(coalesce(i.progress, 0)) as avg_progress,
  sum(case when i.status = 'done' then 1 else 0 end) as done_projects,
  sum(case when i.status = 'in_progress' or i.status = 'planned' then 1 else 0 end) as in_progress_projects,
  sum(case when i.status = 'blocked' then 1 else 0 end) as blocked_projects
from public.initiatives i
group by i.workspace_id;

comment on view public.portfolio_overview is 'Vue agrégée des initiatives par workspace';

-- Vue risques par workspace
drop view if exists public.workspace_risks;

create view public.workspace_risks as
select
  i.workspace_id,
  count(r.id) as total_risks,
  avg(coalesce(r.probability * r.impact / 100, 0)) as avg_risk_score,
  sum(case when r.status = 'open' then 1 else 0 end) as open_risks,
  sum(case when r.status = 'mitigated' then 1 else 0 end) as mitigated_risks
from public.initiatives i
left join public.risks r on r.initiative_id = i.id
group by i.workspace_id;

comment on view public.workspace_risks is 'Agrégation des risques par workspace';

-- =====================================================
-- ÉTAPE 14: FONCTIONS HELPER (MISE À JOUR)
-- =====================================================

-- Fonction pour vérifier si un user est membre d'un workspace
create or replace function public.user_in_workspace(ws_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.memberships m
    where m.workspace_id = ws_id
      and m.user_id = auth.uid()
  );
$$;

comment on function public.user_in_workspace is 'Vérifie si l''utilisateur connecté est membre d''un workspace';

-- Fonction pour obtenir le workspace par défaut d'un user
create or replace function public.get_default_workspace()
returns uuid
language sql
security definer
stable
as $$
  select m.workspace_id
  from public.memberships m
  where m.user_id = auth.uid()
  order by m.created_at asc
  limit 1;
$$;

comment on function public.get_default_workspace is 'Retourne le premier workspace de l''utilisateur';

-- =====================================================
-- ÉTAPE 15: TRIGGERS POUR updated_at
-- =====================================================

-- Fonction générique pour updated_at
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger pour workspaces
drop trigger if exists set_workspaces_updated_at on public.workspaces;
create trigger set_workspaces_updated_at
  before update on public.workspaces
  for each row
  execute function public.update_updated_at_column();

-- Trigger pour memberships
drop trigger if exists set_memberships_updated_at on public.memberships;
create trigger set_memberships_updated_at
  before update on public.memberships
  for each row
  execute function public.update_updated_at_column();

-- Trigger pour portfolios
drop trigger if exists set_portfolios_updated_at on public.portfolios;
create trigger set_portfolios_updated_at
  before update on public.portfolios
  for each row
  execute function public.update_updated_at_column();

-- =====================================================
-- ÉTAPE 16: CONTRAINTES SUPPLÉMENTAIRES
-- =====================================================

-- Vérifier que le owner d'un workspace est membre de son organisation parente
alter table public.workspaces
add constraint workspaces_owner_in_org check (
  exists (
    select 1
    from public.user_organizations uo
    where uo.user_id = owner_id
    and uo.organization_id = workspaces.organization_id
  )
);

-- =====================================================
-- ÉTAPE 17: MIGRATION user_organizations (OPTIONNEL)
-- =====================================================

-- OPTION A: Conserver user_organizations en parallèle pour compatibilité
-- (Aucune action nécessaire, les deux tables coexistent)

-- OPTION B: Supprimer user_organizations après migration complète
-- ⚠️ NE PAS EXÉCUTER SI DES SERVICES UTILISENT ENCORE user_organizations

-- drop table if exists public.user_organizations cascade;

-- =====================================================
-- RÉSUMÉ DES CHANGEMENTS
-- =====================================================

-- ✅ organizations.created_by ajouté et renseigné
-- ✅ Table workspaces créée avec workspace par défaut pour chaque org
-- ✅ Table memberships créée avec migration depuis user_organizations
-- ✅ initiatives.workspace_id ajouté et renseigné
-- ✅ initiatives.created_by ajouté et renseigné
-- ✅ Table portfolios créée
-- ✅ RLS policies mises à jour pour toutes les tables
-- ✅ Vues portfolio_overview et workspace_risks créées
-- ✅ Fonctions helper créées (user_in_workspace, get_default_workspace)
-- ✅ Triggers updated_at configurés

-- =====================================================
-- VÉRIFICATIONS POST-MIGRATION
-- =====================================================

-- Vérifier que toutes les organizations ont un created_by
select count(*) as orgs_sans_created_by
from public.organizations
where created_by is null;
-- Résultat attendu: 0

-- Vérifier que toutes les organizations ont au moins un workspace
select o.id, o.name, count(w.id) as nb_workspaces
from public.organizations o
left join public.workspaces w on w.organization_id = o.id
group by o.id, o.name
having count(w.id) = 0;
-- Résultat attendu: aucune ligne

-- Vérifier que toutes les initiatives ont un workspace_id
select count(*) as initiatives_sans_workspace
from public.initiatives
where workspace_id is null;
-- Résultat attendu: 0

-- Vérifier la vue portfolio_overview
select * from public.portfolio_overview limit 5;

-- =====================================================
-- FIN DE LA MIGRATION
-- =====================================================
