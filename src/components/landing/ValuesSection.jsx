import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const ValuesSection = () => {
  return (
    <section className="py-32 bg-[#0F0F0F] relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[#BFA76A]/5 skew-x-12 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#BFA76A] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
              À Propos de Nous
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-white mb-8 leading-tight">
              L'Excellence comme <br/>
              <span className="text-[#BFA76A]">Standard Opérationnel</span>
            </h2>
            <div className="space-y-6 text-gray-300 font-light text-lg leading-relaxed mb-10">
              <p>
                Chez Powalyze, nous ne nous contentons pas de gérer des projets. Nous créons les conditions de la réussite par une maîtrise absolue des données et des processus.
              </p>
              <p>
                Notre équipe d'experts seniors combine une expérience terrain approfondie avec une maîtrise des technologies les plus récentes pour délivrer une valeur tangible dès le premier jour.
              </p>
            </div>

            <div className="space-y-4 mb-10">
              {['Certification PMP® & Agile', 'Experts Data & Analytics', 'Focus ROI & Performance', 'Approche Sur-Mesure'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="text-[#BFA76A]" size={20} />
                  <span className="tracking-wide">{item}</span>
                </div>
              ))}
            </div>
            
            <a href="/a-propos" className="inline-flex items-center gap-2 px-8 py-4 border border-[#BFA76A] text-[#BFA76A] hover:bg-[#BFA76A] hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-bold rounded-sm group">
              Découvrir l'équipe <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-12">
                <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10 group">
                  <img alt="Digital Environment" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" src="https://assets.zyrosite.com/YrD4bMaM3ls0bZeJ/scene-d-environnement-numerique-06XZxMKVIxAv0ilB.jpg" />
                </div>
                <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10 group">
                   <img alt="UI/UX Design Interface" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-700" src="https://assets.zyrosite.com/YrD4bMaM3ls0bZeJ/representation-de-l-experience-utilisateur-et-conception-de-l-interface-rA6tBTmFMr3kxUIY.jpg" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10 group">
                   <img alt="Man analyzing data on screen" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-700" src="https://assets.zyrosite.com/YrD4bMaM3ls0bZeJ/un-homme-travaille-sur-un-ordinateur-avec-un-graphique-a-l-ecran-CTVdM5igs4jYlFnW.jpg" />
                </div>
                <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10 group">
                   <img alt="Diverse team meeting in office" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" src="https://assets.zyrosite.com/YrD4bMaM3ls0bZeJ/equipe-commerciale-multiethnique-assise-a-table-dans-un-centre-de-bureaux-parlant-du-projet-lors-d-une-reunion-dans-une-salle-d-audience-h6wla6MPVJEA5aFc.jpg" />
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#BFA76A] text-black p-6 rounded-lg shadow-xl z-20 max-w-[200px]">
              <p className="font-display text-4xl font-bold mb-1">15+</p>
              <p className="text-xs font-bold uppercase tracking-wider leading-relaxed">Années d'expérience cumulée</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;