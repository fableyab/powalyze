
import React from 'react';
import { Search, X } from 'lucide-react';

const FAQSearch = ({ value, onChange, placeholder = "Rechercher une question..." }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500 group-focus-within:text-[#BFA76A] transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-12 py-4 bg-[#111] border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A] focus:ring-1 focus:ring-[#BFA76A] transition-all shadow-lg"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FAQSearch;
