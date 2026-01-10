import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

const MetabaseEmbed = ({ dashboardId, params = {}, className = "" }) => {
  const [iframeUrl, setIframeUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateEmbedUrl = () => {
      try {
        const METABASE_SITE_URL = import.meta.env.VITE_METABASE_URL || 'http://localhost:3000';
        const METABASE_SECRET_KEY = import.meta.env.VITE_METABASE_SECRET_KEY;

        if (!METABASE_SECRET_KEY) {
          throw new Error('METABASE_SECRET_KEY non configurée');
        }

        // Payload JWT pour Metabase
        const payload = {
          resource: { dashboard: parseInt(dashboardId) },
          params: params,
          exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minutes
        };

        // Générer le token JWT
        const token = jwt.sign(payload, METABASE_SECRET_KEY);

        // Construire l'URL d'embed
        const url = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=false`;
        
        setIframeUrl(url);
        setLoading(false);
      } catch (err) {
        console.error('Erreur génération embed Metabase:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (dashboardId) {
      generateEmbedUrl();
    }
  }, [dashboardId, params]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Chargement du rapport...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-400 text-sm mb-2">Erreur de chargement</p>
          <p className="text-gray-500 text-xs">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={iframeUrl}
      className={className}
      frameBorder="0"
      width="100%"
      height="100%"
      allowTransparency
      title="Metabase Dashboard"
    />
  );
};

export default MetabaseEmbed;
