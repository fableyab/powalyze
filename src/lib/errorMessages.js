/**
 * Messages d'erreur centralisés pour l'application
 * User-friendly, sans détails techniques
 */

export const ErrorMessages = {
  // Organisations
  NO_ORGANIZATION: {
    title: "Configuration requise",
    description: "Créez ou rejoignez une organisation pour accéder à cette fonctionnalité.",
    action: "Configurer mon espace",
    actionRoute: "/app/environment-admin"
  },
  
  ORGANIZATION_CREATE_FAILED: {
    title: "Erreur de création",
    description: "Impossible de créer l'organisation. Veuillez réessayer.",
    action: "Réessayer"
  },

  // Authentification
  UNAUTHORIZED: {
    title: "Accès refusé",
    description: "Vous n'avez pas les permissions nécessaires pour cette action.",
    action: "Retour",
    actionRoute: "/app/cockpit"
  },

  SESSION_EXPIRED: {
    title: "Session expirée",
    description: "Veuillez vous reconnecter pour continuer.",
    action: "Se reconnecter",
    actionRoute: "/login"
  },

  // Réseau
  NETWORK_ERROR: {
    title: "Erreur de connexion",
    description: "Vérifiez votre connexion internet et réessayez.",
    action: "Réessayer"
  },

  SERVER_ERROR: {
    title: "Erreur serveur",
    description: "Une erreur temporaire est survenue. Veuillez réessayer dans quelques instants.",
    action: "Réessayer"
  },

  // Données
  DATA_LOAD_FAILED: {
    title: "Chargement impossible",
    description: "Les données n'ont pas pu être chargées. Veuillez réessayer.",
    action: "Réessayer"
  },

  DATA_SAVE_FAILED: {
    title: "Enregistrement impossible",
    description: "Les modifications n'ont pas pu être enregistrées. Veuillez réessayer.",
    action: "Réessayer"
  },

  // Générique
  UNKNOWN_ERROR: {
    title: "Erreur inattendue",
    description: "Une erreur est survenue. Si le problème persiste, contactez le support.",
    action: "Réessayer"
  }
};

/**
 * Mapper une erreur technique vers un message user-friendly
 */
export function getErrorMessage(error) {
  if (!error) return ErrorMessages.UNKNOWN_ERROR;

  const errorString = error.message || error.toString().toLowerCase();

  // Mapping erreurs communes
  if (errorString.includes('organization')) {
    if (errorString.includes('not found') || errorString.includes('aucune organisation')) {
      return ErrorMessages.NO_ORGANIZATION;
    }
    if (errorString.includes('create') || errorString.includes('insert')) {
      return ErrorMessages.ORGANIZATION_CREATE_FAILED;
    }
  }

  if (errorString.includes('unauthorized') || errorString.includes('permission')) {
    return ErrorMessages.UNAUTHORIZED;
  }

  if (errorString.includes('session') || errorString.includes('token')) {
    return ErrorMessages.SESSION_EXPIRED;
  }

  if (errorString.includes('network') || errorString.includes('fetch')) {
    return ErrorMessages.NETWORK_ERROR;
  }

  if (errorString.includes('500') || errorString.includes('server')) {
    return ErrorMessages.SERVER_ERROR;
  }

  return ErrorMessages.UNKNOWN_ERROR;
}

/**
 * Logger l'erreur technique en console (dev uniquement)
 */
export function logError(context, error, additionalData = {}) {
  if (process.env.NODE_ENV === 'development') {
    console.group(`❌ [ERROR] ${context}`);
    console.error('Error:', error);
    console.log('Additional data:', additionalData);
    console.groupEnd();
  }
}
