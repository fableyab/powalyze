# 🚀 Guide de Déploiement Vercel - Powalyze (Vite + React)

## ⚠️ Important : Powalyze est un projet Vite + React, PAS Next.js

Votre projet utilise **Vite** comme bundler, pas Next.js. Il n'y a donc pas de `app/page.tsx`.

## ✅ Checklist de Déploiement

### 1. Vérifier la Configuration Vercel

#### Dans votre Dashboard Vercel (`vercel.com/dashboard`)

1. **Projet correct** :
   - Allez dans **Dashboard** → Sélectionnez votre projet `powalyze`
   - Vérifiez que le repo GitHub connecté est le bon

2. **Domaine attaché** :
   - Allez dans **Settings** → **Domains**
   - Vérifiez que `powalyze.com` pointe vers ce projet
   - Status doit être "Valid Configuration" (✓)

3. **Build Settings** (Settings → General) :
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables** (Settings → Environment Variables) :
   Si vous utilisez Supabase ou d'autres services, ajoutez :
   ```
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```

### 2. Vérifier les Fichiers de Configuration

#### ✅ `vercel.json` (déjà configuré)
```json
{
  "buildCommand": "npm run build 2>&1",
  "outputDirectory": "dist",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### ✅ `package.json` (déjà configuré)
```json
{
  "type": "module",
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 3. Tester en Local

```bash
# 1. Nettoyer les caches
Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules\.vite" -Recurse -Force -ErrorAction SilentlyContinue

# 2. Installer les dépendances
npm install

# 3. Build de production
npm run build

# 4. Vérifier que dist/ existe
Test-Path "dist/index.html"  # Doit retourner True

# 5. Preview local (simule production)
npm run preview
```

Si `npm run preview` affiche correctement le site sur http://localhost:3000, alors le build est bon.

### 4. Déployer sur Vercel

#### Option A : Déploiement automatique (via Git)

1. Commit vos changements :
   ```bash
   git add .
   git commit -m "fix: configuration Vercel + corrections site"
   git push origin main
   ```

2. Vercel détecte automatiquement le push et redéploie
3. Attendez 2-3 minutes
4. Vérifiez sur https://powalyze.com

#### Option B : Déploiement manuel (via CLI)

```bash
# Installer Vercel CLI si pas déjà fait
npm install -g vercel

# Se connecter
vercel login

# Déployer en production
vercel --prod
```

### 5. Diagnostiquer les Problèmes

#### 🔍 Vérifier les Logs Vercel

1. Dans Vercel Dashboard → **Deployments**
2. Cliquez sur le dernier déploiement
3. Onglet **Build Logs** :
   - Vérifiez qu'il n'y a pas d'erreurs pendant `npm run build`
   - Cherchez des messages comme :
     - `Module not found`
     - `ReferenceError`
     - `Cannot find module`

4. Onglet **Function Logs** (Runtime logs) :
   - Si la page est blanche mais le build a réussi, cherchez ici
   - Erreurs JavaScript côté client s'affichent aussi dans la console navigateur (F12)

#### 🩺 Diagnostics Courants

**Problème** : Page blanche après déploiement
**Solutions** :
1. Hard refresh navigateur : `Ctrl + Shift + R`
2. Vérifier console navigateur (F12) pour erreurs JavaScript
3. Vérifier que `dist/index.html` existe dans le build
4. Vérifier les rewrites dans vercel.json (déjà OK)

**Problème** : Build échoue sur Vercel mais pas en local
**Solutions** :
1. Vérifier la version Node.js :
   - Vercel utilise Node 20 par défaut
   - Votre `package.json` spécifie `>=18.0.0 <25.0.0` ✓
2. Variables d'environnement manquantes
3. Dépendances devDependencies vs dependencies

**Problème** : 404 sur les routes (ex: /login, /dashboard)
**Solution** : Déjà configuré dans vercel.json avec le rewrite `/(.*) → /index.html` ✓

### 6. Vérifications Post-Déploiement

Testez ces URLs :
- ✅ https://powalyze.com → Page d'accueil
- ✅ https://powalyze.com/login → Page login (pas de 404)
- ✅ https://powalyze.com/dashboard → Redirige vers login si non connecté
- ✅ Console navigateur (F12) → Pas d'erreurs JavaScript

### 7. Checklist de Sécurité

- [ ] Variables d'environnement configurées dans Vercel (pas dans le code)
- [ ] `.env` dans `.gitignore` (ne jamais commit les secrets)
- [ ] HTTPS activé (automatique sur Vercel)
- [ ] Domaine personnalisé configuré

## 🆘 Si la Page est Blanche sur Vercel

1. **Ouvrir la console navigateur** (F12)
   - Y a-t-il des erreurs JavaScript ?
   - Erreurs 404 pour des assets ?

2. **Vérifier le dernier déploiement Vercel** :
   - Build Logs → Rechercher "error" ou "failed"
   - Statut : "Ready" (vert) ?

3. **Comparer local vs production** :
   ```bash
   npm run preview  # Teste le build en local
   ```
   Si local fonctionne mais pas Vercel → problème de configuration Vercel

4. **Redéployer manuellement** :
   ```bash
   vercel --prod --force
   ```

## 📞 Support

Si le problème persiste après ces étapes :
1. Vérifiez les logs Vercel complets
2. Testez `npm run build` et `npm run preview` en local
3. Comparez votre configuration avec ce guide
4. Vérifiez que le domaine pointe bien vers le bon projet Vercel

---

**Rappel** : Votre projet est **Vite + React**, pas Next.js. Ignore les guides Next.js (app/page.tsx, etc.).
