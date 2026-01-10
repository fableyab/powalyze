
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';

const ImportModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>{t('dashboard.import') || 'Import'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Select>
            <SelectTrigger className="bg-black border-slate-800 text-white">
              <SelectValue placeholder="Select Source" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
              <SelectItem value="powerbi">Power BI Dashboard</SelectItem>
              <SelectItem value="excel">Excel Report</SelectItem>
              <SelectItem value="pdf">PDF Document</SelectItem>
            </SelectContent>
          </Select>
          <Input type="url" placeholder="Source URL" className="bg-black border-slate-800" />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-slate-800 text-slate-300">
            {t('common.cancel') || 'Cancel'}
          </Button>
          <Button onClick={onClose} className="bg-[#4A9EFF] text-white">
            {t('dashboard.import') || 'Import'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportModal;
