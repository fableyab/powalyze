import React, { useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import { COMMON_TAGS } from '@/contexts/DocumentsContext';

export default function TagSelector({ tags = [], onTagsChange }) {
  const [customTag, setCustomTag] = useState('');

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
  };

  const removeTag = (tag) => {
    onTagsChange(tags.filter(t => t !== tag));
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !tags.includes(customTag.trim())) {
      onTagsChange([...tags, customTag.trim()]);
      setCustomTag('');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Tags (optionnel)</h3>
      
      {/* Selected Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-[#0A0A0A] rounded-xl border border-[#BFA76A]/20">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#BFA76A]/20 to-[#D4AF37]/10 border border-[#BFA76A]/30 rounded-full text-sm font-medium text-[#BFA76A]"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-red-400 transition-colors"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Common Tags */}
      <div className="flex flex-wrap gap-2">
        {COMMON_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => addTag(tag)}
            disabled={tags.includes(tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              tags.includes(tag)
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-[#0A0A0A] text-gray-300 border border-[#BFA76A]/20 hover:border-[#BFA76A]/50 hover:text-[#BFA76A]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Custom Tag Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTag()}
          placeholder="Ajouter un tag personnalisé..."
          className="flex-1 px-4 py-2 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50"
        />
        <button
          onClick={handleAddCustomTag}
          className="px-4 py-2 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-medium rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
        >
          <FiPlus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}