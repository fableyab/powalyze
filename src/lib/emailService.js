// ============================================
// SERVICE D'ENVOI D'EMAILS - POWALYZE
// ============================================
// Support pour SendGrid, Mailgun et SMTP Hostinger

const EMAIL_CONFIG = {
  provider: import.meta.env.VITE_EMAIL_PROVIDER || 'smtp', // 'sendgrid', 'mailgun', 'smtp'
  
  // SendGrid
  sendgridApiKey: import.meta.env.VITE_SENDGRID_API_KEY,
  
  // Mailgun
  mailgunApiKey: import.meta.env.VITE_MAILGUN_API_KEY,
  mailgunDomain: import.meta.env.VITE_MAILGUN_DOMAIN,
  
  // SMTP (Hostinger)
  smtpHost: import.meta.env.VITE_SMTP_HOST || 'smtp.hostinger.com',
  smtpPort: import.meta.env.VITE_SMTP_PORT || 465,
  smtpUser: import.meta.env.VITE_SMTP_USER,
  smtpPass: import.meta.env.VITE_SMTP_PASS,
  
  // Configuration générale
  fromEmail: import.meta.env.VITE_FROM_EMAIL || 'noreply@powalyze.com',
  fromName: import.meta.env.VITE_FROM_NAME || 'Powalyze',
  replyTo: import.meta.env.VITE_REPLY_TO || 'support@powalyze.com'
};

// ============================================
// TEMPLATES D'EMAILS
// ============================================

const getInvitationEmailTemplate = (data) => {
  const { firstName, lastName, email, password, role, companyName = 'Powalyze' } = data;
  
  return {
    subject: `Votre accès ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #4A9EFF 0%, #0052cc 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .content {
            padding: 40px 30px;
          }
          .welcome {
            font-size: 18px;
            font-weight: 600;
            color: #4A9EFF;
            margin-bottom: 20px;
          }
          .credentials {
            background: #f8f9fa;
            border-left: 4px solid #4A9EFF;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
          }
          .credentials-title {
            font-weight: 600;
            color: #333;
            margin-bottom: 15px;
            font-size: 16px;
          }
          .credential-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e0e0e0;
          }
          .credential-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          .credential-label {
            color: #666;
            font-weight: 500;
          }
          .credential-value {
            color: #333;
            font-weight: 600;
            font-family: 'Courier New', monospace;
          }
          .button {
            display: inline-block;
            background: #4A9EFF;
            color: white;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            transition: background 0.3s;
          }
          .button:hover {
            background: #0052cc;
          }
          .instructions {
            background: #fff9e6;
            border-left: 4px solid #D4AF37;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .instructions h3 {
            margin: 0 0 15px 0;
            color: #D4AF37;
            font-size: 16px;
          }
          .instructions ol {
            margin: 0;
            padding-left: 20px;
          }
          .instructions li {
            margin-bottom: 8px;
            color: #666;
          }
          .role-badge {
            display: inline-block;
            background: #e8f4ff;
            color: #4A9EFF;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 600;
            margin-top: 10px;
          }
          .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #e0e0e0;
          }
          .footer a {
            color: #4A9EFF;
            text-decoration: none;
          }
          .security-notice {
            background: #fff5f5;
            border-left: 4px solid #ff4444;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 13px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Bienvenue sur ${companyName}</h1>
          </div>
          
          <div class="content">
            <div class="welcome">Bonjour ${firstName} ${lastName},</div>
            
            <p>Votre compte a été créé par l'administrateur. Nous sommes ravis de vous accueillir sur la plateforme ${companyName}.</p>
            
            <div class="credentials">
              <div class="credentials-title">🔐 Vos identifiants de connexion :</div>
              <div class="credential-item">
                <span class="credential-label">Email :</span>
                <span class="credential-value">${email}</span>
              </div>
              <div class="credential-item">
                <span class="credential-label">Mot de passe :</span>
                <span class="credential-value">${password}</span>
              </div>
              <div class="credential-item">
                <span class="credential-label">Rôle :</span>
                <span class="credential-value">${role}</span>
              </div>
            </div>

            <div style="text-align: center;">
              <a href="https://www.powalyze.com/login" class="button">
                Se connecter à ${companyName}
              </a>
            </div>

            <div class="instructions">
              <h3>📝 Instructions de première connexion :</h3>
              <ol>
                <li>Cliquez sur le bouton ci-dessus ou rendez-vous sur <strong>www.powalyze.com</strong></li>
                <li>Connectez-vous avec votre email et votre mot de passe temporaire</li>
                <li>Vous serez invité à changer votre mot de passe</li>
                <li>Configurez votre profil et vos préférences</li>
              </ol>
            </div>

            <div class="security-notice">
              <strong>⚠️ Important :</strong> Pour des raisons de sécurité, nous vous recommandons de changer votre mot de passe dès votre première connexion.
            </div>

            <p style="margin-top: 30px; color: #666;">
              Si vous avez des questions ou besoin d'assistance, n'hésitez pas à contacter notre équipe support à 
              <a href="mailto:${EMAIL_CONFIG.replyTo}" style="color: #4A9EFF;">${EMAIL_CONFIG.replyTo}</a>
            </p>
          </div>

          <div class="footer">
            <p>
              Cet email a été envoyé par ${companyName}<br>
              <a href="https://www.powalyze.com">www.powalyze.com</a>
            </p>
            <p style="font-size: 12px; color: #999; margin-top: 15px;">
              © ${new Date().getFullYear()} Powalyze. Tous droits réservés.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Bonjour ${firstName} ${lastName},

Votre compte ${companyName} a été créé avec succès !

VOS IDENTIFIANTS :
- Email : ${email}
- Mot de passe : ${password}
- Rôle : ${role}

INSTRUCTIONS :
1. Rendez-vous sur www.powalyze.com
2. Connectez-vous avec vos identifiants
3. Changez votre mot de passe dès la première connexion

Lien de connexion : https://www.powalyze.com/login

Pour toute question : ${EMAIL_CONFIG.replyTo}

Cordialement,
L'équipe ${companyName}
    `.trim()
  };
};

const getPasswordResetTemplate = (data) => {
  const { firstName, lastName, newPassword } = data;
  
  return {
    subject: 'Réinitialisation de votre mot de passe Powalyze',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4A9EFF; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .password-box { background: white; padding: 15px; border-left: 4px solid #4A9EFF; margin: 20px 0; }
          .button { display: inline-block; background: #4A9EFF; color: white; text-decoration: none; padding: 12px 24px; border-radius: 4px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Réinitialisation de mot de passe</h1>
          </div>
          <div class="content">
            <p>Bonjour ${firstName} ${lastName},</p>
            <p>Votre mot de passe a été réinitialisé par un administrateur.</p>
            <div class="password-box">
              <strong>Nouveau mot de passe :</strong><br>
              <code style="font-size: 16px; color: #4A9EFF;">${newPassword}</code>
            </div>
            <p><strong>⚠️ Important :</strong> Changez ce mot de passe dès votre prochaine connexion.</p>
            <a href="https://www.powalyze.com/login" class="button">Se connecter</a>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Bonjour ${firstName} ${lastName},\n\nVotre mot de passe a été réinitialisé.\n\nNouveau mot de passe : ${newPassword}\n\nConnectez-vous sur www.powalyze.com`
  };
};

// ============================================
// FONCTIONS D'ENVOI
// ============================================

/**
 * Envoie un email d'invitation à un nouvel utilisateur
 */
export const sendInvitationEmail = async (userData) => {
  const template = getInvitationEmailTemplate(userData);
  return await sendEmail({
    to: userData.email,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
};

/**
 * Envoie un email de réinitialisation de mot de passe
 */
export const sendPasswordResetEmail = async (userData) => {
  const template = getPasswordResetTemplate(userData);
  return await sendEmail({
    to: userData.email,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
};

/**
 * Fonction générique d'envoi d'email
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    // En mode développement, logger dans la console
    if (import.meta.env.DEV) {
      console.log('📧 [DEV MODE] Email qui serait envoyé:');
      console.log('├─ To:', to);
      console.log('├─ Subject:', subject);
      console.log('└─ Provider:', EMAIL_CONFIG.provider);
      return { success: true, mode: 'development' };
    }

    // En production, appeler le backend pour envoyer l'email
    const backendUrl = import.meta.env.VITE_API_URL || 'https://api.powalyze.com';
    
    const response = await fetch(`${backendUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        provider: EMAIL_CONFIG.provider,
        to,
        from: {
          email: EMAIL_CONFIG.fromEmail,
          name: EMAIL_CONFIG.fromName
        },
        replyTo: EMAIL_CONFIG.replyTo,
        subject,
        html,
        text,
        // Credentials (devrait être côté backend pour la sécurité)
        config: {
          sendgridApiKey: EMAIL_CONFIG.sendgridApiKey,
          mailgunApiKey: EMAIL_CONFIG.mailgunApiKey,
          mailgunDomain: EMAIL_CONFIG.mailgunDomain,
          smtpHost: EMAIL_CONFIG.smtpHost,
          smtpPort: EMAIL_CONFIG.smtpPort,
          smtpUser: EMAIL_CONFIG.smtpUser,
          smtpPass: EMAIL_CONFIG.smtpPass
        }
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Erreur lors de l\'envoi de l\'email');
    }

    console.log('✅ Email envoyé avec succès à:', to);
    return { success: true, data: result };

  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    throw error;
  }
};

// ============================================
// CONFIGURATION BACKEND (Node.js/Express)
// ============================================
/*
EXEMPLE DE ROUTE BACKEND À CRÉER :

// backend/routes/email.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

router.post('/send-email', async (req, res) => {
  const { provider, to, from, replyTo, subject, html, text, config } = req.body;

  try {
    switch (provider) {
      case 'sendgrid':
        sgMail.setApiKey(config.sendgridApiKey);
        await sgMail.send({
          to,
          from: { email: from.email, name: from.name },
          replyTo,
          subject,
          html,
          text
        });
        break;

      case 'mailgun':
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({ username: 'api', key: config.mailgunApiKey });
        await mg.messages.create(config.mailgunDomain, {
          from: `${from.name} <${from.email}>`,
          to,
          subject,
          html,
          text
        });
        break;

      case 'smtp':
        const transporter = nodemailer.createTransport({
          host: config.smtpHost,
          port: config.smtpPort,
          secure: config.smtpPort == 465,
          auth: {
            user: config.smtpUser,
            pass: config.smtpPass
          }
        });
        await transporter.sendMail({
          from: `${from.name} <${from.email}>`,
          to,
          replyTo,
          subject,
          html,
          text
        });
        break;

      default:
        throw new Error('Provider non supporté');
    }

    res.json({ success: true, message: 'Email envoyé' });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// backend/server.js
const emailRoutes = require('./routes/email');
app.use('/api', emailRoutes);
*/

// ============================================
// VARIABLES D'ENVIRONNEMENT REQUISES (.env)
// ============================================
/*
# Choix du provider (sendgrid, mailgun, smtp)
VITE_EMAIL_PROVIDER=smtp

# Configuration générale
VITE_FROM_EMAIL=noreply@powalyze.com
VITE_FROM_NAME=Powalyze
VITE_REPLY_TO=support@powalyze.com

# SendGrid
VITE_SENDGRID_API_KEY=SG.xxx

# Mailgun
VITE_MAILGUN_API_KEY=xxx
VITE_MAILGUN_DOMAIN=mg.powalyze.com

# SMTP Hostinger
VITE_SMTP_HOST=smtp.hostinger.com
VITE_SMTP_PORT=465
VITE_SMTP_USER=noreply@powalyze.com
VITE_SMTP_PASS=xxx

# API Backend
VITE_API_URL=https://api.powalyze.com
*/

export default {
  sendInvitationEmail,
  sendPasswordResetEmail,
  sendEmail
};
