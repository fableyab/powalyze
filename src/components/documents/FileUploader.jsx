import React, { useState, useCallback } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import FileTypeSelector from './FileTypeSelector';
import CategorySelector from './CategorySelector';
import TagSelector from './TagSelector';
import FilePreview from './FilePreview';
import ProgressBar from './ProgressBar';
import { useDocumentsContext } from '@/contexts/DocumentsContext';

export default function FileUploader({ onClose, onSuccess }) {
  const { uploadDocument } = useDocumentsContext();
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState(null);
  const [fileType, setFileType] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = useCallback((file) => {
    if (!file) return;

    setSelectedFile(file);
    
    // Generate preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setFileDataUrl(e.target.result);
      reader.readAsDataURL(file);
    }

    setStep(2);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile || !fileType || !category) return;

    setIsUploading(true);
    setStep(4);

    try {
      await uploadDocument(
        selectedFile,
        { fileType, category, tags },
        (progress) => setUploadProgress(progress)
      );

      setTimeout(() => {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      }, 500);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur lors de l\'upload du fichier');
      setIsUploading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              isDragging
                ? 'border-[#BFA76A] bg-[#BFA76A]/10'
                : 'border-[#BFA76A]/30 hover:border-[#BFA76A]/50 hover:bg-[#BFA76A]/5'
            }`}
          >
            <FiUpload className="w-16 h-16 mx-auto mb-4 text-[#BFA76A]" />
            <h3 className="text-xl font-bold text-white mb-2">
              Glissez-déposez votre fichier ici
            </h3>
            <p className="text-gray-400 mb-6">ou</p>
            <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all cursor-pointer">
              <FiUpload className="w-5 h-5" />
              Sélectionner un fichier
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
                accept="*/*"
              />
            </label>
            <p className="text-xs text-gray-500 mt-4">Tous les types de fichiers acceptés</p>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <FileTypeSelector selected={fileType} onSelect={setFileType} />
            {fileType && (
              <div className="flex justify-end">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
                >
                  Étape suivante
                </button>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <CategorySelector selected={category} onSelect={setCategory} />
            {category && (
              <>
                <TagSelector tags={tags} onTagsChange={setTags} />
                <FilePreview file={selectedFile} dataUrl={fileDataUrl} />
                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 text-white font-medium rounded-lg hover:border-[#BFA76A]/50 transition-all"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Uploader le document
                  </button>
                </div>
              </>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#BFA76A]/20 to-[#D4AF37]/10 flex items-center justify-center">
                <FiUpload className="w-10 h-10 text-[#BFA76A]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Upload en cours...
              </h3>
              <p className="text-gray-400">Veuillez patienter</p>
            </div>
            <ProgressBar progress={uploadProgress} fileName={selectedFile?.name} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#1A1A1A] to-[#0F0F0F] border-b border-[#BFA76A]/20 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
              Nouveau Document
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Étape {step}/3 {selectedFile && `- ${selectedFile.name}`}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#BFA76A]/10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}