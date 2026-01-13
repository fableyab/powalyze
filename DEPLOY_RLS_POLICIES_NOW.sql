-- =====================================================
-- POLICIES RLS OPTIMISÉES POUR SUPABASE
-- Adaptées au schéma existant (organization_id, user_organizations, owner_id)
-- =====================================================

-- 🔒 1. S'assurer que RLS est activée sur initiatives
alter table public.initiatives enable row level security;

-- 🗑️ 2. Supprimer les anciennes policies (au cas où)
drop policy if exists "select_initiatives_by_org" on public.initiatives;
drop policy if exists "insert_initiatives_by_org" on public.initiatives;
drop policy if exists "update_initiatives_by_org" on public.initiatives;
drop policy if exists "delete_initiatives_by_org" on public.initiatives;

-- 🟦 3. Policy INSERT (création d'une initiative)
-- Autorise uniquement l'utilisateur connecté et uniquement dans une organisation à laquelle il appartient
create policy "allow_insert_initiatives_for_org_members"
on public.initiatives
for insert
to authenticated
with check (
  -- L'utilisateur doit appartenir à l'organisation
  organization_id in (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid()
  )
  -- Si owner_id est fourni, il doit être l'utilisateur connecté (ou null)
  and (owner_id is null or owner_id = auth.uid())
);

-- 🟩 4. Policy SELECT (lecture des initiatives)
-- Permet de lire uniquement les initiatives de l'organisation de l'utilisateur
create policy "allow_select_initiatives_for_org_members"
on public.initiatives
for select
to authenticated
using (
  organization_id in (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid()
  )
);

-- 🟧 5. Policy UPDATE (modification)
-- Autorise l'utilisateur à modifier les initiatives de son organisation
create policy "allow_update_initiatives_for_org_members"
on public.initiatives
for update
to authenticated
using (
  organization_id in (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid()
  )
)
with check (
  organization_id in (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid()
  )
);

-- 🟥 6. Policy DELETE (suppression)
-- Autorise la suppression uniquement pour les initiatives de son organisation
create policy "allow_delete_initiatives_for_org_members"
on public.initiatives
for delete
to authenticated
using (
  organization_id in (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid()
  )
);

-- =====================================================
-- 🎯 RÉSULTAT ATTENDU
-- =====================================================
-- ✅ L'erreur "new row violates row-level security policy" disparaît
-- ✅ L'utilisateur ne peut créer que des initiatives dans son organisation
-- ✅ La sécurité multi-tenant est garantie
-- ✅ Aucun risque d'accès croisé entre organisations
-- =====================================================
