# 🔐 Power BI Secure Backend Architecture

## 📋 Vue d'ensemble

Powalyze utilise une **architecture backend sécurisée** pour générer les tokens Power BI.  
**Aucun secret n'est exposé côté client** - tous les credentials restent sur le serveur.

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  Frontend Vite  │  POST   │  Backend API    │  OAuth  │  Azure AD +     │
│  (React)        │ ──────> │  (Express)      │ ──────> │  Power BI API   │
│  Port 5173      │         │  Port 3001      │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
      │                              │                             │
      │  Token request               │  1. Get Azure AD token      │
      │  { reportType: 'portfolio' } │  2. Get embed URL           │
      │                              │  3. Generate embed token    │
      │ <─────────────────────────── │                             │
      │  { token, embedUrl }         │                             │
```

---

## 🔐 Sécurité

### ✅ Ce qui est sécurisé

| Variable | Localisation | Exposition |
|----------|--------------|------------|
| `PBI_TENANT_ID` | Backend `.env` | ❌ Jamais exposé |
| `PBI_CLIENT_ID` | Backend `.env` | ❌ Jamais exposé |
| `PBI_CLIENT_SECRET` | Backend `.env` | ❌ Jamais exposé |
| `PBI_WORKSPACE_ID` | Backend `.env` | ❌ Jamais exposé |
| `PBI_REPORT_*_ID` | Backend `.env` | ❌ Jamais exposé |

### ✅ Ce qui est exposé (sans risque)

| Variable | Localisation | Exposition |
|----------|--------------|------------|
| `VITE_BACKEND_URL` | Frontend `.env.local` | ✅ URL publique (localhost ou API) |
| Embed Token | Réponse API | ✅ Token temporaire (expire en 1h) |

---

## 📁 Structure des fichiers

### Backend (Express)

```
backend/
├── .env                     # 🔐 Variables sécurisées (JAMAIS commitées)
├── server.js                # API Express avec endpoints Power BI
├── package.json             # Dependencies: express, cors, dotenv, axios
└── README.md                # Documentation backend
```

### Frontend (Vite + React)

```
src/
├── pages/
│   ├── ReportsHome.jsx      # Liste des rapports
│   └── ReportViewer.jsx     # Viewer avec token backend
├── lib/
│   └── powerbi-reports.js   # Configuration multi-rapports
└── App.jsx                  # Routes React Router
```

---

## 🚀 Configuration

### 1. Backend (backend/.env)

Créer `backend/.env` avec tes credentials Azure :

```env
# Azure AD Configuration
PBI_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PBI_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PBI_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PBI_WORKSPACE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Rapports multi-rapports
PBI_REPORT_PORTFOLIO_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PBI_REPORT_PROJECTS_ID=yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy
PBI_REPORT_CAPACITY_ID=zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 2. Frontend (.env.local)

Créer `.env.local` (racine du projet) :

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:3001
```

**⚠️ IMPORTANT** : Les anciennes variables `VITE_POWERBI_*` ne sont plus nécessaires côté frontend.  
Tous les secrets sont maintenant dans `backend/.env`.

---

## 📡 Endpoints API

### POST `/api/powerbi/token`

Génère un token sécurisé pour un rapport spécifique.

**Request:**
```json
{
  "reportType": "portfolio",  // ou "projects", "capacity"
  "reportId": "optional-direct-id",
  "userEmail": "user@example.com",  // optionnel (RLS)
  "userRoles": ["Manager"]           // optionnel (RLS)
}
```

**Response:**
```json
{
  "token": "eyJ0eXAiOiJKV1Qi...",
  "embedUrl": "https://app.powerbi.com/reportEmbed?reportId=...",
  "reportId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "expiration": "2026-01-08T15:30:00Z",
  "tokenType": "Embed"
}
```

### GET `/api/powerbi/reports`

Liste tous les rapports configurés.

**Response:**
```json
{
  "reports": [
    {
      "type": "portfolio",
      "name": "Portefeuille stratégique",
      "configured": true
    },
    {
      "type": "projects",
      "name": "Suivi des projets",
      "configured": true
    }
  ],
  "total": 2
}
```

### GET `/health`

Vérifie l'état du serveur et de la configuration.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-08T14:25:00Z",
  "configured": true,
  "reports": 6
}
```

---

## 🔄 Flux de données

### 1. Frontend demande un token

```javascript
// src/pages/ReportViewer.jsx

const response = await fetch(`${backendUrl}/api/powerbi/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    reportType: 'portfolio',
  }),
});

const { token, embedUrl } = await response.json();
```

### 2. Backend génère le token

```javascript
// backend/server.js

// Étape 1: OAuth2 Azure AD
const aadToken = await getAzureADToken();

// Étape 2: Récupérer embedUrl
const embedUrl = await getReportEmbedUrl(aadToken, reportId);

// Étape 3: Générer embed token
const embedToken = await generateEmbedToken(aadToken, reportId);

// Retour au client
res.json({ token: embedToken.token, embedUrl });
```

### 3. Frontend affiche le rapport

```javascript
<PowerBIEmbed
  embedConfig={{
    type: 'report',
    id: reportId,
    embedUrl: embedUrl,
    accessToken: token,  // Token obtenu du backend
    tokenType: models.TokenType.Embed,
  }}
/>
```

---

## 🧪 Tests

### 1. Démarrer le backend

```bash
cd backend
npm install
npm run dev  # ou npm start
```

**Résultat attendu :**
```
🚀 Power BI Backend API listening on port 3001
🔐 Backend configured: true
📊 Reports configured: 6
```

### 2. Tester l'endpoint token

```bash
curl -X POST http://localhost:3001/api/powerbi/token \
  -H "Content-Type: application/json" \
  -d '{"reportType": "portfolio"}'
```

**Réponse attendue :**
```json
{
  "token": "eyJ0eXAiOiJKV1Qi...",
  "embedUrl": "https://app.powerbi.com/reportEmbed?...",
  "reportId": "xxx-xxx-xxx",
  "expiration": "2026-01-08T15:30:00Z",
  "tokenType": "Embed"
}
```

### 3. Démarrer le frontend

```bash
npm run dev
```

**Naviguer vers :**
- http://localhost:5173/app/reports → Liste des rapports
- http://localhost:5173/app/reports/portfolio → Rapport Portfolio

---

## 📦 Déploiement

### Backend (Railway / Render / Azure App Service)

1. **Variables d'environnement** : Configurer toutes les variables `PBI_*` dans le dashboard
2. **Build command** : `cd backend && npm install`
3. **Start command** : `cd backend && npm start`
4. **Port** : `3001` (ou variable `PORT`)

### Frontend (Vercel)

1. **Variables d'environnement** :
   ```
   VITE_BACKEND_URL=https://your-backend.railway.app
   ```
2. **Build command** : `npm run build`
3. **Output directory** : `dist`

---

## ✅ Avantages de cette architecture

| Critère | Ancienne méthode (Frontend) | Nouvelle méthode (Backend) |
|---------|----------------------------|----------------------------|
| **Sécurité** | ❌ Tokens exposés dans code | ✅ Tokens côté serveur uniquement |
| **Secrets** | ❌ CLIENT_SECRET dans .env.local | ✅ Jamais exposés au client |
| **Token refresh** | ❌ Manuel | ✅ Automatique à chaque appel |
| **RLS support** | ⚠️ Limité | ✅ Complet (userEmail, userRoles) |
| **Multi-tenant** | ❌ Difficile | ✅ Possible (1 token par user) |
| **Conformité** | ❌ Non enterprise | ✅ Microsoft Enterprise-grade |
| **Performance** | ⚠️ 1h expiration fixe | ✅ Token fresh à chaque vue |

---

## 🆘 Troubleshooting

### Erreur : "Failed to get Azure AD token"

**Cause** : Credentials Azure AD incorrects  
**Solution** : Vérifier `PBI_TENANT_ID`, `PBI_CLIENT_ID`, `PBI_CLIENT_SECRET` dans `backend/.env`

### Erreur : "Failed to generate embed token"

**Cause** : Report ID ou Workspace ID incorrect  
**Solution** : Vérifier `PBI_WORKSPACE_ID` et `PBI_REPORT_*_ID` dans `backend/.env`

### Erreur CORS : "Access-Control-Allow-Origin"

**Cause** : Frontend et backend sur domaines différents  
**Solution** : Configurer `FRONTEND_URL` dans `backend/.env` :
```env
FRONTEND_URL=http://localhost:5173
# ou en production :
FRONTEND_URL=https://www.powalyze.com
```

### Frontend : "Failed to fetch token"

**Cause** : Backend non démarré ou URL incorrecte  
**Solution** :
1. Vérifier que le backend tourne : `cd backend && npm run dev`
2. Vérifier `VITE_BACKEND_URL` dans `.env.local`

---

## 📚 Ressources

- [Microsoft Power BI Embedded Documentation](https://learn.microsoft.com/power-bi/developer/embedded/)
- [Azure AD OAuth2 Client Credentials Flow](https://learn.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow)
- [Power BI REST API Reference](https://learn.microsoft.com/rest/api/power-bi/)
- [Row-Level Security (RLS) Configuration](https://learn.microsoft.com/power-bi/enterprise/service-admin-rls)

---

## ✅ Checklist finale

- [ ] Backend configuré avec toutes les variables `PBI_*`
- [ ] Backend démarré : `cd backend && npm run dev`
- [ ] Frontend configuré avec `VITE_BACKEND_URL`
- [ ] Frontend démarré : `npm run dev`
- [ ] Tests des 3 rapports (portfolio, projects, capacity)
- [ ] Vérification des logs backend (token généré sans erreurs)
- [ ] Vérification des logs frontend (rapport affiché sans erreurs)
- [ ] Configuration production (Vercel + Railway/Render)

---

🎉 **Architecture Enterprise-grade activée !**  
Tous les secrets sont maintenant protégés côté serveur.
