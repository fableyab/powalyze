/**
 * Système de logging centralisé pour Powalyze
 * 
 * - En développement : logs visible dans console
 * - En production : logs silencieux (évite exposition données sensibles)
 * - Future : intégration Sentry/Datadog pour monitoring production
 */

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Logger centralisé avec détection automatique environnement
 */
export const logger = {
  /**
   * Log informatif (développement uniquement)
   * @param {string} message - Message à logger
   * @param {Object} data - Données additionnelles (optionnel)
   */
  info: (message, data) => {
    if (isDevelopment) {
      console.log(`ℹ️ ${message}`, data || '');
    }
  },

  /**
   * Log d'erreur (développement uniquement)
   * En production, devrait être envoyé à un service de monitoring
   * 
   * @param {string} context - Contexte de l'erreur (ex: "ProjectService.createProject")
   * @param {Error|string} error - Erreur capturée
   * @param {Object} additionalData - Données additionnelles pour debug (optionnel)
   */
  error: (context, error, additionalData) => {
    if (isDevelopment) {
      console.error(`❌ [${context}]`, error, additionalData || '');
    }
    
    // TODO: En production, envoyer à Sentry/Datadog
    // if (!isDevelopment && window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     tags: { context },
    //     extra: additionalData
    //   });
    // }
  },

  /**
   * Log d'avertissement (développement uniquement)
   * @param {string} message - Message d'avertissement
   * @param {Object} data - Données additionnelles (optionnel)
   */
  warn: (message, data) => {
    if (isDevelopment) {
      console.warn(`⚠️ ${message}`, data || '');
    }
  },

  /**
   * Log de succès (développement uniquement)
   * @param {string} message - Message de succès
   * @param {Object} data - Données additionnelles (optionnel)
   */
  success: (message, data) => {
    if (isDevelopment) {
      console.log(`✅ ${message}`, data || '');
    }
  },

  /**
   * Log de debug détaillé (développement uniquement)
   * Utilisé pour traces approfondies lors du développement
   * 
   * @param {string} message - Message de debug
   * @param {Object} data - Données à inspecter
   */
  debug: (message, data) => {
    if (isDevelopment) {
      console.debug(`🔍 ${message}`, data || '');
    }
  }
};

/**
 * Hook pour compatibilité avec errorMessages.js existant
 * Réexporte logError pour éviter breaking changes
 */
export const logError = (context, error, additionalData) => {
  logger.error(context, error, additionalData);
};

export default logger;
