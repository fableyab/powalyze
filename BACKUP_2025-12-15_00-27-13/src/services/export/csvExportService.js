import { saveAs } from 'file-saver';

export const csvExportService = {
  exportToCSV: (data, filename = 'export.csv') => {
    try {
      if (!data || !data.length) throw new Error("No data to export");

      // Get headers
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','), // Header row
        ...data.map(row => 
          headers.map(fieldName => {
            const val = row[fieldName] ? row[fieldName].toString().replace(/"/g, '""') : '';
            return `"${val}"`;
          }).join(',')
        )
      ].join('\r\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, filename);
      return { success: true };
    } catch (error) {
      console.error("CSV Export Error:", error);
      throw error;
    }
  }
};