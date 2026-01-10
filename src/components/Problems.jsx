
import React from 'react';
import { motion } from 'framer-motion';
import { Target, BarChart3, Cpu, Shield } from 'lucide-react';

const Problems = ({ language }) => {
  const translations = {
    fr: {
      title: 'Problématiques & Transformation',
      intro: 'Nous adressons les défis stratégiques et opérationnels qui freinent la croissance et la performance de votre organisation.',
      blocks: [
        {
          icon: Target,
          title: 'PMO Stratégique',
          paragraphs: [
            "Le PMO ne doit plus être un centre de coûts administratif, mais un véritable levier de création de valeur. Nous transformons votre PMO en moteur stratégique capable d'aligner les projets sur les objectifs business et de mesurer l'impact réel de chaque initiative.",
            "Notre approche combine méthodologies agiles et gouvernance robuste pour garantir une exécution fluide, une priorisation intelligente des ressources et une visibilité totale sur l'avancement des programmes critiques.",
            "Résultat : des décisions plus rapides, une meilleure allocation du budget IT, et une réduction significative du risque projet."
          ]
        },
        {
          icon: BarChart3,
          title: 'Data & Power BI',
          paragraphs: [
            "Vos données sont dispersées, silotées, et leur potentiel reste inexploité. Nous créons des écosystèmes data unifiés où chaque métrique devient un levier décisionnel actionnable.",
            "Avec Power BI comme socle technologique premium, nous concevons des tableaux de bord sur-mesure qui transforment la complexité en clarté : KPIs en temps réel, analyses prédictives, et visualisations intuitives pour tous les niveaux hiérarchiques.",
            "Le résultat ? Une culture data-driven qui accélère la prise de décision, améliore la performance opérationnelle et révèle des opportunités cachées."
          ]
        },
        {
          icon: Cpu,
          title: 'Automation & IA',
          paragraphs: [
            "L'automatisation n'est plus une option, c'est une nécessité stratégique. Nous identifions et automatisons les processus chronophages qui drainent la productivité de vos équipes.",
            "Notre expertise en IA permet d'aller au-delà de la simple automatisation : nous déployons des solutions intelligentes qui apprennent, s'adaptent et optimisent continuellement vos workflows.",
            "L'impact : libération de temps stratégique, réduction des erreurs humaines, et scalabilité accrue sans explosion des coûts opérationnels."
          ]
        },
        {
          icon: Shield,
          title: 'Pilotage Stratégique & Gouvernance IT',
          paragraphs: [
            "La gouvernance IT doit servir l'agilité, pas la freiner. Nous mettons en place des frameworks de gouvernance souples qui protègent sans rigidifier, contrôlent sans bureaucratiser.",
            "Notre approche équilibre conformité, gestion des risques et innovation pour créer un environnement où l'IT devient un partenaire stratégique du business, pas un simple fournisseur de services.",
            "Vous gagnez en visibilité sur les coûts IT, en capacité d'arbitrage stratégique, et en confiance vis-à-vis des parties prenantes internes et externes."
          ]
        }
      ]
    },
    en: {
      title: 'Challenges & Transformation',
      intro: 'We address the strategic and operational challenges that hinder your organization\'s growth and performance.',
      blocks: [
        {
          icon: Target,
          title: 'Strategic PMO',
          paragraphs: [
            "The PMO should no longer be an administrative cost center, but a true value creation lever. We transform your PMO into a strategic engine capable of aligning projects with business objectives and measuring the real impact of each initiative.",
            "Our approach combines agile methodologies and robust governance to ensure smooth execution, intelligent resource prioritization, and complete visibility on critical program progress.",
            "Result: faster decisions, better IT budget allocation, and significant reduction in project risk."
          ]
        },
        {
          icon: BarChart3,
          title: 'Data & Power BI',
          paragraphs: [
            "Your data is scattered, siloed, and its potential remains untapped. We create unified data ecosystems where every metric becomes an actionable decision lever.",
            "With Power BI as a premium technology foundation, we design custom dashboards that transform complexity into clarity: real-time KPIs, predictive analytics, and intuitive visualizations for all hierarchical levels.",
            "The result? A data-driven culture that accelerates decision-making, improves operational performance, and reveals hidden opportunities."
          ]
        },
        {
          icon: Cpu,
          title: 'Automation & AI',
          paragraphs: [
            "Automation is no longer an option, it's a strategic necessity. We identify and automate time-consuming processes that drain your teams' productivity.",
            "Our AI expertise goes beyond simple automation: we deploy intelligent solutions that learn, adapt, and continuously optimize your workflows.",
            "The impact: liberation of strategic time, reduction of human errors, and increased scalability without operational cost explosion."
          ]
        },
        {
          icon: Shield,
          title: 'Strategic Steering & IT Governance',
          paragraphs: [
            "IT governance must serve agility, not hinder it. We implement flexible governance frameworks that protect without rigidifying, control without bureaucratizing.",
            "Our approach balances compliance, risk management, and innovation to create an environment where IT becomes a strategic partner to the business, not just a service provider.",
            "You gain visibility on IT costs, strategic arbitration capacity, and confidence with internal and external stakeholders."
          ]
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section className='py-24 px-4 bg-slate-800/50'>
      <div className='container mx-auto max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>{t.title}</h2>
          <p className='text-xl text-slate-300 max-w-3xl mx-auto'>{t.intro}</p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8'>
          {t.blocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/50 transition-all duration-300 group'
            >
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <block.icon className='w-7 h-7 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-white'>{block.title}</h3>
              </div>
              <div className='space-y-4'>
                {block.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className='text-slate-300 leading-relaxed'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
