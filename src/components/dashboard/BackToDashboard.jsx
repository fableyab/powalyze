import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const BackToDashboard = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/dashboard')}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-[#111] border border-white/10 rounded-lg text-white hover:bg-[#1A1A1A] hover:border-[#BFA76A]/50 transition-all ${className}`}
    >
      <FiArrowLeft className="w-4 h-4" />
      <span className="font-medium">Retour au Dashboard</span>
    </button>
  );
};

export default BackToDashboard;
