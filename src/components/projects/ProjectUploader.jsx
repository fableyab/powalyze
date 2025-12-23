import React, { useState } from 'react';
import { FiX, FiUpload, FiFile } from 'react-icons/fi';
import { useDocumentsContext } from '@/contexts/DocumentsContext';
import FileTypeSelector from '../documents/FileTypeSelector';
import CategorySelector from '../documents/CategorySelector';
import TagSelector from '../documents/TagSelector';
import ProgressBar from '../documents/ProgressBar';
import FilePreview from '../documents/FilePreview';

export default function ProjectUploader({ onClose, onSuccess, projectId }) {
  const { uploadDocument } = useDocumentsContext();
  const [step, setStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileDataUrls, setFileDataUrls] = useState([]);
  const [fileType, setFileType] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      const urls = files.map(file => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(urls).then(setFileDataUrls);
      setStep(2);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      const urls = files.map(file => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(urls).then(setFileDataUrls);
      setStep(2);
    }
  };

  const handleUpload = async () => {
    if (!fileType || !category) return;
    
    setIsUploading(true);
    setStep(4);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        await uploadDocument(
          file,
          { fileType, category, tags, projectId },
          (progress) => {
            const totalProgress = ((i + progress / 100) / selectedFiles.length) * 100;
            setUploadProgress(Math.round(totalProgress));
          }
        );
      }
      
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 500);
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setFileDataUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#1A1A1A] to-[#0F0F0F] border-b border-[#BFA76A]/20 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
              Upload Documents
            </h2>
            <p className="text-gray-400 mt-1">
              Étape {step}/4 - {step === 1 ? 'Sélection' : step === 2 ? 'Type' : step === 3 ? 'Catégorie & Tags' : 'Upload'}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="p-2 rounded-lg hover:bg-white/5 transition-all disabled:opacity-50"
          >
            <FiX className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {step === 1 && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                isDragging
                  ? 'border-[#BFA76A] bg-[#BFA76A]/5'
                  : 'border-[#BFA76A]/30 hover:border-[#BFA76A]/50'
              }`}
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#BFA76A]/20 to-[#D4AF37]/10 border border-[#BFA76A]/30 flex items-center justify-center">
                <FiUpload className="w-12 h-12 text-[#BFA76A]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Upload vos documents</h3>
              <p className="text-gray-400 mb-6">Glissez-déposez vos fichiers ou cliquez pour parcourir</p>
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all cursor-pointer">
                <FiFile className="w-5 h-5" />
                Sélectionner
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Type de fichier</h3>
              <FileTypeSelector selected={fileType} onSelect={setFileType} />
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
                >
                  Retour
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!fileType}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Catégorie</h3>
                <CategorySelector selected={category} onSelect={setCategory} />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Tags (optionnel)</h3>
                <TagSelector tags={tags} onTagsChange={setTags} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Aperçu ({selectedFiles.length} fichier{selectedFiles.length > 1 ? 's' : ''})</h3>
                <div className="space-y-3">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-4 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg p-4">
                      <FilePreview file={file} dataUrl={fileDataUrls[index]} />
                      <button
                        onClick={() => removeFile(index)}
                        className="ml-auto p-2 rounded-lg hover:bg-red-500/20 transition-all"
                      >
                        <FiX className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
                >
                  Retour
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!category || selectedFiles.length === 0}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload ({selectedFiles.length})
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#BFA76A]/20 to-[#D4AF37]/10 border border-[#BFA76A]/30 flex items-center justify-center animate-pulse">
                  <FiUpload className="w-12 h-12 text-[#BFA76A]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Upload en cours...</h3>
                <p className="text-gray-400 mb-8">{selectedFiles.length} fichier{selectedFiles.length > 1 ? 's' : ''}</p>
                <ProgressBar progress={uploadProgress} fileName={`${selectedFiles.length} fichier${selectedFiles.length > 1 ? 's' : ''}`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}