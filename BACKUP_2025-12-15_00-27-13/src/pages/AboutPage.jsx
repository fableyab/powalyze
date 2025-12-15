
import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Award, Briefcase, Globe, Target, Code, 
  MapPin, Coffee, Wind, Music, FileText, CheckCircle2 
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import ContactSection from '@/components/landing/ContactSection';
import SEO from '@/components/SEO';
import { seoData } from '@/utils/seoData';
import Breadcrumb from '@/components/Breadcrumb';

const AboutPage = () => {
  const { t, language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const meta = seoData.about;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const experiences = [
    {
      role: "Founder & CEO",
      company: "Powalyze",
      period: "2024 - Present",
      desc: "Cabinet de conseil en PMO stratégique, Data Analytics et Gouvernance IT. Partenaire de choix pour les dirigeants d'entreprise et les CxOs.",
      details: [
        "Conseil en PMO Stratégique et Gouvernance IT",
        "Implémentation de solutions Business Intelligence",
        "Transformation numérique et automatisation intelligente"
      ]
    },
    {
      role: "Senior Strategic PMO Manager",
      company: "Gunvor Group Ltd",
      period: "2019 - 2024",
      desc: "Pilotage d'un portefeuille IT & Business complexe valorisé à 56M CHF, incluant 47 projets critiques.",
      details: [
        "Mise en place d'une gouvernance PMO globale et d'une structure de reporting exécutif",
        "Réduction des coûts opérationnels de 15% via optimisation du portefeuille",
        "Implémentation d'une tour de contrôle Power BI et d'une stratégie BI avancée",
        "Alignement stratégique et transformation organisationnelle"
      ]
    },
    {
      role: "Senior Project Manager & Program Director",
      company: "Airbus Helicopters",
      period: "2016 - 2019",
      desc: "Gestion de programmes critiques de transformation numérique dans un environnement multinational réglementé.",
      details: [
        "Direction de projets de transformation digitale industrielle (budgets 5-15M EUR)",
        "Coordination d'équipes transnationales (France, Allemagne, Maroc) en environnement strictement réglementé",
        "Déploiement de solutions SAP/HANA et infrastructure cloud sécurisée (DO-178B, ED-109)",
        "Gestion du changement organisationnel pour 500+ utilisateurs"
      ]
    },
    {
      role: "Project Leader & Operations Optimization",
      company: "Caterpillar Inc.",
      period: "2013 - 2016",
      desc: "Optimisation de la chaîne logistique mondiale et modernisation des systèmes d'information.",
      details: [
        "Amélioration de la traçabilité des pièces détachées (supply chain 100+ sites)",
        "Gestion du changement pour 200+ utilisateurs avec adoption élevée",
        "Lean Six Sigma Green Belt certification et projets d'optimisation de 20%+",
        "Implémentation de solutions ERP et harmonisation processus multilingues"
      ]
    }
  ];

  const skills = [
    { name: "Project Management (PMP®, Prince2®)", level: 95 },
    { name: "PMO Strategy & Governance (COBIT, ITIL)", level: 92 },
    { name: "Power BI & Advanced Data Analytics", level: 94 },
    { name: "Strategic Planning & Roadmapping", level: 90 },
    { name: "Risk Management & Compliance", level: 88 },
    { name: "Digital Transformation Leadership", level: 89 },
    { name: "Agile at Scale (SAFe, LeSS)", level: 85 },
    { name: "Business Intelligence Architecture", level: 91 }
  ];

  const languages = [
    { lang: "Français", level: "Natif" },
    { lang: "Anglais", level: "C2 - Expert" },
    { lang: "Norvégien", level: "C1 - Avancé" },
    { lang: "Suédois", level: "B2 - Intermédiaire" },
    { lang: "Danois", level: "B2 - Intermédiaire" }
  ];

  const breadcrumbs = [
    { label: t('nav.about'), path: null }
  ];

  return (
    <>
      <SEO 
        title={meta.title[language]}
        description={meta.description[language]}
        keywords={meta.keywords[language]}
        image={meta.image}
        breadcrumbs={breadcrumbs}
      />
      
      <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden">
          <div className="container mx-auto max-w-7xl">
             <Breadcrumb items={breadcrumbs} />
          </div>
          
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#111] to-transparent pointer-events-none" />
          
          <div className="container mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <span className="text-[#BFA76A] font-bold uppercase tracking-[0.2em] mb-4 block text-sm">
                Fondateur & CEO
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                Fabrice <br/><span className="text-[#BFA76A]">Fays</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed mb-8 max-w-xl">
                Fondateur de Powalyze. Expert en PMO Stratégique, Data Analytics et Gouvernance IT. 
                20 ans de transformation d'organisations complexes (Powalyze, Gunvor, Airbus, Caterpillar) 
                en machines de delivery efficaces et orientées résultats. PMO Généraliste, Data Analyst & Power BI Expert.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-[#1C1C1C] px-4 py-2 rounded-full border border-white/10">
                  <MapPin size={16} className="text-[#BFA76A]" />
                  <span className="text-sm">Genève, Lausanne, Suisse</span>
                </div>
                <div className="flex items-center gap-2 bg-[#1C1C1C] px-4 py-2 rounded-full border border-white/10">
                  <MapPin size={16} className="text-[#BFA76A]" />
                  <span className="text-sm">Belfast, La Réunion, Norvège, Suède</span>
                </div>
                <div className="flex items-center gap-2 bg-[#1C1C1C] px-4 py-2 rounded-full border border-white/10">
                  <Briefcase size={16} className="text-[#BFA76A]" />
                  <span className="text-sm">20 ans d'expérience</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="relative aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10" />
                <img 
                  src="/images/fabrice-fays.jpg" 
                  alt="Fabrice Fays - Founder & CEO" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop";
                  }}
                />
                
                {/* Floating Stats */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 z-20 grid grid-cols-2 gap-4"
                >
                   <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg border border-[#BFA76A]/30">
                      <div className="text-2xl font-bold text-[#BFA76A]">56M</div>
                      <div className="text-[10px] uppercase text-gray-400">Budget Géré (CHF)</div>
                   </div>
                   <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg border border-[#BFA76A]/30">
                      <div className="text-2xl font-bold text-[#BFA76A]">47</div>
                      <div className="text-[10px] uppercase text-gray-400">Projets Livrés</div>
                   </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Career Timeline */}
        <section className="py-20 bg-[#0F0F0F]">
           <div className="container mx-auto max-w-5xl px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                 <h2 className="text-3xl font-display font-bold text-white mb-4">Parcours & <span className="text-[#BFA76A]">Réalisations</span></h2>
                 <p className="text-gray-400">Une expertise forgée au sein de multinationales exigeantes.</p>
              </motion.div>

              <div className="space-y-12 relative before:absolute before:left-[19px] md:before:left-1/2 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#222]">
                 {experiences.map((exp, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex flex-col md:flex-row gap-8 relative ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                       <div className="absolute left-[10px] md:left-1/2 top-0 w-5 h-5 bg-[#BFA76A] rounded-full border-4 border-[#0F0F0F] z-10 -translate-x-1/2" />
                       
                       <div className="flex-1 md:w-1/2">
                          <div className={`ml-10 md:ml-0 p-6 bg-[#161616] rounded-xl border border-[#222] hover:border-[#BFA76A]/30 transition-colors ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                             <div className="text-[#BFA76A] font-bold text-sm mb-1">{exp.period}</div>
                             <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                             <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">{exp.company}</div>
                             <p className="text-gray-300 text-sm mb-4 leading-relaxed">{exp.desc}</p>
                             <ul className={`space-y-2 ${i % 2 === 0 ? '' : 'md:flex md:flex-col md:items-end'}`}>
                                {exp.details.map((d, j) => (
                                   <li key={j} className="flex items-center gap-2 text-xs text-gray-500">
                                      {i % 2 === 0 && <CheckCircle2 size={12} className="text-[#BFA76A]" />}
                                      {d}
                                      {i % 2 !== 0 && <CheckCircle2 size={12} className="text-[#BFA76A]" />}
                                   </li>
                                ))}
                             </ul>
                          </div>
                       </div>
                       <div className="hidden md:block flex-1"></div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Expertise Grid */}
        <section className="py-20 px-6 bg-[#0A0A0A] border-t border-[#1C1C1C]">
           <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 
                 {/* Hard Skills */}
                 <div className="lg:col-span-1">
                    <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                       <Code className="text-[#BFA76A]" /> Compétences Clés
                    </h3>
                    <div className="space-y-6">
                       {skills.map((skill, i) => (
                          <div key={i}>
                             <div className="flex justify-between text-sm text-gray-300 mb-2">
                                <span>{skill.name}</span>
                                <span className="text-[#BFA76A]">{skill.level}%</span>
                             </div>
                             <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  className="h-full bg-[#BFA76A]"
                                />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* Certifications */}
                 <div className="lg:col-span-1">
                    <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                       <Award className="text-[#BFA76A]" /> Certifications
                    </h3>
                    <div className="space-y-4">
                       {[
                         { name: "MCSE (Microsoft Certified Solutions Expert)", org: "Microsoft", year: "2023", specialty: "Enterprise Infrastructure" },
                         { name: "PMP® (Project Management Professional)", org: "Project Management Institute", year: "2015" },
                         { name: "Prince2 Practitioner - Enterprise Project Management", org: "Axelos", year: "2016", specialty: "Portfolio & Programme Management Methodologies" },
                         { name: "Lean Six Sigma Green Belt", org: "International Association", year: "2014" },
                         { name: "Professional Scrum Master (PSM)", org: "Scrum.org", year: "2018" },
                         { name: "Microsoft Certified: Power BI Data Analyst", org: "Microsoft", year: "2021" },
                         { name: "COBIT 2019 Foundation", org: "ISACA", year: "2022" }
                       ].map((cert, i) => (
                          <div key={i} className="flex gap-4 p-4 bg-[#111] rounded-lg border border-[#222] hover:border-[#BFA76A]/30 transition-colors">
                             <div className="mt-1"><Award size={16} className="text-[#BFA76A]" /></div>
                             <div>
                                <div className="font-bold text-white text-sm">{cert.name}</div>
                                <div className="text-xs text-gray-400">{cert.org} • {cert.year}</div>
                                {cert.specialty && <div className="text-xs text-[#BFA76A]/70 mt-1">{cert.specialty}</div>}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* Languages & Interests */}
                 <div className="lg:col-span-1">
                    <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                       <Globe className="text-[#BFA76A]" /> Langues & Passions
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                       {languages.map((l, i) => (
                          <div key={i} className="bg-[#111] p-3 rounded text-center border border-[#222]">
                             <div className="font-bold text-white text-sm">{l.lang}</div>
                             <div className="text-[10px] text-gray-500 uppercase">{l.level}</div>
                          </div>
                       ))}
                    </div>
                    
                    <div className="flex gap-4 justify-center pt-6 border-t border-[#222]">
                       <div className="p-3 bg-[#111] rounded-full text-gray-400 hover:text-[#BFA76A] transition-colors" title="Guitare"><Music size={20} /></div>
                       <div className="p-3 bg-[#111] rounded-full text-gray-400 hover:text-[#BFA76A] transition-colors" title="Cuisine du Monde"><Coffee size={20} /></div>
                       <div className="p-3 bg-[#111] rounded-full text-gray-400 hover:text-[#BFA76A] transition-colors" title="Windsurf"><Wind size={20} /></div>
                    </div>
                 </div>

              </div>
           </div>
        </section>

        {/* CV Download CTA */}
        <section className="py-20 bg-[#0F0F0F] text-center">
           <div className="container mx-auto px-6">
              <h2 className="text-2xl text-white font-light mb-8">Besoin de plus de détails ?</h2>
              <div className="flex justify-center gap-6">
                 <a href="https://www.linkedin.com/in/fabrice-fays/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 bg-[#BFA76A] text-black font-bold uppercase tracking-widest hover:bg-white transition-all rounded-sm">
                    <FileText size={18} /> Voir mon profil LinkedIn
                 </a>
              </div>
           </div>
        </section>

        <ContactSection />
        <FooterSection />
      </div>
    </>
  );
};

export default AboutPage;
