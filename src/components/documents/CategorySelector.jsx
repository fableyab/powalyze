import React from 'react';
import { CATEGORIES } from '@/contexts/DocumentsContext';

export default function CategorySelector({ selected, onSelect }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Catégorie</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CATEGORIES.map((category) => {
          const isSelected = selected === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-[#BFA76A] bg-gradient-to-br from-[#BFA76A]/20 to-[#D4AF37]/10 shadow-lg shadow-[#BFA76A]/20'
                  : 'border-[#BFA76A]/20 bg-[#0A0A0A] hover:border-[#BFA76A]/50 hover:bg-[#BFA76A]/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <p className={`text-sm font-medium ${
                  isSelected ? 'text-[#BFA76A]' : 'text-gray-300'
                }`}>
                  {category.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}