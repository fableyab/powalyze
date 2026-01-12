-- =====================================================
-- FIX RLS POUR CREATION DE PROJETS
-- Création des tables + Correction des policies RLS
-- =====================================================

-- 1. CRÉER LA TABLE ORGANIZATIONS SI ELLE N'EXISTE PAS
CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_id uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Ajouter owner_id si la table existe déjà mais sans cette colonne
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'organizations' 
    AND column_name = 'owner_id'
  ) THEN
    ALTER TABLE public.organizations ADD COLUMN owner_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- 2. CRÉER LA TABLE USER_ORGANIZATIONS SI ELLE N'EXISTE PAS
CREATE TABLE IF NOT EXISTS public.user_organizations (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member',
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, organization_id)
);

-- 3. CRÉER LA TABLE INITIATIVES SI ELLE N'EXISTE PAS
CREATE TABLE IF NOT EXISTS public.initiatives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'planned',
  progress numeric(5,2) NOT NULL DEFAULT 0,
  owner_id uuid REFERENCES auth.users(id),
  start_date date,
  end_date date,
  priority text DEFAULT 'medium',
  budget numeric(12,2),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Ajouter les colonnes manquantes si la table existe déjà
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'initiatives' 
    AND column_name = 'priority'
  ) THEN
    ALTER TABLE public.initiatives ADD COLUMN priority text DEFAULT 'medium';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'initiatives' 
    AND column_name = 'budget'
  ) THEN
    ALTER TABLE public.initiatives ADD COLUMN budget numeric(12,2);
  END IF;
END $$;

-- 4. CRÉER LES INDEX
CREATE INDEX IF NOT EXISTS initiatives_org_idx ON public.initiatives (organization_id);
CREATE INDEX IF NOT EXISTS initiatives_status_idx ON public.initiatives (status);
CREATE INDEX IF NOT EXISTS idx_user_organizations_lookup ON public.user_organizations (user_id, organization_id);

-- 5. Désactiver temporairement RLS sur organizations
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;

-- 6. Activer RLS sur user_organizations
ALTER TABLE public.user_organizations ENABLE ROW LEVEL SECURITY;

-- 7. Activer RLS sur initiatives
ALTER TABLE public.initiatives ENABLE ROW LEVEL SECURITY;

-- 8. Supprimer les anciennes policies user_organizations
DROP POLICY IF EXISTS "Users can view their organizations" ON public.user_organizations;
DROP POLICY IF EXISTS "Users can join organizations" ON public.user_organizations;

-- 9. Créer policies pour user_organizations (permettre lecture et insertion)
CREATE POLICY "select_user_orgs" ON public.user_organizations
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "insert_user_orgs" ON public.user_organizations
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- 10. Supprimer les anciennes policies initiatives
DROP POLICY IF EXISTS "select_initiatives_by_org" ON public.initiatives;
DROP POLICY IF EXISTS "insert_initiatives_by_org" ON public.initiatives;
DROP POLICY IF EXISTS "update_initiatives_by_org" ON public.initiatives;
DROP POLICY IF EXISTS "delete_initiatives_by_org" ON public.initiatives;

-- 11. Recréer la fonction helper (version améliorée)
CREATE OR REPLACE FUNCTION public.user_in_org(org_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_organizations uo
    WHERE uo.organization_id = org_id
      AND uo.user_id = auth.uid()
  );
$$;

-- 12. Créer policies initiatives plus permissives
CREATE POLICY "select_initiatives_by_org" ON public.initiatives
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id 
      FROM public.user_organizations 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "insert_initiatives_by_org" ON public.initiatives
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id 
      FROM public.user_organizations 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "update_initiatives_by_org" ON public.initiatives
  FOR UPDATE USING (
    organization_id IN (
      SELECT organization_id 
      FROM public.user_organizations 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "delete_initiatives_by_org" ON public.initiatives
  FOR DELETE USING (
    organization_id IN (
      SELECT organization_id 
      FROM public.user_organizations 
      WHERE user_id = auth.uid()
    )
  );

-- 13. Ajouter une policy pour créer une org si besoin
CREATE POLICY "users_can_create_orgs" ON public.organizations
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_can_view_their_orgs" ON public.organizations
  FOR SELECT USING (
    id IN (
      SELECT organization_id 
      FROM public.user_organizations 
      WHERE user_id = auth.uid()
    )
  );

-- 14. Créer une organisation par défaut si aucune n'existe
DO $$
DECLARE
  v_org_id uuid;
BEGIN
  -- Vérifier si des organisations existent
  IF NOT EXISTS (SELECT 1 FROM public.organizations LIMIT 1) THEN
    -- Créer une organisation par défaut
    INSERT INTO public.organizations (name, created_at)
    VALUES ('Organisation par défaut', now())
    RETURNING id INTO v_org_id;
    
    RAISE NOTICE 'Organisation par défaut créée avec ID: %', v_org_id;
  END IF;
END $$;

-- =====================================================
-- FIN DU SCRIPT
-- =====================================================

-- Instructions:
-- 1. Copiez ce script dans l'éditeur SQL de Supabase
-- 2. Exécutez-le
-- 3. Testez la création de projet
