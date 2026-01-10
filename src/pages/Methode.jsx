import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PremiumLayout from '@/components/layout/PremiumLayout';
import { 
  Target, 
  Search,
  Lightbulb,
  Rocket,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const Methode = () => {
  return (
    <PremiumLayout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000" 
            alt="Our Method"
            className="w-full h-full object-cover opacity-[0.06]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/95 via-[#000000]/98 to-[#0D0D0D]/95 z-[1]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-extralight tracking-tight mb-8">
              Méthode
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto">
              Une approche structurée, éprouvée et pragmatique
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Approche */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              L'approche Powalyze
            </h2>
            <p className="text-lg font-light text-white/60 max-w-3xl">
              Une méthode en 4 phases pour accompagner votre excellence opérationnelle
            </p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                number: "01",
                icon: Search,
                title: "Diagnostic",
                subtitle: "Comprendre votre contexte",
                description: "Analyse approfondie de votre situation actuelle, identification des enjeux stratégiques et évaluation de votre maturité organisationnelle.",
                steps: [
                  "Audit de l'existant",
                  "Cartographie des processus",
                  "Identification des points de friction",
                  "Évaluation des risques",
                  "Définition des objectifs"
                ]
              },
              {
                number: "02",
                icon: Lightbulb,
                title: "Structuration",
                subtitle: "Poser les fondations",
                description: "Mise en place de la gouvernance, des processus et des outils nécessaires à votre pilotage stratégique.",
                steps: [
                  "Conception de la gouvernance",
                  "Définition des rôles et responsabilités",
                  "Mise en place des processus",
                  "Configuration des outils",
                  "Formation des équipes"
                ]
              },
              {
                number: "03",
                icon: Rocket,
                title: "Accompagnement",
                subtitle: "Assurer la réussite",
                description: "Support opérationnel continu, coaching et montée en compétences pour garantir l'adoption et l'efficacité.",
                steps: [
                  "Support opérationnel quotidien",
                  "Coaching des équipes",
                  "Résolution des blocages",
                  "Ajustements et optimisations",
                  "Transfert de compétences"
                ]
              },
              {
                number: "04",
                icon: Target,
                title: "Optimisation",
                subtitle: "Améliorer en continu",
                description: "Mesure des résultats, identification des axes d'amélioration et optimisation continue de vos processus.",
                steps: [
                  "Mesure de la performance",
                  "Analyse des écarts",
                  "Identification des optimisations",
                  "Mise en œuvre des améliorations",
                  "Capitalisation des bonnes pratiques"
                ]
              }
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border border-white/5 bg-white/[0.01] p-10 rounded-sm"
              >
                <div className="flex items-start gap-8 mb-8">
                  <div className="text-6xl font-extralight text-[#D4AF37]">
                    {phase.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <phase.icon className="w-8 h-8 text-[#D4AF37]" />
                      <div>
                        <h3 className="text-3xl font-light">{phase.title}</h3>
                        <p className="text-sm font-light text-[#D4AF37] mt-1">{phase.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-base font-light text-white/70 leading-relaxed mb-8">
                      {phase.description}
                    </p>
                  </div>
                </div>

                <div className="ml-24">
                  <h4 className="text-lg font-light mb-4 text-white/80">Étapes clés :</h4>
                  <ul className="space-y-3">
                    {phase.steps.map((step, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-light text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Principes */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Principes fondamentaux
            </h2>
            <p className="text-lg font-light text-white/60 max-w-3xl mx-auto">
              Les piliers de notre approche
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Pragmatisme",
                desc: "Des solutions concrètes, opérationnelles et immédiatement applicables"
              },
              {
                title: "Rigueur",
                desc: "Méthodes éprouvées, processus structurés, résultats mesurables"
              },
              {
                title: "Agilité",
                desc: "Adaptation continue aux réalités terrain et aux évolutions contextuelles"
              },
              {
                title: "Transparence",
                desc: "Communication claire, reporting régulier, alignement permanent"
              }
            ].map((principle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 border border-white/5 bg-white/[0.01] rounded-sm text-center"
              >
                <h3 className="text-xl font-light mb-4 text-[#D4AF37]">{principle.title}</h3>
                <p className="text-sm font-light text-white/60 leading-relaxed">{principle.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Résultats */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Résultats attendus
            </h2>
            <p className="text-lg font-light text-white/60 max-w-3xl">
              Ce que vous pouvez attendre de notre collaboration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Vision claire et partagée de vos projets et portefeuilles",
              "Gouvernance structurée et processus de décision efficaces",
              "Maîtrise des risques et anticipation des problèmes",
              "Amélioration mesurable de la performance projet",
              "Alignement des équipes et des priorités",
              "Exploitation optimale des données pour décider",
              "Réduction des délais de décision",
              "Augmentation de la satisfaction des parties prenantes"
            ].map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex items-start gap-4 p-6 border border-white/5 bg-white/[0.01] rounded-sm"
              >
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <p className="text-base font-light text-white/70 leading-relaxed">{result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 leading-tight">
              Prêt à structurer votre pilotage ?
            </h2>
            
            <p className="text-lg font-light text-white/60 mb-12 max-w-2xl mx-auto">
              Discutons de vos enjeux et voyons comment cette méthode peut s'adapter à votre contexte.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-10 py-4 bg-[#D4AF37] text-[#000000] font-light hover:bg-[#D4AF37] transition-all rounded-sm inline-flex items-center gap-2"
              >
                Échanger sur mon projet
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/services"
                className="px-10 py-4 border border-white/10 text-white font-light hover:bg-white/5 transition-all rounded-sm"
              >
                Découvrir les services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PremiumLayout>
  );
};

export default Methode;
