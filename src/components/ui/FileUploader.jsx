import React, { useRef } from 'react';
import { useFileUpload } from '../../hooks/useFileUpload';
import Button from './Button';
import Card from './Card';

/**
 * Composant FileUploader avec drag & drop et preview
 * Utilise le hook useFileUpload pour la gestion des fichiers
 */
const FileUploader = ({
  accept = '*',
  multiple = true,
  maxSize = 10 * 1024 * 1024, // 10MB par défaut
  onUploadComplete,
  className = '',
}) => {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = React.useState(false);
  
  const {
    files,
    addFiles,
    removeFile,
    uploadFile,
    uploadAll,
    clearCompleted,
    reset,
  } = useFileUpload();

  // Validation de fichier
  const validateFile = (file) => {
    if (file.size > maxSize) {
      return { valid: false, error: `Le fichier ${file.name} est trop volumineux (max ${formatFileSize(maxSize)})` };
    }
    return { valid: true };
  };

  // Format taille de fichier
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Gestion de la sélection de fichiers
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = [];
    const errors = [];

    selectedFiles.forEach((file) => {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(validation.error);
      }
    });

    if (validFiles.length > 0) {
      addFiles(validFiles);
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    // Reset input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // Drag & Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = [];
    const errors = [];

    droppedFiles.forEach((file) => {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(validation.error);
      }
    });

    if (validFiles.length > 0) {
      addFiles(validFiles);
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }
  };

  // Upload tous les fichiers
  const handleUploadAll = async () => {
    await uploadAll();
    if (onUploadComplete) {
      onUploadComplete(files.filter((f) => f.status === 'success'));
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-gold-primary bg-dark-700'
            : 'border-dark-600 hover:border-dark-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center text-gold-primary text-3xl">
            📁
          </div>
          <div>
            <p className="text-white font-medium mb-1">
              Glissez-déposez vos fichiers ici
            </p>
            <p className="text-sm text-dark-300">
              ou cliquez sur le bouton ci-dessous
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => inputRef.current?.click()}
          >
            Choisir des fichiers
          </Button>
          <p className="text-xs text-dark-400">
            Taille maximale: {formatFileSize(maxSize)} par fichier
          </p>
        </div>
      </div>

      {/* Liste des fichiers */}
      {files.length > 0 && (
        <Card title="Fichiers sélectionnés" padding="normal">
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-dark-700 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{file.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-dark-300">
                    <span>{formatFileSize(file.size)}</span>
                    <span>•</span>
                    <span className={`font-medium ${
                      file.status === 'success' ? 'text-green-500' :
                      file.status === 'error' ? 'text-red-500' :
                      file.status === 'uploading' ? 'text-blue-500' :
                      'text-dark-400'
                    }`}>
                      {file.status === 'success' ? '✓ Envoyé' :
                       file.status === 'error' ? '✗ Erreur' :
                       file.status === 'uploading' ? `${file.progress}%` :
                       'En attente'}
                    </span>
                  </div>
                  {file.status === 'uploading' && (
                    <div className="mt-2 w-full bg-dark-600 rounded-full h-1.5">
                      <div
                        className="bg-gold-primary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                {file.status !== 'uploading' && (
                  <button
                    onClick={() => removeFile(file.id)}
                    className="ml-3 p-1.5 text-dark-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant="primary"
              onClick={handleUploadAll}
              disabled={files.some((f) => f.status === 'uploading') || files.every((f) => f.status === 'success')}
            >
              Envoyer tous les fichiers
            </Button>
            {files.some((f) => f.status === 'success') && (
              <Button variant="ghost" onClick={clearCompleted}>
                Effacer les fichiers envoyés
              </Button>
            )}
            <Button variant="ghost" onClick={reset}>
              Tout effacer
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FileUploader;
