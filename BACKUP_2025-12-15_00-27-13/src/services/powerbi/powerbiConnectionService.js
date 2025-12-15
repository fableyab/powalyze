import { powerbiConfig } from '@/config/powerbiConfig';

/**
 * Service to handle Power BI Connection Lifecycle
 * Simulates OAuth flow and validation for frontend demo
 */

const STORAGE_KEY = 'powalyze_pbi_connection';

export const powerbiConnectionService = {
  /**
   * Connect a Power BI Account
   * In a real app, this would redirect to Microsoft OAuth
   */
  connectPowerBIAccount: async (credentials) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!credentials.clientId || !credentials.clientSecret) {
      throw new Error("Missing Client ID or Secret");
    }

    // Mock successful connection
    const connection = {
      isConnected: true,
      tenantId: credentials.tenantId || powerbiConfig.tenantId,
      clientId: credentials.clientId,
      connectedAt: new Date().toISOString(),
      status: 'active',
      workspaces: ['Executive', 'Finance', 'PMO'],
      user: 'admin@powalyze.ch'
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(connection));
    return connection;
  },

  /**
   * Validate current connection status
   */
  validateConnection: async () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { isConnected: false };

    const connection = JSON.parse(stored);
    
    // Simulate token check
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Randomly fail validation for demo purposes if "fail" is in localStorage
    if (localStorage.getItem('powalyze_force_fail_pbi')) {
      throw new Error("Token expired. Please reconnect.");
    }

    return { ...connection, lastValidated: new Date().toISOString() };
  },

  /**
   * Refresh connection token (Mock)
   */
  refreshConnection: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const status = await powerbiConnectionService.validateConnection();
    return status;
  },

  /**
   * Disconnect account
   */
  disconnectPowerBIAccount: async () => {
    localStorage.removeItem(STORAGE_KEY);
    return { isConnected: false };
  },

  /**
   * Get current connection metadata synchronously
   */
  getConnectionStatus: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { isConnected: false };
  }
};