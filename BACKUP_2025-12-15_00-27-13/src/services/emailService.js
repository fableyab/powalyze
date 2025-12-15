
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { emailConfig } from '@/config/emailConfig';
import { emailLogService } from './emailLogService';

// Import Templates
import AccountCreationEmail from '@/templates/emails/AccountCreationEmail';
import AppointmentConfirmationEmail from '@/templates/emails/AppointmentConfirmationEmail';
import AppointmentUpdateEmail from '@/templates/emails/AppointmentUpdateEmail';
import AppointmentCancellationEmail from '@/templates/emails/AppointmentCancellationEmail';
import PasswordResetEmail from '@/templates/emails/PasswordResetEmail';
import ProjectInvitationEmail from '@/templates/emails/ProjectInvitationEmail';
import DocumentSharedEmail from '@/templates/emails/DocumentSharedEmail';

/**
 * Renders a React Email Component to an HTML string
 */
const renderEmailHtml = (Component, props) => {
  try {
    return ReactDOMServer.renderToStaticMarkup(<Component {...props} />);
  } catch (error) {
    console.error("Error rendering email template:", error);
    return `<div>Error generating email content. Please contact support.</div>`;
  }
};

/**
 * Mock send function to simulate network delay and success
 */
const mockSend = async (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[EmailService] Sending to ${payload.to}:`, payload.subject);
      // console.log(`[EmailService] Content:`, payload.html); // Uncomment for full debug
      resolve({ success: true, messageId: crypto.randomUUID() });
    }, 800);
  });
};

export const emailService = {
  /**
   * Generic Send Method
   * @param {string} to - Recipient email
   * @param {string} subject - Email subject
   * @param {Component} Template - React component for body
   * @param {Object} props - Data for the template
   * @param {string} language - 'fr', 'en', 'de'
   */
  send: async ({ to, subject, Template, props, language = 'fr' }) => {
    try {
      // 1. Render HTML
      const htmlBody = renderEmailHtml(Template, { ...props, language });

      // 2. Prepare Payload
      const emailPayload = {
        to,
        from: emailConfig.settings.fromEmail,
        subject,
        html: htmlBody,
        language
      };

      // 3. Send (Mock or Real via EmailJS/API)
      // In a real implementation with EmailJS, you might send "data variables" to a template ID
      // OR send raw HTML if your provider supports it. Here we simulate the service.
      const result = await mockSend(emailPayload);

      // 4. Log
      emailLogService.logEmail({
        status: 'sent',
        to,
        subject,
        template: Template.name,
        language
      });

      return result;
    } catch (error) {
      console.error("Email send failed:", error);
      emailLogService.logEmail({
        status: 'failed',
        to,
        subject,
        error: error.message
      });
      return { success: false, error };
    }
  },

  // --- Triggers ---

  sendAccountCreation: async (user, language = 'fr') => {
    return emailService.send({
      to: user.email,
      subject: language === 'en' ? "Welcome to Powalyze" : "Bienvenue chez Powalyze",
      Template: AccountCreationEmail,
      props: { name: user.firstName, email: user.email },
      language
    });
  },

  sendAppointmentConfirmation: async (data, language = 'fr') => {
    // Subject is handled inside template prop logic usually, but here we can override or let generic
    // For simplicity, hardcoded subjects in send() call or derived
    const subjects = {
      fr: "Confirmation de rendez-vous",
      en: "Appointment Confirmation",
      de: "Terminbestätigung"
    };
    
    return emailService.send({
      to: data.email,
      subject: subjects[language],
      Template: AppointmentConfirmationEmail,
      props: { 
        name: data.firstName, 
        date: data.date, 
        time: data.time, 
        service: data.service 
      },
      language
    });
  },

  sendAppointmentUpdate: async (data, language = 'fr') => {
    return emailService.send({
      to: data.email,
      subject: "Update: Powalyze Appointment",
      Template: AppointmentUpdateEmail,
      props: data,
      language
    });
  },

  sendAppointmentCancellation: async (data, language = 'fr') => {
    return emailService.send({
      to: data.email,
      subject: "Cancellation: Powalyze Appointment",
      Template: AppointmentCancellationEmail,
      props: data,
      language
    });
  },

  sendPasswordReset: async (user, resetLink, language = 'fr') => {
    return emailService.send({
      to: user.email,
      subject: "Reset Password",
      Template: PasswordResetEmail,
      props: { name: user.name, resetLink },
      language
    });
  },

  sendProjectInvitation: async (data, language = 'fr') => {
    return emailService.send({
      to: data.email,
      subject: "Project Invitation",
      Template: ProjectInvitationEmail,
      props: data,
      language
    });
  },

  sendDocumentShared: async (data, language = 'fr') => {
    return emailService.send({
      to: data.email,
      subject: "New Document Shared",
      Template: DocumentSharedEmail,
      props: data,
      language
    });
  }
};
