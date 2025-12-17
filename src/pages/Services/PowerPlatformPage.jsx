import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Database, Check, ArrowRight, BarChart3, Zap, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PowerPlatformPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Helmet>
        <title>Microsoft Power Platform | Powalyze</title>
        <meta name="description" content="Power BI, Power Automate, Power Apps - Exploitez tout l'écosystème Microsoft pour vos dashboards et workflows." />
      </Helmet>
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Microsoft <span className="text-[#F2C811]">Power Platform</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Power BI, Power Automate, Power Apps et Power Virtual Agents. Exploitez tout l'écosystème Microsoft pour créer des dashboards interactifs, automatiser les workflows et développer des apps low-code.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { 
                icon: BarChart3, 
                title: 'Power BI Premium', 
                desc: 'Dashboards temps réel avec 100+ sources de données. Embedded analytics dans vos portails.',
                color: '#F2C811'
              },
              { 
                icon: Zap, 
                title: 'Power Automate', 
                desc: 'Automatisation de workflows : approbations, notifications, escalations, intégrations API.',
                color: '#0066FF'
              },
              { 
                icon: Bot, 
                title: 'Power Apps + AI', 
                desc: 'Applications métier low-code avec AI Builder pour OCR, prédictions et chatbots.',
                color: '#742774'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all">
                <div className="w-14 h-14 rounded-xl bg-black/50 flex items-center justify-center mb-6">
                  <feature.icon size={28} style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Integration Examples */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-12 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Intégrations Natives</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {['SharePoint', 'Teams', 'Dynamics 365', 'Azure SQL', 'Dataverse', 'Office 365', 'OneDrive', 'Exchange'].map((service, i) => (
                <div key={i} className="flex items-center gap-3 bg-black/30 p-4 rounded-lg">
                  <Check size={18} className="text-[#F2C811]" />
                  <span className="text-sm font-semibold">{service}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link to="/powerbi-showcase">
              <Button className="h-14 px-10 bg-[#F2C811] text-black hover:bg-[#FFD700] font-bold text-lg">
                Voir nos dashboards Power BI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default PowerPlatformPage;
