require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const powerbiRouter = require('./routes/powerbi');
const decisionEngineRouter = require('./routes/decisionEngine');

const app = express();

// Middleware - CORS avec domaines de production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://www.powalyze.com',
  'https://powalyze.com',
  'https://powalyze.ch',
  'https://www.powalyze.ch',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// 🆕 Power BI Secure Routes
app.use('/api/powerbi', powerbiRouter);

// 🆕 Decision Engine Routes
app.use('/api/decision-engine', decisionEngineRouter);

// Azure AD Configuration
const TENANT_ID = process.env.PBI_TENANT_ID;
const CLIENT_ID = process.env.PBI_CLIENT_ID;
const CLIENT_SECRET = process.env.PBI_CLIENT_SECRET;
const WORKSPACE_ID = process.env.PBI_WORKSPACE_ID;

// Report Mapping (reportType → Power BI Report ID)
const REPORTS = {
  // Legacy reports
  'commercial': {
    reportId: process.env.PBI_REPORT_COMMERCIAL,
    name: 'Dashboard Commercial'
  },
  'finance': {
    reportId: process.env.PBI_REPORT_FINANCE,
    name: 'Analyse Financière Q4'
  },
  'pmo': {
    reportId: process.env.PBI_REPORT_PMO,
    name: 'KPIs Projet PMO'
  },
  'predictive': {
    reportId: process.env.PBI_REPORT_PREDICTIVE,
    name: 'Analyse Prédictive Q2'
  },
  'operational': {
    reportId: process.env.PBI_REPORT_OPERATIONAL,
    name: 'Efficacité Opérationnelle'
  },
  'strategic': {
    reportId: process.env.PBI_REPORT_STRATEGIC,
    name: 'Roadmap Stratégique 2026'
  },
  // 🔐 Multi-rapports sécurisés (nouveau)
  'portfolio': {
    reportId: process.env.PBI_REPORT_PORTFOLIO_ID,
    name: 'Portefeuille stratégique',
    description: 'Vue d\'ensemble du portefeuille de projets'
  },
  'projects': {
    reportId: process.env.PBI_REPORT_PROJECTS_ID,
    name: 'Suivi des projets',
    description: 'Tableau de bord détaillé des projets en cours'
  },
  'capacity': {
    reportId: process.env.PBI_REPORT_CAPACITY_ID,
    name: 'Capacités & Ressources',
    description: 'Analyse des capacités et ressources disponibles'
  }
};

/**
 * Get Azure AD Access Token
 */
async function getAzureADToken() {
  const url = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
  
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'https://analysis.windows.net/powerbi/api/.default',
    grant_type: 'client_credentials'
  });

  const response = await fetch(url, {
    method: 'POST',
    body: params
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('❌ Azure AD Token Error:', error);
    throw new Error('Failed to get Azure AD token');
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Get Report Embed URL from Power BI
 */
async function getReportEmbedUrl(accessToken, reportId) {
  const url = `https://api.powerbi.com/v1.0/myorg/groups/${WORKSPACE_ID}/reports/${reportId}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('❌ Power BI Report Error:', error);
    throw new Error('Failed to get report details');
  }

  const data = await response.json();
  return data.embedUrl;
}

/**
 * Generate Power BI Embed Token
 */
async function generateEmbedToken(accessToken, reportId, userEmail = null, userRoles = []) {
  const url = `https://api.powerbi.com/v1.0/myorg/groups/${WORKSPACE_ID}/reports/${reportId}/GenerateToken`;
  
  const body = {
    accessLevel: 'View',
    allowSaveAs: false
  };

  // Add RLS (Row Level Security) if user info provided
  if (userEmail && userRoles.length > 0) {
    body.identities = [
      {
        username: userEmail,
        roles: userRoles,
        datasets: [/* Add dataset IDs if needed */]
      }
    ];
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('❌ Embed Token Error:', error);
    throw new Error('Failed to generate embed token');
  }

  const data = await response.json();
  return {
    token: data.token,
    tokenId: data.tokenId,
    expiration: data.expiration
  };
}

/**
 * POST /api/powerbi/token
 * 🔐 NEW SECURE ENDPOINT - Generate token for specific report ID
 * Compatible with multi-reports architecture (portfolio, projects, capacity)
 */
app.post('/api/powerbi/token', async (req, res) => {
  try {
    const { reportId, reportType, userEmail, userRoles } = req.body;

    // Validate input: either reportId or reportType must be provided
    if (!reportId && !reportType) {
      return res.status(400).json({ 
        error: 'Either reportId or reportType is required',
        availableTypes: Object.keys(REPORTS)
      });
    }

    // Determine actual report ID
    let actualReportId = reportId;
    let reportName = 'Custom Report';

    if (reportType) {
      const reportConfig = REPORTS[reportType];
      
      if (!reportConfig || !reportConfig.reportId) {
        return res.status(404).json({ 
          error: `Report type '${reportType}' not found or not configured`,
          availableTypes: Object.keys(REPORTS)
        });
      }

      actualReportId = reportConfig.reportId;
      reportName = reportConfig.name;
    }

    console.log(`🔐 Generating secure token for report: ${reportName} (${actualReportId})`);

    // Step 1: Get Azure AD token
    const aadToken = await getAzureADToken();
    console.log('✅ Azure AD token obtained');

    // Step 2: Get report embed URL
    const embedUrl = await getReportEmbedUrl(aadToken, actualReportId);
    console.log('✅ Report embed URL obtained');

    // Step 3: Generate embed token (with optional RLS)
    const embedToken = await generateEmbedToken(
      aadToken, 
      actualReportId,
      userEmail,
      userRoles || []
    );
    console.log('✅ Embed token generated');

    // Response (simplified for frontend)
    res.json({
      token: embedToken.token,
      embedUrl: embedUrl,
      reportId: actualReportId,
      expiration: embedToken.expiration,
      tokenType: 'Embed'
    });

    console.log(`✅ Token sent to client for report: ${reportName}`);

  } catch (error) {
    console.error('❌ Token Generation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate Power BI token',
      message: error.message 
    });
  }
});

/**
 * POST /api/powerbi/embed
 * Generate Power BI Embed Token
 */
app.post('/api/powerbi/embed', async (req, res) => {
  try {
    const { reportType, userId, userEmail, userRoles } = req.body;

    // Validate reportType
    if (!reportType) {
      return res.status(400).json({ 
        error: 'reportType is required',
        availableTypes: Object.keys(REPORTS)
      });
    }

    const reportConfig = REPORTS[reportType];
    
    if (!reportConfig || !reportConfig.reportId) {
      return res.status(404).json({ 
        error: `Report type '${reportType}' not found or not configured`,
        availableTypes: Object.keys(REPORTS)
      });
    }

    console.log(`📊 Generating embed token for report: ${reportType} (${reportConfig.name})`);

    // Step 1: Get Azure AD token
    const aadToken = await getAzureADToken();
    console.log('✅ Azure AD token obtained');

    // Step 2: Get report embed URL
    const embedUrl = await getReportEmbedUrl(aadToken, reportConfig.reportId);
    console.log('✅ Report embed URL obtained');

    // Step 3: Generate embed token (with optional RLS)
    const embedToken = await generateEmbedToken(
      aadToken, 
      reportConfig.reportId,
      userEmail,
      userRoles || []
    );
    console.log('✅ Embed token generated');

    // Response
    res.json({
      embedUrl: embedUrl,
      accessToken: embedToken.token,
      reportId: reportConfig.reportId,
      reportName: reportConfig.name,
      tokenType: 'Embed',
      expiresAt: embedToken.expiration
    });

    console.log(`✅ Token sent to client for report: ${reportType}`);

  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate Power BI embed token',
      message: error.message 
    });
  }
});

/**
 * GET /api/powerbi/reports
 * List available reports
 */
app.get('/api/powerbi/reports', (req, res) => {
  const availableReports = Object.entries(REPORTS).map(([key, value]) => ({
    type: key,
    name: value.name,
    configured: !!value.reportId
  }));

  res.json({
    reports: availableReports,
    total: availableReports.length
  });
});

/**
 * GET /health
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  const isConfigured = !!(TENANT_ID && CLIENT_ID && CLIENT_SECRET && WORKSPACE_ID);
  
  res.json({ 
    status: 'ok',
    configured: isConfigured,
    timestamp: new Date().toISOString(),
    reports: Object.keys(REPORTS).length
  });
});

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

/**
 * Start Server
 */
const PORT = process.env.PORT || 3001;

console.log('🔧 Attempting to start server...');
console.log('   PORT:', PORT);
console.log('   FRONTEND_URL:', process.env.FRONTEND_URL || 'http://localhost:5173');
console.log('');

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('🚀 Power BI Token API Server');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`📊 Workspace ID: ${WORKSPACE_ID?.substring(0, 8)}...`);
  console.log(`📄 Reports configured: ${Object.keys(REPORTS).length}`);
  console.log('');
  console.log('Endpoints:');
  console.log(`  POST http://localhost:${PORT}/api/powerbi/embed`);
  console.log(`  GET  http://localhost:${PORT}/api/powerbi/reports`);
  console.log(`  GET  http://localhost:${PORT}/health`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  // Check configuration
  if (!TENANT_ID || !CLIENT_ID || !CLIENT_SECRET || !WORKSPACE_ID) {
    console.warn('⚠️  WARNING: Missing Power BI configuration!');
    console.warn('   Please check your .env file.');
    console.log('');
  }
});

server.on('error', (error) => {
  console.error('❌ Server error:', error.message);
  if (error.code === 'EADDRINUSE') {
    console.error(`   Port ${PORT} is already in use!`);
    console.error('   Try a different port or stop the other process.');
  }
  process.exit(1);
});

module.exports = app;
