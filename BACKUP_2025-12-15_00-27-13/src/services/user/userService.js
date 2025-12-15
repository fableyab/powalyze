
// Mock user service using localStorage
const STORAGE_KEY = 'powalyze_users';

export const userService = {
  getProfile: async (userId) => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 300));
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return users.find(u => u.id === userId) || null;
  },

  updateProfile: async (userId, data) => {
    await new Promise(r => setTimeout(r, 500));
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const index = users.findIndex(u => u.id === userId);
    
    if (index === -1) throw new Error("User not found");
    
    // Prevent sensitive field updates directly via this method
    const { password, id, role, ...safeUpdates } = data;
    
    const updatedUser = { ...users[index], ...safeUpdates, updatedAt: new Date().toISOString() };
    users[index] = updatedUser;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return updatedUser;
  },

  updatePreferences: async (userId, preferences) => {
    await new Promise(r => setTimeout(r, 300));
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const index = users.findIndex(u => u.id === userId);
    
    if (index === -1) throw new Error("User not found");
    
    users[index].preferences = { ...(users[index].preferences || {}), ...preferences };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return users[index].preferences;
  }
};
