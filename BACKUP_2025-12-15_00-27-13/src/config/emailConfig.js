
export const emailConfig = {
  provider: 'emailjs', // or 'mock', 'sendgrid' (via api)
  
  // Service Settings
  settings: {
    fromName: 'Powalyze',
    fromEmail: 'noreply@powalyze.ch',
    replyTo: 'support@powalyze.ch',
    companyName: 'Powalyze SA',
    companyAddress: 'Genève, Lausanne, Valais, Canton de Vaud, Suisse Alémanique',
    websiteUrl: 'https://powalyze.ch'
  },

  // EmailJS Specifics (Client-side sending)
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_powalyze',
    userId: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
    templates: {
      default: 'template_default',
      appointment: 'template_appointment',
      account: 'template_account'
    }
  },

  // Limits
  limits: {
    maxRetries: 3,
    rateLimitPerMinute: 10
  }
};
