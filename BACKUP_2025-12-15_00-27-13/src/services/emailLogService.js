
const LOG_KEY = 'powalyze_email_logs';

export const emailLogService = {
  /**
   * Log an email attempt
   */
  logEmail: (data) => {
    try {
      const logs = emailLogService.getLogs();
      const newLog = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        ...data
      };
      
      // Keep only last 100 logs
      const updatedLogs = [newLog, ...logs].slice(0, 100);
      localStorage.setItem(LOG_KEY, JSON.stringify(updatedLogs));
      
      return newLog;
    } catch (error) {
      console.error('Failed to log email:', error);
    }
  },

  /**
   * Retrieve email history
   */
  getLogs: () => {
    try {
      const stored = localStorage.getItem(LOG_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  },

  /**
   * Clear logs
   */
  clearLogs: () => {
    localStorage.removeItem(LOG_KEY);
  },

  /**
   * Get logs by recipient
   */
  getLogsByRecipient: (email) => {
    const logs = emailLogService.getLogs();
    return logs.filter(log => log.to === email);
  }
};
