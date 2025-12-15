import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import SEO from '@/components/SEO';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Rocket, Clock, Target, CheckCircle2, TrendingUp, DollarSign, 
  BarChart3, Zap, Shield, Crown, Briefcase 
} from 'lucide-react';

const FeatureItem = ({ text }) => (
  <div className="flex items-start gap-3 mb-3">
    <CheckCircle2 className="text-[#BFA76A] mt-1 shrink-0" size={18} />
    <span className="text-gray-300 text-sm leading-relaxed">{text}</span>
  </div>
);

const PowerBIMarketingPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <SEO 
        title={t('powerbiPremium.hero.title')}
        description={t('powerbiPremium.hero.hook')}
      />
      <Navbar />

      <main className="pt-24">
        {/* HERO SECTION - ULTRA PREMIUM */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]"></div>
          
          <div className="container mx-auto px-6 relative z-10 text-center">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="max-w-4xl mx-auto"
             >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#BFA76A]/30 bg-[#BFA76A]/10 backdrop-blur-sm mb-8">
                   <Crown size={16} className="text-[#BFA76A]" />
                   <span className="text-[#BFA76A] text-xs font-bold tracking-[0.2em] uppercase">Premium Business Intelligence</span>
                </div>
                
                <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-tight">
                  {t('powerbiPremium.hero.title')}
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 leading-relaxed">
                  {t('powerbiPremium.hero.hook')}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                   <Link to="/powerbi-advanced">
                      <Button className="h-16 px-10 bg-[#BFA76A] text-black hover:bg-white text-xl font-bold rounded-sm shadow-[0_0_30px_rgba(191,167,106,0.3)] hover:shadow-[0_0_50px_rgba(191,167,106,0.5)] transition-all transform hover:scale-105">
                         {t('powerbiPremium.hero.cta')}
                      </Button>
                   </Link>
                </div>
             </motion.div>
          </div>
        </section>

        {/* SECTION 1 - THE ADVANTAGE */}
        <section className="py-24 bg-[#0F0F0F] relative">
           <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                 <span className="text-[#BFA76A] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{t('powerbiPremium.advantage.subtitle')}</span>
                 <h2 className="text-4xl md:text-5xl font-display font-bold text-white">{t('powerbiPremium.advantage.title')}</h2>
                 <p className="text-gray-400 mt-6 max-w-2xl mx-auto">{t('powerbiPremium.advantage.content')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {/* Card 1: Impact */}
                 <motion.div 
                    whileHover={{ y: -10 }}
                    className="p-8 bg-[#151515] border border-white/5 rounded-xl hover:border-[#BFA76A]/50 transition-colors"
                 >
                    <div className="w-12 h-12 bg-[#BFA76A]/10 rounded-lg flex items-center justify-center mb-6 text-[#BFA76A]"><Zap size={24} /></div>
                    <h3 className="text-xl font-bold text-white mb-4">{t('powerbiPremium.advantage.impact.title')}</h3>
                    <div className="space-y-2">
                       {t('powerbiPremium.advantage.impact.items').map((item, i) => <FeatureItem key={i} text={item} />)}
                    </div>
                 </motion.div>

                 {/* Card 2: Complexity */}
                 <motion.div 
                    whileHover={{ y: -10 }}
                    className="p-8 bg-[#151515] border border-white/5 rounded-xl hover:border-[#BFA76A]/50 transition-colors"
                 >
                    <div className="w-12 h-12 bg-[#BFA76A]/10 rounded-lg flex items-center justify-center mb-6 text-[#BFA76A]"><Target size={24} /></div>
                    <h3 className="text-xl font-bold text-white mb-4">{t('powerbiPremium.advantage.complexity.title')}</h3>
                    <div className="space-y-2">
                       {t('powerbiPremium.advantage.complexity.items').map((item, i) => <FeatureItem key={i} text={item} />)}
                    </div>
                 </motion.div>

                 {/* Card 3: Results */}
                 <motion.div 
                    whileHover={{ y: -10 }}
                    className="p-8 bg-[#151515] border border-white/5 rounded-xl hover:border-[#BFA76A]/50 transition-colors"
                 >
                    <div className="w-12 h-12 bg-[#BFA76A]/10 rounded-lg flex items-center justify-center mb-6 text-[#BFA76A]"><BarChart3 size={24} /></div>
                    <h3 className="text-xl font-bold text-white mb-4">{t('powerbiPremium.advantage.realResults.title')}</h3>
                    <div className="space-y-2">
                       {t('powerbiPremium.advantage.realResults.items').map((item, i) => <FeatureItem key={i} text={item} />)}
                    </div>
                 </motion.div>

                 {/* Card 4: Conversion */}
                 <motion.div 
                    whileHover={{ y: -10 }}
                    className="p-8 bg-[#151515] border border-white/5 rounded-xl hover:border-[#BFA76A]/50 transition-colors"
                 >
                    <div className="w-12 h-12 bg-[#BFA76A]/10 rounded-lg flex items-center justify-center mb-6 text-[#BFA76A]"><Briefcase size={24} /></div>
                    <h3 className="text-xl font-bold text-white mb-4">{t('powerbiPremium.advantage.conversion.title')}</h3>
                    <div className="space-y-2">
                       {t('powerbiPremium.advantage.conversion.items').map((item, i) => <FeatureItem key={i} text={item} />)}
                    </div>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* SECTION 2 - EXPERIENCE */}
        <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
           <div className="container mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div>
                    <span className="text-[#BFA76A] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">{t('powerbiPremium.experience.subtitle')}</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">{t('powerbiPremium.experience.title')}</h2>
                    
                    <div className="space-y-8">
                       {t('powerbiPremium.experience.steps').map((step, i) => (
                          <div key={i} className="flex gap-6">
                             <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#111] border border-[#BFA76A] flex items-center justify-center text-[#BFA76A] font-bold text-lg">
                                {i + 1}
                             </div>
                             <div>
                                <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                                <p className="text-gray-400">{step.desc}</p>
                             </div>
                          </div>
                       ))}
                    </div>

                    <div className="mt-12 p-6 bg-[#BFA76A]/10 border border-[#BFA76A]/20 rounded-xl">
                       <h4 className="text-[#BFA76A] font-bold mb-4 uppercase tracking-wider">{t('powerbiPremium.experience.results.title')}</h4>
                       <div className="flex flex-wrap gap-4">
                          {t('powerbiPremium.experience.results.items').map((item, i) => (
                             <span key={i} className="px-3 py-1 bg-black rounded text-sm text-white font-bold">{item}</span>
                          ))}
                       </div>
                    </div>
                 </div>
                 
                 <div className="relative">
                    <div className="absolute inset-0 bg-[#BFA76A] blur-[100px] opacity-10"></div>
                    <div className="relative bg-[#111] p-2 rounded-2xl border border-white/10 shadow-2xl">
                       <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" alt="Dashboard Preview" className="rounded-xl w-full h-auto opacity-90" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Link to="/powerbi-advanced">
                             <Button size="lg" className="bg-[#BFA76A] text-black hover:bg-white font-bold">
                                {t('powerbiPremium.action.ctaSecondary')}
                             </Button>
                          </Link>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 3 - MILLIONAIRE MODEL */}
        <section className="py-24 bg-[#0F0F0F] border-t border-white/5">
           <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{t('powerbiPremium.millionaire.title')}</h2>
                 <p className="text-xl text-[#BFA76A] font-light">{t('powerbiPremium.millionaire.subtitle')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                 <div className="bg-[#151515] p-10 rounded-2xl border border-white/5">
                    <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">{t('powerbiPremium.millionaire.model.title')}</h3>
                    <ul className="space-y-4">
                       {t('powerbiPremium.millionaire.model.items').map((item, i) => (
                          <li key={i} className="text-lg text-gray-300 flex items-center gap-3">
                             <CheckCircle2 className="text-[#BFA76A]" /> {item}
                          </li>
                       ))}
                    </ul>
                 </div>

                 <div className="bg-gradient-to-br from-[#151515] to-[#1a1505] p-10 rounded-2xl border border-[#BFA76A]/20">
                    <h3 className="text-2xl font-bold text-[#BFA76A] mb-8 border-b border-[#BFA76A]/20 pb-4">{t('powerbiPremium.millionaire.math.title')}</h3>
                    <ul className="space-y-6">
                       {t('powerbiPremium.millionaire.math.items').map((item, i) => (
                          <li key={i} className="text-xl font-bold text-white bg-black/40 p-4 rounded-lg border border-white/5">
                             {item}
                          </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 4 - ACTION */}
        <section className="py-24 bg-[#0A0A0A] relative">
           <div className="container mx-auto px-6 text-center">
              <div className="max-w-4xl mx-auto bg-[#111] p-12 rounded-3xl border border-[#BFA76A]/30 shadow-[0_0_50px_rgba(191,167,106,0.1)]">
                 <h2 className="text-4xl font-display font-bold text-white mb-4">{t('powerbiPremium.action.title')}</h2>
                 <p className="text-gray-400 mb-12 text-lg">{t('powerbiPremium.action.subtitle')}</p>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
                    {t('powerbiPremium.action.choices').map((choice, i) => (
                       <div key={i} className={`p-6 rounded-xl border ${i === 1 ? 'bg-[#BFA76A]/10 border-[#BFA76A]' : 'bg-[#0A0A0A] border-white/10'}`}>
                          <h4 className={`font-bold mb-2 ${i === 1 ? 'text-[#BFA76A]' : 'text-white'}`}>{choice.title}</h4>
                          <p className="text-sm text-gray-400">{choice.desc}</p>
                       </div>
                    ))}
                 </div>

                 <div className="flex flex-col gap-4 max-w-md mx-auto">
                    <Link to="/powerbi-advanced">
                       <Button className="w-full h-14 bg-[#BFA76A] text-black hover:bg-white text-lg font-bold">
                          {t('powerbiPremium.action.ctaPrimary')}
                       </Button>
                    </Link>
                    <Link to="/contact">
                       <Button variant="outline" className="w-full h-14 border-white/10 text-white hover:bg-white/10 text-lg">
                          {t('powerbiPremium.action.ctaTertiary')}
                       </Button>
                    </Link>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default PowerBIMarketingPage;