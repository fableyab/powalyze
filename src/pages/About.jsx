import { motion } from 'framer-motion';
import { ArrowRight, Award, BookOpen, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="min-h-screen bg-black pt-20">
        
        {/* Hero Section */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.h1
              className="text-5xl md:text-6xl font-light mb-8 text-[#D4AF37]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('about.title')}
            </motion.h1>
            
            <motion.p
              className="text-2xl font-light text-[#4A9EFF] max-w-3xl mx-auto mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('about.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Section Fabrice Fays */}
        <section className="relative py-32 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row items-start gap-12 mb-16">
                {/* Vidéo de présentation */}
                <div className="flex-shrink-0 relative group w-full md:w-80">
                  <div className="absolute -inset-3 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] rounded-lg blur-lg opacity-20 group-hover:opacity-30 transition"></div>
                  <div className="relative aspect-video rounded-lg overflow-hidden border-4 border-[#D4AF37]/30">
                    <video 
                      controls
                      className="w-full h-full object-cover"
                    >
                      <source src="file:///C:/Users/fabri/OneDrive/Images/Powalyze _ Le Manifeste.mp4" type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-4xl font-light mb-4">{t('about.name')}</h2>
                  <p className="text-lg font-light text-[#D4AF37] mb-8">
                    {t('about.role')}
                  </p>
                  
                  <p className="text-lg font-light text-white/70 leading-relaxed mb-4">
                    {t('about.intro')}
                  </p>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <div>
                  <h3 className="text-xl font-light text-[#D4AF37] mb-3">{t('about.experience')}</h3>
                  <div className="space-y-4 text-base font-light text-white/60 leading-relaxed">
                    
                    {/* Consultant Indépendant */}
                    <div className="border-l-2 border-[#D4AF37]/30 pl-4">
                      <p className="text-white/90 font-medium mb-1">{t('about.jobs.consultant.title')}</p>
                      <p className="text-white/50 text-sm mb-2">{t('about.jobs.consultant.period')}</p>
                      <ul className="ml-4 space-y-1">
                        {t('about.jobs.consultant.tasks', { returnObjects: true }).map((task, index) => (
                          <li key={index}>• {task}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Responsable de PMO */}
                    <div className="border-l-2 border-[#D4AF37]/30 pl-4">
                      <p className="text-white/90 font-medium mb-1">{t('about.jobs.pmoManager.title')}</p>
                      <p className="text-white/50 text-sm mb-2">{t('about.jobs.pmoManager.period')}</p>
                      <ul className="ml-4 space-y-1">
                        {t('about.jobs.pmoManager.tasks', { returnObjects: true }).map((task, index) => (
                          <li key={index}>• {task}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Ingénieur système */}
                    <div className="border-l-2 border-[#D4AF37]/30 pl-4">
                      <p className="text-white/90 font-medium mb-1">{t('about.jobs.engineer.title')}</p>
                      <p className="text-white/50 text-sm mb-2">{t('about.jobs.engineer.period')}</p>
                      <ul className="ml-4 space-y-1">
                        {t('about.jobs.engineer.tasks', { returnObjects: true }).map((task, index) => (
                          <li key={index}>• {task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-light text-[#D4AF37] mb-3">{t('about.education')}</h3>
                  <div className="space-y-2 text-base font-light text-white/60 leading-relaxed">
                    <p className="border-l-2 border-[#D4AF37]/30 pl-4">
                      • {t('about.educationItems.hes')}
                    </p>
                    <p className="border-l-2 border-[#D4AF37]/30 pl-4">
                      • {t('about.educationItems.executive')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-light text-[#D4AF37] mb-3">{t('about.certifications')}</h3>
                  <div className="space-y-2 text-base font-light text-white/60 leading-relaxed">
                    <p className="border-l-2 border-[#D4AF37]/30 pl-4">
                      • PMP® {t('about.certList.pmp')}
                    </p>
                    <p className="border-l-2 border-[#D4AF37]/30 pl-4">
                      • PRINCE2® {t('about.certList.prince2')}
                    </p>
                    <p className="border-l-2 border-[#D4AF37]/30 pl-4">
                      • IPMA Level C {t('about.certList.ipma')}
                    </p>
                    <p className="border-l-2 border-[#D4AF37]/30 pl-4">
                      • {t('about.certList.powerbi')}
                    </p>
                    <p className="border-l-2 border-[#D4AF37]/30 pl-4">
                      • {t('about.certList.rmp')}
                    </p>
                    <p className="border-l-2 border-[#D4AF37]/30 pl-4">
                      • {t('about.certList.agile')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-light text-[#D4AF37] mb-3">{t('about.teaching')}</h3>
                  <div className="space-y-2 text-base font-light text-white/60 leading-relaxed">
                    <p className="border-l-2 border-[#D4AF37]/30 pl-4">
                      • {t('about.teachingItems.hes')}
                    </p>
                    <p className="border-l-2 border-[#D4AF37]/30 pl-4">
                      • {t('about.teachingItems.trainer')}
                    </p>
                    <p className="border-l-2 border-[#D4AF37]/30 pl-4">
                      • {t('about.teachingItems.conferences')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-light text-[#D4AF37] mb-2">
                  {t('about.stats.experience')}
                </div>
                <div className="text-sm font-light text-white/50">
                  {t('about.statsLabels.experience')}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-light text-[#D4AF37] mb-2">
                  {t('about.stats.projects')}
                </div>
                <div className="text-sm font-light text-white/50">
                  {t('about.statsLabels.projects')}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-light text-[#D4AF37] mb-2">
                  {t('about.stats.sectors')}
                </div>
                <div className="text-sm font-light text-white/50">
                  {t('about.statsLabels.sectors')}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-light text-[#D4AF37] mb-2">
                  {t('about.stats.standard')}
                </div>
                <div className="text-sm font-light text-white/50">
                  {t('about.statsLabels.standard')}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-24 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-light text-[#D4AF37] mb-12"
            >
              {t('about.valuesTitle')}
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-6">
              {t('about.valuesList', { returnObjects: true }).map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] rounded-lg blur opacity-0 group-hover:opacity-30 transition"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-[#D4AF37]/30 transition">
                    <p className="text-lg font-light text-white/90">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Localisation */}
        <section className="relative py-16 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-light text-[#D4AF37] mb-4">Localisation</h3>
                <p className="text-lg font-light text-white/70">International</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-2xl font-light text-[#D4AF37] mb-4">Zones d'intervention</h3>
                <p className="text-lg font-light text-white/70">Suisse</p>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}

export default About;
