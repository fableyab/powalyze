
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import SEO from '@/components/SEO';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import Accordion from '@/components/Accordion';
import FAQSearch from '@/components/FAQSearch';
import { faqData } from '@/data/faqData';
import { MessageCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredData = useMemo(() => {
    let data = activeTab === 'all' 
      ? faqData 
      : faqData.filter(section => section.id === activeTab);

    if (searchTerm.trim()) {
      const lowerTerm = searchTerm.toLowerCase();
      // Deep filter questions
      data = data.map(section => ({
        ...section,
        questions: section.questions.filter(q => 
          q.question[language].toLowerCase().includes(lowerTerm) || 
          q.answer[language].toLowerCase().includes(lowerTerm)
        )
      })).filter(section => section.questions.length > 0);
    }

    return data;
  }, [searchTerm, activeTab, language]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO 
        title="FAQ - Powalyze" 
        description="Foire aux questions sur nos services PMO, Data et Gouvernance." 
      />
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-[#BFA76A] font-bold uppercase tracking-widest text-xs mb-4 block">
              Support & Aide
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Questions <span className="text-[#BFA76A]">Fréquentes</span>
            </h1>
            <p className="text-gray-400 text-lg mb-10">
              Trouvez des réponses rapides sur nos méthodologies, nos outils et nos services d'accompagnement stratégique.
            </p>
            
            <FAQSearch value={searchTerm} onChange={setSearchTerm} placeholder={t('common.search', 'Rechercher...')} />
          </motion.div>
        </section>

        {/* Tabs */}
        <section className="container mx-auto px-6 mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'all' 
                  ? 'bg-[#BFA76A] text-black' 
                  : 'bg-[#111] text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {language === 'en' ? 'All' : language === 'de' ? 'Alle' : 'Tout'}
            </button>
            {faqData.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === section.id 
                    ? 'bg-[#BFA76A] text-black' 
                    : 'bg-[#111] text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {section.title[language]}
              </button>
            ))}
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-6 max-w-4xl">
          {filteredData.length > 0 ? (
            filteredData.map(section => (
              <div key={section.id} className="mb-12">
                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-[#BFA76A] rounded-sm"></div>
                  {section.title[language]}
                </h2>
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8">
                  <Accordion 
                    items={section.questions.map(q => ({
                      title: q.question[language],
                      content: q.answer[language]
                    }))} 
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-[#111] rounded-2xl border border-white/10">
              <HelpCircle size={48} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Aucun résultat</h3>
              <p className="text-gray-400">Essayez d'autres mots-clés ou parcourez les catégories.</p>
            </div>
          )}
        </section>

        {/* Still have questions */}
        <section className="container mx-auto px-6 mt-20">
          <div className="bg-gradient-to-r from-[#1C1C1C] to-[#111] border border-[#BFA76A]/20 rounded-3xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#BFA76A]/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
            
            <h2 className="text-3xl font-display font-bold text-white mb-4">Vous ne trouvez pas votre réponse ?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Nos experts sont disponibles pour répondre à vos questions spécifiques lors d'un audit gratuit.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold px-8 h-12">
                  <MessageCircle size={18} className="mr-2" /> Contacter l'équipe
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default FAQPage;
