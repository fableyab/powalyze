
const LOG_KEY = 'powalyze_audit_logs';

export const auditLogService = {
  log: (action, details = {}, user = null) => {
    try {
      const logs = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
      const newLog = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        action, // e.g., 'LOGIN', 'REGISTER', 'UPDATE_PROFILE'
        details,
        userId: user?.id || 'anonymous',
        userEmail: user?.email || 'anonymous',
        userAgent: navigator.userAgent,
        ip: 'simulated-ip' // Cannot get real IP in client-side only
      };
      
      logs.unshift(newLog);
      // Keep last 1000 logs
      if (logs.length > 1000) logs.pop();
      
      localStorage.setItem(LOG_KEY, JSON.stringify(logs));
      console.log(`[Audit] ${action}:`, details);
    } catch (e) {
      console.error("Failed to write audit log", e);
    }
  },

  getLogs: () => {
    return JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
  },

  clearLogs: () => {
    localStorage.removeItem(LOG_KEY);
  }
};
