import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorView({ 
  error, 
  onRetry,
  message = null 
}) {
  const navigate = useNavigate();

  // Si message custom fourni
  const displayMessage = message || {
    title: "Une erreur est survenue",
    description: "Veuillez réessayer ou contacter le support si le problème persiste.",
    action: "Réessayer"
  };

  const handleAction = () => {
    if (onRetry) {
      onRetry();
    } else if (displayMessage.actionRoute) {
      navigate(displayMessage.actionRoute);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md px-6">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        
        <h3 className="text-xl font-semibold text-white mb-2">
          {displayMessage.title}
        </h3>
        
        <p className="text-slate-400 mb-6">
          {displayMessage.description}
        </p>

        {(onRetry || displayMessage.actionRoute) && (
          <Button
            onClick={handleAction}
            className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]"
          >
            {displayMessage.action}
          </Button>
        )}
      </div>
    </div>
  );
}
