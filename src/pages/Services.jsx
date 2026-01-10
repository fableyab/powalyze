import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PremiumLayout from '@/components/layout/PremiumLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  LayoutGrid, 
  Activity, 
  Shield, 
  Target,
  Brain,
  AlertTriangle,
  TrendingUp,
  Users,
  BarChart3,
  Zap,
  Eye,
  CheckCircle2
} from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();
  
  return (
    <PremiumLayout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-extralight tracking-tight mb-8">
              {t('services.title')}
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Conseil */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              {t('services.consulting')}
            </h2>
            <p className="text-lg font-light text-white/60 max-w-3xl">
              {t('services.consultingDesc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {t('services.consultingServices', { returnObjects: true }).map((service, i) => {
              const icons = [Target, Shield, BarChart3, Users];
              const images = [
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=200",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=200",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=200",
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=200"
              ];
              const Icon = icons[i];
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-0 border border-white/5 bg-white/[0.01] hover:border-[#D4AF37]/20 hover:bg-white/[0.02] transition-all rounded-sm group overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={images[i]} 
                      alt={service.title}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent" />
                  </div>
                  <div className="p-10">
                    <Icon className="w-8 h-8 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-light mb-6">{service.title}</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-light text-white/70">
                          <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Environnement Powalyze */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              {t('services.platform')}
            </h2>
            <p className="text-lg font-light text-white/60 max-w-3xl">
              {t('services.platformDesc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t('services.platformModules', { returnObjects: true }).map((module, i) => {
              const icons = [LayoutGrid, Activity, AlertTriangle, Target, Brain, Eye];
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-10 border border-white/5 bg-white/[0.01] hover:border-[#D4AF37]/20 hover:bg-white/[0.02] transition-all rounded-sm group"
                >
                  <Icon className="w-8 h-8 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-light mb-4">{module.title}</h3>
                  <p className="text-sm font-light text-white/50 leading-relaxed">{module.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Approche */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              {t('services.approach')}
            </h2>
            <p className="text-lg font-light text-white/60 max-w-3xl mx-auto">
              {t('services.approachDesc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t('services.approachPhases', { returnObjects: true }).map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 border border-white/5 bg-white/[0.01] rounded-sm"
              >
                <div className="text-4xl font-extralight text-[#D4AF37] mb-4">{phase.number}</div>
                <h3 className="text-xl font-light mb-3">{phase.title}</h3>
                <p className="text-sm font-light text-white/50 leading-relaxed">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 leading-tight">
              {t('services.cta')}
            </h2>
            
            <p className="text-lg font-light text-white/60 mb-12 max-w-2xl mx-auto">
              {t('services.ctaDesc')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-10 py-4 bg-[#D4AF37] text-[#000000] font-light hover:bg-[#D4AF37] transition-all rounded-sm"
              >
                {t('services.ctaContact')}
              </Link>
              
              <Link
                to="/login"
                className="px-10 py-4 border border-white/10 text-white font-light hover:bg-white/5 transition-all rounded-sm"
              >
                {t('services.ctaLogin')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PremiumLayout>
  );
};

export default Services;
