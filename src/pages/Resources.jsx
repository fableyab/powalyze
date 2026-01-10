import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  BookOpen,
  FileText,
  Video,
  Download,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const Resources = () => {
  const guides = [
    {
      title: 'Guide du PMO moderne',
      description: 'Les 10 commandements pour structurer un PMO efficace',
      type: 'PDF',
      duration: '15 min',
      link: '#'
    },
    {
      title: 'Mettre en place des KPIs stratégiques',
      description: 'Mesurer ce qui compte vraiment pour votre organisation',
      type: 'PDF',
      duration: '12 min',
      link: '#'
    },
    {
      title: 'Risk Management : méthodes éprouvées',
      description: 'Identifier, évaluer et mitiger les risques projets',
      type: 'PDF',
      duration: '20 min',
      link: '#'
    }
  ];

  const videos = [
    {
      title: 'Démo complète Powalyze (10 min)',
      description: 'Découverte guidée de la plateforme',
      duration: '10:24',
      link: '#'
    },
    {
      title: 'Le Decision Engine en action',
      description: 'Comment l\'IA recommande les meilleures décisions',
      duration: '6:15',
      link: '#'
    },
    {
      title: 'Intégration Power BI',
      description: 'Connecter et exploiter vos rapports existants',
      duration: '8:42',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 px-4">
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 bg-[#D4AF37]/10 rounded-full mb-8 text-sm text-[#D4AF37]">
            <BookOpen className="w-4 h-4" />
            <span>Centre de ressources</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extralight mb-6 leading-tight">
            Guides, vidéos et <span className="text-[#D4AF37]">bonnes pratiques</span>
          </h1>
          
          <p className="text-xl text-white/60 mb-12 max-w-3xl mx-auto font-light">
            Découvrez nos ressources pour maîtriser le pilotage stratégique 
            et tirer le meilleur de Powalyze.
          </p>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-3xl font-extralight">Guides pratiques</h2>
            </div>
            <p className="text-white/60 font-light">
              Méthodologies et frameworks pour structurer votre PMO
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <div 
                key={index}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full">
                    <Download className="w-3 h-3" />
                    {guide.type}
                  </div>
                  <span className="text-xs text-white/50">{guide.duration}</span>
                </div>
                
                <h3 className="text-lg font-light mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-white/60 mb-4 font-light">
                  {guide.description}
                </p>
                
                <a 
                  href={guide.link}
                  className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#B89659] transition-colors text-sm font-medium"
                >
                  Télécharger
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Video className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-3xl font-extralight">Vidéos de démonstration</h2>
            </div>
            <p className="text-white/60 font-light">
              Découvrez Powalyze en action avec nos tutoriels vidéo
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div 
                key={index}
                className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/[0.07] hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-[#D4AF37]/20 to-transparent flex items-center justify-center border-b border-white/10">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="text-xs text-[#D4AF37] mb-3">{video.duration}</div>
                  <h3 className="text-lg font-light mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-4 font-light">
                    {video.description}
                  </p>
                  
                  <a 
                    href={video.link}
                    className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#B89659] transition-colors text-sm font-medium"
                  >
                    Regarder
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-extralight mb-4">
              Découvrez aussi notre <span className="text-[#D4AF37]">blog</span>
            </h2>
            <p className="text-white/60 mb-8 font-light max-w-2xl mx-auto">
              Articles d'experts, études de cas, tendances du marché : 
              restez à jour sur le pilotage stratégique.
            </p>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#000000]"
            >
              <Link to="/blog">
                Voir les articles
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Case Studies Link */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extralight mb-6">
            Inspirez-vous des <span className="text-[#D4AF37]">success stories</span>
          </h2>
          <p className="text-white/60 mb-10 text-lg font-light">
            Découvrez comment nos clients transforment leur pilotage stratégique
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium"
          >
            <Link to="/case-studies">
              Études de cas
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
