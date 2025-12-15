
import React from 'react';
import BaseEmailLayout from './BaseEmailLayout';

const AccountCreationEmail = ({ name, email, language = 'fr' }) => {
  const content = {
    fr: {
      subject: "Bienvenue chez Powalyze - Confirmez votre compte",
      title: "Bienvenue",
      greeting: `Bonjour ${name},`,
      intro: "Nous sommes ravis de vous compter parmi nos membres. Votre compte Powalyze a été créé avec succès.",
      detailsTitle: "Détails du compte :",
      emailLabel: "Email :",
      action: "Confirmer mon compte",
      guideTitle: "Pour bien démarrer :",
      guide1: "Complétez votre profil",
      guide2: "Explorez nos services",
      guide3: "Accédez à vos documents",
      contact: "Si vous avez des questions, notre équipe support est à votre disposition.",
      team: "L'équipe Powalyze"
    },
    en: {
      subject: "Welcome to Powalyze - Confirm Your Account",
      title: "Welcome",
      greeting: `Hello ${name},`,
      intro: "We are thrilled to have you with us. Your Powalyze account has been successfully created.",
      detailsTitle: "Account Details:",
      emailLabel: "Email:",
      action: "Confirm My Account",
      guideTitle: "Getting Started:",
      guide1: "Complete your profile",
      guide2: "Explore our services",
      guide3: "Access your documents",
      contact: "If you have any questions, our support team is here to help.",
      team: "The Powalyze Team"
    },
    de: {
      subject: "Willkommen bei Powalyze - Bestätigen Sie Ihr Konto",
      title: "Willkommen",
      greeting: `Hallo ${name},`,
      intro: "Wir freuen uns, Sie bei uns zu haben. Ihr Powalyze-Konto wurde erfolgreich erstellt.",
      detailsTitle: "Kontodetails:",
      emailLabel: "E-Mail:",
      action: "Konto bestätigen",
      guideTitle: "Erste Schritte:",
      guide1: "Vervollständigen Sie Ihr Profil",
      guide2: "Entdecken Sie unsere Dienstleistungen",
      guide3: "Greifen Sie auf Ihre Dokumente zu",
      contact: "Wenn Sie Fragen haben, steht Ihnen unser Support-Team zur Verfügung.",
      team: "Das Powalyze Team"
    }
  };

  const t = content[language] || content.fr;

  return (
    <BaseEmailLayout title={t.title} language={language}>
      <p style={{ marginTop: 0 }}>{t.greeting}</p>
      <p>{t.intro}</p>
      
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '4px', margin: '25px 0' }}>
        <h3 style={{ marginTop: 0, fontSize: '16px', color: '#000' }}>{t.detailsTitle}</h3>
        <p style={{ margin: '5px 0' }}><strong>{t.emailLabel}</strong> {email}</p>
      </div>

      <div style={{ textAlign: 'center', margin: '35px 0' }}>
        <a href="https://powalyze.ch/login" style={{ 
          backgroundColor: '#BFA76A', 
          color: '#000000', 
          padding: '12px 30px', 
          borderRadius: '4px', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          {t.action}
        </a>
      </div>

      <h3 style={{ fontSize: '16px', color: '#000', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{t.guideTitle}</h3>
      <ul style={{ paddingLeft: '20px', color: '#555' }}>
        <li style={{ marginBottom: '8px' }}>{t.guide1}</li>
        <li style={{ marginBottom: '8px' }}>{t.guide2}</li>
        <li style={{ marginBottom: '8px' }}>{t.guide3}</li>
      </ul>

      <p style={{ marginTop: '30px' }}>{t.contact}</p>
      <p style={{ fontWeight: 'bold' }}>{t.team}</p>
    </BaseEmailLayout>
  );
};

export default AccountCreationEmail;
