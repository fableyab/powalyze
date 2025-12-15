
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Phone, Mail, FileText, ChevronRight } from 'lucide-react';

const ServiceSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const services = [
    { name: "Pilotage IT", path: "/services/pilotage-it" },
    { name: "PMO Stratégique", path: "/services/pmo-strategique" },
    { name: "Data & Power BI", path: "/services/data-power-bi" },
    { name: "Automatisation & IA", path: "/services/automatisation-ia" },
    { name: "Portefeuilles & Priorisation", path: "/services/portefeuilles-priorisation" },
    { name: "Reporting Exécutif", path: "/services/reporting-executif" }
  ];

  return (
    <aside className="space-y-8 sticky top-32">
      {/* Navigation */}
      <Card className="bg-[#111] border-white/10 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-xs text-[#BFA76A]">Nos Services</h3>
        <nav className="space-y-2">
          {services.map((service) => (
            <Link key={service.path} to={service.path}>
              <div className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                currentPath === service.path 
                  ? 'bg-[#BFA76A] text-black font-bold' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}>
                <span>{service.name}</span>
                {currentPath === service.path && <ChevronRight size={16} />}
              </div>
            </Link>
          ))}
        </nav>
      </Card>

      {/* Quick Contact */}
      <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-white/10 p-6 rounded-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2">Besoin d'aide ?</h3>
          <p className="text-gray-400 text-sm mb-6">Nos experts sont disponibles pour discuter de vos projets.</p>
          
          <div className="space-y-4">
            <a href="tel:+41225550000" className="flex items-center gap-3 text-gray-300 hover:text-[#BFA76A] transition-colors">
              <div className="p-2 bg-white/5 rounded-full"><Phone size={16}/></div>
              <span className="font-mono text-sm">+33(0) 6 15 76 70 67</span>
            </a>
            <a href="mailto:contact@powalyze.ch" className="flex items-center gap-3 text-gray-300 hover:text-[#BFA76A] transition-colors">
              <div className="p-2 bg-white/5 rounded-full"><Mail size={16}/></div>
              <span className="font-mono text-sm">contact@powalyze.ch</span>
            </a>
          </div>

          <Link to="/contact" className="block mt-6">
            <Button className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold">
              Prendre RDV
            </Button>
          </Link>
        </div>
      </Card>

      {/* Download */}
      <Card className="bg-[#111] border-white/10 p-6 rounded-xl hover:border-[#BFA76A]/50 transition-colors cursor-pointer group">
        <div className="flex items-start gap-4">
           <div className="p-3 bg-[#BFA76A]/10 text-[#BFA76A] rounded-lg group-hover:bg-[#BFA76A] group-hover:text-black transition-colors">
              <FileText size={24} />
           </div>
           <div>
              <h4 className="font-bold text-white mb-1">Brochure Services</h4>
              <p className="text-xs text-gray-500 mb-2">PDF, 2.4 MB</p>
              <span className="text-xs text-[#BFA76A] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                 Télécharger <ArrowRight size={12} />
              </span>
           </div>
        </div>
      </Card>
    </aside>
  );
};

export default ServiceSidebar;
