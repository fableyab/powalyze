import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PDFExportButton = ({ targetId, filename = 'document.pdf', variant = 'outline', className = '', label = 'Exporter PDF' }) => {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    const element = document.getElementById(targetId);
    if (!element) {
      console.error(`Element with id ${targetId} not found`);
      toast({ variant: "destructive", title: "Erreur", description: "Élément introuvable pour l'export." });
      return;
    }

    setLoading(true);
    toast({ title: "Génération en cours...", description: "Votre PDF est en train d'être préparé." });

    try {
      // Small delay to ensure any animations or render updates are finished
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#0A0A0A', // Ensure dark background is captured correctly
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add subsequent pages if content is long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Footer metadata
      const date = new Date().toLocaleString();
      pdf.setFontSize(8);
      pdf.setTextColor(100);
      pdf.text(`Généré par Powalyze.ch le ${date}`, 10, pdf.internal.pageSize.getHeight() - 10);

      pdf.save(filename);
      toast({ title: "Succès", description: "PDF téléchargé avec succès.", variant: "success" });
    } catch (error) {
      console.error('PDF Export Error:', error);
      toast({ variant: "destructive", title: "Erreur", description: "Erreur lors de la génération du PDF." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleExport} 
      variant={variant} 
      disabled={loading}
      className={`gap-2 transition-all ${className}`}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
      {label}
    </Button>
  );
};

export default PDFExportButton;