-- ========================================
-- FIX ULTRA-SIMPLE: Ajouter colonnes manquantes
-- ========================================

-- Ajouter impact_level
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS impact_level text DEFAULT 'medium';

-- Ajouter due_date  
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS due_date date;

-- Ajouter responsible
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS responsible text;

-- Créer les index
CREATE INDEX IF NOT EXISTS decisions_impact_level_idx ON decisions (impact_level);
CREATE INDEX IF NOT EXISTS decisions_due_date_idx ON decisions (due_date);
CREATE INDEX IF NOT EXISTS decisions_status_idx ON decisions (status);

-- Vérifier la structure
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'decisions'
ORDER BY ordinal_position;
