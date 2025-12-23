import React from 'react';
import { FiZap, FiCheck, FiClock, FiAlertCircle, FiSettings, FiTrendingUp } from 'react-icons/fi';

const AdminConnecteursPage = () => {
  const connectors = [
    { id: 1, name: 'Azure DevOps', icon: '☁️', status: 'active', users: 45, lastSync: '2025-12-23 08:30', dataVolume: '2.3 GB' },
    { id: 2, name: 'Jira', icon: '🔷', status: 'active', users: 38, lastSync: '2025-12-23 09:15', dataVolume: '1.8 GB' },
    { id: 3, name: 'GitHub', icon: '🐙', status: 'active', users: 52, lastSync: '2025-12-23 10:00', dataVolume: '3.1 GB' },
    { id: 4, name: 'Slack', icon: '💬', status: 'active', users: 67, lastSync: '2025-12-23 07:45', dataVolume: '890 MB' },
    { id: 5, name: 'Microsoft Teams', icon: '🟪', status: 'active', users: 82, lastSync: '2025-12-23 08:00', dataVolume: '1.2 GB' },
    { id: 6, name: 'Power BI', icon: '📊', status: 'active', users: 29, lastSync: '2025-12-23 06:30', dataVolume: '4.5 GB' },
    { id: 7, name: 'AWS', icon: '🟠', status: 'beta', users: 12, lastSync: '2025-12-23 05:00', dataVolume: '560 MB' },
    { id: 8, name: 'Salesforce', icon: '☁️', status: 'beta', users: 8, lastSync: '2025-12-22 18:30', dataVolume: '320 MB' },
  ];

  const stats = {
    total: connectors.length,
    active: connectors.filter(c => c.status === 'active').length,
    totalUsers: connectors.reduce((sum, c) => sum + c.users, 0),
    dataVolume: '14.7 GB',
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Administration Connecteurs</h1>
        <p className="text-gray-400">Supervision et configuration des intégrations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#111] border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FiZap className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Connecteurs</p>
            </div>
          </div>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FiCheck className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{stats.active}</p>
              <p className="text-sm text-gray-400">Actifs</p>
            </div>
          </div>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FiTrendingUp className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
              <p className="text-sm text-gray-400">Utilisateurs</p>
            </div>
          </div>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <FiAlertCircle className="text-orange-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{stats.dataVolume}</p>
              <p className="text-sm text-gray-400">Données</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {connectors.map(connector => (
          <div key={connector.id} className="bg-[#111] border border-white/10 rounded-lg p-6 hover:border-red-500/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{connector.icon}</div>
                <div>
                  <h3 className="font-bold text-white mb-1">{connector.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    connector.status === 'active' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                  }`}>
                    {connector.status === 'active' ? 'Actif' : 'Bêta'}
                  </span>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg text-sm transition-all">
                <FiSettings size={14} />
                Config
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400 mb-1">Utilisateurs</p>
                <p className="font-semibold text-white">{connector.users}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Dernière sync</p>
                <p className="font-semibold text-white text-xs">{connector.lastSync}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Volume</p>
                <p className="font-semibold text-white">{connector.dataVolume}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminConnecteursPage;