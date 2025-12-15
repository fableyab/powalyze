
import React from 'react';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-6 text-center bg-[#0A0A0A] border border-white/10 rounded-xl">
      <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
      <p className="text-gray-400 max-w-md mb-8">
        We apologize for the inconvenience. The application encountered an unexpected error.
      </p>

      {error && process.env.NODE_ENV === 'development' && (
        <pre className="bg-black/50 p-4 rounded text-left text-xs text-red-300 mb-8 max-w-full overflow-auto">
          {error.message}
        </pre>
      )}

      <div className="flex gap-4">
        <Button 
          onClick={resetErrorBoundary} 
          variant="outline"
          className="border-white/10 hover:bg-white/5"
        >
          <RefreshCcw size={16} className="mr-2" /> Try Again
        </Button>
        <Button 
          onClick={() => window.location.href = '/'}
          className="bg-[#BFA76A] text-black hover:bg-white"
        >
          <Home size={16} className="mr-2" /> Go Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
