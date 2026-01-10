# Configuration Backend Power BI

## ✅ Étape 1 : Azure AD App Registration

1. **Allez sur Azure Portal** : https://portal.azure.com
2. **Azure Active Directory** → **App registrations** → **New registration**
3. **Nom** : `Powalyze Power BI API`
4. **Supported account types** : Single tenant
5. **Redirect URI** : (laisser vide)
6. **Cliquez sur Register**

## ✅ Étape 2 : Copier les IDs

1. **Application (client) ID** → Copiez dans `.env` → `PBI_CLIENT_ID`
2. **Directory (tenant) ID** → Copiez dans `.env` → `PBI_TENANT_ID`

## ✅ Étape 3 : Créer un Client Secret

1. **Certificates & secrets** → **New client secret**
2. **Description** : `Powalyze API Key`
3. **Expires** : 24 months
4. **Copiez la VALUE** (pas l'ID !) → `.env` → `PBI_CLIENT_SECRET`

⚠️ **IMPORTANT** : Copiez immédiatement, vous ne pourrez plus le voir !

## ✅ Étape 4 : API Permissions

1. **API permissions** → **Add a permission**
2. **Power BI Service** → **Delegated permissions**
3. **Cochez** :
   - ✅ `Report.Read.All`
   - ✅ `Dataset.Read.All`
   - ✅ `Workspace.Read.All`
4. **Grant admin consent** (bouton) ← Important !

## ✅ Étape 5 : Power BI Workspace

1. **Ouvrez Power BI** : https://app.powerbi.com
2. **Workspaces** → Sélectionnez votre workspace
3. **URL** : `https://app.powerbi.com/groups/XXXXXXXX/...`
4. **Copiez le XXXXXXXX** → `.env` → `PBI_WORKSPACE_ID`

## ✅ Étape 6 : Report IDs

Pour chaque rapport :

1. **Ouvrez le rapport** dans Power BI
2. **URL** : `https://app.powerbi.com/groups/WORKSPACE_ID/reports/REPORT_ID/...`
3. **Copiez le REPORT_ID** → `.env` :
   - `PBI_REPORT_COMMERCIAL`
   - `PBI_REPORT_FINANCE`
   - `PBI_REPORT_PMO`
   - etc.

## ✅ Étape 7 : Fichier .env complet

```dotenv
# Azure AD
PBI_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PBI_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PBI_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Power BI
PBI_WORKSPACE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PBI_REPORT_COMMERCIAL=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PBI_REPORT_FINANCE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PBI_REPORT_PMO=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PBI_REPORT_PREDICTIVE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PBI_REPORT_OPERATIONAL=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PBI_REPORT_STRATEGIC=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## ✅ Étape 8 : Démarrer le serveur

```bash
cd backend
node server.js
```

Vous devriez voir :
```
🚀 Power BI Token API Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 Server running on: http://localhost:3001
📊 Workspace ID: xxxxxxxx...
📄 Reports configured: 6
```

## ✅ Étape 9 : Configuration Frontend

Ajoutez dans `c:\powalyze\.env` :

```dotenv
VITE_PBI_API_URL=http://localhost:3001
```

Redémarrez le frontend :
```bash
npm run dev
```

## ✅ Étape 10 : Test

Visitez : http://localhost:3001/health

Réponse attendue :
```json
{
  "status": "ok",
  "configured": true,
  "timestamp": "2026-01-06T...",
  "reports": 6
}
```

## 🚀 Production

Pour la production, vous pouvez :
1. **Déployer le backend sur Heroku/Railway/Render**
2. **Ou utiliser Vercel Serverless Functions** (plus simple)

Mettez à jour `.env` en production avec l'URL du backend :
```dotenv
VITE_PBI_API_URL=https://votre-backend.herokuapp.com
```

## 🔒 Sécurité

- ❌ Ne committez **JAMAIS** le fichier `.env`
- ✅ Utilisez `.env.example` comme template
- ✅ Régénérez les secrets régulièrement
- ✅ Activez CORS uniquement pour votre domaine en production
