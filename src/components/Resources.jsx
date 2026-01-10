
import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Resources = ({ language }) => {
  const { toast } = useToast();

  const translations = {
    fr: {
      title: 'Ressources & Espace Contenu',
      subtitle: 'Accédez à nos ressources exclusives',
      description: 'Notre espace client regroupe des templates Power BI prêts à l\'emploi, des guides méthodologiques PMO, des benchmarks sectoriels, des webinaires à la demande, et un accès direct à nos experts pour un accompagnement personnalisé.',
      benefits: [
        'Templates Power BI exclusifs',
        'Guides méthodologiques PMO',
        'Benchmarks sectoriels actualisés',
        'Webinaires et formations',
        'Support expert dédié'
      ],
      cta: 'Accéder à l\'espace client'
    },
    en: {
      title: 'Resources & Content Area',
      subtitle: 'Access our exclusive resources',
      description: 'Our client area brings together ready-to-use Power BI templates, PMO methodological guides, sector benchmarks, on-demand webinars, and direct access to our experts for personalized support.',
      benefits: [
        'Exclusive Power BI templates',
        'PMO methodological guides',
        'Updated sector benchmarks',
        'Webinars and training',
        'Dedicated expert support'
      ],
      cta: 'Access client area'
    }
  };

  const t = translations[language];

  const handleCTA = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <section className='py-24 px-4 bg-slate-800/30'>
      <div className='container mx-auto max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 overflow-hidden'
        >
          <div className='grid md:grid-cols-2 gap-0'>
            <div className='p-12'>
              <div className='w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6'>
                <FolderOpen className='w-8 h-8 text-white' />
              </div>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>{t.title}</h2>
              <p className='text-lg text-slate-300 mb-8 leading-relaxed'>{t.description}</p>
              <Button
                onClick={handleCTA}
                size='lg'
                className='bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white'
              >
                {t.cta}
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
            </div>

            <div className='bg-slate-900/50 p-12 flex items-center'>
              <div className='space-y-4 w-full'>
                <p className='text-amber-500 font-semibold uppercase tracking-wide text-sm mb-6'>
                  {t.subtitle}
                </p>
                {t.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className='flex items-center gap-3 text-slate-300'
                  >
                    <div className='w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full' />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resources;
