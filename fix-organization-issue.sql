-- =====================================================
-- FIX: Organisation manquante pour l'utilisateur
-- =====================================================

-- 1. Créer une organisation par défaut si elle n'existe pas
INSERT INTO public.organizations (id, name, created_at)
VALUES (
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'Powalyze Demo Organization',
  now()
)
ON CONFLICT (id) DO NOTHING;

-- 2. Vérifier si la table profiles existe
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id),
  full_name text,
  avatar_url text,
  role text default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Créer l'index sur organization_id
CREATE INDEX IF NOT EXISTS profiles_organization_idx ON public.profiles (organization_id);

-- 4. Ajouter organization_id pour l'utilisateur existant (4fef37d8-b86a-496f-b7bb-4aeec90a470a)
INSERT INTO public.profiles (id, organization_id, role, created_at)
VALUES (
  '4fef37d8-b86a-496f-b7bb-4aeec90a470a'::uuid,
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'admin',
  now()
)
ON CONFLICT (id) DO UPDATE
SET organization_id = 'a0000000-0000-0000-0000-000000000001'::uuid,
    role = 'admin';

-- 5. Créer le lien user_organizations si nécessaire
INSERT INTO public.user_organizations (user_id, organization_id, role, created_at)
VALUES (
  '4fef37d8-b86a-496f-b7bb-4aeec90a470a'::uuid,
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'admin',
  now()
)
ON CONFLICT (user_id, organization_id) DO NOTHING;

-- 6. Activer RLS sur profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 7. Créer les policies RLS pour profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 8. Policy pour permettre la lecture entre membres de la même organisation
DROP POLICY IF EXISTS "Users can view profiles in same org" ON public.profiles;
CREATE POLICY "Users can view profiles in same org"
  ON public.profiles
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

-- 9. Vérifier que la table documents a la bonne structure
CREATE TABLE IF NOT EXISTS public.documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  file_path text not null,
  file_size bigint,
  file_type text,
  created_at timestamptz not null default now()
);

-- 10. Index pour documents
CREATE INDEX IF NOT EXISTS documents_org_idx ON public.documents (organization_id);
CREATE INDEX IF NOT EXISTS documents_user_idx ON public.documents (user_id);

-- 11. RLS pour documents
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view org documents" ON public.documents;
CREATE POLICY "Users can view org documents"
  ON public.documents
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert documents" ON public.documents;
CREATE POLICY "Users can insert documents"
  ON public.documents
  FOR INSERT
  WITH CHECK (
    user_id = auth.uid()
    AND organization_id IN (
      SELECT organization_id 
      FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Afficher l'utilisateur et son organisation
SELECT 
  p.id as profile_id,
  p.organization_id,
  p.role,
  o.name as organization_name
FROM public.profiles p
LEFT JOIN public.organizations o ON o.id = p.organization_id
WHERE p.id = '4fef37d8-b86a-496f-b7bb-4aeec90a470a'::uuid;
