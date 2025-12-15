import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generate PDF for Strategic PMO Service
 */
export const generateStrategicPMOPDF = (language = 'fr') => {
  const doc = new jsPDF();
  
  const titles = {
    fr: 'PMO Stratégique',
    en: 'Strategic PMO',
    de: 'Strategisches PMO'
  };

  const content = {
    fr: {
      title: 'PMO Stratégique',
      subtitle: 'Guide Complet d\'Implémentation',
      sections: [
        { title: 'Vue d\'ensemble', content: 'Le PMO Stratégique est un service qui aligne votre portefeuille de projets avec vos objectifs métier.' },
        { title: 'Méthodologie', content: 'Basée sur les frameworks PRINCE2, PMP et COBIT 5 pour garantir une gouvernance optimale.' },
        { title: 'Bénéfices', content: '✓ Amélioration de 35% du ROI\n✓ Réduction des délais de 40%\n✓ Meilleure allocation des ressources\n✓ Gouvernance renforcée' },
        { title: 'Timeline', content: 'Phase 1: Diagnostic (4 semaines)\nPhase 2: Design (6 semaines)\nPhase 3: Implémentation (8 semaines)\nPhase 4: Optimisation (4 semaines)' }
      ]
    },
    en: {
      title: 'Strategic PMO',
      subtitle: 'Complete Implementation Guide',
      sections: [
        { title: 'Overview', content: 'Strategic PMO is a service that aligns your project portfolio with your business objectives.' },
        { title: 'Methodology', content: 'Based on PRINCE2, PMP and COBIT 5 frameworks to ensure optimal governance.' },
        { title: 'Benefits', content: '✓ 35% ROI improvement\n✓ 40% delay reduction\n✓ Better resource allocation\n✓ Strengthened governance' },
        { title: 'Timeline', content: 'Phase 1: Diagnosis (4 weeks)\nPhase 2: Design (6 weeks)\nPhase 3: Implementation (8 weeks)\nPhase 4: Optimization (4 weeks)' }
      ]
    },
    de: {
      title: 'Strategisches PMO',
      subtitle: 'Vollständiger Implementierungsleitfaden',
      sections: [
        { title: 'Übersicht', content: 'Strategic PMO ist ein Service, der Ihr Projektportfolio an Ihre Geschäftsziele ausrichtet.' },
        { title: 'Methodik', content: 'Basierend auf PRINCE2-, PMP- und COBIT-5-Frameworks für optimale Governance.' },
        { title: 'Vorteile', content: '✓ 35% ROI-Verbesserung\n✓ 40% Verzögerungsreduzierung\n✓ Bessere Ressourcenallokation\n✓ Verstärkte Governance' },
        { title: 'Zeitplan', content: 'Phase 1: Diagnose (4 Wochen)\nPhase 2: Design (6 Wochen)\nPhase 3: Implementierung (8 Wochen)\nPhase 4: Optimierung (4 Wochen)' }
      ]
    }
  };

  const currentLang = content[language] || content.en;
  
  // Set colors
  doc.setFillColor(191, 167, 106); // Gold
  doc.setTextColor(0, 0, 0);
  
  // Add title
  doc.setFontSize(28);
  doc.setTextColor(0, 0, 0);
  doc.text(currentLang.title, 20, 30);
  
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text(currentLang.subtitle, 20, 45);
  
  // Add line
  doc.setDrawColor(191, 167, 106);
  doc.line(20, 50, 190, 50);
  
  // Add sections
  let yPosition = 65;
  
  currentLang.sections.forEach((section) => {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text(section.title, 20, yPosition);
    
    yPosition += 10;
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(60, 60, 60);
    
    const splitText = doc.splitTextToSize(section.content, 170);
    doc.text(splitText, 20, yPosition);
    
    yPosition += splitText.length * 6 + 10;
    
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
  });
  
  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`© 2024 POWALYZE - ${language === 'fr' ? 'Tous droits réservés' : language === 'en' ? 'All rights reserved' : 'Alle Rechte vorbehalten'}`, 20, doc.internal.pageSize.getHeight() - 10);
  
  return doc;
};

/**
 * Generate PDF for Data & Power BI Service
 */
export const generateDataPowerBIPDF = (language = 'fr') => {
  const doc = new jsPDF();
  
  const content = {
    fr: {
      title: 'Data & Power BI',
      subtitle: 'Guide Complet d\'Implémentation',
      sections: [
        { title: 'Vue d\'ensemble', content: 'Transformez vos données brutes en insights actionnables avec Power BI et nos méthodologies éprouvées.' },
        { title: 'Architecture Data', content: 'Collecte → Nettoyage → Modélisation → Visualisation → Intelligence' },
        { title: 'Bénéfices', content: '✓ Dashboards interactifs en 4 semaines\n✓ Insights temps réel\n✓ ROI mesurable (+50%)\n✓ Adoption utilisateurs 95%+' },
        { title: 'Cas d\'Usage', content: 'Sales Performance • Financial Analytics • HR Metrics • Supply Chain Optimization • Risk Management' }
      ]
    },
    en: {
      title: 'Data & Power BI',
      subtitle: 'Complete Implementation Guide',
      sections: [
        { title: 'Overview', content: 'Transform your raw data into actionable insights with Power BI and our proven methodologies.' },
        { title: 'Data Architecture', content: 'Collection → Cleaning → Modeling → Visualization → Intelligence' },
        { title: 'Benefits', content: '✓ Interactive dashboards in 4 weeks\n✓ Real-time insights\n✓ Measurable ROI (+50%)\n✓ User adoption 95%+' },
        { title: 'Use Cases', content: 'Sales Performance • Financial Analytics • HR Metrics • Supply Chain Optimization • Risk Management' }
      ]
    },
    de: {
      title: 'Data & Power BI',
      subtitle: 'Vollständiger Implementierungsleitfaden',
      sections: [
        { title: 'Übersicht', content: 'Transformieren Sie Ihre Rohdaten in umsetzbare Erkenntnisse mit Power BI und unseren bewährten Methoden.' },
        { title: 'Datenarchitektur', content: 'Erfassung → Bereinigung → Modellierung → Visualisierung → Intelligence' },
        { title: 'Vorteile', content: '✓ Interaktive Dashboards in 4 Wochen\n✓ Echtzeiterkenntnisse\n✓ Messbarer ROI (+50%)\n✓ Benutzeradoption 95%+' },
        { title: 'Anwendungsfälle', content: 'Verkaufsleistung • Finanzanalyse • HR-Metriken • Supply-Chain-Optimierung • Risikomanagement' }
      ]
    }
  };

  const currentLang = content[language] || content.en;
  
  doc.setFillColor(59, 130, 246); // Blue
  doc.setTextColor(0, 0, 0);
  
  doc.setFontSize(28);
  doc.text(currentLang.title, 20, 30);
  
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text(currentLang.subtitle, 20, 45);
  
  doc.setDrawColor(59, 130, 246);
  doc.line(20, 50, 190, 50);
  
  let yPosition = 65;
  
  currentLang.sections.forEach((section) => {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text(section.title, 20, yPosition);
    
    yPosition += 10;
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(60, 60, 60);
    
    const splitText = doc.splitTextToSize(section.content, 170);
    doc.text(splitText, 20, yPosition);
    
    yPosition += splitText.length * 6 + 10;
    
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
  });
  
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`© 2024 POWALYZE - ${language === 'fr' ? 'Tous droits réservés' : language === 'en' ? 'All rights reserved' : 'Alle Rechte vorbehalten'}`, 20, doc.internal.pageSize.getHeight() - 10);
  
  return doc;
};

/**
 * Generate PDF for Automation & AI Service
 */
export const generateAutomationAIPDF = (language = 'fr') => {
  const doc = new jsPDF();
  
  const content = {
    fr: {
      title: 'Automatisation & IA',
      subtitle: 'Guide Complet d\'Implémentation',
      sections: [
        { title: 'Vue d\'ensemble', content: 'Optimisez vos processus métier avec l\'automatisation intelligente et les solutions d\'IA.' },
        { title: 'Technologies', content: 'RPA • Machine Learning • Natural Language Processing • Computer Vision • Chatbots IA' },
        { title: 'Bénéfices', content: '✓ Réduction de 60% des coûts opérationnels\n✓ Gain de temps de 80% sur les tâches répétitives\n✓ Erreurs quasi-éliminées\n✓ Prise de décision améliorée' },
        { title: 'Implémentation', content: 'Audit → Sélection • Design • Développement • Test • Déploiement • Maintenance' }
      ]
    },
    en: {
      title: 'Automation & AI',
      subtitle: 'Complete Implementation Guide',
      sections: [
        { title: 'Overview', content: 'Optimize your business processes with intelligent automation and AI solutions.' },
        { title: 'Technologies', content: 'RPA • Machine Learning • Natural Language Processing • Computer Vision • AI Chatbots' },
        { title: 'Benefits', content: '✓ 60% reduction in operating costs\n✓ 80% time savings on repetitive tasks\n✓ Nearly eliminated errors\n✓ Improved decision-making' },
        { title: 'Implementation', content: 'Audit → Selection • Design • Development • Testing • Deployment • Maintenance' }
      ]
    },
    de: {
      title: 'Automatisierung & KI',
      subtitle: 'Vollständiger Implementierungsleitfaden',
      sections: [
        { title: 'Übersicht', content: 'Optimieren Sie Ihre Geschäftsprozesse mit intelligenter Automatisierung und KI-Lösungen.' },
        { title: 'Technologien', content: 'RPA • Machine Learning • Verarbeitung natürlicher Sprache • Computervision • KI-Chatbots' },
        { title: 'Vorteile', content: '✓ 60% Reduzierung der Betriebskosten\n✓ 80% Zeitsparnis bei wiederholten Aufgaben\n✓ Nahezu eliminierte Fehler\n✓ Verbesserte Entscheidungsfindung' },
        { title: 'Implementierung', content: 'Audit → Auswahl • Design • Entwicklung • Test • Bereitstellung • Wartung' }
      ]
    }
  };

  const currentLang = content[language] || content.en;
  
  doc.setFillColor(16, 185, 129); // Emerald
  doc.setTextColor(0, 0, 0);
  
  doc.setFontSize(28);
  doc.text(currentLang.title, 20, 30);
  
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text(currentLang.subtitle, 20, 45);
  
  doc.setDrawColor(16, 185, 129);
  doc.line(20, 50, 190, 50);
  
  let yPosition = 65;
  
  currentLang.sections.forEach((section) => {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text(section.title, 20, yPosition);
    
    yPosition += 10;
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(60, 60, 60);
    
    const splitText = doc.splitTextToSize(section.content, 170);
    doc.text(splitText, 20, yPosition);
    
    yPosition += splitText.length * 6 + 10;
    
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
  });
  
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`© 2024 POWALYZE - ${language === 'fr' ? 'Tous droits réservés' : language === 'en' ? 'All rights reserved' : 'Alle Rechte vorbehalten'}`, 20, doc.internal.pageSize.getHeight() - 10);
  
  return doc;
};

/**
 * Download PDF file
 */
export const downloadPDF = (doc, filename) => {
  doc.save(filename);
};

/**
 * Generate and download PDF
 */
export const generateAndDownloadPDF = (generatorFunction, filename, language = 'fr') => {
  try {
    const doc = generatorFunction(language);
    downloadPDF(doc, filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
