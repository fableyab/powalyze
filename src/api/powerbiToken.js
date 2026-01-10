// Production-ready Power BI Token API
// Call this from your backend server (Node.js/Express or serverless function)

const REPORT_MAPPING = {
  'commercial': process.env.VITE_PBI_REPORT_COMMERCIAL,
  'finance': process.env.VITE_PBI_REPORT_FINANCE,
  'pmo': process.env.VITE_PBI_REPORT_PMO,
  'predictive': process.env.VITE_PBI_REPORT_PREDICTIVE,
  'operational': process.env.VITE_PBI_REPORT_OPERATIONAL,
  'strategic': process.env.VITE_PBI_REPORT_STRATEGIC
};

/**
 * Get Power BI Embed Token from backend
 * @param {string} reportType - Type of report (commercial, finance, pmo, etc.)
 * @returns {Promise<Object>} Embed configuration
 */
export const getPowerBIToken = async (reportType) => {
  try {
    // Check if backend API is configured
    const apiUrl = import.meta.env.VITE_PBI_API_URL;
    
    // If no API URL configured, use mock data with clear message
    if (!apiUrl) {
      console.warn('⚠️ VITE_PBI_API_URL not configured - Using MOCK data. Consider using PowerBIHub with Metabase instead.');
      const mockData = getMockToken(reportType);
      mockData.isMock = true;
      mockData.configMessage = 'Cette page utilise l\'ancienne API Power BI. Pour une meilleure expérience, utilisez PowerBIHub avec Metabase (voir METABASE_SETUP.md).';
      return mockData;
    }

    // In development: use mock if API not accessible
    if (import.meta.env.MODE === 'development') {
      console.warn('🔧 Using MOCK Power BI token (development mode)');
      return getMockToken(reportType);
    }

    // In production: call real API
    const response = await fetch(`${apiUrl}/api/powerbi/embed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add user authentication if needed
        // 'Authorization': `Bearer ${getUserToken()}`
      },
      body: JSON.stringify({ 
        reportType,
        // Optional: pass user info for RLS
        // userId: getCurrentUserId(),
        // userEmail: getCurrentUserEmail()
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to get Power BI token`);
    }

    const data = await response.json();
    
    // Validate response
    if (!data.embedUrl || !data.accessToken || !data.reportId) {
      throw new Error('Invalid response from Power BI API');
    }

    return {
      embedUrl: data.embedUrl,
      accessToken: data.accessToken,
      reportId: data.reportId,
      reportName: data.reportName,
      tokenType: data.tokenType || 'Embed',
      expiresAt: data.expiresAt
    };

  } catch (error) {
    console.error('❌ Error fetching Power BI token:', error);
    throw new Error(`Failed to get Power BI token: ${error.message}`);
  }
};

/**
 * Mock token for development
 */
function getMockToken(reportType) {
  const mockConfigs = {
    'commercial': {
      reportId: 'mock-report-commercial-id',
      reportName: 'Dashboard Commercial',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=mock-commercial'
    },
    'finance': {
      reportId: 'mock-report-finance-id',
      reportName: 'Analyse Financière Q4',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=mock-finance'
    },
    'pmo': {
      reportId: 'mock-report-pmo-id',
      reportName: 'KPIs Projet PMO',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=mock-pmo'
    },
    'predictive': {
      reportId: 'mock-report-predictive-id',
      reportName: 'Analyse Prédictive Q2',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=mock-predictive'
    },
    'operational': {
      reportId: 'mock-report-operational-id',
      reportName: 'Efficacité Opérationnelle',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=mock-operational'
    },
    'strategic': {
      reportId: 'mock-report-strategic-id',
      reportName: 'Roadmap Stratégique 2026',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=mock-strategic'
    }
  };

  const config = mockConfigs[reportType] || mockConfigs['commercial'];

  return {
    embedUrl: config.embedUrl,
    accessToken: `MOCK_TOKEN_${reportType}_${Date.now()}`,
    reportId: config.reportId,
    reportName: config.reportName,
    tokenType: 'Embed',
    expiresAt: new Date(Date.now() + 3600000).toISOString() // 1 hour
  };
}

/**
 * Refresh Power BI token (call before expiration)
 * @param {string} reportType 
 * @returns {Promise<Object>}
 */
export const refreshPowerBIToken = async (reportType) => {
  return await getPowerBIToken(reportType);
}
