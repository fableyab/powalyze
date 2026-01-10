import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import MobileCard from '@/components/mobile/MobileCard';
import { User, Mail, Shield, Building, LogOut, ChevronRight } from 'lucide-react';

/**
 * Page Profil mobile
 */
const MobileProfile = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Mon profil</h2>
        <p className="text-sm text-slate-500 mt-1">Informations du compte</p>
      </div>

      {/* Informations utilisateur */}
      <MobileCard>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-[#4A9EFF] rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">
              {profile?.name || 'Utilisateur'}
            </h3>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-slate-400" />
            <div className="flex-1">
              <p className="text-xs text-slate-500">Email</p>
              <p className="text-sm font-medium text-slate-900">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-slate-400" />
            <div className="flex-1">
              <p className="text-xs text-slate-500">Rôle</p>
              <p className="text-sm font-medium text-slate-900">
                {profile?.role || 'viewer'}
              </p>
            </div>
          </div>

          {profile?.tenant_id && (
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-slate-400" />
              <div className="flex-1">
                <p className="text-xs text-slate-500">Organisation</p>
                <p className="text-sm font-medium text-slate-900 truncate">
                  {profile.tenant_id}
                </p>
              </div>
            </div>
          )}
        </div>
      </MobileCard>

      {/* Paramètres */}
      <MobileCard>
        <h3 className="font-semibold text-slate-900 mb-3">Paramètres</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-sm font-medium text-slate-700">Notifications</span>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-sm font-medium text-slate-700">Langue</span>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-sm font-medium text-slate-700">Confidentialité</span>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </MobileCard>

      {/* Version tablette */}
      <MobileCard>
        <h3 className="font-semibold text-slate-900 mb-3">Changer de version</h3>
        <div className="space-y-2">
          <button
            onClick={() => navigate('/tablet/cockpit')}
            className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium text-purple-700">
              Version Tablette
            </span>
            <ChevronRight className="w-5 h-5 text-purple-700" />
          </button>
          <button
            onClick={() => navigate('/app/cockpit')}
            className="w-full flex items-center justify-between p-3 bg-[#4A9EFF]/10 hover:bg-[#4A9EFF]/20 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium text-[#4A9EFF]">
              Version Desktop
            </span>
            <ChevronRight className="w-5 h-5 text-[#4A9EFF]" />
          </button>
        </div>
      </MobileCard>

      {/* Déconnexion */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Se déconnecter
      </button>

      {/* Footer info */}
      <div className="text-center text-xs text-slate-400 pt-4">
        <p>Powalyze Mobile v1.0.0</p>
        <p className="mt-1">© 2026 Powalyze. Precision & Excellence.</p>
      </div>
    </div>
  );
};

export default MobileProfile;
