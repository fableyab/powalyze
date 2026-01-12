# DÉSACTIVER RLS MANUELLEMENT DANS SUPABASE

## Étapes à suivre dans l'interface Supabase

### 1. Allez dans Authentication > Policies
1. Ouvrez votre projet Supabase: https://supabase.com/dashboard
2. Cliquez sur votre projet
3. Dans le menu de gauche, cliquez sur **"Authentication"**
4. Puis cliquez sur **"Policies"**

### 2. Désactivez RLS pour la table `organizations`
1. Trouvez la table **"organizations"** dans la liste
2. Vous verrez un toggle/switch "Enable RLS"
3. **DÉSACTIVEZ-LE** (le switch doit être gris/off)

### 3. Répétez pour toutes les tables
Faites la même chose pour:
- ✅ organizations
- ✅ user_organizations
- ✅ initiatives
- ✅ profiles
- ✅ documents
- ✅ reports

### 4. Alternative plus rapide: Via SQL Editor
Si l'interface ne fonctionne pas, allez dans **SQL Editor** et exécutez:

```sql
-- Supprimer TOUTES les politiques
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE schemaname = 'public'
    ) LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
            r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

-- Désactiver RLS sur toutes les tables
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiatives DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports DISABLE ROW LEVEL SECURITY;
```

### 5. Vérifier que c'est bien désactivé
Dans SQL Editor, exécutez:

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

Toutes les valeurs de `rowsecurity` doivent être **false**.

---

## Si ça ne fonctionne TOUJOURS pas

Videz le cache de votre navigateur:
- Chrome: Ctrl+Shift+Delete → Cochez "Cached images and files" → Clear data
- Ou utilisez mode incognito pour tester

Puis reconnectez-vous sur https://www.powalyze.com
