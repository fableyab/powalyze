import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const TestimonialCard = ({ name, role, company, quote, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-[#111] p-8 rounded-xl border border-white/5 relative group hover:border-[#BFA76A]/30 transition-colors"
  >
    <Quote className="absolute top-8 right-8 text-[#BFA76A]/20 group-hover:text-[#BFA76A]/40 transition-colors" size={48} />
    
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#BFA76A]/50">
        {image}
      </div>
      <div>
        <h4 className="text-white font-bold font-display">{name}</h4>
        <p className="text-[#BFA76A] text-xs uppercase tracking-wider">{role}</p>
        <p className="text-gray-500 text-xs">{company}</p>
      </div>
    </div>
    
    <p className="text-gray-300 font-light italic leading-relaxed relative z-10">
      "{quote}"
    </p>
  </motion.div>
);

const RealizationsSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-32 bg-[#0A0A0A] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <span className="text-[#BFA76A] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
            {t('realizations.testimonials.title')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
            La Confiance de nos <span className="text-[#BFA76A]">Partenaires</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            name="Thomas Weber"
            role="CIO"
            company="Finance Corp"
            quote="L'intervention de Powalyze a transformé notre visibilité sur le portefeuille projets. Une clarté indispensable pour nos décisions stratégiques."
            image={<img alt="Headshot of Thomas Weber" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1700227047786-8835486ba7af" />}
            delay={0.1}
          />
          <TestimonialCard 
            name="Sarah Martins"
            role="Head of PMO"
            company="Tech Solutions SA"
            quote="Leur expertise en Data Visualization nous a permis de réduire nos temps de reporting de 60% tout en augmentant la qualité des données."
            image={<img alt="Headshot of Sarah Martins" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1659353219716-699803846194" />}
            delay={0.2}
          />
          <TestimonialCard 
            name="David Chen"
            role="Director of Operations"
            company="Global Logistics"
            quote="Une approche pragmatique, orientée résultats. Pas de théorie inutile, juste de l'efficacité et de la structure."
            image={<img alt="Headshot of David Chen" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1700227047786-8835486ba7af" />}
            delay={0.3}
          />
        </div>
        
        <div className="mt-20 relative rounded-2xl overflow-hidden h-[400px]">
             <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                <div className="text-center">
                   <h3 className="text-3xl md:text-5xl font-display text-white mb-6">{t('contact.title1')} {t('contact.title2')}</h3>
                   <Link to="/rendez-vous-gratuit" className="px-8 py-4 bg-[#BFA76A] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm">
                      {t('home.hero.ctaPrimary')}
                   </Link>
                </div>
             </div>
             {/* UPDATED IMAGE: Professional BI/Data visualization screen */}
             <img alt="Advanced business intelligence dashboard on monitor" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" />
        </div>
      </div>
    </section>
  );
};

export default RealizationsSection;