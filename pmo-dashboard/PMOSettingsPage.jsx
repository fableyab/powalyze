import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Settings, Bell, User, Shield, Palette, Database,
  Mail, Globe, Clock, Save, CheckCircle2, ChevronRight,
  Key, Smartphone, Monitor, Moon, Sun, Zap, Upload, Download,
  Users, Building, CreditCard, FileText, HelpCircle, LogOut
} from 'lucide-react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskReminders: true,
    projectUpdates: true,
    weeklyDigest: false,
    mentions: true
  });
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('fr');
  const [timezone, setTimezone] = useState('Europe/Zurich');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const menuItems = [
    { id: 'profile', label: 'Mon Profil', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'integrations', label: 'Intégrations', icon: Database },
    { id: 'team', label: 'Équipe', icon: Users },
    { id: 'billing', label: 'Facturation', icon: CreditCard },
    { id: 'help', label: 'Aide & Support', icon: HelpCircle },
  ];

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        checked ? 'bg-[#BFA76A]' : 'bg-gray-700'
      }`}
    >
      <motion.div
        animate={{ x: checked ? 24 : 4 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/pmo-workspace" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <ArrowLeft size={20} />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BFA76A] to-[#D4AF37] flex items-center justify-center font-black text-black">
                  <Settings size={20} />
                </div>
                <div>
                  <div className="font-bold text-white">Paramètres</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Configuration</div>
                </div>
              </div>
            </div>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black text-sm font-bold hover:opacity-90"
            >
              {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
              {saved ? 'Sauvegardé !' : 'Sauvegarder'}
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="col-span-1">
              <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeSection === item.id 
                        ? 'bg-[#BFA76A]/10 text-[#BFA76A] border-l-2 border-[#BFA76A]' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
                <div className="border-t border-white/10 mt-2 pt-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-400 hover:bg-red-500/10 transition-colors">
                    <LogOut size={18} />
                    <span className="text-sm">Déconnexion</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="col-span-3 space-y-6">
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-[#111] rounded-xl p-6 border border-white/10">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <User size={20} className="text-[#BFA76A]" />
                      Informations personnelles
                    </h2>
                    
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#BFA76A] to-[#8B7355] flex items-center justify-center text-3xl font-bold text-black">
                        FF
                      </div>
                      <div className="flex-1">
                        <button className="px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors">
                          <Upload size={14} className="inline mr-2" />
                          Changer la photo
                        </button>
                        <p className="text-xs text-gray-500 mt-2">JPG, PNG ou GIF. 1MB max.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Prénom</label>
                        <input
                          type="text"
                          defaultValue="Fabrice"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Nom</label>
                        <input
                          type="text"
                          defaultValue="Fays"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="fabrice.fays@powalyze.com"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Téléphone</label>
                        <input
                          type="tel"
                          defaultValue="+41 79 123 45 67"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-gray-500 mb-2">Rôle</label>
                        <input
                          type="text"
                          defaultValue="PMO Senior & Data Analyst"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#111] rounded-xl p-6 border border-white/10">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Globe size={20} className="text-[#BFA76A]" />
                      Préférences régionales
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Langue</label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none"
                        >
                          <option value="fr">Français</option>
                          <option value="en">English</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Fuseau horaire</label>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none"
                        >
                          <option value="Europe/Zurich">Europe/Zurich (GMT+1)</option>
                          <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                          <option value="Europe/London">Europe/London (GMT)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#111] rounded-xl p-6 border border-white/10"
                >
                  <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Bell size={20} className="text-[#BFA76A]" />
                    Notifications
                  </h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'email', label: 'Notifications par email', desc: 'Recevoir les notifications importantes par email' },
                      { key: 'push', label: 'Notifications push', desc: 'Notifications en temps réel sur votre appareil' },
                      { key: 'taskReminders', label: 'Rappels de tâches', desc: 'Rappels pour les tâches à venir' },
                      { key: 'projectUpdates', label: 'Mises à jour projets', desc: 'Notifications lors de changements sur vos projets' },
                      { key: 'mentions', label: 'Mentions', desc: 'Quand quelqu\'un vous mentionne' },
                      { key: 'weeklyDigest', label: 'Digest hebdomadaire', desc: 'Résumé de la semaine chaque lundi' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                        <Toggle 
                          checked={notifications[item.key]} 
                          onChange={(val) => setNotifications({...notifications, [item.key]: val})}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Appearance Section */}
              {activeSection === 'appearance' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#111] rounded-xl p-6 border border-white/10"
                >
                  <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Palette size={20} className="text-[#BFA76A]" />
                    Apparence
                  </h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-4">Thème</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'dark', label: 'Sombre', icon: Moon },
                        { id: 'light', label: 'Clair', icon: Sun },
                        { id: 'system', label: 'Système', icon: Monitor },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t.id)}
                          className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all ${
                            theme === t.id 
                              ? 'bg-[#BFA76A]/10 border-[#BFA76A]' 
                              : 'bg-white/5 border-white/10 hover:border-white/30'
                          }`}
                        >
                          <t.icon size={24} className={theme === t.id ? 'text-[#BFA76A]' : 'text-gray-400'} />
                          <span className="text-sm">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-4">Couleur d'accent</label>
                    <div className="flex gap-3">
                      {['#BFA76A', '#3b82f6', '#8b5cf6', '#22c55e', '#ef4444', '#ec4899'].map((color) => (
                        <button
                          key={color}
                          className="w-10 h-10 rounded-full border-2 border-white/20 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Section */}
              {activeSection === 'security' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-[#111] rounded-xl p-6 border border-white/10">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Key size={20} className="text-[#BFA76A]" />
                      Mot de passe
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Mot de passe actuel</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Nouveau mot de passe</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Confirmer le nouveau mot de passe</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#111] rounded-xl p-6 border border-white/10">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Smartphone size={20} className="text-[#BFA76A]" />
                      Authentification à deux facteurs
                    </h2>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <div className="font-medium">2FA activée</div>
                        <div className="text-xs text-gray-500">Via application d'authentification</div>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm">Actif</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Integrations Section */}
              {activeSection === 'integrations' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#111] rounded-xl p-6 border border-white/10"
                >
                  <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Database size={20} className="text-[#BFA76A]" />
                    Intégrations
                  </h2>
                  <div className="space-y-4">
                    {[
                      { name: 'Microsoft Teams', status: 'connected', icon: '📱' },
                      { name: 'Slack', status: 'disconnected', icon: '💬' },
                      { name: 'Power BI', status: 'connected', icon: '📊' },
                      { name: 'Azure DevOps', status: 'connected', icon: '🔧' },
                      { name: 'Jira', status: 'disconnected', icon: '🎯' },
                      { name: 'Google Calendar', status: 'connected', icon: '📅' },
                    ].map((integration) => (
                      <div key={integration.name} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{integration.icon}</span>
                          <div>
                            <div className="font-medium">{integration.name}</div>
                            <div className="text-xs text-gray-500">
                              {integration.status === 'connected' ? 'Connecté' : 'Non connecté'}
                            </div>
                          </div>
                        </div>
                        <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          integration.status === 'connected'
                            ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                            : 'bg-[#BFA76A] text-black hover:opacity-90'
                        }`}>
                          {integration.status === 'connected' ? 'Configurer' : 'Connecter'}
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Default for other sections */}
              {['team', 'billing', 'help'].includes(activeSection) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#111] rounded-xl p-12 border border-white/10 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#BFA76A]/20 flex items-center justify-center mx-auto mb-4">
                    {activeSection === 'team' && <Users size={32} className="text-[#BFA76A]" />}
                    {activeSection === 'billing' && <CreditCard size={32} className="text-[#BFA76A]" />}
                    {activeSection === 'help' && <HelpCircle size={32} className="text-[#BFA76A]" />}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {activeSection === 'team' && 'Gestion d\'équipe'}
                    {activeSection === 'billing' && 'Facturation'}
                    {activeSection === 'help' && 'Aide & Support'}
                  </h3>
                  <p className="text-gray-500 mb-6">Cette section est en cours de développement.</p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#BFA76A]/20 text-[#BFA76A] rounded-full text-sm">
                    <Zap size={14} />
                    Mode Démo
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Demo Badge */}
      <div className="fixed bottom-6 right-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] rounded-full text-black text-sm font-bold shadow-lg">
          <Zap size={16} />
          Mode Démo Live
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
