
import React from 'react';
import BaseEmailLayout from './BaseEmailLayout';

const AppointmentConfirmationEmail = ({ name, date, time, service, language = 'fr' }) => {
  const content = {
    fr: {
      subject: "Confirmation de votre rendez-vous - Powalyze",
      title: "Rendez-vous Confirmé",
      greeting: `Bonjour ${name},`,
      intro: "Votre demande de rendez-vous a été confirmée. Voici les détails de votre consultation :",
      dateLabel: "Date :",
      timeLabel: "Heure :",
      serviceLabel: "Service :",
      locationLabel: "Lieu :",
      location: "Google Meet (Lien dans l'invitation calendrier)",
      prepTitle: "Pour se préparer :",
      prepText: "Merci de préparer les documents pertinents pour maximiser l'efficacité de notre échange.",
      changes: "Pour modifier ou annuler, veuillez nous contacter au moins 24h à l'avance.",
      team: "L'équipe Powalyze"
    },
    en: {
      subject: "Appointment Confirmation - Powalyze",
      title: "Appointment Confirmed",
      greeting: `Hello ${name},`,
      intro: "Your appointment request has been confirmed. Here are the details of your consultation:",
      dateLabel: "Date:",
      timeLabel: "Time:",
      serviceLabel: "Service:",
      locationLabel: "Location:",
      location: "Google Meet (Link in calendar invite)",
      prepTitle: "To prepare:",
      prepText: "Please prepare relevant documents to maximize the efficiency of our exchange.",
      changes: "To modify or cancel, please contact us at least 24h in advance.",
      team: "The Powalyze Team"
    },
    de: {
      subject: "Terminbestätigung - Powalyze",
      title: "Termin Bestätigt",
      greeting: `Hallo ${name},`,
      intro: "Ihre Terminanfrage wurde bestätigt. Hier sind die Details Ihrer Beratung:",
      dateLabel: "Datum:",
      timeLabel: "Zeit:",
      serviceLabel: "Dienstleistung:",
      locationLabel: "Ort:",
      location: "Google Meet (Link in Kalendereinladung)",
      prepTitle: "Zur Vorbereitung:",
      prepText: "Bitte bereiten Sie relevante Dokumente vor, um die Effizienz unseres Austauschs zu maximieren.",
      changes: "Zum Ändern oder Stornieren kontaktieren Sie uns bitte mindestens 24 Stunden im Voraus.",
      team: "Das Powalyze Team"
    }
  };

  const t = content[language] || content.fr;

  return (
    <BaseEmailLayout title={t.title} language={language}>
      <p style={{ marginTop: 0 }}>{t.greeting}</p>
      <p>{t.intro}</p>
      
      <div style={{ backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '4px', margin: '25px 0', borderLeft: '4px solid #BFA76A' }}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ padding: '5px 0', width: '100px', fontWeight: 'bold' }}>{t.dateLabel}</td>
              <td style={{ padding: '5px 0' }}>{date}</td>
            </tr>
            <tr>
              <td style={{ padding: '5px 0', width: '100px', fontWeight: 'bold' }}>{t.timeLabel}</td>
              <td style={{ padding: '5px 0' }}>{time}</td>
            </tr>
            <tr>
              <td style={{ padding: '5px 0', width: '100px', fontWeight: 'bold' }}>{t.serviceLabel}</td>
              <td style={{ padding: '5px 0' }}>{service}</td>
            </tr>
            <tr>
              <td style={{ padding: '5px 0', width: '100px', fontWeight: 'bold' }}>{t.locationLabel}</td>
              <td style={{ padding: '5px 0' }}>{t.location}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '16px', color: '#000' }}>{t.prepTitle}</h3>
      <p>{t.prepText}</p>

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
        {t.changes}
      </div>

      <p style={{ fontWeight: 'bold', marginTop: '30px' }}>{t.team}</p>
    </BaseEmailLayout>
  );
};

export default AppointmentConfirmationEmail;
