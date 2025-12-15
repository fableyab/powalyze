export const analyticsService = {
  trackPageView: (pageName) => {
    console.log(`[Analytics] Page View: ${pageName}`);
  },
  trackUserAction: (actionName, actionData) => {
    console.log(`[Analytics] Action: ${actionName}`, actionData);
  },
  trackFormSubmission: (formName, formData) => {
    console.log(`[Analytics] Form Submit: ${formName}`);
  },
  trackConsultationRequest: (consultationData) => {
    console.log(`[Analytics] Consultation Request:`, consultationData.company);
  }
};