import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Download, FileText, File, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { generateAndDownloadPDF, generateStrategicPMOPDF, generateDataPowerBIPDF, generateAutomationAIPDF } from '@/utils/pdfGenerator';

const DownloadSection = ({ 
  title, 
  description, 
  documents = [],
  showThumbnails = true 
}) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [downloadingId, setDownloadingId] = useState(null);

  const defaultDocuments = [
    {
      id: 'ppt-pmo',
      type: 'PDF',
      size: '3.5 MB',
      title: { 
        fr: 'PMO Stratégique - Guide Complet', 
        en: 'Strategic PMO - Complete Guide',
        de: 'Strategisches PMO - Vollständiger Leitfaden'
      },
      description: {
        fr: 'Méthodologie, bénéfices et roadmap d\'implémentation',
        en: 'Methodology, benefits and implementation roadmap',
        de: 'Methodik, Vorteile und Implementierungs-Roadmap'
      },
      color: 'from-red-600 to-red-400',
      icon: FileText,
      generator: generateStrategicPMOPDF,
      filename: 'PMO_Strategique_Guide.pdf'
    },
    {
      id: 'pdf-dataBI',
      type: 'PDF',
      size: '2.8 MB',
      title: {
        fr: 'Data & Power BI - Guide Technique',
        en: 'Data & Power BI - Technical Guide',
        de: 'Data & Power BI - Technischer Leitfaden'
      },
      description: {
        fr: 'Architecture data, dashboards et best practices',
        en: 'Data architecture, dashboards and best practices',
        de: 'Dattenarchitektur, Dashboards und Best Practices'
      },
      color: 'from-blue-600 to-blue-400',
      icon: File,
      generator: generateDataPowerBIPDF,
      filename: 'Data_PowerBI_Guide.pdf'
    },
    {
      id: 'pdf-automation',
      type: 'PDF',
      size: '3.2 MB',
      title: {
        fr: 'Automatisation & IA - Implémentation',
        en: 'Automation & AI - Implementation',
        de: 'Automatisierung & KI - Implementierung'
      },
      description: {
        fr: 'RPA, Machine Learning et cas d\'usage concrets',
        en: 'RPA, Machine Learning and concrete use cases',
        de: 'RPA, maschinelles Lernen und konkrete Anwendungsfälle'
      },
      color: 'from-emerald-600 to-emerald-400',
      icon: File,
      generator: generateAutomationAIPDF,
      filename: 'Automation_IA_Guide.pdf'
    }
  ];

  const docs = documents.length > 0 ? documents : defaultDocuments;

  const handleDownload = async (doc) => {
    setDownloadingId(doc.id);
    
    try {
      // Simuler le téléchargement
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Générer et télécharger le PDF
      if (doc.generator) {
        generateAndDownloadPDF(doc.generator, doc.filename, language);
      } else {
        // Fallback pour les documents personnalisés
        const link = document.createElement('a');
        link.href = doc.href || `data:application/octet-stream;base64,PK3QDBAKAAAAIQAAAAAAAAAAAAAAAAAAABwAA...`;
        link.download = doc.title[language] + (doc.type === 'PowerPoint' ? '.pptx' : '.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      toast({
        title: language === 'fr' ? "Téléchargement réussi" : language === 'en' ? "Download successful" : "Download erfolgreich",
        description: `${doc.title[language]} téléchargé avec succès.`
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du téléchargement.",
        variant: "destructive"
      });
    } finally {
      setDownloadingId(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#BFA76A]/5 to-transparent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {title || (language === 'fr' ? "Téléchargements Gratuits" : language === 'en' ? "Free Downloads" : "Kostenlose Downloads")}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {description || (language === 'fr' 
              ? "Accédez à nos ressources complètes : présentations, guides et cas d'études"
              : language === 'en'
              ? "Access our comprehensive resources: presentations, guides and case studies"
              : "Zugriff auf unsere umfassenden Ressourcen: Präsentationen, Leitfäden und Fallstudien")}
          </p>
        </motion.div>

        {/* Documents Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {docs.map((doc) => {
            const DocIcon = doc.icon || File;
            const colors = doc.color || "from-blue-600 to-blue-400";

            return (
              <motion.div
                key={doc.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="relative bg-[#111] border border-white/10 hover:border-[#BFA76A]/50 rounded-lg overflow-hidden group transition-all duration-300"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                <div className="relative z-10 p-6 h-full flex flex-col">
                  {/* Icon & Type */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <DocIcon size={24} className="text-white" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#222] text-[#BFA76A]">
                      {doc.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow mb-4">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {doc.title[language] || doc.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {doc.description[language] || doc.description}
                    </p>
                  </div>

                  {/* Footer: Size & Download */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-gray-500">{doc.size}</span>
                    <motion.button
                      onClick={() => handleDownload(doc)}
                      disabled={downloadingId === doc.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                        downloadingId === doc.id
                          ? 'bg-gray-600 text-white cursor-not-allowed'
                          : 'bg-[#BFA76A] text-black hover:bg-white'
                      }`}
                    >
                      <Download size={16} />
                      {downloadingId === doc.id 
                        ? (language === 'fr' ? "Téléchargement..." : language === 'en' ? "Downloading..." : "Herunterladen...")
                        : (language === 'fr' ? "Télécharger" : language === 'en' ? "Download" : "Herunterladen")}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-6">
            {language === 'fr'
              ? "Besoin de plus de ressources ? Contactez notre équipe."
              : language === 'en'
              ? "Need more resources? Contact our team."
              : "Benötigen Sie weitere Ressourcen? Kontaktieren Sie unser Team."}
          </p>
          <a href="/contact" className="inline-flex">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold px-8 py-3 rounded-lg flex items-center gap-2">
                {language === 'fr' ? "Nous Contacter" : language === 'en' ? "Contact Us" : "Kontaktieren Sie uns"}
                <ArrowRight size={18} />
              </Button>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadSection;
