import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

/**
 * Drag & Drop Upload Box Component
 * Gère l'upload de fichiers vers Supabase Storage avec multi-tenant
 */
const UploadBox = ({ onUploadComplete }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [theme, setTheme] = useState('');
  const [type, setType] = useState('');
  const [tags, setTags] = useState('');

  const validateFile = (file) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'text/csv',
    ];

    if (file.size > maxSize) {
      toast({
        variant: 'destructive',
        title: 'Fichier trop volumineux',
        description: 'La taille maximale est de 50 MB.',
      });
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: 'destructive',
        title: 'Type de fichier non autorisé',
        description: 'Seuls PDF, images, Word, Excel et CSV sont acceptés.',
      });
      return false;
    }

    return true;
  };

  const uploadFile = async (file) => {
    if (!file || !user) return;

    if (!validateFile(file)) return;

    // Vérifier que le thème est renseigné
    if (!theme.trim()) {
      toast({
        variant: 'destructive',
        title: 'Thème requis',
        description: 'Veuillez renseigner le thème du document.',
      });
      return;
    }

    setUploading(true);

    try {
      // Chemin multi-tenant: userId/timestamp-filename
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${user.id}/${timestamp}-${sanitizedName}`;

      // Upload vers Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Récupérer le tenant_id depuis le profil de l'utilisateur
      const { data: profile } = await supabase
        .from('profiles')
        .select('tenant_id')
        .eq('id', user.id)
        .single();

      // Enregistrer dans la base de données (nouveau schéma)
      const { data: docData, error: dbError } = await supabase
        .from('documents')
        .insert({
          name: file.name,
          path: filePath,
          user_id: user.id,
          theme: theme.trim(),
          type: type.trim() || null,
          tags: tags.trim() || null,
          version: 1,
        })
        .select()
        .single();

      if (dbError) {
        // Rollback: supprimer le fichier uploadé
        await supabase.storage.from('documents').remove([filePath]);
        throw dbError;
      }

      toast({
        title: '✅ Document ajouté',
        description: `${file.name} a été uploadé avec succès.`,
      });

      setSelectedFile(null);
      setTheme('');
      setType('');
      setTags('');
      if (onUploadComplete) onUploadComplete(docData);
    } catch (error) {
      console.error('Upload error:', error);
      
      let errorMessage = 'Une erreur est survenue.';
      
      if (error.message?.includes('bucket')) {
        errorMessage = '❌ Le bucket \'documents\' n\'existe pas. Créez-le dans Supabase Dashboard → Storage.';
      } else if (error.message?.includes('policy')) {
        errorMessage = '❌ Les Storage policies ne sont pas configurées. Vérifiez DOCUMENTS_MODULE_SETUP.md';
      } else if (error.message?.includes('duplicate')) {
        errorMessage = '❌ Ce fichier existe déjà.';
      } else if (error.code === '23502') {
        errorMessage = '❌ Colonne requise manquante. Appliquez la migration SQL: supabase/migrations/20260108_documents_module.sql';
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      toast({
        variant: 'destructive',
        title: '❌ Erreur d\'upload',
        description: errorMessage,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      // Ne pas uploader immédiatement, attendre que l'utilisateur remplisse le thème
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Ne pas uploader immédiatement, attendre que l'utilisateur remplisse le thème
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  return (
    <div className="space-y-4">
      {/* Formulaire pour métadonnées */}
      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 space-y-3">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Thème <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ex: Décision stratégique, Audit financier, Risques..."
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4A9EFF] focus:border-transparent"
            disabled={uploading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Type
          </label>
          <input
            type="text"
            placeholder="Ex: Business case, Rapport, Contrat..."
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4A9EFF] focus:border-transparent"
            disabled={uploading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Tags
          </label>
          <input
            type="text"
            placeholder="Ex: finance, audit, Q1-2024 (séparés par virgules)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4A9EFF] focus:border-transparent"
            disabled={uploading}
          />
          <p className="text-xs text-slate-400 mt-1">Séparez les tags par des virgules</p>
        </div>
      </div>

      {/* Zone de drag & drop */}
      <div
        className={`
          relative p-8 border-2 border-dashed rounded-2xl text-center transition-all
          ${dragActive ? 'border-[#4A9EFF] bg-[#4A9EFF]/10' : 'border-slate-700 bg-slate-900/50'}
          ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:border-[#4A9EFF] hover:bg-slate-900'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        disabled={uploading}
        accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.xls,.xlsx,.txt,.csv"
      />

      <div className="flex flex-col items-center gap-4">
        {uploading ? (
          <>
            <Loader2 className="w-12 h-12 text-[#4A9EFF] animate-spin" />
            <div>
              <p className="text-lg font-semibold text-white">Upload en cours...</p>
              {selectedFile && (
                <p className="text-sm text-slate-400 mt-1">{selectedFile.name}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="p-4 rounded-full bg-[#4A9EFF]/20">
              <Upload className="w-8 h-8 text-[#4A9EFF]" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white mb-1">
                Déposez vos fichiers ici
              </p>
              <p className="text-sm text-slate-400">
                ou cliquez pour parcourir (PDF, Images, Word, Excel - Max 50MB)
              </p>
            </div>
          </>
        )}
      </div>

      {selectedFile && !uploading && (
        <div className="mt-4 p-4 rounded-lg bg-slate-800 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#4A9EFF]" />
              <span className="text-sm text-white font-medium">{selectedFile.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Button
            onClick={handleUploadClick}
            className="w-full bg-[#4A9EFF] hover:bg-[#0052CC] text-white"
            disabled={!theme.trim()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Uploader le document
          </Button>
          {!theme.trim() && (
            <p className="text-xs text-red-400 mt-2 text-center">
              ⚠️ Veuillez renseigner le thème avant d'uploader
            </p>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default UploadBox;
