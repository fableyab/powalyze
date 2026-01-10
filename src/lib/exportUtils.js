
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import pptxgen from 'pptxgenjs';
import * as XLSX from 'xlsx';

/**
 * Generates a PDF from a specific DOM element
 */
export const exportToPDF = async (elementId, filename = 'report.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#0F0F0F', // Dark theme background
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(filename);
  } catch (error) {
    console.error('PDF Generation failed', error);
  }
};

/**
 * Generates a PowerPoint presentation with project data
 */
export const exportToPPTX = (projectData, executiveSummary) => {
  const pres = new pptxgen();

  // Slide 1: Title
  let slide1 = pres.addSlide();
  slide1.background = { color: "0F0F0F" };
  slide1.addText("POWALYZE OS", { x: 0.5, y: 0.5, fontSize: 14, color: "D4AF37", bold: true });
  slide1.addText("Executive Strategic Report", { x: 0.5, y: 2.5, fontSize: 36, color: "FFFFFF", bold: true });
  slide1.addText(projectData.name || "Portfolio Overview", { x: 0.5, y: 3.2, fontSize: 24, color: "D4AF37" });
  slide1.addText(`Generated: ${new Date().toLocaleDateString()}`, { x: 0.5, y: 5, fontSize: 12, color: "888888" });

  // Slide 2: Executive Summary
  let slide2 = pres.addSlide();
  slide2.background = { color: "0F0F0F" };
  slide2.addText("Executive Summary", { x: 0.5, y: 0.5, fontSize: 24, color: "D4AF37", bold: true });
  slide2.addText(executiveSummary || "No summary available.", { x: 0.5, y: 1.5, w: '90%', fontSize: 14, color: "FFFFFF" });

  // Slide 3: KPI Snapshot (Mock)
  let slide3 = pres.addSlide();
  slide3.background = { color: "0F0F0F" };
  slide3.addText("Strategic KPIs", { x: 0.5, y: 0.5, fontSize: 24, color: "D4AF37", bold: true });
  
  slide3.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.5, w: 2.5, h: 1.5, fill: "1E3A8A" });
  slide3.addText("Budget Consumed", { x: 0.6, y: 1.7, fontSize: 12, color: "FFFFFF" });
  slide3.addText("CHF 4.2M", { x: 0.6, y: 2.2, fontSize: 20, color: "FFFFFF", bold: true });

  slide3.addShape(pres.ShapeType.rect, { x: 3.5, y: 1.5, w: 2.5, h: 1.5, fill: "1E3A8A" });
  slide3.addText("Risk Score", { x: 3.6, y: 1.7, fontSize: 12, color: "FFFFFF" });
  slide3.addText("Medium (45)", { x: 3.6, y: 2.2, fontSize: 20, color: "D4AF37", bold: true });

  pres.writeFile({ fileName: `Powalyze_Report_${new Date().toISOString().slice(0,10)}.pptx` });
};

/**
 * Generates an Excel file with multiple sheets
 */
export const exportToExcel = (dataSets, filename = 'export.xlsx') => {
  const wb = XLSX.utils.book_new();

  dataSets.forEach((dataset) => {
    const ws = XLSX.utils.json_to_sheet(dataset.data);
    XLSX.utils.book_append_sheet(wb, ws, dataset.name);
  });

  XLSX.writeFile(wb, filename);
};
