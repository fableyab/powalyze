
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, HelpCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Accordion from '@/components/Accordion';

export const ServiceHero = ({ title, subtitle, image, cta }) => (
  <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
    </div>
    
    <div className="container mx-auto px-6 relative z-10 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-3xl mx-auto">
          {subtitle}
        </p>
        <Link to="/contact">
          <Button size="xl" className="bg-[#BFA76A] text-black hover:bg-white font-bold px-10 rounded-full h-16 text-lg shadow-[0_0_20px_rgba(191,167,106,0.3)]">
            {cta} <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export const ServiceOverview = ({ title, content, benefits }) => (
  <section className="py-20 bg-[#0A0A0A]">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-6 border-l-4 border-[#BFA76A] pl-6">
            {title}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            {content}
          </p>
          <div className="space-y-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#111] p-4 rounded-lg border border-white/5">
                <CheckCircle2 className="text-[#BFA76A]" size={24} />
                <span className="text-white font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[500px] bg-[#111] rounded-2xl overflow-hidden border border-white/10">
           {/* Placeholder for specific illustration or dynamic component */}
           <div className="absolute inset-0 bg-gradient-to-br from-[#BFA76A]/5 to-transparent flex items-center justify-center">
              <div className="w-32 h-32 bg-[#BFA76A]/10 rounded-full animate-pulse" />
           </div>
        </div>
      </div>
    </div>
  </section>
);

export const ServiceContext = ({ title, content }) => (
  <section className="py-20 bg-[#111] border-y border-white/5">
    <div className="container mx-auto px-6 max-w-4xl text-center">
      <h2 className="text-3xl font-display font-bold text-white mb-8">{title}</h2>
      <p className="text-gray-300 text-lg leading-relaxed">
        {content}
      </p>
    </div>
  </section>
);

export const ServiceMethodology = ({ framework, steps }) => (
  <section className="py-24 bg-[#0A0A0A]">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-[#BFA76A] font-bold uppercase tracking-widest text-xs mb-2 block">Framework : {framework}</span>
        <h2 className="text-3xl font-display font-bold text-white">Notre Méthodologie</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="relative group">
            <div className="bg-[#161616] p-8 rounded-xl border border-white/10 h-full relative z-10 hover:border-[#BFA76A]/50 transition-colors">
              <div className="text-4xl font-bold text-[#BFA76A]/20 mb-4 font-display">0{i + 1}</div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-[#333] z-0 transform -translate-y-1/2" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ServiceBenefits = ({ list }) => (
  <section className="py-20 bg-[#0A0A0A]">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {list.map((item, i) => (
          <div key={i} className="bg-[#111] p-10 rounded-2xl border border-white/10 text-center hover:bg-[#161616] transition-colors">
            <div className="text-4xl md:text-5xl font-bold text-[#BFA76A] mb-2">{item.value}</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm font-bold">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ServiceFAQ = ({ questions = [] }) => {
  // Mock questions if empty for demo
  const displayQuestions = questions.length > 0 ? questions : [
    { title: "Combien de temps dure une mission ?", content: "Cela dépend du périmètre, mais généralement entre 2 et 6 mois." },
    { title: "Quels sont les pré-requis ?", content: "Un accès aux données et la disponibilité des parties prenantes clés." },
    { title: "Travaillez-vous à distance ?", content: "Oui, nous intervenons en hybride (sur site et à distance)." }
  ];

  return (
    <section className="py-20 bg-[#111] border-y border-white/5">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-display font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
          <HelpCircle className="text-[#BFA76A]" /> FAQ
        </h2>
        <Accordion items={displayQuestions} />
      </div>
    </section>
  );
};

export const ServiceCTA = ({ title, ctaText }) => (
  <section className="py-24 text-center bg-gradient-to-b from-[#0A0A0A] to-[#111]">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
        {title || "Prêt à transformer votre organisation ?"}
      </h2>
      <Link to="/contact">
        <Button size="xl" className="bg-[#BFA76A] text-black hover:bg-white font-bold px-12 h-16 rounded-full text-lg shadow-lg">
          <MessageSquare className="mr-2" size={20} /> {ctaText || "Démarrer la conversation"}
        </Button>
      </Link>
    </div>
  </section>
);
