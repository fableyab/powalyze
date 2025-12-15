import * as XLSX from 'xlsx';

export const excelDataGenerator = {
  generateExcelData: (data) => {
    const workbook = XLSX.utils.book_new();

    // Projects Sheet
    if (data.projects) {
       const projectWS = XLSX.utils.json_to_sheet(data.projects);
       XLSX.utils.book_append_sheet(workbook, projectWS, "Projects");
    }

    // Risks Sheet
    if (data.risks) {
       const riskWS = XLSX.utils.json_to_sheet(data.risks);
       XLSX.utils.book_append_sheet(workbook, riskWS, "Risks");
    }

    // Financials Sheet
    if (data.costs) {
       const costWS = XLSX.utils.json_to_sheet(data.costs);
       XLSX.utils.book_append_sheet(workbook, costWS, "Financials");
    }
    
    return workbook;
  },

  downloadExcel: (workbook, filename = "Powalyze_Export.xlsx") => {
     XLSX.writeFile(workbook, filename);
  }
};