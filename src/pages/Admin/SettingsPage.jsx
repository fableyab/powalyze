import React, { useState } from 'react';
import { FiSave, FiServer, FiMail, FiShield, FiGlobe, FiDatabase, FiBell } from 'react-icons/fi';

function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Powalyze',
    siteUrl: 'https://powalyze.com',
    adminEmail: 'admin@powalyze.com',
    smtpHost: 'smtp.powalyze.com',
    smtpPort: '587',
    databaseHost: 'db.powalyze.com',
    maxUsers: '10000',
    maxStorage: '1TB',
    enableRegistration: true,
    enable2FA: true,
    enableEmailNotifications: true,
    maintenanceMode: false,
  });

  const handleSave = () => {
    alert('Paramètres sauvegardés avec succès!');
  };

  const sections = [
    {
      title: 'Configuration Générale',
      icon: FiGlobe,
      fields: [
        { label: 'Nom du site', name: 'siteName', type: 'text' },
        { label: 'URL du site', name: 'siteUrl', type: 'text' },
        { label: 'Email administrateur', name: 'adminEmail', type: 'email' },
      ],
    },
    {
      title: 'Serveur SMTP',
      icon: FiMail,
      fields: [
        { label: 'Hôte SMTP', name: 'smtpHost', type: 'text' },
        { label: 'Port SMTP', name: 'smtpPort', type: 'text' },
      ],
    },
    {
      title: 'Base de Données',
      icon: FiDatabase,
      fields: [
        { label: 'Hôte Database', name: 'databaseHost', type: 'text' },
      ],
    },
    {
      title: 'Limites Système',
      icon: FiServer,
      fields: [
        { label: 'Utilisateurs max', name: 'maxUsers', type: 'text' },
        { label: 'Stockage max', name: 'maxStorage', type: 'text' },
      ],
    },
  ];

  const toggles = [
    { label: 'Autoriser les inscriptions', name: 'enableRegistration', icon: FiShield },
    { label: 'Authentification 2FA', name: 'enable2FA', icon: FiShield },
    { label: 'Notifications email', name: 'enableEmailNotifications', icon: FiBell },
    { label: 'Mode maintenance', name: 'maintenanceMode', icon: FiServer },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
            Paramètres Globaux
          </h1>
          <p className="text-gray-400 mt-2">Configuration de la plateforme Powalyze</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
        >
          <FiSave className="w-5 h-5" />
          Sauvegarder
        </button>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#BFA76A]/20 to-[#D4AF37]/10 border border-[#BFA76A]/30">
                <section.icon className="w-6 h-6 text-[#BFA76A]" />
              </div>
              <h2 className="text-xl font-bold text-white">{section.title}</h2>
            </div>
            <div className="space-y-4">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={settings[field.name]}
                    onChange={(e) => setSettings({ ...settings, [field.name]: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Toggle Settings */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Options Système</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toggles.map((toggle, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg border border-[#BFA76A]/10"
            >
              <div className="flex items-center gap-3">
                <toggle.icon className="w-5 h-5 text-[#BFA76A]" />
                <span className="text-white font-medium">{toggle.label}</span>
              </div>
              <button
                onClick={() => setSettings({ ...settings, [toggle.name]: !settings[toggle.name] })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings[toggle.name] ? 'bg-[#BFA76A]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings[toggle.name] ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;