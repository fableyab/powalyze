import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TarifsPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero */}
      <section className="bg-black text-white pt-40 pb-24 border-b border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6 text-[#D4AF37]"
          >
            Contactez-nous
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#4A9EFF] mb-12"
          >
            Discutons de votre projet et découvrez comment Powalyze peut transformer votre gouvernance.
          </motion.p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-[#D4AF37]/20 p-12 shadow-[0_0_40px_rgba(212,175,55,0.25)]"
          >
            <h2 className="text-4xl font-bold text-[#D4AF37] mb-6 text-center">Parlons de votre besoin</h2>
            <p className="text-lg text-[#4A9EFF] mb-8 max-w-2xl mx-auto text-center">
              Nos solutions sont adaptées à la taille de votre organisation et à vos objectifs stratégiques.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="p-6 bg-black/50 rounded-2xl border border-white/10 text-center">
                <Mail className="text-[#D4AF37] mx-auto mb-4" size={32} />
                <h3 className="font-semibold text-white mb-2">Par email</h3>
                <p className="text-sm text-[#4A9EFF] mb-4">Réponse sous 24h</p>
                <a href="mailto:contact@powalyze.com" className="text-[#D4AF37] hover:underline font-medium">
                  contact@powalyze.com
                </a>
              </div>
              
              <div className="p-6 bg-black/50 rounded-2xl border border-white/10 text-center">
                <Phone className="text-[#D4AF37] mx-auto mb-4" size={32} />
                <h3 className="font-semibold text-white mb-2">Par téléphone</h3>
                <p className="text-sm text-[#4A9EFF] mb-4">Lun-Ven 9h-18h</p>
                <a href="tel:+41123456789" className="text-[#D4AF37] hover:underline font-medium">
                  +41 12 345 67 89
                </a>
              </div>

              <div className="p-6 bg-black/50 rounded-2xl border border-white/10 text-center">
                <MapPin className="text-[#D4AF37] mx-auto mb-4" size={32} />
                <h3 className="font-semibold text-white mb-2">Localisation</h3>
                <p className="text-sm text-[#4A9EFF] mb-4">Suisse</p>
                <span className="text-[#D4AF37] font-medium">Genève</span>
              </div>
            </div>

            <Link 
              to="/contact" 
              className="inline-block px-10 py-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-semibold rounded-md transition-all transform hover:scale-105 shadow-lg"
            >
              Nous contacter
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TarifsPage;
