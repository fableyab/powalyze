-- FIX RLS: Permettre la création d'organisations
-- Ce script corrige les politiques RLS pour permettre aux utilisateurs de créer leurs organisations

-- 1. Supprimer les anciennes politiques restrictives
DROP POLICY IF EXISTS "Users can view their organizations" ON organizations;
DROP POLICY IF EXISTS "Users can create their organizations" ON organizations;
DROP POLICY IF EXISTS "Users can update their organizations" ON organizations;

-- 2. Créer des politiques RLS correctes pour organizations
-- Permettre aux utilisateurs authentifiés de créer des organisations
CREATE POLICY "Allow authenticated users to create organizations"
ON organizations
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permettre aux utilisateurs de voir les organisations dont ils sont membres
CREATE POLICY "Users can view their member organizations"
ON organizations
FOR SELECT
TO authenticated
USING (
  id IN (
    SELECT organization_id 
    FROM user_organizations 
    WHERE user_id = auth.uid()
  )
);

-- Permettre aux admins de mettre à jour leur organisation
CREATE POLICY "Admins can update their organizations"
ON organizations
FOR UPDATE
TO authenticated
USING (
  id IN (
    SELECT organization_id 
    FROM user_organizations 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
)
WITH CHECK (
  id IN (
    SELECT organization_id 
    FROM user_organizations 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Permettre aux admins de supprimer leur organisation
CREATE POLICY "Admins can delete their organizations"
ON organizations
FOR DELETE
TO authenticated
USING (
  id IN (
    SELECT organization_id 
    FROM user_organizations 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- 3. Vérifier que la table user_organizations a les bonnes politiques
DROP POLICY IF EXISTS "Users can view their user_organization links" ON user_organizations;
DROP POLICY IF EXISTS "Users can create user_organization links" ON user_organizations;

-- Permettre aux utilisateurs de créer des liens user_organizations
CREATE POLICY "Allow users to create their organization links"
ON user_organizations
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Permettre aux utilisateurs de voir leurs liens
CREATE POLICY "Users can view their organization links"
ON user_organizations
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Permettre aux admins de gérer les membres de leur organisation
CREATE POLICY "Admins can manage organization members"
ON user_organizations
FOR ALL
TO authenticated
USING (
  organization_id IN (
    SELECT organization_id 
    FROM user_organizations 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- 4. Afficher le résultat
SELECT 'RLS policies fixed successfully!' as status;
SELECT 'Organizations table policies:' as info;
SELECT * FROM pg_policies WHERE tablename = 'organizations';
SELECT 'User_organizations table policies:' as info;
SELECT * FROM pg_policies WHERE tablename = 'user_organizations';
