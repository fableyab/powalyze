# Guide de Déploiement - Powalyze Governance SaaS

> Procédure complète pour déployer le module de gouvernance en production

---

## 📋 Pré-requis

### Environnement de Développement
- ✅ Node.js 18+ installé
- ✅ npm ou yarn
- ✅ Git configuré
- ✅ VS Code (recommandé)

### Comptes nécessaires
- ✅ Compte Supabase (Free ou Pro)
- ✅ Compte Vercel (Free ou Pro)
- ✅ Accès admin au repo GitHub

---

## 🗄️ Étape 1: Déployer la Base de Données Supabase

### 1.1. Créer un projet Supabase

1. Se connecter à [https://app.supabase.com](https://app.supabase.com)
2. Cliquer sur **"New Project"**
3. Renseigner:
   - **Name**: `powalyze-governance`
   - **Database Password**: Générer un mot de passe fort
   - **Region**: Europe (Frankfurt) ou plus proche
   - **Pricing Plan**: Free (pour dev) ou Pro (pour prod)
4. Cliquer sur **"Create new project"**
5. Attendre ~2 minutes que le projet soit provisionné

### 1.2. Récupérer les credentials

1. Aller dans **Settings** > **API**
2. Noter:
   ```
   Project URL: https://xxx.supabase.co
   anon public key: eyJhbGc...
   service_role key: eyJhbGc... (PRIVATE - NE JAMAIS COMMIT)
   ```

### 1.3. Exécuter la migration SQL

1. Ouvrir **SQL Editor** dans Supabase Dashboard
2. Cliquer sur **"New query"**
3. Copier-coller le contenu de `supabase/migrations/20260109_complete_saas_schema.sql`
4. Cliquer sur **"Run"**
5. Vérifier:
   ```
   ✅ 18 tables créées
   ✅ 15+ ENUM types définis
   ✅ 50+ indexes créés
   ✅ RLS activé
   ✅ Triggers créés
   ```

### 1.4. (Optionnel) Charger les données de test

1. Nouvelle query dans SQL Editor
2. Copier-coller le contenu de `supabase/migrations/20260109_seed_data.sql`
3. Cliquer sur **"Run"**
4. Vérifier les logs:
   ```
   ✅ 1 organization créée (Acme Corporation)
   ✅ 6 users créés (marie.dupont@acme.com, etc.)
   ✅ 2 portfolios créés
   ✅ 2 programs créés
   ✅ 5 projects créés
   ✅ 3 risks créés (dont 1 critique)
   ✅ 3 signaux IA créés
   ```

### 1.5. Configurer Row Level Security (RLS)

**Créer les policies de base:**

```sql
-- Exemple: Policy pour users
CREATE POLICY "Users can view users in their organization"
ON users FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);

-- Policy pour projects
CREATE POLICY "Users can view projects in their organization"
ON projects FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);

CREATE POLICY "PMO and Admins can insert projects"
ON projects FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND organization_id = projects.organization_id
    AND role IN ('PMO', 'ADMIN')
  )
);

-- Répéter pour toutes les tables principales
```

**💡 Conseil:** Créer un fichier `supabase/migrations/20260109_rls_policies.sql` avec toutes les policies.

---

## ⚙️ Étape 2: Configurer le Frontend

### 2.1. Cloner le repository

```bash
git clone https://github.com/votre-org/powalyze.git
cd powalyze
```

### 2.2. Installer les dépendances

```bash
npm install
```

### 2.3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine:

```env
# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Environment
VITE_ENV=production
VITE_APP_NAME=Powalyze
VITE_APP_VERSION=1.0.0

# Optional: Sentry, Analytics, etc.
# VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
# VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

**⚠️ IMPORTANT:** Ne JAMAIS commit le fichier `.env` (déjà dans `.gitignore`)

### 2.4. Tester en local

```bash
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173)

**Vérifications:**
- ✅ Page d'accueil charge
- ✅ Login fonctionne (avec users de seed)
- ✅ `/app/portfolio-view` affiche les portfolios
- ✅ `/app/committees` affiche les comités
- ✅ `/app/decisions` affiche les décisions
- ✅ `/app/risk-intelligence` affiche les risques + matrice 5x5
- ✅ Pas d'erreurs dans la console

### 2.5. Build de production

```bash
npm run build
```

Vérifier:
```
✅ dist/ folder created
✅ index.html generated
✅ JS bundles optimized
✅ CSS minified
✅ Assets copied
```

---

## 🚀 Étape 3: Déployer sur Vercel

### 3.1. Connecter le repo GitHub

1. Se connecter à [https://vercel.com](https://vercel.com)
2. Cliquer sur **"New Project"**
3. **Import Git Repository** → Sélectionner `powalyze`
4. Vérifier les settings:
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

### 3.2. Configurer les Environment Variables

Dans **Settings** > **Environment Variables**, ajouter:

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_SUPABASE_URL` | `https://xxx.supabase.co` | Production |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGc...` | Production |
| `VITE_ENV` | `production` | Production |
| `VITE_APP_NAME` | `Powalyze` | Production |

**⚠️ NE PAS METTRE `service_role_key` dans les variables Vercel!**

### 3.3. Déployer

1. Cliquer sur **"Deploy"**
2. Attendre ~2 minutes
3. Vérifier le build log:
   ```
   ✅ Building...
   ✅ Linting...
   ✅ Compiling...
   ✅ Optimizing...
   ✅ Deployment ready
   ```

### 3.4. Configurer le domaine

1. Aller dans **Settings** > **Domains**
2. Ajouter un domaine custom:
   ```
   app.powalyze.com
   ```
3. Configurer le DNS chez votre registrar:
   ```
   Type: CNAME
   Name: app
   Value: cname.vercel-dns.com
   TTL: 3600
   ```
4. Attendre la propagation DNS (~5-10 minutes)
5. Vérifier que le certificat SSL est actif (✅ https://)

---

## 🔒 Étape 4: Sécuriser l'Application

### 4.1. Activer l'authentification Supabase

Dans Supabase Dashboard > **Authentication** > **Settings**:

1. **Site URL**: `https://app.powalyze.com`
2. **Redirect URLs**: Ajouter:
   ```
   https://app.powalyze.com/app/dashboard
   https://app.powalyze.com/app/portfolio-view
   ```
3. **Email Templates**: Personnaliser les emails de confirmation, reset password, etc.
4. **Enable Email Confirmations**: ✅ Activé (recommandé pour prod)

### 4.2. Configurer les RLS Policies

Vérifier que RLS est activé sur TOUTES les tables:

```sql
-- Vérifier
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Si une table n'a pas RLS:
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

### 4.3. Auditer les permissions

```sql
-- Lister toutes les policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

Vérifier qu'il y a au minimum:
- 1 policy SELECT par table (lecture)
- 1 policy INSERT/UPDATE/DELETE avec restrictions par rôle

---

## 📊 Étape 5: Monitoring & Analytics

### 5.1. Configurer Supabase Monitoring

Dans Supabase Dashboard > **Reports**:

1. Activer **Database Health**
2. Activer **API Usage**
3. Configurer les alertes:
   - CPU > 80% pendant 5 minutes
   - Disk usage > 90%
   - Connection pool saturé

### 5.2. (Optionnel) Intégrer Sentry

```bash
npm install @sentry/react @sentry/vite-plugin
```

**vite.config.js:**
```javascript
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default {
  plugins: [
    sentryVitePlugin({
      org: 'votre-org',
      project: 'powalyze',
      authToken: process.env.SENTRY_AUTH_TOKEN
    })
  ]
};
```

**src/main.jsx:**
```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});
```

### 5.3. (Optionnel) Google Analytics

**index.html:**
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🧪 Étape 6: Tests de Validation

### 6.1. Tests Fonctionnels

**Checklist:**
- [ ] Login avec `marie.dupont@acme.com` / `password123`
- [ ] Accéder à `/app/portfolio-view` → Voir 2 portfolios
- [ ] Filtrer par statut ACTIVE → Voir 2 portfolios
- [ ] Cliquer sur "Transformation Digitale" → Voir 4 projets
- [ ] Accéder à `/app/committees` → Voir 2 comités (1 CLOSED, 1 PLANNED)
- [ ] Filtrer "À venir" → Voir 1 comité (15 janvier 2026)
- [ ] Accéder à `/app/decisions` → Voir 2 décisions (1 TAKEN, 1 PLANNED)
- [ ] Accéder à `/app/risk-intelligence` → Voir 3 risques
- [ ] Onglet "Matrice" → Voir la heatmap 5x5 avec 1 risque en zone rouge (severity=20)
- [ ] Onglet "Signaux IA" → Voir 2 signaux non-acknowledged

### 6.2. Tests de Performance

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --collect.url=https://app.powalyze.com
```

**Critères:**
- ✅ Performance > 90
- ✅ Accessibility > 95
- ✅ Best Practices > 95
- ✅ SEO > 90

### 6.3. Tests de Sécurité

```bash
# OWASP ZAP scan
docker run -t owasp/zap2docker-stable zap-baseline.py -t https://app.powalyze.com
```

**Vérifications:**
- ✅ Pas de failles XSS
- ✅ HTTPS forcé
- ✅ Headers de sécurité présents (CSP, X-Frame-Options, etc.)
- ✅ RLS actif (pas de leak de données entre orgs)

---

## 📝 Étape 7: Documentation & Handover

### 7.1. Créer un Runbook

**Fichier: `docs/RUNBOOK.md`**

```markdown
# Runbook Powalyze Governance

## 🚨 Alertes Critiques

### Database Connection Error
**Symptôme:** "Could not connect to database"
**Cause:** Supabase down ou credentials invalides
**Action:**
1. Vérifier status.supabase.com
2. Vérifier VITE_SUPABASE_URL dans Vercel
3. Tester connexion: `psql postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres`

### RLS Policy Violation
**Symptôme:** "new row violates row-level security policy"
**Cause:** User n'a pas les permissions requises
**Action:**
1. Vérifier le rôle du user dans la table `users`
2. Vérifier les policies sur la table concernée
3. Logs SQL: `SELECT * FROM pg_policies WHERE tablename = 'table_name';`

## 📊 Monitoring

- **Supabase Dashboard**: https://app.supabase.com/project/xxx
- **Vercel Dashboard**: https://vercel.com/votre-org/powalyze
- **Sentry (si activé)**: https://sentry.io/organizations/votre-org/projects/powalyze/

## 🔧 Commandes Utiles

### Rollback Deployment
```bash
vercel rollback https://app.powalyze.com
```

### Reset Database (DEV ONLY)
```bash
psql postgresql://... -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
# Puis ré-exécuter migrations
```
```

### 7.2. Former l'équipe

**Sessions de formation:**
1. **PMO** (Marie): Préparer un comité, tracer décisions
2. **Executive** (Jean): Approuver décisions, consulter dashboard
3. **Data** (Sophie): Configurer KPI, exporter vers Power BI
4. **PM** (Thomas, Claire): Déclarer risques, mettre à jour projets

**Supports:**
- 📖 [SAAS_COMPLETE_DOCUMENTATION.md](../src/docs/SAAS_COMPLETE_DOCUMENTATION.md)
- 💡 [USAGE_EXAMPLES.md](../src/docs/USAGE_EXAMPLES.md)
- 📚 [README_GOVERNANCE.md](../README_GOVERNANCE.md)

---

## ✅ Checklist Finale de Déploiement

### Infrastructure
- [ ] Projet Supabase créé et provisionné
- [ ] Migration SQL exécutée avec succès
- [ ] RLS activé et policies configurées
- [ ] Seed data chargé (dev/staging uniquement)
- [ ] Backups automatiques activés (Supabase Pro)

### Application
- [ ] Variables d'environnement configurées dans Vercel
- [ ] Build production réussi
- [ ] Déploiement Vercel actif
- [ ] Domaine custom configuré + SSL
- [ ] Redirects HTTP → HTTPS actifs

### Sécurité
- [ ] Authentification Supabase activée
- [ ] Email confirmations activées
- [ ] RLS policies auditées
- [ ] Headers de sécurité configurés
- [ ] Scan OWASP ZAP passé

### Monitoring
- [ ] Supabase Reports activés
- [ ] Alertes configurées
- [ ] Sentry intégré (optionnel)
- [ ] Google Analytics intégré (optionnel)
- [ ] Lighthouse score > 90

### Tests
- [ ] Tests fonctionnels: Login, Navigation, CRUD
- [ ] Tests de performance: Lighthouse
- [ ] Tests de sécurité: OWASP ZAP
- [ ] Tests RLS: Isolation entre orgs

### Documentation
- [ ] Runbook créé
- [ ] Documentation utilisateur complète
- [ ] Formation équipe planifiée
- [ ] Support contacts définis

---

## 🎉 Go-Live!

Une fois tous les items cochés:

1. **Annonce interne:**
   ```
   🚀 Powalyze Governance est en ligne!
   
   URL: https://app.powalyze.com
   Credentials de test: marie.dupont@acme.com / password123
   
   Features disponibles:
   ✅ Portfolio View
   ✅ Committee Management
   ✅ Decision Hub
   ✅ Risk Intelligence with AI Signals
   
   Support: support@powalyze.com
   ```

2. **Annonce clients** (si applicable):
   - Email de lancement
   - Webinar de démo
   - Office hours pour questions

3. **Monitoring post-launch:**
   - Surveiller Sentry pour erreurs
   - Vérifier Supabase usage
   - Collecter feedback users

---

## 📞 Support

- **Email:** support@powalyze.com
- **Slack:** #powalyze-support
- **On-call:** +33 X XX XX XX XX
- **Documentation:** https://docs.powalyze.com

---

**Version:** 1.0  
**Date:** 2026-01-09  
**Responsable déploiement:** Équipe Powalyze
