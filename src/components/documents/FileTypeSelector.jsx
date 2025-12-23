import React from 'react';
import { FILE_TYPES } from '@/contexts/DocumentsContext';

export default function FileTypeSelector({ selected, onSelect }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Type de Document</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {FILE_TYPES.map((type) => {
          const isSelected = selected === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-[#BFA76A] bg-gradient-to-br from-[#BFA76A]/20 to-[#D4AF37]/10 shadow-lg shadow-[#BFA76A]/20'
                  : 'border-[#BFA76A]/20 bg-[#0A0A0A] hover:border-[#BFA76A]/50 hover:bg-[#BFA76A]/5'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{type.icon}</div>
                <p className={`text-sm font-medium ${
                  isSelected ? 'text-[#BFA76A]' : 'text-gray-300'
                }`}>
                  {type.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}