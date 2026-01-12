import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

/**
 * Composant EmptyState réutilisable pour afficher un état vide cohérent
 * à travers toute l'application.
 * 
 * @param {React.Component} icon - Composant d'icône Lucide React
 * @param {string} title - Titre principal de l'état vide
 * @param {string} description - Description contextuelle
 * @param {string} actionLabel - Texte du bouton d'action (optionnel)
 * @param {string} actionRoute - Route de navigation pour le bouton (optionnel)
 * @param {Function} onAction - Callback personnalisée pour le bouton (optionnel)
 */
export default function EmptyState({ 
  icon: Icon,
  title,
  description,
  actionLabel,
  actionRoute,
  onAction
}) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (actionRoute) {
      navigate(actionRoute);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-6 py-12">
      {Icon && (
        <div className="mb-6">
          <Icon className="w-20 h-20 text-white/10" strokeWidth={1} />
        </div>
      )}
      
      <h3 className="text-2xl font-light text-white mb-3 text-center">
        {title}
      </h3>
      
      <p className="text-slate-400 text-center max-w-md mb-8 font-light leading-relaxed">
        {description}
      </p>

      {(actionLabel && (actionRoute || onAction)) && (
        <Button
          onClick={handleAction}
          className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] hover:from-[#B8941F] hover:to-[#3A8EEF] text-white font-light px-6 py-2 transition-all duration-200"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
