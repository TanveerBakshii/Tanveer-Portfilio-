import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { settingsApi } from '@/lib/api';
import type { AdminSettings } from '@/types';

interface ThemeContextType {
  settings: AdminSettings | null;
  loading: boolean;
  updateSettings: (data: Partial<AdminSettings>) => Promise<AdminSettings>;
  resetSettings: () => Promise<AdminSettings>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const hexToHsl = (hex: string): string => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  useEffect(() => {
    settingsApi.get()
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  const updateSettings = useCallback(async (data: Partial<AdminSettings>) => {
    const updated = await settingsApi.update(data);
    setSettings(updated);
    return updated;
  }, []);

  const resetSettings = useCallback(async () => {
    const defaultSettings = await settingsApi.reset();
    setSettings(defaultSettings);
    return defaultSettings;
  }, []);

  useEffect(() => {
    if (!settings) return;

    const root = document.documentElement;
    const primaryHsl = hexToHsl(settings.primaryColor);
    const accentHsl = hexToHsl(settings.accentColor);

    root.style.setProperty('--primary', accentHsl); 
    root.style.setProperty('--accent', accentHsl);
    root.style.setProperty('--teal', primaryHsl);
    
    document.body.style.backgroundColor = settings.primaryColor;
  }, [settings]);

  const value = useMemo(() => ({
    settings,
    loading,
    updateSettings,
    resetSettings
  }), [settings, loading, updateSettings, resetSettings]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a ThemeProvider');
  }
  return context;
};
