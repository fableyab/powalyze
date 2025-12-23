import React, { useState } from 'react';
import { FiX, FiSave } from 'react-icons/fi';

export default function RenameModal({ document, onClose, onSave }) {
  const [newName, setNewName] = useState(document.name);

  const handleSave = () => {
    if (newName.trim() && newName !== document.name) {
      onSave(document.id, newName.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl max-w-md w-full">
        {/* Header */}
        <div className="border-b border-[#BFA76A]/20 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
            Renommer le Document
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#BFA76A]/10 rounded-lg transition-all"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Nom actuel
            </label>
            <p className="text-white font-medium">{document.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Nouveau nom
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50"
              placeholder="Entrez le nouveau nom..."
              autoFocus
            />
          </div>
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
            disabled={!newName.trim() || newName === document.name}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSave className="w-5 h-5" />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}