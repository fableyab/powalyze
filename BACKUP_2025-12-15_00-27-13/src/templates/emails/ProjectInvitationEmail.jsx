
import React from 'react';
import BaseEmailLayout from './BaseEmailLayout';

const ProjectInvitationEmail = ({ name, inviterName, projectName, projectRole, language = 'fr' }) => {
  const content = {
    fr: {
      subject: "Invitation à rejoindre un projet - Powalyze",
      title: "Nouveau Projet",
      greeting: `Bonjour ${name},`,
      intro: `${inviterName} vous a invité à collaborer sur un projet dans l'espace client Powalyze.`,
      projectLabel: "Projet :",
      roleLabel: "Rôle :",
      action: "Accepter l'invitation",
      team: "L'équipe Powalyze"
    },
    en: {
      subject: "Project Invitation - Powalyze",
      title: "New Project",
      greeting: `Hello ${name},`,
      intro: `${inviterName} has invited you to collaborate on a project in the Powalyze client portal.`,
      projectLabel: "Project:",
      roleLabel: "Role:",
      action: "Accept Invitation",
      team: "The Powalyze Team"
    },
    de: {
      subject: "Projekteinladung - Powalyze",
      title: "Neues Projekt",
      greeting: `Hallo ${name},`,
      intro: `${inviterName} hat Sie eingeladen, an einem Projekt im Powalyze-Kundenportal mitzuarbeiten.`,
      projectLabel: "Projekt:",
      roleLabel: "Rolle:",
      action: "Einladung annehmen",
      team: "Das Powalyze Team"
    }
  };

  const t = content[language] || content.fr;

  return (
    <BaseEmailLayout title={t.title} language={language}>
      <p style={{ marginTop: 0 }}>{t.greeting}</p>
      <p>{t.intro}</p>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: '25px', borderRadius: '8px', margin: '30px 0', border: '1px solid #e0e0e0' }}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ padding: '5px 0', color: '#666' }}>{t.projectLabel}</td>
              <td style={{ padding: '5px 0', fontWeight: 'bold', fontSize: '18px' }}>{projectName}</td>
            </tr>
            <tr>
              <td style={{ padding: '5px 0', color: '#666' }}>{t.roleLabel}</td>
              <td style={{ padding: '5px 0' }}>{projectRole}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'center', margin: '35px 0' }}>
        <a href="https://powalyze.ch/espace-client" style={{ 
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

      <p style={{ fontWeight: 'bold' }}>{t.team}</p>
    </BaseEmailLayout>
  );
};

export default ProjectInvitationEmail;
