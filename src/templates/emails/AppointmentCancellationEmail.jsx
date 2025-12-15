
import React from 'react';
import BaseEmailLayout from './BaseEmailLayout';

const AppointmentCancellationEmail = ({ name, date, time, language = 'fr' }) => {
  const content = {
    fr: {
      subject: "Annulation de votre rendez-vous - Powalyze",
      title: "Rendez-vous Annulé",
      greeting: `Bonjour ${name},`,
      intro: "Votre rendez-vous prévu a été annulé.",
      details: "Détails du rendez-vous annulé :",
      rescheduleAction: "Reprendre rendez-vous",
      contact: "Si vous pensez qu'il s'agit d'une erreur, veuillez nous contacter.",
      team: "L'équipe Powalyze"
    },
    en: {
      subject: "Appointment Cancellation - Powalyze",
      title: "Appointment Cancelled",
      greeting: `Hello ${name},`,
      intro: "Your scheduled appointment has been cancelled.",
      details: "Cancelled appointment details:",
      rescheduleAction: "Reschedule",
      contact: "If you think this is a mistake, please contact us.",
      team: "The Powalyze Team"
    },
    de: {
      subject: "Terminabsage - Powalyze",
      title: "Termin Abgesagt",
      greeting: `Hallo ${name},`,
      intro: "Ihr geplanter Termin wurde abgesagt.",
      details: "Details des abgesagten Termins:",
      rescheduleAction: "Neu buchen",
      contact: "Wenn Sie glauben, dass dies ein Fehler ist, kontaktieren Sie uns bitte.",
      team: "Das Powalyze Team"
    }
  };

  const t = content[language] || content.fr;

  return (
    <BaseEmailLayout title={t.title} language={language}>
      <p style={{ marginTop: 0 }}>{t.greeting}</p>
      <p style={{ color: '#e53e3e' }}>{t.intro}</p>
      
      <div style={{ backgroundColor: '#fff5f5', padding: '20px', borderRadius: '4px', margin: '20px 0', border: '1px solid #fed7d7' }}>
        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{t.details}</p>
        <p style={{ margin: 0 }}>{date} - {time}</p>
      </div>

      <div style={{ textAlign: 'center', margin: '35px 0' }}>
        <a href="https://powalyze.ch/contact" style={{ 
          backgroundColor: '#333', 
          color: '#ffffff', 
          padding: '12px 30px', 
          borderRadius: '4px', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          {t.rescheduleAction}
        </a>
      </div>

      <p>{t.contact}</p>
      <p style={{ fontWeight: 'bold' }}>{t.team}</p>
    </BaseEmailLayout>
  );
};

export default AppointmentCancellationEmail;
