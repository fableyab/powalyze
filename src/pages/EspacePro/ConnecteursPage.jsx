import React from 'react';
import { FiZap, FiCheck, FiClock, FiAlertCircle, FiSettings } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ConnecteursPage = () => {
  const connectors = [
    { id: 1, name: 'Azure DevOps', icon: '☁️', category: 'DevOps', status: 'active', description: 'Synchronisation work items, sprints et pipelines' },
    { id: 2, name: 'Jira', icon: '🔷', category: 'Project Management', status: 'active', description: 'Import tickets, sprints et boards Agile' },
    { id: 3, name: 'GitHub', icon: '🐙', category: 'DevOps', status: 'active', description: 'Suivi commits, PR et issues' },
    { id: 4, name: 'Slack', icon: '💬', category: 'Communication', status: 'active', description: 'Notifications temps réel sur canaux' },
    { id: 5, name: 'Microsoft Teams', icon: '🟪', category: 'Communication', status: 'active', description: 'Intégration meetings et chats' },
    { id: 6, name: 'Power BI', icon: '📊', category: 'Analytics', status: 'active', description: 'Export données vers dashboards' },
    { id: 7, name: 'AWS', icon: '🟠', category: 'Cloud', status: 'beta', description: 'Monitoring ressources cloud' },
    { id: 8, name: 'Salesforce', icon: '☁️', category: 'CRM', status: 'beta', description: 'Sync opportunités et comptes' },
    { id: 9, name: 'Monday.com', icon: '🟢', category: 'Project Management', status: 'coming-soon', description: 'Import boards et workflows' },
    { id: 10, name: 'Asana', icon: '🔴', category: 'Project Management', status: 'coming-soon', description: 'Sync tâches et projets' },
    { id: 11, name: 'Notion', icon: '📝', category: 'Documentation', status: 'coming-soon', description: 'Import pages et bases de données' },
    { id: 12, name: 'Zapier', icon: '⚡', category: 'Automation', status: 'coming-soon', description: 'Automatisation workflows' },
  ];

  const categories = ['Tous', 'DevOps', 'Project Management', 'Communication', 'Analytics', 'Cloud'];
  const [selectedCategory, setSelectedCategory] = React.useState('Tous');

  const filteredConnectors = selectedCategory === 'Tous' 
    ? connectors 
    : connectors.filter(c => c.category === selectedCategory);

  const stats = {
    total: connectors.length,
    active: connectors.filter(c => c.status === 'active').length,
    beta: connectors.filter(c => c.status === 'beta').length,
    comingSoon: connectors.filter(c => c.status === 'coming-soon').length,
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Connecteurs</h1>
        <p className="text-gray-400">Intégrations avec vos outils préférés</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FiZap className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Connecteurs</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FiCheck className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{stats.active}</p>
              <p className="text-sm text-gray-400">Actifs</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <FiClock className="text-yellow-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{stats.beta}</p>
              <p className="text-sm text-gray-400">Bêta</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gray-500/20 flex items-center justify-center">
              <FiAlertCircle className="text-gray-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{stats.comingSoon}</p>
              <p className="text-sm text-gray-400">Bientôt</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnectors.map(connector => (
          <Card key={connector.id} className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/50 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl">{connector.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">{connector.name}</h3>
                <Badge className={connector.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/50' : connector.status === 'beta' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' : 'bg-gray-500/20 text-gray-400 border-gray-500/50'}>
                  {connector.status === 'active' ? 'Actif' : connector.status === 'beta' ? 'Bêta' : 'Bientôt'}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">{connector.description}</p>
            <button className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              connector.status === 'active' ? 'bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black' : 
              connector.status === 'beta' ? 'bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
              'bg-white/5 text-gray-400 border border-white/10 cursor-not-allowed'
            }`} disabled={connector.status === 'coming-soon'}>
              <FiSettings size={14} />
              {connector.status === 'active' ? 'Configurer' : connector.status === 'beta' ? 'Essayer' : 'Bientôt'}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConnecteursPage;