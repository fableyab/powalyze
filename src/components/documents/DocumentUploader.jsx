import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useDocuments } from '../../contexts/DocumentsContext';

const DocumentUploader = () => {
  const { addDocument } = useDocuments();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  const getFileType = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (['xlsx', 'xls'].includes(ext)) return 'excel';
    if (['docx', 'doc'].includes(ext)) return 'word';
    return 'other';
  };

  const handleFile = (file) => {
    if (!file) return;

    setUploadStatus({ type: 'loading', message: 'Upload en cours...' });

    // Simulate upload
    setTimeout(() => {
      const newDocument = {
        name: file.name,
        type: getFileType(file.name),
        size: file.size,
        project: 'Non assigné',
        uploadedBy: 'Vous',
        url: URL.createObjectURL(file),
      };

      addDocument(newDocument);
      setUploadStatus({ type: 'success', message: `${file.name} importé avec succès` });

      setTimeout(() => setUploadStatus(null), 3000);
    }, 1000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragging
            ? 'border-gold-primary bg-gold-primary/5'
            : 'border-dark-700 hover:border-gold-primary/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.xlsx,.xls,.docx,.doc"
        />

        <div className="flex flex-col items-center gap-4">
          <div className={`p-4 rounded-full ${isDragging ? 'bg-gold-primary/20' : 'bg-dark-800'}`}>
            <Upload className={`w-8 h-8 ${isDragging ? 'text-gold-primary' : 'text-dark-400'}`} />
          </div>

          <div>
            <p className="text-white font-medium mb-1">
              Glissez-déposez vos fichiers ici
            </p>
            <p className="text-dark-400 text-sm">
              ou{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-gold-primary hover:text-gold-secondary font-medium"
              >
                parcourez
              </button>
            </p>
          </div>

          <p className="text-dark-500 text-xs">
            Formats acceptés : PDF, Excel (.xlsx, .xls), Word (.docx, .doc)
          </p>
        </div>
      </div>

      {uploadStatus && (
        <div
          className={`flex items-center gap-3 p-4 rounded-lg border ${
            uploadStatus.type === 'success'
              ? 'bg-green-900/20 border-green-700 text-green-400'
              : uploadStatus.type === 'loading'
              ? 'bg-blue-900/20 border-blue-700 text-blue-400'
              : 'bg-red-900/20 border-red-700 text-red-400'
          }`}
        >
          {uploadStatus.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
          {uploadStatus.type === 'loading' && <File className="w-5 h-5 flex-shrink-0 animate-pulse" />}
          {uploadStatus.type === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <span className="text-sm font-medium">{uploadStatus.message}</span>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
