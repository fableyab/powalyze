
import React from 'react';

const BaseEmailLayout = ({ children, title, language = 'fr' }) => {
  const footerText = {
    fr: {
      copyright: "© 2025 Powalyze SA. Tous droits réservés.",
      address: "Genève, Lausanne, Valais, Canton de Vaud, Suisse Alémanique",
      unsubscribe: "Se désinscrire",
      privacy: "Politique de confidentialité"
    },
    en: {
      copyright: "© 2025 Powalyze SA. All rights reserved.",
      address: "Geneva, Lausanne, Valais, Canton of Vaud, German-speaking Switzerland",
      unsubscribe: "Unsubscribe",
      privacy: "Privacy Policy"
    },
    de: {
      copyright: "© 2025 Powalyze SA. Alle Rechte vorbehalten.",
      address: "Genf, Lausanne, Wallis, Kanton Waadt, Deutschschweiz",
      unsubscribe: "Abmelden",
      privacy: "Datenschutzerklärung"
    }
  };

  const t = footerText[language] || footerText.fr;

  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '40px 0', margin: 0 }}>
      <table role="presentation" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td align="center">
              {/* Main Container */}
              <table role="presentation" style={{ width: '600px', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                {/* Header */}
                <thead>
                  <tr>
                    <td style={{ backgroundColor: '#0A0A0A', padding: '30px', textAlign: 'center', borderBottom: '3px solid #BFA76A' }}>
                      <h1 style={{ color: '#ffffff', margin: 0, fontSize: '24px', letterSpacing: '2px' }}>POWALYZE</h1>
                      {title && <p style={{ color: '#BFA76A', margin: '10px 0 0 0', fontSize: '14px', textTransform: 'uppercase' }}>{title}</p>}
                    </td>
                  </tr>
                </thead>
                
                {/* Body */}
                <tbody>
                  <tr>
                    <td style={{ padding: '40px 30px', color: '#333333', lineHeight: '1.6', fontSize: '16px' }}>
                      {children}
                    </td>
                  </tr>
                </tbody>

                {/* Footer */}
                <tfoot>
                  <tr>
                    <td style={{ backgroundColor: '#111111', padding: '30px', textAlign: 'center', color: '#888888', fontSize: '12px' }}>
                      <p style={{ margin: '0 0 10px 0' }}>{t.address}</p>
                      <p style={{ margin: '0 0 20px 0' }}>
                        <a href="https://powalyze.ch" style={{ color: '#BFA76A', textDecoration: 'none' }}>www.powalyze.ch</a>
                      </p>
                      <div style={{ borderTop: '1px solid #333333', paddingTop: '20px' }}>
                        <p style={{ margin: 0 }}>{t.copyright}</p>
                        <p style={{ margin: '10px 0 0 0' }}>
                          <a href="#" style={{ color: '#666666', textDecoration: 'underline', marginRight: '15px' }}>{t.privacy}</a>
                          <a href="#" style={{ color: '#666666', textDecoration: 'underline' }}>{t.unsubscribe}</a>
                        </p>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BaseEmailLayout;
