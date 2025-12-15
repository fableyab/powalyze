import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const pdfExportService = {
  exportToPDF: (data, filename = 'export.pdf', title = 'Report') => {
    try {
      if (!data || !data.length) throw new Error("No data to export");

      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(18);
      doc.text(title, 14, 22);
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);

      // Table
      const headers = Object.keys(data[0]);
      const rows = data.map(obj => Object.values(obj));

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [191, 167, 106] }, // #BFA76A
        styles: { fontSize: 8 }
      });

      doc.save(filename);
      return { success: true };
    } catch (error) {
      console.error("PDF Export Error:", error);
      throw error;
    }
  }
};