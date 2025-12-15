import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard } from 'lucide-react';

const DashboardPreviewSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#111] relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
       
       <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <span className="text-[#BFA76A] font-bold uppercase tracking-widest text-xs mb-3 block">{t('home.dashboardPreview.subtitle')}</span>
             <h2 className="text-4xl font-display font-bold text-white mb-6">{t('home.dashboardPreview.title')}</h2>
             <p className="text-gray-400 text-lg">{t('home.dashboardPreview.desc')}</p>
          </div>

          <div className="relative mx-auto max-w-6xl">
             <div className="absolute -inset-1 bg-gradient-to-r from-[#BFA76A] to-[#F2C811] opacity-20 blur rounded-xl"></div>
             <div className="relative bg-[#0A0A0A] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                <img 
                   src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" 
                   alt="Dashboard Preview" 
                   className="w-full opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                   <div className="flex gap-4">
                      <Link to="/powerbi-demo">
                         <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold h-12 px-8">
                            <LayoutDashboard className="mr-2" size={18} /> {t('home.dashboardPreview.ctaDemo')}
                         </Button>
                      </Link>
                      <Link to="/contact">
                         <Button variant="outline" className="border-white text-white hover:bg-white/10 h-12 px-8">
                            {t('home.dashboardPreview.ctaImpl')}
                         </Button>
                      </Link>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

export default DashboardPreviewSection;