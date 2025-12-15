
/**
 * Simple Error Tracking Service
 * Wraps external providers (like Sentry) or logs to console/backend
 */

const LOG_LEVELS = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

class ErrorTracker {
  constructor() {
    this.initialized = false;
  }

  init() {
    // Initialize external services (Sentry, LogRocket, etc.) here
    this.initialized = true;
    console.log('[Monitoring] Error tracking initialized');
  }

  log(error, context = {}) {
    if (!this.initialized) return;
    
    // In production, send to service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: context });
      console.error('[Production Log]', error, context);
    } else {
      console.error('[Dev Log]', error, context);
    }
  }

  captureMessage(message, level = LOG_LEVELS.INFO) {
    if (!this.initialized) return;
    console.log(`[${level.toUpperCase()}]`, message);
  }
}

export const errorTracker = new ErrorTracker();
