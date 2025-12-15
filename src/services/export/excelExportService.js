import * as XLSX from 'xlsx';

export const excelExportService = {
  exportToExcel: (data, filename = 'export.xlsx') => {
    try {
      if (!data || !data.length) throw new Error("No data to export");

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
      
      XLSX.writeFile(workbook, filename);
      return { success: true };
    } catch (error) {
      console.error("Excel Export Error:", error);
      throw error;
    }
  }
};