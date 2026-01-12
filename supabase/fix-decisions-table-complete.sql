-- ========================================
-- FIX COMPLET: Table decisions avec toutes les colonnes
-- Date: 2026-01-12
-- ========================================

-- Ajouter toutes les colonnes manquantes
DO $$ 
BEGIN
    -- Ajouter impact_level si manquante
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'decisions' AND column_name = 'impact_level'
    ) THEN
        ALTER TABLE decisions ADD COLUMN impact_level text NOT NULL DEFAULT 'medium';
        RAISE NOTICE '✅ Colonne impact_level ajoutée';
    END IF;

    -- Ajouter due_date si manquante
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'decisions' AND column_name = 'due_date'
    ) THEN
        ALTER TABLE decisions ADD COLUMN due_date date;
        RAISE NOTICE '✅ Colonne due_date ajoutée';
    END IF;

    -- Ajouter responsible si manquante
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'decisions' AND column_name = 'responsible'
    ) THEN
        ALTER TABLE decisions ADD COLUMN responsible text;
        RAISE NOTICE '✅ Colonne responsible ajoutée';
    END IF;
END $$;

-- Créer les index
CREATE INDEX IF NOT EXISTS decisions_impact_level_idx ON decisions (impact_level);
CREATE INDEX IF NOT EXISTS decisions_due_date_idx ON decisions (due_date);
CREATE INDEX IF NOT EXISTS decisions_status_idx ON decisions (status);

-- Vérifier la structure finale
SELECT 
    '✅ STRUCTURE FINALE' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'decisions'
ORDER BY ordinal_position;
