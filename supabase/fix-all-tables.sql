-- ========================================
-- FIX COMPLET: Tables decisions + risks
-- Date: 2026-01-12
-- ========================================

-- TABLE DECISIONS
-- ========================================
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS impact_level text DEFAULT 'medium';
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS due_date date;
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS responsible text;

CREATE INDEX IF NOT EXISTS decisions_impact_level_idx ON decisions (impact_level);
CREATE INDEX IF NOT EXISTS decisions_due_date_idx ON decisions (due_date);

-- TABLE RISKS
-- ========================================
ALTER TABLE risks ADD COLUMN IF NOT EXISTS impact numeric(3,2);
ALTER TABLE risks ADD COLUMN IF NOT EXISTS probability numeric(3,2);
ALTER TABLE risks ADD COLUMN IF NOT EXISTS mitigation_plan text;

CREATE INDEX IF NOT EXISTS risks_impact_idx ON risks (impact);
CREATE INDEX IF NOT EXISTS risks_probability_idx ON risks (probability);
CREATE INDEX IF NOT EXISTS risks_status_idx ON risks (status);

-- VÉRIFICATION
-- ========================================
SELECT 'DECISIONS' as table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'decisions'
UNION ALL
SELECT 'RISKS' as table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'risks'
ORDER BY table_name, column_name;
