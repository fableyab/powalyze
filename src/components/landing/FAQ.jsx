import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Quelle est la différence avec Monday.com ou Asana ?",
      answer: "Powalyze est spécifiquement conçu pour les PMO et la gouvernance de portefeuilles. Contrairement aux outils généralistes, nous offrons une vision stratégique avec des dashboards exécutifs, des analyses budgétaires consolidées, et une gestion des risques inter-projets. Notre interface est épurée et focalisée sur la prise de décision, pas sur la gestion opérationnelle quotidienne."
    },
    {
      question: "Combien de temps prend la mise en place ?",
      answer: "Configuration initiale en 48h. Import de vos données existantes (Excel, MS Project) en 24h supplémentaires. Formation de vos équipes en 2 sessions de 2h. Vous êtes opérationnels sous 1 semaine. Nous gérons l'accompagnement de A à Z, avec un success manager dédié pendant les 3 premiers mois."
    },
    {
      question: "Peut-on intégrer nos outils actuels (Jira, Excel, PowerBI) ?",
      answer: "Oui, Powalyze s'intègre à vos outils existants via API et webhooks. Import automatique depuis Excel/CSV, synchronisation Jira pour les projets techniques, export vers PowerBI pour analyses avancées. Nous créons les connexions sur mesure selon votre stack technologique."
    },
    {
      question: "Quels sont les tarifs ?",
      answer: "À partir de CHF 2'990/mois pour un PMO jusqu'à 20 projets actifs et 5 utilisateurs. Inclut : configuration, formation, support prioritaire, hébergement Suisse sécurisé, mises à jour illimitées. Tarifs dégressifs pour portefeuilles plus importants. Démo gratuite et devis personnalisé sur demande."
    },
    {
      question: "Est-ce que mes données sont sécurisées ?",
      answer: "Sécurité maximale : hébergement en Suisse (conformité RGPD/LPD), chiffrement end-to-end, sauvegardes quotidiennes, authentification à deux facteurs, rôles et permissions granulaires. Certifications ISO 27001 en cours. Vous gardez la propriété totale de vos données, export complet à tout moment."
    },
    {
      question: "Quelle formation est nécessaire pour les équipes ?",
      answer: "Formation en 2 sessions : (1) Introduction PMO et navigation (2h), (2) Analyse avancée et reporting (2h). Supports vidéo et documentation complète inclus. Nos clients sont autonomes après 1 semaine d'utilisation. Support technique réactif disponible par email et visio."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur Powalyze. Une question ? 
            <a href="mailto:contact@powalyze.ch" className="text-powalyze-blue hover:text-powalyze-blue-dark font-semibold ml-1">
              Contactez-nous
            </a>
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-premium border border-gray-200 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-powalyze-blue" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-50 to-amber-50 rounded-2xl">
          <p className="text-lg text-gray-700 mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <a
            href="mailto:contact@powalyze.ch?subject=Question sur Powalyze"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Contactez notre équipe
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
