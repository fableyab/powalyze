import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Plateforme & Modules",
      questions: [
        {
          q: "Qu'est-ce que Powalyze ?",
          a: "Powalyze est un Governance Operating System qui combine PMO structuré, données fiabilisées, Power BI, plateforme SaaS moderne et IA prédictive pour transformer votre gouvernance de portefeuille."
        },
        {
          q: "Quels sont les modules disponibles ?",
          a: "Portfolio Manager, Executive Dashboard, Decision Hub, Predictive Intelligence, Power BI Integration, Governance Engine, Documents & Référentiels, Collaboration et Intégrations."
        },
        {
          q: "La plateforme est-elle modulaire ?",
          a: "Oui, activez uniquement les modules dont vous avez besoin. Vous pouvez démarrer avec un module et étendre progressivement selon vos besoins."
        },
        {
          q: "Quelle est la différence entre le Consulting et le SaaS ?",
          a: "Le consulting apporte expertise PMO et Power BI personnalisée. Le SaaS offre un cockpit de gouvernance unifié. Les deux se combinent pour une solution complète."
        }
      ]
    },
    {
      category: "Déploiement & Mise en œuvre",
      questions: [
        {
          q: "Quel est le délai de mise en œuvre ?",
          a: "Le SaaS est opérationnel en quelques jours. Pour un déploiement complet avec consulting PMO et Power BI, comptez 4 à 8 semaines selon le périmètre."
        },
        {
          q: "Faut-il une infrastructure particulière ?",
          a: "Non, Powalyze est une solution cloud (SaaS). Vous n'avez besoin que d'un navigateur web moderne et d'une connexion internet."
        },
        {
          q: "Comment se passe l'intégration avec mes outils existants ?",
          a: "Powalyze s'intègre nativement avec Power BI, Microsoft 365, Azure AD, SharePoint et Teams. Des connecteurs sont disponibles pour d'autres systèmes."
        },
        {
          q: "Proposez-vous de la formation ?",
          a: "Oui, formations incluses à l'onboarding : utilisation de la plateforme, bonnes pratiques PMO, création de dashboards Power BI."
        }
      ]
    },
    {
      category: "Sécurité & Conformité",
      questions: [
        {
          q: "Où sont hébergées mes données ?",
          a: "Sur des datacenters européens (Azure), conformes RGPD. Vous gardez la propriété complète de vos données."
        },
        {
          q: "La plateforme est-elle sécurisée ?",
          a: "Oui : chiffrement en transit et au repos, authentification multi-facteurs, contrôles d'accès granulaires, audits réguliers."
        },
        {
          q: "Est-ce conforme au RGPD ?",
          a: "Absolument. Powalyze respecte le RGPD : consentement, droit à l'oubli, portabilité des données, transparence totale."
        },
        {
          q: "Qui peut accéder à mes données ?",
          a: "Uniquement les utilisateurs que vous autorisez. Vous contrôlez tous les accès via des rôles et permissions granulaires."
        }
      ]
    },
    {
      category: "Tarifs & Support",
      questions: [
        {
          q: "Quels sont les tarifs ?",
          a: "Tarification modulaire selon les modules activés et le nombre d'utilisateurs. Contactez-nous pour un devis personnalisé adapté à vos besoins."
        },
        {
          q: "Y a-t-il un essai gratuit ?",
          a: "Oui, essai de 14 jours sur la plateforme SaaS. Aucune carte bancaire requise pour démarrer."
        },
        {
          q: "Quel support est inclus ?",
          a: "Support email et chat en direct, documentation complète, base de connaissances, formations vidéo. Support premium disponible avec hotline dédiée."
        },
        {
          q: "Puis-je annuler mon abonnement ?",
          a: "Oui, sans engagement. Vous pouvez résilier à tout moment. Export complet de vos données garanti."
        }
      ]
    },
    {
      category: "Fonctionnalités techniques",
      questions: [
        {
          q: "Comment fonctionne l'IA prédictive ?",
          a: "Algorithmes de machine learning qui analysent vos données historiques pour détecter signaux faibles, prévoir dérives et recommander actions. Totalement explicable et gouvernée."
        },
        {
          q: "Puis-je personnaliser les dashboards Power BI ?",
          a: "Oui, dashboards Power BI entièrement personnalisables. Nous pouvons les créer pour vous ou vous former à les créer vous-même."
        },
        {
          q: "Les données sont-elles mises à jour en temps réel ?",
          a: "Oui, synchronisation en temps réel ou planifiée selon vos besoins. Vous contrôlez la fréquence de rafraîchissement."
        },
        {
          q: "Puis-je exporter mes données ?",
          a: "Oui, export complet à tout moment : Excel, CSV, PDF, PowerPoint. Vous gardez toujours le contrôle de vos données."
        }
      ]
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-20">
        <section className="relative py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-light text-[#D4AF37] hover:text-[#4A9EFF] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-6xl font-extralight text-[#D4AF37] mb-6">Questions fréquentes</h1>
              <p className="text-xl font-light text-[#4A9EFF] leading-relaxed max-w-3xl">
                Tout ce que vous devez savoir sur Powalyze
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-12">
                <h2 className="text-2xl font-light text-[#D4AF37] mb-6">{section.category}</h2>
                <div className="space-y-4">
                  {section.questions.map((faq, questionIndex) => {
                    const globalIndex = `${sectionIndex}-${questionIndex}`;
                    const isOpen = openIndex === globalIndex;
                    
                    return (
                      <motion.div
                        key={questionIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: questionIndex * 0.1 }}
                        className="border border-white/5 bg-white/[0.01] rounded-sm overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(globalIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                        >
                          <span className="text-lg font-light text-white pr-4">{faq.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-4"
                          >
                            <p className="text-base font-light text-white/70 leading-relaxed">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-6 text-[#D4AF37]">Vous avez d'autres questions ?</h2>
              <p className="text-lg font-light text-white/70 mb-8">
                Notre équipe est là pour vous accompagner
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link to="/contact" className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white font-light rounded-sm hover:scale-105 transition-transform">Nous contacter</Link>
                <Link to="/demo" className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-light rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all">Demander une démo</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
