-- =====================================================
-- TABLE ALERTS POUR SYSTÈME D'ALERTES AUTOMATIQUES
-- =====================================================

create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  type text not null, -- 'risk', 'decision', 'project', 'milestone'
  severity text not null default 'medium', -- 'low', 'medium', 'high', 'critical'
  title text not null,
  message text not null,
  related_id uuid, -- ID de l'entité liée (projet, risque, décision)
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists alerts_org_idx on public.alerts (organization_id);
create index if not exists alerts_type_idx on public.alerts (type);
create index if not exists alerts_severity_idx on public.alerts (severity);
create index if not exists alerts_is_read_idx on public.alerts (is_read);
create index if not exists alerts_created_at_idx on public.alerts (created_at desc);

-- RLS pour alerts
alter table public.alerts enable row level security;

create policy "select_alerts_by_org" on public.alerts
  for select using ( public.user_in_org(organization_id) );

create policy "insert_alerts_by_org" on public.alerts
  for insert with check ( public.user_in_org(organization_id) );

create policy "update_alerts_by_org" on public.alerts
  for update using ( public.user_in_org(organization_id) );

create policy "delete_alerts_by_org" on public.alerts
  for delete using ( public.user_in_org(organization_id) );

-- =====================================================
-- FIN TABLE ALERTS
-- =====================================================
