-- ========================================
-- FIX: Ajouter la colonne due_date à la table decisions
-- Date: 2026-01-12
-- ========================================

-- Vérifier si la colonne existe déjà
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'decisions' 
        AND column_name = 'due_date'
    ) THEN
        -- Ajouter la colonne si elle n'existe pas
        ALTER TABLE decisions ADD COLUMN due_date date;
        
        -- Créer l'index
        CREATE INDEX IF NOT EXISTS decisions_due_date_idx ON decisions (due_date);
        
        RAISE NOTICE '✅ Colonne due_date ajoutée avec succès';
    ELSE
        RAISE NOTICE 'ℹ️ La colonne due_date existe déjà';
    END IF;
END $$;

-- Vérifier la structure finale
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'decisions'
ORDER BY ordinal_position;
