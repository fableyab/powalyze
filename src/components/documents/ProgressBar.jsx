import React from 'react';

export default function ProgressBar({ progress = 0, fileName = '' }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300 font-medium truncate flex-1 mr-4">
          {fileName}
        </span>
        <span className="text-sm text-[#BFA76A] font-bold">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden border border-[#BFA76A]/20">
        <div
          className="h-full bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}