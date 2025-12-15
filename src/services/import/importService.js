import * as XLSX from 'xlsx';

export const importService = {
  /**
   * Parse Excel/CSV File
   */
  parseFile: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet); // Basic parse
          
          if (jsonData.length === 0) {
            reject(new Error("File is empty or could not be parsed."));
            return;
          }
          
          resolve({
             isValid: true,
             data: jsonData,
             headers: Object.keys(jsonData[0] || {}),
             totalRows: jsonData.length
          });
          
        } catch (err) {
          reject(new Error("Failed to parse file."));
        }
      };
      
      reader.onerror = () => reject(new Error("File read error."));
      reader.readAsBinaryString(file);
    });
  },

  validateImportData: (data, requiredFields = []) => {
     if (!data || !data.length) return { valid: false, message: "No data" };
     const headers = Object.keys(data[0]);
     const missing = requiredFields.filter(f => !headers.includes(f));
     
     if (missing.length > 0) {
        return { valid: false, message: `Missing columns: ${missing.join(', ')}` };
     }
     return { valid: true };
  }
};