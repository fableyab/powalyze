import React from 'react';
import { FiSettings, FiDatabase, FiShield, FiMail, FiGlobe, FiUsers } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminParametresPage = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Paramètres Administrateur</h1>
        <p className="text-gray-400">Configuration globale de la plateforme</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FiSettings className="text-blue-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Configuration Générale</h2>
              <p className="text-sm text-gray-400">Paramètres de la plateforme</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Nom de l'organisation</label>
              <input type="text" defaultValue="Powalyze PMO" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-red-500/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">URL de la plateforme</label>
              <input type="text" defaultValue="https://powalyze.com" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-red-500/50 focus:outline-none" />
            </div>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all">
              Enregistrer
            </button>
          </div>
        </Card>

        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FiDatabase className="text-green-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Base de Données</h2>
              <p className="text-sm text-gray-400">Gestion et sauvegarde</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Dernier backup</span>
              <span className="text-white font-semibold">2025-12-23 02:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Taille DB</span>
              <span className="text-white font-semibold">12.4 GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Nombre de tables</span>
              <span className="text-white font-semibold">47</span>
            </div>
            <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg transition-all">
              Créer Backup Manuel
            </button>
          </div>
        </Card>

        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
              <FiShield className="text-red-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sécurité & Permissions</h2>
              <p className="text-sm text-gray-400">Contrôle d'accès</p>
            </div>
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-white/10 bg-[#0A0A0A] text-red-500 focus:ring-red-500/50" />
              <span className="text-white">Authentification 2FA obligatoire</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-white/10 bg-[#0A0A0A] text-red-500 focus:ring-red-500/50" />
              <span className="text-white">Audit logs activés</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-[#0A0A0A] text-red-500 focus:ring-red-500/50" />
              <span className="text-white">Accès API externe autorisé</span>
            </label>
          </div>
        </Card>

        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FiMail className="text-purple-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Notifications</h2>
              <p className="text-sm text-gray-400">Configuration emails</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Serveur SMTP</label>
              <input type="text" defaultValue="smtp.powalyze.com" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-red-500/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email expéditeur</label>
              <input type="email" defaultValue="noreply@powalyze.com" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-red-500/50 focus:outline-none" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <FiUsers className="text-yellow-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Gestion Utilisateurs</h2>
              <p className="text-sm text-gray-400">Limites et quotas</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Limite utilisateurs</label>
              <input type="number" defaultValue="100" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-red-500/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Utilisateurs actuels</label>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">87 / 100</Badge>
                <span className="text-sm text-gray-400">13 disponibles</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <FiGlobe className="text-orange-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Région & Localisation</h2>
              <p className="text-sm text-gray-400">Paramètres régionaux</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Langue par défaut</label>
              <select className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-red-500/50 focus:outline-none">
                <option>Français</option>
                <option>English</option>
                <option>Deutsch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Fuseau horaire</label>
              <select className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-red-500/50 focus:outline-none">
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

export default AdminParametresPage;