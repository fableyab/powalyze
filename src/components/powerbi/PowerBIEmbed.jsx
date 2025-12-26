import React from 'react';

const PowerBIEmbed = ({ url, title }) => {
  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden shadow-xl">
      <div className="bg-dark-900 px-6 py-4 border-b border-dark-700">
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {url && !url.includes('REPLACE_WITH_YOUR') ? (
          <iframe
            src={url}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
            title={title}
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-dark-900">
            <div className="text-center px-8">
              <svg className="w-20 h-20 mx-auto mb-6 text-gold-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h4 className="text-white text-xl font-bold mb-3">Dashboard Power BI</h4>
              <p className="text-dark-300 text-sm mb-6 max-w-md mx-auto">
                Configurez l'URL de votre rapport Power BI pour afficher vos données en temps réel.
              </p>
              <div className="bg-dark-800 rounded-lg p-4 text-left max-w-lg mx-auto">
                <p className="text-xs text-dark-400 mb-2">Étapes de configuration :</p>
                <ol className="text-xs text-dark-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-gold-primary font-bold mr-2">1.</span>
                    <span>Publiez votre rapport sur Power BI Service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-primary font-bold mr-2">2.</span>
                    <span>Obtenez le lien d'intégration (Fichier → Intégrer → Publier sur le web)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-primary font-bold mr-2">3.</span>
                    <span>Contactez le support pour configurer l'URL</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PowerBIEmbed;
