/**
 * MOCK RLS SERVICE
 * Simulates Row-Level Security logic
 */

export const rlsService = {
  getUserClientId: async (userId) => {
    // Mock mapping of user to client
    const map = {
      'user_1': 'Novartis',
      'user_2': 'Nestlé',
      'admin': 'ALL'
    };
    return map[userId] || 'Demo_Client';
  },

  generateRLSIdentity: (userId, clientId) => {
    return {
      username: userId,
      roles: ['Client_Viewer'],
      datasets: [clientId]
    };
  }
};