-- Table pour stocker les rapports personnalisés
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    report_type TEXT NOT NULL DEFAULT 'custom', -- custom, strategic, financial, operational
    period TEXT, -- Q1 2026, January 2026, etc.
    sections JSONB DEFAULT '{}', -- sections incluses dans le rapport
    data JSONB DEFAULT '{}', -- données du rapport
    status TEXT NOT NULL DEFAULT 'draft', -- draft, published, archived
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS reports_organization_id_idx ON reports(organization_id);
CREATE INDEX IF NOT EXISTS reports_user_id_idx ON reports(user_id);
CREATE INDEX IF NOT EXISTS reports_status_idx ON reports(status);
CREATE INDEX IF NOT EXISTS reports_created_at_idx ON reports(created_at DESC);

-- RLS Policies
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Politique de lecture: voir les rapports de son organisation
CREATE POLICY "Users can view reports from their organization"
    ON reports FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id 
            FROM profiles 
            WHERE id = auth.uid()
        )
    );

-- Politique de création: créer des rapports pour son organisation
CREATE POLICY "Users can create reports for their organization"
    ON reports FOR INSERT
    WITH CHECK (
        organization_id IN (
            SELECT organization_id 
            FROM profiles 
            WHERE id = auth.uid()
        )
        AND user_id = auth.uid()
    );

-- Politique de mise à jour: modifier ses propres rapports
CREATE POLICY "Users can update their own reports"
    ON reports FOR UPDATE
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Politique de suppression: supprimer ses propres rapports
CREATE POLICY "Users can delete their own reports"
    ON reports FOR DELETE
    USING (user_id = auth.uid());

-- Fonction trigger pour updated_at
CREATE OR REPLACE FUNCTION update_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reports_updated_at
    BEFORE UPDATE ON reports
    FOR EACH ROW
    EXECUTE FUNCTION update_reports_updated_at();
