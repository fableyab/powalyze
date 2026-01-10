import React, { useState, useEffect } from 'react';
import { X, Download, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';

/**
 * Modal de preview de document
 * Supporte: PDF, Images (JPG, PNG, GIF)
 */
const DocumentPreview = ({ document, isOpen, onClose }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && document) {
      loadPreview();
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [isOpen, document]);

  const loadPreview = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .createSignedUrl(document.path, 3600);

      if (error) throw error;

      setPreviewUrl(data.signedUrl);
    } catch (err) {
      console.error('Preview error:', err);
      setError('Impossible de charger la prévisualisation.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!previewUrl) return;

    try {
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = document.name;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  const canPreview = () => {
    const type = document.file_type || '';
    return type.includes('pdf') || type.includes('image');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">
              {document.name}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {document.file_type} • {(document.file_size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white"
              onClick={handleDownload}
              title="Télécharger"
            >
              <Download className="w-5 h-5" />
            </Button>
            {previewUrl && (
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white"
                onClick={() => window.open(previewUrl, '_blank')}
                title="Ouvrir dans un nouvel onglet"
              >
                <ExternalLink className="w-5 h-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-slate-950">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-[#4A9EFF] animate-spin" />
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-red-400 mb-2">{error}</p>
                <Button variant="outline" onClick={loadPreview}>
                  Réessayer
                </Button>
              </div>
            </div>
          )}

          {!loading && !error && previewUrl && (
            <>
              {canPreview() ? (
                <>
                  {/* PDF Preview */}
                  {document.file_type?.includes('pdf') && (
                    <iframe
                      src={`${previewUrl}#toolbar=0`}
                      className="w-full h-full border-0"
                      title={document.name}
                    />
                  )}

                  {/* Image Preview */}
                  {document.file_type?.includes('image') && (
                    <div className="flex items-center justify-center h-full p-4">
                      <img
                        src={previewUrl}
                        alt={document.name}
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <p className="text-slate-400 mb-4">
                      Prévisualisation non disponible pour ce type de fichier.
                    </p>
                    <Button onClick={handleDownload} className="bg-[#4A9EFF]">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger pour ouvrir
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
