import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { settingsStorageService } from '@/services/settings/settingsStorageService';
import { useToast } from '@/components/ui/use-toast';

const SettingsContext = createContext();

const DEFAULT_SETTINGS = {
  theme: 'dark',
  layout: 'comfortable',
  notifications: true,
  dataRefreshRate: 5,
  currency: 'CHF',
  language: 'en'
};

export const SettingsProvider = ({ children }) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const { toast } = useToast();

  // Load settings when user changes
  useEffect(() => {
    if (user?.id) {
      const stored = settingsStorageService.loadSettings(user.id);
      if (stored) {
        setSettings({ ...DEFAULT_SETTINGS, ...stored });
      } else {
        setSettings(DEFAULT_SETTINGS);
      }
    }
  }, [user]);

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    
    if (user?.id) {
      const success = settingsStorageService.saveSettings(user.id, updated);
      if (success) {
        toast({ title: "Settings Saved", description: "Your preferences have been updated." });
      } else {
        toast({ variant: "destructive", title: "Error", description: "Failed to save settings." });
      }
    }
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    if (user?.id) {
      settingsStorageService.saveSettings(user.id, DEFAULT_SETTINGS);
      toast({ title: "Settings Reset", description: "Restored to defaults." });
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);