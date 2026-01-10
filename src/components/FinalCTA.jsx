
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const FinalCTA = ({ language }) => {
  const { toast } = useToast();

  const translations = {
    fr: {
      title: 'Transformez votre PMO en 30 jours',
      subtitle: 'Prêt à passer à l\'action ?',
      description: 'Discutons de vos enjeux stratégiques et découvrez comment Powalyze peut accélérer votre transformation IT. Premier diagnostic offert.',
      cta: 'Démarrer la transformation',
      stats: [
        { value: '30', label: 'jours', suffix: '' },
        { value: '95', label: 'satisfaction', suffix: '%' },
        { value: '8', label: 'ROI moyen', suffix: 'x' }
      ]
    },
    en: {
      title: 'Transform your PMO in 30 days',
      subtitle: 'Ready to take action?',
      description: 'Let\'s discuss your strategic challenges and discover how Powalyze can accelerate your IT transformation. First assessment offered.',
      cta: 'Start transformation',
      stats: [
        { value: '30', label: 'days', suffix: '' },
        { value: '95', label: 'satisfaction', suffix: '%' },
        { value: '8', label: 'avg ROI', suffix: 'x' }
      ]
    }
  };

  const t = translations[language];

  const handleCTA = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <section className='py-24 px-4 bg-slate-900 relative overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-3xl' />
      </div>

      <div className='container mx-auto max-w-5xl relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center'
        >
          <div className='inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20 mb-6'>
            <Zap className='w-4 h-4 text-amber-500' />
            <span className='text-amber-500 font-semibold text-sm'>{t.subtitle}</span>
          </div>

          <h2 className='text-4xl md:text-6xl font-bold text-white mb-6'>{t.title}</h2>
          <p className='text-xl text-slate-300 mb-12 max-w-3xl mx-auto'>{t.description}</p>

          <Button
            onClick={handleCTA}
            size='lg'
            className='bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-lg px-10 py-7 rounded-xl shadow-2xl hover:shadow-amber-500/20 transition-all'
          >
            {t.cta}
            <ArrowRight className='ml-2 w-5 h-5' />
          </Button>

          <div className='grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto'>
            {t.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='text-center'
              >
                <div className='text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mb-2'>
                  {stat.value}{stat.suffix}
                </div>
                <div className='text-slate-400 text-sm uppercase tracking-wide'>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
