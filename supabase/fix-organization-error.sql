-- ============================================
-- SCRIPT DE DIAGNOSTIC ET CORRECTION
-- Erreur: "Impossible de récupérer votre organisation"
-- ============================================

-- ============================================
-- ÉTAPE 1: DIAGNOSTIC
-- ============================================

-- 1.1 Vérifier que la table user_organizations existe
SELECT 
  table_name, 
  table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'user_organizations';

-- Si la table n'existe pas, CRÉER LA:
/*
CREATE TABLE IF NOT EXISTS user_organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'manager', 'analyst', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  invited_at TIMESTAMP WITH TIME ZONE,
  invited_by UUID REFERENCES auth.users(id),
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, organization_id)
);

ALTER TABLE user_organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own organizations"
  ON user_organizations FOR SELECT
  USING (auth.uid() = user_id);
*/

-- 1.2 Vérifier que la table organizations existe
SELECT 
  table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'organizations';

-- Si la table n'existe pas, CRÉER LA:
/*
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
*/

-- 1.3 Lister tous les utilisateurs (auth.users)
SELECT 
  id,
  email,
  created_at,
  raw_user_meta_data->>'full_name' AS full_name
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- 1.4 Lister toutes les organisations
SELECT 
  id,
  name,
  description,
  created_at
FROM organizations
ORDER BY created_at DESC;

-- Si AUCUNE organisation n'existe, CRÉER UNE:
/*
INSERT INTO organizations (name, description)
VALUES ('Organisation par défaut', 'Organisation créée automatiquement')
RETURNING id, name;
*/

-- 1.5 Vérifier les associations user_organizations
SELECT 
  uo.id,
  uo.user_id,
  u.email AS user_email,
  uo.organization_id,
  o.name AS organization_name,
  uo.role,
  uo.created_at
FROM user_organizations uo
LEFT JOIN auth.users u ON u.id = uo.user_id
LEFT JOIN organizations o ON o.id = uo.organization_id
ORDER BY uo.created_at DESC;

-- ============================================
-- ÉTAPE 2: IDENTIFIER L'UTILISATEUR ACTUEL
-- ============================================

-- Remplacez 'VOTRE_EMAIL@example.com' par votre vrai email
SELECT 
  id AS user_id,
  email,
  created_at
FROM auth.users
WHERE email = 'VOTRE_EMAIL@example.com';  -- ⚠️ REMPLACER PAR VOTRE EMAIL

-- Copier le user_id retourné et l'utiliser ci-dessous

-- ============================================
-- ÉTAPE 3: VÉRIFIER SI VOUS ÊTES ASSOCIÉ
-- ============================================

-- Remplacez 'YOUR_USER_ID' par votre vrai user_id (copié ci-dessus)
SELECT 
  uo.*,
  o.name AS organization_name
FROM user_organizations uo
JOIN organizations o ON o.id = uo.organization_id
WHERE uo.user_id = 'YOUR_USER_ID';  -- ⚠️ REMPLACER

-- Si cette requête retourne 0 ligne → C'EST LE PROBLÈME!

-- ============================================
-- ÉTAPE 4: SOLUTION - ASSOCIER À UNE ORGANISATION
-- ============================================

-- Option A: Associer à une organisation existante
-- Remplacez YOUR_USER_ID et YOUR_ORG_ID par les valeurs réelles

INSERT INTO user_organizations (user_id, organization_id, role)
VALUES (
  'YOUR_USER_ID',      -- ⚠️ REMPLACER par votre user_id
  'YOUR_ORG_ID',       -- ⚠️ REMPLACER par l'organization_id souhaitée
  'admin'              -- ou 'manager', 'analyst', 'viewer'
)
ON CONFLICT (user_id, organization_id) DO NOTHING
RETURNING *;

-- Option B: Si vous ne connaissez pas l'organization_id, utiliser la première:
/*
INSERT INTO user_organizations (user_id, organization_id, role)
SELECT 
  'YOUR_USER_ID',  -- ⚠️ REMPLACER
  id,
  'admin'
FROM organizations
LIMIT 1
ON CONFLICT (user_id, organization_id) DO NOTHING
RETURNING *;
*/

-- Option C: Créer une nouvelle organisation ET vous y associer
/*
WITH new_org AS (
  INSERT INTO organizations (name, description)
  VALUES ('Mon Organisation', 'Organisation créée pour moi')
  RETURNING id
)
INSERT INTO user_organizations (user_id, organization_id, role)
SELECT 
  'YOUR_USER_ID',  -- ⚠️ REMPLACER
  id,
  'admin'
FROM new_org
RETURNING *;
*/

-- ============================================
-- ÉTAPE 5: VÉRIFICATION POST-CORRECTION
-- ============================================

-- Vérifier que vous êtes maintenant associé
SELECT 
  uo.id,
  u.email,
  o.name AS organization_name,
  uo.role,
  uo.created_at
FROM user_organizations uo
JOIN auth.users u ON u.id = uo.user_id
JOIN organizations o ON o.id = uo.organization_id
WHERE u.email = 'VOTRE_EMAIL@example.com';  -- ⚠️ REMPLACER

-- Devrait retourner au moins 1 ligne ✅

-- ============================================
-- ÉTAPE 6: SCRIPT AUTOMATIQUE (TOUS UTILISATEURS)
-- ============================================

-- ⚠️ DANGER: Ceci associe TOUS les utilisateurs à la première organisation
-- N'exécutez que si vous voulez vraiment le faire!
/*
INSERT INTO user_organizations (user_id, organization_id, role)
SELECT 
  u.id AS user_id,
  (SELECT id FROM organizations LIMIT 1) AS organization_id,
  'viewer' AS role
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 
  FROM user_organizations uo 
  WHERE uo.user_id = u.id
)
ON CONFLICT (user_id, organization_id) DO NOTHING;
*/

-- ============================================
-- ÉTAPE 7: VÉRIFIER LES RLS POLICIES
-- ============================================

-- Vérifier les politiques de sécurité sur user_organizations
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'user_organizations';

-- Si aucune policy n'existe, CRÉER:
/*
CREATE POLICY "Users can view their own organizations"
  ON user_organizations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own organizations"
  ON user_organizations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own organizations"
  ON user_organizations FOR UPDATE
  USING (auth.uid() = user_id);
*/

-- ============================================
-- ÉTAPE 8: TEST FINAL
-- ============================================

-- Simuler la requête de l'application
-- Remplacez YOUR_USER_ID par votre vrai user_id
SELECT organization_id
FROM user_organizations
WHERE user_id = 'YOUR_USER_ID';  -- ⚠️ REMPLACER

-- Devrait retourner au moins 1 organization_id ✅

-- ============================================
-- RÉSUMÉ DES ERREURS POSSIBLES
-- ============================================

/*
1. Table user_organizations n'existe pas
   → Créer la table (voir section 1.1)

2. Aucune organisation n'existe
   → Créer une organisation (voir section 1.4)

3. Utilisateur non associé à une organisation
   → Associer l'utilisateur (voir section 4)

4. RLS policies trop restrictives
   → Vérifier les policies (voir section 7)

5. Plusieurs organisations (conflit avec .single())
   → CORRIGÉ dans le code (retire .single())
*/

-- ============================================
-- LOGS DE DÉBOGAGE
-- ============================================

-- Après avoir corrigé, vérifier dans les logs de Supabase:
-- Dashboard → Logs → Rechercher "user_organizations"

-- Dans la console du navigateur (F12), vous devriez voir:
-- 🔍 Recherche organisations pour user: [UUID]
-- 📋 Résultat: { userOrgs: [...], orgError: null }

-- ============================================
-- SCRIPT COMPLET DE SETUP INITIAL
-- ============================================

/*
-- Exécuter ce script COMPLET si vous partez de zéro:

-- 1. Créer l'organisation par défaut
INSERT INTO organizations (id, name, description)
VALUES (
  gen_random_uuid(),
  'Powalyze Organization',
  'Organisation par défaut'
)
ON CONFLICT DO NOTHING
RETURNING id;

-- 2. Associer TOUS les utilisateurs à cette organisation
WITH default_org AS (
  SELECT id FROM organizations WHERE name = 'Powalyze Organization' LIMIT 1
)
INSERT INTO user_organizations (user_id, organization_id, role)
SELECT 
  u.id,
  do.id,
  CASE 
    WHEN u.email LIKE '%admin%' THEN 'admin'
    ELSE 'viewer'
  END AS role
FROM auth.users u
CROSS JOIN default_org do
WHERE NOT EXISTS (
  SELECT 1 FROM user_organizations uo WHERE uo.user_id = u.id
)
ON CONFLICT (user_id, organization_id) DO NOTHING;

-- 3. Vérifier
SELECT 
  u.email,
  o.name AS organization,
  uo.role
FROM user_organizations uo
JOIN auth.users u ON u.id = uo.user_id
JOIN organizations o ON o.id = uo.organization_id;
*/

-- ============================================
-- SUPPORT
-- ============================================

/*
Si le problème persiste après avoir exécuté ce script:

1. Vérifier les logs Supabase Dashboard
2. Ouvrir la console navigateur (F12)
3. Copier les logs console et les erreurs
4. Vérifier que RLS est bien configuré
5. Vérifier les permissions de votre compte Supabase

Documentation:
- GUIDE_DEPLOIEMENT_INVITATIONS.md
- RECAP_INVITATIONS_ALERTES.md
- Ce fichier: fix-organization-error.sql
*/
