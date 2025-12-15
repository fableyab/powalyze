import { powerbiConfig } from '@/config/powerbiConfig';

/**
 * MOCK TOKEN SERVICE
 * Simulates backend token generation for Power BI Embedded
 */

export const embedTokenService = {
  generateEmbedToken: async (reportId, datasetId, clientId, userId) => {
    // Simulate API latency
    await new Promise(r => setTimeout(r, 800));

    // Mock validation
    if (!reportId) throw new Error("Report ID is required");

    // Return a mock token structure that the Power BI Client SDK will theoretically accept 
    // (In reality, the SDK needs a real token from Azure, but for our visual components we'll use this)
    return {
      token: `mock_token_${Math.random().toString(36).substr(2)}`,
      tokenId: `tid_${Date.now()}`,
      expiration: new Date(Date.now() + powerbiConfig.tokenExpiration * 60000).toISOString(),
      reportId: reportId || powerbiConfig.reportId,
      embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${powerbiConfig.workspaceId}`,
      status: "Generated"
    };
  },

  validateEmbedToken: (token) => {
    if (!token || !token.expiration) return false;
    return new Date(token.expiration) > new Date();
  }
};