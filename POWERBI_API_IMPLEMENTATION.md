# 🔐 Power BI Token API - Guide d'Implémentation Production

## 📋 Prérequis Azure

### 1. Azure AD App Registration

#### Créer l'application
```bash
# Via Azure Portal
1. Aller sur https://portal.azure.com
2. Azure Active Directory → App registrations → New registration
3. Name: "Powalyze-PowerBI-Embed"
4. Supported account types: "Accounts in this organizational directory only"
5. Redirect URI: (laisser vide pour l'API)
6. Register
```

#### Noter les valeurs
```
Application (client) ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Directory (tenant) ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

#### Créer Client Secret
```bash
1. Certificates & secrets → New client secret
2. Description: "Powalyze API Secret"
3. Expires: 24 months (recommandé)
4. Add
5. COPIER LA VALEUR IMMÉDIATEMENT (ne sera plus visible)
```

#### Configurer API Permissions
```bash
1. API permissions → Add a permission
2. Power BI Service → Delegated permissions
3. Sélectionner :
   - Report.Read.All
   - Dataset.Read.All
   - Workspace.Read.All
4. Grant admin consent for [organization]
```

---

### 2. Power BI Workspace Configuration

#### Ajouter l'App au Workspace
```bash
1. Aller sur https://app.powerbi.com
2. Workspaces → Sélectionner votre workspace
3. Access → Add user/group
4. Chercher le nom de votre App (Powalyze-PowerBI-Embed)
5. Role: Member ou Admin
6. Add
```

#### Noter Workspace ID
```bash
1. Dans Power BI → Settings → Workspace
2. URL contient: https://app.powerbi.com/groups/{WORKSPACE_ID}/...
3. Copier le WORKSPACE_ID (GUID)
```

#### Noter Report IDs
```bash
Pour chaque rapport :
1. Ouvrir le rapport
2. URL: https://app.powerbi.com/groups/{WORKSPACE_ID}/reports/{REPORT_ID}/...
3. Copier chaque REPORT_ID

Mapping :
- Dashboard Commercial → xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
- Analyse Financière → xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
- KPIs PMO → xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
- Prédictive → xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
- Opérationnelle → xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
- Stratégique → xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

---

## 🛠️ Implémentation Backend

### Option 1 : Node.js / Express API

#### Installation
```bash
npm install express @azure/msal-node dotenv cors
```

#### Fichier `.env`
```env
# Azure AD Configuration
AZURE_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_CLIENT_SECRET=votre_client_secret_tres_secret

# Power BI Configuration
POWERBI_WORKSPACE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Report Mapping
REPORT_COMMERCIAL=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REPORT_FINANCE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REPORT_PMO=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REPORT_PREDICTIVE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REPORT_OPERATIONAL=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REPORT_STRATEGIC=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Server Configuration
PORT=3001
NODE_ENV=production
```

#### `server.js`
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ConfidentialClientApplication } = require('@azure/msal-node');

const app = express();
app.use(cors());
app.use(express.json());

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET
  }
};

const msalClient = new ConfidentialClientApplication(msalConfig);

// Report Type to ID Mapping
const reportMapping = {
  'commercial': process.env.REPORT_COMMERCIAL,
  'finance': process.env.REPORT_FINANCE,
  'pmo': process.env.REPORT_PMO,
  'predictive': process.env.REPORT_PREDICTIVE,
  'operational': process.env.REPORT_OPERATIONAL,
  'strategic': process.env.REPORT_STRATEGIC
};

// GET Access Token from Azure AD
async function getAccessToken() {
  try {
    const tokenResponse = await msalClient.acquireTokenByClientCredential({
      scopes: ['https://analysis.windows.net/powerbi/api/.default']
    });
    return tokenResponse.accessToken;
  } catch (error) {
    console.error('Error acquiring token:', error);
    throw error;
  }
}

// GET Report Details
async function getReportDetails(accessToken, reportId) {
  const url = `https://api.powerbi.com/v1.0/myorg/groups/${process.env.POWERBI_WORKSPACE_ID}/reports/${reportId}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Power BI API error: ${response.statusText}`);
  }

  return await response.json();
}

// GENERATE Embed Token
async function generateEmbedToken(accessToken, reportId) {
  const url = `https://api.powerbi.com/v1.0/myorg/groups/${process.env.POWERBI_WORKSPACE_ID}/reports/${reportId}/GenerateToken`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      accessLevel: 'View',
      allowSaveAs: false
    })
  });

  if (!response.ok) {
    throw new Error(`Generate token error: ${response.statusText}`);
  }

  return await response.json();
}

// ENDPOINT: POST /api/powerbi/token
app.post('/api/powerbi/token', async (req, res) => {
  try {
    const { reportType } = req.body;

    if (!reportType) {
      return res.status(400).json({ error: 'reportType is required' });
    }

    // Map report type to actual ID
    const reportId = reportMapping[reportType];
    
    if (!reportId) {
      return res.status(404).json({ error: `Report type '${reportType}' not found` });
    }

    // Step 1: Get Azure AD access token
    const accessToken = await getAccessToken();

    // Step 2: Get report details
    const reportDetails = await getReportDetails(accessToken, reportId);

    // Step 3: Generate embed token
    const embedToken = await generateEmbedToken(accessToken, reportId);

    // Response
    res.json({
      embedUrl: reportDetails.embedUrl,
      accessToken: embedToken.token,
      reportId: reportId,
      reportName: reportDetails.name,
      tokenType: 'Embed',
      expiresAt: embedToken.expiration
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate embed token',
      message: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Power BI Token API running on port ${PORT}`);
  console.log(`📊 Workspace ID: ${process.env.POWERBI_WORKSPACE_ID}`);
  console.log(`✅ ${Object.keys(reportMapping).length} reports configured`);
});
```

#### `package.json`
```json
{
  "name": "powalyze-powerbi-api",
  "version": "1.0.0",
  "description": "Power BI Embed Token API for Powalyze",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "@azure/msal-node": "^2.6.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

---

### Option 2 : Vercel Serverless Function

#### `api/powerbi/token.js`
```javascript
import { ConfidentialClientApplication } from '@azure/msal-node';

// MSAL Config
const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET
  }
};

const reportMapping = {
  'commercial': process.env.REPORT_COMMERCIAL,
  'finance': process.env.REPORT_FINANCE,
  'pmo': process.env.REPORT_PMO,
  'predictive': process.env.REPORT_PREDICTIVE,
  'operational': process.env.REPORT_OPERATIONAL,
  'strategic': process.env.REPORT_STRATEGIC
};

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { reportType } = req.body;

    if (!reportType) {
      return res.status(400).json({ error: 'reportType is required' });
    }

    const reportId = reportMapping[reportType];
    
    if (!reportId) {
      return res.status(404).json({ error: `Report type '${reportType}' not found` });
    }

    // Get Azure AD token
    const msalClient = new ConfidentialClientApplication(msalConfig);
    const tokenResponse = await msalClient.acquireTokenByClientCredential({
      scopes: ['https://analysis.windows.net/powerbi/api/.default']
    });

    // Get report details
    const reportResponse = await fetch(
      `https://api.powerbi.com/v1.0/myorg/groups/${process.env.POWERBI_WORKSPACE_ID}/reports/${reportId}`,
      {
        headers: {
          'Authorization': `Bearer ${tokenResponse.accessToken}`
        }
      }
    );

    const reportData = await reportResponse.json();

    // Generate embed token
    const embedResponse = await fetch(
      `https://api.powerbi.com/v1.0/myorg/groups/${process.env.POWERBI_WORKSPACE_ID}/reports/${reportId}/GenerateToken`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenResponse.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accessLevel: 'View',
          allowSaveAs: false
        })
      }
    );

    const embedData = await embedResponse.json();

    res.status(200).json({
      embedUrl: reportData.embedUrl,
      accessToken: embedData.token,
      reportId: reportId,
      reportName: reportData.name,
      tokenType: 'Embed',
      expiresAt: embedData.expiration
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate embed token',
      message: error.message 
    });
  }
}
```

#### Vercel Environment Variables
```bash
# Via Vercel Dashboard ou CLI
vercel env add AZURE_CLIENT_ID
vercel env add AZURE_TENANT_ID
vercel env add AZURE_CLIENT_SECRET
vercel env add POWERBI_WORKSPACE_ID
vercel env add REPORT_COMMERCIAL
vercel env add REPORT_FINANCE
vercel env add REPORT_PMO
vercel env add REPORT_PREDICTIVE
vercel env add REPORT_OPERATIONAL
vercel env add REPORT_STRATEGIC
```

---

## 🔄 Mise à Jour Frontend

### `src/api/powerbiToken.js`
```javascript
// REMPLACER le mock par l'appel réel

export async function getPowerBIToken(reportType) {
  try {
    const response = await fetch(
      process.env.NODE_ENV === 'production'
        ? 'https://api.powalyze.com/api/powerbi/token' // Votre API
        : 'http://localhost:3001/api/powerbi/token',   // Dev local
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reportType })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching Power BI token:', error);
    throw new Error(`Failed to get Power BI token: ${error.message}`);
  }
}
```

### `src/pages/PowerBI.jsx`
```javascript
// MODIFIER loadReport pour utiliser reportType

const loadReport = async (report) => {
  setLoading(true);
  setError(null);
  setSelectedReport(report);
  setActiveView('embedded');

  try {
    // Appel avec report.type au lieu de report.id
    const tokenData = await getPowerBIToken(report.type);

    // Reste du code identique...
    const config = {
      type: 'report',
      id: tokenData.reportId,
      embedUrl: tokenData.embedUrl,
      accessToken: tokenData.accessToken,
      tokenType: powerbi.models.TokenType.Embed,
      settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true,
        background: powerbi.models.BackgroundType.Transparent,
        layoutType: powerbi.models.LayoutType.Custom,
        customLayout: {
          displayOption: powerbi.models.DisplayOption.FitToWidth
        }
      }
    };

    const powerbiService = new powerbi.service.Service(
      powerbi.factories.hpmFactory,
      powerbi.factories.wpmpFactory,
      powerbi.factories.routerFactory
    );

    const embeddedReport = powerbiService.embed(reportContainerRef.current, config);

    embeddedReport.on('loaded', () => {
      console.log('✅ Report loaded successfully');
      setLoading(false);
    });

    embeddedReport.on('error', (event) => {
      console.error('❌ Report error:', event.detail);
      setError(event.detail.message || 'Failed to load report');
      setLoading(false);
    });

    embeddedReport.on('rendered', () => {
      console.log('✅ Report rendered');
    });

    embeddedReportRef.current = embeddedReport;
    setEmbedConfig({ embedUrl: tokenData.embedUrl });

  } catch (err) {
    console.error('❌ Load report error:', err);
    setError(err.message || 'An error occurred while loading the report');
    setLoading(false);
  }
};
```

---

## 🔐 Sécurité & Best Practices

### 1. Token Expiration & Refresh
```javascript
// Frontend: Auto-refresh avant expiration

let tokenRefreshTimer;

const loadReport = async (report) => {
  // ... code existant ...

  // Schedule token refresh (1 minute avant expiration)
  const expiresIn = new Date(tokenData.expiresAt) - new Date();
  const refreshIn = expiresIn - 60000; // 1 min avant

  if (refreshIn > 0) {
    tokenRefreshTimer = setTimeout(() => {
      refreshEmbedToken(report);
    }, refreshIn);
  }
};

const refreshEmbedToken = async (report) => {
  try {
    const tokenData = await getPowerBIToken(report.type);
    
    // Update embedded report with new token
    if (embeddedReportRef.current) {
      await embeddedReportRef.current.setAccessToken(tokenData.accessToken);
      console.log('✅ Token refreshed successfully');
    }
  } catch (error) {
    console.error('❌ Token refresh failed:', error);
  }
};

// Cleanup on unmount
useEffect(() => {
  return () => {
    if (tokenRefreshTimer) clearTimeout(tokenRefreshTimer);
  };
}, []);
```

### 2. Row Level Security (RLS)
```javascript
// Backend: Ajouter RLS basé sur utilisateur

app.post('/api/powerbi/token', async (req, res) => {
  try {
    const { reportType, userId, userEmail } = req.body;

    // ... code existant ...

    // Generate embed token avec RLS
    const embedToken = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessLevel: 'View',
        allowSaveAs: false,
        identities: [
          {
            username: userEmail,
            roles: ['SalesRole'], // Basé sur profil utilisateur
            datasets: [datasetId]
          }
        ]
      })
    });

    // ... suite ...
  }
});
```

### 3. Rate Limiting
```javascript
// Backend: Limiter requêtes par utilisateur

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes max
  message: 'Too many requests from this IP'
});

app.use('/api/powerbi', limiter);
```

### 4. Authentication Check
```javascript
// Backend: Vérifier JWT utilisateur

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

app.post('/api/powerbi/token', authMiddleware, async (req, res) => {
  // ... code avec req.user disponible ...
});
```

---

## 🧪 Tests

### Test Local
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Test endpoint
curl -X POST http://localhost:3001/api/powerbi/token \
  -H "Content-Type: application/json" \
  -d '{"reportType":"commercial"}'

# Expected response:
{
  "embedUrl": "https://app.powerbi.com/reportEmbed?...",
  "accessToken": "H4sI...",
  "reportId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "reportName": "Dashboard Commercial",
  "tokenType": "Embed",
  "expiresAt": "2025-01-20T15:30:00.000Z"
}
```

### Test Production
```bash
curl -X POST https://api.powalyze.com/api/powerbi/token \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"reportType":"finance"}'
```

---

## 📦 Déploiement

### Option 1 : VPS / Docker
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
```

```bash
# Build & Run
docker build -t powalyze-powerbi-api .
docker run -p 3001:3001 --env-file .env powalyze-powerbi-api
```

### Option 2 : Vercel Serverless
```bash
# Deploy
vercel --prod

# Set environment variables
vercel env add AZURE_CLIENT_ID production
vercel env add AZURE_TENANT_ID production
vercel env add AZURE_CLIENT_SECRET production
# ... repeat for all vars
```

### Option 3 : Azure Functions
```bash
# Install Azure Functions Core Tools
npm install -g azure-functions-core-tools@4

# Create function
func init PowerBITokenAPI --worker-runtime node
cd PowerBITokenAPI
func new --name GenerateToken --template "HTTP trigger"

# Deploy
func azure functionapp publish <FunctionAppName>
```

---

## 📊 Monitoring

### Logs à Surveiller
- Nombre de requêtes token par heure
- Taux d'erreurs Azure AD
- Temps de réponse API Power BI
- Expirations token prématurées
- Échecs RLS

### Alertes Recommandées
- Taux d'erreur > 5%
- Temps réponse > 3 secondes
- Token expiré avant refresh
- Azure quota dépassé

---

## 🆘 Troubleshooting

### Error: "Invalid client credentials"
→ Vérifier AZURE_CLIENT_SECRET dans .env

### Error: "Report not found"
→ Vérifier REPORT_ID mappings
→ Vérifier App a accès au Workspace

### Error: "Token expired"
→ Implémenter auto-refresh token
→ Vérifier timezone serveur vs Azure

### Error: "CORS blocked"
→ Ajouter domain dans CORS whitelist
→ Vérifier headers Access-Control-Allow-*

---

## 📚 Ressources

- [Power BI Embedded Documentation](https://learn.microsoft.com/en-us/power-bi/developer/embedded/)
- [Azure MSAL Node](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-node)
- [Power BI REST API](https://learn.microsoft.com/en-us/rest/api/power-bi/)
- [RLS Guide](https://learn.microsoft.com/en-us/power-bi/admin/service-admin-rls)

---

**Version** : 1.0.0
**Date** : 2025-01-20
**Status** : 📝 Ready for Implementation
