# 🚨 GUIDE DE RÉSOLUTION DES ERREURS DE PRODUCTION

## Problèmes identifiés

### 1. ❌ **Erreur: Organisation non trouvée (CRITIQUE)**

**Symptôme:**
```
Error: Organisation non trouvée
phfeteiholkfiredgero.supabase.co/rest/v1/profiles?select=organization_id&id=eq.4fef37d8-b86a-496f-b7bb-4aeec90a470a: 400
```

**Cause:** L'utilisateur `4fef37d8-b86a-496f-b7bb-4aeec90a470a` n'a pas de `organization_id` dans la table `profiles`.

**Solution:** Exécuter le script SQL dans Supabase:

```bash
# 1. Ouvrir Supabase Dashboard
https://supabase.com/dashboard/project/phfeteiholkfiredgero/editor

# 2. Aller dans SQL Editor

# 3. Exécuter le fichier fix-organization-issue.sql
```

**Contenu du script à exécuter:**
```sql
-- Créer organisation par défaut
INSERT INTO public.organizations (id, name, created_at)
VALUES (
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'Powalyze Demo Organization',
  now()
)
ON CONFLICT (id) DO NOTHING;

-- Assurer que profiles existe
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id),
  full_name text,
  avatar_url text,
  role text default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Lier l'utilisateur à l'organisation
INSERT INTO public.profiles (id, organization_id, role, created_at)
VALUES (
  '4fef37d8-b86a-496f-b7bb-4aeec90a470a'::uuid,
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'admin',
  now()
)
ON CONFLICT (id) DO UPDATE
SET organization_id = 'a0000000-0000-0000-0000-000000000001'::uuid,
    role = 'admin';

-- Créer lien user_organizations
INSERT INTO public.user_organizations (user_id, organization_id, role)
VALUES (
  '4fef37d8-b86a-496f-b7bb-4aeec90a470a'::uuid,
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'admin'
)
ON CONFLICT (user_id, organization_id) DO NOTHING;

-- Activer RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view profiles in same org" ON public.profiles;
CREATE POLICY "Users can view profiles in same org"
  ON public.profiles FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid()
    )
  );
```

**Vérification:**
```sql
-- Vérifier que l'utilisateur a une organisation
SELECT 
  p.id,
  p.organization_id,
  p.role,
  o.name as org_name
FROM public.profiles p
LEFT JOIN public.organizations o ON o.id = p.organization_id
WHERE p.id = '4fef37d8-b86a-496f-b7bb-4aeec90a470a'::uuid;

-- Devrait afficher:
-- id: 4fef37d8-b86a-496f-b7bb-4aeec90a470a
-- organization_id: a0000000-0000-0000-0000-000000000001
-- role: admin
-- org_name: Powalyze Demo Organization
```

---

### 2. ⚠️ **Erreur: Icône 192x192 invalide**

**Symptôme:**
```
Error while trying to use the following icon from the Manifest: 
https://www.powalyze.com/icon-192.png 
(Download error or resource isn't a valid image)
```

**Cause:** Le fichier `icon-192.png` (932 bytes) est trop petit ou corrompu.

**Solution:**

#### Option A - Utiliser les SVG générés:
```bash
# 1. Les fichiers SVG sont déjà créés
public/icon-192.svg
public/icon-512.svg

# 2. Convertir en PNG avec ImageMagick (si installé)
magick convert public/icon-192.svg -resize 192x192 public/icon-192.png
magick convert public/icon-512.svg -resize 512x512 public/icon-512.png

# 3. Ou utiliser un outil en ligne
# https://svgtopng.com/
# - Upload icon-192.svg
# - Download 192x192 PNG
# - Remplacer public/icon-192.png
```

#### Option B - Utiliser un logo existant:
```bash
# Si vous avez un logo PNG/JPG haute résolution
magick convert logo.png -resize 192x192 -background black -gravity center -extent 192x192 public/icon-192.png
magick convert logo.png -resize 512x512 -background black -gravity center -extent 512x512 public/icon-512.png
```

#### Option C - Créer en ligne:
1. Aller sur https://www.pwabuilder.com/imageGenerator
2. Upload votre logo
3. Télécharger le package d'icônes
4. Remplacer `public/icon-192.png` et `public/icon-512.png`

**Vérification:**
```bash
# Vérifier la taille des fichiers
Get-Item public/icon-*.png | Select-Object Name, Length

# Les fichiers devraient faire > 5KB
# icon-192.png: 10-50 KB
# icon-512.png: 50-200 KB
```

**Après correction:**
```bash
# Rebuild et redeploy
npm run build
vercel --prod
```

---

### 3. ⚠️ **Warnings Radix UI (non bloquant)**

**Symptôme:**
```
`DialogContent` requires a `DialogTitle` for accessibility
Missing `Description` or `aria-describedby={undefined}` for {DialogContent}
```

**Cause:** Composants Dialog sans titre accessible.

**Solution:** Chercher tous les composants Dialog et ajouter DialogTitle:

```bash
# Rechercher les Dialog sans titre
grep -r "DialogContent" src/components src/pages
```

**Exemple de correction:**
```jsx
// ❌ Avant
<Dialog>
  <DialogContent>
    <p>Contenu...</p>
  </DialogContent>
</Dialog>

// ✅ Après
<Dialog>
  <DialogContent>
    <DialogTitle>Titre du dialogue</DialogTitle>
    <DialogDescription>Description optionnelle</DialogDescription>
    <p>Contenu...</p>
  </DialogContent>
</Dialog>

// ✅ Ou masquer le titre si pas nécessaire visuellement
<Dialog>
  <DialogContent>
    <VisuallyHidden>
      <DialogTitle>Titre pour lecteurs d'écran</DialogTitle>
    </VisuallyHidden>
    <p>Contenu...</p>
  </DialogContent>
</Dialog>
```

---

### 4. ℹ️ **Warning Zustand (dépréciation)**

**Symptôme:**
```
[DEPRECATED] Default export is deprecated. 
Instead use `import { create } from 'zustand'`.
```

**Cause:** Import Zustand avec export par défaut.

**Solution:** Mettre à jour les imports Zustand:

```bash
# Rechercher les imports Zustand
grep -r "import.*zustand" src/
```

**Correction:**
```javascript
// ❌ Avant
import create from 'zustand';

// ✅ Après
import { create } from 'zustand';
```

---

## 📋 Checklist de résolution

### Priorité 1 (BLOQUANT):
- [ ] ✅ Exécuter `fix-organization-issue.sql` dans Supabase
- [ ] ✅ Vérifier que l'utilisateur a `organization_id` dans profiles
- [ ] ✅ Tester la connexion à https://www.powalyze.com
- [ ] ✅ Vérifier que `/projets-sensible` charge les projets

### Priorité 2 (IMPORTANT):
- [ ] 🎨 Régénérer `icon-192.png` et `icon-512.png` (>5KB chacun)
- [ ] 🎨 Vérifier que les icônes s'affichent dans le manifest
- [ ] 📱 Tester PWA "Add to Home Screen" sur mobile

### Priorité 3 (AMÉLIORATION):
- [ ] ♿ Ajouter `DialogTitle` à tous les composants Dialog
- [ ] ♿ Ajouter `DialogDescription` ou `aria-describedby`
- [ ] 📦 Mettre à jour imports Zustand: `import { create } from 'zustand'`

---

## 🚀 Commandes de déploiement après correction

```bash
# 1. Corriger Supabase (via Dashboard SQL Editor)
# → Exécuter fix-organization-issue.sql

# 2. Vérifier les icônes
Get-Item public/icon-*.png | Select-Object Name, Length

# 3. Si icônes OK, rebuild
npm run build

# 4. Déployer
vercel --prod

# 5. Tester sur production
# https://www.powalyze.com
# → Se connecter
# → Aller sur /projets-sensible
# → Vérifier qu'il n'y a plus d'erreur "Organisation non trouvée"
```

---

## 🔍 Commandes de diagnostic

### Vérifier l'utilisateur dans Supabase:
```sql
-- Dans Supabase SQL Editor
SELECT 
  u.id,
  u.email,
  p.organization_id,
  p.role,
  o.name as org_name
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
LEFT JOIN public.organizations o ON o.id = p.organization_id
WHERE u.id = '4fef37d8-b86a-496f-b7bb-4aeec90a470a';
```

### Vérifier les policies RLS:
```sql
-- Lister toutes les policies sur profiles
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'profiles';
```

### Vérifier les icônes:
```bash
# Taille des fichiers
Get-Item public/icon-*.* | Select-Object Name, Length, Extension

# Vérifier que les fichiers sont accessibles
curl -I https://www.powalyze.com/icon-192.png
curl -I https://www.powalyze.com/icon-512.png

# Devrait retourner: Content-Type: image/png
```

---

## 📞 Support

Si les erreurs persistent après avoir suivi ce guide:

1. **Vérifier les logs Supabase:**
   - https://supabase.com/dashboard/project/phfeteiholkfiredgero/logs/explorer

2. **Vérifier les logs Vercel:**
   - https://vercel.com/powalyzes-projects/powalyze-v2/logs

3. **Tester en local:**
   ```bash
   npm run dev
   # Ouvrir http://localhost:3000
   # Vérifier la console (F12)
   ```

4. **Vérifier l'authentification:**
   ```javascript
   // Dans la console du navigateur
   console.log(await customSupabaseClient.auth.getUser());
   console.log(await customSupabaseClient.from('profiles').select('*').single());
   ```
