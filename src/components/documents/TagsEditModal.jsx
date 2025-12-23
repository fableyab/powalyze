import React, { useState } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import TagSelector from './TagSelector';

export default function TagsEditModal({ document, onClose, onSave }) {
  const [tags, setTags] = useState(document.tags || []);

  const handleSave = () => {
    onSave(document.id, tags);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#1A1A1A] to-[#0F0F0F] border-b border-[#BFA76A]/20 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
              Éditer les Tags
            </h2>
            <p className="text-gray-400 text-sm mt-1">{document.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#BFA76A]/10 rounded-lg transition-all"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <TagSelector tags={tags} onTagsChange={setTags} />
        </div>

        {/* Footer */}
        <div className="border-t border-[#BFA76A]/20 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 text-white font-medium rounded-lg hover:border-[#BFA76A]/50 transition-all"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
          >
            <FiSave className="w-5 h-5" />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}