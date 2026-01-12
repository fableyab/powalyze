-- Table pour les invitations d'équipe
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  invited_by_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'analyst', 'viewer')),
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'cancelled')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT unique_email_org UNIQUE (email, organization_id)
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_invitations_token ON invitations(token);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON invitations(email);
CREATE INDEX IF NOT EXISTS idx_invitations_organization ON invitations(organization_id);
CREATE INDEX IF NOT EXISTS idx_invitations_status ON invitations(status);

-- RLS (Row Level Security)
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Policy: Les admins peuvent voir les invitations de leur organisation
CREATE POLICY "Users can view invitations for their organization"
  ON invitations FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM user_organizations 
      WHERE user_id = auth.uid()
    )
  );

-- Policy: Les admins peuvent créer des invitations pour leur organisation
CREATE POLICY "Admins can create invitations"
  ON invitations FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id 
      FROM user_organizations 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'manager')
    )
  );

-- Policy: Les admins peuvent mettre à jour les invitations de leur organisation
CREATE POLICY "Admins can update invitations"
  ON invitations FOR UPDATE
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM user_organizations 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'manager')
    )
  );

-- Policy: Les admins peuvent supprimer les invitations de leur organisation
CREATE POLICY "Admins can delete invitations"
  ON invitations FOR DELETE
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM user_organizations 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'manager')
    )
  );

-- Fonction pour nettoyer les invitations expirées
CREATE OR REPLACE FUNCTION update_expired_invitations()
RETURNS void AS $$
BEGIN
  UPDATE invitations
  SET status = 'expired'
  WHERE status = 'pending'
  AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Mise à jour de la table user_organizations pour ajouter des champs supplémentaires
ALTER TABLE user_organizations 
ADD COLUMN IF NOT EXISTS invited_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS invited_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Trigger pour mettre à jour last_active_at
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_active_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_last_active
  BEFORE UPDATE ON user_organizations
  FOR EACH ROW
  EXECUTE FUNCTION update_last_active();

-- Commentaires pour documentation
COMMENT ON TABLE invitations IS 'Stocke les invitations envoyées aux membres d''équipe';
COMMENT ON COLUMN invitations.token IS 'Token unique pour valider l''invitation (utilisé dans l''URL)';
COMMENT ON COLUMN invitations.expires_at IS 'Date d''expiration de l''invitation (par défaut: 7 jours)';
COMMENT ON COLUMN invitations.status IS 'Statut: pending (en attente), accepted (acceptée), expired (expirée), cancelled (annulée)';
