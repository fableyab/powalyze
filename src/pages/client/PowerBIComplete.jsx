import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import InsightCard from '../../components/powerbi/InsightCard';
import PowerBIEmbed from '../../components/powerbi/PowerBIEmbed';
import DashboardSelector from '../../components/powerbi/DashboardSelector';
import FAQPowerBI from '../../components/powerbi/FAQPowerBI';

const PowerBIComplete = () => {
  const [selectedDashboard, setSelectedDashboard] = useState('vue-globale');

  const dashboards = {
    'vue-globale': {
      title: 'Vue Globale',
      url: 'REPLACE_WITH_YOUR_POWER_BI_URL',
    },
    'finances': {
      title: 'Finances',
      url: 'REPLACE_WITH_YOUR_POWER_BI_URL',
    },
    'operations': {
      title: 'Opérations',
      url: 'REPLACE_WITH_YOUR_POWER_BI_URL',
    },
    'ressources': {
      title: 'Ressources Humaines',
      url: 'REPLACE_WITH_YOUR_POWER_BI_URL',
    },
  };

  const insights = [
    {
      icon: BarChart3,
      title: 'Croissance mensuelle',
      value: '+24,5%',
      description: 'vs mois précédent',
      trend: 'up',
    },
    {
      icon: TrendingUp,
      title: 'Chiffre d\'affaires',
      value: '1,2M€',
      description: 'Objectif atteint à 98%',
      trend: 'up',
    },
    {
      icon: Users,
      title: 'Nouveaux clients',
      value: '342',
      description: '+18% ce trimestre',
      trend: 'up',
    },
    {
      icon: DollarSign,
      title: 'Marge bénéficiaire',
      value: '32,8%',
      description: 'Au-dessus de la cible',
      trend: 'up',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-dark-800 to-dark-900 rounded-lg p-8 border border-dark-700 shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gold-primary/10 p-3 rounded-lg">
            <BarChart3 className="w-8 h-8 text-gold-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Power BI Analytics</h1>
            <p className="text-dark-300 mt-1">Visualisez vos données en temps réel</p>
          </div>
        </div>
        <p className="text-dark-400 max-w-3xl">
          Accédez à vos tableaux de bord interactifs Power BI pour suivre vos KPIs, analyser vos performances et prendre des décisions éclairées. Tous vos rapports sont synchronisés automatiquement et disponibles 24/7.
        </p>
      </div>

      {/* Dashboard Selector */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Sélectionnez votre dashboard</h2>
        <DashboardSelector
          selectedDashboard={selectedDashboard}
          onSelect={setSelectedDashboard}
        />
      </div>

      {/* Power BI Embed */}
      <div>
        <PowerBIEmbed
          url={dashboards[selectedDashboard].url}
          title={dashboards[selectedDashboard].title}
        />
      </div>

      {/* Insights Cards */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Indicateurs clés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight, index) => (
            <InsightCard key={index} {...insight} />
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Questions fréquentes</h2>
        <FAQPowerBI />
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gold-primary/10 to-gold-secondary/10 rounded-lg p-8 border border-gold-primary/30 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">
          Besoin d'aide pour configurer vos rapports ?
        </h3>
        <p className="text-dark-300 mb-6 max-w-2xl mx-auto">
          Notre équipe d'experts est à votre disposition pour vous accompagner dans la création et la configuration de vos dashboards Power BI personnalisés.
        </p>
        <button className="bg-gold-primary hover:bg-gold-secondary text-dark-900 font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl">
          Contacter le support
        </button>
      </div>
    </div>
  );
};

export default PowerBIComplete;
