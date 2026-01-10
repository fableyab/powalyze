
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ConfigurationPanel = ({ onPeriodChange }) => {
  const { toast } = useToast();
  const [period, setPeriod] = useState(() => localStorage.getItem('powalyze_report_period') || 'q1_2026');

  useEffect(() => {
    if (onPeriodChange) onPeriodChange(period);
  }, []);

  const handleSave = () => {
    localStorage.setItem('powalyze_report_period', period);
    if (onPeriodChange) onPeriodChange(period);
    toast({ title: "Configuration Saved", description: `Report period set to ${period.replace('_', ' ').toUpperCase()}` });
  };

  return (
    <div className="bg-[#1A1A1A] p-2 rounded-lg border border-slate-800 flex items-center gap-2">
      <Select value={period} onValueChange={setPeriod}>
        <SelectTrigger className="w-[140px] h-9 bg-black border-slate-800 text-white text-xs">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
          <SelectItem value="q1_2026">Q1 2026</SelectItem>
          <SelectItem value="q2_2026">Q2 2026</SelectItem>
          <SelectItem value="q3_2026">Q3 2026</SelectItem>
          <SelectItem value="q4_2026">Q4 2026</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleSave} size="sm" className="h-9 bg-[#4A9EFF] hover:bg-[#0052cc] text-white text-xs px-3">
        <Save className="w-3 h-3 mr-1" /> Save
      </Button>
    </div>
  );
};

export default ConfigurationPanel;
