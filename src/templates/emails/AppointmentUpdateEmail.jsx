
import React from 'react';
import BaseEmailLayout from './BaseEmailLayout';

const AppointmentUpdateEmail = ({ name, oldDate, oldTime, newDate, newTime, language = 'fr' }) => {
  const content = {
    fr: {
      subject: "Mise à jour de votre rendez-vous - Powalyze",
      title: "Rendez-vous Modifié",
      greeting: `Bonjour ${name},`,
      intro: "Votre rendez-vous a été modifié. Voici les nouveaux détails :",
      oldLabel: "Ancien créneau :",
      newLabel: "Nouveau créneau :",
      contact: "Si cet horaire ne vous convient pas, contactez-nous rapidement.",
      team: "L'équipe Powalyze"
    },
    en: {
      subject: "Appointment Update - Powalyze",
      title: "Appointment Updated",
      greeting: `Hello ${name},`,
      intro: "Your appointment has been modified. Here are the new details:",
      oldLabel: "Old slot:",
      newLabel: "New slot:",
      contact: "If this time does not work for you, please contact us immediately.",
      team: "The Powalyze Team"
    },
    de: {
      subject: "Terminaktualisierung - Powalyze",
      title: "Termin Geändert",
      greeting: `Hallo ${name},`,
      intro: "Ihr Termin wurde geändert. Hier sind die neuen Details:",
      oldLabel: "Alter Termin:",
      newLabel: "Neuer Termin:",
      contact: "Wenn diese Zeit Ihnen nicht passt, kontaktieren Sie uns bitte umgehend.",
      team: "Das Powalyze Team"
    }
  };

  const t = content[language] || content.fr;

  return (
    <BaseEmailLayout title={t.title} language={language}>
      <p style={{ marginTop: 0 }}>{t.greeting}</p>
      <p>{t.intro}</p>
      
      <div style={{ margin: '30px 0' }}>
        <div style={{ color: '#999', textDecoration: 'line-through', marginBottom: '10px' }}>
          <strong>{t.oldLabel}</strong> {oldDate} - {oldTime}
        </div>
        <div style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}>
          <strong>{t.newLabel}</strong> <span style={{ color: '#BFA76A' }}>{newDate} - {newTime}</span>
        </div>
      </div>

      <p>{t.contact}</p>
      <p style={{ fontWeight: 'bold' }}>{t.team}</p>
    </BaseEmailLayout>
  );
};

export default AppointmentUpdateEmail;
