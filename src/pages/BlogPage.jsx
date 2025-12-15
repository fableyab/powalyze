import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const BlogPage = () => {
  const posts = [
    {
       title: "PMO Stratégique : Comment Transformer Votre Bureau de Projets en Moteur de Croissance",
       excerpt: "Découvrez comment un PMO moderne ne se contente plus de surveiller les projets, mais devient le centre névralgique de création de valeur. Avec des exemples concrets, méthodologies éprouvées et retours d'expérience de grandes entreprises.",
       date: "10 Déc 2024",
       category: "Stratégie & PMO",
       slug: "pmo-strategique-transformation-2025",
       author: "Fabrice Fays",
       readTime: "12 min"
    },
    {
       title: "Power BI & DAX : 10 Techniques Avancées pour des Dashboards Exécutifs Impactants",
       excerpt: "Maîtrisez les patterns DAX avancés, l'optimisation des modèles de données et les meilleures pratiques de visualisation. Créez des tableaux de bord qui transforment vraiment la prise de décision dans votre organisation.",
       date: "5 Déc 2024",
       category: "Data & Analytics",
       slug: "power-bi-dax-techniques-avancees",
       author: "Fabrice Fays",
       readTime: "15 min"
    },
    {
       title: "Gouvernance IT en 2025 : Équilibrer Innovation et Conformité à l'Ère de l'IA",
       excerpt: "La gouvernance IT doit évoluer pour supporter l'innovation rapide tout en garantissant sécurité, conformité RGPD et maîtrise des risques. Découvrez les frameworks COBIT 2019 et ITIL 4 appliqués aux défis modernes.",
       date: "28 Nov 2024",
       category: "Gouvernance & Risk",
       slug: "gouvernance-it-innovation-conformite",
       author: "Fabrice Fays",
       readTime: "10 min"
    },
    {
       title: "Automatisation Intelligente : Réduire de 40% le Temps Administratif de Vos PMOs",
       excerpt: "L'IA générative et l'automatisation transforment radicalement le travail des PMOs. Synthèse automatique de réunions, détection prédictive de risques, génération de rapports : découvrez les cas d'usage qui fonctionnent vraiment.",
       date: "20 Nov 2024",
       category: "IA & Automatisation",
       slug: "automatisation-ia-pmo-efficacite",
       author: "Fabrice Fays",
       readTime: "14 min"
    },
    {
       title: "Portfolio Management : Prioriser dans un Monde de Ressources Limitées",
       excerpt: "Face à des budgets contraints et des ressources rares, comment choisir les bons projets ? Méthodes de scoring, weighted shortest job first, value vs effort matrix : un guide pratique pour optimiser votre portefeuille.",
       date: "12 Nov 2024",
       category: "Portfolio & Priorisation",
       slug: "portfolio-management-priorisation-methodes",
       author: "Fabrice Fays",
       readTime: "11 min"
    },
    {
       title: "Executive Reporting : Les 7 KPIs Critiques que Chaque C-Suite Doit Suivre",
       excerpt: "Quels indicateurs comptent vraiment pour le comité exécutif ? Budget vs Actuel, Vélocité de delivery, Santé du portefeuille, ROI prévu vs réalisé : construisez des rapports qui facilitent les décisions stratégiques.",
       date: "3 Nov 2024",
       category: "Reporting & KPIs",
       slug: "executive-reporting-kpis-critiques",
       author: "Fabrice Fays",
       readTime: "9 min"
    },
    {
       title: "Transformation Digitale : Les 5 Erreurs Fatales qui Coulent 70% des Projets",
       excerpt: "Pourquoi tant de transformations digitales échouent-elles ? Manque d'alignement stratégique, résistance au changement, sous-estimation de la data... Analyse des échecs les plus fréquents et comment les éviter.",
       date: "25 Oct 2024",
       category: "Transformation",
       slug: "transformation-digitale-erreurs-fatales",
       author: "Fabrice Fays",
       readTime: "13 min"
    },
    {
       title: "Data Governance : Construire une Architecture de Données Single Source of Truth",
       excerpt: "La qualité des décisions dépend de la qualité des données. Découvrez comment architecturer un data warehouse moderne, implémenter la gouvernance des données et garantir la fiabilité de vos analytics.",
       date: "18 Oct 2024",
       category: "Data & Gouvernance",
       slug: "data-governance-single-source-truth",
       author: "Fabrice Fays",
       readTime: "16 min"
    },
    {
       title: "Agile à l'Échelle : Quand SAFe, LeSS et Spotify Model Rencontrent l'Entreprise Réelle",
       excerpt: "Scaling Agile dans une organisation de 500+ personnes est un défi complexe. Comparaison pragmatique des frameworks, retours d'expérience Airbus et Gunvor, et conseils pour adapter plutôt que copier-coller.",
       date: "10 Oct 2024",
       category: "Agile & Méthodes",
       slug: "agile-scale-safe-less-spotify-entreprise",
       author: "Fabrice Fays",
       readTime: "12 min"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
         <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-center">
               Le Blog <span className="text-[#BFA76A]">Powalyze</span>
            </h1>
            <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
               Insights stratégiques, retours d'expérience terrain et guides pratiques pour transformer votre organisation. 
               Du PMO stratégique à l'IA, en passant par la data et la gouvernance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {posts.map((post, i) => (
                  <Card key={i} className="bg-[#111] border-white/10 p-0 overflow-hidden flex flex-col hover:border-[#BFA76A]/50 transition-all hover:shadow-[0_0_30px_rgba(191,167,106,0.15)] group">
                     <div className="h-48 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center border-b border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(191,167,106,0.1),transparent_50%)] group-hover:scale-110 transition-transform duration-700" />
                        <span className="text-[#BFA76A] font-bold text-sm opacity-80 uppercase tracking-wider relative z-10">{post.category}</span>
                     </div>
                     <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                           <div className="flex items-center gap-2">
                              <Calendar size={12}/> {post.date}
                           </div>
                           <span className="text-gray-600">{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white leading-snug group-hover:text-[#BFA76A] transition-colors">{post.title}</h3>
                        <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                           <span className="text-xs text-gray-600">{post.author}</span>
                           <Link to={`/blog/${post.slug}`}>
                              <Button variant="ghost" className="text-[#BFA76A] hover:text-white hover:bg-[#BFA76A]/10 px-4 py-2 text-sm">
                                 Lire <ArrowRight size={14} className="ml-1"/>
                              </Button>
                           </Link>
                        </div>
                     </div>
                  </Card>
               ))}
            </div>

            {/* Featured Categories */}
            <div className="mt-20 pt-20 border-t border-white/10">
               <h2 className="text-3xl font-bold mb-10 text-center">Explorer par <span className="text-[#BFA76A]">Thématique</span></h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {['Stratégie & PMO', 'Data & Analytics', 'IA & Automatisation', 'Gouvernance & Risk'].map((cat, i) => (
                     <div key={i} className="p-6 bg-[#111] border border-white/10 rounded-lg text-center hover:border-[#BFA76A]/50 transition-all cursor-pointer group">
                        <div className="text-4xl font-bold text-[#BFA76A]/20 group-hover:text-[#BFA76A]/40 transition-colors mb-2">{['01', '02', '03', '04'][i]}</div>
                        <div className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{cat}</div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default BlogPage;