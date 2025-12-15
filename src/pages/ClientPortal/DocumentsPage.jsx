
import React, { useEffect, useRef, useState } from 'react';
import { useClient } from '@/context/ClientContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { Search, Download, FileText, Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  generateStrategicPMOPDF,
  generateDataPowerBIPDF,
  generateAutomationAIPDF,
  downloadPDF
} from '@/utils/pdfGenerator';

const DocumentsPage = () => {
  const { documents } = useClient();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [downloadingId, setDownloadingId] = useState(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(() => {
    try {
      return sessionStorage.getItem('documentsCatScrollHint') !== 'seen';
    } catch (_) { return true; }
  });

  const updateScrollShadows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    if (showScrollHint && el.scrollLeft > 0) {
      setShowScrollHint(false);
      try { sessionStorage.setItem('documentsCatScrollHint', 'seen'); } catch (_) {}
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollShadows();
    const onScroll = () => updateScrollShadows();
    el.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => updateScrollShadows();
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Enhanced documents with PDF generators
  const enhancedDocuments = [
    {
      id: "pmo-guide",
      name: "PMO_Strategique_Guide.pdf",
      type: "PDF",
      size: "3.5 MB",
      date: new Date().toISOString(),
      category: "Méthodologie",
      owner: "POWALYZE",
      generator: generateStrategicPMOPDF,
      description: language === 'fr' 
        ? 'Guide complet du PMO Stratégique avec méthodologie et roadmap'
        : language === 'en'
        ? 'Complete Strategic PMO guide with methodology and roadmap'
        : 'Vollständiger Leitfaden zum strategischen PMO mit Methodik und Roadmap'
    },
    {
      id: "dataBI-guide",
      name: "Data_PowerBI_Guide.pdf",
      type: "PDF",
      size: "2.8 MB",
      date: new Date().toISOString(),
      category: "Technologie",
      owner: "POWALYZE",
      generator: generateDataPowerBIPDF,
      description: language === 'fr'
        ? 'Architecture data et dashboards Power BI avec best practices'
        : language === 'en'
        ? 'Data architecture and Power BI dashboards with best practices'
        : 'Datenarchitektur und Power BI-Dashboards mit Best Practices'
    },
    {
      id: "automation-guide",
      name: "Automation_IA_Guide.pdf",
      type: "PDF",
      size: "3.2 MB",
      date: new Date().toISOString(),
      category: "Innovation",
      owner: "POWALYZE",
      generator: generateAutomationAIPDF,
      description: language === 'fr'
        ? 'Guide complet sur l\'automatisation RPA et les solutions IA'
        : language === 'en'
        ? 'Complete guide on RPA automation and AI solutions'
        : 'Vollständiger Leitfaden zu RPA-Automatisierung und KI-Lösungen'
    },
    ...documents
  ];

  const categories = ["all", ...new Set(enhancedDocuments.map(d => d.category))];

  const handleDownload = async (doc) => {
    setDownloadingId(doc.id);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (doc.generator) {
        // Generate PDF dynamically
        const pdfDoc = doc.generator(language);
        downloadPDF(pdfDoc, doc.name);
      } else {
        // Fallback for regular documents: generate a small placeholder file locally
        const ext = (doc.name.split('.').pop() || '').toLowerCase();
        const mimeByExt = {
          pdf: 'application/pdf',
          doc: 'application/msword',
          docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          xls: 'application/vnd.ms-excel',
          xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ppt: 'application/vnd.ms-powerpoint',
          pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          txt: 'text/plain'
        };
        const mime = mimeByExt[ext] || 'application/octet-stream';
        const content = `POWALYZE\nDocument placeholder for: ${doc.name}\nType: ${doc.type}\nCategory: ${doc.category || 'N/A'}\nDate: ${new Date().toISOString()}\n`;
        const blob = new Blob([content], { type: mime });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = doc.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      toast({
        title: language === 'fr' ? "Succès" : language === 'en' ? "Success" : "Erfolg",
        description: language === 'fr'
          ? `${doc.name} téléchargé avec succès.`
          : language === 'en'
          ? `${doc.name} downloaded successfully.`
          : `${doc.name} erfolgreich heruntergeladen.`
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: language === 'fr' ? "Erreur" : language === 'en' ? "Error" : "Fehler",
        description: language === 'fr'
          ? "Une erreur s'est produite lors du téléchargement."
          : language === 'en'
          ? "An error occurred during download."
          : "Beim Download ist ein Fehler aufgetreten.",
        variant: "destructive"
      });
    } finally {
      setDownloadingId(null);
    }
  };

  const filteredDocs = enhancedDocuments.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || 
                          d.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || d.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
            {language === 'fr' ? 'Documents' : language === 'en' ? 'Documents' : 'Dokumente'}
          </h1>
          <p className="text-gray-400">
            {language === 'fr'
              ? `${filteredDocs.length} documents disponibles`
              : language === 'en'
              ? `${filteredDocs.length} documents available`
              : `${filteredDocs.length} Dokumente verfügbar`}
          </p>
        </div>
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <Input
            placeholder={language === 'fr' ? "Rechercher un document..." : language === 'en' ? "Search for a document..." : "Nach einem Dokument suchen..."}
            className="pl-10 bg-[#111] border-white/10 text-white focus:border-[#BFA76A]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filter - horizontal scrollable with indicators */}
        <div className="relative w-full md:max-w-[60%]">
          {/* One-time hint */}
          {showScrollHint && (
            <div className="absolute -top-7 right-0 z-10 text-xs text-gray-300 bg-[#111]/80 px-2 py-1 rounded border border-white/10 shadow-sm flex items-center gap-2">
              <span>
                {language === 'fr' ? 'Glissez pour voir plus' : language === 'de' ? 'Zum Anzeigen wischen' : 'Swipe to see more'}
              </span>
              <button
                type="button"
                aria-label="Dismiss hint"
                onClick={() => { setShowScrollHint(false); try { sessionStorage.setItem('documentsCatScrollHint', 'seen'); } catch (_) {} }}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
          )}
          {/* Left gradient indicator */}
          {canScrollLeft && (
            <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
          )}

          {/* Right gradient indicator */}
          {canScrollRight && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
          )}

          {/* Scroll buttons */}
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => { scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' }); }}
            className={`absolute left-1 top-1/2 -translate-y-1/2 z-10 rounded-full p-1.5 bg-[#111]/80 backdrop-blur border border-white/10 text-gray-300 hover:text-white hover:bg-[#1a1a1a]/90 transition ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => { scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' }); }}
            className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 rounded-full p-1.5 bg-[#111]/80 backdrop-blur border border-white/10 text-gray-300 hover:text-white hover:bg-[#1a1a1a]/90 transition ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronRight size={16} />
          </button>

          <div ref={scrollRef} className="overflow-x-auto whitespace-nowrap scrollbar-auto pr-2">
            <div className="inline-flex gap-2">
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#BFA76A] text-black'
                      : 'bg-[#222] text-gray-300 hover:bg-[#333]'
                  }`}
                >
                  {cat === 'all'
                    ? (language === 'fr' ? 'Tous' : language === 'en' ? 'All' : 'Alle')
                    : cat}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Documents Grid - New Enhanced Design */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredDocs.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="relative bg-[#111] border border-white/10 hover:border-[#BFA76A]/50 rounded-xl overflow-hidden group transition-all duration-300"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#BFA76A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative z-10 p-6 h-full flex flex-col">
              {/* Icon & Type */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#BFA76A] to-[#9d8658] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FileText size={24} className="text-white" />
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#222] text-[#BFA76A]">
                  {doc.type}
                </span>
              </div>

              {/* Content */}
              <div className="flex-grow mb-4">
                <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
                  {doc.name.replace('.pdf', '').replace(/_/g, ' ')}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {doc.description || (language === 'fr' ? 'Document professionnel' : language === 'en' ? 'Professional document' : 'Berufliches Dokument')}
                </p>
              </div>

              {/* Footer: Details & Download */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{doc.size}</span>
                  <span className="bg-[#222] px-2 py-1 rounded text-xs border border-white/5">{doc.category}</span>
                </div>
                <motion.button
                  onClick={() => handleDownload(doc)}
                  disabled={downloadingId === doc.id}
                  whileHover={{ scale: downloadingId === doc.id ? 1 : 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all ${
                    downloadingId === doc.id
                      ? 'bg-gray-600 text-white cursor-not-allowed'
                      : 'bg-[#BFA76A] text-black hover:bg-white'
                  }`}
                >
                  <Download size={16} />
                  {downloadingId === doc.id
                    ? (language === 'fr' ? 'Téléchargement...' : language === 'en' ? 'Downloading...' : 'Wird heruntergeladen...')
                    : (language === 'fr' ? 'Télécharger' : language === 'en' ? 'Download' : 'Herunterladen')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredDocs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">
            {language === 'fr'
              ? 'Aucun document trouvé.'
              : language === 'en'
              ? 'No documents found.'
              : 'Keine Dokumente gefunden.'}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default DocumentsPage;
