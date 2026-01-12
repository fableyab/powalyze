# 🚨 INSTRUCTIONS URGENTES - Correction Supabase

## Problème Actuel

La page **Executive Dashboard** affiche :
- ❌ "Santé du portefeuille: **0%**"
- ❌ "**0 initiatives** dans cette vue"
- ❌ "Aucune décision enregistrée"

**Cause** : L'utilisateur n'a pas d'`organization_id` dans la table `profiles`, donc toutes les requêtes échouent.

## Solution Immédiate

### Étape 1: Se connecter à Supabase

1. Ouvrir le navigateur
2. Aller sur https://supabase.com/dashboard
3. Se connecter avec votre compte
4. Sélectionner le projet: **phfeteiholkfiredgero**

### Étape 2: Exécuter le Script SQL

1. Dans le menu gauche, cliquer sur **SQL Editor**
2. Cliquer sur **+ New Query**
3. Copier-coller le code suivant :

```sql
-- ═══════════════════════════════════════════════════════════
-- FIX ORGANISATION POUR L'UTILISATEUR CONNECTÉ
-- ═══════════════════════════════════════════════════════════

-- 1. Créer l'organisation par défaut (si elle n'existe pas)
INSERT INTO public.organizations (id, name, created_at)
VALUES (
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'Powalyze Demo Organization',
  now()
)
ON CONFLICT (id) DO NOTHING;

-- 2. S'assurer que la table profiles existe
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id),
  full_name text,
  avatar_url text,
  role text default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Créer l'index sur organization_id
CREATE INDEX IF NOT EXISTS profiles_organization_idx 
ON public.profiles (organization_id);

-- 4. Lier l'utilisateur existant à l'organisation
INSERT INTO public.profiles (id, organization_id, role, full_name, created_at)
VALUES (
  '4fef37d8-b86a-496f-b7bb-4aeec90a470a'::uuid,
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'admin',
  'Administrateur',
  now()
)
ON CONFLICT (id) DO UPDATE
SET 
  organization_id = 'a0000000-0000-0000-0000-000000000001'::uuid,
  role = 'admin',
  updated_at = now();

-- 5. Créer la relation user_organizations (si la table existe)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables 
             WHERE table_schema = 'public' 
             AND table_name = 'user_organizations') THEN
    
    INSERT INTO public.user_organizations (user_id, organization_id, role, created_at)
    VALUES (
      '4fef37d8-b86a-496f-b7bb-4aeec90a470a'::uuid,
      'a0000000-0000-0000-0000-000000000001'::uuid,
      'admin',
      now()
    )
    ON CONFLICT (user_id, organization_id) DO NOTHING;
    
  END IF;
END $$;

-- 6. Activer Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 7. Créer les policies RLS
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view profiles in same org" ON public.profiles;
CREATE POLICY "Users can view profiles in same org"
  ON public.profiles
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

-- ═══════════════════════════════════════════════════════════
-- VÉRIFICATION
-- ═══════════════════════════════════════════════════════════

SELECT 
  'SUCCESS ✅' as status,
  p.id as user_id,
  p.organization_id,
  p.role,
  o.name as organization_name
FROM public.profiles p
LEFT JOIN public.organizations o ON o.id = p.organization_id
WHERE p.id = '4fef37d8-b86a-496f-b7bb-4aeec90a470a'::uuid;
```

4. Cliquer sur le bouton **RUN** (ou Ctrl+Enter)

### Étape 3: Vérifier le résultat

Vous devriez voir un tableau avec :
- ✅ **status**: "SUCCESS ✅"
- ✅ **user_id**: `4fef37d8-b86a-496f-b7bb-4aeec90a470a`
- ✅ **organization_id**: `a0000000-0000-0000-0000-000000000001`
- ✅ **role**: `admin`
- ✅ **organization_name**: `Powalyze Demo Organization`

### Étape 4: Créer des données de démonstration (OPTIONNEL)

Si vous voulez voir des projets et décisions dans le dashboard :

```sql
-- Créer 5 initiatives de démo
INSERT INTO public.initiatives (id, organization_id, name, description, status, progress, start_date, end_date, created_at)
VALUES
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'Transformation Digitale', 'Programme de digitalisation globale', 'in_progress', 75, '2025-01-01', '2026-06-30', now()),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'Migration Cloud', 'Migration vers Azure Cloud', 'in_progress', 45, '2025-03-15', '2026-12-31', now()),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'Refonte CRM', 'Nouvelle plateforme CRM Salesforce', 'planned', 20, '2025-06-01', '2026-03-31', now()),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'Sécurité & Conformité', 'Mise en conformité RGPD et ISO 27001', 'in_progress', 60, '2025-02-01', '2025-12-31', now()),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'Data Analytics Platform', 'Plateforme BI centralisée Power BI', 'in_progress', 85, '2024-10-01', '2025-09-30', now())
ON CONFLICT DO NOTHING;

-- Créer 3 décisions de démo
INSERT INTO public.decisions (id, organization_id, title, description, impact_level, status, due_date, created_at)
VALUES
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'Validation Budget Q2', 'Approbation budget transformation 2.4M€', 'high', 'pending', '2025-02-15', now()),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'Choix plateforme BI', 'Power BI vs Tableau - décision stratégique', 'critical', 'approved', '2025-01-30', now()),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'Lancement projet IA', 'Démarrage POC Intelligence Artificielle', 'medium', 'pending', '2025-03-01', now())
ON CONFLICT DO NOTHING;

-- Vérifier les données créées
SELECT 'Initiatives créées' as type, COUNT(*) as count FROM public.initiatives 
WHERE organization_id = 'a0000000-0000-0000-0000-000000000001'
UNION ALL
SELECT 'Décisions créées' as type, COUNT(*) as count FROM public.decisions 
WHERE organization_id = 'a0000000-0000-0000-0000-000000000001';
```

## Résultat Attendu

Après avoir exécuté ce script :

1. ✅ Rafraîchir la page **Executive Dashboard** (F5)
2. ✅ Vous devriez voir :
   - **Santé du portefeuille: 57%** (ou similaire)
   - **5 initiatives dans cette vue**
   - Pulses KPI actifs (rafraîchis toutes les 3-4 secondes)
   - Graphique d'avancement
   - Timeline des décisions
3. ✅ Les boutons **Executive**, **PMO**, **Risk** fonctionnent et changent la vue

## Troubleshooting

### Si les données n'apparaissent toujours pas :

1. **Vider le cache du navigateur** :
   - Chrome: Ctrl+Shift+Delete → Cocher "Images et fichiers en cache" → Effacer
   - Firefox: Ctrl+Shift+Delete → Cocher "Cache" → Effacer maintenant

2. **Vérifier dans la console** (F12) :
   ```javascript
   // Copier-coller dans la console
   console.log(await customSupabaseClient.auth.getUser());
   console.log(await customSupabaseClient.from('profiles').select('*').single());
   ```
   Devrait afficher l'utilisateur + son organization_id

3. **Forcer un rebuild + redeploy** :
   ```bash
   cd c:\powalyze
   npm run build
   vercel --prod
   ```

## Support

Si le problème persiste :
1. Prendre une capture d'écran de la console (F12)
2. Prendre une capture d'écran du résultat SQL dans Supabase
3. Vérifier les logs Supabase : https://supabase.com/dashboard/project/phfeteiholkfiredgero/logs

---

**IMPORTANT** : Ce script doit être exécuté **immédiatement** pour que le dashboard fonctionne.
