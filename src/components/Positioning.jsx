
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Users, TrendingUp } from 'lucide-react';

const Positioning = ({ language }) => {
  const translations = {
    fr: {
      title: 'Positionnement Powalyze',
      subtitle: 'Ce qui nous différencie',
      blocks: [
        {
          icon: Award,
          title: 'Nous vendons des résultats, pas des ressources',
          content: 'Contrairement aux SSII traditionnelles qui facturent au jour/homme, nous nous engageons sur des résultats mesurables. Notre succès est indexé sur le vôtre : réduction de coûts, accélération décisionnelle, amélioration de performance. Nous ne gonflons pas artificiellement les équipes ni les délais. Chaque euro investi doit générer un retour tangible et chiffré.'
        },
        {
          icon: Target,
          title: 'Nous transformons l\'incertitude et la complexité en clarté',
          content: 'Les projets IT stratégiques sont par nature complexes et incertains. C\'est précisément notre terrain de jeu. Là où d\'autres consultants se perdent dans des méthodologies rigides ou des livrables théoriques, nous apportons structure, visibilité et agilité. Nous naviguons dans le brouillard pour vous, et nous transformons le chaos en feuille de route exécutable.'
        },
        {
          icon: Users,
          title: 'Nous traduisons la complexité technique en décisions business',
          content: 'Le langage technique est notre langue maternelle, mais nous parlons couramment le business. Nous servons de pont entre vos équipes IT et vos décideurs stratégiques. Chaque dashboard, chaque analyse, chaque recommandation est conçue pour être immédiatement actionnable par un CFO, un CEO ou un Board. Pas de jargon. Pas de slides PowerPoint creux. Juste des insights clairs, contextualisés, et orientés action.'
        },
        {
          icon: TrendingUp,
          title: 'Nous connectons la stratégie avec la réalité terrain',
          content: 'Trop de stratégies brillantes échouent à l\'exécution. Nous sommes obsédés par l\'alignement entre vision stratégique et implémentation opérationnelle. Nos PMO ne sont pas des tours d\'ivoire : ils sont ancrés dans le quotidien des équipes, ils facilitent l\'exécution, et ils garantissent que chaque projet sert réellement les priorités business. Nous ne dessinons pas de slides, nous livrons des transformations.'
        }
      ]
    },
    en: {
      title: 'Powalyze Positioning',
      subtitle: 'What sets us apart',
      blocks: [
        {
          icon: Award,
          title: 'We sell results, not resources',
          content: 'Unlike traditional consulting firms that charge per man/day, we commit to measurable results. Our success is indexed to yours: cost reduction, decision acceleration, performance improvement. We don\'t artificially inflate teams or timelines. Every euro invested must generate a tangible and quantified return.'
        },
        {
          icon: Target,
          title: 'We transform uncertainty and complexity into clarity',
          content: 'Strategic IT projects are inherently complex and uncertain. This is precisely our playground. Where other consultants get lost in rigid methodologies or theoretical deliverables, we bring structure, visibility, and agility. We navigate through the fog for you, transforming chaos into an executable roadmap.'
        },
        {
          icon: Users,
          title: 'We translate technical complexity into business decisions',
          content: 'Technical language is our native tongue, but we speak business fluently. We serve as a bridge between your IT teams and strategic decision-makers. Every dashboard, every analysis, every recommendation is designed to be immediately actionable by a CFO, CEO, or Board. No jargon. No empty PowerPoint slides. Just clear, contextualized, action-oriented insights.'
        },
        {
          icon: TrendingUp,
          title: 'We connect strategy with field reality',
          content: 'Too many brilliant strategies fail at execution. We are obsessed with alignment between strategic vision and operational implementation. Our PMOs are not ivory towers: they are anchored in teams\' daily reality, they facilitate execution, and they ensure every project truly serves business priorities. We don\'t draw slides, we deliver transformations.'
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section className='py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-800'>
      <div className='container mx-auto max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>{t.title}</h2>
          <p className='text-xl text-slate-300'>{t.subtitle}</p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8'>
          {t.blocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='group relative'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100' />
              <div className='relative bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 group-hover:border-amber-500/50 transition-all duration-300'>
                <div className='flex items-start gap-4 mb-6'>
                  <div className='w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform'>
                    <block.icon className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-bold text-white leading-tight'>{block.title}</h3>
                </div>
                <p className='text-slate-300 leading-relaxed'>{block.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Positioning;
