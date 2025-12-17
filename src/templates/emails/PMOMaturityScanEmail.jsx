import React from 'react';

const PMOMaturityScanEmail = ({ name, company, score, level, governance, delivery, risk, data, change, language = 'fr' }) => {
  const t = {
    fr: {
      title: 'Vos Résultats PMO Maturity Scan',
      greeting: 'Bonjour',
      thanks: 'Merci d\'avoir complété le PMO Maturity Scan Powalyze! Voici vos résultats détaillés.',
      globalScore: 'Score Global de Maturité',
      analysis: 'Analyse par Dimension',
      governance: 'Gouvernance & Rôles',
      deliveryLabel: 'Delivery & Cycle',
      riskLabel: 'Risques & Dépendances',
      dataLabel: 'Data & Reporting',
      changeLabel: 'Changement & Sponsoring',
      recommendations: 'Recommandations Prioritaires',
      cta: 'Découvrez nos solutions PMO',
      questions: 'Des questions? Contactez-nous',
      copyright: '© 2025 Powalyze. Tous droits réservés.'
    },
    en: {
      title: 'Your PMO Maturity Scan Results',
      greeting: 'Hello',
      thanks: 'Thank you for completing the Powalyze PMO Maturity Scan! Here are your detailed results.',
      globalScore: 'Global Maturity Score',
      analysis: 'Analysis by Dimension',
      governance: 'Governance & Roles',
      deliveryLabel: 'Delivery & Cycle',
      riskLabel: 'Risks & Dependencies',
      dataLabel: 'Data & Reporting',
      changeLabel: 'Change & Sponsoring',
      recommendations: 'Priority Recommendations',
      cta: 'Discover our PMO Solutions',
      questions: 'Questions? Contact us',
      copyright: '© 2025 Powalyze. All rights reserved.'
    }
  };

  const texts = t[language] || t.fr;
  const levelBadge = {
    initial: '🔴 Initial',
    defined: '🟡 Défini / Defined',
    structured: '🟢 Structuré / Structured',
    optimized: '🟢 Optimisé / Optimized'
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif', color: '#333', maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #BFA76A 0%, #D4AF7E 100%)', color: 'white', padding: '30px', textAlign: 'center', borderRadius: '8px', marginBottom: '30px' }}>
        <h1 style={{ margin: '0', fontSize: '28px' }}>🎯 {texts.title}</h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>{company}</p>
      </div>

      {/* Greeting */}
      <p style={{ fontSize: '16px', marginBottom: '10px' }}>{texts.greeting} {name},</p>
      <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6' }}>{texts.thanks}</p>

      {/* Global Score Box */}
      <div style={{ background: '#f5f5f5', borderLeft: '4px solid #BFA76A', padding: '20px', margin: '20px 0', borderRadius: '4px' }}>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#BFA76A' }}>{score}/5</div>
        <div style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>{texts.globalScore}</div>
        <div style={{ marginTop: '15px', color: '#666', fontSize: '15px' }}>
          <strong>{levelBadge[level]}</strong>
        </div>
      </div>

      {/* Dimensions Grid */}
      <h2 style={{ color: '#333', fontSize: '18px', marginTop: '30px', marginBottom: '15px' }}>📊 {texts.analysis}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '6px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '12px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>{texts.governance}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#BFA76A', marginTop: '8px' }}>{governance}/5</div>
        </div>
        <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '6px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '12px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>{texts.deliveryLabel}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#BFA76A', marginTop: '8px' }}>{delivery}/5</div>
        </div>
        <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '6px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '12px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>{texts.riskLabel}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#BFA76A', marginTop: '8px' }}>{risk}/5</div>
        </div>
        <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '6px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '12px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>{texts.dataLabel}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#BFA76A', marginTop: '8px' }}>{data}/5</div>
        </div>
        <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '6px', border: '1px solid #eee', gridColumn: '1 / -1' }}>
          <div style={{ fontSize: '12px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>{texts.changeLabel}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#BFA76A', marginTop: '8px' }}>{change}/5</div>
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ background: '#f0f7ff', borderLeft: '4px solid #1e88e5', padding: '20px', margin: '20px 0', borderRadius: '4px' }}>
        <h3 style={{ marginTop: '0', color: '#1e88e5', marginBottom: '10px' }}>💡 {texts.recommendations}</h3>
        <ul style={{ margin: '10px 0', paddingLeft: '20px', color: '#555' }}>
          <li style={{ marginBottom: '8px' }}>Mettre en place une gouvernance PMO formalisée (gouvernance & rôles clairs)</li>
          <li style={{ marginBottom: '8px' }}>Standardiser le cycle de delivery et la planification</li>
          <li>Implémenter un reporting automatisé et une source unique de vérité (BI/Dashboard)</li>
        </ul>
      </div>

      {/* CTA */}
      <div style={{ background: '#BFA76A', color: 'white', padding: '15px', textAlign: 'center', borderRadius: '6px', margin: '30px 0' }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Envie de passer à l'action?</p>
        <a href="https://powalyze.com/offers" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          {texts.cta} →
        </a>
      </div>

      {/* Questions */}
      <p style={{ color: '#666', fontSize: '14px' }}>
        {texts.questions}: <a href="mailto:sales@powalyze.com" style={{ color: '#BFA76A', textDecoration: 'none' }}>sales@powalyze.com</a>
      </p>

      {/* Footer */}
      <div style={{ textAlign: 'center', color: '#999', fontSize: '12px', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
        <p>{texts.copyright}</p>
      </div>
    </div>
  );
};

export default PMOMaturityScanEmail;
