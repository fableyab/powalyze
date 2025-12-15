import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileSpreadsheet, FileText, File as FileIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportService } from '@/services/export/exportService';
import { useToast } from '@/components/ui/use-toast';

const ExportButton = ({ data, filename = 'data_export' }) => {
  const [exporting, setExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format) => {
    try {
      setExporting(true);
      const dataToExport = typeof data === 'function' ? await data() : data;
      
      if (!dataToExport || (Array.isArray(dataToExport) && dataToExport.length === 0)) {
         throw new Error("No data available to export");
      }

      await exportService.exportReport(dataToExport, format, filename);
      toast({ title: "Success", description: `Exported to ${format.toUpperCase()} successfully.`, variant: "success" });
    } catch (error) {
      toast({ variant: "destructive", title: "Export Failed", description: error.message });
    } finally {
      setExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 h-9" disabled={exporting}>
          {exporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#111] border-white/10 text-white">
        <DropdownMenuItem onClick={() => handleExport('csv')} className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
           <FileText className="mr-2 h-4 w-4 text-green-500" /> CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('excel')} className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
           <FileSpreadsheet className="mr-2 h-4 w-4 text-blue-500" /> Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('pdf')} className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
           <FileIcon className="mr-2 h-4 w-4 text-red-500" /> PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;