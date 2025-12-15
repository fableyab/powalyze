const SETTINGS_KEY = 'powalyze_settings';

export const settingsStorageService = {
  saveSettings: (userId, settings) => {
    try {
      const allSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      allSettings[userId] = settings;
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(allSettings));
      return true;
    } catch (e) {
      console.error("Failed to save settings", e);
      return false;
    }
  },

  loadSettings: (userId) => {
    try {
      const allSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      return allSettings[userId] || null;
    } catch (e) {
      console.error("Failed to load settings", e);
      return null;
    }
  },
  
  validateSettings: (settings) => {
    // Basic validation
    if (typeof settings !== 'object') return false;
    // Add specific checks if needed
    return true;
  }
};