import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const LoadingSpinner = ({ className, size = 24, text }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 
        className={cn("animate-spin text-[#BFA76A]", className)} 
        size={size} 
      />
      {text && <span className="mt-2 text-sm text-gray-500">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;