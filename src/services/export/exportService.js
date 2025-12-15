import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { handleError } from '@/utils/errorHandler';

export const exportService = {
  /**
   * Universal export function
   */
  exportReport: async (data, format, filename = 'report') => {
    const timestamp = new Date().toISOString().split('T')[0];
    const finalName = `${filename}_${timestamp}`;

    switch (format.toLowerCase()) {
      case 'csv':
        return exportService.exportToCSV(data, `${finalName}.csv`);
      case 'excel':
      case 'xlsx':
        return exportService.exportToExcel(data, `${finalName}.xlsx`);
      case 'pdf':
        return exportService.exportToPDF(data, `${finalName}.pdf`, filename);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  },

  exportToCSV: (data, filename = 'export.csv') => {
    try {
      if (!data || !data.length) throw new Error("No data to export");
      
      const ws = XLSX.utils.json_to_sheet(data);
      const csvOutput = XLSX.utils.sheet_to_csv(ws);
      
      const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return { success: true };
    } catch (err) {
      console.error("Export CSV Error", err);
      throw err;
    }
  },

  exportToExcel: (data, filename = 'export.xlsx') => {
    try {
      if (!data || !data.length) throw new Error("No data to export");

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      
      XLSX.writeFile(wb, filename);
      return { success: true };
    } catch (err) {
      console.error("Export Excel Error", err);
      throw err;
    }
  },

  exportToPDF: (data, filename = 'export.pdf', title = 'Report') => {
    try {
      if (!data || !data.length) throw new Error("No data to export");

      const doc = new jsPDF();
      
      // Extract headers
      const headers = Object.keys(data[0]);
      const rows = data.map(obj => Object.values(obj));

      // Header
      doc.setFontSize(18);
      doc.text(title, 14, 15);
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 22);

      // Table
      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [191, 167, 106], textColor: 255, fontStyle: 'bold' }, // Gold color
        alternateRowStyles: { fillColor: [245, 245, 245] }
      });

      doc.save(filename);
      return { success: true };
    } catch (err) {
      console.error("Export PDF Error", err);
      throw err;
    }
  }
};