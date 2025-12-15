import * as XLSX from 'xlsx';
import { sampleDataService } from '@/services/powerbi/sampleDataService';

export const completeDataGenerator = {
  generateCompleteExcelData: () => {
    const workbook = XLSX.utils.book_new();

    // 1. Projects Sheet
    const { projects } = sampleDataService.generateProjectTrackingData();
    const projectWS = XLSX.utils.json_to_sheet(projects);
    XLSX.utils.book_append_sheet(workbook, projectWS, "Projects");

    // 2. Financial Sheet
    const { trendData } = sampleDataService.generateFinancialData();
    const financialWS = XLSX.utils.json_to_sheet(trendData);
    XLSX.utils.book_append_sheet(workbook, financialWS, "Financials");

    // 3. Sales Sheet
    const { salesTrend } = sampleDataService.generateSalesData();
    const salesWS = XLSX.utils.json_to_sheet(salesTrend);
    XLSX.utils.book_append_sheet(workbook, salesWS, "Sales");

    // 4. Risks Sheet
    const { risks } = sampleDataService.generatePMOData();
    const risksWS = XLSX.utils.json_to_sheet(risks);
    XLSX.utils.book_append_sheet(workbook, risksWS, "Risks");

    // Download
    XLSX.writeFile(workbook, "Powalyze_Complete_Demo_Data.xlsx");
  }
};