export const errorLoggingService = {
  logError: (error, context = {}) => {
    console.error(`[ErrorLog] ${error.message}`, context);
  },
  logWarning: (message, context = {}) => {
    console.warn(`[WarnLog] ${message}`, context);
  },
  logInfo: (message, context = {}) => {
    console.info(`[InfoLog] ${message}`, context);
  },
  sendLogsToServer: (logs) => {
    console.log('Sending logs to server...', logs);
  }
};