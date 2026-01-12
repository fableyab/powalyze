-- ========================================
-- CRÉATION COMPLÈTE DES TABLES
-- Date: 2026-01-12
-- ========================================

-- Supprimer et recréer la table risks
DROP TABLE IF EXISTS risks CASCADE;

CREATE TABLE risks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  probability numeric(3,2) DEFAULT 0.5,
  impact numeric(3,2) DEFAULT 0.5,
  status text NOT NULL DEFAULT 'open',
  mitigation_plan text,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX risks_organization_id_idx ON risks (organization_id);
CREATE INDEX risks_status_idx ON risks (status);
CREATE INDEX risks_probability_idx ON risks (probability);
CREATE INDEX risks_impact_idx ON risks (impact);

-- Ajouter colonnes manquantes à decisions
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS impact_level text DEFAULT 'medium';
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS due_date date;
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS responsible text;

CREATE INDEX IF NOT EXISTS decisions_impact_level_idx ON decisions (impact_level);
CREATE INDEX IF NOT EXISTS decisions_due_date_idx ON decisions (due_date);

-- Vérifier
SELECT 'RISKS' as table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'risks'
UNION ALL
SELECT 'DECISIONS' as table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'decisions'
ORDER BY table_name, column_name;
