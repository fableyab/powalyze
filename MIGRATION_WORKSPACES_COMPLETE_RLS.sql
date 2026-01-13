-- =====================================================================
-- MIGRATION COMPLÈTE WORKSPACES + TRIGGER AUTO-FILL + RLS
-- Date: 2026-01-13
-- Version: 3.0 (Architecture Workspaces complète)
-- =====================================================================

-- =====================================================================
-- 0) RESET DES POLICIES (pour repartir propre)
-- =====================================================================

DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE tablename IN ('organizations','workspaces','memberships','initiatives','portfolios')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I;', pol.policyname, pol.tablename);
  END LOOP;
END
$$;

-- =====================================================================
-- 1) ACTIVER RLS SUR TOUTES LES TABLES
-- =====================================================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces   ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships  ENABLE ROW LEVEL SECURITY;
ALTER TABLE initiatives  ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios   ENABLE ROW LEVEL SECURITY;

-- =====================================================================
-- 2) TRIGGER GLOBAL : AUTO-SET created_by = auth.uid()
-- =====================================================================

DROP FUNCTION IF EXISTS auto_set_created_by CASCADE;

CREATE FUNCTION auto_set_created_by()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF new.created_by IS NULL THEN
    new.created_by := auth.uid();
  END IF;
  RETURN new;
END;
$$;

-- Supprimer les anciens triggers
DROP TRIGGER IF EXISTS trg_org_created_by ON organizations;
DROP TRIGGER IF EXISTS trg_ws_created_by ON workspaces;
DROP TRIGGER IF EXISTS trg_init_created_by ON initiatives;
DROP TRIGGER IF EXISTS trg_port_created_by ON portfolios;

-- Créer les triggers sur chaque table
CREATE TRIGGER trg_org_created_by
BEFORE INSERT ON organizations
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

CREATE TRIGGER trg_ws_created_by
BEFORE INSERT ON workspaces
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

CREATE TRIGGER trg_init_created_by
BEFORE INSERT ON initiatives
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

CREATE TRIGGER trg_port_created_by
BEFORE INSERT ON portfolios
FOR EACH ROW EXECUTE FUNCTION auto_set_created_by();

-- =====================================================================
-- 3) ORGANIZATIONS — RLS
-- =====================================================================

CREATE POLICY org_insert
ON organizations
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY org_select
ON organizations
FOR SELECT
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY org_update
ON organizations
FOR UPDATE
TO authenticated
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

CREATE POLICY org_delete
ON organizations
FOR DELETE
TO authenticated
USING (created_by = auth.uid());

-- =====================================================================
-- 4) WORKSPACES — RLS
-- =====================================================================

CREATE POLICY ws_insert
ON workspaces
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY ws_select
ON workspaces
FOR SELECT
TO authenticated
USING (
  owner_id = auth.uid()
  OR id IN (SELECT workspace_id FROM memberships WHERE user_id = auth.uid())
);

CREATE POLICY ws_update
ON workspaces
FOR UPDATE
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

CREATE POLICY ws_delete
ON workspaces
FOR DELETE
TO authenticated
USING (owner_id = auth.uid());

-- =====================================================================
-- 5) MEMBERSHIPS — RLS
-- =====================================================================

CREATE POLICY mem_insert
ON memberships
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM workspaces w
    WHERE w.id = workspace_id
    AND w.owner_id = auth.uid()
  )
);

CREATE POLICY mem_select
ON memberships
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  OR workspace_id IN (
    SELECT id FROM workspaces WHERE owner_id = auth.uid()
  )
);

CREATE POLICY mem_delete
ON memberships
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM workspaces w
    WHERE w.id = memberships.workspace_id
    AND w.owner_id = auth.uid()
  )
);

-- =====================================================================
-- 6) INITIATIVES — RLS
-- =====================================================================

CREATE POLICY init_insert
ON initiatives
FOR INSERT
TO authenticated
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY init_select
ON initiatives
FOR SELECT
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY init_update
ON initiatives
FOR UPDATE
TO authenticated
USING (
  created_by = auth.uid()
  AND workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  created_by = auth.uid()
  AND workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY init_delete
ON initiatives
FOR DELETE
TO authenticated
USING (
  created_by = auth.uid()
  AND workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

-- =====================================================================
-- 7) PORTFOLIOS — RLS
-- =====================================================================

CREATE POLICY port_insert
ON portfolios
FOR INSERT
TO authenticated
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY port_select
ON portfolios
FOR SELECT
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY port_update
ON portfolios
FOR UPDATE
TO authenticated
USING (
  created_by = auth.uid()
  AND workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  created_by = auth.uid()
  AND workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

CREATE POLICY port_delete
ON portfolios
FOR DELETE
TO authenticated
USING (
  created_by = auth.uid()
  AND workspace_id IN (
    SELECT workspace_id FROM memberships WHERE user_id = auth.uid()
  )
);

-- =====================================================================
-- 8) VÉRIFICATIONS
-- =====================================================================

-- Vérifier les triggers
SELECT 
  event_object_table as table_name,
  trigger_name,
  event_manipulation as event_type
FROM information_schema.triggers
WHERE event_object_table IN ('organizations', 'workspaces', 'initiatives', 'portfolios')
ORDER BY event_object_table;

-- Vérifier les policies
SELECT 
  tablename,
  policyname,
  cmd as operation,
  roles
FROM pg_policies
WHERE tablename IN ('organizations', 'workspaces', 'memberships', 'initiatives', 'portfolios')
ORDER BY tablename, cmd;

-- Vérifier RLS activé
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename IN ('organizations', 'workspaces', 'memberships', 'initiatives', 'portfolios')
ORDER BY tablename;

-- =====================================================
-- FIN DE LA MIGRATION
-- =====================================================
