import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Rocket, RefreshCw, Network } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    {
      icon: Building2,
      title: "Transformation Digitale d'Entreprise",
      context: "Grande entreprise du secteur financier",
      challenge: "Coordination de 15 projets simultanés impliquant 8 prestataires différents dans le cadre d'une transformation digitale globale.",
      solution: "Mise en place d'un PMO technique centralisé avec tableaux de bord unifiés, processus de gouvernance adaptés et animation hebdomadaire de comités de coordination multi-acteurs.",
      results: ["Réduction de 40% des dépendances bloquantes", "Livraison à temps de 95% des jalons", "Économie de 2M€ sur le budget global"]
    },
    {
      icon: Rocket,
      title: "Lancement de Plateforme Cloud Native",
      context: "Scale-up technologique en forte croissance",
      challenge: "Conception et déploiement d'une plateforme cloud native pour supporter une croissance de 300% du volume d'utilisateurs.",
      solution: "Architecture technique évolutive, roadmap de migration progressive, coordination des équipes DevOps et pilotage de la montée en charge.",
      results: ["Migration réussie sans interruption de service", "Architecture scalable jusqu'à 10M d'utilisateurs", "Time-to-market divisé par 3"]
    },
    {
      icon: RefreshCw,
      title: "Refonte de SI Métier Critique",
      context: "Opérateur de services publics",
      challenge: "Modernisation d'un système d'information métier critique utilisé par 5000 agents avec contrainte de continuité de service absolue.",
      solution: "Stratégie de migration par étapes, gestion des risques opérationnels, pilotage technique des intégrations complexes et conduite du changement.",
      results: ["Zéro interruption de service", "Adoption utilisateur de 92% en 3 mois", "Réduction de 60% des incidents"]
    },
    {
      icon: Network,
      title: "Intégration Post-Fusion IT",
      context: "Groupe international post-acquisition",
      challenge: "Harmonisation et intégration de deux systèmes d'information d'entreprises fusionnées avec 12 pays concernés.",
      solution: "Gouvernance multi-pays, coordination de 20+ équipes techniques, priorisation de 50+ chantiers d'intégration et pilotage du plan de convergence.",
      results: ["Intégration complète en 18 mois", "Synergies IT de 8M€/an", "Plateforme unique pour 15000 utilisateurs"]
    }
  ];

  return (
    <section id="cas-usage" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cas d'Usage
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des résultats concrets sur des projets d'envergure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-blue-600 rounded-lg shrink-0">
                    <Icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-blue-600 font-semibold">
                      {useCase.context}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Défi</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {useCase.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {useCase.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Résultats</h4>
                    <div className="space-y-2">
                      {useCase.results.map((result, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></div>
                          <span className="text-sm text-gray-700">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;