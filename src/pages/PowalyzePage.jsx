import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const sections = [
  {
    title: "Maîtrise des environnements complexes",
    desc: "Nous ne gérons pas seulement le projet, nous domptons le chaos. Là où d'autres voient de l'incertitude, nous apportons structure et clarté opérationnelle immédiate.",
    benefits: ["Cartographie des risques", "Vision claire à 360°", "Sérénité décisionnelle"]
  },
  {
    title: "Rigueur Méthodologique",
    desc: "Pas d'improvisation. Une application chirurgicale des meilleures pratiques (PMP, Agile, Hybrid) adaptée à votre ADN pour sécuriser chaque livrable.",
    benefits: ["Standards d'excellence", "Processus optimisés", "Zéro dérive"]
  },
  {
    title: "Culture du Résultat",
    desc: "L'effort ne compte pas, seul le résultat importe. Nous sommes obsédés par l'atteinte de vos objectifs stratégiques et le ROI de vos initiatives.",
    benefits: ["ROI mesurable", "Délais respectés", "Impact business direct"]
  },
  {
    title: "Capacité à Structurer",
    desc: "Transformer vos ambitions floues en plans de bataille précis. Nous convertissons la vision stratégique en feuilles de route exécutables dès le premier jour.",
    benefits: ["Roadmaps précises", "Gouvernance claire", "Alignement total"]
  },
  {
    title: "Double Expertise PMO + Data",
    desc: "L'alliance rare du pilotage humain et de la puissance analytique. Nous ne devinons pas, nous savons – grâce à des tableaux de bord Power BI qui révèlent la vérité terrain.",
    benefits: ["Pilotage par la donnée", "Dashboards Power BI", "KPIs automatisés"]
  },
  {
    title: "Polyvalence Technique",
    desc: "Le chaînon manquant entre la technique et le business. Nous traduisons les contraintes IT en opportunités stratégiques et vice-versa.",
    benefits: ["Dialogue fluide IT/Biz", "Compréhension technique", "Crédibilité transverse"]
  },
  {
    title: "Dimension Internationale & Trilingue",
    desc: "Une aisance native pour piloter des équipes multiculturelles et naviguer dans des contextes globaux (Français, Anglais, Allemand).",
    benefits: ["Coordination globale", "Adaptabilité culturelle", "Communication sans frontières"]
  },
  {
    title: "Capacité à Communiquer",
    desc: "Faire circuler l'information est un art. Nous assurons que chaque partie prenante, du développeur au CEO, dispose de la bonne information au bon moment.",
    benefits: ["Reporting exécutif", "Transparence totale", "Adhésion des équipes"]
  },
  {
    title: "Résilience & Adaptabilité",
    desc: "Face aux imprévus, nous ne plions pas. Nous pivotons. Une force tranquille qui transforme les bloqueurs en leviers de performance.",
    benefits: ["Gestion de crise", "Pivot agile", "Stabilité sous pression"]
  },
  {
    title: "Humilité & Proactivité",
    desc: "Des leaders qui servent le projet avant de se servir. Nous anticipons les risques silencieusement pour que votre succès fasse du bruit.",
    benefits: ["Leadership serviteur", "Anticipation des risques", "Esprit d'équipe"]
  }
];

const PowalyzePage = () => {
  return (
    <>
      <Helmet>
        <title>Powalyze — Notre ADN & Expertise</title>
        <meta name="description" content="Découvrez les 10 piliers de l'excellence Powalyze : méthodologie, data, rigueur et culture du résultat." />
      </Helmet>

      <section className="min-h-screen bg-brand-black py-32 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-gold-premium/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-ctaBlue/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-gold-mat mb-6">
              L'Art de Piloter. <br/><span className="text-white">La Puissance d'Exécuter.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              10 piliers fondamentaux qui font de Powalyze le partenaire privilégié des transformations critiques.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl border border-brand-gold-light/10 bg-brand-black/50 hover:bg-brand-gold-premium/5 hover:border-brand-gold-premium/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 mt-1">
                    <span className="text-2xl" role="img" aria-label="checkmark">✅</span>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-brand-gold-champagne group-hover:text-brand-gold-premium transition-colors mb-3">
                      {section.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6 font-light">
                      {section.desc}
                    </p>
                    
                    <ul className="space-y-2">
                      {section.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                          <Check size={14} className="text-brand-gold-premium" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <a 
              href="/#contact" 
              className="inline-flex items-center justify-center px-10 py-4 bg-brand-gold-premium text-brand-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 rounded-sm"
            >
              Démarrer votre transformation
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PowalyzePage;