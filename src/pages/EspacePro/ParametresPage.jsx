import React from 'react';
import { FiUser, FiBell, FiLock, FiGlobe, FiMail, FiSliders } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ParametresPage = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Paramètres</h1>
        <p className="text-gray-400">Configuration de votre espace de travail</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FiUser className="text-blue-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Profil</h2>
              <p className="text-sm text-gray-400">Informations personnelles</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Nom complet</label>
              <input type="text" defaultValue="Marie Dubois" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#BFA76A]/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input type="email" defaultValue="marie.dubois@powalyze.com" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#BFA76A]/50 focus:outline-none" />
            </div>
            <button className="w-full bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black px-4 py-2 rounded-lg font-medium transition-all">
              Enregistrer
            </button>
          </div>
        </Card>

        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FiBell className="text-green-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Notifications</h2>
              <p className="text-sm text-gray-400">Préférences de notification</p>
            </div>
          </div>
          <div className="space-y-4">
            {['Nouvelle tâche assignée', 'Événement à venir', 'Mise à jour projet', 'Rapport disponible'].map((notif, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-white/10 bg-[#0A0A0A] text-[#BFA76A] focus:ring-[#BFA76A]/50" />
                <span className="text-white">{notif}</span>
              </label>
            ))}
          </div>
        </Card>

        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
              <FiLock className="text-red-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sécurité</h2>
              <p className="text-sm text-gray-400">Mot de passe et authentification</p>
            </div>
          </div>
          <div className="space-y-4">
            <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg transition-all text-left">
              Changer le mot de passe
            </button>
            <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg transition-all text-left">
              Activer l'authentification 2FA
            </button>
          </div>
        </Card>

        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FiGlobe className="text-purple-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Langue & Région</h2>
              <p className="text-sm text-gray-400">Préférences régionales</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Langue</label>
              <select className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#BFA76A]/50 focus:outline-none">
                <option>Français</option>
                <option>English</option>
                <option>Deutsch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Fuseau horaire</label>
              <select className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#BFA76A]/50 focus:outline-none">
                <option>Europe/Paris (GMT+1)</option>
                <option>Europe/Zurich (GMT+1)</option>
                <option>America/New_York (GMT-5)</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParametresPage;