# Configuration Metabase pour Powalyze

## 1. Installation Docker (✅ Déjà fait)

```bash
docker run -d -p 3000:3000 --name metabase metabase/metabase
```

## 2. Configuration Initiale

### Accès à Metabase
- URL: http://localhost:3000
- Créez un compte administrateur

### Connecter Supabase PostgreSQL

1. **Admin → Databases → Add database**
2. Configuration:
   ```
   Type: PostgreSQL
   Host: db.xxxxxx.supabase.co (depuis Supabase dashboard)
   Port: 5432
   Database: postgres
   Username: postgres
   Password: [votre password Supabase]
   ```

## 3. Activer l'Embedding

1. **Admin → Settings → Embedding in other applications**
2. **Enable embedding**
3. **Copiez le `METABASE_SECRET_KEY`**

## 4. Créer des Dashboards

1. **New → Dashboard**
2. Ajoutez des questions/visualisations
3. Nommez vos dashboards :
   - "Dashboard Commercial"
   - "Analyse Financière"
   - "KPIs PMO"

## 5. Configurer l'Embedding par Dashboard

Pour chaque dashboard :

1. **Dashboard settings → Sharing**
2. **Enable embedding for this dashboard**
3. Choisissez : **Signed embedding (recommended)** ou **Public link**
4. Notez le **Dashboard ID** depuis l'URL (ex: `/dashboard/1` → ID = 1)

## 6. Configuration Powalyze

### Copier .env.example vers .env

```bash
cp .env.example .env
```

### Éditer .env avec vos valeurs réelles

```env
# Metabase
VITE_METABASE_URL=http://localhost:3000
VITE_METABASE_SECRET_KEY=votre_secret_key_ici

# Dashboard IDs (depuis Metabase)
VITE_METABASE_DASHBOARD_COMMERCIAL=1
VITE_METABASE_DASHBOARD_FINANCE=2
VITE_METABASE_DASHBOARD_PMO=3
```

## 7. Lancer Powalyze

```bash
npm run dev
```

Accédez à PowerBIHub : http://localhost:5173/powerbi

## 8. Déploiement Production (Vercel)

### Ajouter les variables d'environnement sur Vercel

```bash
vercel env add VITE_METABASE_URL
# Entrez: https://metabase.votredomaine.com

vercel env add VITE_METABASE_SECRET_KEY
# Entrez: votre_secret_key

vercel env add VITE_METABASE_DASHBOARD_COMMERCIAL
# Entrez: 1

vercel env add VITE_METABASE_DASHBOARD_FINANCE
# Entrez: 2

vercel env add VITE_METABASE_DASHBOARD_PMO
# Entrez: 3
```

### Déployer

```bash
npm run build
vercel --prod
```

## Sécurité

⚠️ **Ne commitez JAMAIS le fichier .env** (déjà dans .gitignore)

✅ **Utiliser Signed Embedding** (JWT) pour la production, pas Public Links

✅ **HTTPS obligatoire** en production pour Metabase

## Dépannage

### Dashboard ne s'affiche pas

1. Vérifiez console navigateur (F12)
2. Vérifiez `VITE_METABASE_SECRET_KEY` correct
3. Vérifiez Dashboard ID existe dans Metabase
4. Vérifiez embedding activé pour le dashboard

### Erreur CORS

Configurez Metabase pour autoriser votre domaine :
- Admin → Settings → Embedding → Authorized domains
- Ajoutez : `https://www.powalyze.com`

### Token expiré

Le token JWT expire après 10 minutes. Le composant se recharge automatiquement.

## Architecture

```
PowerBIHub.jsx
  ↓ passe dashboardId
MetabaseEmbed.jsx
  → Génère JWT avec jsonwebtoken
  → Construit URL: /embed/dashboard/{token}
  → Affiche iframe
```

## Avantages Metabase

✅ Open source et gratuit
✅ Installation Docker simple
✅ Connexion directe PostgreSQL (Supabase)
✅ Embedding JWT sécurisé
✅ Pas de licence Microsoft
✅ Interface intuitive
