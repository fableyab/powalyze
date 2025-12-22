import React, { useState } from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { INTEGRATIONS } from '@/lib/constants';
import { FiSearch, FiCheck, FiClock, FiAlertCircle } from 'react-icons/fi';

const IntegrationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(INTEGRATIONS.map(i => i.category))];

  const filteredIntegrations = INTEGRATIONS.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) || integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status) => {
    if (status === 'active') return <FiCheck className="text-green-500" />;
    if (status === 'beta') return <FiClock className="text-yellow-500" />;
    return <FiAlertCircle className="text-gray-500" />;
  };

  const getStatusLabel = (status) => {
    if (status === 'active') return 'Actif';
    if (status === 'beta') return 'Bêta';
    return 'Bientôt';
  };

  return (
    <div className="p-8 bg-neutral-975 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Connecteurs & Intégrations</h1>
        <p className="text-gray-400">Connectez Powalyze à vos outils préférés</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Rechercher un connecteur..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <Button key={cat} variant={selectedCategory === cat ? 'primary' : 'outline'} onClick={() => setSelectedCategory(cat)}>
              {cat === 'all' ? 'Tous' : cat}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map(integration => (
          <Card key={integration.id} className="bg-neutral-950 border-white/10 p-6 hover:border-brand-gold-500/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{integration.icon}</div>
              <div className="flex items-center gap-2">
                {getStatusIcon(integration.status)}
                <Badge variant={integration.status === 'active' ? 'success' : integration.status === 'beta' ? 'warning' : 'secondary'}>
                  {getStatusLabel(integration.status)}
                </Badge>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{integration.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{integration.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline">{integration.category}</Badge>
              <Button size="sm" variant={integration.status === 'active' ? 'primary' : 'outline'} disabled={integration.status === 'coming-soon'}>
                {integration.status === 'active' ? 'Configurer' : integration.status === 'beta' ? 'Essayer' : 'Bientôt'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {filteredIntegrations.length === 0 && (
        <Card className="bg-neutral-950 border-white/10 p-12 text-center">
          <p className="text-gray-400 text-lg">Aucun connecteur trouvé</p>
        </Card>
      )}
    </div>
  );
};

export default IntegrationsPage;
