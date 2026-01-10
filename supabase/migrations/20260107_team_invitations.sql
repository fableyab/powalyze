-- Migration: Système d'invitation d'équipe
-- Date: 2026-01-07
-- Description: Ajoute la table team pour gérer les invitations et membres

-- 1. Table team pour gérer les membres et invitations
CREATE TABLE IF NOT EXISTS public.team (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    role user_role DEFAULT 'viewer',
    tenant_id UUID REFERENCES public.tenants(id) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'invited' CHECK (status IN ('invited', 'active', 'suspended')),
    invited_by UUID REFERENCES public.profiles(id),
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Éviter les doublons email par tenant
    UNIQUE(email, tenant_id)
);

COMMENT ON TABLE public.team IS 'Gestion des membres d''équipe et invitations. Data Classification: Confidential';
COMMENT ON COLUMN public.team.status IS 'invited: en attente, active: accepté, suspended: suspendu';

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_team_tenant ON public.team(tenant_id);
CREATE INDEX IF NOT EXISTS idx_team_user ON public.team(user_id);
CREATE INDEX IF NOT EXISTS idx_team_status ON public.team(status);

-- 2. Trigger pour synchroniser auth.users → profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insérer automatiquement dans profiles lors de la création d'un user
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;
  
  -- Mettre à jour le statut team si invitation existante
  UPDATE public.team
  SET user_id = NEW.id, status = 'active', updated_at = NOW()
  WHERE email = NEW.email AND status = 'invited';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger sur auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user IS 'Synchronise automatiquement auth.users avec profiles et team';

-- 3. Fonction pour obtenir les membres d'un tenant
CREATE OR REPLACE FUNCTION public.get_team_members(tenant_uuid UUID)
RETURNS TABLE (
  id UUID,
  email TEXT,
  name TEXT,
  role user_role,
  status TEXT,
  invited_at TIMESTAMPTZ,
  invited_by_name TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.email,
    COALESCE(p.name, split_part(t.email, '@', 1)) as name,
    t.role,
    t.status,
    t.invited_at,
    inviter.name as invited_by_name
  FROM public.team t
  LEFT JOIN public.profiles p ON t.user_id = p.id
  LEFT JOIN public.profiles inviter ON t.invited_by = inviter.id
  WHERE t.tenant_id = tenant_uuid
  ORDER BY t.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. RLS Policies pour table team
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;

-- Policy: Admin peut tout voir dans son tenant
CREATE POLICY "Admin can view team in their tenant"
  ON public.team FOR SELECT
  USING (
    tenant_id IN (
      SELECT tenant_id FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'pmo')
    )
  );

-- Policy: Admin peut créer des membres
CREATE POLICY "Admin can invite team members"
  ON public.team FOR INSERT
  WITH CHECK (
    tenant_id IN (
      SELECT tenant_id FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'pmo')
    )
  );

-- Policy: Admin peut modifier les membres
CREATE POLICY "Admin can update team members"
  ON public.team FOR UPDATE
  USING (
    tenant_id IN (
      SELECT tenant_id FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'pmo')
    )
  );

-- Policy: Admin peut supprimer des membres
CREATE POLICY "Admin can delete team members"
  ON public.team FOR DELETE
  USING (
    tenant_id IN (
      SELECT tenant_id FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'pmo')
    )
  );

-- 5. Fonction pour nettoyer les invitations expirées (optionnel)
CREATE OR REPLACE FUNCTION public.cleanup_expired_invitations()
RETURNS void AS $$
BEGIN
  -- Supprimer les invitations non acceptées après 30 jours
  DELETE FROM public.team
  WHERE status = 'invited' 
  AND invited_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.cleanup_expired_invitations IS 'Supprime les invitations expirées après 30 jours';
