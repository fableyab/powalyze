import React, { useState } from 'react';
import { FileText, Download, Trash2, Eye, Image, FileCode, FileSpreadsheet, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { format } from 'date-fns';
import DocumentPreview from './DocumentPreview';

/**
 * Liste des documents avec preview, download, delete
 */
const DocumentsList = ({ documents, onDocumentDeleted }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const getFileIcon = (type) => {
    if (!type) return <FileText className="w-5 h-5 text-slate-500" />;
    if (type.includes('image')) return <Image className="w-5 h-5 text-purple-500" />;
    if (type.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (type.includes('sheet') || type.includes('excel')) return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
    return <FileCode className="w-5 h-5 text-blue-500" />;
  };

  const handlePreview = (doc) => {
    setPreviewDoc(doc);
    setIsPreviewOpen(true);
  };

  const handleDownload = async (doc) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .createSignedUrl(doc.path, 3600);

      if (error) throw error;

      const response = await fetch(data.signedUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.name || 'document';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      toast({
        title: '✅ Téléchargement réussi',
        description: `${doc.name} a été téléchargé.`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        variant: 'destructive',
        title: '❌ Erreur de téléchargement',
        description: error.message,
      });
    }
  };

  const handleDelete = async (doc) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer "${doc.name}" ?`)) return;

    if (doc.user_id !== user.id) {
      toast({
        variant: 'destructive',
        title: '🔒 Accès refusé',
        description: 'Vous ne pouvez supprimer que vos propres documents.',
      });
      return;
    }

    try {
      // Supprimer du storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([doc.path]);

      if (storageError) console.warn('Storage delete warning:', storageError);

      // Supprimer de la base de données
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', doc.id);

      if (dbError) throw dbError;

      toast({
        title: '✅ Document supprimé',
        description: `${doc.name} a été supprimé avec succès.`,
      });

      if (onDocumentDeleted) onDocumentDeleted(doc.id);
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        variant: 'destructive',
        title: '❌ Erreur de suppression',
        description: error.message,
      });
    }
  };

  if (!documents || documents.length === 0) {
    return (
      <div className="p-12 text-center border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
        <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-400 mb-2">
          Aucun document
        </h3>
        <p className="text-sm text-slate-500">
          Commencez par uploader votre premier document ci-dessus.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-[#4A9EFF]/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              {/* File info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="p-3 rounded-lg bg-slate-800 group-hover:bg-[#4A9EFF]/20 transition-colors">
                  {getFileIcon(doc.file_type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white truncate">
                    {doc.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400 flex-wrap">
                    {doc.theme && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">
                        {doc.theme}
                      </span>
                    )}
                    {doc.type && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-medium">
                        {doc.type}
                      </span>
                    )}
                    {doc.tags && (
                      <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium">
                        🏷️ {doc.tags}
                      </span>
                    )}
                    {doc.version && (
                      <span className="text-slate-500">
                        v{doc.version}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(doc.created_at), 'dd MMM yyyy')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-slate-400 hover:text-[#4A9EFF] hover:bg-[#4A9EFF]/10"
                  onClick={() => handlePreview(doc)}
                  title="Prévisualiser"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-slate-400 hover:text-green-500 hover:bg-green-500/10"
                  onClick={() => handleDownload(doc)}
                  title="Télécharger"
                >
                  <Download className="w-4 h-4" />
                </Button>
                {doc.user_id === user.id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                    onClick={() => handleDelete(doc)}
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && previewDoc && (
        <DocumentPreview
          document={previewDoc}
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setPreviewDoc(null);
          }}
        />
      )}
    </>
  );
};

export default DocumentsList;
