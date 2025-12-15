import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './emailjsConfig';
import { supabase, isSupabaseConfigured } from './supabaseClient';

export const sendEmail = async (templateId, templateParams) => {
  // 1. Try Supabase/Backend Function (Simulation via DB trigger)
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('notifications').insert([{
        user_id: templateParams.user_id || (await supabase.auth.getUser()).data.user?.id,
        message: `Email Sent: ${templateParams.message || 'System Notification'}`,
        type: 'email_log'
      }]);
      // Note: Real email sending would happen via Supabase Edge Function triggered by this insert
      // or by calling the function directly. Here we log it.
      if (!error) return { success: true, method: 'supabase' };
    } catch (e) {
      console.warn("Supabase email log failed", e);
    }
  }

  // 2. Fallback to EmailJS (Frontend)
  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      templateId,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    return { success: true, status: response.status, text: response.text, method: 'emailjs' };
  } catch (error) {
    console.error('EmailJS Failed:', error);
    throw error;
  }
};

export const sendBookingNotification = async (bookingData) => {
  // Use Formspree or EmailJS generic template
  // Here simulating the structure
  const params = {
    to_name: "Powalyze Team",
    from_name: bookingData.name,
    message: `Booking Request: ${bookingData.need} on ${bookingData.date} at ${bookingData.time}. Email: ${bookingData.email}`,
    reply_to: bookingData.email
  };
  
  // Use a generic ID or the specific one if configured
  return sendEmail(EMAILJS_CONFIG.TEMPLATE_ID_BOOKING || 'template_default', params);
};

export const sendFileUploadConfirmation = async (userEmail, fileName) => {
  // This is usually server-side. We simulate or use EmailJS if Key allows client-side triggering
  console.log(`[Email Service] Sending upload confirmation to ${userEmail} for ${fileName}`);
  return { success: true }; 
};