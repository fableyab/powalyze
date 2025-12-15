
import React from 'react';
import BaseEmailLayout from './BaseEmailLayout';

const PasswordResetEmail = ({ name, resetLink, language = 'fr' }) => {
  const content = {
    fr: {
      subject: "Réinitialisation de votre mot de passe - Powalyze",
      title: "Sécurité",
      greeting: `Bonjour ${name},`,
      intro: "Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte Powalyze.",
      action: "Réinitialiser mon mot de passe",
      warning: "Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email en toute sécurité. Votre mot de passe ne changera pas.",
      expiry: "Ce lien est valide pour 30 minutes.",
      team: "L'équipe Sécurité"
    },
    en: {
      subject: "Password Reset - Powalyze",
      title: "Security",
      greeting: `Hello ${name},`,
      intro: "We received a request to reset the password for your Powalyze account.",
      action: "Reset my password",
      warning: "If you did not request this, you can safely ignore this email. Your password will not change.",
      expiry: "This link is valid for 30 minutes.",
      team: "The Security Team"
    },
    de: {
      subject: "Passwort zurücksetzen - Powalyze",
      title: "Sicherheit",
      greeting: `Hallo ${name},`,
      intro: "Wir haben eine Anfrage zum Zurücksetzen des Passworts für Ihr Powalyze-Konto erhalten.",
      action: "Passwort zurücksetzen",
      warning: "Wenn Sie dies nicht angefordert haben, können Sie diese E-Mail ignorieren. Ihr Passwort wird nicht geändert.",
      expiry: "Dieser Link ist 30 Minuten lang gültig.",
      team: "Das Sicherheitsteam"
    }
  };

  const t = content[language] || content.fr;

  return (
    <BaseEmailLayout title={t.title} language={language}>
      <p style={{ marginTop: 0 }}>{t.greeting}</p>
      <p>{t.intro}</p>
      
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <a href={resetLink} style={{ 
          backgroundColor: '#BFA76A', 
          color: '#000000', 
          padding: '14px 35px', 
          borderRadius: '4px', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          display: 'inline-block',
          fontSize: '16px'
        }}>
          {t.action}
        </a>
      </div>

      <p style={{ fontSize: '14px', color: '#666' }}>{t.expiry}</p>
      
      <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '30px' }}>
        <p style={{ color: '#888', fontSize: '13px' }}>{t.warning}</p>
      </div>

      <p style={{ fontWeight: 'bold' }}>{t.team}</p>
    </BaseEmailLayout>
  );
};

export default PasswordResetEmail;
