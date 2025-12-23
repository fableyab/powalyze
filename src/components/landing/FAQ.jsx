import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Powalyze est-il adapté aux PME ?',
      answer: 'Oui, Powalyze est conçu pour s’adapter à toutes les tailles d’organisation, des PME aux grandes entreprises. Notre solution est modulaire et évolutive.'
    },
    {
      question: 'Puis-je intégrer Power BI ?',
      answer: 'Absolument. Powalyze s’intègre nativement avec Power BI, Azure DevOps, Jira, Monday.com et de nombreux autres outils via API.'
    },
    {
      question: 'Combien de temps pour la mise en place ?',
      answer: 'La mise en place initiale prend 2 à 4 semaines selon la complexité. Notre équipe vous accompagne à chaque étape.'
    },
    {
      question: 'Vos données sont-elles sécurisées ?',
      answer: 'Oui, nous utilisons un chiffrement AES-256, hébergement en Europe (Azure), conformité RGPD et audits de sécurité réguliers.'
    }
  ];

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Questions Fréquentes</h2>
          <p className="text-xl text-gray-400">Tout ce que vous devez savoir</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#111] border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                <FiChevronDown className={`text-[#BFA76A] transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} size={24} />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
