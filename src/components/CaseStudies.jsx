
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Shield, Cloud, TrendingUp } from 'lucide-react';

const CaseStudies = ({ language }) => {
  const translations = {
    fr: {
      title: 'Cas Clients',
      subtitle: 'Des résultats mesurables, des transformations concrètes',
      cases: [
        {
          icon: Building2,
          title: 'Fusion bancaire : pilotage de 120M€ d\'investissements IT',
          situation: 'Contexte',
          situationText: 'Deux grandes banques suisses fusionnent. Incertitude totale sur les coûts IT, les priorités projet, et les synergies réelles.',
          problem: 'Problématique',
          problemText: 'Absence de visibilité sur le pipeline projets (250+ initiatives), risque de dépassement budgétaire massif, conflits de priorisation entre métiers.',
          solution: 'Solution Powalyze',
          solutionText: 'Mise en place d\'un PMO stratégique avec tableaux de bord Power BI temps réel, méthodologie de scoring et priorisation basée sur la valeur business, automatisation des reportings.',
          results: 'Résultats mesurés',
          resultsText: '22% de réduction des coûts IT sur 18 mois. Délai de décision divisé par 3. 95% de satisfaction des sponsors projets.'
        },
        {
          icon: Shield,
          title: 'Assurance : transparence totale sur le Waterfall financier',
          situation: 'Contexte',
          situationText: 'Compagnie d\'assurance suisse avec +2000 collaborateurs. Aucune visibilité sur la cascade des coûts IT (du budget global aux projets individuels).',
          problem: 'Problématique',
          problemText: 'Reporting manuel fastidieux, données dispersées sur 12 systèmes différents, impossibilité d\'arbitrer rapidement sur les budgets.',
          solution: 'Solution Powalyze',
          solutionText: 'Construction d\'un modèle de Waterfall financier complet dans Power BI, connexion automatisée à toutes les sources de données, drill-down du budget CFO jusqu\'au ticket Jira.',
          results: 'Résultats mesurés',
          resultsText: 'Temps de consolidation budgétaire divisé par 10 (de 2 semaines à 2 heures). Visibilité temps réel pour le COMEX. Réallocation proactive de 8M€ vers les projets prioritaires.'
        },
        {
          icon: Cloud,
          title: 'Industriel : maîtrise des dépenses Cloud (AWS/Azure)',
          situation: 'Contexte',
          situationText: 'Groupe industriel international avec une croissance explosive des coûts Cloud (+180% en 2 ans) sans visibilité ni contrôle.',
          problem: 'Problématique',
          problemText: 'Factures Cloud illisibles, absence de tagging cohérent, impossibilité d\'allouer les coûts par BU ou projet, spirale d\'augmentation incontrôlée.',
          solution: 'Solution Powalyze',
          solutionText: 'Déploiement d\'une gouvernance Cloud avec Power BI FinOps, mise en place de règles d\'automatisation (shutdown instances inutilisées, rightsizing), alertes prédictives.',
          results: 'Résultats mesurés',
          resultsText: '34% de réduction des dépenses Cloud en 6 mois. Transparence totale par projet/BU. ROI de 8x sur la première année.'
        }
      ]
    },
    en: {
      title: 'Case Studies',
      subtitle: 'Measurable results, concrete transformations',
      cases: [
        {
          icon: Building2,
          title: 'Banking merger: steering 120M€ IT investments',
          situation: 'Context',
          situationText: 'Two major Swiss banks merge. Total uncertainty on IT costs, project priorities, and real synergies.',
          problem: 'Challenge',
          problemText: 'Lack of visibility on project pipeline (250+ initiatives), risk of massive budget overrun, prioritization conflicts between business units.',
          solution: 'Powalyze Solution',
          solutionText: 'Implementation of strategic PMO with real-time Power BI dashboards, scoring and prioritization methodology based on business value, reporting automation.',
          results: 'Measured Results',
          resultsText: '22% reduction in IT costs over 18 months. Decision time divided by 3. 95% satisfaction from project sponsors.'
        },
        {
          icon: Shield,
          title: 'Insurance: total transparency on financial Waterfall',
          situation: 'Context',
          situationText: 'Swiss insurance company with +2000 employees. No visibility on IT cost cascade (from global budget to individual projects).',
          problem: 'Challenge',
          problemText: 'Tedious manual reporting, data scattered across 12 different systems, inability to quickly arbitrate on budgets.',
          solution: 'Powalyze Solution',
          solutionText: 'Construction of complete financial Waterfall model in Power BI, automated connection to all data sources, drill-down from CFO budget to Jira ticket.',
          results: 'Measured Results',
          resultsText: 'Budget consolidation time divided by 10 (from 2 weeks to 2 hours). Real-time visibility for executive committee. Proactive reallocation of 8M€ to priority projects.'
        },
        {
          icon: Cloud,
          title: 'Industrial: Cloud spending control (AWS/Azure)',
          situation: 'Context',
          situationText: 'International industrial group with explosive Cloud cost growth (+180% in 2 years) without visibility or control.',
          problem: 'Challenge',
          problemText: 'Unreadable Cloud bills, lack of consistent tagging, inability to allocate costs by BU or project, uncontrolled escalation spiral.',
          solution: 'Powalyze Solution',
          solutionText: 'Deployment of Cloud governance with Power BI FinOps, implementation of automation rules (shutdown unused instances, rightsizing), predictive alerts.',
          results: 'Measured Results',
          resultsText: '34% reduction in Cloud spending in 6 months. Total transparency by project/BU. 8x ROI in the first year.'
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section className='py-24 px-4 bg-slate-900'>
      <div className='container mx-auto max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>{t.title}</h2>
          <p className='text-xl text-slate-300'>{t.subtitle}</p>
        </motion.div>

        <div className='space-y-12'>
          {t.cases.map((caseStudy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden hover:border-amber-500/50 transition-all duration-300'
            >
              <div className='p-8 md:p-12'>
                <div className='flex items-center gap-4 mb-8'>
                  <div className='w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center'>
                    <caseStudy.icon className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-2xl md:text-3xl font-bold text-white flex-1'>{caseStudy.title}</h3>
                </div>

                <div className='grid md:grid-cols-2 gap-8'>
                  <div className='space-y-6'>
                    <div>
                      <h4 className='text-amber-500 font-semibold mb-2 uppercase tracking-wide text-sm'>
                        {caseStudy.situation}
                      </h4>
                      <p className='text-slate-300 leading-relaxed'>{caseStudy.situationText}</p>
                    </div>
                    <div>
                      <h4 className='text-amber-500 font-semibold mb-2 uppercase tracking-wide text-sm'>
                        {caseStudy.problem}
                      </h4>
                      <p className='text-slate-300 leading-relaxed'>{caseStudy.problemText}</p>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    <div>
                      <h4 className='text-amber-500 font-semibold mb-2 uppercase tracking-wide text-sm'>
                        {caseStudy.solution}
                      </h4>
                      <p className='text-slate-300 leading-relaxed'>{caseStudy.solutionText}</p>
                    </div>
                    <div className='bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-xl p-6'>
                      <h4 className='text-amber-500 font-semibold mb-2 uppercase tracking-wide text-sm flex items-center gap-2'>
                        <TrendingUp className='w-4 h-4' />
                        {caseStudy.results}
                      </h4>
                      <p className='text-white font-medium leading-relaxed'>{caseStudy.resultsText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
