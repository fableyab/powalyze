import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, 
  Shield, 
  Activity, 
  Settings as SettingsIcon,
  UserPlus,
  TrendingUp,
  Database,
  AlertCircle,
  UsersIcon
} from 'lucide-react';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import CreateUserModal from '@/components/CreateUserModal';
import UserTable from '@/components/UserTable';
import InviteMember from '@/components/InviteMember';
import TeamTable from '@/components/TeamTable';

const Admin = () => {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [teamRefreshTrigger, setTeamRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'team'

  // Vérification des permissions (compatible avec/sans migration)
  const userRole = profile?.role_new || profile?.role || 'Lecture seule';
  const canManageUsers = hasPermission(userRole, PERMISSIONS.MANAGE_ROLES);

  if (!canManageUsers) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0F0F0F]">
        <div className="text-center space-y-4">
          <Shield className="w-16 h-16 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold text-white">Accès refusé</h1>
          <p className="text-slate-400">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  const handleUserCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleMemberInvited = () => {
    setTeamRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0F0F0F]">
      <div className="flex-1 p-6 space-y-8">
        {/* En-tête Premium */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Gestion des utilisateurs
              </h1>
              <p className="text-slate-400 text-lg">
                Administration des accès, rôles et permissions
              </p>
            </div>
            <Button
              onClick={() => setCreateUserModalOpen(true)}
              className="bg-[#4A9EFF] hover:bg-[#0052cc] text-white font-medium px-6 h-11 shadow-lg shadow-[#4A9EFF]/20"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Créer un utilisateur
            </Button>
          </div>

          {/* Statistiques clés */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-[#4A9EFF]/10 to-[#4A9EFF]/5 border-[#4A9EFF]/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">
                      Utilisateurs actifs
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {/* Dynamique via UserTable */}
                      --
                    </p>
                  </div>
                  <div className="bg-[#4A9EFF]/20 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-[#4A9EFF]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border-[#D4AF37]/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">
                      Admins
                    </p>
                    <p className="text-3xl font-bold text-white">--</p>
                  </div>
                  <div className="bg-[#D4AF37]/20 p-3 rounded-xl">
                    <Shield className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">
                      Connexions 24h
                    </p>
                    <p className="text-3xl font-bold text-white">--</p>
                  </div>
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">
                      Stockage utilisé
                    </p>
                    <p className="text-3xl font-bold text-white">--</p>
                  </div>
                  <div className="bg-purple-500/20 p-3 rounded-xl">
                    <Database className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section Tableau des utilisateurs */}
        <div className="space-y-4">
          {/* Onglets de navigation */}
          <div className="flex gap-2 border-b border-[#333333]">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                activeTab === 'users'
                  ? 'text-[#4A9EFF] border-b-2 border-[#4A9EFF]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              Utilisateurs
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                activeTab === 'team'
                  ? 'text-[#4A9EFF] border-b-2 border-[#4A9EFF]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UsersIcon className="w-5 h-5" />
              Équipe
            </button>
          </div>

          {/* Contenu selon l'onglet actif */}
          {activeTab === 'users' ? (
            <Card className="bg-[#1A1A1A] border-slate-800 overflow-hidden">
              <CardContent className="p-6">
                <UserTable refreshTrigger={refreshTrigger} />
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <InviteMember onMemberInvited={handleMemberInvited} />
              </div>
              <div className="lg:col-span-2">
                <TeamTable refreshTrigger={teamRefreshTrigger} />
              </div>
            </div>
          )}
        </div>

        {/* Section Permissions avancées */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-2xl font-bold text-white">
              Permissions avancées
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Règles de sécurité */}
            <Card className="bg-[#1A1A1A] border-slate-800">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Règles de sécurité
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <Shield className="w-4 h-4 text-red-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-400">Admin uniquement</p>
                      <p className="text-slate-400 text-xs mt-1">
                        Suppression de projets, dossiers, utilisateurs, rapports et intégrations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <Shield className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-400">Manager</p>
                      <p className="text-slate-400 text-xs mt-1">
                        Créer/modifier projets, gérer équipes, voir rapports
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <Shield className="w-4 h-4 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-400">Collaborateur</p>
                      <p className="text-slate-400 text-xs mt-1">
                        Modifier projets assignés, voir rapports
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-500/10 border border-slate-500/20 rounded-lg">
                    <Shield className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-400">Lecture seule</p>
                      <p className="text-slate-400 text-xs mt-1">
                        Consultation uniquement, aucune modification
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modules disponibles */}
            <Card className="bg-[#1A1A1A] border-slate-800">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <SettingsIcon className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-lg font-semibold text-white">
                    Modules disponibles
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'PMO', desc: 'Gestion de portefeuille de projets', icon: '📊' },
                    { name: 'Finance', desc: 'Analyse financière et budgets', icon: '💰' },
                    { name: 'Risques', desc: 'Gestion des risques projets', icon: '⚠️' },
                    { name: 'Rapports', desc: 'Tableaux de bord et exports', icon: '📈' },
                    { name: 'Power BI', desc: 'Rapports analytiques avancés', icon: '📊' },
                    { name: 'Salesforce', desc: 'Intégration CRM', icon: '☁️' }
                  ].map((module, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-3 bg-black/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{module.icon}</span>
                        <div>
                          <p className="font-medium text-white text-sm">{module.name}</p>
                          <p className="text-slate-400 text-xs">{module.desc}</p>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        Configurable par utilisateur
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section Audit & Sécurité */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-2xl font-bold text-white">
              Audit & Sécurité
            </h2>
          </div>

          <Card className="bg-[#1A1A1A] border-slate-800">
            <CardContent className="p-6">
              <div className="text-center text-slate-400 py-8">
                <Activity className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                <p className="text-lg font-medium mb-2">
                  Journal d'audit disponible prochainement
                </p>
                <p className="text-sm">
                  Suivez toutes les actions des utilisateurs : connexions, modifications, suppressions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />

      {/* Modal de création d'utilisateur */}
      <CreateUserModal
        isOpen={createUserModalOpen}
        onClose={() => setCreateUserModalOpen(false)}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};

export default Admin;
