import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from '@/components/ui/button';
import { Moon, Sun, Bell, Globe, Layout, Shield } from 'lucide-react';

const SettingsForm = ({ onClose }) => {
  const { settings, updateSettings, resetSettings } = useSettings();

  const handleChange = (key, value) => {
    updateSettings({ [key]: value });
  };

  return (
    <div className="space-y-8 p-1">
      {/* Appearance */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
          <Moon size={16} /> Appearance
        </h3>
        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={settings.theme} onValueChange={(val) => handleChange('theme', val)}>
                 <SelectTrigger className="bg-[#1A1A1A] border-white/10 text-white">
                    <SelectValue placeholder="Select theme" />
                 </SelectTrigger>
                 <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                    <SelectItem value="dark">Dark Mode</SelectItem>
                    <SelectItem value="light">Light Mode</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                 </SelectContent>
              </Select>
           </div>
           <div className="space-y-2">
              <Label>Layout Density</Label>
              <Select value={settings.layout} onValueChange={(val) => handleChange('layout', val)}>
                 <SelectTrigger className="bg-[#1A1A1A] border-white/10 text-white">
                    <SelectValue />
                 </SelectTrigger>
                 <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                 </SelectContent>
              </Select>
           </div>
        </div>
      </div>

      {/* Data & Notifications */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
          <Layout size={16} /> Data Preferences
        </h3>
        <div className="space-y-4 bg-[#1A1A1A] p-4 rounded-lg border border-white/5">
           <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                 <Label>Live Data Refresh</Label>
                 <p className="text-xs text-gray-500">Interval in seconds: {settings.dataRefreshRate}s</p>
              </div>
              <Slider 
                 value={[settings.dataRefreshRate]} 
                 min={1} 
                 max={60} 
                 step={1}
                 onValueChange={(val) => handleChange('dataRefreshRate', val[0])}
                 className="w-[120px]"
              />
           </div>
           
           <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                 <Label>Email Notifications</Label>
                 <p className="text-xs text-gray-500">Receive weekly digests</p>
              </div>
              <Switch 
                 checked={settings.notifications}
                 onCheckedChange={(val) => handleChange('notifications', val)}
              />
           </div>
        </div>
      </div>

      {/* Regional */}
      <div className="space-y-4">
         <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
            <Globe size={16} /> Regional
         </h3>
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
               <Label>Currency</Label>
               <Select value={settings.currency} onValueChange={(val) => handleChange('currency', val)}>
                  <SelectTrigger className="bg-[#1A1A1A] border-white/10 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                     <SelectItem value="CHF">CHF (Swiss Franc)</SelectItem>
                     <SelectItem value="USD">USD (Dollar)</SelectItem>
                     <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="space-y-2">
               <Label>Language</Label>
               <Select value={settings.language} onValueChange={(val) => handleChange('language', val)}>
                  <SelectTrigger className="bg-[#1A1A1A] border-white/10 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                     <SelectItem value="en">English</SelectItem>
                     <SelectItem value="fr">French</SelectItem>
                     <SelectItem value="de">German</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex justify-between gap-4">
         <Button variant="destructive" size="sm" onClick={resetSettings} className="w-1/2">
            Reset to Defaults
         </Button>
         <Button size="sm" className="bg-[#BFA76A] text-black hover:bg-white w-1/2" onClick={onClose}>
            Save Changes
         </Button>
      </div>
    </div>
  );
};

export default SettingsForm;