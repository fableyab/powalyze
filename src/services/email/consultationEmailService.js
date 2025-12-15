export const consultationEmailService = {
  sendConsultationConfirmation: async (email, data) => {
    // In a real app, this calls an API endpoint (e.g. SendGrid, Mailgun via backend)
    console.log(`[Mock Email] Sending confirmation to ${email}`, data);
    return true;
  },

  sendConsultationNotification: async (adminEmail, data) => {
    console.log(`[Mock Email] Sending notification to admin ${adminEmail}`, data);
    return true;
  },

  sendConsultationReminder: async (email, data) => {
    console.log(`[Mock Email] Sending reminder to ${email}`);
    return true;
  }
};