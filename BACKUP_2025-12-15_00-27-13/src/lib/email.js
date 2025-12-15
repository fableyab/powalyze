import emailjs from '@emailjs/browser';

// Configuration - Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_powalyze'; // Example ID
const EMAILJS_TEMPLATE_ID_USER = 'template_user_conf'; // Example Template ID for User
const EMAILJS_TEMPLATE_ID_ADMIN = 'template_admin_notif'; // Example Template ID for Admin
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Example Public Key

/**
 * Generates email content based on language
 */
const getEmailContent = (lang, data) => {
  const templates = {
    fr: {
      subject: "Confirmation de votre rendez-vous - Powalyze",
      title: "Rendez-vous Confirmé",
      greeting: `Bonjour ${data.name},`,
      message: "Nous avons bien reçu votre demande de rendez-vous stratégique. Nos experts analysent actuellement vos besoins.",
      detailsTitle: "Détails de votre demande :",
      closing: "Nous vous contacterons très prochainement pour confirmer le créneau horaire exact.",
      footer: "Powalyze Consulting - Genève, Suisse"
    },
    en: {
      subject: "Booking Confirmation - Powalyze",
      title: "Booking Confirmed",
      greeting: `Hello ${data.name},`,
      message: "We have received your strategic booking request. Our experts are currently analyzing your needs.",
      detailsTitle: "Request Details:",
      closing: "We will contact you shortly to confirm the exact time slot.",
      footer: "Powalyze Consulting - Geneva, Switzerland"
    },
    de: {
      subject: "Terminbestätigung - Powalyze",
      title: "Termin Bestätigt",
      greeting: `Hallo ${data.name},`,
      message: "Wir haben Ihre strategische Terminanfrage erhalten. Unsere Experten analysieren derzeit Ihre Bedürfnisse.",
      detailsTitle: "Details Ihrer Anfrage:",
      closing: "Wir werden uns in Kürze bei Ihnen melden, um den genauen Zeitrahmen zu bestätigen.",
      footer: "Powalyze Consulting - Genf, Schweiz"
    },
    it: {
      subject: "Conferma Appuntamento - Powalyze",
      title: "Appuntamento Confermato",
      greeting: `Buongiorno ${data.name},`,
      message: "Abbiamo ricevuto la tua richiesta di appuntamento strategico. I nostri esperti stanno analizzando le tue esigenze.",
      detailsTitle: "Dettagli della richiesta:",
      closing: "Ti contatteremo a breve per confermare l'orario esatto.",
      footer: "Powalyze Consulting - Ginevra, Svizzera"
    },
    no: {
      subject: "Bekreftelse på avtale - Powalyze",
      title: "Avtale Bekreftet",
      greeting: `Hei ${data.name},`,
      message: "Vi har mottatt din strategiske avtaleforespørsel. Våre eksperter analyserer for tiden dine behov.",
      detailsTitle: "Forespørselsdetaljer:",
      closing: "Vi vil kontakte deg snart for å bekrefte nøyaktig tidspunkt.",
      footer: "Powalyze Consulting - Genève, Sveits"
    }
  };

  return templates[lang] || templates.en;
};

/**
 * Sends booking emails (Notification to Admin + Confirmation to User)
 * @param {Object} formData - The form data
 * @param {string} lang - Current language code (fr, en, de, it, no)
 * @returns {Promise}
 */
export const sendBookingEmails = async (formData, lang = 'en') => {
  // Simulate successful send if keys are not configured (Development Mode)
  if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    console.log('EmailJS not configured. Simulating email send:', formData);
    return new Promise(resolve => setTimeout(resolve, 1500));
  }

  const content = getEmailContent(lang, formData);

  try {
    // 1. Send Notification to Admin (contact@powalyze.ch)
    // We use a generic template structure for EmailJS, passing variables
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_ADMIN,
      {
        to_email: 'contact@powalyze.ch',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        role: formData.role,
        service_type: formData.need,
        message: formData.message,
        request_date: new Date().toLocaleDateString(),
        lang_code: lang
      },
      EMAILJS_PUBLIC_KEY
    );

    // 2. Send Confirmation to User
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_USER,
      {
        to_email: formData.email,
        to_name: formData.name,
        subject: content.subject,
        title: content.title,
        greeting: content.greeting,
        message_body: content.message,
        details_title: content.detailsTitle,
        service_type: formData.need,
        company: formData.company,
        closing: content.closing,
        footer: content.footer
      },
      EMAILJS_PUBLIC_KEY
    );

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};