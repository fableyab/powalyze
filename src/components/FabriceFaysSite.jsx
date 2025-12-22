import React, { useState } from 'react';
import { Menu, X, Mail, Linkedin, MapPin, Phone, CheckCircle2, TrendingUp, Users, DollarSign, AlertTriangle, Calendar, BarChart3, PieChart, ArrowDown } from 'lucide-react';

const FabriceFaysSite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: "🎯",
      title: "Pilotage IT",
      description: "Optimisez votre infrastructure IT avec une gestion stratégique et une gouvernance efficace pour soutenir vos objectifs métier.",
      features: ["PMO Stratégique", "Gouvernance IT", "Gestion des risques", "Alignement stratégique"]
    },
    {
      icon: "📊",
      title: "Data & Power BI",
      description: "Transformez vos données en insights actionnables avec nos solutions de business intelligence et de visualisation avancée.",
      features: ["Dashboards Power BI", "Modélisation de données", "Data Analytics", "Reporting exécutif"]
    },
    {
      icon: "🤖",
      title: "Automatisation & IA",
      description: "Automatisez vos processus métier et exploitez l'IA pour améliorer l'efficacité opérationnelle et la prise de décision.",
      features: ["Process Mining", "RPA & Automatisation", "AI Integration", "Optimisation continue"]
    },
    {
      icon: "📁",
      title: "Portefeuilles & Priorisation",
      description: "Gérez efficacement votre portefeuille de projets avec une priorisation intelligente basée sur la valeur métier.",
      features: ["Portfolio Management", "Priorisation stratégique", "Allocation ressources", "ROI Analysis"]
    },
    {
      icon: "📈",
      title: "Reporting Exécutif",
      description: "Fournissez aux décideurs des rapports clairs et actionnables pour une gouvernance d'entreprise optimale.",
      features: ["Executive Dashboards", "KPI Monitoring", "Business Intelligence", "Strategic Insights"]
    }
  ];

  const stats = [
    { value: "15+", label: "Années d'Expérience" },
    { value: "200+", label: "Projets Pilotés" },
    { value: "95%", label: "Taux de Réussite" },
    { value: "🇫🇷🇨🇭", label: "Zone Transfrontalière" }
  ];

  const differentiators = [
    { 
      icon: "💡", 
      title: "Clarté Radicale", 
      desc: "Finis les rapports illisibles. Nous traduisons la complexité technique en décisions business claires." 
    },
    { 
      icon: "⚡", 
      title: "Exécution Chirurgicale", 
      desc: "Pas de théorie. Nous sommes des opérationnels qui sécurisent vos livrables critiques." 
    },
    { 
      icon: "🛡️", 
      title: "Indépendance Totale", 
      desc: "Nos recommandations servent vos intérêts, pas ceux des grands éditeurs de logiciels." 
    },
    { 
      icon: "🎯", 
      title: "Vision 360°", 
      desc: "Nous connectons la stratégie (C-Level) avec la réalité terrain (Ingénierie) sans perte de signal." 
    }
  ];

  const dashboardPreviews = [
    {
      title: "Suivi de Projet",
      status: "On-Track",
      statusColor: "text-green-400",
      icon: <Calendar className="w-6 h-6" />,
      metrics: [
        { label: "Total Projects", value: "47" },
        { label: "On-Time Delivery", value: "92%" },
        { label: "Resource Util.", value: "87%" },
        { label: "Budget Spent", value: "CHF 8.3M" }
      ]
    },
    {
      title: "Gestion des Ressources",
      status: "Attention",
      statusColor: "text-yellow-400",
      icon: <Users className="w-6 h-6" />,
      metrics: [
        { label: "Total Resources", value: "234" },
        { label: "Avg Utilization", value: "87%" },
        { label: "Availability", value: "13%" },
        { label: "Skill Gaps", value: "12" }
      ]
    },
    {
      title: "Contrôle Budgétaire",
      status: "Budget Burn-down",
      statusColor: "text-blue-400",
      icon: <DollarSign className="w-6 h-6" />,
      metrics: [
        { label: "Total Budget", value: "CHF 12.5M" },
        { label: "Spent (66%)", value: "CHF 8.3M" },
        { label: "Remaining", value: "CHF 4.2M" },
        { label: "Forecast", value: "CHF 12.8M" }
      ]
    },
    {
      title: "Matrice des Risques",
      status: "3 Critical",
      statusColor: "text-red-400",
      icon: <AlertTriangle className="w-6 h-6" />,
      metrics: [
        { label: "Active Risks", value: "23" },
        { label: "Critical Risks", value: "3" },
        { label: "Issues", value: "15" },
        { label: "Resolution Rate", value: "89%" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-[#D4AF37]/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#C9A561] flex items-center justify-center text-black text-xl font-black">
                P
              </div>
              <div>
                <div className="font-bold text-lg">POWALYZE</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">PMO & Business Intelligence</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#accueil" className="text-sm font-medium hover:text-[#D4AF37] transition">Accueil</a>
              <a href="#services" className="text-sm font-medium hover:text-[#D4AF37] transition">Services</a>
              <a href="#expertise" className="text-sm font-medium hover:text-[#D4AF37] transition">Expertise</a>
              <a href="/pmo-workspace" className="text-sm font-medium hover:text-[#D4AF37] transition">Espace Client</a>
              <a href="#contact" className="px-5 py-2 bg-[#D4AF37] text-black rounded-lg font-semibold hover:bg-[#C9A561] transition">
                Contact
              </a>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-3 space-y-2">
              <a href="#accueil" className="block py-2 hover:text-[#D4AF37] transition">Accueil</a>
              <a href="#services" className="block py-2 hover:text-[#D4AF37] transition">Services</a>
              <a href="/pmo-workspace" className="block py-2 hover:text-[#D4AF37] transition">Espace Client</a>
              <a href="#expertise" className="block py-2 hover:text-[#D4AF37] transition">Expertise</a>
              <a href="#contact" className="block py-2 hover:text-[#D4AF37] transition">Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-6 py-3 mb-8">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
              <span className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider">CONSEIL SUISSE PREMIUM</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              L'Art du{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1]">
                Pilotage Stratégique
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              PMO + Power BI + Data Analytics : Transformez Vos Projets en Succès
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Excellence Suisse en pilotage stratégique et business intelligence. Basé en Haute-Savoie, zone transfrontalière France-Suisse.
            </p>

            <div className="flex gap-6 justify-center flex-wrap mb-16">
              <a
                href="/pmo-workspace"
                className="bg-gradient-to-r from-[#D4AF37] to-[#C9A561] text-black px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all"
              >
                Voir la Solution PMO
              </a>
              <a
                href="#contact"
                className="border-2 border-[#D4AF37] text-[#D4AF37] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                Nous contacter
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-4xl font-black text-[#D4AF37] mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-center gap-2 text-gray-400 animate-bounce">
              <span className="text-xs uppercase tracking-wider">SCROLL</span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Nos <span className="text-[#D4AF37]">Services</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Des solutions complètes pour transformer votre pilotage stratégique et optimiser vos projets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#D4AF37]/10 group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-[#D4AF37]">{service.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que Powalyze change */}
      <section id="expertise" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ce que <span className="text-[#D4AF37]">Powalyze</span> change pour vous
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              La plupart des cabinets vous vendent des ressources. Nous vous vendons des résultats. Powalyze intervient là où les méthodes classiques échouent : dans les zones de haute incertitude et de forte complexité technique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="flex gap-4 p-8 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-[#D4AF37]/50 transition-all group">
                <div className="text-5xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-[#D4AF37]">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Previews Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Une vision <span className="text-[#D4AF37]">claire et temps réel</span> de votre portefeuille
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Nos tableaux de bord Power BI offrent une visibilité complète sur vos projets, ressources, budgets et risques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dashboardPreviews.map((dashboard, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all hover:scale-105 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37]">
                      {dashboard.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{dashboard.title}</h3>
                  </div>
                  <span className={`text-sm font-semibold ${dashboard.statusColor}`}>
                    {dashboard.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {dashboard.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-black/40 p-4 rounded-lg border border-gray-700">
                      <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                      <div className="text-xl font-bold text-[#D4AF37]">{metric.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Voir le dashboard complet</span>
                    <a href="/pmo-workspace" className="text-[#D4AF37] hover:text-[#F4E4C1] transition flex items-center gap-1">
                      Accéder <ArrowDown className="w-4 h-4 rotate-[-90deg]" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Prêt à transformer votre <span className="text-[#D4AF37]">PMO</span> ?
          </h2>
          <p className="text-lg text-gray-400 mb-12">
            Découvrez comment Powalyze peut structurer, suivre et optimiser vos projets stratégiques en moins de 30 jours.
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href="#contact"
              className="bg-gradient-to-r from-[#D4AF37] to-[#C9A561] text-black px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all"
            >
              Démarrer Gratuitement
            </a>
            <a
              href="/pmo-workspace"
              className="border-2 border-[#D4AF37] text-[#D4AF37] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              Voir la Solution PMO
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Parlons de <span className="text-[#D4AF37]">Votre Projet</span>
          </h2>
          <p className="text-lg text-gray-400 mb-12">
            Vous avez un projet IT, besoin d'un PMO ou d'expertise Power BI ? Contactons-nous.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-[#D4AF37]/50 transition-all">
              <Mail className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <div className="font-bold text-[#D4AF37] mb-2">Email</div>
              <a href="mailto:fabrice.fays@outlook.fr" className="text-gray-300 hover:text-[#D4AF37] text-sm">
                fabrice.fays@outlook.fr
              </a>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-[#D4AF37]/50 transition-all">
              <Linkedin className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <div className="font-bold text-[#D4AF37] mb-2">LinkedIn</div>
              <a href="#" className="text-gray-300 hover:text-[#D4AF37] text-sm">
                Fabrice Fays
              </a>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-[#D4AF37]/50 transition-all">
              <MapPin className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <div className="font-bold text-[#D4AF37] mb-2">Localisation</div>
              <div className="text-gray-300 text-sm">Haute-Savoie / Genève</div>
            </div>
          </div>

          <a
            href="mailto:fabrice.fays@outlook.fr"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#C9A561] text-black px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all"
          >
            <Mail className="w-5 h-5" />
            M'envoyer un email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-[#D4AF37]/20 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Branding */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#C9A561] flex items-center justify-center text-black text-xl font-black">
                  P
                </div>
                <div className="font-bold text-xl">Powalyze</div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Excellence Suisse en pilotage stratégique et business intelligence.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-[#D4AF37]">SOLUTIONS</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-[#D4AF37] transition">Strategic PMO</a></li>
                <li><a href="/pmo-workspace" className="hover:text-[#D4AF37] transition">PMO Demo</a></li>
                <li><a href="/pmo-workspace" className="hover:text-[#D4AF37] transition">Executive Dashboard</a></li>
                <li><a href="#services" className="hover:text-[#D4AF37] transition">Power BI Advanced</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-[#D4AF37]">RESOURCES</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-[#D4AF37] transition">Services</a></li>
                <li><a href="#expertise" className="hover:text-[#D4AF37] transition">Expertise</a></li>
                <li><a href="/pmo-workspace" className="hover:text-[#D4AF37] transition">Live Demo</a></li>
                <li><a href="#contact" className="hover:text-[#D4AF37] transition">FAQ</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-[#D4AF37]">CONTACT</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#D4AF37]" />
                  <div>
                    <div>Genève, Suisse</div>
                    <div>Lausanne, Suisse</div>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0 text-[#D4AF37]" />
                  <a href="tel:+41225550000" className="hover:text-[#D4AF37] transition">+41 22 555 00 00</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0 text-[#D4AF37]" />
                  <a href="mailto:contact@powalyze.ch" className="hover:text-[#D4AF37] transition">contact@powalyze.ch</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2025 Powalyze. All rights reserved.</p>
            <p className="mt-2">Swiss Excellence. Global Reach.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FabriceFaysSite;
