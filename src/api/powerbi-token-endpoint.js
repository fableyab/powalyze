// Simulated Power BI Token API Endpoint
// This simulates what a real backend API would return
// In production, replace with actual Azure AD authentication

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reportId } = req.body;

  if (!reportId) {
    return res.status(400).json({ error: 'reportId is required' });
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock configuration for different reports
  const reportConfigs = {
    'commercial': {
      reportId: 'report-commercial-dashboard',
      reportName: 'Dashboard Commercial',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=report-commercial-dashboard'
    },
    'finance': {
      reportId: 'report-financial-q4',
      reportName: 'Analyse Financière Q4',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=report-financial-q4'
    },
    'pmo': {
      reportId: 'report-pmo-kpis',
      reportName: 'KPIs Projet PMO',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=report-pmo-kpis'
    },
    'predictive': {
      reportId: 'report-predictive-ai',
      reportName: 'Analyse Prédictive Q2',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=report-predictive-ai'
    },
    'operational': {
      reportId: 'report-operational-efficiency',
      reportName: 'Efficacité Opérationnelle',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=report-operational-efficiency'
    },
    'strategic': {
      reportId: 'report-strategic-roadmap',
      reportName: 'Roadmap Stratégique 2026',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=report-strategic-roadmap'
    }
  };

  const config = reportConfigs[reportId] || reportConfigs['commercial'];

  // Mock Power BI Embedded Token Response
  // In production, this would come from Azure AD
  const mockResponse = {
    embedUrl: config.embedUrl,
    accessToken: `MOCK_TOKEN_${reportId}_${Date.now()}`, // Real token from Azure AD
    reportId: config.reportId,
    reportName: config.reportName,
    tokenType: 'Embed',
    expiresAt: new Date(Date.now() + 3600000).toISOString() // 1 hour
  };

  res.status(200).json(mockResponse);
}

/*
PRODUCTION IMPLEMENTATION:
========================

import { ConfidentialClientApplication } from '@azure/msal-node';

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET
  }
};

const msalClient = new ConfidentialClientApplication(msalConfig);

export default async function handler(req, res) {
  try {
    const { reportId } = req.body;
    
    // Get Azure AD token
    const tokenResponse = await msalClient.acquireTokenByClientCredential({
      scopes: ['https://analysis.windows.net/powerbi/api/.default']
    });

    // Get report details from Power BI
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
          accessLevel: 'View'
        })
      }
    );

    const embedData = await embedResponse.json();

    res.status(200).json({
      embedUrl: reportData.embedUrl,
      accessToken: embedData.token,
      reportId: reportId,
      tokenType: 'Embed',
      expiresAt: embedData.expiration
    });

  } catch (error) {
    console.error('Power BI API Error:', error);
    res.status(500).json({ error: error.message });
  }
}
*/
