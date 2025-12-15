/**
 * Client Management Service
 * Handles multi-tenant client data
 */

export const clientService = {
  getClients: async () => {
    // Mock data
    return [
      { id: 'c1', name: 'Acme Corp', tenantId: 't1' },
      { id: 'c2', name: 'Global Industries', tenantId: 't2' }
    ];
  },

  getClientSettings: async (clientId) => {
    return {
      theme: 'dark',
      features: ['pmo', 'finance']
    };
  }
};