export const consultationNotificationService = {
  sendConsultationConfirmation: async (email, data) => {
    console.log(`[Notification] Consultation Confirmation sent to ${email}`, data);
    return true;
  },
  sendConsultationScheduled: async (email, data) => {
    console.log(`[Notification] Consultation Scheduled for ${email}`, data);
    return true;
  },
  sendConsultationReminder: async (email, data) => {
    console.log(`[Notification] Reminder sent to ${email}`, data);
    return true;
  },
  sendConsultationCompleted: async (email, data) => {
    console.log(`[Notification] Consultation Completed email sent to ${email}`, data);
    return true;
  }
};