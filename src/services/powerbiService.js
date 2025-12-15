import { powerbiConfig } from '@/config/powerbiConfig';
import { reportMapping } from '@/config/reportMapping';

/**
 * MOCK Power BI Service
 * In production, these methods would call your backend API which holds the 
 * Service Principal secrets and generates the tokens securely.
 */

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const powerbiService = {
  /**
   * Get embed token for a specific report
   * @param {string} reportKey - Key from reportMapping
   * @param {object} userContext - User info for RLS (id, role, etc.)
   */
  getEmbedToken: async (reportKey, userContext = {}) => {
    await delay(1000); // Simulate network request

    const report = reportMapping[reportKey];
    if (!report) {
      throw new Error(`Report configuration not found for key: ${reportKey}`);
    }

    // MOCK RESPONSE: A real backend would return a valid Azure AD embed token here
    // We return a fake token structure that mimics the real API response
    return {
      token: "mock-embed-token-ey...", 
      tokenId: "mock-token-id-" + Math.random().toString(36).substr(2, 9),
      expiration: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1 hour expiry
      reportId: report.id,
      embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${report.id}&groupId=${powerbiConfig.workspaceId}`,
      datasetId: report.datasetId
    };
  },

  /**
   * Check if the backend service is available
   */
  checkHealth: async () => {
    await delay(500);
    return { status: 'ok', version: '1.0.0' };
  }
};