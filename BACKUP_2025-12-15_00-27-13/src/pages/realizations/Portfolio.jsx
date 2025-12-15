import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import SEO from '@/components/SEO';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import PDFExportButton from '@/components/ui/PDFExportButton';
import { ArrowRight } from 'lucide-react';

const Portfolio = () => {
  const { t } = useLanguage();
  
  const projects = [
    {
      title: "Global Cloud Migration",
      client: "Multinational Pharma",
      desc: "Migration of 200+ applications to Azure with 0 downtime. Full coordination of technical teams across 3 continents.",
      tags: ["Azure", "PMO", "Migration"],
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Digital Workplace Transformation",
      client: "Swiss Banking Group",
      desc: "Deployment of M365 and Teams for 5000+ employees. Governance definition, security compliance, and change management.",
      tags: ["M365", "Change Management", "Security"],
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Industrial IoT Dashboarding",
      client: "Manufacturing Leader",
      desc: "Real-time production monitoring across 4 factories. Integration of OT data into IT dashboards for executive decision making.",
      tags: ["IoT", "Data", "PowerBI"],
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO title={t('realizations.title')} description={t('realizations.intro')} />
      <Navbar />

      <main className="pt-40 pb-20 px-6 container mx-auto" id="portfolio-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[#BFA76A] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
              {t('realizations.subtitle')}
            </span>
            <h1 className="text-5xl font-display text-white mb-4">{t('realizations.title')}</h1>
            <p className="text-gray-400 max-w-xl">{t('realizations.intro')}</p>
          </div>
          <PDFExportButton targetId="portfolio-content" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-[#BFA76A]/50 transition-all duration-500"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold text-[#BFA76A] border border-[#BFA76A]/20 px-2 py-1 rounded-sm bg-[#BFA76A]/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#BFA76A] transition-colors">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-4 font-mono">{project.client}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>
                <div className="flex items-center text-[#BFA76A] text-sm font-bold uppercase tracking-wider group-hover:gap-2 transition-all cursor-pointer">
                  {t('common.readMore')} <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Portfolio;