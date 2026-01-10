import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDeviceType } from '@/lib/deviceDetection';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { X } from 'lucide-react';

/**
 * DeviceRedirect component
 * Affiche une bannière de suggestion (non-intrusive)
 * L'utilisateur peut choisir d'accepter ou ignorer
 */
export const DeviceRedirect = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showBanner, setShowBanner] = useState(false);
  const [suggestedPath, setSuggestedPath] = useState(null);

  useEffect(() => {
    // Only suggest for authenticated users on /app routes
    if (!user || !location.pathname.startsWith('/app')) {
      setShowBanner(false);
      return;
    }

    const deviceType = getDeviceType();
    
    // Suggérer mobile si viewport < 768px
    if (deviceType === 'mobile') {
      setSuggestedPath('/mobile/cockpit');
      setShowBanner(true);
    }
    // Suggérer tablet si viewport 768-1023px
    else if (deviceType === 'tablet') {
      setSuggestedPath('/tablet/cockpit');
      setShowBanner(true);
    }
  }, [location.pathname, user]);

  const handleAccept = () => {
    if (suggestedPath) {
      navigate(suggestedPath, { replace: true });
    }
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Sauvegarder le choix pour ne plus afficher
    localStorage.setItem('powalyze_dismiss_mobile_suggestion', 'true');
  };

  // Ne pas afficher si déjà dismissé
  if (localStorage.getItem('powalyze_dismiss_mobile_suggestion') === 'true') {
    return children;
  }

  return (
    <>
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#4A9EFF] text-white p-3 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium">
                📱 Version mobile optimisée disponible pour votre appareil
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAccept}
                className="px-4 py-1.5 bg-white text-[#4A9EFF] rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Essayer
              </button>
              <button
                onClick={handleDismiss}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default DeviceRedirect;
