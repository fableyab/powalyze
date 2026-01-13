-- =====================================================
-- POLICIES RLS POUR TABLE ORGANIZATIONS
-- =====================================================

-- 🔒 1. Activer la RLS sur la table organizations
alter table public.organizations enable row level security;

-- 🗑️ 2. Supprimer les anciennes policies (au cas où)
drop policy if exists "allow insert organizations" on public.organizations;
drop policy if exists "allow select organizations" on public.organizations;
drop policy if exists "allow update organizations" on public.organizations;
drop policy if exists "allow delete organizations" on public.organizations;

-- 🟦 3. Policy INSERT (création d'une organisation)
-- IMPORTANT: La table organizations n'a PAS de colonne owner_id/created_by
-- L'insertion est libre pour les utilisateurs authentifiés
-- La relation propriétaire est gérée via user_organizations avec role='admin'
create policy "allow insert organizations"
on public.organizations
for insert
to authenticated
with check (true);

-- 🟩 4. Policy SELECT (lecture des organisations)
-- Un utilisateur peut lire uniquement les organisations auxquelles il appartient
create policy "allow select organizations"
on public.organizations
for select
to authenticated
using (
  id in (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid()
  )
);

-- 🟧 5. Policy UPDATE (modification)
-- Un utilisateur peut modifier uniquement les organisations où il est admin
create policy "allow update organizations"
on public.organizations
for update
to authenticated
using (
  id in (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid()
      and role = 'admin'
  )
)
with check (
  id in (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid()
      and role = 'admin'
  )
);

-- 🟥 6. Policy DELETE (suppression)
-- Un utilisateur peut supprimer uniquement les organisations où il est admin
create policy "allow delete organizations"
on public.organizations
for delete
to authenticated
using (
  id in (
    select organization_id
    from public.user_organizations
    where user_id = auth.uid()
      and role = 'admin'
  )
);

-- =====================================================
-- 🎯 RÉSULTAT ATTENDU
-- =====================================================
-- ✅ Les utilisateurs authentifiés peuvent créer des organisations
-- ✅ Après création, ils doivent être liés via user_organizations
-- ✅ Un utilisateur ne voit que les organisations auxquelles il appartient
-- ✅ Seuls les admins peuvent modifier/supprimer leurs organisations
-- ✅ La sécurité multi-tenant est garantie via user_organizations
-- =====================================================

-- =====================================================
-- 📝 NOTES IMPORTANTES
-- =====================================================
-- La table organizations ne contient PAS de colonne owner_id ou created_by
-- Structure actuelle:
--   - id (uuid)
--   - name (text)
--   - created_at (timestamptz)
--
-- La relation propriétaire est gérée par la table user_organizations:
--   - user_id (uuid)
--   - organization_id (uuid)
--   - role (text: 'admin' ou 'member')
--
-- Workflow de création:
-- 1. INSERT dans organizations (policy permet à tous les auth)
-- 2. INSERT dans user_organizations avec role='admin'
-- 3. L'utilisateur devient admin de cette organisation
-- =====================================================
