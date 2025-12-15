
import React from 'react';
import BaseEmailLayout from './BaseEmailLayout';

const DocumentSharedEmail = ({ name, senderName, docName, docType, language = 'fr' }) => {
  const content = {
    fr: {
      subject: "Un document a été partagé avec vous - Powalyze",
      title: "Document Partagé",
      greeting: `Bonjour ${name},`,
      intro: `${senderName} a partagé un nouveau document avec vous.`,
      docLabel: "Document :",
      typeLabel: "Type :",
      action: "Voir le document",
      team: "L'équipe Powalyze"
    },
    en: {
      subject: "Document Shared With You - Powalyze",
      title: "Document Shared",
      greeting: `Hello ${name},`,
      intro: `${senderName} has shared a new document with you.`,
      docLabel: "Document:",
      typeLabel: "Type:",
      action: "View Document",
      team: "The Powalyze Team"
    },
    de: {
      subject: "Dokument mit Ihnen geteilt - Powalyze",
      title: "Dokument Geteilt",
      greeting: `Hallo ${name},`,
      intro: `${senderName} hat ein neues Dokument mit Ihnen geteilt.`,
      docLabel: "Dokument:",
      typeLabel: "Typ:",
      action: "Dokument ansehen",
      team: "Das Powalyze Team"
    }
  };

  const t = content[language] || content.fr;

  return (
    <BaseEmailLayout title={t.title} language={language}>
      <p style={{ marginTop: 0 }}>{t.greeting}</p>
      <p>{t.intro}</p>
      
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '4px', margin: '25px 0', display: 'flex', alignItems: 'center' }}>
        {/* Simple file icon representation */}
        <div style={{ width: '40px', height: '50px', backgroundColor: '#ddd', borderRadius: '4px', marginRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontWeight: 'bold', fontSize: '10px' }}>
           DOC
        </div>
        <div>
           <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{docName}</div>
           <div style={{ fontSize: '12px', color: '#666' }}>{docType}</div>
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '35px 0' }}>
        <a href="https://powalyze.ch/espace-client/documents" style={{ 
          backgroundColor: '#333', 
          color: '#ffffff', 
          padding: '12px 30px', 
          borderRadius: '4px', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          {t.action}
        </a>
      </div>

      <p style={{ fontWeight: 'bold' }}>{t.team}</p>
    </BaseEmailLayout>
  );
};

export default DocumentSharedEmail;
