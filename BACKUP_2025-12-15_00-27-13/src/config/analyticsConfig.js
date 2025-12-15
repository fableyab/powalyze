export const analyticsConfig = {
  // General Settings
  enabled: true,
  debug: import.meta.env.DEV,
  sampleRate: 1.0, // 1.0 = 100% of events
  batchSize: 10,
  flushInterval: 5000, // 5 seconds

  // Event Categories
  categories: {
    INTERACTION: 'interaction',
    NAVIGATION: 'navigation',
    CONVERSION: 'conversion',
    ERROR: 'error',
    PERFORMANCE: 'performance',
    SYSTEM: 'system'
  },

  // Standard Event Names
  events: {
    APP_INIT: 'app_init',
    PAGE_VIEW: 'page_view',
    BUTTON_CLICK: 'button_click',
    FORM_SUBMIT: 'form_submit',
    LOGIN_SUCCESS: 'login_success',
    LOGIN_FAILURE: 'login_failure',
    SIGNUP_SUCCESS: 'signup_success',
    FEATURE_USED: 'feature_used',
    EXPORT_DATA: 'export_data',
    FILTER_CHANGE: 'filter_change'
  },

  // Feature Flags / Names
  features: {
    PMO_DASHBOARD: 'pmo_dashboard',
    POWER_BI_EMBED: 'power_bi_embed',
    REPORT_GENERATOR: 'report_generator',
    USER_ADMIN: 'user_admin'
  }
};