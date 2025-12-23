import React from 'react';
import { FiFile, FiFileText, FiImage } from 'react-icons/fi';

function getFileIcon(mimeType) {
  if (mimeType?.startsWith('image/')) return FiImage;
  if (mimeType?.includes('pdf')) return FiFile;
  return FiFileText;
}

export default function FilePreview({ file, dataUrl }) {
  if (!file) return null;

  const isImage = file.type.startsWith('image/');
  const Icon = getFileIcon(file.type);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Aperçu</h3>
      <div className="relative bg-[#0A0A0A] rounded-xl border-2 border-[#BFA76A]/20 overflow-hidden">
        {isImage && dataUrl ? (
          <img
            src={dataUrl}
            alt={file.name}
            className="w-full h-64 object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Icon className="w-20 h-20 mb-4 text-[#BFA76A]" />
            <p className="text-sm font-medium text-gray-300">Aperçu non disponible</p>
          </div>
        )}
      </div>
      <div className="bg-[#0A0A0A] rounded-xl border border-[#BFA76A]/20 p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Nom:</span>
          <span className="text-white font-medium text-sm">{file.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Taille:</span>
          <span className="text-white font-medium text-sm">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Type:</span>
          <span className="text-white font-medium text-sm">{file.type || 'Inconnu'}</span>
        </div>
      </div>
    </div>
  );
}