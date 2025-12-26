import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQPowerBI = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Comment accéder à mes rapports Power BI ?",
      answer: "Vos rapports Power BI sont accessibles directement depuis cette page. Sélectionnez le dashboard souhaité dans le menu ci-dessus pour visualiser vos données en temps réel. Chaque rapport est mis à jour automatiquement selon la fréquence de rafraîchissement configurée."
    },
    {
      question: "Puis-je télécharger mes données sous format Excel ?",
      answer: "Oui, vous pouvez exporter vos données directement depuis le rapport Power BI. Cliquez sur le menu d'options (trois points) dans le coin supérieur droit du rapport, puis sélectionnez 'Exporter les données'. Vous pourrez choisir entre les formats Excel (.xlsx) ou CSV selon vos besoins."
    },
    {
      question: "À quelle fréquence les données sont-elles actualisées ?",
      answer: "La fréquence d'actualisation dépend de votre plan d'abonnement. Les plans Standard bénéficient d'une actualisation toutes les 8 heures, tandis que les plans Premium offrent une actualisation en temps réel. Vous pouvez vérifier l'heure de dernière mise à jour en haut à droite de chaque rapport."
    },
    {
      question: "Comment puis-je personnaliser mes dashboards ?",
      answer: "Pour personnaliser vos dashboards, contactez votre gestionnaire de compte Powalyze. Notre équipe peut configurer des rapports sur mesure en fonction de vos KPIs spécifiques, ajouter des visuels personnalisés, et créer des filtres adaptés à vos besoins métier."
    },
    {
      question: "Que faire si mes données ne s'affichent pas correctement ?",
      answer: "Si vous rencontrez des problèmes d'affichage, vérifiez d'abord votre connexion internet. Si le problème persiste, actualisez la page ou essayez de vous déconnecter puis reconnecter. Pour toute assistance technique, notre équipe support est disponible 24/7 via le chat en ligne ou par email à support@powalyze.com."
    },
    {
      question: "Puis-je partager mes rapports avec mon équipe ?",
      answer: "Absolument ! Vous pouvez partager vos rapports Power BI de deux façons : en ajoutant des utilisateurs à votre espace client via la section 'Gestion des utilisateurs', ou en générant un lien de partage sécurisé (disponible pour les plans Premium). Tous les utilisateurs ajoutés auront accès aux mêmes dashboards selon leurs permissions."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden transition-all duration-200 hover:border-gold-primary/30"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none group"
          >
            <span className="text-white font-medium pr-4 group-hover:text-gold-primary transition-colors">
              {faq.question}
            </span>
            <span className="flex-shrink-0 text-gold-primary">
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </span>
          </button>
          <div
            className={`px-6 overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
            }`}
          >
            <p className="text-dark-300 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQPowerBI;
