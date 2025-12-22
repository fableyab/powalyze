import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { User, Bell, Shield, Globe, Palette, Database, Save } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    name: 'Fabrice Dumont',
    email: 'fabrice.dumont@powalyze.ch',
    role: 'PMO Manager',
    notifications: {
      email: true,
      push: true,
      weekly: true
    },
    theme: 'light',
    language: 'fr-CH',
    timezone: 'Europe/Zurich'
  });

  const handleSave = () => {
    alert('Paramètres sauvegardés avec succès !');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Paramètres"
        subtitle="Gérez vos préférences et configurations"
        action={
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <Save className="w-5 h-5" />
            Sauvegarder
          </button>
        }
      />

      {/* Profile Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <User className="w-5 h-5" />
          Profil
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({...settings, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({...settings, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rôle</label>
            <input
              type="text"
              value={settings.role}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Notifications par email</p>
              <p className="text-sm text-gray-600">Recevoir les alertes par email</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) => setSettings({
                ...settings, 
                notifications: {...settings.notifications, email: e.target.checked}
              })}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Notifications push</p>
              <p className="text-sm text-gray-600">Recevoir les alertes en temps réel</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.push}
              onChange={(e) => setSettings({
                ...settings, 
                notifications: {...settings.notifications, push: e.target.checked}
              })}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Rapport hebdomadaire</p>
              <p className="text-sm text-gray-600">Recevoir un résumé chaque lundi</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.weekly}
              onChange={(e) => setSettings({
                ...settings, 
                notifications: {...settings.notifications, weekly: e.target.checked}
              })}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded"
            />
          </label>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Apparence
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Thème</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({...settings, theme: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
              <option value="auto">Automatique</option>
            </select>
          </div>
        </div>
      </div>

      {/* Regional */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Régional
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Langue</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fr-CH">Français (Suisse)</option>
              <option value="de-CH">Deutsch (Schweiz)</option>
              <option value="en-US">English (US)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fuseau horaire</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Europe/Zurich">Europe/Zurich (UTC+1)</option>
              <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Données & Confidentialité
        </h3>
        <div className="space-y-4">
          <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left font-semibold text-gray-700">
            Télécharger mes données
          </button>
          <button className="w-full px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-left font-semibold text-red-600">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
